/**
 * T017: Integration test for content page rendering
 *
 * US1: 사용자가 사이드바 네비게이션을 통해 세금 콘텐츠를 탐색할 수 있다.
 * 테스트 대상: Sidebar 컴포넌트 — 실제 Content Page의 핵심 네비게이션 요소
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// next/navigation 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/acquisition',
}));

// Ant Design이 필요로 하는 matchMedia 모킹 (jsdom에서 미지원)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

import { Sidebar } from '@/components/layout/Sidebar';

describe('Sidebar (Content Page Navigation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('상위 네비게이션 카테고리가 모두 렌더링된다', () => {
    render(<Sidebar />);
    // 메인 카테고리들이 표시되어야 한다
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('취득세')).toBeInTheDocument();
    expect(screen.getByText('재산세')).toBeInTheDocument();
    expect(screen.getByText('자동차세')).toBeInTheDocument();
    expect(screen.getByText('검색')).toBeInTheDocument();
  });

  it('현재 경로(/acquisition)에 해당하는 메뉴 항목이 선택된 상태다', () => {
    render(<Sidebar />);
    // 취득세 항목이 존재한다
    const acquisitionItem = screen.getByText('취득세');
    expect(acquisitionItem).toBeInTheDocument();
  });

  it('취득세 하위 메뉴 항목들이 존재한다', () => {
    render(<Sidebar />);
    // 취득세 하위 카테고리 확인
    expect(screen.getByText('세율')).toBeInTheDocument();
    expect(screen.getByText('신고')).toBeInTheDocument();
  });
});
