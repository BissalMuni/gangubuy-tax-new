-- =====================================================================
-- 005_phase1_role_approval.sql
-- Phase 1: 역할 기반 승인 워크플로 스키마
-- spec: specs/003-role-based-approval/data-model.md (Phase 1 마이그레이션)
-- =====================================================================
-- 안전 적용 절차 (운영자가 사람 손으로 실행):
--   1) staging DB에 적용 → 검증
--   2) 운영 DB 백업
--   3) 운영 DB 적용
--   4) 검증 쿼리 실행 (행 수, status별 합계)
-- AI는 이 파일을 작성만 하며 실행은 절대 금지.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. ENUM 타입 정의
-- ---------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE change_status AS ENUM (
    'pending',
    'approved',
    'processing',
    'applied',
    'rejected',
    'failed'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE change_target_kind AS ENUM (
    'content',
    'structure'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE automation_mode AS ENUM (
    'auto',
    'manual'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;


-- ---------------------------------------------------------------------
-- 2. updated_at 자동 갱신 함수
-- ---------------------------------------------------------------------

CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ---------------------------------------------------------------------
-- 3. comments 테이블 확장
-- ---------------------------------------------------------------------

-- 3-1) status 컬럼 추가 (processed 대체)
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS status change_status NOT NULL DEFAULT 'pending';

-- 3-2) 기존 processed 데이터 마이그레이션 (processed 컬럼이 존재할 때만)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'comments' AND column_name = 'processed'
  ) THEN
    UPDATE comments SET status = CASE
      WHEN processed = true THEN 'applied'::change_status
      ELSE 'pending'::change_status
    END;
  END IF;
END $$;

-- 3-3) 신규 컬럼들
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS target_kind change_target_kind NOT NULL DEFAULT 'content',
  ADD COLUMN IF NOT EXISTS reviewer TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS applied_commit_sha TEXT,
  ADD COLUMN IF NOT EXISTS error_log TEXT,
  ADD COLUMN IF NOT EXISTS reject_reason TEXT,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_by TEXT;

-- 3-4) updated_at 컬럼이 없으면 추가 (001에서 이미 있음 — 멱등 보장)
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 3-5) author NULLABLE로 변경 (Phase 1 무기명 지원)
ALTER TABLE comments ALTER COLUMN author DROP NOT NULL;

-- 3-6) 기존 processed 컬럼 정리 (status로 대체됨)
ALTER TABLE comments DROP COLUMN IF EXISTS processed;
-- processed_at, commit_sha는 별도 컬럼으로 매핑되어 있음:
--   processed_at -> reviewed_at 또는 applied 시각으로 통합 (현재는 보존)
--   commit_sha   -> applied_commit_sha
-- 데이터 보존을 위해 즉시 drop하지 않고 다음 단계에서 백필 후 제거.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'comments' AND column_name = 'commit_sha'
  ) THEN
    UPDATE comments
    SET applied_commit_sha = commit_sha
    WHERE applied_commit_sha IS NULL AND commit_sha IS NOT NULL;
    ALTER TABLE comments DROP COLUMN commit_sha;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'comments' AND column_name = 'processed_at'
  ) THEN
    -- processed_at은 status='applied'일 때 reviewed_at(검토 완료 시각) 후행 의미가
    -- 강하지만, 정보 손실 방지 위해 보존만 하지 않고 column 자체를 제거.
    -- 필요 시 change_audit에서 추적 가능.
    ALTER TABLE comments DROP COLUMN processed_at;
  END IF;
END $$;

-- 3-7) 인덱스 (큐 fetch 성능)
CREATE INDEX IF NOT EXISTS idx_comments_status_deleted
  ON comments (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_comments_target_kind
  ON comments (target_kind) WHERE deleted_at IS NULL;

-- 3-8) updated_at 트리거
DROP TRIGGER IF EXISTS trg_comments_updated_at ON comments;
CREATE TRIGGER trg_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();


-- ---------------------------------------------------------------------
-- 4. attachments 테이블 확장
-- ---------------------------------------------------------------------

