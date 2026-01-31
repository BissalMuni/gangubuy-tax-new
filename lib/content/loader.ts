import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContentMeta, TaxCategory } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getContentDir(category: TaxCategory): string {
  return path.join(CONTENT_DIR, category);
}

/**
 * Get all MDX files recursively from a directory
 */
export function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parse version from filename: "general-v1.0.mdx" → { slug: "general", version: "1.0" }
 */
export function parseFilename(filename: string): {
  slug: string;
  version: string;
} | null {
  const match = filename.match(/^(.+)-v(\d+\.\d+)\.mdx$/);
  if (!match) return null;
  return { slug: match[1], version: match[2] };
}

/**
 * Get content path relative to content directory
 * e.g., "content/acquisition/rates/realestate/housing/general-v1.0.mdx"
 *     → "acquisition/rates/realestate/housing/general"
 */
export function getContentPath(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  const parsed = parseFilename(path.basename(relative));
  if (!parsed) return relative.replace(/\.mdx$/, '');
  const dir = path.dirname(relative);
  return path.join(dir, parsed.slug).replace(/\\/g, '/');
}

/**
 * Read and parse an MDX file's frontmatter
 */
export function readMdxFile(filePath: string): {
  meta: ContentMeta;
  rawSource: string;
} {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const parsed = parseFilename(path.basename(filePath));

  return {
    meta: {
      id: getContentPath(filePath),
      title: data.title || '',
      description: data.description || '',
      category: data.category || 'acquisition',
      version: parsed?.version || data.version || '1.0',
      lastUpdated: data.last_updated || data.lastUpdated || '',
      legalBasis: data.law_reference || data.legalBasis,
      audience: data.audience,
    },
    rawSource: content,
  };
}

/**
 * Get all content slugs for a category (for generateStaticParams)
 */
export function getContentSlugs(category: TaxCategory): string[][] {
  const dir = getContentDir(category);
  const files = getMdxFiles(dir);

  return files.map((file) => {
    const contentPath = getContentPath(file);
    // Remove category prefix: "acquisition/rates/housing/general" → ["rates", "housing", "general"]
    const parts = contentPath.split('/').slice(1);
    return parts;
  });
}

/**
 * Find the MDX file for a given slug path and optional version
 */
export function findContentFile(
  category: TaxCategory,
  slugParts: string[],
  version?: string,
): string | null {
  const dir = getContentDir(category);
  const slugPath = slugParts.join('/');
  const dirPath = path.join(dir, path.dirname(slugPath));
  const slug = path.basename(slugPath);

  if (!fs.existsSync(dirPath)) return null;

  const entries = fs.readdirSync(dirPath);

  if (version) {
    const targetFile = `${slug}-v${version}.mdx`;
    if (entries.includes(targetFile)) {
      return path.join(dirPath, targetFile);
    }
    return null;
  }

  // Find latest version
  const versionedFiles = entries
    .filter((f) => {
      const parsed = parseFilename(f);
      return parsed && parsed.slug === slug;
    })
    .sort()
    .reverse();

  if (versionedFiles.length === 0) return null;
  return path.join(dirPath, versionedFiles[0]);
}
