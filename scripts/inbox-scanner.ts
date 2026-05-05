/**
 * Inbox 폴더 스캐너
 *
 * inbox/content/  - 새 TSX 파일 (그대로 복사)
 * inbox/pdfs/     - PDF 파일 → Claude가 TSX로 변환
 * inbox/prompts/  - 수정 요청 마크다운 파일
 * inbox/processed/ - 처리 완료된 파일 (자동 이동)
 */

import fs from 'fs';
import path from 'path';

const INBOX_DIR = path.join(process.cwd(), 'inbox');
const CONTENT_INBOX = path.join(INBOX_DIR, 'content');
const PDFS_INBOX = path.join(INBOX_DIR, 'pdfs');
const PROMPTS_INBOX = path.join(INBOX_DIR, 'prompts');
const PROCESSED_DIR = path.join(INBOX_DIR, 'processed');
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export type WorkItemType = 'new-content' | 'pdf-to-mdx' | 'prompt';

export interface NewContentWorkItem {
  type: 'new-content';
  /** inbox 내 소스 경로 */
  sourcePath: string;
  /** src/content/ 내 대상 경로 */
  targetPath: string;
  /** content_path (예: acquisition/multi-house/multi-house) */
  contentPath: string;
}

/**
 * PDF 파일 변환 WorkItem
 *
 * PDF 파일명 형식: {category}-{slug}.pdf
 * 예: acquisition-multi-house.pdf → src/content/acquisition/multi-house/multi-house-v1.0.tsx 생성
 *
 * 또는 파일명 옆에 동명의 .md 파일로 메타정보 제공:
 * acquisition-multi-house.pdf
 * acquisition-multi-house.md  (선택 — TARGET, 버전, 추가 지시사항)
 */
export interface PdfWorkItem {
  type: 'pdf-to-mdx';
  /** inbox/pdfs 내 PDF 파일 경로 */
  pdfPath: string;
  /** 파일명에서 파싱한 카테고리 (예: acquisition) */
  category: string;
  /** 파일명에서 파싱한 슬러그 (예: multi-house) */
  slug: string;
  /** 메타 .md 파일 내용 (있으면) */
  metaContent?: string;
}

export interface PromptWorkItem {
  type: 'prompt';
  /** inbox/prompts 내 파일 경로 */
  promptFilePath: string;
  /** 수정 대상 content_path */
  targetContentPath: string;
  /** 프롬프트 본문 */
  promptBody: string;
}

export type WorkItem = NewContentWorkItem | PdfWorkItem | PromptWorkItem;

/**
 * inbox/content/ 폴더의 MDX 파일을 스캔합니다
 */
function scanContentInbox(): NewContentWorkItem[] {
  if (!fs.existsSync(CONTENT_INBOX)) return [];

  const items: NewContentWorkItem[] = [];

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.tsx') && entry.name !== '.gitkeep') {
        const relativeToCR = path.relative(CONTENT_INBOX, fullPath);
        const targetPath = path.join(CONTENT_DIR, relativeToCR);

        // content_path 추출 (파일명에서 버전 제거)
        const match = entry.name.match(/^(.+)-v\d+\.\d+\.tsx$/);
        const slug = match ? match[1] : entry.name.replace('.tsx', '');
        const dir2 = path.dirname(relativeToCR);
        const contentPath = path.join(dir2, slug).replace(/\\/g, '/');

        items.push({ type: 'new-content', sourcePath: fullPath, targetPath, contentPath });
      }
    }
  }

  scanDir(CONTENT_INBOX);
  return items;
}

/**
 * inbox/pdfs/ 폴더의 PDF 파일을 스캔합니다
 *
 * 파일명 형식: {category}-{slug}.pdf
 * 선택: 동명의 .md 파일로 추가 지시사항 제공
 *
 * 예:
 *   acquisition-multi-house.pdf
 *   acquisition-multi-house.md   ← 선택 (버전 정보, 특별 지시사항)
 */
function scanPdfsInbox(): PdfWorkItem[] {
  if (!fs.existsSync(PDFS_INBOX)) return [];

  const files = fs.readdirSync(PDFS_INBOX);
  const pdfFiles = files.filter((f) => f.endsWith('.pdf') && f !== '.gitkeep');

  const items: PdfWorkItem[] = [];

  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(PDFS_INBOX, pdfFile);
    const baseName = pdfFile.replace('.pdf', '');

    // 파일명 파싱: {category}-{slug}.pdf
    // category는 첫 번째 세그먼트, 나머지가 slug
    const dashIdx = baseName.indexOf('-');
    if (dashIdx < 0) {
      console.warn(`[Inbox Scanner] PDF 파일명 형식 오류 (category-slug.pdf 필요): ${pdfFile}`);
      continue;
    }

    const category = baseName.slice(0, dashIdx);
    const slug = baseName.slice(dashIdx + 1);

    // 동명 .md 파일 확인 (추가 지시사항)
    const metaPath = path.join(PDFS_INBOX, `${baseName}.md`);
    const metaContent = fs.existsSync(metaPath)
      ? fs.readFileSync(metaPath, 'utf-8')
      : undefined;

    items.push({ type: 'pdf-to-mdx', pdfPath, category, slug, metaContent });
  }

  return items;
}

