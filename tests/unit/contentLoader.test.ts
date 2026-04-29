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
  // themes 디렉토리: luxury, trade (multi-house는 multi-house/ 디렉토리로 이동됨)
  it('finds mdx files in content/acquisition/themes', () => {
    const dir = path.join(process.cwd(), 'content', 'acquisition', 'themes');
    const files = getMdxFiles(dir);
    expect(files.length).toBeGreaterThanOrEqual(1);
    expect(files.some((f) => f.includes('luxury'))).toBe(true);
  });

  // multi-house는 별도 디렉토리
  it('finds mdx files in content/acquisition/multi-house', () => {
    const dir = path.join(process.cwd(), 'content', 'acquisition', 'multi-house');
    const files = getMdxFiles(dir);
    expect(files.length).toBeGreaterThanOrEqual(1);
    expect(files.some((f) => f.includes('multi-house'))).toBe(true);
  });

  it('returns empty array for non-existent directory', () => {
    const files = getMdxFiles('/nonexistent/path');
    expect(files).toEqual([]);
  });
});

describe('readMdxFile', () => {
  it('reads frontmatter from multi-house file', () => {
    const filePath = path.join(
      process.cwd(),
      'content',
      'acquisition',
      'multi-house',
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
  // multi-house는 multi-house/ 디렉토리에 위치
  it('finds multi-house file', () => {
    const file = findContentFile('acquisition', ['multi-house', 'multi-house']);
    expect(file).toBeTruthy();
    expect(file).toMatch(/multi-house-v1\.\d+\.mdx/);
  });

  // exemption 디렉토리에서 first-time-buyer 찾기
  it('finds first-time-buyer exemption file', () => {
    const file = findContentFile('acquisition', [
      'exemption',
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
