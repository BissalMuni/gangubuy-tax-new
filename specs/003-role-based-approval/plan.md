# Implementation Plan — Role-Based Approval Workflow

**관계 문서**: [spec.md](spec.md), [data-model.md](data-model.md), [tasks.md](tasks.md), [operation-phase1-mvp.md](operation-phase1-mvp.md), [operation-phase2-production.md](operation-phase2-production.md)

본 문서는 spec의 요구사항을 어떤 기술/구조로 구현할지 정의한다. 페이즈 1(MVP)이 우선이며, 페이즈 2 전환은 별도 컷오버.

---

## 0. 기술 스택 (변경 없음)

- Next.js 15 App Router (RSC + Server Actions)
- Supabase (Postgres + Storage + Phase 2: Auth)
- TypeScript strict
- pnpm
- vitest
- GitHub Actions + Claude Code CLI

신규 의존성 (확정):

| 패키지 | 용도 | 결정 근거 |
|--------|------|---------|
| `jose` | Phase 1 쿠키 JWT 서명/검증 | iron-session보다 의존성 가벼움, Web Crypto API 기반(Edge runtime 호환), Next.js middleware에서 직접 사용 가능 |
| `minimatch` | `path_overrides` 글롭 매칭 | 표준 글롭 문법, 작은 사이즈 |
| `@upstash/redis` + `@upstash/ratelimit` | IP 레이트리밋 (Vercel serverless 다중 인스턴스 대응) | 인메모리는 Vercel에서 무용지물, Upstash REST API 기반이라 cold start 영향 적음. Phase 1 신뢰 그룹에서는 미설정 시 graceful degrade(레이트리밋 미적용 + 경고 로그) |

선택했지만 채택 안 함:
- ~~`iron-session`~~ — jose가 더 단순. iron-session은 추가 추상화만 줄 뿐
- ~~`bcrypt`~~ — env 비번은 환경변수에서 평문으로 옴. `crypto.timingSafeEqual`로 충분(부하 없음). bcrypt는 DB 저장 비번에서만 의미

---

## 0-1. 핵심 메커니즘 결정

### 0-1-1. `processing` 타임아웃 감지

**결정**: **워크플로 시작 시 self-sweep + Supabase pg_cron 보강 (이중 안전망)**

선택 이유: 외부 의존 최소화, 5분 이내 회수 보장(SC-008).

```
[1차: 워크플로 시작 시 (review-feedback.yml 시작 step)]
  UPDATE comments
  SET status='failed', error_log='timeout (>30min)'
  WHERE status='processing' AND updated_at < now() - interval '30 minutes';

[2차: Supabase pg_cron (5분마다)]
  같은 SQL을 5분 주기로 자동 실행. 워크플로가 정지된 상태(cron_enabled=false)에서도 회수 동작
```

대안 검토:
- ❌ Supabase Edge Function — 별도 배포 단위 추가, 운영 복잡도 ↑
- ❌ 워크플로 시작 시만 — `cron_enabled=false` 상태에서 좀비 항목 회수 안 됨
- ✅ pg_cron 단독도 가능하지만, 워크플로 시작 시 self-sweep을 추가하면 회수 지연이 0에 가까움

### 0-1-2. 동시성 제어 (낙관적 락)

**결정**: **PostgreSQL `UPDATE ... WHERE updated_at = $expected` 패턴**

```typescript
const { data, error, count } = await supabase
  .from('comments')
  .update({ status: 'approved', reviewer, reviewed_at: now })
  .eq('id', id)
  .eq('updated_at', expectedUpdatedAt)  // 낙관적 락
  .select('*', { count: 'exact' });

if (count === 0) {
  // 다른 클라이언트가 이미 수정 → 409 Conflict + 최신 상태 동봉
  const fresh = await fetchCurrent(id);
  return Response.json({ error: 'conflict', current: fresh }, { status: 409 });
}
```

`updated_at`은 `touch_updated_at()` 트리거로 자동 갱신되므로, 클라이언트는 fetch 시 받은 값을 그대로 보내면 됨.

