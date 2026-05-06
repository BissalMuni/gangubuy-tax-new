import { type ComponentType, lazy } from 'react';
import { findNodePath, type Book, type TreeNode } from '@/book';

/**
 * 세금 콘텐츠 경로 도출
 *
 * 모든 book이 동일한 규칙: {basePath}/{ancestor-slugs}/{leaf-slug}
 * 트리 노드의 slug 경로가 곧 content 디렉토리 경로.
 *
 * 예시:
 *   acquisition, leaf "rental-business" → "acquisition/exemption/rental-business"
 *   corp-acquisition-tax, leaf "01-rate" → "corp-acquisition-tax/heavy/01-rate"
 */
function derivePath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length === 0) return null;

  const slugs = path.map((n) => n.slug);
  return `${book.basePath}/${slugs.join('/')}`;
}

/**
 * book + leaf로 콘텐츠 컴포넌트 가져오기.
 * 컨벤션 기반 경로 도출 → React.lazy로 동적 import.
 * 파일 없으면 null → "준비 중" 표시.
 */
export function getContentComponent(
  book: Book,
  leaf: TreeNode,
): ComponentType | null {
  const path = derivePath(book, leaf);
  if (!path) return null;
  return lazy(() => import(`@/content/${path}.tsx`));
}
