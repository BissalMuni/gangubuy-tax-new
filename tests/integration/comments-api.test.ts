import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// 모킹: Supabase 서버 클라이언트와 의존 헬퍼들
vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { POST } from '@/app/api/comments/route';
import { getSupabase } from '@/lib/supabase/server';
import { __resetRateLimitForTests } from '@/lib/auth/rate-limit';
import { NextRequest } from 'next/server';

const mockGetSupabase = vi.mocked(getSupabase);

function makeJsonRequest(body: unknown, ip = '10.0.0.50'): NextRequest {
  return new NextRequest('http://localhost/api/comments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

function buildInsertChain(data: unknown) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  const passthrough = () => chain;
  chain.insert = vi.fn(passthrough);
  chain.select = vi.fn(passthrough);
  chain.single = vi.fn().mockResolvedValue({ data, error: null });
  return chain;
}

describe('POST /api/comments — Phase 1 editor password gate', () => {
  const originalPassword = process.env.EDITOR_PASSWORD;

  beforeEach(() => {
    process.env.EDITOR_PASSWORD = 'editor-secret';
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    __resetRateLimitForTests();
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.EDITOR_PASSWORD = originalPassword;
  });

  it('비번 일치 + 본문 → 201, author=null, status=pending 인서트', async () => {
    const insertChain = buildInsertChain({
      id: 'cmt-1',
      content_path: 'a/b',
      author: null,
      body: '의견',
      status: 'pending',
      target_kind: 'content',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    });
    const auditChain = { insert: vi.fn().mockResolvedValue({ data: null, error: null }) };

    const fromMock = vi.fn((table: string) => (table === 'change_audit' ? auditChain : insertChain));
    mockGetSupabase.mockReturnValue({ from: fromMock } as ReturnType<typeof getSupabase>);

    const res = await POST(
      makeJsonRequest({
        content_path: 'a/b',
        body: '의견',
        password: 'editor-secret',
      }),
    );

    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.data.id).toBe('cmt-1');
    expect(insertChain.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        author: null,
        status: 'pending',
        target_kind: 'content',
      }),
    );
    expect(auditChain.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        change_kind: 'comment',
        action: 'create',
        actor: 'editor(anonymous)',
      }),
    );
  });

  it('비번 불일치 → 401', async () => {
    const res = await POST(
      makeJsonRequest({ content_path: 'a/b', body: 'x', password: 'wrong' }),
    );
    expect(res.status).toBe(401);
  });

  it('비번 누락 → 401', async () => {
    const res = await POST(makeJsonRequest({ content_path: 'a/b', body: 'x' }));
    expect(res.status).toBe(401);
  });

  it('본문 누락 → 400', async () => {
    const res = await POST(
      makeJsonRequest({ content_path: 'a/b', password: 'editor-secret' }),
    );
    expect(res.status).toBe(400);
  });

  it('11번째 요청 → 429 (10회/시간 레이트리밋)', async () => {
    const insertChain = buildInsertChain({
      id: 'cmt-x',
      content_path: 'a/b',
      author: null,
      body: 'x',
      status: 'pending',
      target_kind: 'content',
      created_at: '',
      updated_at: '',
    });
    const auditChain = { insert: vi.fn().mockResolvedValue({ data: null, error: null }) };
    const fromMock = vi.fn((table: string) => (table === 'change_audit' ? auditChain : insertChain));
    mockGetSupabase.mockReturnValue({ from: fromMock } as ReturnType<typeof getSupabase>);

    const ip = '10.0.0.99';
    for (let i = 0; i < 10; i += 1) {
      const ok = await POST(
        makeJsonRequest(
          { content_path: 'a/b', body: 'x', password: 'editor-secret' },
          ip,
        ),
      );
      expect(ok.status).toBe(201);
    }
    const res11 = await POST(
      makeJsonRequest(
        { content_path: 'a/b', body: 'x', password: 'editor-secret' },
        ip,
      ),
    );
    expect(res11.status).toBe(429);
  });
});
