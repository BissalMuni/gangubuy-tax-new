import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/role-guard';
import { loadPromptHistory } from '@/lib/supabase/automation-settings';

export async function GET() {
  try {
    await requireSession(['admin']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 403;
    return NextResponse.json({ error: 'forbidden' }, { status });
  }

  try {
    const history = await loadPromptHistory(20);
    return NextResponse.json({ data: history });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to load history';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
