# Data Model — Role-Based Approval Workflow

**관계 문서**: [spec.md](spec.md), [operation-phase1-mvp.md](operation-phase1-mvp.md), [operation-phase2-production.md](operation-phase2-production.md)

본 문서는 페이즈 1과 페이즈 2의 DB 스키마를 모두 정의한다. 실제 마이그레이션은 페이즈 1 → 페이즈 2 순으로 적용된다.

---

## Phase 1 마이그레이션

마이그레이션 파일: `supabase/migrations/005_phase1_role_approval.sql`

### 1. ENUM 타입 정의

```sql
-- 변경 항목 상태 머신
CREATE TYPE change_status AS ENUM (
  'pending',
  'approved',
  'processing',
  'applied',
  'rejected',
  'failed'
);

-- 변경 대상 종류
CREATE TYPE change_target_kind AS ENUM (
  'content',
  'structure'
);

-- 자동화 모드
CREATE TYPE automation_mode AS ENUM (
  'auto',
  'manual'
);
```

### 2. `comments` 테이블 확장

```sql
-- 기존 컬럼: id, content_path, author, body, section, created_at, processed (bool)

-- 1) status 컬럼 추가 (processed 대체)
ALTER TABLE comments ADD COLUMN status change_status NOT NULL DEFAULT 'pending';

-- 2) 기존 processed 데이터 마이그레이션
UPDATE comments SET status = CASE
  WHEN processed = true THEN 'applied'::change_status
  ELSE 'pending'::change_status
END;

-- 3) 새 컬럼들
ALTER TABLE comments
  ADD COLUMN target_kind change_target_kind NOT NULL DEFAULT 'content',
  ADD COLUMN reviewer TEXT,                  -- Phase 1: 'approver(shared)' / 'admin(shared)' / Phase 2: email
  ADD COLUMN reviewed_at TIMESTAMPTZ,
  ADD COLUMN applied_commit_sha TEXT,
  ADD COLUMN error_log TEXT,
  ADD COLUMN reject_reason TEXT,
  ADD COLUMN deleted_at TIMESTAMPTZ,         -- soft delete
  ADD COLUMN deleted_by TEXT,
  ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 4) author NULLABLE로 변경 (Phase 1 무기명 지원)
ALTER TABLE comments ALTER COLUMN author DROP NOT NULL;

-- 5) processed 컬럼 제거 (status로 대체됨)
ALTER TABLE comments DROP COLUMN processed;

-- 6) 인덱스 (큐 fetch 성능)
CREATE INDEX idx_comments_status_deleted ON comments (status) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_content_path ON comments (content_path);
CREATE INDEX idx_comments_target_kind ON comments (target_kind) WHERE deleted_at IS NULL;
```

### 3. `attachments` 테이블 확장

```sql
-- comments와 동일한 상태/감사 컬럼 추가 (첨부파일도 큐 흐름 일부)
ALTER TABLE attachments
  ADD COLUMN status change_status NOT NULL DEFAULT 'pending',
  ADD COLUMN target_kind change_target_kind NOT NULL DEFAULT 'content',
  ADD COLUMN reviewer TEXT,
  ADD COLUMN reviewed_at TIMESTAMPTZ,
  ADD COLUMN applied_commit_sha TEXT,
  ADD COLUMN error_log TEXT,
  ADD COLUMN reject_reason TEXT,
  ADD COLUMN deleted_at TIMESTAMPTZ,
  ADD COLUMN deleted_by TEXT,
  ADD COLUMN comment_id UUID REFERENCES comments(id) ON DELETE SET NULL, -- 댓글과 동시 제출 시 연결
  ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE attachments ALTER COLUMN uploaded_by DROP NOT NULL; -- Phase 1 무기명

CREATE INDEX idx_attachments_status_deleted ON attachments (status) WHERE deleted_at IS NULL;
CREATE INDEX idx_attachments_comment_id ON attachments (comment_id);
```

