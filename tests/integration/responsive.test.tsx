/**
 * T036: Integration test for responsive layout
 *
 * US3: 모바일 환경에서 사이드바 대신 모바일 네비게이션이 표시된다.
 * 테스트 대상: MobileNav 컴포넌트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// next/navigation 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
}));

// matchMedia 모킹
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

import { MobileNav } from '@/components/ui/MobileNav';

describe('MobileNav (Responsive Layout)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('open=true일 때 드로어가 열리고 메뉴 제목이 표시된다', () => {
    const onClose = vi.fn();
    render(<MobileNav open={true} onClose={onClose} />);

    // Ant Design Drawer가 열려서 타이틀이 보인다
    expect(screen.getByText('메뉴')).toBeInTheDocument();
  });

  it('open=false일 때 드로어가 닫혀 있다', () => {
    const onClose = vi.fn();
    render(<MobileNav open={false} onClose={onClose} />);

    // 드로어가 닫혀 있어서 메뉴 타이틀이 없다
    expect(screen.queryByText('메뉴')).not.toBeInTheDocument();
  });

  it('드로어가 열렸을 때 네비게이션 항목이 렌더링된다', () => {
    const onClose = vi.fn();
    render(<MobileNav open={true} onClose={onClose} />);

    // 주요 카테고리가 모두 표시된다
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('취득세')).toBeInTheDocument();
    expect(screen.getByText('재산세')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(<MobileNav open={true} onClose={onClose} />);

    // Ant Design Drawer의 닫기 버튼 (aria-label="Close")
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
