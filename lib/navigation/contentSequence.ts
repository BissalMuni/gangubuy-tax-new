import type { NavigationNode, TaxCategory } from '@/lib/types';
import { navigationConfig } from './nav.config';

/**
 * Get all leaf (non-category) paths from a navigation node via depth-first traversal.
 */
export function getLeafPaths(node: NavigationNode): string[] {
  if (!node.children) {
    return [node.path];
  }

  const leaves: string[] = [];
  for (const child of Object.values(node.children)) {
    if (child.isCategory || child.children) {
      leaves.push(...getLeafPaths(child));
    } else {
      leaves.push(child.path);
    }
  }
  return leaves;
}

/**
 * Detect the category from a path (e.g., "/acquisition/rates/..." → "acquisition")
 */
function getCategoryFromPath(path: string): TaxCategory | null {
  const segment = path.split('/').filter(Boolean)[0];
  if (segment === 'acquisition' || segment === 'property' || segment === 'vehicle') {
    return segment;
  }
  return null;
}

/**
 * Get all leaf paths for the category that contains the given path.
 */
function getCategoryLeaves(path: string): string[] {
  const category = getCategoryFromPath(path);
  if (!category) return [];
  const node = navigationConfig[category];
  if (!node) return [];
  return getLeafPaths(node);
}

/**
 * Get the next leaf path after the given path within the same category.
 * Returns null if at the end or path not found.
 */
export function getNextPath(currentPath: string): string | null {
  const leaves = getCategoryLeaves(currentPath);
  const idx = leaves.indexOf(currentPath);
  if (idx === -1 || idx >= leaves.length - 1) return null;
  return leaves[idx + 1];
}

/**
 * Get the previous leaf path before the given path within the same category.
 * Returns null if at the beginning or path not found.
 */
export function getPrevPath(currentPath: string): string | null {
  const leaves = getCategoryLeaves(currentPath);
  const idx = leaves.indexOf(currentPath);
  if (idx <= 0) return null;
  return leaves[idx - 1];
}

/**
 * Get the position of a path in its category's leaf sequence.
 * Returns { current, total } or null if not found.
 */
export function getSequencePosition(
  currentPath: string,
): { current: number; total: number } | null {
  const leaves = getCategoryLeaves(currentPath);
  const idx = leaves.indexOf(currentPath);
  if (idx === -1) return null;
  return { current: idx, total: leaves.length };
}
