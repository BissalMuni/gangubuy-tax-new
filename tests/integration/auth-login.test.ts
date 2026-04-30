// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Phase 1 인증 라우트 통합 테스트.
//
// next/headers의 cookies()를 모킹하여 Set-Cookie 동작을 확인한다.

const mockCookieSet = vi.fn();
const mockCookieDelete = vi.fn();
const mockCookieGet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    set: mockCookieSet,
    delete: mockCookieDelete,
    get: mockCookieGet,
  })),
}));

import { POST as loginPOST } from '@/app/api/auth/login/route';
import { POST as logoutPOST } from '@/app/api/auth/logout/route';
import { __resetRateLimitForTests } from '@/lib/auth/rate-limit';
import { NextRequest } from 'next/server';

function makeReq(body: unknown, ip = '10.0.0.111'): NextRequest {
  return new NextRequest('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

describe('POST /api/auth/login — Phase 1', () => {
  const original = {
    admin: process.env.ADMIN_PASSWORD,
    approver: process.env.APPROVER_PASSWORD,
    editor: process.env.EDITOR_PASSWORD,
    secret: process.env.SESSION_SECRET,
  };

  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'admin-secret-pw';
    process.env.APPROVER_PASSWORD = 'approver-secret-pw';
    process.env.EDITOR_PASSWORD = 'editor-secret-pw';
    process.env.SESSION_SECRET = 'test-session-secret-32-bytes-or-more-1234567890';
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    __resetRateLimitForTests();
    mockCookieSet.mockClear();
    mockCookieDelete.mockClear();
    mockCookieGet.mockClear();
  });

  afterEach(() => {
    process.env.ADMIN_PASSWORD = original.admin;
    process.env.APPROVER_PASSWORD = original.approver;
    process.env.EDITOR_PASSWORD = original.editor;
    process.env.SESSION_SECRET = original.secret;
  });

  it('관리자 비번 + role=admin → 200, session 쿠키 발급', async () => {
    const res = await loginPOST(makeReq({ password: 'admin-secret-pw', role: 'admin' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true, role: 'admin' });
    expect(mockCookieSet).toHaveBeenCalledWith(
      'session',
      expect.any(String),
      expect.objectContaining({ httpOnly: true, sameSite: 'lax', path: '/' }),
    );
  });

  it('승인자 비번 + role=approver → 200, 쿠키 발급', async () => {
    const res = await loginPOST(makeReq({ password: 'approver-secret-pw', role: 'approver' }));
    expect(res.status).toBe(200);
    expect(mockCookieSet).toHaveBeenCalled();
  });

  it('editor 역할은 쿠키 발급 없이 ok 반환 (1회용 게이트)', async () => {
    const res = await loginPOST(makeReq({ password: 'editor-secret-pw', role: 'editor' }));
    expect(res.status).toBe(200);
    expect(mockCookieSet).not.toHaveBeenCalled();
  });

  it('비번 불일치 → 401', async () => {
    const res = await loginPOST(makeReq({ password: 'wrong', role: 'admin' }));
    expect(res.status).toBe(401);
    expect(mockCookieSet).not.toHaveBeenCalled();
  });

  it('역할 누락 → 400', async () => {
    const res = await loginPOST(makeReq({ password: 'admin-secret-pw' }));
    expect(res.status).toBe(400);
  });

  it('6번째 요청 → 429 (5회/시간 레이트리밋)', async () => {
    const ip = '10.0.0.222';
    for (let i = 0; i < 5; i += 1) {
      // 모두 실패해도 레이트리밋 카운터는 증가
      await loginPOST(makeReq({ password: 'wrong', role: 'admin' }, ip));
    }
    const res6 = await loginPOST(makeReq({ password: 'admin-secret-pw', role: 'admin' }, ip));
    expect(res6.status).toBe(429);
  });
});

describe('POST /api/auth/logout', () => {
  it('쿠키를 삭제하고 ok 반환', async () => {
    const res = await logoutPOST();
    expect(res.status).toBe(200);
    expect(mockCookieDelete).toHaveBeenCalledWith('session');
  });
});
