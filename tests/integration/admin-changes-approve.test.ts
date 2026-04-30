// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// 슬라이스 4 일괄 승인 통합 테스트.
// next/headers cookies() + jose JWT 검증을 모킹하여 세션 확보 후 라우트 호출.

const mockCookieGet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
    delete: vi.fn(),
    get: mockCookieGet,
  })),
}));

vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { POST as approvePOST } from '@/app/api/admin/changes/approve/route';
import { POST as rejectPOST } from '@/app/api/admin/changes/reject/route';
import { getSupabase } from '@/lib/supabase/server';
import { createSession, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { NextRequest } from 'next/server';

const mockGetSupabase = vi.mocked(getSupabase);

async function makeAuthedRequest(body: unknown, role: 'admin' | 'approver' = 'approver'): Promise<NextRequest> {
  const token = await createSession(role);
  mockCookieGet.mockImplementation((name: string) => {
    if (name === SESSION_COOKIE_NAME) return { value: token };
    return undefined;
  });
  return new NextRequest('http://localhost/api/admin/changes/approve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

interface ChainState {
  selectResult: { data: unknown; error: unknown };
  updateResult: { data: unknown; error: unknown };
}

function buildSelectChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  const passthrough = () => chain;
  chain.select = vi.fn(passthrough);
  chain.eq = vi.fn(passthrough);
  chain.maybeSingle = vi.fn().mockResolvedValue(result);
  return chain;
}

function buildUpdateChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  const passthrough = () => chain;
  chain.update = vi.fn(passthrough);
  chain.eq = vi.fn(passthrough);
  chain.select = vi.fn(passthrough);
  chain.maybeSingle = vi.fn().mockResolvedValue(result);
  return chain;
}

function buildClient(state: ChainState) {
  const auditInsert = vi.fn().mockResolvedValue({ data: null, error: null });
  let callIdx = 0;

  const fromMock = vi.fn((table: string) => {
    if (table === 'change_audit') {
      return { insert: auditInsert };
    }
    callIdx += 1;
    return callIdx % 2 === 1
      ? buildSelectChain(state.selectResult)
      : buildUpdateChain(state.updateResult);
  });
  return { client: { from: fromMock } as ReturnType<typeof getSupabase>, auditInsert };
}

describe('POST /api/admin/changes/approve', () => {
  const original = process.env.SESSION_SECRET;

  beforeEach(() => {
    process.env.SESSION_SECRET = 'test-session-secret-32-bytes-or-more-1234567890';
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.SESSION_SECRET = original;
  });

  it('미인증 → 401', async () => {
    mockCookieGet.mockReturnValue(undefined);
    const req = new NextRequest('http://localhost/api/admin/changes/approve', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind: 'comment', ids: ['c1'] }),
    });
    const res = await approvePOST(req);
    expect(res.status).toBe(401);
  });

  it('승인자 세션 + 정상 전이 → 200', async () => {
    const { client, auditInsert } = buildClient({
      selectResult: { data: { id: 'c1', status: 'pending', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: { id: 'c1', status: 'approved', updated_at: 't1' }, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const req = await makeAuthedRequest({
      kind: 'comment',
      ids: [{ id: 'c1', expected_updated_at: 't0' }],
    });
    const res = await approvePOST(req);
    expect([200, 207]).toContain(res.status);
    const json = await res.json();
    expect(json.succeeded).toContain('c1');
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        change_kind: 'comment',
        action: 'approve',
        actor: 'approver(shared)',
      }),
    );
  });

  it('잘못된 전이 → invalid 분류 (status=207)', async () => {
    const { client } = buildClient({
      selectResult: { data: { id: 'c1', status: 'applied', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: null, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const req = await makeAuthedRequest({ kind: 'comment', ids: ['c1'] });
    const res = await approvePOST(req);
    expect(res.status).toBe(207);
    const json = await res.json();
    expect(json.invalid).toHaveLength(1);
  });

  it('빈 ids → 400', async () => {
    const req = await makeAuthedRequest({ kind: 'comment', ids: [] });
    const res = await approvePOST(req);
    expect(res.status).toBe(400);
  });
});

describe('POST /api/admin/changes/reject', () => {
  const original = process.env.SESSION_SECRET;

  beforeEach(() => {
    process.env.SESSION_SECRET = 'test-session-secret-32-bytes-or-more-1234567890';
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.SESSION_SECRET = original;
  });

  it('reason 누락 → 400', async () => {
    const req = await makeAuthedRequest({ kind: 'comment', ids: ['c1'] });
    const res = await rejectPOST(req);
    expect(res.status).toBe(400);
  });

  it('정상 → reject_reason 저장', async () => {
    const { client } = buildClient({
      selectResult: { data: { id: 'c1', status: 'pending', updated_at: 't0', deleted_at: null }, error: null },
      updateResult: { data: { id: 'c1', status: 'rejected', reject_reason: '스팸', updated_at: 't1' }, error: null },
    });
    mockGetSupabase.mockReturnValue(client);

    const req = await makeAuthedRequest({
      kind: 'comment',
      ids: ['c1'],
      reason: '스팸성 콘텐츠',
    });
    const res = await rejectPOST(req);
    expect([200, 207]).toContain(res.status);
    const json = await res.json();
    expect(json.succeeded).toContain('c1');
  });
});
