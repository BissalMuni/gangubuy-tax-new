# Feature Specification: Role-Based Approval Workflow

**Feature Branch**: `003-role-based-approval`
**Created**: 2026-04-30
**Updated**: 2026-04-30 (Open Questions resolved)
**Status**: Draft
**Input**: 4-역할 모델(관리자/승인자/담당자/AI) + 변경 승인 큐 + 자동/수동 토글로 기존 댓글 자동 반영 구조 재설계

## MVP 원칙

> **참여 마찰 최소화 우선.** 구축과 참여가 먼저다. 담당자는 이름 입력 없이 비번만으로 제보할 수 있어야 한다. 식별·감사는 페이즈 2에서 강화한다.

## 운영 문서 (2원화)

본 spec은 두 페이즈의 **설계**를 모두 포함하지만, **실제 운영 절차는 페이즈별로 분리된 별도 문서**로 관리합니다. 두 페이즈는 **동시 운영하지 않으며**, 전환 시 컷오버(서비스 일시 중단 5~10분)를 거칩니다.

| 문서 | 대상 | 인증 | 담당자 식별 |
|------|------|------|-----------|
| [operation-phase1-mvp.md](operation-phase1-mvp.md) | MVP / 신뢰 그룹 | env 3개 비번 + 쿠키 세션 | 무기명 |
| [operation-phase2-production.md](operation-phase2-production.md) | 본격 운영 | Supabase Auth Magic Link | 이메일(개인 식별) |

전환 절차는 phase2 문서 8장 참조.

## 배경 (Background)

현재 구조의 한계:
- 댓글 작성자는 익명 이름만 입력 → 누가 관리자/승인자/담당자인지 구분 없음
- `comments.processed: boolean`만 있어서 "검토 중", "승인됨", "반영 실패" 등 상태가 표현되지 않음
- GitHub Actions 크론(매시간 :17분)이 미처리 댓글을 **무조건** AI에게 넘김 → 사전 검토 불가
- AI 시스템 프롬프트가 워크플로 YAML에 하드코딩 → UI로 수정 불가
- 직접 파일 수정과 의견 제출의 권한이 분리되지 않음

## 역할 모델 (Roles)

4개 액터(인간 3 + AI 1):

| 역할 | 권한 범위 | 페이즈 1 인증 | 페이즈 2 인증 |
|------|---------|------------|------------|
| **관리자 (Admin)** | 구조파일(`config/`, 네비게이션, 템플릿), AI 시스템 프롬프트, 자동/수동 모드 토글, cron 정지/재개, 담당자/승인자 관리, 시크릿 | env `ADMIN_PASSWORD` + 쿠키 세션 | Supabase Auth Magic Link + `role='admin'` |
| **승인자 (Approver)** | 변경 큐 일괄 승인/반려/삭제(soft), 모드 토글 조회 (편집 불가) | env `APPROVER_PASSWORD` (공유) + 쿠키 세션 | Magic Link + `role='approver'` |
| **담당자 (Editor)** | 의견(댓글) 제출, 첨부 업로드. **직접 파일 수정 불가**, **본인 댓글 삭제 불가** | env `EDITOR_PASSWORD` (공유) — **이름 입력 없음, 무기명** | Magic Link + `role='editor'` (개인 식별) |
| **AI** | 승인된 큐만 처리. 시스템 프롬프트 범위 내에서 `content/` 및 (안전장치 통과 시) 구조파일 수정 | GitHub Actions secrets | 동일 |

### 페이즈 전환

- **페이즈 1 (MVP)**: env 3개 비번 + 담당자 무기명. 빠른 구축과 참여 확보가 목표
- **페이즈 2 (본격 운영)**: Supabase Auth Magic Link로 전환. 이메일 기반 개인 식별, 권한 회수, 진짜 감사 로그 활성화

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 무기명 의견 제출 → 승인자 승인 → AI 반영 (Priority: P1)

