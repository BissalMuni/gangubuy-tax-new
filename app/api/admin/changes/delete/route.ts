import { NextRequest, NextResponse } from 'next/server';
import { requireSession, actorOf } from '@/lib/auth/role-guard';
import { bulkSoftDelete } from '@/lib/changes/soft-delete';
import type { ChangeKind } from '@/lib/changes/audit';

interface DeleteBody {
  kind?: ChangeKind;
  ids?: string[];
}

export async function POST(request: NextRequest) {
  let session;
  try {
    // 승인자/관리자 모두 가능 (FR-014)
    session = await requireSession(['admin', 'approver']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 401;
    return NextResponse.json({ error: 'unauthorized' }, { status });
  }

  let body: DeleteBody;
  try {
    body = (await request.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const kind: ChangeKind = body.kind === 'attachment' ? 'attachment' : 'comment';
  const ids = Array.isArray(body.ids) ? body.ids.filter((s): s is string => typeof s === 'string') : [];
  if (ids.length === 0) {
    return NextResponse.json({ error: 'ids required' }, { status: 400 });
  }

  const result = await bulkSoftDelete(
    kind === 'comment' ? 'comments' : 'attachments',
    kind,
    ids,
    actorOf(session),
  );

  const status = result.errors.length > 0 ? 207 : 200;
  return NextResponse.json(result, { status });
}
