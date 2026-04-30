# Operation Manual — Phase 2 (Production)

**대상**: Supabase Auth Magic Link 인증 + 개인 식별 단계
**전제**: 운영 안정화 후, 식별·감사·외부 노출 대응이 필요한 시점
**관계 문서**: [spec.md](spec.md), [operation-phase1-mvp.md](operation-phase1-mvp.md)

> ⚠️ **이 문서는 Phase 2 전용입니다.** Phase 1 운영은 별도 문서를 참조하세요. **두 페이즈는 동시 운영하지 않습니다** — Phase 2 활성화 시 Phase 1 인증 경로는 비활성화됩니다.

---

## 1. 인증 모델 (요약)

| 역할 | 인증 방식 | 식별 |
|------|---------|------|
| 관리자 | Supabase Auth Magic Link + `users.role='admin'` | 이메일 |
| 승인자 | 동일 + `role='approver'` | 이메일 |
| 담당자 | 동일 + `role='editor'` | **이메일 (개인 식별)** |
| AI | GitHub Actions secrets | service_role |

Phase 1 대비 본질적 차이: **담당자가 더 이상 무기명이 아님.** 모든 댓글에 작성자 이메일이 기록됨.

## 2. 환경 변수 설정

### Vercel (운영 환경)

```env
# 인증 페이즈 토글
AUTH_PHASE=2

# Supabase Auth (이미 anon/service 키는 있음)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role>
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon>

# Magic Link 설정
NEXT_PUBLIC_SITE_URL=https://gangubuy-tax.vercel.app
SUPABASE_AUTH_REDIRECT_URL=https://gangubuy-tax.vercel.app/auth/callback

# Phase 1 비번은 **삭제**하거나 fallback용 ADMIN_PASSWORD만 유지 (선택)
# ADMIN_PASSWORD=<선택: 인증 시스템 장애 시 fallback>
```

### Supabase 대시보드 설정

1. **Authentication → Providers → Email**: Enable
2. **Email templates**: 매직링크 메일 템플릿 한국어 커스터마이징
3. **Redirect URLs allowlist**: 운영 도메인 + (선택) 미리보기 배포 도메인
4. **SMTP 설정** (선택): 자체 SMTP 또는 Supabase 기본
5. **Rate limiting**: 이메일 전송 시간당 30회 (스팸 방지)

## 3. `users` 테이블 운영

### 스키마

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin','approver','editor')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  invited_by UUID REFERENCES users(id)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- RLS 정책: 본인 행 SELECT만 허용. 관리는 service_role로만.
```

### 사용자 추가

```
[관리자 화면 — /admin/users]
  "사용자 초대" 버튼
  → 이메일: editor@example.com
  → 역할: editor / approver / admin
  → 저장
  
[서버]
  1) auth.users에 invite (Supabase 메일 발송)
  2) users 테이블에 (id, email, role, active=true, invited_by) insert
  
[초대 받은 사람]
  메일의 매직링크 클릭 → 즉시 로그인 + 쿠키 발급
  이후 본인 역할로 사이트 사용 가능
```

### 사용자 회수 (특정 1명 차단)

Phase 1과 결정적 차이: **개별 회수 가능, 전체 비번 교체 불필요.**

```sql
UPDATE users SET active = false WHERE email = 'former-editor@example.com';
```

또는 관리 페이지 `/admin/users`에서 토글 OFF.

`active=false`인 사용자는 매직링크를 받아도 로그인 시 `app/auth/callback`에서 거부.

### 역할 변경

```sql
UPDATE users SET role = 'approver' WHERE email = 'promoted@example.com';
```

기존 세션은 다음 요청 시 갱신된 role 반영 (또는 즉시 로그아웃).

## 4. 일상 운영 절차

### 4-1. 담당자 댓글 제출

Phase 1 대비 차이: **이메일이 곧 신원, 별도 비번 입력 없음.**

```
[로그인 안 된 상태]
  사이트 접속 → 댓글 제출 시도
  → middleware: 미인증 → /auth/login 리다이렉트
  → 이메일 입력 → 매직링크 발송
  → 메일 클릭 → 인증 완료, 원래 페이지로 복귀
  
[로그인 상태]
  댓글 폼: 본인 이메일이 상단에 표시됨
  내용 입력 → 제출
  → 서버: { author: <이메일>, status: 'pending', editor_user_id: <UUID> } 저장
