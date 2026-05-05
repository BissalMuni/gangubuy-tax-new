/**
 * Claude Code CLI 실행 모듈
 *
 * 로컬 claude CLI 직접 실행
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const GUIDELINES_PATH = path.join(process.cwd(), 'src', 'content', 'MDX_GUIDELINES.md');

export interface ClaudeRunOptions {
  /** 프롬프트 내용 */
  prompt: string;
  /** 작업 디렉토리 */
  cwd?: string;
  /** 타임아웃 (ms) */
  timeout?: number;
  /** dry run 모드 */
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
 * 로컬 Claude Code CLI를 실행합니다
 */
function runClaudeLocal(
  prompt: string,
  cwd: string,
  timeout: number,
): Promise<ClaudeRunResult> {
  return new Promise((resolve) => {
    console.log('[Claude Runner] 로컬 모드로 실행 중...');

    // -p - : stdin에서 프롬프트를 읽어 non-interactive 모드로 실행
    const proc = spawn('claude', ['-p', '-', '--output-format', 'text'], {
      cwd,
      shell: true,
      timeout,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    if (proc.stdin) {
      proc.stdin.write(prompt);
      proc.stdin.end();
    }

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
        output: stdout,
        error: code !== 0 ? stderr || `Exit code ${code}` : undefined,
      });
    });

    proc.on('error', (err) => {
      resolve({ success: false, output: stdout, error: err.message });
    });
  });
}

/**
 * Claude Code CLI를 실행합니다
 */
export async function runClaude(options: ClaudeRunOptions): Promise<ClaudeRunResult> {
  const {
    prompt,
    cwd = process.cwd(),
    timeout = 600000,
    dryRun = false,
  } = options;

  // dry run 모드 처리
  const actualPrompt = dryRun
    ? `[DRY RUN MODE - 실제 파일 수정 없이 변경 사항만 출력]\n\n${prompt}`
    : prompt;

  console.log(`[Claude Runner] 프롬프트: ${prompt.length}자`);

  return runClaudeLocal(actualPrompt, cwd, timeout);
}

/**
 * MDX 수정을 위한 통합 프롬프트를 생성합니다
 * (여러 댓글 또는 프롬프트 항목을 하나로 합침)
 */
export function buildMdxEditPrompt(params: {
  mdxFilePath: string;
  mdxContent: string;
  requests: Array<{ label: string; body: string }>;
  todayDate?: string;
}): string {
  const { mdxFilePath, mdxContent, requests, todayDate } = params;
  const today = todayDate ?? new Date().toISOString().split('T')[0];

  const guidelines = getGuidelinesContent();

  const requestsSection = requests
    .map((r, i) => `### 요청 ${i + 1}${r.label ? ` (${r.label})` : ''}\n${r.body}`)
    .join('\n\n');

  return `# MDX 파일 수정 요청

## 수정 원칙 (반드시 준수)
${guidelines}

---

## 대상 파일
${mdxFilePath}

## 수정 요청 (총 ${requests.length}개)

${requestsSection}

## 현재 TSX 파일 내용
\`\`\`tsx
${mdxContent}
\`\`\`

## 지시사항
위 ${requests.length}개 요청을 **모두** 반영하여 TSX 파일을 수정해주세요.

### 수정 규칙:
1. MDX_GUIDELINES.md의 모든 규칙을 반드시 준수
2. frontmatter의 last_updated를 오늘 날짜(${today})로 갱신
3. 법령 링크는 https://law.go.kr/법령/{법령명}/{조문} 형식 사용
4. 표는 반드시 HTML 형식으로 작성
5. 색상: 헤더 #f0f0f0, 강조 #e6f7ff, 테두리 #d9d9d9, 중과 #cf1322
6. 충돌 요청은 최신 요청 우선
7. 확실하지 않은 정보는 추가하지 않음
`;
}

/**
 * PDF → MDX 변환 프롬프트를 생성합니다
 *
 * PDF 텍스트를 받아 MDX_GUIDELINES.md 형식의 MDX 파일로 변환하도록 Claude에게 요청합니다.
 * Claude가 직접 파일을 작성합니다.
 */
export function buildPdfToMdxPrompt(params: {
  pdfText: string;
  targetFilePath: string;
  category: string;
  slug: string;
  extraInstructions?: string;
  todayDate?: string;
}): string {
  const { pdfText, targetFilePath, category, slug, extraInstructions, todayDate } = params;
  const today = todayDate ?? new Date().toISOString().split('T')[0];

  const guidelines = getGuidelinesContent();

  return `# PDF → MDX 변환 요청

## 변환 원칙 (반드시 준수)
${guidelines}

---

## 변환 정보
- **카테고리**: ${category}
- **슬러그**: ${slug}
- **저장 경로**: ${targetFilePath}
- **오늘 날짜**: ${today}

## PDF 원본 텍스트
\`\`\`
${pdfText}
\`\`\`
${extraInstructions ? `\n## 추가 지시사항\n${extraInstructions}\n` : ''}
## 요청

위 PDF 텍스트를 MDX_GUIDELINES.md 형식에 맞는 TSX 파일로 변환하여 **${targetFilePath}** 에 저장해주세요.

### 변환 규칙:
1. MDX_GUIDELINES.md의 모든 규칙을 반드시 준수
2. 개조식 공문서 형식으로 작성 (서술형 금지)
3. Frontmatter 필수 항목 모두 포함:
   - title, category: "${category}", subcategory, lastUpdated: "${today}"
   - legalBasis (PDF에서 추출), effectiveDate (PDF에서 추출)
4. 세율표는 반드시 HTML 표 형식
5. 색상: 합계 헤더 #cf1322, 취득세 #1890ff, 지방교육세 #52c41a, 농특세 #fa8c16
6. PDF에 없는 정보는 추가하지 않음
7. 불명확한 부분은 ※ 주석으로 표시
`;
}