### 0-1-3. 레이트리밋 fallback

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? Redis.fromEnv()
  : null;

export const commentRateLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 h') })
  : null;  // null이면 레이트리밋 미적용 + 경고 로그

export const loginRateLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '1 h') })
  : null;
```

운영 시작 시 Upstash 무료 플랜(10K 요청/일)이면 충분.

---

## 1. 디렉토리 구조 (예정)

```
app/
├── admin/                                 # Phase 1: env 비번 보호 / Phase 2: Magic Link
│   ├── layout.tsx                         # 미들웨어 통과 후 공통 레이아웃 (네비)
│   ├── login/page.tsx                     # 비번 입력 폼
│   ├── changes/
│   │   ├── page.tsx                       # 변경 큐 트리뷰 + 일괄 작업
│   │   └── [id]/page.tsx                  # 항목 상세 (선택)
│   ├── settings/page.tsx                  # 모드 토글, path overrides, 시스템 프롬프트 편집
│   └── users/page.tsx                     # Phase 2 전용 (사용자 관리)
│
├── api/
│   ├── comments/route.ts                  # POST 수정: EDITOR_PASSWORD 게이트, author=null
│   ├── comments/[id]/delete/route.ts      # POST: soft delete (Phase 2 본인 + 모든 페이즈 승인자)
│   ├── attachments/route.ts               # POST 수정: EDITOR_PASSWORD 게이트, comment_id 연결
│   ├── auth/login/route.ts                # POST: 비번 검증 → 세션 쿠키
│   ├── auth/logout/route.ts               # POST
│   └── admin/
│       ├── changes/route.ts               # GET: 큐 조회 (status, path 필터)
│       ├── changes/approve/route.ts       # POST: 일괄 승인
│       ├── changes/reject/route.ts        # POST: 일괄 반려
│       ├── changes/delete/route.ts        # POST: soft delete (관리자/승인자)
│       ├── changes/restore/route.ts       # POST: 복원 (관리자만)
│       ├── settings/route.ts              # GET/PUT: automation_settings
│       ├── prompt-history/route.ts        # GET: 프롬프트 이력
│       └── dispatch/route.ts              # POST: workflow_dispatch 트리거
│
├── auth/callback/route.ts                 # Phase 2 Magic Link 콜백
└── (기존 콘텐츠 라우트들)

components/
├── admin/
│   ├── ChangeQueueTree.tsx                # 트리뷰 + 체크박스 (서버 컴포넌트 + 클라 인터랙션)
│   ├── ChangeDetailPanel.tsx              # 본문/첨부 미리보기
│   ├── ModeToggle.tsx                     # auto/manual 스위치
│   ├── PathOverrideEditor.tsx             # JSON 편집기
│   ├── SystemPromptEditor.tsx             # 텍스트 에디터 + 이력
│   └── BulkActionBar.tsx                  # 선택 승인/반려/삭제
│
├── comments/SectionCommentButton.tsx       # 기존, EDITOR_PASSWORD 입력 추가
└── (기존)

lib/
├── auth/
│   ├── session.ts                          # Phase 1: HMAC 쿠키 세션
│   ├── env-passwords.ts                    # ADMIN/APPROVER/EDITOR_PASSWORD 비교
│   ├── magic-link.ts                       # Phase 2: Supabase Auth 헬퍼
│   └── role-guard.ts                       # 미들웨어/route handler용
│
├── changes/
│   ├── status-machine.ts                   # 전이 규칙 + 검증
│   ├── soft-delete.ts                      # deleted_at 처리
│   ├── path-overrides.ts                   # minimatch 기반 경로별 모드 결정
│   └── audit.ts                            # change_audit 기록 헬퍼
│
├── supabase/
│   ├── server.ts                           # 기존
│   ├── comments.ts                         # 기존, 확장
│   ├── attachments.ts                      # 기존, 확장
│   ├── automation-settings.ts              # 신규
│   └── change-audit.ts                     # 신규
│
└── (기존)

middleware.ts                               # Next.js 미들웨어: /admin/* 보호