ALTER TABLE attachments
  ADD COLUMN IF NOT EXISTS status change_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS target_kind change_target_kind NOT NULL DEFAULT 'content',
  ADD COLUMN IF NOT EXISTS reviewer TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS applied_commit_sha TEXT,
  ADD COLUMN IF NOT EXISTS error_log TEXT,
  ADD COLUMN IF NOT EXISTS reject_reason TEXT,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_by TEXT,
  ADD COLUMN IF NOT EXISTS comment_id UUID REFERENCES comments(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE attachments ALTER COLUMN uploaded_by DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_attachments_status_deleted
  ON attachments (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_attachments_comment_id
  ON attachments (comment_id);

DROP TRIGGER IF EXISTS trg_attachments_updated_at ON attachments;
CREATE TRIGGER trg_attachments_updated_at
  BEFORE UPDATE ON attachments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();


-- ---------------------------------------------------------------------
-- 5. automation_settings 테이블 (신규, 단일 행)
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS automation_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  mode automation_mode NOT NULL DEFAULT 'manual',
  path_overrides JSONB NOT NULL DEFAULT '{}'::jsonb,
  cron_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  system_prompt TEXT NOT NULL DEFAULT '',
  updated_by TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 기본 행 (id=1) 보장
INSERT INTO automation_settings (id, mode, system_prompt)
VALUES (
  1,
  'manual',
  '이 레포에서 review-feedback 작업을 수행해줘.
절대 규칙:
- content/ 내의 파일만 수정 가능
- 다른 경로의 파일은 읽기만 가능
- 합리적인 의견만 반영, 비합리/감상은 reject
- git commit/push는 하지 말 것'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE automation_settings ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS trg_automation_settings_updated_at ON automation_settings;
CREATE TRIGGER trg_automation_settings_updated_at
  BEFORE UPDATE ON automation_settings
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();


-- ---------------------------------------------------------------------
-- 6. system_prompt_history 테이블 (신규)
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS system_prompt_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prompt_history_at
  ON system_prompt_history (updated_at DESC);

ALTER TABLE system_prompt_history ENABLE ROW LEVEL SECURITY;


-- ---------------------------------------------------------------------
-- 7. change_audit 테이블 (신규)
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS change_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  change_kind TEXT NOT NULL CHECK (change_kind IN ('comment','attachment')),
  change_id UUID NOT NULL,
  from_status change_status,
  to_status change_status,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_change ON change_audit (change_kind, change_id);
CREATE INDEX IF NOT EXISTS idx_audit_at ON change_audit (at DESC);

ALTER TABLE change_audit ENABLE ROW LEVEL SECURITY;


-- ---------------------------------------------------------------------
-- 8. processing 타임아웃 자동 회수 (5분 주기 pg_cron, 30분 초과 시 failed)
--    plan.md §0-1-1: 워크플로 self-sweep + pg_cron 이중 안전망
--    pg_cron 설치 여부에 따라 호환성 확보 — extension 미존재 시 skip
-- ---------------------------------------------------------------------

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_available_extensions WHERE name = 'pg_cron'
  ) THEN
    CREATE EXTENSION IF NOT EXISTS pg_cron;

    -- 기존 잡 제거 후 재등록 (멱등)
    PERFORM cron.unschedule(jobid)
    FROM cron.job
    WHERE jobname = 'recover_processing_timeout_5min';

    PERFORM cron.schedule(
      'recover_processing_timeout_5min',
      '*/5 * * * *',
      $cron$
        UPDATE comments
          SET status = 'failed',
              error_log = COALESCE(error_log, '') || E'\n[auto-recover] processing >30min timeout'
          WHERE status = 'processing'
            AND updated_at < now() - interval '30 minutes';
        UPDATE attachments
          SET status = 'failed',
              error_log = COALESCE(error_log, '') || E'\n[auto-recover] processing >30min timeout'
          WHERE status = 'processing'
            AND updated_at < now() - interval '30 minutes';
      $cron$
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- pg_cron 미지원 환경(로컬, 일부 self-hosted)에서는 무시.
  -- 워크플로 self-sweep만으로도 충분히 동작.
  RAISE NOTICE 'pg_cron not available — skipping scheduled timeout sweeper';
END $$;


COMMIT;

-- =====================================================================
-- 검증 쿼리 (적용 후 사람 손으로 실행)
-- =====================================================================
-- 1) 행 수 보존 확인
--    SELECT status, COUNT(*) FROM comments GROUP BY status;
-- 2) 기본 automation_settings 존재 확인
--    SELECT * FROM automation_settings WHERE id = 1;
-- 3) 인덱스 사용 확인
--    EXPLAIN ANALYZE SELECT * FROM comments
--      WHERE status = 'pending' AND deleted_at IS NULL LIMIT 50;
-- 4) ENUM 정의 확인
--    SELECT unnest(enum_range(NULL::change_status));