```

### 4-2. 승인자 작업

Phase 1과 거의 동일하되, **승인 시 누가 승인했는지 이메일이 기록됨**:

```
POST /api/admin/changes/approve { ids: [...] }
→ session.user.role in ('approver','admin') 검증
→ UPDATE status='approved', reviewer=<승인자 이메일>, reviewed_at=now()
```

### 4-3. 본인 댓글 삭제 — Soft Delete (Phase 1과 다른 정책)

**공통 원칙**: 삭제는 항상 soft delete (`deleted_at` + `deleted_by` 세팅, DB 보존). Hard delete 없음.

| 행위자 | Phase 1 | Phase 2 |
|--------|--------|--------|
| 담당자 본인 | 불가 (무기명) | **가능** (이메일 일치 + status='pending'에 한함) |
| 승인자 | 가능 | 가능 |
| 관리자 | 가능 | 가능 |

**API 흐름 (Phase 2 본인 삭제)**:

```
POST /api/comments/<id>/delete
→ session.user.email === comment.author && comment.status === 'pending' ? OK : 403
→ UPDATE comments SET deleted_at = now(), deleted_by = <email> WHERE id = <id>
```

- `status='approved'` 이상은 본인이 직접 soft delete 불가. 승인자에게 "삭제 요청"하거나, 승인자가 직접 처리
- `deleted_at` 세팅 후 UI는 즉시 숨김. AI 워크플로도 fetch 대상에서 제외
- 복원이 필요하면 관리자가 `/admin/changes` "삭제됨 보기" 토글 → 복원

**삭제 ≠ 반려**: 페이즈 2에서도 동일. 반려는 status 전이(`rejected`), 삭제는 직교 플래그.

### 4-4. 모드 전환

Phase 1과 동일. `/admin/settings`에서 토글.

## 5. 보안 가이드

### Phase 1 대비 강화

| 항목 | Phase 1 | Phase 2 |
|------|--------|--------|
| 비번 유출 위험 | 공유 비번이라 큼 | 매직링크 1회용, 위험 ↓ |
| 개별 회수 | 불가 (전체 교체) | 즉시 가능 (`active=false`) |
| 감사 로그 신뢰성 | "공유 actor"로만 기록 | 이메일 단위로 정확 |
| 위장 위험 | 비번만 알면 가능 | 메일 인증이라 거의 불가 |

### 새로 신경 써야 할 것

- **이메일 계정 보안**: 사용자의 이메일이 곧 신원 → 사용자 본인이 이메일 2FA 설정 권장
- **매직링크 만료**: Supabase 기본 1시간. 너무 길면 보안 위험, 너무 짧으면 UX 저하
- **세션 만료**: 권장 30일 + 30일 미접속 시 자동 만료

## 6. 데이터 정책

### 댓글 식별 정보

- `comments.author = <email>` — 페이즈 2 신규 댓글
- `comments.author = NULL` — 페이즈 1 잔존 댓글 (보존)
- 관리 페이지에서 표시: 페이즈 1 댓글은 "(무기명, Phase 1)" 라벨

### 감사 로그

```sql
INSERT INTO change_audit (
  change_id, from_status, to_status,
  actor,           -- Phase 2: 이메일
  actor_user_id,   -- Phase 2: UUID 추가
  at, reason
);
```

### Soft delete vs 익명화 vs Hard delete

| 액션 | 트리거 | DB 효과 | 사용 시점 |
|------|-------|--------|---------|
| **Soft delete** | 일반 삭제 (UI 숨김) | `deleted_at`, `deleted_by` 세팅, 본문 보존 | 사용자가 "이 댓글 안 보이게" 요청 |
| **익명화** | 보존 정책 (`rejected` 30일 경과 등) | `author=NULL`, 본문은 그대로 | 식별 정보만 제거하고 데이터는 분석/감사에 유지 |
| **Hard delete** | GDPR 등 법적 요청 | `DELETE` 실행, 감사 로그도 `(deleted)`로 마스킹 | "내 모든 데이터 영구 삭제" 요청 시에만 |

**GDPR-style 영구 삭제 절차** (사용자가 "내 모든 데이터 삭제" 요청):

```sql
-- 1) 본인이 작성한 모든 댓글 hard delete
DELETE FROM comments WHERE author = <email>;
DELETE FROM attachments WHERE uploaded_by = <email>;

-- 2) 감사 로그의 actor 마스킹 (감사 무결성을 위해 행 자체는 보존)
UPDATE change_audit SET actor = '(deleted)' WHERE actor = <email>;