scripts/
├── fetch-feedback.sh                       # 갱신: status 기반 필터 (mode + path_overrides 반영)
└── (기존)

.github/workflows/
├── review-feedback.yml                     # 갱신: cron_enabled 조회 + system_prompt DB 로드
└── review-structure.yml                    # 신규: target_kind='structure' 처리, PR 생성
```

---

## 2. Phase 1 인증 구현

### 2-1. 미들웨어 (`middleware.ts`)

```typescript
import { NextResponse, type NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/* 보호 (단 /admin/login은 통과)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await verifySession(req.cookies.get('session')?.value);
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    // role 검사
    if (pathname.startsWith('/admin/settings') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/changes', req.url));
    }
    if (pathname.startsWith('/admin/users') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/changes', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### 2-2. 세션 모듈 (`lib/auth/session.ts`)

```typescript
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET!);

export type Session = {
  role: 'admin' | 'approver';
  exp: number;
};

export async function createSession(role: 'admin' | 'approver'): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(SECRET);
}

export async function verifySession(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as Session;
  } catch {
    return null;
  }
}
```

### 2-3. 비번 검증 (`lib/auth/env-passwords.ts`)

```typescript
import { timingSafeEqual } from 'crypto';

export function verifyPassword(input: string, role: 'admin' | 'approver' | 'editor'): boolean {
  const expected = {
    admin: process.env.ADMIN_PASSWORD,
    approver: process.env.APPROVER_PASSWORD,
    editor: process.env.EDITOR_PASSWORD,
  }[role];

  if (!expected) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
```

### 2-4. 로그인 라우트 (`app/api/auth/login/route.ts`)

```typescript
export async function POST(req: NextRequest) {
  const { password, role } = await req.json();
  if (!verifyPassword(password, role)) {
    // 레이트리밋 (IP 기반, 5회/시간 차단)
    return new Response('invalid', { status: 401 });
  }
  if (role === 'editor') {
    // 담당자는 세션 발급 안 함 (1회용 게이트)
    return Response.json({ ok: true });
  }
  const token = await createSession(role);
  cookies().set('session', token, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 43200 });
  return Response.json({ ok: true, role });
}
```

### 2-5. 댓글 제출 (`app/api/comments/route.ts` 갱신)

기존 코드에서:
- `author` 필수 검증 → 옵셔널 (Phase 1: null 허용)
- `password` 필드 추가 → `verifyPassword(input, 'editor')`로 게이트
- 인서트 시 `author=null, status='pending'`

```typescript
export async function POST(req: NextRequest) {
  const { content_path, body, password, section } = await req.json();

  if (!verifyPassword(password, 'editor')) {
    return new Response('unauthorized', { status: 401 });
  }
  // IP 레이트리밋 (10회/시간) — 별도 미들웨어 또는 redis

  if (!body?.trim() || !content_path) {
    return Response.json({ error: 'body, content_path required' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_path,
      body: body.trim().slice(0, 5000),
      section: section?.trim().slice(0, 100) || null,
      author: null,                  // Phase 1 무기명
      status: 'pending',
      target_kind: 'content',        // 기본 (구조 변경은 별도 폼)
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  // 감사 로그
  await recordAudit({
    change_kind: 'comment',
    change_id: data.id,
    action: 'create',
    actor: 'editor(anonymous)',
  });

  return Response.json({ data }, { status: 201 });
}
```

---

## 3. 상태 머신 구현

### 3-1. 전이 검증 (`lib/changes/status-machine.ts`)

```typescript
const TRANSITIONS: Record<ChangeStatus, ChangeStatus[]> = {
  pending: ['approved', 'rejected'],
  approved: ['processing'],
  processing: ['applied', 'failed'],
  applied: [],   // 종료
  rejected: [],  // 종료
  failed: ['approved'],  // 재시도 시 (선택)
};

export function canTransition(from: ChangeStatus, to: ChangeStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export async function transition(
  table: 'comments' | 'attachments',
  id: string,
  to: ChangeStatus,
  actor: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  const supabase = getSupabase();
  const { data: current } = await supabase
    .from(table).select('status').eq('id', id).single();
  if (!current) throw new Error('not found');
  if (!canTransition(current.status, to)) {
    throw new Error(`invalid transition: ${current.status} → ${to}`);
  }
  await supabase.from(table).update({ status: to }).eq('id', id);
  await recordAudit({
    change_kind: table === 'comments' ? 'comment' : 'attachment',
    change_id: id,
    from_status: current.status,
    to_status: to,
    action: actionFor(to),
    actor,
    metadata,
  });
}
```

### 3-2. Soft delete (`lib/changes/soft-delete.ts`)

```typescript
export async function softDelete(
  table: 'comments' | 'attachments',
  id: string,
  actor: string,
): Promise<void> {
  const supabase = getSupabase();
  await supabase.from(table)
    .update({ deleted_at: new Date().toISOString(), deleted_by: actor })
    .eq('id', id)
    .is('deleted_at', null); // 이미 삭제된 건 스킵
  await recordAudit({
    change_kind: table === 'comments' ? 'comment' : 'attachment',
    change_id: id,
    action: 'delete',
    actor,
  });
}

export async function restore(table: 'comments' | 'attachments', id: string, actor: string) {
  const supabase = getSupabase();
  await supabase.from(table)
    .update({ deleted_at: null, deleted_by: null })
    .eq('id', id);
  await recordAudit({ change_kind: table === 'comments' ? 'comment' : 'attachment', change_id: id, action: 'restore', actor });
}
```

---

## 4. 관리 페이지 구현

### 4-1. `/admin/changes` 페이지

서버 컴포넌트 + 클라 인터랙션 분리:

```tsx
// app/admin/changes/page.tsx (서버 컴포넌트)
export default async function Page({ searchParams }) {
  const status = searchParams.status?.split(',') ?? ['pending'];
  const showDeleted = searchParams.deleted === '1';

  const items = await fetchChanges({ status, showDeleted });
  const tree = groupByMenuPath(items);  // navigation.ts 기반

  return (
    <div>
      <FilterBar />
      <ChangeQueueTree initial={tree} />  {/* 클라 컴포넌트, 체크박스 상태 관리 */}
    </div>
  );
}
```

`ChangeQueueTree`는 클라 컴포넌트로 다음을 담당:
- 체크박스 상태 (Set<id>)
- 트리 펼침/접힘
- 선택 시 상세 패널 표시
- "선택 승인 / 반려 / 삭제" 버튼 → 해당 API 호출

### 4-2. 일괄 액션 API (`app/api/admin/changes/approve/route.ts`)

```typescript
export async function POST(req: NextRequest) {
  const session = await requireSession(['approver', 'admin']);  // role guard
  const { ids, kind } = await req.json();

  const actor = `${session.role}(shared)`;  // Phase 1 / Phase 2는 session.email

  for (const id of ids) {
    await transition(kind, id, 'approved', actor);
    await supabase.from(kind).update({ reviewer: actor, reviewed_at: new Date().toISOString() }).eq('id', id);
  }

  return Response.json({ ok: true, count: ids.length });
}
```

### 4-3. 트리뷰 그룹핑 (`lib/admin/group-tree.ts`)

`config/navigation.ts`(또는 `lib/navigation/tree.ts`)의 트리 구조를 사용해 `content_path`로 항목을 분류. 트리에 매핑 안 되는 경로는 "기타" 그룹으로.

---

## 5. 워크플로 갱신

### 5-1. `scripts/fetch-feedback.sh` 갱신

```bash
#!/usr/bin/env bash
# 환경변수 SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 사용
# automation_settings에서 mode + cron_enabled 조회
# - cron_enabled=false: 즉시 [] 반환
# - mode=manual: status='approved' AND deleted_at IS NULL 만 반환
# - mode=auto: status IN ('pending','approved') AND deleted_at IS NULL 반환
# path_overrides 반영: 매칭되는 경로는 강제 모드 적용
```

Node.js로 재작성하는 게 깔끔할 수 있음 → `scripts/fetch-feedback.ts`. 원래 bash인 이유는 워크플로에서 단순 호출용이었지만, 로직이 복잡해졌으므로 ts로 전환.

### 5-2. `.github/workflows/review-feedback.yml` 갱신

```yaml
- name: Apply feedback
  if: steps.check.outputs.skip == 'false'
  env:
    CLAUDE_CODE_OAUTH_TOKEN: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
    SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
  run: |
    # DB에서 시스템 프롬프트 로드
    PROMPT=$(npx tsx scripts/load-prompt.ts)
    claude --print --dangerously-skip-permissions \
      --allowedTools "Bash,Read,Edit,Write,Glob,Grep" \
      -p "$PROMPT"
