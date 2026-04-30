import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE_NAME, type SessionRole, type SessionPayload } from './session';

/**
 * Server Component / Route Handler에서 호출하는 세션 가드.
 *
 * 미들웨어가 페이지 진입 자체를 막지만, API 라우트는 미들웨어 matcher 밖일 수
 * 있고, 같은 페이지 안에서도 액션별 권한 분기가 필요하므로 라우트 핸들러 단에서
 * 한 번 더 검증한다 (이중 안전망).
 */
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySession(token);
}

export async function requireSession(
  allowed: readonly SessionRole[],
): Promise<SessionPayload> {
  const session = await getCurrentSession();
  if (!session) {
    const err = new Error('unauthorized') as Error & { status: number };
    err.status = 401;
    throw err;
  }
  if (!allowed.includes(session.role)) {
    const err = new Error('forbidden') as Error & { status: number };
    err.status = 403;
    throw err;
  }
  return session;
}

/**
 * Phase 1 actor 문자열 — change_audit.actor 컬럼 형식.
 */
export function actorOf(session: SessionPayload): string {
  return `${session.role}(shared)`;
}