### 4. `automation_settings` 테이블 (신규)

```sql
-- 단일 행 테이블 (운영 설정 글로벌)
CREATE TABLE automation_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- 항상 1행만
  mode automation_mode NOT NULL DEFAULT 'manual',
  path_overrides JSONB NOT NULL DEFAULT '{}'::jsonb,  -- { "content/acquisition-tax/**": "manual" }
  cron_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  system_prompt TEXT NOT NULL DEFAULT '',
  updated_by TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 기본 행 삽입
INSERT INTO automation_settings (id, mode, system_prompt) VALUES (
  1,
  'manual',
  $$이 레포에서 review-feedback 작업을 수행해줘.
절대 규칙:
- content/ 내의 파일만 수정 가능
- 다른 경로의 파일은 읽기만 가능
- 합리적인 의견만 반영, 비합리/감상은 reject
- git commit/push는 하지 말 것$$
);

ALTER TABLE automation_settings ENABLE ROW LEVEL SECURITY;
-- service_role만 접근 (anon 차단)
```

### 5. `system_prompt_history` 테이블 (신규)

```sql
CREATE TABLE system_prompt_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_prompt_history_at ON system_prompt_history (updated_at DESC);

ALTER TABLE system_prompt_history ENABLE ROW LEVEL SECURITY;
```

### 6. `change_audit` 테이블 (신규)

```sql
CREATE TABLE change_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  change_kind TEXT NOT NULL CHECK (change_kind IN ('comment','attachment','manifest')),  -- manifest: 004 트리 매니페스트 변경
  change_id UUID NOT NULL,                       -- comments.id / attachments.id / manifest commit hash 등
  from_status change_status,                     -- 신규 생성 시 NULL
  to_status change_status,                       -- soft delete 등 status 변경 없을 때 NULL
  action TEXT NOT NULL,                          -- 'create','approve','reject','process','apply','fail','delete','restore'
  actor TEXT NOT NULL,                           -- 'editor(anonymous)' / 'approver(shared)' / 'admin(shared)' / Phase 2: email / 'ai'
  acting_role TEXT NOT NULL CHECK (acting_role IN ('admin','approver','editor','ai')),  -- 행동 컨텍스트 (FR-001b)
  emergency_override BOOLEAN NOT NULL DEFAULT FALSE,  -- 자기-승인 우회 여부 (FR-001c, SC-010)
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,            -- 추가 컨텍스트 (commit_sha, error 등)
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_change ON change_audit (change_kind, change_id);
CREATE INDEX idx_audit_at ON change_audit (at DESC);
CREATE INDEX idx_audit_emergency ON change_audit (at DESC) WHERE emergency_override = TRUE;  -- 비상 우회 추적

ALTER TABLE change_audit ENABLE ROW LEVEL SECURITY;
```

> **자기-승인 가드 (FR-001c)**: 상태 전이를 수행하는 API는 `actor != reviewer` 제약을 강제한다. emergency_override는 운영자가 명시적 토글을 켠 경우에만 TRUE로 기록되며, 향후 감사 리뷰 대상.

### 7. RLS 정책

기존 정책을 그대로 유지 (service_role만 접근, anon 차단). Phase 1에서는 별도 정책 없음.

```sql
-- 새 테이블들도 anon 차단
-- (RLS enabled + 정책 미생성 = 모든 anon 접근 거부)
```

### 8. 트리거 (선택)

`updated_at` 자동 갱신:

```sql
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER trg_attachments_updated_at
  BEFORE UPDATE ON attachments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER trg_automation_settings_updated_at
  BEFORE UPDATE ON automation_settings
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
```

---

## 상태 머신 — 전이 규칙

