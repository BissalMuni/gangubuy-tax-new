import type { ThemeItem } from '@/components/mdx/ThemeNav';

/**
 * 취득세 테마 네비게이션 구성
 * - 각 테마는 content/acquisition/themes/ 하위 MDX 파일에 대응
 */
export const acquisitionThemes: ThemeItem[] = [
  { label: '유상거래', href: '/acquisition/themes/trade' },
  { label: '상속', href: '/acquisition/themes/inheritance' },
  { label: '증여', href: '/acquisition/themes/gift' },
  { label: '원시취득', href: '/acquisition/themes/original' },
  { label: '다주택자 중과', href: '/acquisition/themes/multi-house' },
  { label: '법인 취득 중과', href: '/acquisition/themes/corporate' },
  { label: '고급주택 중과', href: '/acquisition/themes/luxury' },
];
