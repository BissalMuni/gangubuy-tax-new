import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({ getSupabase: vi.fn() }));

import { bulkSoftDelete, bulkRestore } from '@/lib/changes/soft-delete';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

// passthrough 패턴: vi.fn().mockReturnThis()는 vitest 4에서 `this` 바인딩 문제로
// 체인이 끊어진다. 명시적 closure로 본인 객체를 반환하게 한다.

function buildSelectChain(result: { data: unknown; error?: unknown }) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  const passthrough = () => chain;
  chain.select = vi.fn(passthrough);
  chain.eq = vi.fn(passthrough);
  chain.is = vi.fn(passthrough);
  chain.maybeSingle = vi.fn().mockResolvedValue(result);
  return chain;
}

function buildUpdateChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  const passthrough = () => chain;
  chain.update = vi.fn(passthrough);
  chain.eq = vi.fn(passthrough);
  chain.is = vi.fn().mockResolvedValue(result);
  // chain 자체가 thenable이 되도록 — `await ...update().eq(...)` 호출에서 마지막
  // 메서드의 반환을 그대로 await하면 chain이 PromiseLike여야 한다.
  // soft-delete의 경우 마지막 호출은 `.is('deleted_at', null)`로 끝나므로 Promise 반환.
  return chain;
}

describe('bulkSoftDelete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deleted_at = now, deleted_by = actor 세팅', async () => {
    let callIdx = 0;
    const selectChain = buildSelectChain({ data: { id: 'c1', deleted_at: null } });
    const updateChain = buildUpdateChain({ data: null, error: null });
    const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

    const fromImpl = (table: string) => {
      if (table === 'change_audit') {
        return { insert: auditInsert };
      }
      callIdx += 1;
      return callIdx % 2 === 1 ? selectChain : updateChain;
    };

    mockGetSupabase.mockReturnValue({
      from: vi.fn(fromImpl),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkSoftDelete('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(updateChain.update).toHaveBeenCalledWith(
      expect.objectContaining({
        deleted_at: expect.any(String),
        deleted_by: 'admin(shared)',
      }),
    );
    expect(auditInsert).toHaveBeenCalled();
    expect(auditInsert.mock.calls[0]?.[0]).toMatchObject({
      action: 'delete',
      actor: 'admin(shared)',
    });
  });

  it('이미 삭제된 항목은 멱등 (다시 삭제 시도 → succeeded)', async () => {
    const selectChain = buildSelectChain({
      data: { id: 'c1', deleted_at: '2026-01-01T00:00:00Z' },
    });
    mockGetSupabase.mockReturnValue({
      from: vi.fn(() => selectChain),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkSoftDelete('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(result.errors).toEqual([]);
  });

  it('not found → errors 분류', async () => {
    const selectChain = buildSelectChain({ data: null });
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
    // bulkRestore: supabase.from(table).update({deleted_at: null, deleted_by: null}).eq('id', id)
    // 마지막 .eq 호출이 await됨 → PromiseLike 반환 필요
    const restoreChain: Record<string, ReturnType<typeof vi.fn>> = {};
    const passthrough = () => restoreChain;
    restoreChain.update = vi.fn(passthrough);
    restoreChain.eq = vi.fn().mockResolvedValue({ data: null, error: null });

    const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

    mockGetSupabase.mockReturnValue({
      from: vi.fn((table: string) =>
        table === 'change_audit' ? { insert: auditInsert } : restoreChain,
      ),
    } as ReturnType<typeof getSupabase>);

    const result = await bulkRestore('comments', 'comment', ['c1'], 'admin(shared)');
    expect(result.succeeded).toEqual(['c1']);
    expect(restoreChain.update).toHaveBeenCalledWith({
      deleted_at: null,
      deleted_by: null,
    });
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'restore' }),
    );
  });
});
