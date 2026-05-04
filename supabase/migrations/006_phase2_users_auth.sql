-- =====================================================================
-- 006_phase2_users_auth.sql
-- Phase 2: Supabase Auth Magic Link 기반 사용자 식별 + 다중 역할 모델
-- spec: specs/003-role-based-approval/data-model.md (Phase 2 추가 마이그레이션)
-- =====================================================================
-- 안전 적용 절차 (운영자가 사람 손으로 실행):
--   0) 005_phase1_role_approval.sql 적용 후에만 실행
--   1) staging DB에 적용 → 검증
--   2) 운영 DB 백업
--   3) 운영 DB 적용
--   4) 적용 직후 관리자 본인을 users 테이블에 사전 insert
--      INSERT INTO users (id, email, roles, active)
--      VALUES (
--        '<auth.users.id of admin>',
--        'admin@example.com',
--        ARRAY['admin']::TEXT[],
--        true
--      );
--   5) RLS 정책 검증, user_has_role() 함수 동작 확인
--   6) AUTH_PHASE 토글 컷오버는 별도 절차 (operation-phase2-production.md §8 참조)
-- AI는 이 파일을 작성만 하며 실행은 절대 금지.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. users 테이블 — Supabase auth.users와 1:1 매핑 + 역할 배열
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  -- 단일 사용자 다중 역할 (FR-001a): 비어 있을 수 없고 {admin,approver,editor} 부분집합
  roles TEXT[] NOT NULL CHECK (
    array_length(roles, 1) >= 1
    AND roles <@ ARRAY['admin','approver','editor']::TEXT[]
  ),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  invited_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
-- GIN 인덱스로 배열 멤버십 쿼리(`'admin' = ANY(roles)`) 가속
CREATE INDEX IF NOT EXISTS idx_users_roles_active
  ON users USING GIN (roles) WHERE active = true;

-- updated_at 트리거 (touch_updated_at은 005에서 정의됨)
DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();


-- ---------------------------------------------------------------------
-- 2. 역할 보유 검사 헬퍼 함수
-- ---------------------------------------------------------------------
-- 사용 예: user_has_role(auth.uid(), 'admin')
-- active=false 사용자는 항상 false. RLS 정책에서 활용.

CREATE OR REPLACE FUNCTION user_has_role(uid UUID, target_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = uid
      AND active = true
      AND target_role = ANY(roles)
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 역할 배열 전체 조회 헬퍼 (애플리케이션이 세션 발급 시 사용)
CREATE OR REPLACE FUNCTION user_active_roles(uid UUID)
RETURNS TEXT[] AS $$
  SELECT COALESCE(roles, ARRAY[]::TEXT[]) FROM users
  WHERE id = uid AND active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;


-- ---------------------------------------------------------------------
-- 3. RLS 정책
-- ---------------------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 본인 행 SELECT만 허용 (인증된 사용자가 자기 프로필 조회)
DROP POLICY IF EXISTS users_self_select ON users;
CREATE POLICY users_self_select ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- 관리자(admin 역할 보유)는 모든 행 SELECT/INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS users_admin_all ON users;
CREATE POLICY users_admin_all ON users
  FOR ALL TO authenticated
  USING (user_has_role(auth.uid(), 'admin'))
  WITH CHECK (user_has_role(auth.uid(), 'admin'));


-- ---------------------------------------------------------------------
-- 4. 기존 테이블에 *_user_id UUID 컬럼 추가 (강한 식별)
-- ---------------------------------------------------------------------
-- Phase 1 데이터(텍스트 author/reviewer)는 그대로 보존됨.
-- Phase 2에서 작성된 신규 행만 *_user_id가 채워진다.

ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS author_user_id UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS reviewer_user_id UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS deleted_by_user_id UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS idx_comments_author_user_id
  ON comments (author_user_id) WHERE author_user_id IS NOT NULL;

ALTER TABLE attachments
  ADD COLUMN IF NOT EXISTS uploader_user_id UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS reviewer_user_id UUID REFERENCES users(id),
  ADD COLUMN IF NOT EXISTS deleted_by_user_id UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS idx_attachments_uploader_user_id
  ON attachments (uploader_user_id) WHERE uploader_user_id IS NOT NULL;

ALTER TABLE change_audit
  ADD COLUMN IF NOT EXISTS actor_user_id UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS idx_audit_actor_user_id
  ON change_audit (actor_user_id) WHERE actor_user_id IS NOT NULL;

ALTER TABLE automation_settings
  ADD COLUMN IF NOT EXISTS updated_by_user_id UUID REFERENCES users(id);

ALTER TABLE system_prompt_history
  ADD COLUMN IF NOT EXISTS updated_by_user_id UUID REFERENCES users(id);


COMMIT;

-- =====================================================================
-- 적용 후 검증 쿼리 (수동 실행)
-- =====================================================================
--
-- -- 1) users 테이블 + 역할 제약 확인
-- INSERT INTO users (id, email, roles, active)
-- VALUES (
--   '00000000-0000-0000-0000-000000000001',
--   'test-bad@example.com',
--   ARRAY[]::TEXT[],   -- 빈 배열 → CHECK 위반
--   true
-- );
-- -- 기대: ERROR: new row for relation "users" violates check constraint
--
-- -- 2) 역할 헬퍼 동작
-- SELECT user_has_role('<some-uuid>', 'admin');  -- 등록 안 된 UUID → false
-- SELECT user_active_roles('<some-uuid>');       -- 등록 안 된 UUID → {}
--
-- -- 3) RLS 정책: anon은 차단, authenticated는 본인 행만
-- SET ROLE anon;
-- SELECT count(*) FROM users;  -- 0 (RLS deny)
-- RESET ROLE;
--
-- -- 4) 기존 테이블 컬럼 추가 확인
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'comments' AND column_name LIKE '%_user_id';
-- -- 기대: author_user_id, reviewer_user_id, deleted_by_user_id
--
-- -- 5) Phase 1 데이터 보존 (texts 그대로)
-- SELECT count(*) FROM comments WHERE author IS NULL;       -- Phase 1 무기명
-- SELECT count(*) FROM comments WHERE author_user_id IS NULL; -- 모든 기존 행
-- =====================================================================
