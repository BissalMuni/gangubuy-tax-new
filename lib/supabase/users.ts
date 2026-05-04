import { getSupabase } from './server';

/**
 * Phase 2 — users 테이블 조회 헬퍼.
 *
 * service_role 클라이언트로 직접 조회한다 (RLS 우회). 호출측은
 * Supabase Auth로 검증된 auth.uid()를 인자로 넘긴다 — 미인증 사용자가 임의의
 * UUID로 조회하지 못하도록 라우트 핸들러 단에서 인증을 먼저 확인.
 */

export type AppRole = 'admin' | 'approver' | 'editor';

const ALL_ROLES: readonly AppRole[] = ['admin', 'approver', 'editor'];

export interface AppUser {
  id: string;            // auth.users.id (UUID)
  email: string;
  roles: AppRole[];      // 비어 있을 수 없음 (DB CHECK)
  active: boolean;
  invitedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserRow {
  id: string;
  email: string;
  roles: string[] | null;
  active: boolean;
  invited_by: string | null;
  created_at: string;
  updated_at: string;
}

function toAppRole(value: string): AppRole | null {
  return (ALL_ROLES as readonly string[]).includes(value) ? (value as AppRole) : null;
}

function rowToUser(row: UserRow): AppUser {
  const roles = (row.roles ?? [])
    .map(toAppRole)
    .filter((r): r is AppRole => r !== null);
  return {
    id: row.id,
    email: row.email,
    roles,
    active: row.active,
    invitedBy: row.invited_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * auth.uid()로 users 행을 조회. 행 없거나 active=false면 null.
 * 매직링크로 인증된 신원이 운영 화이트리스트에 없으면 거부 (Phase 2 핵심).
 */
export async function getActiveUser(authUserId: string): Promise<AppUser | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('users')
    .select('id, email, roles, active, invited_by, created_at, updated_at')
    .eq('id', authUserId)
    .eq('active', true)
    .maybeSingle();

  if (error) {
    throw new Error(`getActiveUser failed: ${error.message}`);
  }
  if (!data) return null;
  return rowToUser(data as UserRow);
}

/** 이메일로 행 조회 (관리자 화면 — 슬라이스 12에서 활용) */
export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('users')
    .select('id, email, roles, active, invited_by, created_at, updated_at')
    .eq('email', email)
    .maybeSingle();

  if (error) throw new Error(`findUserByEmail failed: ${error.message}`);
  if (!data) return null;
  return rowToUser(data as UserRow);
}

/**
 * 역할 보유 검사. 둘 이상 검사 시 또는 OR 의미.
 *   hasAnyRole(user, ['admin'])             → admin 보유
 *   hasAnyRole(user, ['admin', 'approver']) → 둘 중 하나라도 보유
 */
export function hasAnyRole(user: AppUser, allowed: readonly AppRole[]): boolean {
  if (!user.active) return false;
  return user.roles.some((r) => allowed.includes(r));
}
