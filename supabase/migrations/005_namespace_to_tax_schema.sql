-- ============================================================
-- 같은 Supabase 프로젝트를 다른 앱(math)과 공유하므로
-- 본 프로젝트(gangubuy-tax) 전용 스키마를 새로 만들고 빈 테이블로 시작한다.
--
-- 주의:
--   - public.comments / public.attachments 는 건드리지 않는다 (구 데이터 보존).
--   - 본 마이그레이션 이후 코드는 tax 스키마만 사용한다.
--
-- 적용 후 Supabase 대시보드에서:
--   Settings → API → "Exposed schemas" 에 `tax` 추가 필요
-- ============================================================
BEGIN;

CREATE SCHEMA IF NOT EXISTS tax;

GRANT USAGE ON SCHEMA tax TO anon, authenticated, service_role;

-- ============================================================
-- tax.comments — math 프로젝트와 동일한 의견 분류 체계
--   feedback_type: 'content' (내용 편집) | 'structure' (구조 편집)
--   level:         'major' | 'medium' | 'minor' | 'section'
-- ============================================================
CREATE TABLE tax.comments (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path  TEXT        NOT NULL,
  author        TEXT        NOT NULL,
  body          TEXT        NOT NULL,
  section_title TEXT,
  processed     BOOLEAN     NOT NULL DEFAULT false,
  processed_at  TIMESTAMPTZ,
  commit_sha    TEXT,
  feedback_type TEXT        NOT NULL DEFAULT 'content'
    CHECK (feedback_type IN ('content', 'structure')),
  level         TEXT        NOT NULL DEFAULT 'section'
    CHECK (level IN ('major', 'medium', 'minor', 'section')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tax_comments_content_path
  ON tax.comments (content_path);
CREATE INDEX idx_tax_comments_processed
  ON tax.comments (processed) WHERE processed = false;
CREATE INDEX idx_tax_comments_feedback_type
  ON tax.comments (feedback_type);
CREATE INDEX idx_tax_comments_level
  ON tax.comments (level);
CREATE INDEX idx_tax_comments_unprocessed_class
  ON tax.comments (feedback_type, level) WHERE processed = false;

-- ============================================================
-- tax.attachments — 첨부파일 메타데이터
-- (본 프로젝트는 math 의 topic_images 와 다르게 mime_type 을 사용한다)
-- ============================================================
CREATE TABLE tax.attachments (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT        NOT NULL,
  file_name    TEXT        NOT NULL,
  storage_path TEXT        NOT NULL,
  file_size    BIGINT      NOT NULL,
  mime_type    TEXT        NOT NULL,
  uploaded_by  TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tax_attachments_content_path
  ON tax.attachments (content_path);

-- ============================================================
-- tax.content_changes — 콘텐츠 수정 이력 (admin 감사용)
-- ============================================================
CREATE TABLE tax.content_changes (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  role            TEXT        NOT NULL,
  actor           TEXT        NOT NULL DEFAULT 'unknown',
  change_type     TEXT        NOT NULL,
  file_path       TEXT        NOT NULL,
  diff            TEXT,
  before_content  TEXT,
  after_content   TEXT,
  commit_sha      TEXT,
  metadata        JSONB,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tax_content_changes_file_path
  ON tax.content_changes (file_path);
CREATE INDEX idx_tax_content_changes_created_at
  ON tax.content_changes (created_at DESC);
CREATE INDEX idx_tax_content_changes_change_type
  ON tax.content_changes (change_type);

-- ============================================================
-- 권한
-- ============================================================
GRANT ALL ON ALL TABLES    IN SCHEMA tax TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA tax TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA tax TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA tax GRANT ALL ON TABLES    TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA tax GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA tax GRANT ALL ON FUNCTIONS TO service_role;

-- ============================================================
-- RLS 활성화 (defense-in-depth)
-- 앱은 service_role 키를 쓰므로 RLS 를 우회한다.
-- 정책 없이 RLS 만 켜서 anon/authenticated 키의 직접 접근을 차단.
-- (migration 004_enable_rls.sql 와 동일한 패턴)
-- ============================================================
ALTER TABLE tax.comments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax.attachments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax.content_changes ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- tax 전용 Storage 버킷
-- (기존 'attachments' 버킷은 보존; 본 프로젝트는 새 버킷을 사용)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('tax-attachments', 'tax-attachments', true)
ON CONFLICT (id) DO NOTHING;

COMMIT;
