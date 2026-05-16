import { NextRequest, NextResponse } from 'next/server';
import { getCalendarEvents, createCalendarEvent } from '@/lib/supabase/calendar';
import { requirePermission, getRoleFromRequest } from '@/lib/auth/require-role';
import { ROLE_LABELS } from '@/lib/auth/constants';
import type { RecurrenceType } from '@/lib/types';

export async function GET(request: NextRequest) {
  const denied = requirePermission(request, 'edit_structure');
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json({ error: 'start, end 필요' }, { status: 400 });
  }

  try {
    const data = await getCalendarEvents(start, end);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '조회 실패' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requirePermission(request, 'edit_structure');
  if (denied) return denied;

  let body: {
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    all_day?: boolean;
    recurrence?: RecurrenceType;
    color?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '잘못된 요청' }, { status: 400 });
  }

  if (!body.title || !body.start_date) {
    return NextResponse.json({ error: 'title, start_date 필요' }, { status: 400 });
  }

  const role = getRoleFromRequest(request);
  const createdBy = role ? ROLE_LABELS[role] : '관리자';

  try {
    const data = await createCalendarEvent({
      title: body.title.trim(),
      description: body.description?.trim() || null,
      start_date: body.start_date,
      end_date: body.end_date || null,
      all_day: body.all_day ?? true,
      recurrence: body.recurrence || 'none',
      color: body.color || '#3b82f6',
      created_by: createdBy,
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '등록 실패' }, { status: 500 });
  }
}
