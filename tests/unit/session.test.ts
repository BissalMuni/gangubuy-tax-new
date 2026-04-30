// @vitest-environment node
// jose의 Web Crypto 기반 서명이 jsdom 환경에서는 Uint8Array realm 충돌 발생.
// 본 테스트는 node 환경에서 실행해야 일관된 결과를 얻을 수 있다.
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createSession, verifySession, sessionCookieOptions, SESSION_TTL_SECONDS } from '@/lib/auth/session';

describe('session (jose JWT)', () => {
  const original = process.env.SESSION_SECRET;

  beforeEach(() => {
    process.env.SESSION_SECRET = 'test-session-secret-32-bytes-or-more-1234567890';
  });

  afterEach(() => {
    process.env.SESSION_SECRET = original;
  });

  it('admin 토큰을 발급하고 검증한다', async () => {
    const token = await createSession('admin');
    expect(typeof token).toBe('string');
    const session = await verifySession(token);
    expect(session?.role).toBe('admin');
    expect(session?.exp).toBeTypeOf('number');
  });

  it('approver 토큰을 발급하고 검증한다', async () => {
    const token = await createSession('approver');
    const session = await verifySession(token);
    expect(session?.role).toBe('approver');
  });

  it('잘못된 토큰은 null', async () => {
    expect(await verifySession('invalid.token.here')).toBeNull();
    expect(await verifySession('')).toBeNull();
    expect(await verifySession(undefined)).toBeNull();
  });

  it('SESSION_SECRET 부재 시 createSession 예외', async () => {
    delete process.env.SESSION_SECRET;
    await expect(createSession('admin')).rejects.toThrow(/SESSION_SECRET/);
  });

  it('다른 SECRET으로 서명한 토큰은 검증 실패', async () => {
    const token = await createSession('admin');
    process.env.SESSION_SECRET = 'completely-different-secret-1234567890abc';
    expect(await verifySession(token)).toBeNull();
  });

  it('cookieOptions: httpOnly + sameSite=lax + 12h maxAge', () => {
    const opts = sessionCookieOptions();
    expect(opts.httpOnly).toBe(true);
    expect(opts.sameSite).toBe('lax');
    expect(opts.maxAge).toBe(SESSION_TTL_SECONDS);
  });
});
