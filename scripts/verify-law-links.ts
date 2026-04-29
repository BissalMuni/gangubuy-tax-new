import fs from 'fs';
import path from 'path';
import { buildLawHref } from '../lib/content/law-link-schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const baselinePath = path.join(process.cwd(), 'docs', 'sessions', '_law-link-baseline.json');

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

interface HrefEntry {
  rel: string;
  line: number;
  href: string;
  text: string;
}

const mode = process.argv[2]; // 'capture' | 'verify'

if (mode === 'capture') {
  const anchorRe =
    /<a\s+href=["'](https?:\/\/(?:www\.)?law\.go\.kr\/[^"']+)["']\s+target=["']_blank["'][^>]*>([\s\S]*?)<\/a>/g;
  const entries: HrefEntry[] = [];

  for (const file of listMdxFiles(CONTENT_DIR)) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const raw = fs.readFileSync(file, 'utf-8');
    let m: RegExpExecArray | null;
    anchorRe.lastIndex = 0;
    while ((m = anchorRe.exec(raw)) !== null) {
      const line = raw.slice(0, m.index).split('\n').length;
      // normalize www to bare
      const href = m[1].replace('://www.law.go.kr/', '://law.go.kr/');
      entries.push({ rel, line, href, text: m[2].trim() });
    }
  }

  fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
  fs.writeFileSync(baselinePath, JSON.stringify(entries, null, 2), 'utf-8');
  console.log(`Captured ${entries.length} baseline hrefs → ${path.relative(process.cwd(), baselinePath)}`);
  process.exit(0);
}

if (mode === 'verify') {
  if (!fs.existsSync(baselinePath)) {
    console.error('No baseline file. Run with `capture` first.');
    process.exit(1);
  }
  const baseline: HrefEntry[] = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));

  // Decode <LawLink> instances by parsing JSX-style attrs
  const llRe = /<LawLink\s+law=["']([^"']+)["'](?:\s+article=["']([^"']+)["'])?\s*>([\s\S]*?)<\/LawLink>/g;
  const after: HrefEntry[] = [];
  for (const file of listMdxFiles(CONTENT_DIR)) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
    const raw = fs.readFileSync(file, 'utf-8');
    let m: RegExpExecArray | null;
    llRe.lastIndex = 0;
    while ((m = llRe.exec(raw)) !== null) {
      const line = raw.slice(0, m.index).split('\n').length;
      const href = buildLawHref({ law: m[1] as never, article: m[2] || undefined });
      after.push({ rel, line, href, text: m[3].trim() });
    }
  }

  // Per-file href multiset comparison (line numbers shift after edits)
  const sortKey = (e: HrefEntry) => `${e.rel}|${e.href}`;
  const baselineCounts = new Map<string, number>();
  for (const e of baseline) baselineCounts.set(sortKey(e), (baselineCounts.get(sortKey(e)) ?? 0) + 1);
  const afterCounts = new Map<string, number>();
  for (const e of after) afterCounts.set(sortKey(e), (afterCounts.get(sortKey(e)) ?? 0) + 1);

  const missing: string[] = [];
  const extra: string[] = [];
  for (const [k, n] of baselineCounts) {
    const a = afterCounts.get(k) ?? 0;
    if (a < n) missing.push(`  -${n - a}  ${k}`);
  }
  for (const [k, n] of afterCounts) {
    const b = baselineCounts.get(k) ?? 0;
    if (n > b) extra.push(`  +${n - b}  ${k}`);
  }

  console.log(`=== Verify ===`);
  console.log(`Baseline anchors: ${baseline.length}`);
  console.log(`Converted LawLinks: ${after.length}`);
  console.log(`Missing (in baseline but not after): ${missing.length}`);
  for (const m of missing.slice(0, 20)) console.log(m);
  console.log(`Extra (in after but not baseline): ${extra.length}`);
  for (const e of extra.slice(0, 20)) console.log(e);

  if (baseline.length === after.length && missing.length === 0 && extra.length === 0) {
    console.log(`\nAll hrefs preserved 1:1.`);
    process.exit(0);
  }
  process.exit(1);
}

console.error('Usage: verify-law-links.ts capture | verify');
process.exit(1);
