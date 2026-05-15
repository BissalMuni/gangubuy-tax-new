/**
 * 통합 자동화 파이프라인 오케스트레이터
 *
 * 두 가지 소스를 처리합니다:
 * 1. Supabase 댓글 (기존 run-pipeline.ts 기능)
 * 2. inbox/ 폴더 (새 파일 및 프롬프트 요청)
 *
 * 사용법:
 *   npx tsx scripts/orchestrator.ts [options]
 *
 * 옵션:
 *   --dry-run         실제 수정 없이 미리보기
 *   --inbox-only      inbox만 처리 (Supabase 건너뜀)
 *   --comments-only   Supabase 댓글만 처리 (inbox 건너뜀)
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fetchUnprocessedComments, fetchAttachments, downloadAttachment, markCommentProcessed } from './fetch-comments';
import { commitAndPush, getModifiedMdxFiles } from './auto-commit';
import { scanInbox, copyContentToTarget, moveToProcessed } from './inbox-scanner';
import type { WorkItem } from './inbox-scanner';
import { runClaude, buildMdxEditPrompt, buildPdfToMdxPrompt } from '../lib/automation/claude-runner';
import { resolveContentPath } from '../lib/automation/mdx-resolver';
import type { Comment, Attachment } from '../lib/types';

// CLI 인자 파싱
const DRY_RUN = process.argv.includes('--dry-run');
const INBOX_ONLY = process.argv.includes('--inbox-only');
const COMMENTS_ONLY = process.argv.includes('--comments-only');

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

// pdf-parse 선택적 로드
let pdfParse: ((buffer: Buffer) => Promise<{ text: string }>) | null = null;
try {
  pdfParse = require('pdf-parse');
} catch {
  // PDF 추출 비활성화
}

// ============================================================
// 유틸리티
// ============================================================

function sep(char = '-', len = 60) {
  return char.repeat(len);
}

function log(msg: string) {
  console.log(msg);
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
    } else if (att.mime_type === 'text/plain' || att.mime_type === 'text/markdown') {
      // 텍스트/마크다운 파일 내용 추출
      try {
        const textContent = buffer.toString('utf-8');
        contents.push(`### ${att.file_name}\n${textContent}`);
      } catch {
        contents.push(`[${att.file_name}] - 텍스트 변환 실패`);
      }
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

// ============================================================
// Supabase 댓글 처리
// ============================================================

async function processComments(): Promise<{ processed: number; errors: number }> {
  log('\n[소스 1] Supabase 댓글 처리');
  log(sep());

  let allComments;
  try {
    allComments = await fetchUnprocessedComments();
  } catch (err) {
    log(`  [스킵] Supabase 연결 불가: ${err instanceof Error ? err.message : String(err)}`);
    return { processed: 0, errors: 0 };
  }

  if (allComments.length === 0) {
    log('처리할 댓글이 없습니다.');
    return { processed: 0, errors: 0 };
  }

  const groups = groupCommentsByPath(allComments);
  log(`${allComments.length}개 댓글 → ${groups.size}개 MDX 파일\n`);

  let processed = 0;
  let errors = 0;

  for (const [contentPath, comments] of groups) {
    log(sep('-'));
    log(`[MDX] ${contentPath} (댓글 ${comments.length}개)`);

    // MDX 파일 경로 확인
    const mdxFilePath = resolveContentPath(contentPath);
    if (!mdxFilePath) {
      log(`  [오류] MDX 파일 없음: ${contentPath}`);
      errors += comments.length;
      continue;
    }

    const mdxContent = fs.readFileSync(mdxFilePath, 'utf-8');

    // 첨부파일 처리
    const attachments = await fetchAttachments(contentPath);
    let attachmentContent = '';
    if (attachments.length > 0) {
      log(`  첨부파일 ${attachments.length}개 처리 중...`);
      attachmentContent = await extractAttachmentContent(attachments);
    }

    // 요청 목록 구성
    const requests = comments.map((c) => ({
      label: `${c.author} (${c.created_at})`,
      body: c.body,
    }));

    if (attachmentContent) {
      requests.push({ label: '첨부파일', body: attachmentContent });
    }

    // 프롬프트 생성
    const prompt = buildMdxEditPrompt({
      mdxFilePath,
      mdxContent,
      requests,
    });

    if (DRY_RUN) {
      log('[Dry Run] 프롬프트 미리보기:');
      log(prompt.substring(0, 600) + '\n...(truncated)');
      continue;
    }

    // Claude 실행
    const result = await runClaude({ prompt });

    if (!result.success) {
      log(`  [오류] Claude 실행 실패: ${result.error}`);
      errors += comments.length;
      continue;
    }

    // 변경사항 확인 및 커밋
    const modifiedFiles = getModifiedMdxFiles();
    const commentIds = comments.map((c) => c.id.substring(0, 8)).join(', ');

    if (modifiedFiles.length > 0) {
      log(`  변경된 파일: ${modifiedFiles.join(', ')}`);
      const commitResult = commitAndPush(
        { ...comments[0], body: `${comments.length}개 댓글 반영 (${commentIds})` },
        mdxFilePath,
      );

      if (commitResult.success) {
        for (const comment of comments) {
          await markCommentProcessed(comment.id, commitResult.commitSha);
        }
        processed += comments.length;
        log(`  [완료] 커밋: ${commitResult.commitSha?.substring(0, 7)}`);
      } else {
        log(`  [오류] 커밋 실패: ${commitResult.error}`);
        errors += comments.length;
      }
    } else {
      // 변경 없음 → 댓글만 처리 완료 표시
      for (const comment of comments) {
        await markCommentProcessed(comment.id);
      }
      processed += comments.length;
      log('  [완료] 변경 없음 (댓글 처리 완료 표시)');
    }
  }

  return { processed, errors };
}

// ============================================================
// Inbox 처리
// ============================================================

async function processInbox(): Promise<{ processed: number; errors: number }> {
  log('\n[소스 2] Inbox 폴더 처리');
  log(sep());

  const workItems = scanInbox();

  if (workItems.length === 0) {
    log('처리할 inbox 항목이 없습니다.');
    return { processed: 0, errors: 0 };
  }

  let processed = 0;
  let errors = 0;

  for (const item of workItems) {
    log(sep('-'));

    if (item.type === 'new-content') {
      await processNewContent(item);
      processed++;
    } else if (item.type === 'pdf-to-mdx') {
      const ok = await processPdfToMdx(item);
      if (ok) processed++;
      else errors++;
    } else {
      const ok = await processPromptItem(item);
      if (ok) processed++;
      else errors++;
    }
  }

  return { processed, errors };
}

/**
 * 새 콘텐츠 파일 처리 (inbox/content/ → content/)
 */