```

`fetch-feedback.sh`에 `--mark-processing` / `--mark-applied` / `--mark-failed` 서브커맨드 추가하여 status 전이 호출.

### 5-3. 신규 워크플로 `review-structure.yml`

`target_kind='structure'` 항목 전용. 차이:
- `git checkout -b auto/structure-<change_id>` 생성
- 변경 후 main 직접 push 대신 `gh pr create` 호출
- main 머지는 관리자 수동

---

## 6. 자동/수동 모드 구현

### 6-1. 모드 결정 로직 (`lib/changes/path-overrides.ts`)

```typescript
import { minimatch } from 'minimatch';

export function resolveMode(
  contentPath: string,
  globalMode: 'auto' | 'manual',
  overrides: Record<string, 'auto' | 'manual'>,
): 'auto' | 'manual' {
  // overrides의 키 패턴 중 매칭되는 것이 있으면 그 값 사용
  for (const [pattern, mode] of Object.entries(overrides)) {
    if (minimatch(contentPath, pattern)) {
      return mode;
    }
  }
  return globalMode;
}
```

### 6-2. 큐 fetch 시 적용

```typescript
// scripts/fetch-feedback.ts (의사 코드)
const settings = await loadSettings();
if (!settings.cron_enabled) return [];

const all = await supabase.from('comments')
  .select('*')
  .is('deleted_at', null)
  .in('status', ['pending', 'approved']);