담당자는 댓글 폼에서 `EDITOR_PASSWORD`만 입력하고 의견을 제출한다(이름 입력 없음). 큐에 `pending` 상태로 들어가며 작성자 식별 정보는 저장되지 않는다. 승인자는 `/admin/changes`에서 메뉴 트리별로 pending 항목을 보고 체크박스로 일괄 승인한다. 승인된 항목만 워크플로 실행 시 AI가 처리한다.

**Why this priority**: 핵심 플로우. 무기명 제출 + 승인 게이트 + AI 반영의 3단 구조가 본 시스템의 본질.

**Independent Test**: 페이지에서 비번+내용만으로 댓글 제출 → 큐에 pending 표시 → 승인자 페이지에서 승인 → 워크플로 실행 후 `applied` 상태 + 커밋 SHA 기록.

**Acceptance Scenarios**:

1. **Given** 담당자가 댓글 폼 접속, **When** EDITOR_PASSWORD + 내용만 입력해 제출, **Then** 큐에 `status='pending', author=null`로 저장
2. **Given** 비번 불일치, **When** 제출 시도, **Then** 401 응답 + 사용자 친화적 에러 메시지
3. **Given** 승인자가 `/admin/changes` 접속, **When** pending 항목 체크 후 "선택 승인" 클릭, **Then** `status='approved', reviewer=<승인자>, reviewed_at=<지금>`으로 업데이트
4. **Given** 워크플로가 cron 또는 수동으로 실행, **When** `mode='manual'`이면, **Then** `status='approved'` 항목만 fetch
5. **Given** AI가 항목 처리 시작, **When** 처리 시작, **Then** `processing`으로 마킹 → 성공 시 `applied + applied_commit_sha` / 실패 시 `failed + error_log`

---

### User Story 2 - 자동/수동 모드 토글 (글로벌 + 경로별) (Priority: P1)

관리자는 관리 페이지에서 글로벌 모드를 `auto` ↔ `manual`로 전환할 수 있다. 추가로 특정 메뉴/경로에 대해 글로벌과 다른 모드를 강제하는 path override를 설정할 수 있다(예: `content/acquisition-tax/**`만 manual, 그 외는 auto).

**Why this priority**: 사용자 명시 핵심 요구사항. 안전장치(예: 민감한 메뉴는 항상 수동) 구현에 필수.

**Independent Test**: 글로벌 manual + 특정 경로 auto override → 해당 경로 댓글만 자동 처리 확인. 반대 케이스도 검증.

**Acceptance Scenarios**:

1. **Given** `mode='manual'`, **When** 담당자 댓글 제출, **Then** 자동 승격 없이 `pending` 유지
2. **Given** `mode='auto'`, **When** 담당자 댓글 제출, **Then** 워크플로가 `pending+approved` 모두 처리 (또는 제출 시점에 `approved` 자동 마킹)
3. **Given** `mode='manual'`이지만 `path_overrides['content/property-tax/**']='auto'`, **When** 해당 경로 댓글, **Then** auto로 동작
4. **Given** 관리자가 토글 변경, **When** 저장, **Then** `automation_settings.mode`가 즉시 반영
5. **Given** `cron_enabled=false`, **When** cron 실행, **Then** 조기 종료. 단 "지금 처리(workflow_dispatch)" 버튼은 동작

---

### User Story 3 - 변경 이력/승인 페이지 (Priority: P1)

승인자/관리자는 `/admin/changes`에서 메뉴 구조 트리뷰로 모든 변경 항목을 본다. 상태별 필터(pending / approved / processing / applied / rejected / failed)로 거를 수 있고, 본문/첨부 미리보기와 (가능하면) AI 적용 시 예상 diff를 본다. 일괄 승인/반려 버튼으로 한 번에 처리한다.

**Why this priority**: 사용자 명시 요구사항 — "수정 데이터 추가 이력 관리 페이지", "구조/메뉴별 모두 나열 후 체크해서 일괄 승인".

**Independent Test**: 다양한 상태의 항목 시딩 → 페이지에서 필터/체크/일괄 승인이 모두 동작 확인.

