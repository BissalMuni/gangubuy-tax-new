# Project: 세금 정보 시스템 (gangubuy-tax-new)

- Use pnpm as package manager
- Use vitest for testing
- Follow spec-kit workflow: constitution → spec → plan → implement
- Spec 위치: `.specify/memory/constitution.md` (헌법) + `specs/<###-feature>/{spec,plan,tasks}.md` (기능별)
- Code comments in Korean
- Commit messages in English
- TypeScript strict mode — no `any`
- Prefer React Server Components; use `"use client"` only when necessary

---

## Docker Autonomous Mode 안전 규칙 (init-docker-dangerous 스킬 실행 시)

본 프로젝트가 Docker 컨테이너에서 `--dangerously-skip-permissions` 자율 실행될 때 다음 규칙을 **절대적으로** 따른다. 위반 시 즉시 작업을 중단하고 `.claude-output/follow-up.md`에 사유를 기록한다.

### NON-NEGOTIABLE — 절대 실행 금지

1. **DB 마이그레이션 실행 금지**
   - SQL 파일 작성(예: `supabase/migrations/005_*.sql`)은 OK
   - 실행은 금지: `psql`, `supabase db push`, `supabase migration up`, `pnpm supabase migration up` 등 어떤 형태로도 운영/staging DB에 마이그레이션을 적용하지 않는다
   - 호스트 사람이 직접 staging → production 순으로 검증 후 적용한다

2. **git push 금지**
   - `git commit`은 자유롭게 가능 (브랜치 내부 작업)
   - `git push`, `git push --force`, `git push origin <branch>` 모두 금지
   - pre-push hook이 컨테이너 내부에서 차단함 (`/.dockerenv` 감지). hook 회피 시도(`--no-verify` 등)도 금지
   - 호스트에서 사람이 review 후 push

3. **운영 자격증명 사용 금지**
   - `.env.docker`에 staging/local 자격증명만 존재해야 함
   - 만약 `SUPABASE_URL`이 운영 도메인(`gangubuytax.supabase.co` 등)으로 보이면 즉시 작업 중단 + `.claude-output/follow-up.md`에 경고 기록

4. **외부 API 호출 최소화**
   - GitHub API `workflow_dispatch` 트리거 금지 (테스트는 코드 작성으로 충분)
   - Vercel deploy 트리거 금지
   - 콘텐츠 업데이트 외부 API 호출은 모두 mock/staging 대상

### 권장 동작

5. **각 슬라이스 끝에 테스트 실행**: `pnpm test` 통과 후 다음 슬라이스로 넘어간다. 실패 시 fix 시도, 30분 내 해결 안 되면 다음 독립 슬라이스로 이동하고 follow-up.md 기록

6. **타입 검사**: `pnpm typecheck` (또는 `tsc --noEmit`) 통과 확인

7. **린트**: `pnpm lint` 및 `pnpm mdx:lint` 통과

8. **단계 표시**: 각 슬라이스 시작·완료 시 `.claude-output/progress.md`에 타임스탬프와 함께 기록 (init-docker-dangerous 스킬의 PostToolUse 훅이 자동 처리)

9. **모호한 의사결정**: 사용자에게 묻지 말고 가장 단순/합리적인 가정으로 진행, `.claude-output/progress.md`에 `🤔 가정: ...` 기록

### 안전망

- pre-push hook (`.git/hooks/pre-push`): Docker 안에서 push 시도 시 차단
- `.env.docker`: `.gitignore` 처리됨 + 운영 자격증명 미포함이 전제
- 컨테이너 capability: `cap_drop: ALL` + 최소 권한만 (init-docker-dangerous 스킬 기본값)