-- 3) 사용자 계정 영구 삭제
DELETE FROM auth.users WHERE id = <UUID>;
-- (users 테이블은 ON DELETE CASCADE로 자동 정리)
```

> ⚠️ Hard delete는 비가역적. 반드시 사용자 본인 확인 + 관리자 2인 승인 절차 후 실행 권장.

## 7. 비상 대응

### 7-1. 매직링크 메일이 안 옴

1. Supabase Auth 로그 확인 (`Authentication → Logs`)
2. 사용자 이메일 스팸함 확인 안내
3. SMTP 장애 시 → 관리자가 임시로 `auth.users`에 비번 설정 (fallback)
4. 빈번하면 자체 SMTP(SendGrid 등) 도입 검토

### 7-2. 인증 시스템 전체 장애

- Phase 1 fallback: env에 `ADMIN_PASSWORD`만 유지하면 관리자가 임시 로그인 가능
- 그 외 경로는 일시 차단

### 7-3. 사용자 계정 탈취 의심

```sql
-- 즉시 비활성화
UPDATE users SET active = false WHERE id = <UUID>;
-- 강제 로그아웃 (모든 refresh token 무효화)
-- Supabase 대시보드 → Authentication → Users → 해당 사용자 → "Sign out user"
```

## 8. Phase 1 → Phase 2 마이그레이션

### 마이그레이션 절차

**전제**: Phase 1이 안정 운영 중. 기존 데이터(comments, attachments)는 보존.

#### 8-1. 사전 준비 (서비스 영향 없음)

1. `users` 테이블 마이그레이션 실행 (`migrations/00X_phase2_users.sql`)
2. `comments`/`attachments`에 `editor_user_id UUID NULL` 컬럼 추가
3. `change_audit`에 `actor_user_id UUID NULL` 컬럼 추가
4. Supabase Auth Email Provider 활성화
5. Magic Link 메일 템플릿 작성 및 검증 (테스트 이메일로)
6. 관리자 본인 계정을 `users` 테이블에 사전 insert (admin 역할)

#### 8-2. 사용자 사전 등록

1. 모든 기존 담당자/승인자 이메일을 수집
2. `/admin/users` 페이지에서 일괄 초대 (또는 SQL bulk insert)
3. 각 사용자에게 "n월 n일부터 인증 방식이 바뀝니다" 안내

#### 8-3. 컷오버 (서비스 일시 중단 5~10분)

```bash
# 1) 메인터넌스 모드 ON
관리 페이지 → cron_enabled=false
사용자 안내 배너 활성화

# 2) AUTH_PHASE 토글
Vercel env: AUTH_PHASE=2 로 변경
Redeploy

# 3) 검증
- 관리자가 매직링크로 로그인 가능?
- 신규 댓글에 author=<email> 기록되는가?
- 페이즈 1 잔존 댓글은 그대로 보이는가?

# 4) 메인터넌스 OFF
cron_enabled=true
배너 제거
```

#### 8-4. 사후 정리

1. 1주일 후 Phase 1 env 변수(`EDITOR_PASSWORD`, `APPROVER_PASSWORD`) 삭제
2. (선택) `ADMIN_PASSWORD`는 fallback으로 유지
3. 이전 Phase 1 댓글 익명화 정책 결정 (그대로 유지 권장)

### 롤백 시나리오

매직링크 발송 실패 등 심각한 문제가 1시간 이내에 해결 안 되면:

```bash
Vercel env: AUTH_PHASE=1 로 복원
Redeploy
```

Phase 1 env 비번이 그대로 남아 있으면 즉시 복구 가능. 따라서 "8-4 1주일 후 비번 삭제"는 **안전 확인 후 진행**.

## 9. 운영 점검 체크리스트 (월간)

- [ ] 비활성 사용자 정리 (3개월 미접속 → 비활성화 검토)
- [ ] 역할 변경 이력 검토 (잘못 부여된 권한 없는지)
- [ ] Auth 로그 이상 패턴 확인 (반복 실패, 외국 IP 등)
- [ ] 30일+ `processing` 잔류 항목 확인 후 `failed` 처리
- [ ] 시스템 프롬프트 효과성 리뷰
- [ ] 백업 상태 확인

## 10. 향후 강화 옵션 (Phase 2.x)

- **2FA**: Supabase는 TOTP 2FA 지원 (관리자/승인자에게 강제)
- **SSO**: Google/GitHub OAuth 추가 (편의성)
- **세션 디바이스 관리**: 사용자가 본인 활성 세션 조회/종료
- **CODEOWNERS 자동화**: 구조파일 PR에 관리자 자동 reviewer 지정
- **Webhook 알림**: pending 항목이 일정 시간 적체되면 Slack/Discord 알림
