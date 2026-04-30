# Tasks — Role-Based Approval Workflow

**관계 문서**: [spec.md](spec.md), [plan.md](plan.md), [data-model.md](data-model.md)

본 문서는 spec/plan을 **독립적으로 테스트 가능한 슬라이스**로 분할한다. 각 슬라이스 완료 시 부분적으로라도 가치를 제공해야 한다 (MVP 원칙).

> **MVP 우선순위 (마일스톤 2단계)**:
> - **검토 가능 MVP**: 슬라이스 0~4 (5개) — 큐 + 일괄 승인 가능. 승인 후 AI 자동 반영은 **아직 동작 안 함**(승인된 의견은 사람이 수동으로 콘텐츠에 반영하거나 슬라이스 6 대기). 시연·데모용
> - **운영 가능 MVP**: + 슬라이스 6 — 승인된 항목이 실제 AI에 의해 main에 반영됨. **이 시점부터 실서비스 가동 가능**

---

## Phase 1 — MVP 슬라이스

### 슬라이스 0: 데이터베이스 마이그레이션 (P0, 의존성 없음)

**목표**: Phase 1 스키마를 운영 DB에 적용. 기존 데이터 보존.

**산출물**:
- [x] `supabase/migrations/005_phase1_role_approval.sql` 작성 ([data-model.md §Phase 1](data-model.md))
- [ ] staging DB에서 dry-run, `processed` → `status` 변환 검증 _(호스트가 적용)_
- [ ] 운영 DB 백업 후 적용 _(호스트가 적용)_
- [ ] 적용 후 검증 쿼리 실행 (행 수 일치, status별 합계) _(호스트가 적용)_

**테스트**:
- `SELECT status, COUNT(*) FROM comments GROUP BY status;` — 기존 processed=true 모두 'applied'로
- `SELECT * FROM automation_settings WHERE id=1;` — 기본 행 존재
- 인덱스 EXPLAIN ANALYZE — `(status) WHERE deleted_at IS NULL` 사용 확인

**완료 조건**: 마이그레이션 적용, 기존 댓글 페이지 정상 작동(읽기 영향 0), 큐 fetch 쿼리 동작.

---

### 슬라이스 1: 담당자 비번 게이트 (P0, 의존: 0)

**목표**: 댓글 폼에서 `EDITOR_PASSWORD` 입력 검증 → 무기명 제출.

**산출물**:
- [x] `lib/auth/env-passwords.ts` (timing-safe 비교)
- [x] `app/api/comments/route.ts` 갱신 — `password` 필드 검증, `author=null` 인서트
- [x] `app/api/attachments/route.ts` 동일 갱신
- [x] `components/comments/SectionCommentButton.tsx` — 비번 입력 필드 추가
- [x] IP 레이트리밋 (10회/시간) — `lib/auth/rate-limit.ts` (Upstash + 인메모리 fallback)
- [ ] env에 `EDITOR_PASSWORD` 추가 (Vercel + 로컬 `.env.local`) _(호스트가 적용)_

**테스트**:
- 비번 일치 + 본문 → 201 + DB에 `author=null, status='pending'` 저장
- 비번 불일치 → 401
- 본문 누락 → 400
- 11번째 시도 → 429 (레이트리밋)
- `change_audit`에 `action='create', actor='editor(anonymous)'` 기록

**완료 조건**: 사용자가 비번만으로 댓글 제출 가능. 큐에 pending 상태로 적재.

---

### 슬라이스 2: 관리자/승인자 로그인 + 세션 (P0, 의존: 0)

**목표**: `/admin/login`에서 비번 입력 → 쿠키 세션 → `/admin/*` 보호 동작.

