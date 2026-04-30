import { NextRequest, NextResponse } from 'next/server';
import { requireSession, actorOf } from '@/lib/auth/role-guard';
import { bulkTransition, type TransitionRequest } from '@/lib/changes/transition';
import type { ChangeKind } from '@/lib/changes/audit';

interface RejectBody {
  kind?: ChangeKind;
  ids?: TransitionRequest[] | string[];
  reason?: string;
}

export async function POST(request: NextRequest) {
  let session;
  try {
    session = await requireSession(['admin', 'approver']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 401;
    return NextResponse.json({ error: 'unauthorized' }, { status });
  }

  let body: RejectBody;
  try {
    body = (await request.json()) as RejectBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const kind: ChangeKind = body.kind === 'attachment' ? 'attachment' : 'comment';
  const rawIds = Array.isArray(body.ids) ? body.ids : [];
  if (rawIds.length === 0) {
    return NextResponse.json({ error: 'ids required' }, { status: 400 });
  }
  const reason = (body.reason ?? '').trim().slice(0, 500);
  if (!reason) {
    return NextResponse.json({ error: 'reason required' }, { status: 400 });
  }

  const ids: TransitionRequest[] = rawIds.map((entry) =>
    typeof entry === 'string' ? { id: entry } : entry,
  );

  const actor = actorOf(session);
  const reviewed_at = new Date().toISOString();

  const result = await bulkTransition({
    table: kind === 'comment' ? 'comments' : 'attachments',
    kind,
    ids,
    action: 'reject',
    actor,
    extraUpdate: { reviewer: actor, reviewed_at, reject_reason: reason },
    reason,
    metadata: { reviewed_at },
  });

  const status = result.conflicts.length > 0 || result.invalid.length > 0 ? 207 : 200;
  return NextResponse.json(result, { status });
}