**Acceptance Scenarios**:

1. **Given** 승인자 접속, **When** 페이지 로드, **Then** 메뉴 트리뷰로 그룹핑된 변경 항목 표시 (예: "취득세 > 유상취득 > 1주택 (3건 pending)")
2. **Given** 상태 필터를 `pending`으로 설정, **When** 적용, **Then** pending 항목만 표시
3. **Given** 여러 항목 체크 후 "선택 승인" 클릭, **When** 처리, **Then** 모두 `approved`로 일괄 업데이트
4. **Given** "선택 반려" 클릭, **When** 처리, **Then** `rejected` + 반려 사유 입력
5. **Given** `applied` 항목 클릭, **When** 상세 패널 열기, **Then** 적용된 커밋 SHA 링크와 변경된 파일 목록 표시
6. **Given** 항목 미리보기 패널, **When** 첨부 PDF/이미지가 있으면, **Then** 인라인 미리보기 (다운로드 없이 확인 가능)

---

### User Story 4 - AI 시스템 프롬프트 외부화 (Priority: P2)

관리자는 관리 페이지에서 AI에게 전달할 시스템 프롬프트(절대 규칙)를 편집한다. 워크플로는 실행 시 DB에서 최신 프롬프트를 읽어 사용한다. 변경 이력은 보존되어 롤백 가능하다.

**Why this priority**: AI 권한 범위를 코드 푸시 없이 조정 가능 — 운영 유연성을 크게 높이지만 P1은 아님.

**Acceptance Scenarios**:

1. **Given** 관리자가 프롬프트 에디터에서 텍스트 수정, **When** 저장, **Then** `automation_settings.system_prompt`가 업데이트되고 이전 버전이 `system_prompt_history`에 보존
2. **Given** 워크플로 실행, **When** Claude 호출, **Then** DB에서 읽은 최신 프롬프트가 `-p` 인자로 전달
3. **Given** 새 프롬프트로 인해 실패 누적, **When** 관리자가 "이전 버전 복원" 클릭, **Then** 직전 프롬프트로 즉시 롤백

---

### User Story 5 - 구조파일 변경 의견 처리 (Priority: P2)

담당자는 `target_kind='structure'`로 표기된 의견(예: 메뉴 추가 요청, 네비게이션 재배치)을 제출할 수 있다. 단 안전장치를 통과해야만 AI가 구조파일을 수정한다.

**안전장치**:
1. `target_kind='structure'` 항목은 **글로벌 모드와 무관하게 항상 manual** (path override보다 우선)
2. AI 워크플로는 구조파일 수정 시 **별도 PR을 생성** (직접 push 금지). main 머지는 관리자 수동 검토
3. 시스템 프롬프트에 구조파일 수정 시 따라야 할 제약 명시 (예: "navigation.ts 수정 시 기존 ID 변경 금지")
4. 구조 변경 PR은 관리자만 머지 가능 (승인자도 불가)

**Why this priority**: 사용자가 "받되 안전장치 추가" 결정. 잘못된 구조 변경은 사이트 전체에 영향.

**Acceptance Scenarios**:

1. **Given** 담당자가 구조 변경 의견 제출, **When** 저장, **Then** `target_kind='structure'`로 분류
2. **Given** 구조 변경 항목, **When** 워크플로 처리, **Then** main 직접 push 대신 PR 생성
3. **Given** 자동 모드라도, **When** 구조 변경 항목, **Then** 항상 manual (관리자 승인 필수)

---

### User Story 6 - 페이즈 2 마이그레이션 (Priority: P3)

운영이 안정되고 식별·감사가 필요해지면, 인증을 env 비번에서 Supabase Auth Magic Link로 전환한다. 기존 무기명 댓글은 `author=null`로 보존, 신규 댓글부터 이메일 기반 식별이 시작된다.

**Independent Test**: 페이즈 2 활성화 후 무기명 댓글 작성 시도 → 거부. Magic Link 인증 후 작성 → `author=<email>` 기록 확인.

