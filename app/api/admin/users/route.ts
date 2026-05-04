import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/role-guard';
import { getSupabase } from '@/lib/supabase/server';
import { findUserByEmail, type AppRole } from '@/lib/supabase/users';

/**
 * Phase 2 — 사용자 관리 API.
 *
 * - GET: 전체 사용자 목록 (관리자만)
 * - POST: 신규 사용자 초대 (관리자만)
 *   1) supabase.auth.admin.inviteUserByEmail로 매직 메일 발송 + auth.users 생성
 *   2) public.users 테이블에 (id, email, roles, active=true) insert
 *
 * Phase 1에서는 의미 없으므로 항상 200 빈 배열 / 400 반환.
 */

const VALID_ROLES: AppRole[] = ['admin', 'approver', 'editor'];

interface InviteBody {
  email?: string;
  roles?: string[];
}

function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && (VALID_ROLES as string[]).includes(value);
}

export async function GET() {
  try {
    await requireSession(['admin']);
  } catch (err) {
    const e = err as { status?: number };
    return NextResponse.json({ error: 'unauthorized' }, { status: e.status ?? 401 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('users')
    .select('id, email, roles, active, invited_by, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: data ?? [] });
}

export async function POST(req: NextRequest) {
  let session;
  try {
    session = await requireSession(['admin']);
  } catch (err) {
    const e = err as { status?: number };
    return NextResponse.json({ error: 'unauthorized' }, { status: e.status ?? 401 });
  }

  // Phase 2 활성화 필수 (auth.admin API는 Supabase Auth 활성 상태에서만 의미 있음)
  if (session.phase !== 2) {
    return NextResponse.json(
      { error: 'user invite requires AUTH_PHASE=2' },
      { status: 400 },
    );
  }

  let body: InviteBody;
  try {
    body = (await req.json()) as InviteBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const roles = Array.isArray(body.roles) ? body.roles.filter(isAppRole) : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }
  if (roles.length === 0) {
    return NextResponse.json({ error: 'at least one role required' }, { status: 400 });
  }

  // 이미 존재하는 이메일은 거부 (역할 변경은 PATCH 사용)
  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'email already exists' }, { status: 409 });
  }

  const supabase = getSupabase();

  // 1) auth.users 생성 + 매직 링크 발송
  const redirectTo = process.env.SUPABASE_AUTH_REDIRECT_URL ?? undefined;
  const { data: invited, error: inviteError } =
    await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo,
    });

  if (inviteError || !invited?.user) {
    return NextResponse.json(
      { error: inviteError?.message ?? 'invite failed' },
      { status: 500 },
    );
  }

  const inviterId = session.userId;

  // 2) public.users insert (auth.users.id를 PK로 재사용)
  const { data: row, error: insertError } = await supabase
    .from('users')
    .insert({
      id: invited.user.id,
      email,
      roles,
      active: true,
      invited_by: inviterId,
    })
    .select()
    .single();

  if (insertError) {
    // 정합성 보호: auth.users는 이미 생성됐는데 public.users insert 실패 시 롤백 시도
    await supabase.auth.admin.deleteUser(invited.user.id).catch(() => {
      // best-effort
    });
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // TODO(audit): change_audit.change_kind는 현재 'comment'/'attachment'/'manifest'만
  // 허용. 사용자 관리 액션 감사는 후속 마이그레이션에서 'user' kind 추가 또는 별도
  // user_audit 테이블 도입 후 기록.

  return NextResponse.json({ data: row }, { status: 201 });
}