const filtered = all.filter(c => {
  const mode = resolveMode(c.content_path, settings.mode, settings.path_overrides);
  return mode === 'manual' ? c.status === 'approved' : true;
});

// target_kind='structure'는 항상 manual 강제
const final = filtered.filter(c => c.target_kind !== 'structure' || c.status === 'approved');

return final;
```

---

## 7. 시스템 프롬프트 외부화

### 7-1. 편집 UI

`/admin/settings`의 텍스트 에디터:
- 현재 프롬프트 표시 (read-only로 비교 가능)
- 편집 후 "저장" → PUT `/api/admin/settings`
- 저장 시 `automation_settings.system_prompt` 갱신 + `system_prompt_history`에 이전 값 insert

### 7-2. 이력 조회 + 롤백

GET `/api/admin/prompt-history` → 최근 20개 표시. 각 항목에 "이 버전으로 복원" 버튼.

---

## 8. 비상 정지

### 8-1. `cron_enabled` 토글

`/admin/settings`에 큰 빨간 버튼 "비상 정지". 누르면 `cron_enabled=false`. UI에서 즉시 상태 반영.

### 8-2. workflow_dispatch 트리거

GitHub API 호출:

```typescript
// app/api/admin/dispatch/route.ts
await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/review-feedback.yml/dispatches`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
  body: JSON.stringify({ ref: 'main' }),
});
```

신규 env 변수 `GITHUB_TOKEN` 필요 (workflow scope 있는 PAT).

---

## 9. Phase 2 전환 계획

데이터 모델은 이미 [data-model.md §Phase 2](data-model.md)에 정의됨. 코드 변경:

1. `lib/auth/magic-link.ts` 추가
2. `app/auth/callback/route.ts` 추가
3. `lib/auth/role-guard.ts`에 AUTH_PHASE 분기 추가
4. `app/api/comments/route.ts`에서 AUTH_PHASE=2면 비번 게이트 → Supabase 세션 검증으로 전환
5. `/admin/users` 페이지 추가
6. AUTH_PHASE 환경변수 토글 + 컷오버

