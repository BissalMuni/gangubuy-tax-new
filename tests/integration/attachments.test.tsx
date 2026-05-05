/**
 * T081: Integration test for attachment section
 *
 * US8: 사용자가 콘텐츠 페이지에서 파일을 업로드하고 다운로드할 수 있다.
 * 테스트 대상: AttachmentList 컴포넌트 (fetch 모킹)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Attachment } from '@/lib/types';

import { AttachmentList } from '@/components/attachments/AttachmentList';

const mockAttachments: Attachment[] = [
  {
    id: '1',
    content_path: 'acquisition/rates/realestate/housing/housing',
    file_name: '취득세_세율표_2026.pdf',
    storage_path: 'acquisition/rates/realestate/housing/housing/uuid1.pdf',
    file_size: 204800,
    mime_type: 'application/pdf',
    uploaded_by: '홍길동',
    created_at: '2026-01-01T10:00:00Z',
    download_url: 'https://example.com/취득세_세율표_2026.pdf',
  },
  {
    id: '2',
    content_path: 'acquisition/rates/realestate/housing/housing',
    file_name: '주택가격_기준표.xlsx',
    storage_path: 'acquisition/rates/realestate/housing/housing/uuid2.xlsx',
    file_size: 51200,
    mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploaded_by: '김철수',
    created_at: '2026-01-02T10:00:00Z',
    download_url: 'https://example.com/주택가격_기준표.xlsx',
  },
];

describe('AttachmentList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('첨부파일 목록을 로드하고 표시한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAttachments }),
    } as Response);

    render(<AttachmentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      expect(screen.getByText('취득세_세율표_2026.pdf')).toBeInTheDocument();
      expect(screen.getByText('주택가격_기준표.xlsx')).toBeInTheDocument();
    });
  });

  it('첨부파일 수를 헤더에 표시한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAttachments }),
    } as Response);

    render(<AttachmentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      expect(screen.getByText('첨부파일 (2)')).toBeInTheDocument();
    });
  });

  it('첨부파일이 없으면 안내 메시지를 표시한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    render(<AttachmentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      expect(screen.getByText('첨부파일이 없습니다')).toBeInTheDocument();
    });
  });

  it('로딩 중에는 스피너를 표시한다', () => {
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));

    render(<AttachmentList contentPath="acquisition/rates/realestate/housing/housing" />);

    // Tailwind animate-spin 스피너가 렌더링된다
    expect(screen.getByLabelText('첨부파일 로딩 중')).toBeInTheDocument();
  });

  it('다운로드 링크가 올바른 URL을 가진다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockAttachments }),
    } as Response);

    render(<AttachmentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      const downloadLinks = screen.getAllByText('다운로드');
      expect(downloadLinks).toHaveLength(2);
      expect(downloadLinks[0].closest('a')).toHaveAttribute(
        'href',
        'https://example.com/취득세_세율표_2026.pdf',
      );
    });
  });

  it('업로드 버튼이 렌더링된다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    render(<AttachmentList contentPath="path" />);

    await waitFor(() => {
      expect(screen.getByText('파일 업로드')).toBeInTheDocument();
    });
  });
});