**Acceptance Scenarios**:

1. **Given** 페이즈 2 활성화, **When** 담당자가 사이트 접속, **Then** 매직링크 요청 폼 표시
2. **Given** 이메일로 받은 링크 클릭, **When** 인증 완료, **Then** 쿠키 발급 + `users.role` 조회
3. **Given** 페이즈 2 이전 무기명 댓글, **When** 관리 페이지 조회, **Then** "(무기명, 페이즈 1)"로 표시 + 보존
4. **Given** 페이즈 2 이후 새 댓글, **When** 작성, **Then** `author=<email>`로 저장

---

### Edge Cases

- AI가 처리 도중 워크플로 타임아웃 → `processing` 상태로 남음 → 다음 cron이 30분 이상 `processing`인 항목을 `failed`로 자동 전환
- 승인자가 승인 후 같은 댓글이 다시 보이는 새로고침 경합 → 낙관적 락(`updated_at` 비교)으로 중복 승인 방지
- 자동 모드 중 잘못된 승인이 대량 처리됨 → 관리 페이지의 "비상 정지" 버튼 (`cron_enabled=false`로 즉시 전환)
- AI가 구조 파일까지 수정하려 함 → US-5 안전장치 + 워크플로 `git add` 화이트리스트 이중 차단
- 무기명 담당자가 욕설/스팸 제출 → 승인자가 `rejected`로 일괄 처리. 페이즈 2 이전에는 IP 레이트리밋만 가능
- env 비번 노출 의심 → 관리자가 비번 교체 후 Vercel redeploy. 기존 세션은 새 비번 해시 불일치로 자동 만료

## Requirements *(mandatory)*

### Functional Requirements

**역할 및 인증 (페이즈 1)**
- **FR-001**: 시스템은 관리자/승인자/담당자/AI 4개 역할을 구분해야 한다
- **FR-002**: 관리자/승인자는 각각 `ADMIN_PASSWORD`, `APPROVER_PASSWORD` env 비번 입력 후 쿠키 세션 발급으로 인증된다. `/admin/*` 경로는 Next.js middleware로 보호된다
- **FR-003**: 담당자는 `EDITOR_PASSWORD` 입력만으로 댓글 제출이 허용된다. **이름/이메일 등 식별 정보 입력 없음(무기명)**
- **FR-004**: 비번 불일치 시 401 응답, 시간당 시도 횟수를 IP 단위로 제한해야 한다 (예: 10회/시간)
- **FR-005**: AI는 GitHub Actions secrets로만 인증되며, Supabase service_role key로 DB에 접근한다

**역할 및 인증 (페이즈 2 — Supabase Auth)**
- **FR-006**: 페이즈 2에서는 Supabase Auth Magic Link를 사용한다. `users` 테이블에 `email`, `role` 컬럼이 있고 사전 등록된 이메일만 매직링크 수신 가능
- **FR-007**: 페이즈 2 활성화 후 페이즈 1 비번 인증 경로는 비활성화되어야 한다 (선택: 관리자만 fallback 유지)

**변경 큐 (상태 머신)**
- **FR-008**: 댓글/첨부는 `status` 컬럼을 가지며 다음 상태를 지원한다: `pending`, `approved`, `processing`, `applied`, `rejected`, `failed`
- **FR-009**: 상태 전이 규칙:
  - `pending → approved` (승인자 승인) 또는 `pending → rejected` (승인자 반려)
  - `approved → processing` (워크플로 fetch)
  - `processing → applied` (커밋 성공) 또는 `processing → failed` (실패)
  - `processing → failed` 자동: `processing` 상태로 30분 이상 지속된 항목은 시스템이 자동 `failed`로 전환하고 `error_log='timeout'` 기록 (워크플로 타임아웃 또는 좀비 작업 회수)
  - `failed` → 재시도: 관리자가 수동으로 `failed → approved`로 되돌릴 수 있다 (재시도. 본 전이는 명시적 사용자 액션으로만 발생)
