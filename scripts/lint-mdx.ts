import fs from 'fs';
import path from 'path';
import { LawName } from '../lib/content/law-link-schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BASELINE_PATH = path.join(process.cwd(), 'scripts', 'lint-mdx-baseline.json');
const validLaws = new Set<string>(LawName.options);
const UPDATE_BASELINE = process.argv.includes('--update-baseline');

function relPath(abs: string): string {
  return path.relative(process.cwd(), abs).replace(/\\/g, '/');
}

function countInlineTables(raw: string): number {
  return (raw.match(/<table\b[^>]*style=\{/g) ?? []).length;
}

interface Baseline {
  _comment?: string;
  'no-new-inline-table': Record<string, number>;
}

function loadBaseline(): Baseline {
  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf-8')) as Baseline;
}

const baseline = loadBaseline();

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

const lawLinkRe =
  /<LawLink\s+law=["']([^"']*)["'](?:\s+article=["']([^"']*)["'])?\s*>([\s\S]*?)<\/LawLink>/g;

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
  {
    id: 'lawlink-valid-law',
    description:
      '<LawLink law="..."> must use a value from the LawName enum (lib/content/law-link-schema.ts)',
    check(file, raw) {
      const issues: Issue[] = [];
      lawLinkRe.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = lawLinkRe.exec(raw)) !== null) {
        const law = m[1];
        if (!validLaws.has(law)) {
          const { line, column } = locateOffset(raw, m.index);
          issues.push({
            rule: 'lawlink-valid-law',
            file,
            line,
            column,
            message: `Unknown law name "${law}". Add to LawName enum first if this is a new law.`,
            excerpt: m[0].slice(0, 120),
          });
        }
      }
      return issues;
    },
  },
  {
    id: 'lawlink-valid-article',
    description:
      '<LawLink article="..."> must match /^제\\d+조(의\\d+)?$/ (e.g. 제13조, 제58조의3)',
    check(file, raw) {
      const issues: Issue[] = [];
      lawLinkRe.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = lawLinkRe.exec(raw)) !== null) {
        const article = m[2];
        if (article && !/^제\d+조(의\d+)?$/.test(article)) {
          const { line, column } = locateOffset(raw, m.index);
          issues.push({
            rule: 'lawlink-valid-article',
            file,
            line,
            column,
            message: `Malformed article "${article}". Must look like "제13조" or "제58조의3".`,
            excerpt: m[0].slice(0, 120),
          });
        }
      }
      return issues;
    },
  },
  {
    id: 'no-markdown-law-link',
    description:
      'Markdown link [text](https://law.go.kr/...) is forbidden — it renders as <a> and bypasses LawLink. Use <LawLink>.',
    check(file, raw) {
      const issues: Issue[] = [];
      const re = /\[[^\]]+\]\(https?:\/\/(?:www\.)?law\.go\.kr\/[^)]+\)/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(raw)) !== null) {
        const { line, column } = locateOffset(raw, m.index);
        issues.push({
          rule: 'no-markdown-law-link',
          file,
          line,
          column,
          message:
            'Markdown link to law.go.kr — convert to <LawLink law="…" article="…">…</LawLink> (see MDX_GUIDELINES.md §4.1)',
          excerpt: m[0].slice(0, 120),
        });
      }
      return issues;
    },
  },
  {
    id: 'no-new-inline-table',
    description:
      'Per-file count of <table style={...}> may not exceed scripts/lint-mdx-baseline.json. New tables: extract to a component (see MDX_GUIDELINES.md §6, §13.2).',
    check(file, raw) {
      const rel = relPath(file);
      const current = countInlineTables(raw);
      const allowed = baseline['no-new-inline-table'][rel] ?? 0;
      if (current <= allowed) return [];
      return [
        {
          rule: 'no-new-inline-table',
          file,
          line: 1,
          column: 1,
          message: `${rel} has ${current} inline-styled <table>, baseline allows ${allowed}. Extract new tables to a component, or run \`npm run mdx:lint:update-baseline\` if you intentionally lowered the count and want to lock the new ceiling.`,
          excerpt: `count: ${current} > baseline ${allowed}`,
        },
      ];
    },
  },
  {
    id: 'lawlink-non-empty-children',
    description:
      '<LawLink> must have visible text content (children); empty children renders an invisible link',
    check(file, raw) {
      const issues: Issue[] = [];
      lawLinkRe.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = lawLinkRe.exec(raw)) !== null) {
        if (!m[3].trim()) {
          const { line, column } = locateOffset(raw, m.index);
          issues.push({
            rule: 'lawlink-non-empty-children',
            file,
            line,
            column,
            message: 'Empty <LawLink>…</LawLink> children — provide visible text.',
            excerpt: m[0].slice(0, 120),
          });
        }
      }
      return issues;
    },
  },
];

const files = listMdxFiles(CONTENT_DIR);

if (UPDATE_BASELINE) {
  const next: Record<string, number> = {};
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const c = countInlineTables(raw);
    if (c > 0) next[relPath(file)] = c;
  }
  const sorted = Object.fromEntries(
    Object.entries(next).sort(([a], [b]) => a.localeCompare(b)),
  );
  const out: Baseline = {
    _comment: baseline._comment,
    'no-new-inline-table': sorted,
  };
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(out, null, 2) + '\n', 'utf-8');
  const total = Object.values(sorted).reduce((a, b) => a + b, 0);
  console.log(`Updated baseline: ${Object.keys(sorted).length} files, ${total} total <table style={...}>`);
  process.exit(0);
}

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
