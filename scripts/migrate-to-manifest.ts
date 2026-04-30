/**
 * 004 PoC: 현재 tree.ts + content/ → 매니페스트 JSON 1차 변환
 *
 * 출력:
 *   scripts/migrate-output/tree-manifest.draft.json   매니페스트 초안
 *   scripts/migrate-output/migration-report.md         통계 리포트 (사람 검토용)
 *
 * 본 스크립트는 1회성 PoC. 출력은 사람이 검토 후 config/tree-manifest.json 으로 승격.
 */

import fs from 'fs';
import path from 'path';
import { navigationConfig } from '../lib/navigation/tree.ts';
import type { NavigationNode } from '../lib/types/index.ts';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');
const OUT_DIR = path.join(PROJECT_ROOT, 'scripts', 'migrate-output');
const TODAY = new Date().toISOString().slice(0, 10);

// ─────────────────────────────────────────────────────────────────────
// 1. 보조 함수
// ─────────────────────────────────────────────────────────────────────

interface NodeRecord {
  is_category: boolean;
  id: string;
  order_label: string;
  label: string;
  parent: string | null;
  status: 'active';
  created_at: string;
  retired_at: null;
  // leaf only
  content_path?: string;
  derived_from?: string[];
  merged_from?: string[];
  superseded_by?: null;
  icon?: string;
}

interface IdContext {
  used: Set<string>;
  pathToId: Map<string, string>;
}

/** kebab-slug 정규화 + 숫자 접두사 제거 */
function normalizeSlug(raw: string): string {
  let s = raw.toLowerCase();
  // "01-rate" → "rate"
  s = s.replace(/^\d+-/, '');
  // 영숫자/하이픈만 유지
  s = s.replace(/[^a-z0-9-]/g, '-');
  // 연속 하이픈 정리, 양끝 하이픈 제거
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return s;
}

/** 충돌 시 부모 prefix를 추가하며 unique ID 생성 */
function mintId(
  ctx: IdContext,
  segments: string[],
): string {
  // segments: 루트 → 자손 순. 마지막이 leaf segment.
  // 1) 마지막 segment만 시도
  // 2) 충돌 시 부모-자식 결합
  // 3) 계속 충돌 시 더 윗 부모 추가
  const normalized = segments.map(normalizeSlug).filter(Boolean);
  for (let depth = 1; depth <= normalized.length; depth++) {
    const candidate = normalized.slice(-depth).join('-');
    if (candidate && !ctx.used.has(candidate)) {
      ctx.used.add(candidate);
      return candidate;
    }
  }
  // 전체 path도 충돌 → 숫자 접미사
  const base = normalized.join('-');
  let i = 2;
  while (ctx.used.has(`${base}-${i}`)) i++;
  const final = `${base}-${i}`;
  ctx.used.add(final);
  return final;
}

/** menu path("/acquisition/exemption/rental-business")로 실 MDX 경로 찾기 */
function resolveContentPath(menuPath: string): string | null {
  // 첫 segment는 카테고리, 나머지는 슬러그
  const parts = menuPath.replace(/^\//, '').split('/');
  if (parts.length === 0) return null;

  // 카테고리 디렉토리 검색 시도
  const tryDirs = [
    path.join(CONTENT_DIR, ...parts),
  ];
  // 마지막 segment 중복 트릭 (e.g., /multi-house/multi-house)
  const last = parts[parts.length - 1];
  const slug = last;
  const dirParts = parts.slice(0, -1);
  const dir = path.join(CONTENT_DIR, ...dirParts);

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;

  const entries = fs.readdirSync(dir);
  // 가장 높은 버전 찾기
  const versionedFiles = entries
    .filter((f) => {
      const m = f.match(/^(.+)-v(\d+\.\d+)\.mdx$/);
      return m && m[1] === slug;
    })
    .sort()
    .reverse();
  if (versionedFiles.length === 0) return null;
  return path
    .relative(PROJECT_ROOT, path.join(dir, versionedFiles[0]))
    .replace(/\\/g, '/');
}

/** content/ 트리에서 모든 MDX 파일 수집 */
function collectAllMdxFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.mdx')) {
        out.push(path.relative(PROJECT_ROOT, full).replace(/\\/g, '/'));
      }
    }
  };
  walk(CONTENT_DIR);
  return out;
}

// ─────────────────────────────────────────────────────────────────────
// 2. 트리 순회 → 노드 레코드 생성
// ─────────────────────────────────────────────────────────────────────

const idCtx: IdContext = { used: new Set(), pathToId: new Map() };
const nodes: NodeRecord[] = [];
const deadMenuLinks: { menuPath: string; reason: string }[] = [];
const issues: string[] = [];

