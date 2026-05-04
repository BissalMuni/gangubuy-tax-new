// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// /api/auth/me — 양 페이즈 세션 정보 조회.

const sessionRef: { current: unknown } = { current: null };
const phaseRef: { current: 1 | 2 } = { current: 1 };

vi.mock('@/lib/auth/role-guard', async (orig) => {
  const actual = await orig<typeof import('@/lib/auth/role-guard')>();
  return {
    ...actual,
    getCurrentSession: vi.fn(async () => sessionRef.current),
  };
});

vi.mock('@/lib/auth/session', async (orig) => {
  const actual = await orig<typeof import('@/lib/auth/session')>();
  return {
    ...actual,
    getAuthPhase: vi.fn(() => phaseRef.current),
  };
});

import { GET as meGET } from '@/app/api/auth/me/route';

beforeEach(() => {
  sessionRef.current = null;
  phaseRef.current = 1;
});

describe('GET /api/auth/me', () => {
  it('미인증 + Phase 1 → { phase: 1, anonymous: true }', async () => {
    const res = await meGET();
    const json = await res.json();
    expect(json).toEqual({ phase: 1, anonymous: true });
  });

  it('Phase 1 세션 → { phase: 1, role }', async () => {
    sessionRef.current = { phase: 1, role: 'admin' };
    phaseRef.current = 1;
    const res = await meGET();
    const json = await res.json();
    expect(json).toEqual({ phase: 1, role: 'admin' });
  });

  it('Phase 2 세션 → { phase: 2, userId, email, roles }', async () => {
    sessionRef.current = {
      phase: 2,
      userId: 'uuid-1',
      email: 'me@example.com',
      roles: ['editor', 'approver'],
    };
    phaseRef.current = 2;
    const res = await meGET();
    const json = await res.json();
    expect(json).toEqual({
      phase: 2,
      userId: 'uuid-1',
      email: 'me@example.com',
      roles: ['editor', 'approver'],
    });
  });
});
