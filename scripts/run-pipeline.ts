/**
 * 댓글 기반 MDX 자동 수정 파이프라인
 *
 * 사용법:
 *   npx tsx scripts/run-pipeline.ts [--dry-run]
 *
 * 옵션:
 *   --dry-run  실제 수정 없이 프롬프트만 출력
 *
 * 처리 방식:
 *   - 같은 MDX 파일의 댓글은 하나로 묶어서 처리
 *   - 여러 MDX 파일은 순차적으로 처리
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fetchUnprocessedComments, fetchAttachments, downloadAttachment, markCommentProcessed } from './fetch-comments';
import { commitAndPush, getModifiedMdxFiles } from './auto-commit';
import type { Comment, Attachment } from '../lib/types';

const DRY_RUN = process.argv.includes('--dry-run');
const CONTENT_DIR = path.join(process.cwd(), 'content');
const GUIDELINES_PATH = path.join(CONTENT_DIR, 'MDX_GUIDELINES.md');

// pdf-parse 선택적 로드
let pdfParse: ((buffer: Buffer) => Promise<{ text: string }>) | null = null;
try {
  pdfParse = require('pdf-parse');
} catch {
  console.warn('[Pipeline] pdf-parse not installed. PDF extraction disabled.');
}

/**
 * content_path로부터 MDX 파일 경로를 찾습니다
 */
function resolveContentPath(contentPath: string): string | null {
  const dirPath = path.join(CONTENT_DIR, path.dirname(contentPath));
  const slug = path.basename(contentPath);

  if (!fs.existsSync(dirPath)) return null;

  const entries = fs.readdirSync(dirPath);
  const versionedFiles = entries
    .filter((f) => {
      const match = f.match(/^(.+)-v(\d+\.\d+)\.mdx$/);
      return match && match[1] === slug;
    })
    .sort()
    .reverse();

  if (versionedFiles.length === 0) return null;
  return path.join(dirPath, versionedFiles[0]);
}

/**
 * MDX_GUIDELINES.md 내용을 읽습니다
 */
function getGuidelinesContent(): string {
  if (!fs.existsSync(GUIDELINES_PATH)) return '';
  return fs.readFileSync(GUIDELINES_PATH, 'utf-8');
}

/**
 * 첨부파일에서 텍스트를 추출합니다
 */
async function extractAttachmentContent(attachments: Attachment[]): Promise<string> {
  const contents: string[] = [];

  for (const att of attachments) {
    const buffer = await downloadAttachment(att.storage_path);
    if (!buffer) {
      contents.push(`[${att.file_name}] - 다운로드 실패`);
      continue;
    }

    if (att.mime_type === 'application/pdf' && pdfParse) {
      try {
        const pdfData = await pdfParse(buffer);
        contents.push(`### ${att.file_name}\n${pdfData.text}`);
      } catch {
        contents.push(`[${att.file_name}] - PDF 파싱 실패`);
      }
    } else if (att.mime_type.startsWith('image/')) {
      contents.push(`[이미지: ${att.file_name}] - ${att.download_url}`);
    } else {
      contents.push(`[${att.file_name}] - 지원되지 않는 형식`);
    }
  }

  return contents.join('\n\n');
}

/**
 * 댓글들을 content_path별로 그룹화합니다
 */
function groupCommentsByPath(comments: Comment[]): Map<string, Comment[]> {
  const groups = new Map<string, Comment[]>();

  for (const comment of comments) {
    const existing = groups.get(comment.content_path) || [];
    existing.push(comment);
    groups.set(comment.content_path, existing);
  }

  return groups;
}

/**
 * 여러 댓글을 하나의 프롬프트로 합칩니다
 */
async function buildCombinedPrompt(
  contentPath: string,
  comments: Comment[],
  mdxFilePath: string,
  mdxContent: string,
): Promise<string> {
  const guidelines = getGuidelinesContent();

  // 댓글 내용 합치기
  const commentsSection = comments
    .map((c, i) => `### 댓글 ${i + 1} (작성자: ${c.author}, ${c.created_at})
${c.body}`)
    .join('\n\n');

  // 첨부파일 처리
  const attachments = await fetchAttachments(contentPath);
  let attachmentSection = '';
  if (attachments.length > 0) {
    console.log(`  첨부파일 ${attachments.length}개 발견`);
    attachmentSection = `
## 첨부파일 내용
${await extractAttachmentContent(attachments)}
`;
  }

  return `# MDX 파일 수정 요청

## 수정 원칙 (반드시 준수)
${guidelines}

---

## 대상 파일
${mdxFilePath}

## 수정 요청 댓글 (총 ${comments.length}개)

${commentsSection}
${attachmentSection}

## 현재 MDX 파일 내용
\`\`\`mdx
${mdxContent}
\`\`\`

## 요청
위 ${comments.length}개 댓글의 내용을 **모두** 반영하여 MDX 파일을 수정해주세요.

### 수정 규칙:
1. MDX_GUIDELINES.md의 모든 규칙을 반드시 준수
2. frontmatter의 last_updated를 오늘 날짜(${new Date().toISOString().split('T')[0]})로 갱신
3. 법령 링크는 https://law.go.kr/법령/{법령명}/{조문} 형식 사용
4. 표는 반드시 HTML 형식으로 작성
5. 색상 코드: 헤더 #f0f0f0, 강조 #e6f7ff, 테두리 #d9d9d9, 중과 #cf1322

### 주의:
- 모든 댓글의 요청을 검토하고 적절히 반영하세요
- 충돌되는 요청이 있으면 최신 댓글을 우선하세요
- 수정이 필요 없는 댓글은 무시하고 필요한 것만 반영하세요
- 확실하지 않은 정보는 추가하지 마세요
`;
}

