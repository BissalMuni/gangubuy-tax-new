import { getSupabase } from './server';
import type { CalendarEvent } from '@/lib/types';

/** 기간 내 일정 조회 */
export async function getCalendarEvents(
  start: string,
  end: string,
): Promise<CalendarEvent[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .gte('start_date', start)
    .lte('start_date', end)
    .order('start_date', { ascending: true });

  if (error) throw error;
  return (data || []) as CalendarEvent[];
}

/** 오늘 일정 조회 (팝업 알림용) */
export async function getTodayEvents(): Promise<CalendarEvent[]> {
  const supabase = getSupabase();
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .gte('start_date', start)
    .lt('start_date', end)
    .eq('completed', false)
    .order('start_date', { ascending: true });

  if (error) throw error;
  return (data || []) as CalendarEvent[];
}

/** 일정 생성 */
export async function createCalendarEvent(
  event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at' | 'completed' | 'completed_at'>,
): Promise<CalendarEvent> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('calendar_events')
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data as CalendarEvent;
}

/** 일정 수정 */
export async function updateCalendarEvent(
  id: string,
  updates: Partial<Omit<CalendarEvent, 'id' | 'created_at' | 'created_by'>>,
): Promise<CalendarEvent> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('calendar_events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as CalendarEvent;
}

/** 일정 삭제 */
export async function deleteCalendarEvent(id: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/** 일정 완료 토글 */
export async function toggleCalendarEventComplete(
  id: string,
  completed: boolean,
): Promise<CalendarEvent> {
  return updateCalendarEvent(id, {
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  });
}
