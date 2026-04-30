import { describe, it, expect, beforeEach } from 'vitest';
import {
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
  __resetRateLimitForTests,
} from '@/lib/auth/rate-limit';

describe('rate-limit (인메모리 fallback 동작)', () => {
  beforeEach(() => {
    // Upstash env 제거 → 인메모리 limiter로 강제
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    __resetRateLimitForTests();
  });

  it('limit 미만은 success=true', async () => {
    const r = await checkRateLimit(RATE_LIMITS.COMMENT, '10.0.0.1');
    expect(r.success).toBe(true);
    expect(r.remaining).toBe(RATE_LIMITS.COMMENT.max - 1);
  });

  it('limit 초과 시 success=false', async () => {
    const ip = '10.0.0.2';
    for (let i = 0; i < RATE_LIMITS.COMMENT.max; i += 1) {
      const r = await checkRateLimit(RATE_LIMITS.COMMENT, ip);
      expect(r.success).toBe(true);
    }
    const r = await checkRateLimit(RATE_LIMITS.COMMENT, ip);
    expect(r.success).toBe(false);
  });

  it('IP가 다르면 카운터가 분리된다', async () => {
    const a = await checkRateLimit(RATE_LIMITS.LOGIN, '10.0.0.3');
    const b = await checkRateLimit(RATE_LIMITS.LOGIN, '10.0.0.4');
    expect(a.success).toBe(true);
    expect(b.success).toBe(true);
    expect(a.remaining).toBe(RATE_LIMITS.LOGIN.max - 1);
    expect(b.remaining).toBe(RATE_LIMITS.LOGIN.max - 1);
  });

  it('식별자 미제공 시 차단 (보수적 fallback)', async () => {
    const r = await checkRateLimit(RATE_LIMITS.COMMENT, '');
    expect(r.success).toBe(false);
  });
});

describe('getClientIp', () => {
  it('x-forwarded-for의 첫 IP를 사용', () => {
    const headers = new Headers({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(getClientIp(headers)).toBe('1.2.3.4');
  });

  it('x-real-ip로 폴백', () => {
    const headers = new Headers({ 'x-real-ip': '9.9.9.9' });
    expect(getClientIp(headers)).toBe('9.9.9.9');
  });

  it('헤더 없으면 unknown', () => {
    const headers = new Headers();
    expect(getClientIp(headers)).toBe('unknown');
  });
});
