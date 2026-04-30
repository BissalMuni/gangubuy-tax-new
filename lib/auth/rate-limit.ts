/**
 * IP 단위 레이트리밋 — Upstash Ratelimit 우선, 미설정 시 인메모리 fallback.
 *
 * Vercel 다중 인스턴스에서는 인메모리 카운터가 분산되어 정확한 차단이 안 되지만,
 * Phase 1 신뢰 그룹 환경에서는 graceful degrade (경고 로그 + best-effort 동작)
 * 가 허용된다 (plan.md §0-1-3).
 */

type RateLimitVerdict = {
  success: boolean;
  remaining: number;
  reset: number; // epoch ms
};

interface RateLimiter {
  limit(identifier: string): Promise<RateLimitVerdict>;
}

interface BucketWindow {
  count: number;
  expiresAt: number;
}

class InMemoryLimiter implements RateLimiter {
  private buckets = new Map<string, BucketWindow>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  async limit(identifier: string): Promise<RateLimitVerdict> {
    const now = Date.now();
    const bucket = this.buckets.get(identifier);
    if (!bucket || bucket.expiresAt < now) {
      const fresh = { count: 1, expiresAt: now + this.windowMs };
      this.buckets.set(identifier, fresh);
      return { success: true, remaining: this.max - 1, reset: fresh.expiresAt };
    }
    bucket.count += 1;
    const success = bucket.count <= this.max;
    return {
      success,
      remaining: Math.max(0, this.max - bucket.count),
      reset: bucket.expiresAt,
    };
  }
}

let warnedNoUpstash = false;

function warnNoUpstashOnce(): void {
  if (warnedNoUpstash) return;
  warnedNoUpstash = true;
  // eslint-disable-next-line no-console
  console.warn(
    '[rate-limit] UPSTASH_REDIS_REST_URL not set — falling back to in-memory limiter (best-effort, not consistent across instances)',
  );
}

function buildLimiter(max: number, windowMs: number, prefix: string): RateLimiter {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    warnNoUpstashOnce();
    return new InMemoryLimiter(max, windowMs);
  }

  // Upstash가 설정된 경우 동적 import — 로컬/테스트 환경에서 타입만 의존하지
  // 않도록 require 경로를 격리.
  type UpstashCtor = (config: { redis: unknown; limiter: unknown; prefix: string }) => RateLimiter;
  const upstashLimiter: RateLimiter = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Ratelimit } = require('@upstash/ratelimit') as {
        Ratelimit: UpstashCtor & { slidingWindow: (n: number, w: string) => unknown };
      };
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Redis } = require('@upstash/redis') as {
        Redis: { fromEnv: () => unknown };
      };
      const seconds = Math.round(windowMs / 1000);
      return new (Ratelimit as unknown as new (cfg: unknown) => RateLimiter)({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(max, `${seconds} s`),
        prefix,
      });
    } catch {
      warnNoUpstashOnce();
      return new InMemoryLimiter(max, windowMs);
    }
  })();

  return upstashLimiter;
}

const limiterCache = new Map<string, RateLimiter>();

function getLimiter(name: string, max: number, windowMs: number): RateLimiter {
  const key = `${name}:${max}:${windowMs}`;
  let limiter = limiterCache.get(key);
  if (!limiter) {
    limiter = buildLimiter(max, windowMs, name);
    limiterCache.set(key, limiter);
  }
  return limiter;
}

export const RATE_LIMITS = {
  COMMENT: { max: 10, windowMs: 60 * 60 * 1000, name: 'rl:comment' }, // 10/시간
  LOGIN: { max: 5, windowMs: 60 * 60 * 1000, name: 'rl:login' }, // 5/시간 (FR-004 / SC-007)
} as const;

export async function checkRateLimit(
  config: { max: number; windowMs: number; name: string },
  identifier: string,
): Promise<RateLimitVerdict> {
  if (!identifier) {
    // 식별자 없는 요청은 차단 (의도하지 않은 무제한 허용 방지)
    return { success: false, remaining: 0, reset: Date.now() };
  }
  const limiter = getLimiter(config.name, config.max, config.windowMs);
  return limiter.limit(identifier);
}

/**
 * Next.js Request 객체에서 클라이언트 IP를 추출. Vercel 환경의 x-forwarded-for
 * 헤더를 우선하고, 없으면 x-real-ip, 그것도 없으면 'unknown'.
 */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  const real = headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

// 테스트 헬퍼: 인메모리 카운터 초기화
export function __resetRateLimitForTests(): void {
  limiterCache.clear();
  warnedNoUpstash = false;
}
