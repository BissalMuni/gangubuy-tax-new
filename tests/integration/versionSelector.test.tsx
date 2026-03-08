/**
 * T049: Integration test for version selector
 *
 * US5: 사용자가 콘텐츠의 버전 목록을 보고 다른 버전으로 전환할 수 있다.
 * 테스트 대상: VersionSelector + ContentHeader 컴포넌트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ContentVersion, ContentMeta } from '@/lib/types';

// next/navigation 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/acquisition/rates/realestate/housing/housing',
  useSearchParams: () => new URLSearchParams(),
}));

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

import { VersionSelector } from '@/components/ui/VersionSelector';
import { ContentHeader } from '@/components/content/ContentHeader';

const mockVersions: ContentVersion[] = [
  { version: '1.1', lastUpdated: '2026-03-01', filePath: 'content/acquisition/rates/realestate/housing-v1.1.mdx', isLatest: true },
  { version: '1.0', lastUpdated: '2026-01-01', filePath: 'content/acquisition/rates/realestate/housing-v1.0.mdx', isLatest: false },
];

const mockMeta: ContentMeta = {
  id: 'housing',
  title: '주택 취득세 세율',
  description: '주택 유형별 취득세 세율',
  category: 'acquisition',
  version: '1.1',
  lastUpdated: '2026-03-01',
  legalBasis: '지방세법 §11',
  audience: 'internal',
};

describe('VersionSelector', () => {
  it('버전이 2개 이상이면 셀렉트가 표시된다', async () => {
    render(<VersionSelector versions={mockVersions} currentVersion="1.1" />);
    // Ant Design Select는 비동기 렌더링 — findByText 사용
    expect(await screen.findByText('v1.1 (최신)')).toBeInTheDocument();
  });

  it('버전이 1개 이하이면 셀렉트를 렌더링하지 않는다', () => {
    const singleVersion: ContentVersion[] = [
      { version: '1.0', lastUpdated: '2026-01-01', filePath: 'content/x-v1.0.mdx', isLatest: true },
    ];
    const { container } = render(<VersionSelector versions={singleVersion} currentVersion="1.0" />);
    expect(container.firstChild).toBeNull();
  });

  it('이전 버전을 보고 있을 때 "이전 버전" 태그가 표시된다', () => {
    render(<VersionSelector versions={mockVersions} currentVersion="1.0" />);
    expect(screen.getByText('이전 버전을 보고 있습니다')).toBeInTheDocument();
  });

  it('최신 버전을 보고 있을 때 "이전 버전" 태그가 없다', () => {
    render(<VersionSelector versions={mockVersions} currentVersion="1.1" />);
    expect(screen.queryByText('이전 버전을 보고 있습니다')).not.toBeInTheDocument();
  });
});

describe('ContentHeader with VersionSelector', () => {
  it('버전이 여러 개일 때 VersionSelector가 통합된다', () => {
    render(<ContentHeader meta={mockMeta} versions={mockVersions} />);
    expect(screen.getByText('주택 취득세 세율')).toBeInTheDocument();
    // 버전 선택기가 표시된다
    expect(screen.getByText('v1.1 (최신)')).toBeInTheDocument();
  });

  it('버전이 1개이면 버전 태그만 표시된다', () => {
    const singleVersion: ContentVersion[] = [
      { version: '1.0', lastUpdated: '2026-01-01', filePath: 'x-v1.0.mdx', isLatest: true },
    ];
    render(<ContentHeader meta={{ ...mockMeta, version: '1.0' }} versions={singleVersion} />);
    expect(screen.getByText('v1.0')).toBeInTheDocument();
  });

  it('법령 근거가 표시된다', () => {
    render(<ContentHeader meta={mockMeta} versions={mockVersions} />);
    expect(screen.getByText('지방세법 §11')).toBeInTheDocument();
  });
});
