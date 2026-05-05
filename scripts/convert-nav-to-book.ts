/**
 * nav.config.ts → book JSON 변환 스크립트
 * path 기반으로 트리 구조를 정확히 생성
 * 실행: npx tsx scripts/convert-nav-to-book.ts
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

interface NavigationNode {
  label: string;
  path: string;
  icon?: string;
  children?: Record<string, NavigationNode>;
  isCategory?: boolean;
}

interface TreeNodeJson {
  id: string;
  slug: string;
  title: string;
  children?: TreeNodeJson[];
}

interface BookJson {
  id: string;
  basePath: string;
  title: string;
  description: string;
  children: TreeNodeJson[];
}

const CATEGORIES = ['acquisition', 'corp-acquisition-tax', 'property', 'vehicle'] as const;

const DESCRIPTIONS: Record<string, string> = {
  acquisition: '부동산, 차량 등 취득 시 부과되는 세금',
  'corp-acquisition-tax': '법인의 부동산 취득 시 부과되는 세금',
  property: '보유 부동산에 대해 부과되는 세금',
  vehicle: '자동차 소유에 대해 부과되는 세금',
};

const ID_PREFIX: Record<string, string> = {
  acquisition: 'acq',
  'corp-acquisition-tax': 'corp',
  property: 'prop',
  vehicle: 'veh',
};

/** leaf 목록 수집: {path, label} 쌍 */
interface LeafInfo {
  slugParts: string[]; // category 제외한 slug 배열
  label: string;
}

function collectLeaves(node: NavigationNode, category: string): LeafInfo[] {
  const leaves: LeafInfo[] = [];

  function walk(n: NavigationNode) {
    if (n.isCategory && n.children) {
      for (const child of Object.values(n.children)) {
        walk(child);
      }
    } else if (n.children) {
      // isCategory 없지만 children 있는 경우 (중간 노드)
      for (const child of Object.values(n.children)) {
        walk(child);
      }
    } else {
      // leaf 노드 — path에서 slug 추출
      const parts = n.path.split('/').filter(Boolean);
      // 첫 번째 세그먼트는 category, 나머지가 slug parts
      const slugParts = parts.slice(1);
      if (slugParts.length > 0) {
        leaves.push({ slugParts, label: n.label });
      }
    }
  }

  walk(node);
  return leaves;
}

/** slug parts 배열에서 트리 구조 생성 */
function buildTree(leaves: LeafInfo[], prefix: string): TreeNodeJson[] {
  // 중간 노드 → children map
  const rootChildren: Map<string, { node: TreeNodeJson; subLeaves: LeafInfo[] }> = new Map();
  const directLeaves: LeafInfo[] = [];

  for (const leaf of leaves) {
    if (leaf.slugParts.length === 1) {
      // 직접 leaf (부모 없이 단독)
      directLeaves.push(leaf);
    } else {
      // 첫 slug가 중간 노드
      const firstSlug = leaf.slugParts[0];
      if (!rootChildren.has(firstSlug)) {
        rootChildren.set(firstSlug, {
          node: {
            id: `${prefix}-${firstSlug}`,
            slug: firstSlug,
            title: firstSlug, // 나중에 업데이트
            children: [],
          },
          subLeaves: [],
        });
      }
      rootChildren.get(firstSlug)!.subLeaves.push({
        slugParts: leaf.slugParts.slice(1),
        label: leaf.label,
      });
    }
  }

  const result: TreeNodeJson[] = [];

  // 직접 leaf 추가
  for (const leaf of directLeaves) {
    result.push({
      id: `${prefix}-${leaf.slugParts[0]}`,
      slug: leaf.slugParts[0],
      title: leaf.label,
    });
  }

  // 중간 노드 재귀 처리
  for (const [slug, { node, subLeaves }] of rootChildren) {
    const childPrefix = `${prefix}-${slug}`;
    const children = buildTree(subLeaves, childPrefix);

    // 중간 노드의 title 결정:
    // 자식이 1개이고 slug가 부모와 같으면 → 자식의 label을 부모에도 사용
    if (children.length === 1 && children[0].slug === slug) {
      node.title = children[0].title;
    } else {
      // slug를 title로 사용 (후에 수동 수정 가능)
      node.title = slug;
    }

    node.children = children;
    result.push(node);
  }

  return result;
}

/** nav.config의 isCategory 노드에서 제목 수집 */
function collectCategoryTitles(
  node: NavigationNode,
  titles: Map<string, string>,
  pathPrefix: string,
) {
  if (node.children) {
    for (const [key, child] of Object.entries(node.children)) {
      const childPath = `${pathPrefix}-${key}`;
      if (child.isCategory || child.children) {
        titles.set(key, child.label);
        collectCategoryTitles(child, titles, childPath);
      }
    }
  }
}

/** 트리의 중간 노드에 올바른 title 적용 */
function applyTitles(nodes: TreeNodeJson[], titles: Map<string, string>) {
  for (const node of nodes) {
    if (node.children) {
      const title = titles.get(node.slug);
      if (title) {
        node.title = title;
      }
      applyTitles(node.children, titles);
    }
  }
}

function countLeaves(nodes: TreeNodeJson[]): number {
  return nodes.reduce((sum, n) => {
    if (n.children) return sum + countLeaves(n.children);
    return sum + 1;
  }, 0);
}

async function main() {
  const configPath = path.resolve(__dirname, '../lib/navigation/nav.config.ts');
  const mod = await import(pathToFileURL(configPath).href);
  const config: Record<string, NavigationNode> = mod.navigationConfig;

  const outputDir = path.resolve(__dirname, '../lib/book/data');
  fs.mkdirSync(outputDir, { recursive: true });

  let totalLeaves = 0;

  for (const category of CATEGORIES) {
    const node = config[category];
    const prefix = ID_PREFIX[category];

    if (!node || !node.children) {
      const book: BookJson = {
        id: category,
        basePath: category,
        title: node?.label || category,
        description: DESCRIPTIONS[category] || '',
        children: [],
      };
      fs.writeFileSync(
        path.join(outputDir, `${category}.json`),
        JSON.stringify(book, null, 2) + '\n',
      );
      console.log(`⚠ ${category}: 콘텐츠 없음, 빈 book 생성`);
      continue;
    }

    // 1) leaf 수집 (path 기반)
    const leaves = collectLeaves(node, category);

    // 2) 트리 구조 생성
    const children = buildTree(leaves, prefix);

    // 3) 카테고리 제목 적용
    const titles = new Map<string, string>();
    collectCategoryTitles(node, titles, prefix);
    applyTitles(children, titles);

    const book: BookJson = {
      id: category,
      basePath: category,
      title: node.label,
      description: DESCRIPTIONS[category] || '',
      children,
    };

    const outPath = path.join(outputDir, `${category}.json`);
    fs.writeFileSync(outPath, JSON.stringify(book, null, 2) + '\n');

    const leafCount = countLeaves(children);
    totalLeaves += leafCount;
    console.log(`✓ ${category}: ${leafCount} leaves → ${outPath}`);
  }

  console.log(`\n총 ${totalLeaves} leaf 노드 변환 완료`);
}

main().catch(console.error);
