import { describe, it, expect } from 'vitest';
import { getContentVersions, getLatestVersion } from '@/lib/content/versions';

describe('versions', () => {
  describe('getContentVersions', () => {
    it('should return versions for a content path with versioned files', () => {
      const versions = getContentVersions('acquisition', [
        'themes',
        'multi-house',
      ]);
      expect(versions.length).toBeGreaterThanOrEqual(1);
      expect(versions[0].version).toBe('1.0');
    });

    it('should return empty array for non-existent content', () => {
      const versions = getContentVersions('acquisition', [
        'nonexistent',
        'path',
      ]);
      expect(versions).toEqual([]);
    });

    it('should mark the latest version correctly', () => {
      const versions = getContentVersions('acquisition', [
        'themes',
        'multi-house',
      ]);
      const latest = versions.filter((v) => v.isLatest);
      expect(latest.length).toBe(1);
    });

    it('should sort versions in descending order', () => {
      const versions = getContentVersions('acquisition', [
        'themes',
        'multi-house',
      ]);
      for (let i = 1; i < versions.length; i++) {
        expect(versions[i - 1].version >= versions[i].version).toBe(true);
      }
    });
  });

  describe('getLatestVersion', () => {
    it('should return the latest version string', () => {
      const latest = getLatestVersion('acquisition', [
        'themes',
        'multi-house',
      ]);
      expect(latest).toBe('1.0');
    });

    it('should return null for non-existent content', () => {
      const latest = getLatestVersion('acquisition', [
        'nonexistent',
        'path',
      ]);
      expect(latest).toBeNull();
    });
  });
});
