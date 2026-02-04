import { describe, it, expect } from 'vitest';
import {
  parseFilename,
  getContentPath,
  findContentFile,
  getMdxFiles,
  readMdxFile,
} from '@/lib/content/loader';
import path from 'path';

describe('parseFilename', () => {
  it('parses versioned filename', () => {
    const result = parseFilename('general-v1.0.mdx');
    expect(result).toEqual({ slug: 'general', version: '1.0' });
  });

  it('parses multi-word slug', () => {
    const result = parseFilename('multi-house-v1.0.mdx');
    expect(result).toEqual({ slug: 'multi-house', version: '1.0' });
  });

  it('parses first-time-buyer', () => {
    const result = parseFilename('first-time-buyer-v1.0.mdx');
    expect(result).toEqual({ slug: 'first-time-buyer', version: '1.0' });
  });

  it('returns null for non-versioned file', () => {
    expect(parseFilename('readme.mdx')).toBeNull();
    expect(parseFilename('test.md')).toBeNull();
  });
});

describe('getMdxFiles', () => {
  it('finds mdx files in content/acquisition/themes', () => {
    const dir = path.join(process.cwd(), 'content', 'acquisition', 'themes');
    const files = getMdxFiles(dir);
    expect(files.length).toBeGreaterThanOrEqual(2);
    expect(files.some((f) => f.includes('multi-house'))).toBe(true);
    expect(files.some((f) => f.includes('first-time-buyer'))).toBe(true);
  });

  it('returns empty array for non-existent directory', () => {
    const files = getMdxFiles('/nonexistent/path');
    expect(files).toEqual([]);
  });
});

describe('readMdxFile', () => {
  it('reads frontmatter from multi-house theme', () => {
    const filePath = path.join(
      process.cwd(),
      'content',
      'acquisition',
      'themes',
      'multi-house-v1.0.mdx',
    );
    const { meta, rawSource } = readMdxFile(filePath);
    expect(meta.title).toBeTruthy();
    expect(meta.version).toBe('1.0');
    expect(meta.audience).toBe('internal');
    expect(rawSource).toBeTruthy();
  });
});

describe('findContentFile', () => {
  it('finds multi-house theme file', () => {
    const file = findContentFile('acquisition', ['themes', 'multi-house']);
    expect(file).toBeTruthy();
    expect(file).toContain('multi-house-v1.0.mdx');
  });

  it('finds first-time-buyer theme file', () => {
    const file = findContentFile('acquisition', [
      'themes',
      'first-time-buyer',
    ]);
    expect(file).toBeTruthy();
    expect(file).toContain('first-time-buyer-v1.0.mdx');
  });

  it('returns null for non-existent content', () => {
    const file = findContentFile('acquisition', ['nonexistent', 'content']);
    expect(file).toBeNull();
  });
});