```
              ┌──────────────┐
              │   pending    │ ←─── 댓글 제출 (FR-008)
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
   approve         reject        delete (soft, 직교)
        │            │            │
        ▼            ▼            ▼
  ┌──────────┐  ┌──────────┐  ┌──────────────┐
  │ approved │  │ rejected │  │ deleted_at=  │
  └────┬─────┘  └──────────┘  │   now()      │
       │                      │ (status는    │
   workflow                   │  그대로)     │
   fetch                      └──────────────┘
       │
       ▼
  ┌──────────────┐
  │  processing  │
  └──────┬───────┘
         │
    ┌────┴────┐
   apply    fail
    │        │
    ▼        ▼
┌────────┐ ┌────────┐
│applied │ │ failed │←─ retry (admin only)
└────────┘ └───┬────┘
               │
               └─→ approved (수동 재시도, FR-009)
```

- `deleted_at`은 status와 **직교**한다. 어느 status에서도 soft delete 가능
- `processing → failed` 자동 전이: 30분 이상 `processing`인 항목은 (1) 워크플로 시작 시 self-sweep + (2) Supabase pg_cron 5분 주기로 자동 회수 (plan.md §0-1-1). FR-009 + SC-008
- `failed → approved` 수동 재시도: 관리자가 명시적 액션으로만 가능. cron이나 시스템에 의해 자동 발생 안 함 (FR-009)
- 모든 상태 전이는 낙관적 락(`updated_at` 비교) 사용 (plan.md §0-1-2). FR-009a + SC-009
- `applied → revert` (선택, P3)는 별도 메커니즘 (revert PR)

---

## Phase 2 추가 마이그레이션

마이그레이션 파일: `supabase/migrations/006_phase2_users_auth.sql`

### 1. `users` 테이블

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  -- 단일 사용자 다중 역할 보유 (FR-001a)
  -- 비어 있을 수 없고 {'admin','approver','editor'} 의 부분집합
  roles TEXT[] NOT NULL CHECK (
    array_length(roles, 1) >= 1
    AND roles <@ ARRAY['admin','approver','editor']::TEXT[]
  ),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  invited_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);
-- GIN 인덱스로 ANY(roles) 쿼리 가속
CREATE INDEX idx_users_roles ON users USING GIN (roles) WHERE active = true;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 보유 역할 검사 헬퍼
CREATE OR REPLACE FUNCTION user_has_role(uid UUID, target_role TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = uid AND active = true AND target_role = ANY(roles)
  );
$$ LANGUAGE sql STABLE;

