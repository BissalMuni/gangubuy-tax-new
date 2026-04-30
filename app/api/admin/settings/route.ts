import { NextRequest, NextResponse } from 'next/server';
import { requireSession, actorOf } from '@/lib/auth/role-guard';
import {
  loadAutomationSettings,
  updateAutomationSettings,
} from '@/lib/supabase/automation-settings';
import { validatePathOverrides } from '@/lib/changes/path-overrides';

export async function GET() {
  try {
    await requireSession(['admin', 'approver']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 401;
    return NextResponse.json({ error: 'unauthorized' }, { status });
  }

  try {
    const settings = await loadAutomationSettings();
    return NextResponse.json({ data: settings });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to load settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

interface UpdateBody {
  mode?: 'auto' | 'manual';
  path_overrides?: unknown;
  cron_enabled?: boolean;
  system_prompt?: string;
}

export async function PUT(request: NextRequest) {
  let session;
  try {
    // 모드/프롬프트/cron 변경은 관리자 전용 (FR-021/FR-027/FR-025)
    session = await requireSession(['admin']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 403;
    return NextResponse.json({ error: 'forbidden' }, { status });
  }

  let body: UpdateBody;
  try {
    body = (await request.json()) as UpdateBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const updates: Parameters<typeof updateAutomationSettings>[0] = {
    updated_by: actorOf(session),
  };

  if (body.mode !== undefined) {
    if (body.mode !== 'auto' && body.mode !== 'manual') {
      return NextResponse.json({ error: 'invalid mode' }, { status: 400 });
    }
    updates.mode = body.mode;
  }

  if (body.path_overrides !== undefined) {
    const validated = validatePathOverrides(body.path_overrides);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }
    updates.path_overrides = validated.value;
  }

  if (body.cron_enabled !== undefined) {
    if (typeof body.cron_enabled !== 'boolean') {
      return NextResponse.json({ error: 'cron_enabled must be boolean' }, { status: 400 });
    }
    updates.cron_enabled = body.cron_enabled;
  }

  if (body.system_prompt !== undefined) {
    if (typeof body.system_prompt !== 'string') {
      return NextResponse.json({ error: 'system_prompt must be string' }, { status: 400 });
    }
    updates.system_prompt = body.system_prompt.slice(0, 20000);
  }

  try {
    const updated = await updateAutomationSettings(updates);
    return NextResponse.json({ data: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to update settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