**산출물**:
- [x] `lib/auth/session.ts` (jose 기반 JWT 쿠키)
- [x] `app/admin/login/page.tsx` (비번 + 역할 선택 폼)
- [x] `app/api/auth/login/route.ts`
- [x] `app/api/auth/logout/route.ts`
- [x] `middleware.ts` — `/admin/*` 보호, `/admin/login` 예외
- [ ] env에 `ADMIN_PASSWORD`, `APPROVER_PASSWORD`, `SESSION_SECRET` 추가 _(호스트가 적용)_

**테스트**:
- `/admin/changes` 미로그인 접근 → `/admin/login` 리다이렉트
- 관리자 비번 + role='admin' 로그인 → 쿠키 발급, `/admin/changes` 접근 가능
- `/admin/settings` 접근 시 role!='admin'이면 거부 또는 redirect
- 12시간 후 쿠키 만료 → 재로그인 요구
- 5회 연속 실패 → 1시간 차단

**완료 조건**: 관리자/승인자가 로그인 후 보호 페이지 접근 가능. 비로그인 시 차단.

---

### 슬라이스 3: 변경 큐 조회 (read-only) (P1, 의존: 0, 1, 2)

**목표**: `/admin/changes` 페이지에서 메뉴 트리 그룹 + 상태 필터 + 상세 보기.

**산출물**:
- [x] `app/admin/changes/page.tsx` (서버 컴포넌트)
- [x] `app/api/admin/changes/route.ts` GET — status/path 필터, deleted 옵션
- [x] `lib/admin/group-tree.ts` — `lib/navigation/tree.ts` 기반 그룹핑
- [x] `components/admin/ChangeQueueTree.tsx` (클라 컴포넌트, 읽기만)
- [x] `components/admin/ChangeDetailPanel.tsx` (본문 + 첨부 미리보기)
- [x] `components/admin/FilterBar.tsx` (상태 다중 필터)

**테스트**:
- pending/approved/applied 댓글 시딩 → 페이지에서 각각 필터로 표시
- 트리뷰: "취득세 > 다주택 (3건 pending)" 형식 그룹핑
- 첨부 PDF/이미지 인라인 미리보기 동작
- 상세 패널: 본문, 작성일, status, target_kind 표시
- soft-deleted 항목은 기본 제외, "삭제됨 보기" 토글 시에만 표시

**완료 조건**: 관리자가 큐 상태를 한눈에 파악 가능. 일괄 작업은 슬라이스 4.

---

### 슬라이스 4: 일괄 승인/반려 (P1, 의존: 3)

**목표**: 체크박스 + 일괄 액션 버튼으로 승인/반려.

**산출물**:
- [x] `lib/changes/status-machine.ts` (`canTransition`, `transition`, `recordAudit`)
- [x] `app/api/admin/changes/approve/route.ts` POST — 일괄 승인
- [x] `app/api/admin/changes/reject/route.ts` POST — 일괄 반려 (사유 입력)
- [x] `components/admin/ChangeQueueTree.tsx` 확장 — 체크박스 상태 (Set<id>)
- [x] `components/admin/BulkActionBar.tsx` (선택 N건 / 승인 / 반려 버튼)
- [x] 반려 시 사유 모달

**테스트**:
- pending 5건 체크 → "선택 승인" → 모두 `approved`로 전환, `reviewer/reviewed_at` 기록
- approved 항목에 "승인" 다시 시도 → 400 (invalid transition)
- 일괄 반려 + 사유 → 모두 `rejected`, `reject_reason` 저장
- `change_audit`에 각 전이 기록
- 동시 승인 경합 (낙관적 락): 두 명이 같은 항목 동시 승인 → 한 번만 성공

**완료 조건**: 승인자가 큐를 효율적으로 정리 가능. **이 시점부터 시스템이 사용 가능한 MVP**.

---

### 슬라이스 5: Soft Delete + 복원 (P1, 의존: 4)

**목표**: 관리자/승인자가 항목을 화면에서 숨기고 필요 시 복원.