-- RLS: 본인 행 SELECT만 허용
CREATE POLICY users_self_select ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- 관리자만 모든 행 SELECT/UPDATE/INSERT (admin 역할 보유 검사)
CREATE POLICY users_admin_all ON users
  FOR ALL TO authenticated
  USING (user_has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
```

> **단일 컬럼 vs 조인 테이블 결정**: 페이즈 2 도입 단계에서 `roles TEXT[]` 단일 컬럼으로 진행. 향후 역할 부여/회수 이력이 별도 감사 대상이 되면 `user_roles(user_id, role, granted_at, granted_by, revoked_at)` 조인 테이블로 마이그레이션 가능. 현재 규모(운영자 1~10명)에서는 배열이 충분.

### 2. 기존 테이블에 `_user_id` 컬럼 추가 (선택, 강한 식별)

Phase 2에서 텍스트 `author`/`reviewer` 외에 UUID 외래키도 함께 저장 (정확한 추적용):

```sql
ALTER TABLE comments
  ADD COLUMN author_user_id UUID REFERENCES users(id),
  ADD COLUMN reviewer_user_id UUID REFERENCES users(id),
  ADD COLUMN deleted_by_user_id UUID REFERENCES users(id);

ALTER TABLE attachments
  ADD COLUMN uploader_user_id UUID REFERENCES users(id),
  ADD COLUMN reviewer_user_id UUID REFERENCES users(id),
  ADD COLUMN deleted_by_user_id UUID REFERENCES users(id);

ALTER TABLE change_audit
  ADD COLUMN actor_user_id UUID REFERENCES users(id);

ALTER TABLE automation_settings
  ADD COLUMN updated_by_user_id UUID REFERENCES users(id);

ALTER TABLE system_prompt_history
  ADD COLUMN updated_by_user_id UUID REFERENCES users(id);
```

Phase 1 데이터는 `*_user_id`가 NULL인 채로 보존된다 (`author`/`reviewer` 텍스트 필드도 그대로).

### 3. AUTH_PHASE 환경 변수 의존

스키마 자체는 Phase 1/2를 모두 수용. 어느 인증 흐름을 쓸지는 애플리케이션 코드가 `AUTH_PHASE` env로 분기.

---

## 마이그레이션 체크리스트

### Phase 1 적용 시 (마이그레이션 005)

- [ ] 운영 DB 백업
- [ ] 마이그레이션 dry-run (staging)
- [ ] `processed` 컬럼 → `status` 변환 검증 (기존 데이터 보존)
- [ ] 기본 system_prompt 값 검증
- [ ] 인덱스 생성 후 큐 fetch 성능 측정
- [ ] 적용 후 기존 댓글 수 == 신규 status별 합계 확인
- [ ] `change_audit.acting_role` 및 `emergency_override` 컬럼 검증 (FR-010a)
- [ ] 005 적용 후 별도 마이그레이션(007 등)으로 acting_role 컬럼이 이미 추가된 경우 멱등성 확인

### Phase 2 적용 시 (마이그레이션 006)

- [ ] users 테이블에 관리자 본인 사전 insert (admin **역할 배열** `roles=ARRAY['admin']`)
- [ ] 복수 역할 보유 운영자가 있다면 `roles=ARRAY['admin','approver']` 등으로 사전 입력
- [ ] 모든 담당자/승인자 이메일 사전 등록
- [ ] RLS 정책 검증 (본인 행만 보이는지, 관리자가 전체 보이는지)
- [ ] `user_has_role()` 함수 동작 확인 (배열 안의 역할 보유 검사)
- [ ] auth.users ↔ users 1:1 매핑 무결성 확인
- [ ] AUTH_PHASE 환경변수 토글 후 즉시 검증
- [ ] 자기-승인 가드 동작 확인: 동일 actor의 작성/승인 시도 시 403

---

## 데이터 사전 (Glossary)

| 컬럼/값 | 의미 |
|--------|------|
| `comments.author` | Phase 1: NULL (무기명) / Phase 2: 이메일 |
| `comments.reviewer` | Phase 1: 'approver(shared)' / 'admin(shared)' / Phase 2: 이메일 |
| `comments.target_kind` | 'content' (기본, AI가 직접 수정) / 'structure' (PR 생성, 항상 manual) |
| `comments.deleted_at` | NULL이면 활성, NOT NULL이면 soft-deleted (UI 숨김) |
| `automation_settings.mode` | 'auto' (워크플로 pending+approved 처리) / 'manual' (approved만) |
| `automation_settings.path_overrides` | 경로 패턴별 모드 강제. JSON 객체 |
| `change_audit.action` | 'create','approve','reject','process','apply','fail','delete','restore' |
| `change_audit.actor` | 행위자 식별 (Phase 1은 'shared' suffix, Phase 2는 이메일, AI는 'ai') |
| `change_audit.acting_role` | 행위 시점의 역할 컨텍스트 ('admin'\|'approver'\|'editor'\|'ai'). 보유 역할 부분집합이어야 함 (FR-001b) |
| `change_audit.emergency_override` | 자기-승인 비상 우회 여부. 일반 운영에서는 항상 FALSE (FR-001c, SC-010) |
| `change_kind='manifest'` | 004 트리 매니페스트 변경 감사 — `change_id`에 매니페스트 커밋 hash 또는 매니페스트 version |
| `users.roles` | TEXT[] 배열, `{'admin','approver','editor'}` 부분집합. 비어 있을 수 없음 (FR-001a) |
