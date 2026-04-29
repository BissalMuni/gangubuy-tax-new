import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface Issue {
  rule: string;
  file: string;
  line: number;
  column: number;
  message: string;
  excerpt: string;
}

interface Rule {
  id: string;
  description: string;
  check: (file: string, raw: string) => Issue[];
}

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMdxFiles(p));
    else if (entry.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}

function locateOffset(raw: string, offset: number): { line: number; column: number } {
  const before = raw.slice(0, offset);
  const lines = before.split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

const rules: Rule[] = [
  {
    id: 'no-raw-law-link',
    description:
      'Raw <a href="https://law.go.kr/..."> is forbidden — use <LawLink law="..." article="...">',
    check(file, raw) {
      const issues: Issue[] = [];
      const re =
        /<a\s+[^>]*href=["']https?:\/\/(?:www\.)?law\.go\.kr\/[^"']+["'][^>]*>/gi;
      let m: RegExpExecArray | null;
      while ((m = re.exec(raw)) !== null) {
        const { line, column } = locateOffset(raw, m.index);
        issues.push({
          rule: 'no-raw-law-link',
          file,
          line,
          column,
          message:
            'Raw law.go.kr anchor — convert to <LawLink law="…" article="…">…</LawLink> (see MDX_GUIDELINES.md §4.1)',
          excerpt: m[0].slice(0, 120),
        });
      }
      return issues;
    },
  },
];

const files = listMdxFiles(CONTENT_DIR);
const allIssues: Issue[] = [];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf-8');
  for (const rule of rules) {
    allIssues.push(...rule.check(file, raw));
  }
}

console.log(`=== MDX lint ===`);
console.log(`Files scanned: ${files.length}`);
console.log(`Rules active:  ${rules.length}`);
for (const r of rules) console.log(`  - ${r.id}: ${r.description}`);
console.log(`Issues found:  ${allIssues.length}`);

if (allIssues.length === 0) {
  console.log(`\nClean.`);
  process.exit(0);
}

const byRule = new Map<string, Issue[]>();
for (const i of allIssues) {
  if (!byRule.has(i.rule)) byRule.set(i.rule, []);
  byRule.get(i.rule)!.push(i);
}

for (const [ruleId, issues] of byRule) {
  console.log(`\n--- ${ruleId} (${issues.length}) ---`);
  for (const i of issues.slice(0, 50)) {
    const rel = path.relative(process.cwd(), i.file).replace(/\\/g, '/');
    console.log(`  ${rel}:${i.line}:${i.column}`);
    console.log(`    ${i.message}`);
    console.log(`    > ${i.excerpt}`);
  }
  if (issues.length > 50) console.log(`  ... and ${issues.length - 50} more`);
}

process.exit(1);
