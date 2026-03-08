/**
 * T057: Integration test for search page
 *
 * US6: 사용자가 검색어를 입력하면 관련 콘텐츠 목록이 표시된다.
 * 테스트 대상: SearchResults 컴포넌트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { SearchResult } from '@/lib/types';

// next/link 모킹 (jsdom에서 Link 컴포넌트 사용)
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { SearchResults } from '@/components/search/SearchResults';

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: '주택 취득세 세율',
    category: '취득세',
    path: '/acquisition/rates/realestate/housing/housing',
    snippet: '주택 유상거래 취득세 세율은 1%~3%입니다.',
    score: 0.95,
  },
  {
    id: '2',
    title: '농지 취득세 세율',
    category: '취득세',
    path: '/acquisition/rates/realestate/farmland/farmland',
    snippet: '농지 유상거래 취득세 세율은 3%입니다.',
    score: 0.85,
  },
];

describe('SearchResults', () => {
  it('검색 결과가 있으면 목록을 렌더링한다', () => {
    const { container } = render(<SearchResults results={mockResults} query="주택" />);
    // "주택 취득세 세율"은 "주택"이 <mark>로 분리되므로 textContent로 확인
    expect(container.textContent).toContain('주택 취득세 세율');
    // "농지 취득세 세율"은 하이라이트 없음 (query="주택" not in title)
    expect(screen.getByText('농지 취득세 세율')).toBeInTheDocument();
  });

  it('검색어를 하이라이트한다', () => {
    render(<SearchResults results={mockResults} query="주택" />);
    // 하이라이트된 텍스트는 <mark> 태그로 감싸진다
    const marks = document.querySelectorAll('mark');
    expect(marks.length).toBeGreaterThan(0);
    expect(marks[0].textContent).toBe('주택');
  });

  it('카테고리 태그가 표시된다', () => {
    render(<SearchResults results={mockResults} query="취득세" />);
    const tags = screen.getAllByText('취득세');
    // 결과 항목들에 카테고리 태그가 있다
    expect(tags.length).toBeGreaterThanOrEqual(2);
  });

  it('결과가 없으면 "검색 결과가 없습니다" 메시지를 표시한다', () => {
    render(<SearchResults results={[]} query="존재하지않는검색어" />);
    expect(screen.getByText(/"존재하지않는검색어"에 대한 검색 결과가 없습니다/)).toBeInTheDocument();
  });

  it('검색어가 없으면 빈 화면을 표시한다 (query 없음)', () => {
    const { container } = render(<SearchResults results={[]} query="" />);
    // 빈 결과 + 빈 쿼리 → 아무것도 표시되지 않는다
    expect(container.firstChild?.firstChild).toBeNull();
  });

  it('각 결과 항목이 올바른 링크를 가진다', async () => {
    render(<SearchResults results={mockResults} query="세율" />);
    const links = await screen.findAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/acquisition/rates/realestate/housing/housing');
    expect(links[1]).toHaveAttribute('href', '/acquisition/rates/realestate/farmland/farmland');
  });
});
