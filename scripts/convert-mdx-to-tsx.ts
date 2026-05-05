/**
 * MDX → TSX 변환 스크립트
 * content/ 의 MDX 파일을 src/content/ 의 TSX로 변환
 *
 * 실행: npx tsx scripts/convert-mdx-to-tsx.ts
 * 미리보기: npx tsx scripts/convert-mdx-to-tsx.ts --dry-run
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SRC_DIR = path.resolve(__dirname, '../content');
const OUT_DIR = path.resolve(__dirname, '../src/content');
const DRY_RUN = process.argv.includes('--dry-run');

/** MDX 파일 재귀 탐색 */
function findMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...findMdxFiles(full));
    else if (entry.name.endsWith('.mdx')) result.push(full);
  }
  return result;
}

/** 파일명에서 컴포넌트 이름 생성 */
function toComponentName(filename: string): string {
  // rental-business-v1.0.mdx → RentalBusinessV10
  const base = filename.replace(/\.mdx$/, '');
  let name = base
    .split(/[-.]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
  // 숫자로 시작하면 접두사 추가
  if (/^\d/.test(name)) {
    name = `Content${name}`;
  }
  return name;
}

/** frontmatter → export const meta 문자열 */
function metaToExport(data: Record<string, unknown>): string {
  const entries: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    if (typeof value === 'string') {
      entries.push(`  ${camelKey}: ${JSON.stringify(value)},`);
    } else if (Array.isArray(value)) {
      entries.push(`  ${camelKey}: ${JSON.stringify(value)},`);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      entries.push(`  ${camelKey}: ${value},`);
    }
  }
  return `export const meta = {\n${entries.join('\n')}\n};`;
}

/** 사용 컴포넌트 감지 */
function detectImports(body: string): string[] {
  const imports: string[] = [];
  if (body.includes('<SectionNav')) imports.push('SectionNav');
  if (body.includes('<Outline')) imports.push('Outline');
  if (body.includes('<Callout')) imports.push('Callout');
  if (body.includes('<Alert')) imports.push('Alert');
  if (body.includes('<ThemeNav')) imports.push('ThemeNav');
  if (body.includes('<AcquisitionThemeNav')) imports.push('AcquisitionThemeNav');
  return imports;
}

/** JSX 깊이 추적: < 와 > 로 대략적 판단 (문자열 리터럴 내부 무시) */
function isInsideJsx(line: string, depth: number): number {
  let d = depth;
  let inString = false;
  let strChar = '';
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inString) {
      if (c === strChar && line[i - 1] !== '\\') inString = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inString = true; strChar = c; continue; }
    // JSX self-closing: />
    if (c === '/' && line[i + 1] === '>') { d = Math.max(0, d - 1); i++; continue; }
    // 닫는 태그 시작: </
    if (c === '<' && line[i + 1] === '/') { continue; }
    // 여는 태그
    if (c === '<' && /[A-Za-z]/.test(line[i + 1] || '')) { d++; continue; }
    // 닫는 > (태그 종료)
    if (c === '>') { d = Math.max(0, d - 1); continue; }
  }
  return d;
}

