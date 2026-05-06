import { describe, it, expect } from 'vitest';
import {
  allBooks,
  getBookByPath,
  acquisition,
  property,
  vehicle,
  isLeafNode,
  findNodeBySlugs,
  findNodePath,
} from '@/book';
import type { TreeNode } from '@/book';

/** 재귀적으로 모든 노드가 유효한 id/slug/title을 가지는지 검증 */
function validateNode(node: TreeNode) {
  expect(node.id).toBeTruthy();
  expect(node.slug).toBeTruthy();
  expect(node.title).toBeTruthy();

  if (node.children) {
    node.children.forEach((child) => validateNode(child));
  }
}

/** leaf 노드 수를 재귀적으로 집계 */
function countLeafNodes(nodes: TreeNode[]): number {
  return nodes.reduce((sum, node) => {
    if (isLeafNode(node)) return sum + 1;
    return sum + countLeafNodes(node.children!);
  }, 0);
}

describe('Book Structure', () => {
  it('모든 필수 책이 존재한다', () => {
    expect(acquisition).toBeDefined();
    expect(property).toBeDefined();
    expect(vehicle).toBeDefined();
  });

  it('allBooks에 모든 책이 포함된다', () => {
    const ids = allBooks.map((b) => b.id);
    expect(ids).toContain('acquisition');
    expect(ids).toContain('property');
    expect(ids).toContain('vehicle');
  });

  it('각 책에 id, basePath, title, children이 있다', () => {
    for (const book of allBooks) {
      expect(book.id).toBeTruthy();
      expect(book.basePath).toBeTruthy();
      expect(book.title).toBeTruthy();
      expect(book.children).toBeDefined();
    }
  });

  it('모든 노드가 유효한 id/slug/title을 가진다', () => {
    for (const book of allBooks) {
      book.children.forEach((node) => validateNode(node));
    }
  });

  it('getBookByPath로 책을 찾을 수 있다', () => {
    const acq = getBookByPath('acquisition');
    expect(acq).toBeDefined();
    expect(acq!.id).toBe('acquisition');
  });

  it('존재하지 않는 경로는 undefined를 반환한다', () => {
    expect(getBookByPath('nonexistent')).toBeUndefined();
  });
});

describe('Acquisition Book', () => {
  it('rates, exemption, filing, admin, price 하위 노드가 존재한다', () => {
    const slugs = acquisition.children.map((n) => n.slug);
    expect(slugs).toContain('rates');
    expect(slugs).toContain('exemption');
    expect(slugs).toContain('filing');
    expect(slugs).toContain('admin');
    expect(slugs).toContain('price');
  });

  it('rates 하위에 realestate, non-realestate, common이 있다', () => {
    const rates = acquisition.children.find((n) => n.slug === 'rates');
    expect(rates).toBeDefined();
    expect(rates!.children).toBeDefined();
    const rateSlugs = rates!.children!.map((n) => n.slug);
    expect(rateSlugs).toContain('realestate');
    expect(rateSlugs).toContain('non-realestate');
    expect(rateSlugs).toContain('common');
  });

  it('realestate 하위에 housing, farmland, non-farmland leaf가 있다', () => {
    const node = findNodeBySlugs(acquisition.children, ['rates', 'realestate']);
    expect(node).toBeDefined();
    expect(node!.children).toBeDefined();
    const slugs = node!.children!.map((n) => n.slug);
    expect(slugs).toContain('housing');
    expect(slugs).toContain('farmland');
    expect(slugs).toContain('non-farmland');
  });

  it('multi-house가 acquisition의 직접 하위 노드이다', () => {
    const slugs = acquisition.children.map((n) => n.slug);
    expect(slugs).toContain('multi-house');
  });

  it('leaf 노드 수가 1 이상이다', () => {
    const count = countLeafNodes(acquisition.children);
    expect(count).toBeGreaterThan(0);
  });
});

describe('Tree Utility Functions', () => {
  it('findNodeBySlugs로 leaf 노드를 찾을 수 있다', () => {
    const node = findNodeBySlugs(acquisition.children, [
      'rates',
      'realestate',
      'housing',
    ]);
    expect(node).toBeDefined();
    expect(node!.title).toBe('주택');
  });

  it('findNodeBySlugs — 존재하지 않는 경로는 null을 반환한다', () => {
    const node = findNodeBySlugs(acquisition.children, ['nonexistent', 'path']);
    expect(node).toBeNull();
  });

  it('findNodePath로 노드 경로(조상 배열)를 찾을 수 있다', () => {
    const path = findNodePath(acquisition.children, 'acq-rates-realestate-housing');
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThanOrEqual(2);
    // 마지막 노드가 housing이어야 한다
    expect(path![path!.length - 1].slug).toBe('housing');
  });

  it('findNodePath — 존재하지 않는 ID는 null을 반환한다', () => {
    const path = findNodePath(acquisition.children, 'nonexistent-id');
    expect(path).toBeNull();
  });

  it('isLeafNode — children이 없는 노드는 leaf이다', () => {
    const housing = findNodeBySlugs(acquisition.children, [
      'rates',
      'realestate',
      'housing',
    ]);
    expect(isLeafNode(housing!)).toBe(true);
  });

  it('isLeafNode — children이 있는 노드는 leaf가 아니다', () => {
    const rates = acquisition.children.find((n) => n.slug === 'rates');
    expect(isLeafNode(rates!)).toBe(false);
  });
});
