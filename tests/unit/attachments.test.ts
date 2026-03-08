import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MAX_FILE_SIZE } from '@/lib/types';

// 모킹: Supabase 서버 클라이언트
vi.mock('@/lib/supabase/server', () => ({
  getSupabase: vi.fn(),
}));

import { getAttachments, uploadAttachment, deleteAttachment } from '@/lib/supabase/attachments';
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

// Supabase Storage mock 빌더
function buildStorage(publicUrl = 'https://example.com/file.pdf', uploadError: unknown = null, removeError: unknown = null) {
  return {
    from: vi.fn().mockReturnValue({
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl } }),
      upload: vi.fn().mockResolvedValue({ error: uploadError }),
      remove: vi.fn().mockResolvedValue({ error: removeError }),
    }),
  };
}

describe('attachments CRUD', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- getAttachments ---
  describe('getAttachments', () => {
    it('첨부파일 목록을 다운로드 URL과 함께 반환한다', async () => {
      const mockData = [
        {
          id: '1',
          content_path: 'acquisition/rates',
          file_name: '세율표.pdf',
          storage_path: 'acquisition/rates/uuid.pdf',
          file_size: 102400,
          mime_type: 'application/pdf',
          uploaded_by: '홍길동',
          created_at: '2026-01-01T00:00:00Z',
        },
      ];
      const chain = buildChain({ data: mockData, error: null });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage('https://example.com/세율표.pdf'),
      } as ReturnType<typeof getSupabase>);

      const result = await getAttachments('acquisition/rates');
      expect(result).toHaveLength(1);
      expect(result[0].download_url).toBe('https://example.com/세율표.pdf');
      expect(result[0].file_name).toBe('세율표.pdf');
    });

    it('첨부파일이 없으면 빈 배열을 반환한다', async () => {
      const chain = buildChain({ data: [], error: null });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      const result = await getAttachments('acquisition/rates');
      expect(result).toEqual([]);
    });

    it('DB 에러 시 예외를 던진다', async () => {
      const chain = buildChain({ data: null, error: new Error('DB error') });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      await expect(getAttachments('path')).rejects.toThrow('DB error');
    });
  });

  // --- uploadAttachment (검증 로직) ---
  describe('uploadAttachment 입력 검증', () => {
    it('파일 크기가 10MB 초과하면 예외를 던진다', async () => {
      const file = new File(['x'], 'large.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: MAX_FILE_SIZE + 1 });

      mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);

      await expect(uploadAttachment(file, 'path', 'user')).rejects.toThrow('file size exceeds 10MB limit');
    });

    it('허용되지 않는 파일 타입이면 예외를 던진다', async () => {
      const file = new File(['content'], 'virus.exe', { type: 'application/x-executable' });
      Object.defineProperty(file, 'size', { value: 1024 });

      mockGetSupabase.mockReturnValue({} as ReturnType<typeof getSupabase>);

      await expect(uploadAttachment(file, 'path', 'user')).rejects.toThrow('file type not allowed');
    });

    it('허용된 타입(PDF)은 통과한다', async () => {
      const file = new File(['%PDF-1.4'], 'document.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1024 });

      const mockData = {
        id: '1', content_path: 'path', file_name: 'document.pdf',
        storage_path: 'path/uuid.pdf', file_size: 1024,
        mime_type: 'application/pdf', uploaded_by: 'user', created_at: '',
      };
      const chain = buildChain({ data: mockData, error: null });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      const result = await uploadAttachment(file, 'path', 'user');
      expect(result.file_name).toBe('document.pdf');
      expect(result.download_url).toBeDefined();
    });
  });

  // --- deleteAttachment ---
  describe('deleteAttachment', () => {
    it('업로더가 일치하면 파일을 삭제한다', async () => {
      const existingData = {
        id: '1', uploaded_by: '홍길동',
        storage_path: 'path/uuid.pdf',
      };
      const fetchChain = buildChain({ data: existingData, error: null });
      const deleteChain = buildChain({ data: null, error: null });

      const mockFrom = vi.fn()
        .mockReturnValueOnce(fetchChain)
        .mockReturnValueOnce(deleteChain);

      mockGetSupabase.mockReturnValue({
        from: mockFrom,
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      const result = await deleteAttachment('1', '홍길동');
      expect(result).toEqual({ success: true });
    });

    it('업로더가 다르면 에러를 반환한다', async () => {
      const chain = buildChain({ data: { uploaded_by: '다른사람', storage_path: 'path/file.pdf' }, error: null });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      const result = await deleteAttachment('1', '홍길동');
      expect(result.success).toBe(false);
      expect(result.error).toContain('only the uploader');
    });

    it('첨부파일이 없으면 에러를 반환한다', async () => {
      const chain = buildChain({ data: null, error: new Error('not found') });
      mockGetSupabase.mockReturnValue({
        from: vi.fn().mockReturnValue(chain),
        storage: buildStorage(),
      } as ReturnType<typeof getSupabase>);

      const result = await deleteAttachment('999', '홍길동');
      expect(result.success).toBe(false);
      expect(result.error).toBe('attachment not found');
    });
  });
});
