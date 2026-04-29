import fs from 'fs';
import path from 'path';
import { LawName } from '../lib/content/law-link-schema';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRY_RUN = !process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

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

const validLaws = new Set<string>(LawName.options);

const anchorRe =
  /<a\s+href=["']https?:\/\/(?:www\.)?law\.go\.kr\/([^"']+)["']\s+target=["']_blank["'][^>]*>([\s\S]*?)<\/a>/g;

interface Stats {
  files: number;
  filesChanged: number;
  totalAnchors: number;
  converted: number;
  skipped: number;
  unknownLaw: Set<string>;
  malformedArticle: Set<string>;
  hasInnerJsx: number;
}

const stats: Stats = {
  files: 0,
  filesChanged: 0,
  totalAnchors: 0,
  converted: 0,
  skipped: 0,
  unknownLaw: new Set(),
  malformedArticle: new Set(),
  hasInnerJsx: 0,
};

for (const file of listMdxFiles(CONTENT_DIR)) {
  stats.files++;
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf-8');

  let changed = false;
  const updated = raw.replace(anchorRe, (match, pathPart: string, inner: string) => {
    stats.totalAnchors++;

    // pathPart looks like "법령/지방세법/제13조" or URL-encoded variant
    let decoded: string;
    try {
      decoded = decodeURIComponent(pathPart);
    } catch {
      stats.skipped++;
      return match;
    }

    const segs = decoded.split('/').filter(Boolean);
    if (segs[0] !== '법령' || !segs[1]) {
      stats.skipped++;
      return match;
    }

    const law = segs[1];
    const article = segs[2];

    if (!validLaws.has(law)) {
      stats.unknownLaw.add(law);
      stats.skipped++;
      return match;
    }
    if (article && !/^제\d+조(의\d+)?$/.test(article)) {
      stats.malformedArticle.add(`${law}/${article}`);
      stats.skipped++;
      return match;
    }

    // Inner content: must be plain text (no nested JSX) so we can put it as
    // children. Strip leading/trailing whitespace; keep markdown chars intact.
    const innerTrimmed = inner.trim();
    if (innerTrimmed.includes('<') || innerTrimmed.includes('{')) {
      stats.hasInnerJsx++;
      stats.skipped++;
      return match;
    }

    stats.converted++;
    if (!changed) {
      changed = true;
      stats.filesChanged++;
    }

    const articleAttr = article ? ` article="${article}"` : '';
    const out = `<LawLink law="${law}"${articleAttr}>${innerTrimmed}</LawLink>`;
    if (VERBOSE) console.log(`  ${rel}\n    BEFORE: ${match.slice(0, 120)}\n    AFTER:  ${out}`);
    return out;
  });

  if (changed && !DRY_RUN) {
    fs.writeFileSync(file, updated, 'utf-8');
  }
}

console.log(`\n=== Convert law links ===`);
console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'APPLY'}`);
console.log(`Files scanned: ${stats.files}`);
console.log(`Files with changes: ${stats.filesChanged}`);
console.log(`Anchors matched: ${stats.totalAnchors}`);
console.log(`  converted:        ${stats.converted}`);
console.log(`  skipped:          ${stats.skipped}`);
console.log(`    inner has JSX:  ${stats.hasInnerJsx}`);
console.log(`    unknown law:    ${stats.unknownLaw.size} distinct  →  ${[...stats.unknownLaw].join(', ') || '-'}`);
console.log(`    malformed art.: ${stats.malformedArticle.size} distinct`);
if (stats.malformedArticle.size > 0) {
  for (const a of stats.malformedArticle) console.log(`      ${a}`);
}

if (DRY_RUN) {
  console.log(`\nRe-run with --apply to write changes.`);
}
