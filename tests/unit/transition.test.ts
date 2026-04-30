import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({ getSupabase: vi.fn() }));

import { bulkTransition } from '@/lib/changes/transition';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

interface ChainState {
  selectResult: { data: unknown; error: unknown };
  updateResult: { data: unknown; error: unknown };
  freshResult?: { data: unknown };
}

function buildClient(state: ChainState) {
  // 단순화: 모든 from() 호출이 동일 체인을 반환. select/update를 테스트마다 다르게 설정.
  const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

  const buildSelectChain = () => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue(state.selectResult),
  });

  const buildUpdateChain = () => ({
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue(state.updateResult),
  });

  let callIdx = 0;

  const fromMock = vi.fn((table: string) => {
    if (table === 'change_audit') {
      return { insert: auditInsert };
    }
    callIdx += 1;
    // 호출 패턴: 1) select 2) update 3) (충돌 시) fresh select
    if (callIdx % 3 === 1) return buildSelectChain();
    if (callIdx % 3 === 2) return buildUpdateChain();
    // fresh fetch
    return {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: state.freshResult ?? { id: 'x' }, error: null }),
    };
  });

  return { client: { from: fromMock } as ReturnType<typeof getSupabase>, auditInsert };
}

describe('bulkTransition — 정상 흐름', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pending → approved 성공', async () => {
    const { client, auditInsert } = buildClient({
      selectResult: { data: { id: 'c1', status: 'pending', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: { id: 'c1', status: 'approved', updated_at: 't1' }, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const result = await bulkTransition({
      table: 'comments',
      kind: 'comment',
      ids: [{ id: 'c1', expected_updated_at: 't0' }],
      action: 'approve',
      actor: 'approver(shared)',
    });

    expect(result.succeeded).toEqual(['c1']);
    expect(result.conflicts).toEqual([]);
    expect(result.invalid).toEqual([]);
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        change_kind: 'comment',
        change_id: 'c1',
        from_status: 'pending',
        to_status: 'approved',
        action: 'approve',
        actor: 'approver(shared)',
      }),
    );
  });

  it('잘못된 전이 → invalid 분류', async () => {
    const { client } = buildClient({
      selectResult: { data: { id: 'c1', status: 'applied', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: null, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const result = await bulkTransition({
      table: 'comments',
      kind: 'comment',
      ids: [{ id: 'c1' }],
      action: 'approve',
      actor: 'admin(shared)',
    });

    expect(result.succeeded).toEqual([]);
    expect(result.invalid).toHaveLength(1);
    expect(result.invalid[0].reason).toContain('cannot transition applied → approved');
  });

  it('soft-deleted 항목 → invalid', async () => {
    const { client } = buildClient({
      selectResult: { data: { id: 'c1', status: 'pending', updated_at: 't0', deleted_at: '2026-01-01' }, error: null },
      updateResult: { data: null, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const result = await bulkTransition({
      table: 'comments',
      kind: 'comment',
      ids: [{ id: 'c1' }],
      action: 'approve',
      actor: 'admin(shared)',
    });

    expect(result.invalid).toHaveLength(1);
    expect(result.invalid[0].reason).toBe('item is soft-deleted');
  });

  it('낙관적 락 conflict → conflicts 분류', async () => {
    const { client } = buildClient({
      selectResult: { data: { id: 'c1', status: 'pending', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: null, error: null }, // updated_at 불일치 → 행 없음
      freshResult: { data: { id: 'c1', status: 'approved', updated_at: 't2' } },
    });
    mockGetSupabase.mockReturnValue(client);

    const result = await bulkTransition({
      table: 'comments',
      kind: 'comment',
      ids: [{ id: 'c1', expected_updated_at: 't0_stale' }],
      action: 'approve',
      actor: 'approver(shared)',
    });

    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0].reason).toContain('optimistic lock conflict');
  });
});
