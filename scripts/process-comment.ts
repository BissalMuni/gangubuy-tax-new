/**
 * 단일 댓글을 처리하여 MDX 파일을 수정하는 스크립트
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import type { Comment, Attachment } from '../lib/types';
import { fetchAttachments, downloadAttachment } from './fetch-comments';

// pdf-parse는 선택적 의존성
let pdfParse: ((buffer: Buffer) => Promise<{ text: string }>) | null = null;
try {
  pdfParse = require('pdf-parse');
} catch {
  console.warn('[Process Comment] pdf-parse not installed. PDF content extraction disabled.');
}

const CONTENT_DIR = path.join(process.cwd(), 'content');
const GUIDELINES_PATH = path.join(CONTENT_DIR, 'MDX_GUIDELINES.md');

/**
 * content_path로부터 MDX 파일 경로를 찾습니다
 */
function resolveContentPath(contentPath: string): string | null {
  const dirPath = path.join(CONTENT_DIR, path.dirname(contentPath));
  const slug = path.basename(contentPath);

  if (!fs.existsSync(dirPath)) {
    return null;
  }

  const entries = fs.readdirSync(dirPath);
  const versionedFiles = entries
    .filter((f) => {
      const match = f.match(/^(.+)-v(\d+\.\d+)\.mdx$/);
      return match && match[1] === slug;
    })
    .sort()
    .reverse();

  if (versionedFiles.length === 0) {
    return null;
  }

  return path.join(dirPath, versionedFiles[0]);
}

/**
 * MDX_GUIDELINES.md 내용을 읽습니다
 */
function getGuidelinesContent(): string {
  if (!fs.existsSync(GUIDELINES_PATH)) {
    console.warn('[Process Comment] MDX_GUIDELINES.md not found');
    return '';
  }
  return fs.readFileSync(GUIDELINES_PATH, 'utf-8');
}

/**
 * 첨부파일에서 텍스트를 추출합니다
 */
async function extractAttachmentContent(attachments: Attachment[]): Promise<string> {
  const contents: string[] = [];

  for (const att of attachments) {
    console.log(`[Process Comment] Extracting content from: ${att.file_name}`);

    const buffer = await downloadAttachment(att.storage_path);
    if (!buffer) {
      contents.push(`[${att.file_name}] - 다운로드 실패`);
      continue;
    }

    // PDF 처리
    if (att.mime_type === 'application/pdf' && pdfParse) {
      try {
        const pdfData = await pdfParse(buffer);
        contents.push(`### ${att.file_name}\n${pdfData.text}`);
      } catch (err) {
        console.error(`[Process Comment] PDF parse error:`, err);
        contents.push(`[${att.file_name}] - PDF 파싱 실패`);
      }
    }
    // 이미지는 Claude Vision으로 처리 가능하나, 여기서는 참조만
    else if (att.mime_type.startsWith('image/')) {
      contents.push(`[이미지: ${att.file_name}] - ${att.download_url}`);
    }
    // 기타 파일
    else {
      contents.push(`[${att.file_name}] - 지원되지 않는 형식 (${att.mime_type})`);
    }
  }

  return contents.join('\n\n');
}

/**
 * MDX 수정을 위한 프롬프트를 생성합니다
 */
function buildPrompt(params: {
  mdxFilePath: string;
  mdxContent: string;
  comment: Comment;
  attachmentContent?: string;
}): string {
  const { mdxFilePath, mdxContent, comment, attachmentContent } = params;
  const guidelines = getGuidelinesContent();

  let prompt = `# MDX 파일 수정 요청

## 수정 원칙 (반드시 준수)
${guidelines}

---

## 대상 파일
${mdxFilePath}

## 댓글 내용
- 작성자: ${comment.author}
- 작성일: ${comment.created_at}
- 내용:
${comment.body}
`;

  if (attachmentContent) {
    prompt += `
## 첨부파일 내용
${attachmentContent}
`;
  }

  prompt += `
## 현재 MDX 파일 내용
\`\`\`mdx
${mdxContent}
\`\`\`

## 요청
위 댓글 내용을 참고하여 MDX 파일을 수정해주세요.

### 수정 규칙:
1. MDX_GUIDELINES.md의 모든 규칙을 반드시 준수
2. frontmatter의 last_updated를 오늘 날짜(${new Date().toISOString().split('T')[0]})로 갱신
3. 법령 링크는 https://law.go.kr/법령/{법령명}/{조문} 형식 사용
4. 표는 반드시 HTML 형식으로 작성
5. 색상 코드: 헤더 #f0f0f0, 강조 #e6f7ff, 테두리 #d9d9d9, 중과 #cf1322

### 주의:
- 수정이 필요 없는 내용이라면 그 이유를 설명하고 파일을 수정하지 마세요
- 댓글이 질문인 경우, 답변만 제공하고 파일은 수정하지 마세요
- 확실하지 않은 정보는 추가하지 마세요
`;

  return prompt;
}

export interface ProcessResult {
  success: boolean;
  mdxFilePath: string | null;
  prompt: string;
  attachmentContent?: string;
  error?: string;
}

/**
 * 댓글을 처리합니다 (프롬프트 생성까지만)
 */
export async function processComment(comment: Comment): Promise<ProcessResult> {
  console.log(`\n[Process Comment] Processing comment ${comment.id}`);
  console.log(`[Process Comment] Content path: ${comment.content_path}`);

  // 1. MDX 파일 찾기
  const mdxFilePath = resolveContentPath(comment.content_path);
  if (!mdxFilePath) {
    return {
      success: false,
      mdxFilePath: null,
      prompt: '',
      error: `MDX file not found for path: ${comment.content_path}`,
    };
  }

  console.log(`[Process Comment] MDX file: ${mdxFilePath}`);

  // 2. MDX 파일 읽기
  const mdxContent = fs.readFileSync(mdxFilePath, 'utf-8');

  // 3. 첨부파일 처리
  const attachments = await fetchAttachments(comment.content_path);
  let attachmentContent: string | undefined;

  if (attachments.length > 0) {
    console.log(`[Process Comment] Found ${attachments.length} attachments`);
    attachmentContent = await extractAttachmentContent(attachments);
  }

  // 4. 프롬프트 생성
  const prompt = buildPrompt({
    mdxFilePath,
    mdxContent,
    comment,
    attachmentContent,
  });

  return {
    success: true,
    mdxFilePath,
    prompt,
    attachmentContent,
  };
}

// CLI 직접 실행 시
if (require.main === module) {
  const commentId = process.argv[2];
  if (!commentId) {
    console.log('Usage: npx ts-node scripts/process-comment.ts <comment_id>');
    console.log('\nThis script generates the prompt for Claude Code.');
    console.log('Use run-pipeline.ts to actually process comments.');
    process.exit(1);
  }

  // 테스트용 - 실제로는 Supabase에서 조회해야 함
  console.log(`Would process comment: ${commentId}`);
  console.log('Run fetch-comments.ts first to get comment IDs.');
}
