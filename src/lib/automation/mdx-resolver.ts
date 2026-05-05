/**
 * 콘텐츠 파일 경로 해석 모듈
 * content_path → 실제 파일 경로 변환
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

/**
 * content_path로부터 TSX 파일 경로를 찾습니다
 * @param contentPath - 예: "acquisition/themes/multi-house"
 * @returns 파일 경로 또는 null
 */
export function resolveContentPath(contentPath: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${contentPath}.tsx`);
  if (!fs.existsSync(filePath)) return null;
  return filePath;
}

/**
 * TSX 파일 경로에서 content_path를 추출합니다
 * @param filePath - 예: "src/content/acquisition/themes/multi-house.tsx"
 * @returns content_path - 예: "acquisition/themes/multi-house"
 */
export function extractContentPath(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  return relative.replace(/\.tsx$/, '').replace(/\\/g, '/');
}

/**
 * 콘텐츠 파일 내용을 읽습니다
 */
export function readMdxContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * 콘텐츠 파일 내용을 씁니다
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
      } else if (entry.name.endsWith('.tsx')) {
        paths.push(extractContentPath(fullPath));
      }
    }
  }

  scanDir(CONTENT_DIR);
  return paths;
}