/**
 * inbox/prompts/ 폴더의 프롬프트 파일을 스캔합니다
 *
 * 파일 형식:
 * ```
 * TARGET: acquisition/multi-house/multi-house
 * ---
 * 수정 요청 내용...
 * ```
 */
function scanPromptsInbox(): PromptWorkItem[] {
  if (!fs.existsSync(PROMPTS_INBOX)) return [];

  const items: PromptWorkItem[] = [];

  const files = fs.readdirSync(PROMPTS_INBOX).filter(
    (f) => (f.endsWith('.txt') || f.endsWith('.md')) && f !== '.gitkeep',
  );

  for (const file of files) {
    const filePath = path.join(PROMPTS_INBOX, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // TARGET: 헤더 파싱
    const targetMatch = content.match(/^TARGET:\s*(.+?)(\r?\n)/m);
    if (!targetMatch) {
      console.warn(`[Inbox Scanner] 프롬프트 파일 형식 오류 (TARGET 없음): ${file}`);
      continue;
    }

    const targetContentPath = targetMatch[1].trim();

    // --- 구분선 이후가 프롬프트 본문
    const separatorIndex = content.indexOf('\n---\n');
    const promptBody =
      separatorIndex >= 0 ? content.slice(separatorIndex + 5).trim() : content;

    if (!promptBody) {
      console.warn(`[Inbox Scanner] 프롬프트 본문이 비어있음: ${file}`);
      continue;
    }

    items.push({ type: 'prompt', promptFilePath: filePath, targetContentPath, promptBody });
  }

  return items;
}

/**
 * 처리 완료된 파일을 processed/ 폴더로 이동합니다
 */
export function moveToProcessed(filePath: string): void {
  if (!fs.existsSync(PROCESSED_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const basename = path.basename(filePath);
  const destName = `${timestamp}-${basename}`;
  const destPath = path.join(PROCESSED_DIR, destName);

  fs.renameSync(filePath, destPath);
  console.log(`[Inbox Scanner] 이동 완료: ${basename} → processed/${destName}`);
}

/**
 * 새 콘텐츠 파일을 content/ 디렉토리로 복사합니다
 */
export function copyContentToTarget(item: NewContentWorkItem): void {
  const targetDir = path.dirname(item.targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(item.sourcePath, item.targetPath);
  console.log(
    `[Inbox Scanner] 복사 완료: ${path.basename(item.sourcePath)} → ${path.relative(process.cwd(), item.targetPath)}`,
  );
}

/**
 * inbox 전체를 스캔하여 WorkItem 목록을 반환합니다
 */
export function scanInbox(): WorkItem[] {
  const contentItems = scanContentInbox();
  const pdfItems = scanPdfsInbox();
  const promptItems = scanPromptsInbox();

  const total = contentItems.length + pdfItems.length + promptItems.length;
  console.log(
    `[Inbox Scanner] 스캔 완료: 새 콘텐츠 ${contentItems.length}개, PDF ${pdfItems.length}개, 프롬프트 ${promptItems.length}개 (합계 ${total}개)`,
  );

  return [...contentItems, ...pdfItems, ...promptItems];
}

// CLI 직접 실행 시
if (require.main === module) {
  console.log('Inbox 스캔 중...\n');

  const items = scanInbox();

  if (items.length === 0) {
    console.log('처리할 항목이 없습니다.');
    process.exit(0);
  }

  console.log('\n--- 발견된 항목 ---');
  for (const item of items) {
    if (item.type === 'new-content') {
      console.log(`[새 콘텐츠] ${item.contentPath}`);
      console.log(`  소스: ${item.sourcePath}`);
      console.log(`  대상: ${item.targetPath}`);
    } else if (item.type === 'pdf-to-mdx') {
      console.log(`[PDF 변환] ${item.category}/${item.slug}`);
      console.log(`  PDF: ${item.pdfPath}`);
      console.log(`  메타: ${item.metaContent ? '있음' : '없음'}`);
    } else {
      console.log(`[프롬프트] ${item.targetContentPath}`);
      console.log(`  파일: ${item.promptFilePath}`);
      console.log(`  내용: ${item.promptBody.substring(0, 80)}...`);
    }
  }
}
