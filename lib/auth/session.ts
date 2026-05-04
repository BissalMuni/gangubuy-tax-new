import { SignJWT, jwtVerify } from 'jose';

/**
 * Phase 1 쿠키 세션 (jose JWT 기반).
 *
 * - 알고리즘: HS256 (대칭키, env SESSION_SECRET 32바이트 이상 권장)
 * - 만료: 12시간 (FR-002)
 * - 담당자(editor)는 세션을 발급하지 않는다 — 1회용 비번 게이트만 통과 (Key Entities §Session)
 *
 * Phase 2 (Supabase Auth Magic Link) 세션은 본 모듈을 사용하지 않는다.
 * Phase 2 식별은 lib/supabase/auth-client.ts + lib/supabase/users.ts 참조.
 * 통합 세션 추출은 lib/auth/role-guard.ts의 getCurrentSession() 사용.
 */

export type SessionRole = 'admin' | 'approver';

export interface SessionPayload {
  role: SessionRole;
  /** issued-at, jose가 자동 채움 */
  iat?: number;
  /** expiration, jose가 자동 채움 */
  exp?: number;
}

export const SESSION_COOKIE_NAME = 'session';
export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12시간

/**
 * 인증 페이즈 토글 (FR-001 운영 모드 분기).
 *
 * AUTH_PHASE=2 → Supabase Auth Magic Link
 * 이외 (미설정 / '1' / 임의값) → Phase 1 비번 게이트 (안전 기본값)
 */
export function getAuthPhase(): 1 | 2 {
  return process.env.AUTH_PHASE === '2' ? 2 : 1;
}

function getSecret(): Uint8Array {
  const raw = process.env.SESSION_SECRET;
  if (!raw || raw.length < 16) {
    throw new Error(
      'SESSION_SECRET must be set (>=16 chars, recommended 32+ random bytes)',
    );
  }
  return new TextEncoder().encode(raw);
}

export async function createSession(role: SessionRole): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.role !== 'string') return null;
    if (payload.role !== 'admin' && payload.role !== 'approver') return null;
    return {
      role: payload.role,
      iat: typeof payload.iat === 'number' ? payload.iat : undefined,
      exp: typeof payload.exp === 'number' ? payload.exp : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * 쿠키 옵션 (production은 secure=true).
 */
export function sessionCookieOptions(): {
  httpOnly: true;
  sameSite: 'lax';
  secure: boolean;
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}