async function processNewContent(
  item: WorkItem & { type: 'new-content' },
): Promise<void> {
  log(`[새 콘텐츠] ${item.contentPath}`);
  log(`  소스: ${path.relative(process.cwd(), item.sourcePath)}`);
  log(`  대상: ${path.relative(process.cwd(), item.targetPath)}`);

  if (DRY_RUN) {
    log('[Dry Run] 복사 건너뜀');
    return;
  }

  // 파일 복사
  copyContentToTarget(item);

  // Git 커밋 + 푸시
  const dummyComment: Comment = {
    id: `inbox-${Date.now()}`,
    content_path: item.contentPath,
    author: 'inbox',
    body: `새 콘텐츠: ${path.basename(item.sourcePath)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const commitResult = commitAndPush(dummyComment, item.targetPath);

  if (commitResult.success) {
    log(`  [완료] 커밋: ${commitResult.commitSha?.substring(0, 7)}`);
    // inbox 원본 이동
    moveToProcessed(item.sourcePath);
  } else {
    log(`  [오류] 커밋 실패: ${commitResult.error}`);
  }
}

/**
 * PDF 파일 처리 (inbox/pdfs/ → Claude가 MDX로 변환 → content/)
 */
async function processPdfToMdx(
  item: WorkItem & { type: 'pdf-to-mdx' },
): Promise<boolean> {
  log(`[PDF 변환] ${item.category}/${item.slug}`);
  log(`  PDF: ${path.relative(process.cwd(), item.pdfPath)}`);

  // PDF 텍스트 추출
  let pdfText = '';
  try {
    // pdf-parse는 선택적 의존성
    const pdfParse = require('pdf-parse');
    const buffer = fs.readFileSync(item.pdfPath);
    const pdfData = await pdfParse(buffer);
    pdfText = pdfData.text;
    log(`  PDF 텍스트 추출: ${pdfText.length}자`);
  } catch (err) {
    log(`  [오류] PDF 파싱 실패: ${err instanceof Error ? err.message : String(err)}`);
    log('  pdf-parse 미설치 시: pnpm add pdf-parse');
    return false;
  }

  if (!pdfText.trim()) {
    log('  [오류] PDF에서 텍스트를 추출할 수 없음 (스캔 이미지 PDF는 불가)');
    return false;
  }

  // 대상 MDX 파일 경로 결정
  const targetDir = path.join(process.cwd(), 'src', 'content', item.category, item.slug);
  const targetFilePath = path.join(targetDir, `${item.slug}-v1.0.tsx`);

  if (fs.existsSync(targetFilePath)) {
    log(`  [경고] 파일이 이미 존재합니다: ${path.relative(process.cwd(), targetFilePath)}`);
    log('  덮어쓰려면 inbox/prompts/에 수정 요청을 넣으세요.');
    return false;
  }

  // 프롬프트 생성
  const prompt = buildPdfToMdxPrompt({
    pdfText,
    targetFilePath,
    category: item.category,
    slug: item.slug,
    extraInstructions: item.metaContent,
  });

  if (DRY_RUN) {
    log('[Dry Run] 프롬프트 미리보기:');
    log(prompt.substring(0, 600) + '\n...(truncated)');
    return true;
  }

  // Claude 실행 (파일 생성)
  const result = await runClaude({ prompt });

  if (!result.success) {
    log(`  [오류] Claude 실행 실패: ${result.error}`);
    return false;
  }

  // 생성된 파일 확인
  if (!fs.existsSync(targetFilePath)) {
    log(`  [오류] MDX 파일이 생성되지 않음: ${targetFilePath}`);
    return false;
  }

  // Git 커밋 + 푸시
  const dummyComment: Comment = {
    id: `pdf-${Date.now()}`,
    content_path: `${item.category}/${item.slug}/${item.slug}`,
    author: 'pdf-import',
    body: `PDF 변환: ${path.basename(item.pdfPath)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const commitResult = commitAndPush(dummyComment, targetFilePath);

  if (commitResult.success) {
    log(`  [완료] 커밋: ${commitResult.commitSha?.substring(0, 7)}`);
    // inbox PDF 이동
    moveToProcessed(item.pdfPath);
    // 메타 .md 파일도 이동
    const metaPath = item.pdfPath.replace('.pdf', '.md');
    if (fs.existsSync(metaPath)) moveToProcessed(metaPath);
    return true;
  } else {
    log(`  [오류] 커밋 실패: ${commitResult.error}`);
    return false;
  }
}

/**
 * 프롬프트 파일 처리 (inbox/prompts/ → Claude 실행 → MDX 수정)
 */
async function processPromptItem(
  item: WorkItem & { type: 'prompt' },
): Promise<boolean> {
  log(`[프롬프트] ${item.targetContentPath}`);
  log(`  파일: ${path.relative(process.cwd(), item.promptFilePath)}`);

  // MDX 파일 경로 확인
  const mdxFilePath = resolveContentPath(item.targetContentPath);
  if (!mdxFilePath) {
    log(`  [오류] MDX 파일 없음: ${item.targetContentPath}`);
    return false;
  }

  const mdxContent = fs.readFileSync(mdxFilePath, 'utf-8');

  const prompt = buildMdxEditPrompt({
    mdxFilePath,
    mdxContent,
    requests: [{ label: path.basename(item.promptFilePath), body: item.promptBody }],
  });

  if (DRY_RUN) {
    log('[Dry Run] 프롬프트 미리보기:');
    log(prompt.substring(0, 600) + '\n...(truncated)');
    return true;
  }

  // Claude 실행
  const result = await runClaude({ prompt });

  if (!result.success) {
    log(`  [오류] Claude 실행 실패: ${result.error}`);
    return false;
  }

  // 변경사항 확인 및 커밋
  const modifiedFiles = getModifiedMdxFiles();

  if (modifiedFiles.length > 0) {
    log(`  변경된 파일: ${modifiedFiles.join(', ')}`);

    const dummyComment: Comment = {
      id: `inbox-prompt-${Date.now()}`,
      content_path: item.targetContentPath,
      author: 'inbox-prompt',
      body: item.promptBody.substring(0, 100),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const commitResult = commitAndPush(dummyComment, mdxFilePath);

    if (commitResult.success) {
      log(`  [완료] 커밋: ${commitResult.commitSha?.substring(0, 7)}`);
      moveToProcessed(item.promptFilePath);
      return true;
    } else {
      log(`  [오류] 커밋 실패: ${commitResult.error}`);
      return false;
    }
  } else {
    log('  [완료] 변경 없음');
    moveToProcessed(item.promptFilePath);
    return true;
  }
}

// ============================================================
// 메인
// ============================================================

async function main() {
  log(sep('='));
  log('통합 자동화 파이프라인');
  log(sep('='));
  log(`모드: ${DRY_RUN ? 'DRY RUN' : '실행'} | Claude: ${CLAUDE_MODE}`);
  if (INBOX_ONLY) log('범위: inbox만');
  if (COMMENTS_ONLY) log('범위: Supabase 댓글만');

  let totalProcessed = 0;
  let totalErrors = 0;

  // Supabase 댓글 처리
  if (!INBOX_ONLY) {
    const { processed, errors } = await processComments();
    totalProcessed += processed;
    totalErrors += errors;
  }

  // Inbox 처리
  if (!COMMENTS_ONLY) {
    const { processed, errors } = await processInbox();
    totalProcessed += processed;
    totalErrors += errors;
  }

  // 결과 요약
  log('\n' + sep('='));
  log('파이프라인 완료');
  log(sep('='));
  log(`처리 완료: ${totalProcessed}건`);
  log(`실패: ${totalErrors}건`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
