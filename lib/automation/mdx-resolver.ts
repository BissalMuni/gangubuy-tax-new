/**
 * MDX 파일 경로 해석 모듈
 * content_path → 실제 파일 경로 변환
 */

import fs from 'fs';
import path from 'path';
import { parseFilename } from '@/lib/content/loader';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * content_path로부터 MDX 파일 경로를 찾습니다
 * @param contentPath - 예: "acquisition/themes/multi-house"
 * @returns 파일 경로 또는 null
 */
export function resolveContentPath(contentPath: string): string | null {
  // content_path: "acquisition/themes/multi-house"
  // 실제 파일: "content/acquisition/themes/multi-house-v1.0.mdx"

  const dirPath = path.join(CONTENT_DIR, path.dirname(contentPath));
  const slug = path.basename(contentPath);

  if (!fs.existsSync(dirPath)) {
    return null;
  }

  const entries = fs.readdirSync(dirPath);

  // 해당 slug의 최신 버전 파일 찾기
  const versionedFiles = entries
    .filter((f) => {
      const parsed = parseFilename(f);
      return parsed && parsed.slug === slug;
    })
    .sort()
    .reverse();

  if (versionedFiles.length === 0) {
    return null;
  }

  return path.join(dirPath, versionedFiles[0]);
}

/**
 * MDX 파일 경로에서 content_path를 추출합니다
 * @param filePath - 예: "content/acquisition/themes/multi-house-v1.0.mdx"
 * @returns content_path - 예: "acquisition/themes/multi-house"
 */
export function extractContentPath(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  const parsed = parseFilename(path.basename(relative));
  if (!parsed) return relative.replace(/\.mdx$/, '');
  const dir = path.dirname(relative);
  return path.join(dir, parsed.slug).replace(/\\/g, '/');
}

/**
 * MDX 파일 내용을 읽습니다
 */
export function readMdxContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * MDX 파일 내용을 씁니다
 */
export function writeMdxContent(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * 모든 content_path 목록을 가져옵니다
 */
export function getAllContentPaths(): string[] {
  const paths: string[] = [];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        paths.push(extractContentPath(fullPath));
      }
    }
  }

  scanDir(CONTENT_DIR);
  return [...new Set(paths)]; // 중복 제거 (여러 버전)
}