/**
 * Claude Code CLI를 실행합니다
 */
async function runClaude(prompt: string): Promise<{ success: boolean; output: string }> {
  return new Promise((resolve) => {
    console.log('[Pipeline] Running Claude Code...');

    const proc = spawn('claude', ['-p', prompt], {
      cwd: process.cwd(),
      shell: true,
      timeout: 600000, // 10분
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      process.stdout.write(text);
    });

    proc.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      resolve({
        success: code === 0,
        output: stdout || stderr,
      });
    });

    proc.on('error', (err) => {
      resolve({
        success: false,
        output: err.message,
      });
    });
  });
}

/**
 * 메인 파이프라인
 */
async function main() {
  console.log('='.repeat(60));
  console.log('MDX 자동 수정 파이프라인');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('[Mode] DRY RUN - 실제 수정 없음\n');
  }

  // 1. 처리되지 않은 댓글 조회
  console.log('\n[Step 1] 처리되지 않은 댓글 조회...');
  const allComments = await fetchUnprocessedComments();

  if (allComments.length === 0) {
    console.log('처리할 댓글이 없습니다.');
    return;
  }

  // 2. content_path별로 그룹화
  const groups = groupCommentsByPath(allComments);
  console.log(`${allComments.length}개 댓글 → ${groups.size}개 MDX 파일\n`);

  // 3. 각 MDX 파일별로 처리 (순차)
  let processedMdxCount = 0;
  let processedCommentCount = 0;
  let errorCount = 0;

  for (const [contentPath, comments] of groups) {
    console.log('-'.repeat(60));
    console.log(`[MDX] ${contentPath}`);
    console.log(`  댓글 수: ${comments.length}개`);
    comments.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.author}: ${c.body.substring(0, 40)}...`);
    });

    // 3a. MDX 파일 경로 확인
    const mdxFilePath = resolveContentPath(contentPath);
    if (!mdxFilePath) {
      console.error(`  [Error] MDX 파일을 찾을 수 없음: ${contentPath}`);
      errorCount += comments.length;
      continue;
    }

    // 3b. MDX 파일 읽기
    const mdxContent = fs.readFileSync(mdxFilePath, 'utf-8');

    // 3c. 통합 프롬프트 생성
    const prompt = await buildCombinedPrompt(contentPath, comments, mdxFilePath, mdxContent);

    if (DRY_RUN) {
      console.log('\n[Dry Run] 생성된 프롬프트 미리보기:');
      console.log('-'.repeat(40));
      console.log(prompt.substring(0, 800) + '\n...(truncated)');
      console.log('-'.repeat(40));
      continue;
    }

    // 3d. Claude Code 실행
    console.log('\n[Claude Code 실행 중...]');
    const claudeResult = await runClaude(prompt);

    if (!claudeResult.success) {
      console.error('[Error] Claude Code 실행 실패');
      errorCount += comments.length;
      continue;
    }

    // 3e. 변경사항 확인
    const modifiedFiles = getModifiedMdxFiles();
    if (modifiedFiles.length === 0) {
      console.log('[Info] 변경된 파일 없음');
      // 모든 댓글 처리 완료 표시
      for (const comment of comments) {
        await markCommentProcessed(comment.id);
      }
      processedCommentCount += comments.length;
      processedMdxCount++;
      continue;
    }

    // 3f. Git 커밋 및 푸시
    console.log(`[Git] 변경된 파일: ${modifiedFiles.join(', ')}`);

    // 커밋 메시지에 모든 댓글 ID 포함
    const commentIds = comments.map((c) => c.id.substring(0, 8)).join(', ');
    const commitResult = commitAndPush(
      { ...comments[0], body: `${comments.length}개 댓글 반영 (${commentIds})` },
      mdxFilePath,
    );

    if (commitResult.success) {
      // 모든 댓글 처리 완료 표시
      for (const comment of comments) {
        await markCommentProcessed(comment.id, commitResult.commitSha);
      }
      processedCommentCount += comments.length;
      processedMdxCount++;
      console.log(`[Success] 커밋 완료: ${commitResult.commitSha?.substring(0, 7)}`);
    } else {
      console.error(`[Error] 커밋 실패: ${commitResult.error}`);
      errorCount += comments.length;
    }
  }

  // 4. 결과 요약
  console.log('\n' + '='.repeat(60));
  console.log('처리 완료');
  console.log('='.repeat(60));
  console.log(`총 MDX 파일: ${groups.size}`);
  console.log(`처리된 MDX: ${processedMdxCount}`);
  console.log(`총 댓글: ${allComments.length}`);
  console.log(`처리된 댓글: ${processedCommentCount}`);
  console.log(`실패: ${errorCount}`);
}

// 실행
main().catch((err) => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
