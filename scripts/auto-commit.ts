/**
 * Git 자동 커밋 및 푸시 스크립트
 */

import { execSync } from 'child_process';
import type { Comment } from '../lib/types';

export interface CommitResult {
  success: boolean;
  commitSha?: string;
  error?: string;
}

/**
 * Git 상태를 확인합니다
 */
export function getGitStatus(): string {
  try {
    return execSync('git status --porcelain', { encoding: 'utf-8' });
  } catch {
    return '';
  }
}

/**
 * 변경된 MDX 파일 목록을 반환합니다
 */
export function getModifiedMdxFiles(): string[] {
  const status = getGitStatus();
  const lines = status.split('\n').filter(Boolean);

  return lines
    .filter((line) => line.includes('.mdx'))
    .map((line) => line.substring(3).trim());
}

/**
 * 변경사항을 커밋합니다
 */
export function commitChanges(
  comment: Comment,
  mdxFilePath: string,
): CommitResult {
  try {
    // 1. 스테이지에 추가
    execSync(`git add "${mdxFilePath}"`, { encoding: 'utf-8' });

    // 2. 커밋 메시지 생성
    const message = `docs: MDX 자동 수정 (댓글 #${comment.id.substring(0, 8)})

- 파일: ${mdxFilePath}
- 작성자: ${comment.author}
- 내용: ${comment.body.substring(0, 100)}${comment.body.length > 100 ? '...' : ''}

Co-Authored-By: Claude Code <noreply@anthropic.com>`;

    // 3. 커밋
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
    });

    // 4. 커밋 SHA 가져오기
    const commitSha = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();

    console.log(`[Auto Commit] Committed: ${commitSha.substring(0, 7)}`);

    return {
      success: true,
      commitSha,
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error('[Auto Commit] Error:', error);
    return {
      success: false,
      error,
    };
  }
}

/**
 * 원격 저장소에 푸시합니다
 */
export function pushChanges(): CommitResult {
  try {
    console.log('[Auto Commit] Pushing to remote...');
    execSync('git push origin HEAD', { encoding: 'utf-8' });
    console.log('[Auto Commit] Push successful');
    return { success: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error('[Auto Commit] Push error:', error);
    return { success: false, error };
  }
}

/**
 * 커밋과 푸시를 한 번에 수행합니다
 */
export function commitAndPush(
  comment: Comment,
  mdxFilePath: string,
): CommitResult {
  const commitResult = commitChanges(comment, mdxFilePath);
  if (!commitResult.success) {
    return commitResult;
  }

  const pushResult = pushChanges();
  if (!pushResult.success) {
    return {
      ...commitResult,
      error: `Commit succeeded but push failed: ${pushResult.error}`,
    };
  }

  return commitResult;
}

// CLI 직접 실행 시
if (require.main === module) {
  console.log('Git Status:');
  console.log(getGitStatus() || '(no changes)');

  console.log('\nModified MDX files:');
  const mdxFiles = getModifiedMdxFiles();
  if (mdxFiles.length === 0) {
    console.log('(none)');
  } else {
    mdxFiles.forEach((f) => console.log(`  - ${f}`));
  }
}
