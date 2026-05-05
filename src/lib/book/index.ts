export { acquisition } from './acquisition';
export { corpAcquisitionTax } from './corp-acquisition-tax';
export { property } from './property';
export { vehicle } from './vehicle';
export type { TreeNode, Book } from './types';
export { isLeafNode, findNodePath, findNodeBySlugs } from './types';

import { acquisition } from './acquisition';
import { corpAcquisitionTax } from './corp-acquisition-tax';
import { property } from './property';
import { vehicle } from './vehicle';
import type { Book } from './types';

/** 모든 책 */
export const allBooks: Book[] = [acquisition, corpAcquisitionTax, property, vehicle];

/** basePath로 책 찾기 */
export function getBookByPath(basePath: string): Book | undefined {
  return allBooks.find((b) => b.basePath === basePath);
}
