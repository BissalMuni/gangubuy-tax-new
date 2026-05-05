import { type ComponentType, lazy } from 'react';
import { findNodePath, type Book, type TreeNode } from '@/lib/book';

/**
 * 세금 콘텐츠 경로 도출
 *
 * 모든 book이 동일한 규칙: {basePath}/{ancestor-slugs}/{leaf-slug}-v{version}
 * 트리 노드의 slug 경로가 곧 content 디렉토리 경로.
 * 파일명은 leaf slug + version suffix (기본 v1.0).
 *
 * 예시:
 *   acquisition, leaf "rental-business" → "acquisition/exemption/rental-business-v1.0"
 *   corp-acquisition-tax, leaf "01-rate" → "corp-acquisition-tax/heavy/01-rate-v1.0"
 */
function derivePath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length === 0) return null;

  const version = leaf.version || '1.0';
  const slugs = path.map((n) => n.slug);
  // 파일명은 마지막 slug에 버전 suffix 붙임
  const dir = slugs.slice(0, -1).join('/');
  const fileName = `${slugs[slugs.length - 1]}-v${version}`;

  if (dir) {
    return `${book.basePath}/${dir}/${fileName}`;
  }
  return `${book.basePath}/${fileName}`;
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
