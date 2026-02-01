import fs from 'fs';
import path from 'path';
import { getContentDir, parseFilename } from './loader';
import type { ContentVersion, TaxCategory } from '@/lib/types';

/**
 * Get all available versions for a content path.
 * Returns versions sorted descending (latest first).
 */
export function getContentVersions(
  category: TaxCategory,
  slugParts: string[],
): ContentVersion[] {
  const dir = getContentDir(category);
  const slugPath = slugParts.join('/');
  const dirPath = path.join(dir, path.dirname(slugPath));
  const slug = path.basename(slugPath);

  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath);
  const versions: ContentVersion[] = [];

  for (const entry of entries) {
    const parsed = parseFilename(entry);
    if (parsed && parsed.slug === slug) {
      versions.push({
        version: parsed.version,
        lastUpdated: '',
        filePath: path.join(dirPath, entry),
        isLatest: false,
      });
    }
  }

  // Sort descending by version
  versions.sort((a, b) => {
    const [aMajor, aMinor] = a.version.split('.').map(Number);
    const [bMajor, bMinor] = b.version.split('.').map(Number);
    if (bMajor !== aMajor) return bMajor - aMajor;
    return bMinor - aMinor;
  });

  if (versions.length > 0) {
    versions[0].isLatest = true;
  }

  return versions;
}

/**
 * Get the latest version string for a content path.
 */
export function getLatestVersion(
  category: TaxCategory,
  slugParts: string[],
): string | null {
  const versions = getContentVersions(category, slugParts);
  return versions.length > 0 ? versions[0].version : null;
}