function traverse(
  key: string,
  node: NavigationNode,
  parentId: string | null,
  segmentsFromRoot: string[],
  siblingIndex: number,
  parentOrderLabel: string | null,
) {
  const segments = [...segmentsFromRoot, key];
  const isCategory = !!(node.isCategory || node.children);
  const id = mintId(idCtx, segments);
  const orderLabel = parentOrderLabel
    ? `${parentOrderLabel}.${siblingIndex}`
    : String(siblingIndex);

  // home, search 같은 메타 라우트는 카테고리로 등록하되 콘텐츠 매칭 안 함
  const isMetaRoute = key === 'home' || key === 'search';

  const rec: NodeRecord = {
    is_category: isCategory || isMetaRoute,
    id,
    order_label: orderLabel,
    label: node.label,
    parent: parentId,
    status: 'active',
    created_at: TODAY,
    retired_at: null,
  };
  if (node.icon) rec.icon = node.icon;

  if (!rec.is_category) {
    // leaf: content_path 해결
    const resolved = resolveContentPath(node.path);
    if (!resolved) {
      deadMenuLinks.push({
        menuPath: node.path,
        reason: 'MDX file not found',
      });
      issues.push(
        `[dead-link] menu '${id}' (path=${node.path}) → MDX not found`,
      );
    } else {
      rec.content_path = resolved;
      idCtx.pathToId.set(resolved, id);
    }
    rec.derived_from = [];
    rec.merged_from = [];
    rec.superseded_by = null;
  } else {
    // category: content_path는 안 부여하되, 카테고리 자체에 콘텐츠가 있는지 확인
    const resolved = resolveContentPath(node.path);
    if (resolved) {
      issues.push(
        `[category-with-content] '${id}' (path=${node.path}) has both children and MDX. ` +
          `Manual review needed: split into category + index leaf, or treat as leaf.`,
      );
    }
  }

  nodes.push(rec);

  if (node.children) {
    let i = 1;
    for (const [childKey, childNode] of Object.entries(node.children)) {
      traverse(childKey, childNode, id, segments, i, orderLabel);
      i++;
    }
  }
}

// 루트 순회: navigationConfig의 키 순서대로
let topIdx = 1;
for (const [key, node] of Object.entries(navigationConfig)) {
  traverse(key, node, null, [], topIdx, null);
  topIdx++;
}

// ─────────────────────────────────────────────────────────────────────
// 3. 고아 콘텐츠 식별
// ─────────────────────────────────────────────────────────────────────

const allMdx = collectAllMdxFiles();
const referencedPaths = new Set<string>();
for (const n of nodes) {
  if (n.content_path) referencedPaths.add(n.content_path);
}

const orphans = allMdx.filter((p) => !referencedPaths.has(p));

// ─────────────────────────────────────────────────────────────────────
// 4. 출력
// ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const manifest = {
  version: 0,
  updated_at: TODAY,
  nodes,
  redirects: {},
};

fs.writeFileSync(
  path.join(OUT_DIR, 'tree-manifest.draft.json'),
  JSON.stringify(manifest, null, 2),
  'utf-8',
);

// 리포트
const totalNodes = nodes.length;
const totalLeaves = nodes.filter((n) => !n.is_category).length;
const totalCategories = totalNodes - totalLeaves;
const leavesWithContent = nodes.filter((n) => !n.is_category && n.content_path).length;
const leavesWithoutContent = totalLeaves - leavesWithContent;

const report = `# 004 PoC 매니페스트 변환 리포트

생성: ${TODAY}
입력: lib/navigation/tree.ts + content/
출력: scripts/migrate-output/tree-manifest.draft.json

## 통계

| 항목 | 수 |
|---|---|
| 총 노드 | ${totalNodes} |
| 카테고리 | ${totalCategories} |
| 리프 (전체) | ${totalLeaves} |
| 리프 (MDX 매칭 성공) | ${leavesWithContent} |
| 리프 (MDX 매칭 실패 = 무효 메뉴) | ${leavesWithoutContent} |
| MDX 파일 (전체) | ${allMdx.length} |
| MDX 파일 (메뉴에 노출됨) | ${referencedPaths.size} |
| MDX 파일 (고아 = 메뉴에 없음) | ${orphans.length} |
| ID 충돌 해소 사례 | (스크립트가 자동 prefix 추가하여 해소) |
| 발견된 이슈 | ${issues.length} |

## 무효 메뉴 링크 (${deadMenuLinks.length}건)

${
  deadMenuLinks.length === 0
    ? '_없음_'
    : deadMenuLinks.map((d) => `- \`${d.menuPath}\` — ${d.reason}`).join('\n')
}

## 고아 MDX 파일 (${orphans.length}건)

${
  orphans.length === 0
    ? '_없음_'
    : orphans.map((o) => `- \`${o}\``).join('\n')
}

## 기타 이슈 (${issues.length}건)

${issues.length === 0 ? '_없음_' : issues.map((i) => `- ${i}`).join('\n')}

## 다음 단계 (사람 검토)

1. \`tree-manifest.draft.json\` 의 ID 명명 검토 — 자동 생성 ID가 의미 있는지
2. order_label 적정성 검토 — 자동 부여된 시퀀스가 실제 표시 순서와 일치하는지
3. 무효 메뉴 링크 처리 결정 — 매니페스트에서 제외할지, 빈 슬롯 생성할지
4. 고아 MDX 처리 결정 — 매니페스트에 추가(메뉴 노출)할지, archived/로 이동할지
5. 카테고리-with-content 충돌 해소 — 카테고리 + 인덱스 leaf 분리
6. 검토 완료 후 \`config/tree-manifest.json\` 으로 승격
`;

fs.writeFileSync(
  path.join(OUT_DIR, 'migration-report.md'),
  report,
  'utf-8',
);

// ─────────────────────────────────────────────────────────────────────
// 5. 콘솔 요약
// ─────────────────────────────────────────────────────────────────────

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('004 PoC 매니페스트 변환 완료');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`총 노드: ${totalNodes} (카테고리 ${totalCategories} + 리프 ${totalLeaves})`);
console.log(`MDX 매칭: ${leavesWithContent}/${totalLeaves} 리프`);
console.log(`무효 메뉴 링크: ${deadMenuLinks.length}건`);
console.log(`고아 MDX: ${orphans.length}건`);
console.log(`기타 이슈: ${issues.length}건`);
console.log('');
console.log(`출력: scripts/migrate-output/tree-manifest.draft.json`);
console.log(`리포트: scripts/migrate-output/migration-report.md`);
