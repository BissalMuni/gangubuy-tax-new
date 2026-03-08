/**
 * T073: Integration test for comment section
 *
 * US7: 사용자가 콘텐츠 페이지에서 댓글을 작성하고 삭제할 수 있다.
 * 테스트 대상: CommentList 컴포넌트 (fetch 모킹)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from 'antd';
import type { Comment } from '@/lib/types';

// matchMedia 모킹
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

import { CommentList } from '@/components/comments/CommentList';

const mockComments: Comment[] = [
  {
    id: '1',
    content_path: 'acquisition/rates/realestate/housing/housing',
    author: '홍길동',
    body: '주택 세율 정보 감사합니다.',
    created_at: '2026-01-01T10:00:00Z',
    updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: '2',
    content_path: 'acquisition/rates/realestate/housing/housing',
    author: '김철수',
    body: '중과 조건도 확인해주세요.',
    created_at: '2026-01-02T10:00:00Z',
    updated_at: '2026-01-02T10:00:00Z',
  },
];

// Ant Design App 래퍼
function renderWithApp(component: React.ReactElement) {
  return render(<App>{component}</App>);
}

describe('CommentList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // localStorage 초기화
    localStorage.clear();
  });

  it('댓글 목록을 로드하고 표시한다', async () => {
    // fetch 모킹: GET /api/comments
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockComments }),
    } as Response);

    renderWithApp(<CommentList contentPath="acquisition/rates/realestate/housing/housing" />);

    // 댓글이 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.getByText('주택 세율 정보 감사합니다.')).toBeInTheDocument();
      expect(screen.getByText('김철수')).toBeInTheDocument();
    });
  });

  it('댓글 수를 헤더에 표시한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockComments }),
    } as Response);

    renderWithApp(<CommentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      expect(screen.getByText('댓글 (2)')).toBeInTheDocument();
    });
  });

  it('댓글이 없으면 "댓글 (0)"을 표시한다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    renderWithApp(<CommentList contentPath="acquisition/rates/realestate/housing/housing" />);

    await waitFor(() => {
      expect(screen.getByText('댓글 (0)')).toBeInTheDocument();
    });
  });

  it('로딩 중에는 스피너를 표시한다', () => {
    // fetch가 resolve되지 않는 상태 유지
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));

    renderWithApp(<CommentList contentPath="acquisition/rates/realestate/housing/housing" />);

    // Ant Design Spin 컴포넌트가 렌더링된다
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('댓글 작성 폼이 렌더링된다', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    renderWithApp(<CommentList contentPath="path" />);

    await waitFor(() => {
      // 댓글 textarea와 작성 버튼이 있다 (CommentForm 내부)
      expect(screen.getByPlaceholderText('댓글을 입력하세요')).toBeInTheDocument();
      expect(screen.getByText('댓글 작성')).toBeInTheDocument();
    });
  });
});
