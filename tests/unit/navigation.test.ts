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

  it('acquisition has rates, themes, standard children', () => {
    const children = navigationConfig.acquisition.children;
    expect(children).toBeDefined();
    expect(children!.rates).toBeDefined();
    expect(children!.themes).toBeDefined();
    expect(children!.standard).toBeDefined();
  });

  it('rates has realestate, non-realestate, common', () => {
    const rates = navigationConfig.acquisition.children!.rates;
    expect(rates.children).toBeDefined();
    expect(rates.children!.realestate).toBeDefined();
    expect(rates.children!['non-realestate']).toBeDefined();
    expect(rates.children!.common).toBeDefined();
  });

  it('housing has all expected leaf nodes', () => {
    const housing =
      navigationConfig.acquisition.children!.rates.children!.realestate
        .children!.housing;
    expect(housing.children).toBeDefined();
    const keys = Object.keys(housing.children!);
    expect(keys).toContain('general');
    expect(keys).toContain('inheritance');
    expect(keys).toContain('gift');
    expect(keys).toContain('original');
    expect(keys).toContain('multi-house');
    expect(keys).toContain('corporate');
    expect(keys).toContain('luxury');
  });

  it('themes contains multi-house and first-time-buyer', () => {
    const themes = navigationConfig.acquisition.children!.themes;
    expect(themes.children).toBeDefined();
    expect(themes.children!['multi-house']).toBeDefined();
    expect(themes.children!['first-time-buyer']).toBeDefined();
  });
});