/** 줄이 JSX 컨텍스트 내부인지 판단 (], }, /> 등 포함) */
function looksLikeJsxContinuation(line: string): boolean {
  const t = line.trim();
  // JSX 속성값, 배열 닫기, 객체 닫기, self-close 등
  return /^[}\])\/>]/.test(t) ||
    /\/>$/.test(t) ||
    /^[{[]/.test(t) ||
    // JSX 속성이 이어지는 패턴
    /^\w+[=:]/.test(t) ||
    // 배열/객체 항목
    /^{.*}[,]?$/.test(t) ||
    // 불릿 포인트 (• 로 시작, HTML 테이블 내부에서 사용)
    /^[•·]/.test(t) ||
    // + 로 시작하는 줄 (테이블 내부 추가 내용)
    /^\+\s/.test(t);
}

/** 마크다운 요소 → JSX 변환 */
function convertMarkdownToJsx(body: string): string {
  const lines = body.split('\n');
  const result: string[] = [];
  let inList = false;
  let inBlockquote = false;
  let blockquoteLines: string[] = [];
  let jsxDepth = 0; // 멀티라인 JSX 추적

  function flushBlockquote() {
    if (blockquoteLines.length > 0) {
      const text = blockquoteLines.join(' ');
      result.push(`      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">`);
      result.push(`        <p>${text}</p>`);
      result.push(`      </blockquote>`);
      blockquoteLines = [];
      inBlockquote = false;
    }
  }

  function flushList() {
    if (inList) {
      result.push('      </ul>');
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 빈 줄
    if (trimmed === '') {
      if (jsxDepth === 0) {
        flushBlockquote();
        flushList();
      }
      result.push('');
      continue;
    }

    // 마크다운 blockquote (> text) — JSX 체크보다 먼저
    const bqMatchEarly = trimmed.match(/^> (.+)$/);
    if (bqMatchEarly && jsxDepth === 0) {
      flushList();
      inBlockquote = true;
      blockquoteLines.push(convertInlineMarkdown(bqMatchEarly[1]));
      continue;
    }

    // 닫히지 않는 MDX 컴포넌트 자동 닫기: <Outline level={1}>텍스트 → <Outline level={1}>텍스트</Outline>
    const unclosedMatch = trimmed.match(/^<(Outline|Callout|Alert)\s[^>]*>([^<]+)$/);
    if (unclosedMatch && jsxDepth === 0) {
      flushBlockquote();
      flushList();
      result.push(`      ${trimmed}</${unclosedMatch[1]}>`);
      continue;
    }

    // JSX 컨텍스트 내부: 그대로 통과
    if (jsxDepth > 0 || (trimmed.startsWith('<') || trimmed.startsWith('{') || looksLikeJsxContinuation(trimmed))) {
      flushBlockquote();
      flushList();
      result.push(`      ${trimmed}`);
      jsxDepth = isInsideJsx(trimmed, jsxDepth);
      continue;
    }

    // 수평선 (마크다운 ---)
    if (/^---+$/.test(trimmed)) {
      flushBlockquote();
      flushList();
      result.push('      <hr className="my-6" />');
      continue;
    }

    // h1 (# Title)
    const h1Match = trimmed.match(/^# (.+)$/);
    if (h1Match) {
      flushBlockquote();
      flushList();
      result.push(`      <h1 className="text-2xl font-bold mb-4">${convertInlineMarkdown(h1Match[1])}</h1>`);
      continue;
    }

    // h2 (## Title)
    const h2Match = trimmed.match(/^## (.+)$/);
    if (h2Match) {
      flushBlockquote();
      flushList();
      const id = h2Match[1].replace(/\s+/g, '-').toLowerCase();
      result.push(`      <h2 id="${id}" className="text-xl font-semibold mt-8 mb-4">${convertInlineMarkdown(h2Match[1])}</h2>`);
      continue;
    }

    // h3 (### Title)
    const h3Match = trimmed.match(/^### (.+)$/);
    if (h3Match) {
      flushBlockquote();
      flushList();
      result.push(`      <h3 className="text-lg font-semibold mt-6 mb-3">${convertInlineMarkdown(h3Match[1])}</h3>`);
      continue;
    }

    // 리스트 (- item)
    const liMatch = trimmed.match(/^[-*] (.+)$/);
    if (liMatch) {
      flushBlockquote();
      if (!inList) {
        result.push('      <ul className="list-disc pl-6 my-4 space-y-1">');
        inList = true;
      }
      result.push(`        <li>${convertInlineMarkdown(liMatch[1])}</li>`);
      continue;
    }

    // 일반 텍스트 줄 — <p>로 감싸기
    flushBlockquote();
    flushList();
    if (trimmed.length > 0) {
      result.push(`      <p>${convertInlineMarkdown(trimmed)}</p>`);
    }
  }

  flushBlockquote();
  flushList();

  return result.join('\n');
}

/** 인라인 마크다운 → JSX */
function convertInlineMarkdown(text: string): string {
  // **bold** → <strong>bold</strong>
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // *italic* → <em>italic</em> (단, JSX 속성의 * 제외)
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // `code` → <code>code</code> (코드 내부의 <> 는 이스케이프)
  text = text.replace(/`([^`]+)`/g, (_m, code: string) => {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code className="bg-gray-100 px-1 rounded text-sm">${escaped}</code>`;
  });
  // [text](url) → <a href="url">text</a>
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" className="text-blue-600 hover:underline">$1</a>',
  );
  // 남아있는 bare < > (JSX 태그가 아닌 것) 이스케이프
  // JSX 태그: <word, </word, </, /> 패턴을 제외하고 < > 이스케이프
  text = text.replace(/<(?![A-Za-z/!])/g, '&lt;');
  text = text.replace(/(?<![A-Za-z"'/}])>/g, '&gt;');
  return text;
}

function convertFile(mdxPath: string): { outPath: string; content: string } {
  const relative = path.relative(SRC_DIR, mdxPath);
  const outRelative = relative.replace(/\.mdx$/, '.tsx');
  const outPath = path.join(OUT_DIR, outRelative);

  const raw = fs.readFileSync(mdxPath, 'utf-8');
  const { data, content: body } = matter(raw);

  const filename = path.basename(mdxPath);
  const componentName = toComponentName(filename);
  const metaExport = metaToExport(data);
  const imports = detectImports(body);
  const jsxBody = convertMarkdownToJsx(body);

  // import 문 생성
  const importLines: string[] = ['"use client";', ''];
  if (imports.length > 0) {
    const componentImports = imports
      .map((c) => `import { ${c} } from "@/components/mdx/${c}";`)
      .join('\n');
    importLines.push(componentImports, '');
  }

  const tsx = `${importLines.join('\n')}
${metaExport}

export default function ${componentName}() {
  return (
    <div className="space-y-6">
${jsxBody}
    </div>
  );
}
`;

  return { outPath, content: tsx };
}

async function main() {
  const mdxFiles = findMdxFiles(SRC_DIR);
  console.log(`${mdxFiles.length}개 MDX 파일 발견\n`);

  let converted = 0;
  let errors = 0;

  for (const mdxPath of mdxFiles) {
    const relative = path.relative(SRC_DIR, mdxPath);
    try {
      const { outPath, content } = convertFile(mdxPath);

      if (DRY_RUN) {
        console.log(`[DRY] ${relative} → ${path.relative(OUT_DIR, outPath)}`);
      } else {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, content, 'utf-8');
        console.log(`✓ ${relative}`);
      }
      converted++;
    } catch (err) {
      console.error(`✗ ${relative}: ${err}`);
      errors++;
    }
  }

  console.log(`\n완료: ${converted} 변환, ${errors} 에러`);
  if (DRY_RUN) console.log('(--dry-run 모드: 파일 생성 안 함)');
}

main().catch(console.error);
