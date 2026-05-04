import { cookies } from 'next/headers';
import {
  verifySession,
  SESSION_COOKIE_NAME,
  getAuthPhase,
  type SessionRole,
} from './session';
import { getActiveUser, type AppRole, type AppUser } from '@/lib/supabase/users';
import { createSupabaseServerClient } from '@/lib/supabase/auth-client';

/**
 * 통합 세션 (Phase 1 / Phase 2).
 *
 * - Phase 1: jose JWT 쿠키 → role 단일값
 * - Phase 2: Supabase Auth → DB users 행 → roles 배열
 *
 * 호출측은 Session 객체를 그대로 전달받고, role 검사는 hasRole/actorOf
 * 헬퍼를 사용한다 (페이즈에 따라 분기되는 로직 캡슐화).
 */

export type Phase1Session = {
  phase: 1;
  role: SessionRole;        // 'admin' | 'approver'
};

export type Phase2Session = {
  phase: 2;
  userId: string;           // auth.users.id
  email: string;
  roles: readonly AppRole[]; // 비어 있을 수 없음
};

export type Session = Phase1Session | Phase2Session;

/** Server Component / Route Handler에서 호출 — 세션 없으면 null. */
export async function getCurrentSession(): Promise<Session | null> {
  if (getAuthPhase() === 2) {
    return getPhase2Session();
  }
  return getPhase1Session();
}

async function getPhase1Session(): Promise<Phase1Session | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySession(token);
  if (!payload) return null;
  return { phase: 1, role: payload.role };
}

async function getPhase2Session(): Promise<Phase2Session | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // auth.users에는 있어도 운영 화이트리스트(users 테이블)에 없으면 거부.
  const appUser = await getActiveUser(user.id);
  if (!appUser) return null;
  return toPhase2Session(appUser);
}

export function toPhase2Session(user: AppUser): Phase2Session {
  return {
    phase: 2,
    userId: user.id,
    email: user.email,
    roles: user.roles,
  };
}

/** allowed 역할 중 하나라도 보유하는지. */
export function hasRole(session: Session, allowed: readonly AppRole[]): boolean {
  if (session.phase === 1) {
    return (allowed as readonly string[]).includes(session.role);
  }
  return session.roles.some((r) => allowed.includes(r));
}

/** 보호 라우트에서 호출 — 미인증 401 / 권한 부족 403. */
export async function requireSession(
  allowed: readonly AppRole[],
): Promise<Session> {
  const session = await getCurrentSession();
  if (!session) {
    const err = new Error('unauthorized') as Error & { status: number };
    err.status = 401;
    throw err;
  }
  if (!hasRole(session, allowed)) {
    const err = new Error('forbidden') as Error & { status: number };
    err.status = 403;
    throw err;
  }
  return session;
}

/**
 * change_audit.actor 컬럼 형식.
 * Phase 1: 'admin(shared)' / 'approver(shared)' (공유 비번이라 무기명 그룹)
 * Phase 2: 사용자 이메일 (개인 식별)
 */
export function actorOf(session: Session): string {
  if (session.phase === 1) {
    return `${session.role}(shared)`;
  }
  return session.email;
}

/**
 * change_audit.acting_role — FR-001b: 행위 시점의 역할 컨텍스트.
 *
 * Phase 2에서 다중 역할 보유자가 어떤 권한으로 행동하는지 명시 필요.
 * 호출측이 명시적으로 선택. allowed 중 첫 매칭 역할을 기본값으로 반환.
 */
export function actingRoleOf(
  session: Session,
  allowed: readonly AppRole[],
): AppRole {
  if (session.phase === 1) {
    return session.role;
  }
  const match = session.roles.find((r) => allowed.includes(r));
  if (!match) {
    // hasRole 통과했으면 매치가 있어야 함
    throw new Error('actingRoleOf: no matching role (call requireSession first)');
  }
  return match;
}

export type { AppRole } from '@/lib/supabase/users';