**산출물**:
- [x] `lib/changes/soft-delete.ts` (`softDelete`, `restore`)
- [x] `app/api/admin/changes/delete/route.ts` POST (승인자/관리자)
- [x] `app/api/admin/changes/restore/route.ts` POST (관리자만)
- [x] `components/admin/BulkActionBar.tsx` — "선택 삭제" 추가
- [x] `components/admin/ChangeDetailPanel.tsx` — soft-deleted 표시 + 복원 버튼 (관리자에게만)

**테스트**:
- 일괄 삭제 → `deleted_at` 세팅, UI에서 즉시 숨김
- "삭제됨 보기" 토글 → soft-deleted 항목 표시 (음영)
- 복원 (관리자만) → `deleted_at=NULL`, 다시 표시
- 승인자 권한으로 복원 시도 → 403
- 워크플로 fetch 시 deleted_at NOT NULL 항목 제외

**완료 조건**: 부적절 항목 정리 가능. DB 보존으로 감사 추적 유지.

---

### 슬라이스 6: 워크플로 갱신 — 상태 기반 fetch (P0, 의존: 0, 4)

**목표**: 기존 즉시-AI-트리거 모델 폐기 → 상태 머신 기반 fetch.

**산출물**:
- [x] `scripts/fetch-feedback.ts` (bash → ts 재작성)
  - status 필터링 (manual: approved만 / auto: pending+approved)
  - deleted_at IS NOT NULL 제외
  - target_kind='structure' 항상 manual 처리
- [x] `scripts/load-prompt.ts` — DB에서 system_prompt 로드
- [x] `.github/workflows/review-feedback.yml` 갱신
  - cron_enabled 검사 (false면 조기 종료)
  - DB에서 시스템 프롬프트 로드 후 `-p`로 전달
  - 처리 시작 시 `processing`, 성공 시 `applied + commit_sha`, 실패 시 `failed + error`
- [x] `processing` 30분 타임아웃 감지 (워크플로 self-sweep + 마이그레이션 005의 pg_cron 5분 sweeper)

**테스트**:
- manual 모드 + pending 5 + approved 3 → fetch 결과 3건 (approved만)
- auto 모드 → 8건 모두
- soft-deleted 항목 → 항상 0건
- cron_enabled=false → 0건 (조기 종료)
- AI 처리 실패 시 → `failed + error_log` 기록, 다음 cron이 재시도 안 함

**완료 조건**: 기존 즉시 모델이 완전히 대체됨. 승인 게이트가 실제로 작동.

---

### 슬라이스 7: 자동/수동 모드 토글 + path overrides (P1, 의존: 0, 6)

**목표**: 관리자가 모드를 UI에서 변경, 경로별 강제 지원.

**산출물**:
- [x] `app/admin/settings/page.tsx`
- [x] `app/api/admin/settings/route.ts` GET/PUT
- [x] `lib/changes/path-overrides.ts` (minimatch 기반)
- [x] `components/admin/ModeToggle.tsx` (auto/manual 스위치)
- [x] `components/admin/PathOverrideEditor.tsx` (JSON 편집기 + 검증)
- [x] `scripts/fetch-feedback.ts`에 path_overrides 통합

**테스트**:
- 글로벌 manual + override `{"content/property-tax/**": "auto"}` → property-tax pending도 fetch
- 글로벌 auto + override `{"content/acquisition-tax/**": "manual"}` → acquisition-tax는 approved만
- 잘못된 JSON 입력 → 400 + UI 에러 표시
- 변경 즉시 다음 워크플로 실행에 반영

**완료 조건**: 운영자가 모드를 코드 푸시 없이 조정 가능.

---

### 슬라이스 8: 시스템 프롬프트 외부화 + 이력 (P2, 의존: 0, 6)

**목표**: AI 시스템 프롬프트를 DB로 외부화. 변경 이력 + 롤백.

