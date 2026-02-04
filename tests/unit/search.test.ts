import { describe, it, expect, beforeEach } from 'vitest';
import { searchContent, resetSearchIndex } from '@/lib/content/search';

describe('search', () => {
  beforeEach(() => {
    resetSearchIndex();
  });

  it('should return results for a valid query', () => {
    const results = searchContent('다주택');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].title).toBeTruthy();
    expect(results[0].path).toBeTruthy();
  });

  it('should return empty array for empty query', () => {
    const results = searchContent('');
    expect(results).toEqual([]);
  });

  it('should return empty array for non-matching query', () => {
    const results = searchContent('xyznonexistentquery123');
    expect(results).toEqual([]);
  });

  it('should include snippet in results', () => {
    const results = searchContent('주택');
    if (results.length > 0) {
      expect(results[0].snippet).toBeTruthy();
      expect(typeof results[0].snippet).toBe('string');
    }
  });

  it('should include path and category in results', () => {
    const results = searchContent('취득세');
    if (results.length > 0) {
      expect(results[0].path).toMatch(/^\//);
      expect(results[0].category).toBeTruthy();
    }
  });

  it('should respect limit parameter', () => {
    const results = searchContent('주택', 1);
    expect(results.length).toBeLessThanOrEqual(1);
  });
});
