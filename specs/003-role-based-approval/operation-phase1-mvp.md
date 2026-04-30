# Operation Manual — Phase 1 (MVP)

**대상**: env 비번 인증 + 담당자 무기명 단계
**전제**: 신뢰 가능한 닫힌 그룹 운영 (외부 공개 전)
**관계 문서**: [spec.md](spec.md)

> ⚠️ **이 문서는 Phase 1 전용입니다.** Phase 2(Supabase Magic Link) 운영 절차는 [operation-phase2-production.md](operation-phase2-production.md)를 참조하세요. 두 페이즈는 **동시 운영하지 않습니다** (전환 시 일시 중단 후 컷오버).

---

## 1. 인증 모델 (요약)

| 역할 | 인증 방식 | 식별 |
|------|---------|------|
| 관리자 | `ADMIN_PASSWORD` 입력 → 쿠키 세션 (12h) | 단일 (관리자 1명 가정) |
| 승인자 | `APPROVER_PASSWORD` 입력 → 쿠키 세션 (12h) | 공유 비번, **누가 승인했는지 비식별** |
| 담당자 | `EDITOR_PASSWORD` 입력만 (이름 입력 없음) | **무기명** (`author=null`) |
| AI | GitHub Actions secrets | service_role |

## 2. 환경 변수 설정

### Vercel (운영 환경)

```env
# 인증 (Phase 1)
ADMIN_PASSWORD=<강한 무작위 문자열, 16자 이상>
APPROVER_PASSWORD=<강한 무작위 문자열, 16자 이상>
EDITOR_PASSWORD=<공유용, 8자 이상이라도 무방하나 12자+ 권장>
SESSION_SECRET=<쿠키 서명용, 32자 무작위>

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role>
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon>

# 인증 페이즈 명시 (Phase 2 전환 시 토글)
AUTH_PHASE=1
```

### GitHub Actions Secrets

```
CLAUDE_CODE_OAUTH_TOKEN
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

### 비번 생성 권장 명령

```bash
# 32바이트 무작위
openssl rand -base64 32
```

## 3. 일상 운영 절차

### 3-1. 담당자 추가 (= 비번 공유)

1. 신뢰 가능한 채널(개인 메신저)로 `EDITOR_PASSWORD` 전달
2. 댓글 폼 URL 안내
3. **별도 등록 절차 없음** — 비번 알면 즉시 작성 가능

### 3-2. 담당자 회수 (= 비번 교체)

특정 담당자만 차단 불가능 → **전원 비번 교체 필요**:

1. Vercel 대시보드 → Environment Variables → `EDITOR_PASSWORD` 신규 값으로 교체
2. Redeploy (Production)
3. 잔류 담당자에게 신규 비번 재공유

> 회수가 잦은 환경이라면 Phase 2 마이그레이션을 우선하세요.

### 3-3. 승인자 추가

1. `APPROVER_PASSWORD`를 신뢰 채널로 공유
2. `/admin/changes` 접속 → 비번 입력 → 승인 작업 가능
3. **누가 승인했는지 기록되지 않음** — `change_audit.actor='approver(shared)'`로만 표시

### 3-4. 일일 승인 워크플로

1. `/admin/changes` 접속, `pending` 필터
2. 메뉴 트리뷰에서 분야별 그룹 확인
3. 본문/첨부 미리보기 → 합리적이면 체크 → "선택 승인"
4. 부적절(스팸/욕설/관련 없음) → 체크 → "선택 반려" + 사유 입력
5. cron(매시간 :17분 UTC) 또는 "지금 처리" 버튼으로 AI 실행

### 3-5. 모드 전환

| 상황 | 권장 모드 |
|------|---------|
| 평시 | `manual` (글로벌) — 모든 변경 사람 검토 |
| 신뢰 누적 + 안정기 | `auto` (글로벌) — 빠른 반영, 사후 감사 |
| 민감 메뉴(예: 취득세 율) | `path_overrides`로 항상 manual |
| 사고/긴급 점검 | `cron_enabled=false` (비상 정지) |

전환은 `/admin/settings`에서 즉시 반영.

## 4. 인증 흐름 상세

### 담당자 댓글 제출

```
[담당자 브라우저]
  POST /api/comments
  { content_path, body, password: <EDITOR_PASSWORD>, attachments? }