---

## 10. 보안 체크리스트

- [ ] `SESSION_SECRET`은 32바이트+ 무작위, env에서만 로드
- [ ] 쿠키: `httpOnly`, `secure` (production), `sameSite: 'lax'`, 12h 만료
- [ ] 로그인 IP 레이트리밋 (5회/시간 차단)
- [ ] 댓글 제출 IP 레이트리밋 (10회/시간)
- [ ] timing-safe-equal로 비번 비교 (시간 측정 공격 방지)
- [ ] 모든 admin API에 role guard 적용 (CSRF는 SameSite로 1차 방어)
- [ ] CSP 헤더 강화 (관리 페이지)
- [ ] Supabase service_role key는 절대 클라이언트 노출 금지
- [ ] GITHUB_TOKEN은 workflow:write scope만, 만료 90일 회전

---

## 11. 테스트 전략

### 단위 테스트

- `status-machine.canTransition()` — 모든 전이 케이스
- `verifyPassword()` — timing-safe 동작
- `resolveMode()` — glob 매칭 + override 우선순위
- `softDelete()` / `restore()` — 멱등성

### 통합 테스트

- 댓글 제출 (비번 일치/불일치) → DB 상태 검증
- 일괄 승인 → `change_audit` 기록 검증
- 자동 모드 + path override → 적절한 항목만 fetch
- soft delete 후 워크플로 fetch → 제외되는지

### E2E (vitest + playwright 또는 puppeteer)

- 담당자 댓글 제출 → 관리 페이지에 표시 → 일괄 승인 → 워크플로 시뮬레이션 → applied 상태

---

## 12. 마이그레이션 순서 (운영)

```
[Phase 1 출시]
1. supabase/migrations/005_phase1_role_approval.sql 적용
2. .env에 ADMIN/APPROVER/EDITOR_PASSWORD, SESSION_SECRET 추가
3. middleware.ts 배포 → /admin/* 보호 활성화
4. 기존 review-feedback.yml를 갱신본으로 교체
5. /admin/login + /admin/changes 1차 출시
6. /admin/settings + /admin/changes 일괄 액션 2차 출시
7. 비상 정지 + workflow_dispatch 3차 출시

[안정 운영 N개월 후]
8. supabase/migrations/006_phase2_users_auth.sql 적용 (서비스 영향 없음)
9. 사용자 사전 등록 + Magic Link 검증
10. AUTH_PHASE=2 컷오버
11. 1주일 후 Phase 1 비번 env 제거
```

---

## 13. Open Implementation Questions

### 결정됨 (이 plan에 반영)
- ✅ 인증 라이브러리: `jose` (§0)
- ✅ 레이트리밋: `@upstash/ratelimit` + Redis fallback graceful degrade (§0-1-3)
- ✅ `processing` 30분 타임아웃: 워크플로 self-sweep + Supabase pg_cron 5분 주기 (§0-1-1)
- ✅ 동시성 제어: `UPDATE ... WHERE updated_at = $expected` 낙관적 락 (§0-1-2)

### 슬라이스 진입 시 결정

- **첨부파일 단독 제출** (슬라이스 1): 현재 UI는 댓글+첨부 통합 모달. 데이터 모델은 분리(`attachments.comment_id` nullable). MVP는 통합만 노출, 단독 제출은 별도 스펙 또는 후순위
- **`/admin/users`(Phase 2) 디자인** (슬라이스 12): 본 spec 범위 내. 별도 spec 불필요. 슬라이스 12에서 와이어프레임 작성
- **구조 PR 머지 후 자동 `applied` 전환** (슬라이스 10): 두 옵션 중 결정 필요
  - A. GitHub Webhook → Vercel API 라우트 → DB 업데이트 (실시간이지만 webhook secret 관리 필요)
  - B. 워크플로 시작 시 main 최근 커밋의 SHA를 보고 일치하는 PR 머지 사실 추적 (단순, 5분 지연)
  - 슬라이스 10 구현 시점에 운영 부담으로 B 채택 권장
