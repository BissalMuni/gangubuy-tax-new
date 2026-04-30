import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/role-guard';
import { fetchQueueItems } from '@/lib/changes/queue';
import type { ChangeStatus } from '@/lib/changes/status-machine';

const VALID_STATUSES: ChangeStatus[] = [
  'pending',
  'approved',
  'processing',
  'applied',
  'rejected',
  'failed',
];

function parseStatusList(raw: string | null): ChangeStatus[] | undefined {
  if (!raw) return undefined;
  const tokens = raw.split(',').map((s) => s.trim()).filter(Boolean);
  const valid = tokens.filter((t): t is ChangeStatus =>
    (VALID_STATUSES as string[]).includes(t),
  );
  return valid.length > 0 ? valid : undefined;
}

export async function GET(request: NextRequest) {
  try {
    await requireSession(['admin', 'approver']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 401;
    return NextResponse.json({ error: 'unauthorized' }, { status });
  }

  const url = request.nextUrl;
  const status = parseStatusList(url.searchParams.get('status'));
  const pathPrefix = url.searchParams.get('path') || undefined;
  const showDeleted = url.searchParams.get('deleted') === '1';

  try {
    const items = await fetchQueueItems({ status, pathPrefix, showDeleted });
    return NextResponse.json({ data: items });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to fetch';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
