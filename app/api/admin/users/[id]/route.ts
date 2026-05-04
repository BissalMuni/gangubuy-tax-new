import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/role-guard';
import { getSupabase } from '@/lib/supabase/server';
import type { AppRole } from '@/lib/supabase/users';

/**
 * Phase 2 — 개별 사용자 갱신.
 *
 * - PATCH: { roles?: AppRole[]; active?: boolean }
 *   roles 갱신 시 빈 배열은 거부 (CHECK 제약 위반 방지).
 *   active=false 토글로 사용자 회수 (auth.users는 보존, RLS는 user_has_role()이
 *   active=true 필터로 차단).
 *
 * 관리자 본인을 비활성화하려는 시도는 안전망 차원에서 거부.
 */

const VALID_ROLES: AppRole[] = ['admin', 'approver', 'editor'];

function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && (VALID_ROLES as string[]).includes(value);
}

interface PatchBody {
  roles?: string[];
  active?: boolean;
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let session;
  try {
    session = await requireSession(['admin']);
  } catch (err) {
    const e = err as { status?: number };
    return NextResponse.json({ error: 'unauthorized' }, { status: e.status ?? 401 });
  }

  const { id } = await context.params;
  if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const update: { roles?: AppRole[]; active?: boolean } = {};

  if (Array.isArray(body.roles)) {
    const filtered = body.roles.filter(isAppRole);
    if (filtered.length === 0) {
      return NextResponse.json(
        { error: 'roles must contain at least one valid role' },
        { status: 400 },
      );
    }
    update.roles = filtered;
  }

  if (typeof body.active === 'boolean') {
    // 본인 비활성화 차단 (운영자가 실수로 자기 권한 잠그는 사고 방지)
    if (
      body.active === false &&
      session.phase === 2 &&
      session.userId === id
    ) {
      return NextResponse.json(
        { error: 'cannot deactivate your own account' },
        { status: 400 },
      );
    }
    update.active = body.active;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'no fields to update' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('users')
    .update(update)
    .eq('id', id)
    .select('id, email, roles, active, invited_by, created_at, updated_at')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}