- **FR-009a**: **동시성 제어**: 모든 상태 전이는 낙관적 락(`updated_at` 비교)을 사용한다. 클라이언트는 마지막으로 본 `updated_at`을 함께 보내고, 서버가 현재 값과 일치할 때만 전이를 적용한다. 불일치 시 409 Conflict 응답 + 최신 상태 동봉
- **FR-010**: 각 항목은 `author`(페이즈 1: null, 페이즈 2: email), `reviewer`, `reviewed_at`, `applied_commit_sha`, `target_kind`('content'|'structure'), `error_log`, `reject_reason`, `deleted_at`, `deleted_by` 컬럼을 기록해야 한다

**삭제 정책 (Soft Delete)**
- **FR-011**: 모든 삭제는 **soft delete**로만 처리한다. `deleted_at`(timestamp) + `deleted_by`(actor) 플래그만 세팅하고 DB 레코드는 영구 보존한다. Hard delete는 금지
- **FR-012**: UI는 `deleted_at IS NOT NULL` 항목을 기본 숨김. AI 워크플로 fetch도 동일 조건으로 제외 (이미 `applied` 상태라도 후속 처리 차단)
- **FR-013**: "삭제(soft)"와 "반려(rejected)"는 **별개 액션**:
  - **반려**: AI 반영 거부 결정 (`status='rejected'`, `reject_reason` 기록). 큐 흐름 종료
  - **삭제**: 화면 표시 제외 (`deleted_at` 세팅). status와 직교적 — pending/approved/applied 어느 상태에서도 가능
- **FR-014**: 삭제 권한
  - **페이즈 1**: 승인자/관리자만 가능 (담당자는 무기명 → 본인 식별 불가)
  - **페이즈 2**: 본인(author 이메일 일치) + 승인자/관리자 가능
- **FR-015**: 관리자는 `/admin/changes`에서 "삭제됨 보기" 토글로 soft-deleted 항목 조회 + 복원(`deleted_at = NULL`) 가능

**관리 페이지 (`/admin/changes`)**
- **FR-016**: 페이지는 메뉴 구조 트리뷰로 변경 항목을 그룹핑하여 표시해야 한다
- **FR-017**: 상태별 다중 필터 + 검색(내용/경로)을 지원해야 한다
- **FR-018**: 각 항목에 체크박스를 제공하고 "선택 승인 / 선택 반려 / 선택 삭제(soft) / 전체 승인" 일괄 작업을 지원해야 한다
- **FR-019**: 항목 상세 패널은 본문, 첨부 인라인 미리보기, (선택) AI 드라이런 결과 diff를 표시해야 한다
- **FR-020**: `applied` 항목은 커밋 SHA로 GitHub 커밋 페이지 링크를 제공해야 한다

**자동/수동 모드 + 경로 override**
- **FR-021**: 시스템은 글로벌 모드 토글(`auto` | `manual`)을 지원해야 한다
- **FR-022**: `automation_settings.path_overrides`로 경로 패턴별 모드 강제가 가능해야 한다 (예: `{ "content/acquisition-tax/**": "manual" }`)
- **FR-023**: `manual` 모드에서 워크플로는 `status='approved'` 항목만 fetch해야 한다
- **FR-024**: `auto` 모드에서 워크플로는 `pending+approved` 항목 모두 fetch하거나, 댓글 제출 시 즉시 `approved`로 마킹해야 한다
- **FR-025**: 관리자는 `cron_enabled` 플래그로 cron 자체를 정지/재개할 수 있어야 한다 (비상 정지). 비상 정지의 영향 범위:
  - **새 워크플로 실행 차단**: cron + workflow_dispatch 모두 즉시 거부 (단 관리자가 명시적으로 "강제 실행"을 누르면 dispatch는 통과 — UI에서 별도 확인 모달)
  - **이미 `processing` 중인 항목**: 워크플로 자체는 GitHub 측에서 진행 중이라 강제 종료 불가. 30분 타임아웃(FR-009)으로 자연 종료되거나, 관리자가 GitHub Actions UI에서 수동 cancel
  - **재개 후**: `cron_enabled=true`로 돌리면 다음 cron부터 정상 실행. 정지 중 누적된 `pending`/`approved`는 그대로 처리됨
