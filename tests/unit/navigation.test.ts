import { describe, it, expect } from 'vitest';
import { navigationConfig } from '@/lib/navigation/nav.config';
import type { NavigationNode } from '@/lib/types';

function validateNode(node: NavigationNode, parentPath?: string) {
  expect(node.label).toBeTruthy();
  expect(node.path).toMatch(/^\//);

  if (node.children) {
    Object.values(node.children).forEach((child) => {
      validateNode(child, node.path);
    });
  }
}

function countLeafNodes(node: NavigationNode): number {
  if (!node.children) return 1;
  return Object.values(node.children).reduce(
    (sum, child) => sum + countLeafNodes(child),
    0,
  );
}

describe('Navigation Config', () => {
  it('has all required top-level categories', () => {
    expect(navigationConfig.home).toBeDefined();
    expect(navigationConfig.acquisition).toBeDefined();
    expect(navigationConfig.property).toBeDefined();
    expect(navigationConfig.vehicle).toBeDefined();
    expect(navigationConfig.search).toBeDefined();
  });

  it('top-level categories are in correct order', () => {
    const keys = Object.keys(navigationConfig);
    expect(keys).toEqual([
      'home',
      'acquisition',
      'corp-acquisition-tax',
      'property',
      'vehicle',
      'search',
    ]);
  });

  it('all nodes have valid label and path', () => {
    Object.values(navigationConfig).forEach((node) => {
      validateNode(node);
    });
  });

  it('acquisition has rates, exemption, filing, admin, price children', () => {
    const children = navigationConfig.acquisition.children;
    expect(children).toBeDefined();
    expect(children!.rates).toBeDefined();
    expect(children!.exemption).toBeDefined();
    expect(children!.filing).toBeDefined();
    expect(children!.admin).toBeDefined();
    expect(children!.price).toBeDefined();
  });

  it('rates has realestate, non-realestate, common', () => {
    const rates = navigationConfig.acquisition.children!.rates;
    expect(rates.children).toBeDefined();
    expect(rates.children!.realestate).toBeDefined();
    expect(rates.children!['non-realestate']).toBeDefined();
    expect(rates.children!.common).toBeDefined();
  });

  it('realestate has housing, farmland, non-farmland leaf nodes', () => {
    const realestate = navigationConfig.acquisition.children!.rates.children!.realestate;
    expect(realestate.children).toBeDefined();
    const keys = Object.keys(realestate.children!);
    expect(keys).toContain('housing');
    expect(keys).toContain('farmland');
    expect(keys).toContain('non-farmland');
  });

  it('multi-house and luxury are direct children of acquisition', () => {
    const children = navigationConfig.acquisition.children!;
    expect(children['multi-house']).toBeDefined();
    expect(children['luxury']).toBeDefined();
  });
});
