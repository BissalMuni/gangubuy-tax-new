import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/role-guard';
import { getAuthPhase } from '@/lib/auth/session';

/**
 * 현재 사용자 정보. UI(클라이언트 컴포넌트)가 본인 식별 + 본인 댓글 표시에 사용.
 *
 * - Phase 1: { phase: 1, role } 또는 { phase: 1, anonymous: true } (editor)
 * - Phase 2: { phase: 2, userId, email, roles }
 * - 미인증: { phase, anonymous: true }
 */
export async function GET() {
  const phase = getAuthPhase();
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ phase, anonymous: true });
  }

  if (session.phase === 1) {
    return NextResponse.json({ phase: 1, role: session.role });
  }

  return NextResponse.json({
    phase: 2,
    userId: session.userId,
    email: session.email,
    roles: session.roles,
  });
}