**산출물**:
- [x] `app/api/admin/prompt-history/route.ts` GET
- [x] `components/admin/SystemPromptEditor.tsx` (textarea + 저장 + 이력 표시)
- [x] PUT `/admin/settings/route.ts`에서 prompt 변경 시 `system_prompt_history`에 이전 값 백업

**테스트**:
- 프롬프트 편집 + 저장 → DB 갱신, 이전 값 history에 적재
- 이력에서 "이 버전으로 복원" → 현재 프롬프트가 그 값으로 교체
- 워크플로 실행 시 최신 프롬프트가 `-p`로 전달됨

**완료 조건**: AI 행동 범위를 코드 푸시 없이 조정 가능.

---

### 슬라이스 9: 비상 정지 + workflow_dispatch (P1, 의존: 6, 7)

**목표**: cron 즉시 정지 + 수동 실행 트리거.

**산출물**:
- [x] `cron_enabled` 토글 UI (`components/admin/ModeToggle.tsx`의 Switch)
- [x] `app/api/admin/dispatch/route.ts` POST — GitHub API workflow_dispatch
- [ ] env에 `GITHUB_TOKEN` (workflow scope) 추가 _(호스트가 적용)_
- [x] `.github/workflows/review-feedback.yml`이 dispatch 이벤트도 처리 (`workflow_dispatch: {}`)

**테스트**:
- 비상 정지 클릭 → cron_enabled=false → 다음 cron 실행 시 즉시 종료
- "지금 처리" 클릭 → workflow_dispatch 호출 → 워크플로 즉시 실행
- 정지 상태에서 dispatch는 동작 (관리자 명시 의도)
- 토큰 누설/만료 → 401 응답 + UI 에러

**완료 조건**: 사고 시 즉시 멈춤 가능. 검토 후 즉시 재개 가능.

---

### 슬라이스 10: 구조파일 변경 안전장치 (P2, 의존: 6)

**목표**: `target_kind='structure'` 항목은 PR 생성, 관리자만 머지.

**산출물**:
- [x] 댓글 폼에 "구조 변경 의견" 토글 (target_kind='structure'로 저장)
- [x] `.github/workflows/review-structure.yml` 신규
  - 새 브랜치 생성 → AI 수정 → `gh pr create`
  - 관리자에게 자동 reviewer 지정 (PR body에 명시)
- [x] `scripts/fetch-feedback.ts`에서 structure 항목은 항상 manual 처리 (resolveMode가 강제)
- [ ] 브랜치 보호 규칙: structure PR은 관리자 1명 승인 필요 (GitHub repo settings) _(호스트가 적용)_

**테스트**:
- target_kind='structure' 항목 승인 → review-structure 워크플로 실행 → PR 생성됨
- PR 미머지 상태에서 항목은 `processing` 유지
- PR 머지 시 `applied + commit_sha` 자동 갱신 (GitHub webhook → Supabase RPC, 또는 별도 cron)
- 승인자가 머지 시도 → 거부 (관리자 승인 필요)

**완료 조건**: 구조 변경이 안전하게 처리됨. 콘텐츠 변경과 분리된 흐름.

---

## Phase 2 — Production 슬라이스

### 슬라이스 11: users 테이블 + Magic Link 인증 (P0, Phase 2 시작)

**목표**: Supabase Auth Magic Link로 인증 전환. 페이즈 1 데이터 보존.

**산출물**:
- [ ] `supabase/migrations/006_phase2_users_auth.sql`
- [ ] `lib/auth/magic-link.ts`
- [ ] `app/auth/callback/route.ts`
- [ ] `app/auth/login/page.tsx` (이메일 입력 폼)
- [ ] env에 `AUTH_PHASE` 토글 추가
- [ ] `middleware.ts`에 AUTH_PHASE 분기 (Phase 1 비번 vs Phase 2 Supabase 세션)