- **FR-026**: 관리 페이지의 "지금 처리(workflow_dispatch)" 버튼으로 즉시 실행이 가능해야 한다

**AI 시스템 프롬프트**
- **FR-027**: AI 시스템 프롬프트는 `automation_settings.system_prompt`에 저장되며 관리자만 편집할 수 있어야 한다
- **FR-028**: 워크플로는 실행 시 DB에서 최신 프롬프트를 읽어 사용해야 한다
- **FR-029**: 프롬프트 변경 이력은 `system_prompt_history`로 보존되어 롤백 가능해야 한다

**구조파일 변경 안전장치**
- **FR-030**: `target_kind='structure'` 항목은 글로벌 모드와 무관하게 **항상 manual**이어야 한다
- **FR-031**: AI는 구조파일 수정 시 main 직접 push 대신 **PR을 생성**해야 한다
- **FR-032**: 구조 변경 PR은 관리자만 머지 가능해야 한다 (CODEOWNERS 또는 브랜치 보호 규칙)
- **FR-033**: AI의 직접 수정 가능 경로는 시스템 프롬프트 + 워크플로 `git add` 화이트리스트로 이중 제한되어야 한다

**감사/롤백**
- **FR-034**: 모든 상태 전이 + soft delete/복원은 `change_audit` 테이블에 기록되어야 한다 (`change_id, from_status, to_status, actor, at, reason`)
- **FR-035**: `applied` 항목은 커밋 SHA로 GitHub revert가 가능해야 한다 (UI에서 revert PR 생성 버튼 — P3)

### Key Entities

- **(페이즈 1) Session**: 쿠키 기반 단순 세션. `cookie_token, role('admin'|'approver'), expires_at(12h)`. 관리자/승인자만 발급. **담당자는 세션을 발급하지 않는다** — 매 댓글 제출 시 `EDITOR_PASSWORD`를 요청 본문에 포함시켜 1회용 게이트로만 검증
- **(페이즈 2) User**: `id, email, role('admin'|'approver'|'editor'), active, created_at` — Supabase Auth `auth.users`와 1:1
- **Change Item** (기존 `comments`/`attachments` 확장): `id, content_path, target_kind, body, attachments, author(nullable), status, reviewer, reviewed_at, applied_commit_sha, error_log, reject_reason, deleted_at(nullable), deleted_by(nullable), created_at`
- **Automation Settings**: `mode, path_overrides(jsonb), cron_enabled, system_prompt, updated_by, updated_at`
- **System Prompt History**: `id, prompt, updated_by, updated_at`
- **Change Audit**: `change_id, from_status, to_status, actor, at, reason`

## Success Criteria *(mandatory)*

- **SC-001**: 담당자는 클릭 3회 이내에(페이지 진입 → 비번 입력 → 내용 입력 → 제출) 의견을 제출할 수 있어야 한다 (참여 마찰 최소화)
- **SC-002**: 승인자는 100건 이상의 pending 항목을 1분 이내에 검토하고 일괄 승인할 수 있어야 한다
- **SC-003**: 모드 토글(글로벌/경로별) 변경은 다음 워크플로 실행에 즉시 반영되어야 한다
- **SC-004**: AI는 시스템 프롬프트와 워크플로 화이트리스트를 위반하여 허가 외 파일을 수정한 적이 0건이어야 한다
- **SC-005**: `applied` 변경은 모두 커밋 SHA로 추적 가능하며 감사 로그가 30일 이상 보존된다
- **SC-006**: 페이즈 2 마이그레이션 시 페이즈 1 데이터(무기명 댓글)는 100% 보존된다
- **SC-007**: IP 단위 시도 횟수 제한이 동작해야 한다 — 댓글 제출 11회/시간 시 11번째는 429 응답, 로그인 6회/시간 시 6번째는 차단
- **SC-008**: `processing` 상태로 30분을 초과한 항목은 다음 검사 사이클(최대 5분 내)에 자동 `failed`로 전환되어야 한다
- **SC-009**: 동시 승인 경합 시 두 클라이언트 중 정확히 한 쪽만 200 OK, 다른 쪽은 409 Conflict로 거부되어야 한다 (낙관적 락)

