import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

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

interface LawLinkOccurrence {
  file: string;
  rel: string;
  fullMatch: string;
  href: string;
  text: string;
  hostHint: string;
  decodedPath?: string;
  lineNumber: number;
}

const files = listMdxFiles(CONTENT_DIR);
const anchorRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

const all: LawLinkOccurrence[] = [];
const invalidUrl: LawLinkOccurrence[] = [];
const otherHost: LawLinkOccurrence[] = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf-8');
  let m: RegExpExecArray | null;
  anchorRe.lastIndex = 0;
  while ((m = anchorRe.exec(raw)) !== null) {
    const fullMatch = m[0];
    const href = m[1];
    const text = m[2].trim();

    // line number from offset
    const lineNumber = raw.slice(0, m.index).split('\n').length;

    let hostHint = 'other';
    let decodedPath: string | undefined;
    try {
      const u = new URL(href);
      hostHint = u.hostname;
      decodedPath = decodeURIComponent(u.pathname);
    } catch {
      hostHint = 'invalid-url';
    }
    const occ: LawLinkOccurrence = { file, rel, fullMatch, href, text, hostHint, decodedPath, lineNumber };
    all.push(occ);
    if (hostHint === 'invalid-url') invalidUrl.push(occ);
    else if (!hostHint.includes('law.go.kr')) otherHost.push(occ);
  }
}

const lawGoKr = all.filter((a) => a.hostHint.includes('law.go.kr'));

console.log(`=== Anchor inventory ===`);
console.log(`Total <a> tags: ${all.length}`);
console.log(`law.go.kr family: ${lawGoKr.length}`);
console.log(`invalid-url: ${invalidUrl.length}`);
console.log(`other-host: ${otherHost.length}`);
console.log(`Files with law links: ${new Set(lawGoKr.map((a) => a.rel)).size}`);

// Decode paths and bucket law names
const lawNameFreq = new Map<string, number>();
const articleNumberPattern = new Map<string, number>();
for (const a of lawGoKr) {
  if (!a.decodedPath) continue;
  const segs = a.decodedPath.split('/').filter(Boolean);
  // expect: ['법령', '<lawName>', '<article>?']
  if (segs[0] === '법령' && segs[1]) {
    lawNameFreq.set(segs[1], (lawNameFreq.get(segs[1]) ?? 0) + 1);
    if (segs[2]) {
      const articleType = /^제\d+조(의\d+)?$/.test(segs[2]) ? 'standard' : 'unusual';
      articleNumberPattern.set(articleType, (articleNumberPattern.get(articleType) ?? 0) + 1);
    } else {
      articleNumberPattern.set('no-article', (articleNumberPattern.get('no-article') ?? 0) + 1);
    }
  }
}

console.log(`\n=== Law names (decoded) ===`);
for (const [n, c] of [...lawNameFreq.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`  ${String(c).padStart(4)}  ${n}`);

console.log(`\n=== Article patterns ===`);
for (const [n, c] of articleNumberPattern) console.log(`  ${String(c).padStart(4)}  ${n}`);

// Inspect unusual articles
console.log(`\n=== Unusual article paths ===`);
for (const a of lawGoKr) {
  if (!a.decodedPath) continue;
  const segs = a.decodedPath.split('/').filter(Boolean);
  if (segs[0] !== '법령' || !segs[2]) continue;
  if (!/^제\d+조(의\d+)?$/.test(segs[2])) {
    console.log(`  ${a.rel}:${a.lineNumber}  ${segs[1]}/${segs[2]}`);
  }
}

console.log(`\n=== invalid-url anchors (${invalidUrl.length}) ===`);
for (const a of invalidUrl) {
  console.log(`  ${a.rel}:${a.lineNumber}`);
  console.log(`    href: ${a.href.slice(0, 100)}`);
  console.log(`    text: ${a.text.slice(0, 80)}`);
}

console.log(`\n=== other-host anchors (${otherHost.length}) ===`);
for (const a of otherHost) {
  console.log(`  ${a.rel}:${a.lineNumber}  host=${a.hostHint}`);
  console.log(`    href: ${a.href}`);
  console.log(`    text: ${a.text.slice(0, 80)}`);
}

// Visible text patterns — used to validate that we can preserve text after conversion
const textPatternFreq = new Map<string, number>();
for (const a of lawGoKr) {
  // Categorize text patterns
  const t = a.text;
  let pattern = 'other';
  if (/^§\s*\d+(의\d+)?(\s*[①-⑳㉑-㉟])*(\s*\d+호)?$/.test(t)) pattern = '§N(의M)?(①)?(N호)?';
  else if (/^.+§\s*\d+(의\d+)?$/.test(t)) pattern = '<lawName> §N';
  else if (/^.+제\s*\d+\s*조(의\d+)?/.test(t)) pattern = '<lawName> 제N조';
  else if (/^제\s*\d+\s*조/.test(t)) pattern = '제N조';
  else if (/^「.+」/.test(t)) pattern = '「<lawName>」';
  textPatternFreq.set(pattern, (textPatternFreq.get(pattern) ?? 0) + 1);
}
console.log(`\n=== Visible text patterns ===`);
for (const [p, c] of [...textPatternFreq.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`  ${String(c).padStart(4)}  ${p}`);

// Write inventory
const dumpPath = path.join(process.cwd(), 'docs', 'sessions', '_law-link-inventory.json');
fs.mkdirSync(path.dirname(dumpPath), { recursive: true });
fs.writeFileSync(
  dumpPath,
  JSON.stringify(
    {
      total: all.length,
      lawGoKrTotal: lawGoKr.length,
      lawFileCount: new Set(lawGoKr.map((a) => a.rel)).size,
      lawNames: Object.fromEntries(lawNameFreq),
      textPatterns: Object.fromEntries(textPatternFreq),
      invalidUrls: invalidUrl.map((a) => ({ rel: a.rel, line: a.lineNumber, href: a.href, text: a.text })),
      otherHosts: otherHost.map((a) => ({ rel: a.rel, line: a.lineNumber, href: a.href, text: a.text })),
      lawSamples: lawGoKr.slice(0, 20).map((a) => ({
        rel: a.rel,
        line: a.lineNumber,
        decodedPath: a.decodedPath,
        text: a.text,
      })),
    },
    null,
    2,
  ),
  'utf-8',
);
console.log(`\nInventory: ${path.relative(process.cwd(), dumpPath)}`);
