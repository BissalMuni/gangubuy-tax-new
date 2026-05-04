// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// 슬라이스 13 — 본인 pending 댓글 soft delete 통합 테스트.

const phase2Session = {
  phase: 2 as const,
  userId: '11111111-1111-1111-1111-111111111111',
  email: 'me@example.com',
  roles: ['editor'] as const,
};

const phase1Session = { phase: 1 as const, role: 'admin' as const };

const sessionRef: { current: typeof phase2Session | typeof phase1Session | null } = {
  current: phase2Session,
};

vi.mock('@/lib/auth/role-guard', async (orig) => {
  const actual = await orig<typeof import('@/lib/auth/role-guard')>();
  return {
    ...actual,
    getCurrentSession: vi.fn(async () => sessionRef.current),
  };
});

vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { POST as deletePOST } from '@/app/api/comments/[id]/delete/route';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

const validId = '22222222-2222-2222-2222-222222222222';

function setupCommentsClient(
  fetchResult: { data: unknown; error: unknown },
  updateResult: { error: unknown } = { error: null },
) {
  const fetchMaybe = vi.fn().mockResolvedValue(fetchResult);
  const fetchEq = vi.fn(() => ({ maybeSingle: fetchMaybe }));
  const fetchSelect = vi.fn(() => ({ eq: fetchEq }));

  const updateIs = vi.fn().mockResolvedValue(updateResult);
  const updateEq = vi.fn(() => ({ is: updateIs }));
  const updateMock = vi.fn(() => ({ eq: updateEq }));

  const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });

  const fromMock = vi.fn((table: string) => {
    if (table === 'change_audit') return { insert: auditInsert };
    // first call select, then update
    return { select: fetchSelect, update: updateMock };
  });
  mockGetSupabase.mockReturnValue({ from: fromMock } as unknown as ReturnType<typeof getSupabase>);
  return { auditInsert, updateIs };
}

beforeEach(() => {
  vi.clearAllMocks();
  sessionRef.current = phase2Session;
});

describe('POST /api/comments/[id]/delete', () => {
  it('본인 pending 댓글 → 200 + soft delete + audit', async () => {
    const { auditInsert, updateIs } = setupCommentsClient({
      data: {
        id: validId,
        author_user_id: phase2Session.userId,
        status: 'pending',
        deleted_at: null,
      },
      error: null,
    });
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(200);
    expect(updateIs).toHaveBeenCalled();
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'delete', actor: 'me@example.com', change_id: validId }),
    );
  });

  it('이미 deleted_at 세팅 → 200 + already=true (멱등)', async () => {
    setupCommentsClient({
      data: {
        id: validId,
        author_user_id: phase2Session.userId,
        status: 'pending',
        deleted_at: '2026-04-30T00:00:00Z',
      },
      error: null,
    });
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.already).toBe(true);
  });

  it('타인 댓글 → 403', async () => {
    setupCommentsClient({
      data: {
        id: validId,
        author_user_id: '99999999-9999-9999-9999-999999999999',
        status: 'pending',
        deleted_at: null,
      },
      error: null,
    });
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(403);
  });

  it('approved 상태 → 403 (승인 후 본인 삭제 불가)', async () => {
    setupCommentsClient({
      data: {
        id: validId,
        author_user_id: phase2Session.userId,
        status: 'approved',
        deleted_at: null,
      },
      error: null,
    });
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(403);
  });

  it('not found → 404', async () => {
    setupCommentsClient({ data: null, error: null });
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(404);
  });

  it('Phase 1 세션 → 403 (자기 삭제 불가)', async () => {
    sessionRef.current = phase1Session;
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(403);
  });

  it('미인증 → 401', async () => {
    sessionRef.current = null;
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await deletePOST(new Request(`http://localhost/api/comments/${validId}/delete`, { method: 'POST' }), {
      params: Promise.resolve({ id: validId }),
    });
    expect(res.status).toBe(401);
  });

  it('잘못된 id 형식 → 400', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await deletePOST(new Request('http://localhost/api/comments/bad/delete', { method: 'POST' }), {
      params: Promise.resolve({ id: 'bad' }),
    });
    expect(res.status).toBe(400);
  });
});
