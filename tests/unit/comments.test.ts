import { describe, it, expect, vi, beforeEach } from 'vitest';

// 모킹: Supabase 서버 클라이언트
vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { getComments, createComment, deleteComment } from '@/lib/supabase/comments';
import { getSupabase } from '@/lib/supabase/server';

const mockGetSupabase = vi.mocked(getSupabase);

// 공통 Supabase mock 체인 빌더
function buildChain(result: { data: unknown; error: unknown }) {
  return {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue(result),
    single: vi.fn().mockResolvedValue(result),
  };
}

describe('comments CRUD', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- getComments ---
  describe('getComments', () => {
    it('댓글 목록을 반환한다', async () => {
      const mockData = [
        {
          id: '1',
          content_path: 'acquisition/rates',
          author: '홍길동',
          body: '좋은 정보입니다',
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
        },
      ];
      const chain = buildChain({ data: mockData, error: null });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      const result = await getComments('acquisition/rates');
      expect(result).toEqual(mockData);
    });

    it('댓글이 없으면 빈 배열을 반환한다', async () => {
      const chain = buildChain({ data: [], error: null });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      const result = await getComments('acquisition/rates');
      expect(result).toEqual([]);
    });

    it('DB 에러 시 예외를 던진다', async () => {
      const chain = buildChain({ data: null, error: new Error('DB connection failed') });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      await expect(getComments('acquisition/rates')).rejects.toThrow('DB connection failed');
    });
  });

  // --- createComment ---
  describe('createComment', () => {
    it('댓글을 생성하고 반환한다', async () => {
      const mockComment = {
        id: '2',
        content_path: 'acquisition/rates',
        author: '김철수',
        body: '세율 정보 감사합니다',
        created_at: '2026-01-02T00:00:00Z',
        updated_at: '2026-01-02T00:00:00Z',
      };
      const chain = buildChain({ data: mockComment, error: null });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      const result = await createComment('acquisition/rates', '김철수', '세율 정보 감사합니다');
      expect(result).toEqual(mockComment);
    });

    it('DB 에러 시 예외를 던진다', async () => {
      const chain = buildChain({ data: null, error: new Error('insert failed') });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      await expect(createComment('path', 'user', 'body')).rejects.toThrow('insert failed');
    });
  });

  // --- deleteComment ---
  describe('deleteComment', () => {
    it('작성자가 일치하면 댓글을 삭제한다', async () => {
      // 첫 번째 from 호출: 조회 (author 확인)
      const fetchChain = buildChain({ data: { author: '홍길동' }, error: null });
      // 두 번째 from 호출: 삭제
      const deleteChain = buildChain({ data: null, error: null });

      const mockFrom = vi.fn()
        .mockReturnValueOnce(fetchChain)
        .mockReturnValueOnce(deleteChain);
      mockGetSupabase.mockReturnValue({ from: mockFrom } as ReturnType<typeof getSupabase>);

      const result = await deleteComment('1', '홍길동');
      expect(result).toEqual({ success: true });
    });

    it('작성자가 다르면 에러를 반환한다', async () => {
      const chain = buildChain({ data: { author: '다른사람' }, error: null });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      const result = await deleteComment('1', '홍길동');
      expect(result.success).toBe(false);
      expect(result.error).toContain('only the author');
    });

    it('댓글이 없으면 에러를 반환한다', async () => {
      const chain = buildChain({ data: null, error: new Error('not found') });
      mockGetSupabase.mockReturnValue({ from: vi.fn().mockReturnValue(chain) } as ReturnType<typeof getSupabase>);

      const result = await deleteComment('999', '홍길동');
      expect(result.success).toBe(false);
      expect(result.error).toBe('comment not found');
    });
  });
});
