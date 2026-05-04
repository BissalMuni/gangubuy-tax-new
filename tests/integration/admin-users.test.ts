// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Phase 2 사용자 관리 API 통합 테스트.
// requireSession을 모킹하여 admin Phase 2 세션을 시뮬레이션 후 라우트 호출.

const mockSession = {
  phase: 2 as const,
  userId: '00000000-0000-0000-0000-0000000000aa',
  email: 'admin@example.com',
  roles: ['admin'] as const,
};

vi.mock('@/lib/auth/role-guard', async (orig) => {
  const actual = await orig<typeof import('@/lib/auth/role-guard')>();
  return {
    ...actual,
    requireSession: vi.fn(async () => mockSession),
  };
});

vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

vi.mock('@/lib/supabase/users', async (orig) => {
  const actual = await orig<typeof import('@/lib/supabase/users')>();
  return {
    ...actual,
    findUserByEmail: vi.fn(async () => null),
  };
});

import { GET as listGET, POST as invitePOST } from '@/app/api/admin/users/route';
import { PATCH as patchPATCH } from '@/app/api/admin/users/[id]/route';
import { getSupabase } from '@/lib/supabase/server';
import { findUserByEmail } from '@/lib/supabase/users';
import { NextRequest } from 'next/server';

const mockGetSupabase = vi.mocked(getSupabase);
const mockFindByEmail = vi.mocked(findUserByEmail);

function makeReq(url: string, body: unknown, method = 'POST'): NextRequest {
  return new NextRequest(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockFindByEmail.mockResolvedValue(null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/admin/users', () => {
  it('admin 세션 + DB 응답 → 200 + 사용자 목록', async () => {
    const rows = [
      {
        id: 'u1',
        email: 'a@example.com',
        roles: ['admin'],
        active: true,
        invited_by: null,
        created_at: 't',
        updated_at: 't',
      },
    ];
    const orderMock = vi.fn().mockResolvedValue({ data: rows, error: null });
    const selectMock = vi.fn(() => ({ order: orderMock }));
    mockGetSupabase.mockReturnValue({
      from: vi.fn(() => ({ select: selectMock })),
    } as ReturnType<typeof getSupabase>);

    const res = await listGET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data).toEqual(rows);
  });
});

describe('POST /api/admin/users (invite)', () => {
  it('valid email + roles → 201, auth.admin.invite 호출 + users insert', async () => {
    const inviteUserByEmail = vi.fn().mockResolvedValue({
      data: { user: { id: 'new-uuid' } },
      error: null,
    });
    const insertSelectSingle = vi.fn().mockResolvedValue({
      data: { id: 'new-uuid', email: 'new@example.com', roles: ['editor'], active: true },
      error: null,
    });
    const insertSelect = vi.fn(() => ({ single: insertSelectSingle }));
    const insertMock = vi.fn(() => ({ select: insertSelect }));

    mockGetSupabase.mockReturnValue({
      auth: { admin: { inviteUserByEmail, deleteUser: vi.fn() } },
      from: vi.fn(() => ({ insert: insertMock })),
    } as unknown as ReturnType<typeof getSupabase>);

    const res = await invitePOST(
      makeReq('http://localhost/api/admin/users', {
        email: 'new@example.com',
        roles: ['editor'],
      }),
    );
    expect(res.status).toBe(201);
    expect(inviteUserByEmail).toHaveBeenCalledWith('new@example.com', expect.any(Object));
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'new-uuid', email: 'new@example.com', roles: ['editor'] }),
    );
  });

  it('잘못된 이메일 → 400', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await invitePOST(
      makeReq('http://localhost/api/admin/users', { email: 'bad', roles: ['editor'] }),
    );
    expect(res.status).toBe(400);
  });

  it('빈 roles → 400', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await invitePOST(
      makeReq('http://localhost/api/admin/users', {
        email: 'ok@example.com',
        roles: [],
      }),
    );
    expect(res.status).toBe(400);
  });

  it('이미 존재하는 이메일 → 409', async () => {
    mockFindByEmail.mockResolvedValue({
      id: 'u1',
      email: 'dup@example.com',
      roles: ['editor'],
      active: true,
      invitedBy: null,
      createdAt: 't',
      updatedAt: 't',
    });
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await invitePOST(
      makeReq('http://localhost/api/admin/users', {
        email: 'dup@example.com',
        roles: ['editor'],
      }),
    );
    expect(res.status).toBe(409);
  });
});

describe('PATCH /api/admin/users/[id]', () => {
  function setupUpdate(result: { data: unknown; error: unknown }) {
    const single = vi.fn().mockResolvedValue(result);
    const select = vi.fn(() => ({ single }));
    const eqMock = vi.fn(() => ({ select }));
    const updateMock = vi.fn(() => ({ eq: eqMock }));
    mockGetSupabase.mockReturnValue({
      from: vi.fn(() => ({ update: updateMock })),
    } as unknown as ReturnType<typeof getSupabase>);
    return { updateMock, eqMock };
  }

  it('roles 갱신 → 200', async () => {
    const { updateMock } = setupUpdate({
      data: {
        id: 'u1',
        email: 'a@example.com',
        roles: ['admin', 'approver'],
        active: true,
        invited_by: null,
        created_at: 't',
        updated_at: 't',
      },
      error: null,
    });
    const res = await patchPATCH(
      makeReq(
        'http://localhost/api/admin/users/00000000-0000-0000-0000-000000000001',
        { roles: ['admin', 'approver'] },
        'PATCH',
      ),
      { params: Promise.resolve({ id: '00000000-0000-0000-0000-000000000001' }) },
    );
    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith({ roles: ['admin', 'approver'] });
  });

  it('빈 roles → 400 (CHECK 위반 방지)', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await patchPATCH(
      makeReq(
        'http://localhost/api/admin/users/00000000-0000-0000-0000-000000000001',
        { roles: [] },
        'PATCH',
      ),
      { params: Promise.resolve({ id: '00000000-0000-0000-0000-000000000001' }) },
    );
    expect(res.status).toBe(400);
  });

  it('본인 active=false 시도 → 400', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await patchPATCH(
      makeReq(`http://localhost/api/admin/users/${mockSession.userId}`, { active: false }, 'PATCH'),
      { params: Promise.resolve({ id: mockSession.userId }) },
    );
    expect(res.status).toBe(400);
  });

  it('id 형식 오류 → 400', async () => {
    mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);
    const res = await patchPATCH(
      makeReq('http://localhost/api/admin/users/not-uuid', { active: false }, 'PATCH'),
      { params: Promise.resolve({ id: 'not-uuid' }) },
    );
    expect(res.status).toBe(400);
  });
});
