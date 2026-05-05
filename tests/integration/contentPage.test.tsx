/**
 * T017: Integration test for content page rendering
 *
 * US1: 사용자가 사이드바 네비게이션을 통해 세금 콘텐츠를 탐색할 수 있다.
 * 테스트 대상: Sidebar 컴포넌트 — Tailwind 기반, 바구니→책→트리 3단 구조
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// next/navigation 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/acquisition',
}));

import { Sidebar } from '@/components/navigation/sidebar';

describe('Sidebar (Tailwind, Book-based Navigation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('사이드바가 렌더링된다', () => {
    render(<Sidebar />);
    // 사이트 타이틀이 표시된다
    expect(screen.getByText('GanguBuy Tax', { exact: false })).toBeInTheDocument();
  });

  it('바구니 제목이 표시된다', () => {
    render(<Sidebar />);
    // 지방세 바구니가 렌더링된다
    expect(screen.getByText('지방세')).toBeInTheDocument();
  });

  it('책 제목들이 표시된다', () => {
    render(<Sidebar />);
    // 바구니 안에 책 제목들이 버튼으로 표시된다
    expect(screen.getByText('취득세')).toBeInTheDocument();
    expect(screen.getByText('재산세')).toBeInTheDocument();
    expect(screen.getByText('자동차세')).toBeInTheDocument();
  });

  it('책을 클릭하면 하위 트리가 펼쳐진다', () => {
    render(<Sidebar />);
    // 취득세 책을 클릭
    const acquisitionButton = screen.getByText('취득세');
    fireEvent.click(acquisitionButton);

    // 하위 카테고리가 표시된다
    expect(screen.getByText('세율')).toBeInTheDocument();
    expect(screen.getByText('신고')).toBeInTheDocument();
  });

  it('모바일 토글 버튼이 존재한다', () => {
    render(<Sidebar />);
    // 모바일 메뉴 토글 버튼
    const toggleButton = screen.getByLabelText('메뉴 열기');
    expect(toggleButton).toBeInTheDocument();
  });

  it('모바일 토글 클릭 시 사이드바가 열린다', () => {
    render(<Sidebar />);
    const toggleButton = screen.getByLabelText('메뉴 열기');
    fireEvent.click(toggleButton);
    // 토글 후 닫기 버튼으로 변경
    expect(screen.getByLabelText('메뉴 닫기')).toBeInTheDocument();
  });
});
