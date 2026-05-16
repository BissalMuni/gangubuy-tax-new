import { NextRequest, NextResponse } from 'next/server';
import { getTodayEvents } from '@/lib/supabase/calendar';
import { requirePermission } from '@/lib/auth/require-role';

/** 오늘 미완료 일정 조회 — 로그인 사용자 팝업 알림용 */
export async function GET(request: NextRequest) {
  // 로그인한 사용자면 누구든 오늘 일정 확인 가능
  const denied = requirePermission(request, 'read');
  if (denied) return denied;

  try {
    const data = await getTodayEvents();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '조회 실패' }, { status: 500 });
  }
}
