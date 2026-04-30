import { fetchQueueItems } from '@/lib/changes/queue';
import { groupByMenuPath } from '@/lib/admin/group-tree';
import { getCurrentSession } from '@/lib/auth/role-guard';
import { redirect } from 'next/navigation';
import type { ChangeStatus } from '@/lib/types';
import { FilterBar } from '@/components/admin/FilterBar';
import { ChangeQueueTree } from '@/components/admin/ChangeQueueTree';

export const dynamic = 'force-dynamic';

const VALID_STATUSES: ChangeStatus[] = [
  'pending',
  'approved',
  'processing',
  'applied',
  'rejected',
  'failed',
];

interface PageProps {
  searchParams: Promise<{ status?: string; deleted?: string }>;
}

function parseStatus(raw: string | undefined): ChangeStatus[] {
  if (!raw) return ['pending'];
  const tokens = raw.split(',').map((s) => s.trim());
  const valid = tokens.filter((t): t is ChangeStatus => (VALID_STATUSES as string[]).includes(t));
  return valid.length > 0 ? valid : ['pending'];
}

export default async function AdminChangesPage({ searchParams }: PageProps) {
  const session = await getCurrentSession();
  if (!session) redirect('/admin/login?from=/admin/changes');

  const params = await searchParams;
  const status = parseStatus(params.status);
  const showDeleted = params.deleted === '1';

  const { comments, attachments } = await fetchQueueItems({ status, showDeleted });
  const groups = groupByMenuPath(comments, attachments);

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>변경 큐 — {session.role}</h1>
      </header>
      <FilterBar selected={status} showDeleted={showDeleted} />
      <div style={{ padding: 16 }}>
        <ChangeQueueTree groups={groups} canRestore={session.role === 'admin'} />
      </div>
    </div>
  );
}
