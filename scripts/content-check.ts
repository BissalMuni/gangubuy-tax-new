import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  Frontmatter,
  expectedDialectFromPath,
} from '../lib/content/frontmatter-schema';

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

interface FileResult {
  file: string;
  rel: string;
  ok: boolean;
  expectedDialect: ReturnType<typeof expectedDialectFromPath>;
  declaredCategory?: unknown;
  errors: string[];
}

const files = listMdxFiles(CONTENT_DIR);
const results: FileResult[] = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const expectedDialect = expectedDialectFromPath(file);
  const raw = fs.readFileSync(file, 'utf-8');

  let data: Record<string, unknown>;
  try {
    data = matter(raw).data as Record<string, unknown>;
  } catch (e) {
    results.push({
      file,
      rel,
      ok: false,
      expectedDialect,
      errors: [`yaml-parse: ${(e as Error).message}`],
    });
    continue;
  }

  const declaredCategory = data.category;
  const parsed = Frontmatter.safeParse(data);

  if (parsed.success) {
    results.push({
      file,
      rel,
      ok: true,
      expectedDialect,
      declaredCategory,
      errors: [],
    });
  } else {
    const issues: z.core.$ZodIssue[] = parsed.error.issues;
    const errors = issues.map((i) => {
      const at = i.path.length ? i.path.join('.') : '<root>';
      return `${at}: ${i.message}`;
    });
    results.push({
      file,
      rel,
      ok: false,
      expectedDialect,
      declaredCategory,
      errors,
    });
  }
}

const ok = results.filter((r) => r.ok);
const failed = results.filter((r) => !r.ok);

console.log('\n=== Content frontmatter check ===');
console.log(`Total: ${results.length}`);
console.log(`Pass:  ${ok.length}`);
console.log(`Fail:  ${failed.length}\n`);

const byDialect = new Map<string, { pass: number; fail: number }>();
for (const r of results) {
  const key = r.expectedDialect;
  const cur = byDialect.get(key) ?? { pass: 0, fail: 0 };
  if (r.ok) cur.pass++;
  else cur.fail++;
  byDialect.set(key, cur);
}
console.log('By expected dialect (from path):');
for (const [d, c] of byDialect)
  console.log(`  ${d.padEnd(24)}  pass=${c.pass}  fail=${c.fail}`);
console.log();

if (failed.length === 0) {
  console.log('All frontmatters valid.');
  process.exit(0);
}

const grouped = new Map<string, FileResult[]>();
for (const r of failed) {
  const key = r.expectedDialect;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key)!.push(r);
}

for (const [dialect, list] of grouped) {
  console.log(`--- Failures: expected dialect = ${dialect} (${list.length}) ---`);
  for (const r of list) {
    console.log(`\n  ${r.rel}`);
    console.log(`    declared category: ${JSON.stringify(r.declaredCategory)}`);
    for (const err of r.errors) console.log(`    - ${err}`);
  }
  console.log();
}

const issueFreq = new Map<string, number>();
for (const r of failed) {
  for (const err of r.errors) {
    const field = err.split(':')[0];
    issueFreq.set(field, (issueFreq.get(field) ?? 0) + 1);
  }
}
const sorted = [...issueFreq.entries()].sort((a, b) => b[1] - a[1]);
console.log('--- Most common failing fields ---');
for (const [field, n] of sorted.slice(0, 15)) {
  console.log(`  ${String(n).padStart(4)}  ${field}`);
}
console.log();

process.exit(1);
