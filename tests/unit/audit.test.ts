import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { recordAudit } from '@/lib/changes/audit';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

describe('recordAudit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('change_audit 행을 인서트한다', async () => {
    const insert = vi.fn().mockResolvedValue({ data: null, error: null });
    mockGetSupabase.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as ReturnType<typeof getSupabase>);

    await recordAudit({
      change_kind: 'comment',
      change_id: 'cmt-1',
      from_status: 'pending',
      to_status: 'approved',
      action: 'approve',
      actor: 'approver(shared)',
      reason: 'looks good',
      metadata: { batch: 'b1' },
    });

    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        change_kind: 'comment',
        change_id: 'cmt-1',
        from_status: 'pending',
        to_status: 'approved',
        action: 'approve',
        actor: 'approver(shared)',
        reason: 'looks good',
        metadata: { batch: 'b1' },
      }),
    );
  });

  it('insert 에러는 throw하지 않는다 (호출자 흐름 보호)', async () => {
    const insert = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'audit table missing' },
    });
    mockGetSupabase.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as ReturnType<typeof getSupabase>);

    await expect(
      recordAudit({
        change_kind: 'attachment',
        change_id: 'att-1',
        action: 'create',
        actor: 'editor(anonymous)',
      }),
    ).resolves.toBeUndefined();
  });

  it('default metadata는 {}', async () => {
    const insert = vi.fn().mockResolvedValue({ data: null, error: null });
    mockGetSupabase.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as ReturnType<typeof getSupabase>);

    await recordAudit({
      change_kind: 'comment',
      change_id: 'cmt-2',
      action: 'create',
      actor: 'editor(anonymous)',
    });

    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ metadata: {} }));
  });
});
