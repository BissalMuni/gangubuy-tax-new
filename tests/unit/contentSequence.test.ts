import { describe, it, expect } from 'vitest';
import {
  getLeafPaths,
  getNextPath,
  getPrevPath,
  getSequencePosition,
} from '@/lib/navigation/contentSequence';
import { navigationConfig } from '@/lib/navigation/nav.config';

describe('contentSequence', () => {
  describe('getLeafPaths', () => {
    it('should return only leaf nodes (non-category) from a navigation node', () => {
      const leaves = getLeafPaths(navigationConfig.acquisition);
      expect(leaves.length).toBeGreaterThan(0);
      // All returned paths should start with /acquisition
      for (const leaf of leaves) {
        expect(leaf).toMatch(/^\/acquisition\//);
      }
    });

    it('should return paths in depth-first traversal order', () => {
      const leaves = getLeafPaths(navigationConfig.acquisition);
      // First leaf should be housing (single file, no subpages)
      expect(leaves[0]).toBe('/acquisition/rates/realestate/housing');
    });

    it('should not include category nodes (only leaf nodes)', () => {
      const leaves = getLeafPaths(navigationConfig.acquisition);
      // /acquisition/rates is a category, should not be in leaves
      expect(leaves).not.toContain('/acquisition/rates');
      expect(leaves).not.toContain('/acquisition/rates/realestate');
    });

    it('should return empty array for a node with no children', () => {
      const leaves = getLeafPaths({
        label: '검색',
        path: '/search',
        icon: 'search',
      });
      // A node with no children and not a category is itself a leaf
      expect(leaves).toEqual(['/search']);
    });
  });

  describe('getNextPath', () => {
    it('should return the next leaf path in the category', () => {
      const next = getNextPath('/acquisition/rates/realestate/housing');
      expect(next).toBe('/acquisition/rates/realestate/farmland');
    });

    it('should cross parent boundaries to find next sibling', () => {
      const next = getNextPath('/acquisition/rates/realestate/non-farmland');
      // After non-farmland, should go to non-realestate
      expect(next).toBe('/acquisition/rates/non-realestate/non-realestate');
    });

    it('should return null for the last leaf in the category', () => {
      const leaves = getLeafPaths(navigationConfig.acquisition);
      const lastLeaf = leaves[leaves.length - 1];
      const next = getNextPath(lastLeaf);
      expect(next).toBeNull();
    });

    it('should return null for an unknown path', () => {
      const next = getNextPath('/nonexistent/path');
      expect(next).toBeNull();
    });
  });

  describe('getPrevPath', () => {
    it('should return the previous leaf path', () => {
      const prev = getPrevPath('/acquisition/rates/realestate/farmland');
      expect(prev).toBe('/acquisition/rates/realestate/housing');
    });

    it('should return null for the first leaf in the category', () => {
      const leaves = getLeafPaths(navigationConfig.acquisition);
      const firstLeaf = leaves[0];
      const prev = getPrevPath(firstLeaf);
      expect(prev).toBeNull();
    });
  });

  describe('getSequencePosition', () => {
    it('should return current index and total count', () => {
      const pos = getSequencePosition('/acquisition/rates/realestate/housing');
      expect(pos).not.toBeNull();
      expect(pos!.current).toBe(0);
      expect(pos!.total).toBeGreaterThan(1);
    });

    it('should return null for unknown path', () => {
      const pos = getSequencePosition('/unknown');
      expect(pos).toBeNull();
    });
  });
});
