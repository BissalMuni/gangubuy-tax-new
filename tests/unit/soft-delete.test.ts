import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({ getSupabase: vi.fn() }));

import { bulkSoftDelete, bulkRestore } from '@/lib/changes/soft-delete';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

describe('bulkSoftDelete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deleted_at = now, deleted_by = actor 세팅', async () => {
    let callIdx = 0;
    const updateChain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    const selectChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { id: 'c1', deleted_at: null },
      }),
    };
    const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

    mockGetSupabase.mockReturnValue({
      from: vi.fn((table: string) => {
        if (table === 'change_audit') return { insert: auditInsert };
        callIdx += 1;
        // 첫 호출: select (현재 상태 조회), 두번째: update
        return callIdx % 2 === 1 ? selectChain : updateChain;
      }),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkSoftDelete('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(updateChain.update).toHaveBeenCalledWith(
      expect.objectContaining({
        deleted_at: expect.any(String),
        deleted_by: 'admin(shared)',
      }),
    );
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'delete', actor: 'admin(shared)' }),
    );
  });

  it('이미 삭제된 항목은 멱등 (다시 삭제 시도 → succeeded)', async () => {
    const selectChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { id: 'c1', deleted_at: '2026-01-01T00:00:00Z' },
      }),
    };
    mockGetSupabase.mockReturnValue({
      from: vi.fn(() => selectChain),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkSoftDelete('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(result.errors).toEqual([]);
  });

  it('not found → errors 분류', async () => {
    const selectChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
    };
    mockGetSupabase.mockReturnValue({
      from: vi.fn(() => selectChain),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkSoftDelete('comments', 'comment', ['c1'], 'admin');
    expect(result.errors).toEqual([{ id: 'c1', reason: 'not found' }]);
  });
});

describe('bulkRestore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deleted_at = null로 복원', async () => {
    const updateChain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ data: null, error: null }),
    };
    const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

    mockGetSupabase.mockReturnValue({
      from: vi.fn((table: string) =>
        table === 'change_audit' ? { insert: auditInsert } : updateChain,
      ),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkRestore('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(updateChain.update).toHaveBeenCalledWith({
      deleted_at: null,
      deleted_by: null,
    });
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'restore' }),
    );
  });
});
