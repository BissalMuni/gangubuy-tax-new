import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, type Phase1Role } from '@/lib/auth/env-passwords';
import { createSession, SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/auth/session';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/auth/rate-limit';

/**
 * Phase 1 로그인 — env 비번 입력 → 쿠키 세션 발급.
 *
 * - admin/approver: 세션 쿠키 발급 (12시간)
 * - editor: 세션 발급 X (1회용 게이트). API 응답으로만 ok 반환.
 *
 * IP 단위 5회/시간 레이트리밋 (FR-004 / SC-007).
 */

interface LoginBody {
  password?: string;
  role?: string;
}

const VALID_ROLES: Phase1Role[] = ['admin', 'approver', 'editor'];

function isPhase1Role(value: unknown): value is Phase1Role {
  return typeof value === 'string' && (VALID_ROLES as string[]).includes(value);
}

export async function POST(request: NextRequest) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const { password, role } = body;
  if (!isPhase1Role(role)) {
    return NextResponse.json({ error: 'invalid role' }, { status: 400 });
  }

  // IP 레이트리밋 (5회/시간)
  const ip = getClientIp(request.headers);
  const rl = await checkRateLimit(RATE_LIMITS.LOGIN, ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'too many login attempts', reset: rl.reset },
      { status: 429 },
    );
  }

  if (!verifyPassword(password, role)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // 담당자(editor)는 세션 발급 안 함 — 1회용 게이트만 (Key Entities §Session)
  if (role === 'editor') {
    return NextResponse.json({ ok: true, role });
  }

  const token = await createSession(role);
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());

  return NextResponse.json({ ok: true, role });
}
