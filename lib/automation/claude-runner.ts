/**
 * Claude Code CLI 실행 모듈
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const GUIDELINES_PATH = path.join(process.cwd(), 'content', 'MDX_GUIDELINES.md');

export interface ClaudeRunOptions {
  /** 프롬프트 내용 */
  prompt: string;
  /** 작업 디렉토리 */
  cwd?: string;
  /** 타임아웃 (ms) */
  timeout?: number;
  /** dry run 모드 (실제 수정 안 함) */
  dryRun?: boolean;
}

export interface ClaudeRunResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * MDX_GUIDELINES.md 내용을 읽어 시스템 프롬프트로 사용
 */
export function getGuidelinesContent(): string {
  if (!fs.existsSync(GUIDELINES_PATH)) {
    console.warn('MDX_GUIDELINES.md not found at:', GUIDELINES_PATH);
    return '';
  }
  return fs.readFileSync(GUIDELINES_PATH, 'utf-8');
}

/**
 * Claude Code CLI를 실행합니다
 */
export async function runClaude(options: ClaudeRunOptions): Promise<ClaudeRunResult> {
  const { prompt, cwd = process.cwd(), timeout = 300000, dryRun = false } = options;

  return new Promise((resolve) => {
    const args = ['-p', prompt];

    // dry run 모드에서는 --dry-run 옵션 추가 (만약 지원된다면)
    // Claude Code CLI는 실제로 이 옵션이 없을 수 있으므로
    // dry run은 프롬프트에 명시하는 방식으로 처리

    if (dryRun) {
      args[1] = `[DRY RUN MODE - 실제 파일 수정 없이 변경 사항만 출력해주세요]\n\n${prompt}`;
    }

    console.log('[Claude Runner] Executing claude command...');
    console.log('[Claude Runner] Prompt length:', prompt.length, 'chars');

    const proc = spawn('claude', args, {
      cwd,
      shell: true,
      timeout,
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          output: stdout,
        });
      } else {
        resolve({
          success: false,
          output: stdout,
          error: stderr || `Process exited with code ${code}`,
        });
      }
    });

    proc.on('error', (err) => {
      resolve({
        success: false,
        output: stdout,
        error: err.message,
      });
    });
  });
}

/**
 * MDX 수정을 위한 프롬프트를 생성합니다
 */
export function buildMdxEditPrompt(params: {
  mdxFilePath: string;
  mdxContent: string;
  commentAuthor: string;
  commentBody: string;
  attachmentContent?: string;
}): string {
  const { mdxFilePath, mdxContent, commentAuthor, commentBody, attachmentContent } = params;

  const guidelines = getGuidelinesContent();

  let prompt = `# MDX 파일 수정 요청

## 수정 원칙 (반드시 준수)
${guidelines}

---

## 대상 파일
${mdxFilePath}

## 댓글 내용
- 작성자: ${commentAuthor}
- 내용: ${commentBody}
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
- MDX_GUIDELINES.md의 모든 규칙을 반드시 준수하세요
- frontmatter의 last_updated를 오늘 날짜로 갱신하세요
- 법령 링크는 https://law.go.kr/법령/{법령명}/{조문} 형식을 사용하세요
- 표는 반드시 HTML 형식으로 작성하세요
- 수정이 필요 없다면 그 이유를 설명해주세요
`;

  return prompt;
}