## Migration / 기존 구조와의 관계

| 기존 | 새 구조 (페이즈 1) | 페이즈 2 |
|------|----------------|---------|
| `comments.author` 텍스트 입력 | `author=null` (무기명) | `author=<email>` |
| `comments.processed: bool` | `status: enum` (6단계) | 동일 |
| 익명 이름 매칭 → hard delete | Soft delete만 (UI 숨김 + DB 보존). 승인자/관리자만 가능. 담당자 본인 삭제 불가(무기명) | Soft delete + 본인(이메일 일치)도 가능 |
| 워크플로 YAML 하드코딩 시스템 프롬프트 | DB 외부화 + 관리 UI + 이력 | 동일 |
| 댓글 = 즉시 AI 트리거 | 승인 게이트 + 모드 토글 | 동일 |
| (없음) | `/admin/changes` + 트리뷰 + 일괄 승인 | 동일 |
| (없음) | 감사 로그 (`change_audit`) | 동일 |
| (없음) | 구조파일 변경: PR 생성 + 관리자 머지 | 동일 |

## 작업 진행 (Q5 결정 반영)

- 본 spec의 구현은 **새 브랜치**에서 진행 (`003-role-based-approval`)
- 현재 origin/main보다 19커밋 앞선 로컬 main은 별도 결정 필요 (먼저 푸시할지, 본 작업과 분리할지)

## Resolved Decisions (Open Questions 답변)

| # | 질문 | 결정 |
|---|------|------|
| Q1 | 인증 방식 | **페이즈 1**: env 3개 비번(관리자/승인자/담당자 공유) + 쿠키 세션. **페이즈 2**: Supabase Auth Magic Link |
| Q2 | 담당자 등록 | **페이즈 1**: 무기명, 등록 절차 없음. 비번만 알면 누구나. **페이즈 2**: 사전 등록된 이메일에 매직링크 |
| Q3 | 모드 토글 단위 | 글로벌 + 메뉴별 path override 지원 |
| Q4 | 구조파일 변경 의견 허용 | 허용하되 안전장치 적용: 항상 manual / PR 생성 / 관리자만 머지 |
| Q5 | 19개 미푸시 커밋 처리 | 본 작업은 새 브랜치 신설로 진행. 미푸시 커밋은 별도 결정 |

## Assumptions

- 사이트 콘텐츠 읽기는 인증 불필요 (공개)
- 페이즈 1은 관리자 1명, 승인자 1~2명, 담당자 비번을 신뢰 가능한 채널로 공유
- 무기명 제출은 신뢰 환경(닫힌 그룹) 가정 — 외부 공개 시 IP 레이트리밋 + 페이즈 2 우선 도입
- AI 호출은 Claude Code via GitHub Actions로 유지
- 콘텐츠 저장소는 git + MDX 유지 (별도 CMS 도입 안 함)
- Supabase는 그대로 사용 (Postgres + Storage + 페이즈 2 Auth)

## Next Artifacts (spec-kit 컨벤션)

- `plan.md` — 기술 구현 계획 (Next.js middleware, RLS, 워크플로 변경)
- `data-model.md` — DB 스키마 + 마이그레이션 SQL (`005_role_approval.sql` 등)
- `tasks.md` — 작업 분할 (페이즈 1 MVP → 페이즈 2 Magic Link 순)
- `contracts/` — API 계약 (`/api/admin/*`, `/api/comments` 갱신)