**테스트**:
- AUTH_PHASE=2 + 이메일 입력 → 매직링크 메일 수신 → 클릭 → 로그인
- 등록 안 된 이메일 → 거부
- 페이즈 1 댓글(`author=null`)은 그대로 보임
- 신규 댓글 → `author=<email>, author_user_id=<UUID>`

---

### 슬라이스 12: 사용자 관리 페이지 (P1, 의존: 11)

**목표**: 관리자가 `/admin/users`에서 초대/역할 변경/비활성화.

**산출물**:
- [ ] `app/admin/users/page.tsx`
- [ ] `app/api/admin/users/route.ts` (CRUD)
- [ ] `components/admin/UserList.tsx`, `UserInviteForm.tsx`

**테스트**:
- 신규 이메일 + role 입력 → auth.users invite + users 테이블 insert
- 역할 변경 → 다음 요청에 새 role 적용
- active=false 토글 → 매직링크 받아도 로그인 거부

---

### 슬라이스 13: 본인 댓글 soft delete (P1, 의존: 11)

**목표**: Phase 2에서 담당자가 본인 pending 댓글을 soft delete.

**산출물**:
- [ ] `app/api/comments/[id]/delete/route.ts` POST
- [ ] 댓글 항목에 "삭제" 버튼 (본인이 작성한 pending에만 표시)

**테스트**:
- 본인 pending 댓글 삭제 → `deleted_at` 세팅
- 본인 approved 댓글 삭제 시도 → 403 (승인자 권한)
- 다른 사람 댓글 삭제 시도 → 403

---

## 우선순위 매트릭스

| 슬라이스 | Priority | 의존 | MVP 포함 |
|---------|---------|------|---------|
| 0 | P0 | — | ✅ |
| 1 | P0 | 0 | ✅ |
| 2 | P0 | 0 | ✅ |
| 3 | P1 | 0,1,2 | ✅ |
| 4 | P1 | 3 | ✅ 검토 가능 MVP 완성점 |
| 5 | P1 | 4 | ⭕ |
| 6 | P0 | 0,4 | ✅ 운영 가능 MVP 완성점 (자동화 본질) |
| 7 | P1 | 0,6 | ⭕ |
| 8 | P2 | 0,6 | ❌ |
| 9 | P1 | 6,7 | ⭕ |
| 10 | P2 | 6 | ❌ |
| 11 | P0(Phase 2) | — | — |
| 12 | P1(Phase 2) | 11 | — |
| 13 | P1(Phase 2) | 11 | — |

### 마일스톤 1 — 검토 가능 MVP (슬라이스 0+1+2+3+4)

5개 슬라이스. "비번 입력 후 댓글 제출 → 관리자가 큐 조회 → 일괄 승인" 흐름. 승인된 항목의 자동 반영은 아직 없음(슬라이스 6에서 추가).

**용도**: 시연·데모, 정책 검토, UI/UX 피드백 수집.

### 마일스톤 2 — 운영 가능 MVP (+슬라이스 6)

워크플로 갱신으로 승인된 항목이 실제 AI에 의해 main에 반영됨. **이 시점부터 실서비스 가동 가능.**

### 마일스톤 3 — 완전한 Phase 1 (+슬라이스 5,7,9)

soft delete, 자동/수동 모드 토글, 비상 정지. 운영 안정성 핵심 기능 추가.

### 마일스톤 4 — Phase 1 종료 (+슬라이스 8,10)

프롬프트 DB 외부화, 구조 변경 안전장치. Phase 2 전환 준비 완료.

---

## 완료 추적

각 슬라이스 완료 시:

1. PR 생성 (`feature/003-slice-N-name`)
2. 슬라이스 단위 통합 테스트 통과
3. 운영 문서(`operation-phase1-mvp.md`) 해당 절 업데이트 (필요 시)
4. main 머지

전체 진행은 `feature/003-role-based-approval` 브랜치를 통합 브랜치로 사용. 각 슬라이스는 그 위에서 sub-branch로 작업 후 통합 브랜치로 머지.
