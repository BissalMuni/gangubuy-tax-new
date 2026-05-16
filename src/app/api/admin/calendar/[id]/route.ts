import { NextRequest, NextResponse } from 'next/server';
import { updateCalendarEvent, deleteCalendarEvent, toggleCalendarEventComplete } from '@/lib/supabase/calendar';
import { requirePermission } from '@/lib/auth/require-role';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = requirePermission(request, 'edit_structure');
  if (denied) return denied;

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청' }, { status: 400 });
  }

  try {
    // 완료 토글 전용
    if ('completed' in body && Object.keys(body).length === 1) {
      const data = await toggleCalendarEventComplete(id, body.completed as boolean);
      return NextResponse.json({ data });
    }

    const data = await updateCalendarEvent(id, body);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '수정 실패' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = requirePermission(request, 'edit_structure');
  if (denied) return denied;

  const { id } = await params;

  try {
    await deleteCalendarEvent(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
  }
}