[서버 — app/api/comments/route.ts]
  1) password === process.env.EDITOR_PASSWORD ? OK : 401
  2) IP 레이트리밋 체크 (10회/시간)
  3) 인서트: { author: null, status: 'pending', target_kind: 'content' }
  4) 201 응답 (식별 정보 미포함)
```

### 승인자 승인

```
[승인자 브라우저]
  GET /admin/changes
  
[서버 middleware]
  쿠키에 approver session 없음 → /admin/login 리다이렉트
  
[로그인]
  POST /admin/login { password: APPROVER_PASSWORD }
  → 일치 시 Set-Cookie: session={role:'approver', exp:+12h, sig:HMAC(SESSION_SECRET)}
  
[승인 액션]
  POST /api/admin/changes/approve { ids: [...] }
  → middleware: session 검증 + role in ('approver','admin')
  → 일괄 UPDATE status='approved', reviewer='approver(shared)', reviewed_at=now()
```

## 5. 보안 가이드

### 비번 노출 시 즉시 대응

1. **관리자 비번 노출 의심**: Vercel env 즉시 교체 + redeploy
2. **승인자 비번 노출**: 동일
3. **담당자 비번 노출**: 외부 공개되었다면 새 비번으로 교체. 단순 그룹 내 회람이면 1회 알림 후 운영 지속 가능

### IP 레이트리밋

- 댓글 제출: IP당 10회/시간 (스팸 방지)
- 로그인 시도: IP당 5회/시간 + 5회 연속 실패 시 1시간 차단

### 평문 비번 운영 위험

- ❌ Slack/카톡 단톡방에 비번을 붙여 두지 말 것
- ❌ 코드 리포에 커밋하지 말 것
- ✅ 1Password/비밀번호 매니저 공유 vault 권장

## 6. 데이터 정책

### 무기명 댓글의 한계 명시

- `comments.author = NULL` — 페이즈 1 댓글의 식별자 없음
- 감사 로그(`change_audit.actor`)도 페이즈 1에서는 'approver(shared)' / 'admin(shared)'로만 기록
- 진짜 행위자 추적이 필요하면 Phase 2 전환 필수

### 보존 정책

- `applied` 항목: 영구 보존 (커밋 SHA로 추적 가능)
- `rejected` 항목: 30일 후 본문 삭제 (메타만 보존)
- `failed` 항목: 30일 후 자동 재시도 또는 수동 정리

## 7. 비상 대응

### 7-1. AI가 잘못된 변경을 머지함

```bash
# 1) cron 즉시 정지
관리 페이지 → "비상 정지" 버튼 (cron_enabled=false)

# 2) 변경 revert
git revert <commit_sha>
git push

# 3) 원인 분석 후 시스템 프롬프트 보완
관리 페이지 → AI 프롬프트 편집 → 저장
```

### 7-2. 승인 큐 폭주 (스팸)

```bash
# 임시 차단
EDITOR_PASSWORD 즉시 교체 + redeploy
스팸 항목 일괄 reject
```

### 7-3. 데이터베이스 장애

- 댓글 작성: 임시 불가 (사용자에게 "일시적 오류" 안내)
- 콘텐츠 읽기: 영향 없음 (MDX는 정적)
- 워크플로: 자동 fail → 다음 cron 자동 재시도

## 8. Phase 2 전환 체크리스트

다음 조건 중 하나라도 해당되면 Phase 2 전환을 검토:

- [ ] 담당자 회수 요청이 분기 1회 이상 발생
- [ ] "누가 작성/승인했는지"가 운영상 필요해짐
- [ ] 외부(공개 인터넷) 노출이 예정됨
- [ ] 운영 6개월 경과
- [ ] 감사 로그 신뢰성 요구가 발생

전환 절차는 [operation-phase2-production.md](operation-phase2-production.md) 8장(마이그레이션) 참조.

## 9. 운영 점검 체크리스트 (월간)

- [ ] env 비번 회전 (3개월에 1회)
- [ ] 30일+ `processing` 잔류 항목 확인 후 `failed` 처리
- [ ] 30일+ `rejected` 항목 본문 익명화
- [ ] 시스템 프롬프트 효과성 리뷰 (AI 실패율, 잘못된 반영 빈도)
- [ ] 백업 상태 확인 (Supabase 자동 백업 + GitHub 커밋 이력)
