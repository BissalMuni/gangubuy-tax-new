import type { Book, TreeNode } from "@/book/types";

/** kebab-case → camelCase ("corp-acquisition-tax" → "corpAcquisitionTax") */
export function toCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/** kebab-case → PascalCase ("corp-acquisition-tax" → "CorpAcquisitionTax") */
export function toPascalCase(kebab: string): string {
  const camel = toCamelCase(kebab);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/** src/basket/{id}.ts — 바구니 정의 */
export function genBasketFile(id: string, title: string, bookIds: string[]): string {
  const camel = toCamelCase(id);
  const bookIdsStr = bookIds.map((b) => `"${b}"`).join(", ");
  return `import type { Basket } from "./types";

export const ${camel}Basket: Basket = {
  id: "${id}",
  title: "${title}",
  bookIds: [${bookIdsStr}],
};
`;
}

/** src/book/data/{id}.json — 책 트리 직렬화 (2-space pretty print + 후행 개행) */
export function genBookDataJson(book: Book): string {
  return JSON.stringify(book, null, 2) + "\n";
}

/** src/content/.../{slug}.tsx — leaf 콘텐츠 빈 스켈레톤 (CONVENTION_CONTENT.md 준수) */
export function genLeafTsx(slug: string): string {
  const componentName = toPascalCase(slug);
  return `"use client";

import { CalcBox } from "@/components/content/shared";

export default function ${componentName}() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 준비 중">
        <p>이 단원의 내용을 작성해 주세요.</p>
      </CalcBox>
    </div>
  );
}
`;
}

/** 트리에서 모든 leaf 노드의 id를 재귀적으로 수집 */
export function collectLeafIds(nodes: TreeNode[]): Set<string> {
  const ids = new Set<string>();
  const walk = (ns: TreeNode[]) => {
    for (const n of ns) {
      if (!n.children || n.children.length === 0) {
        ids.add(n.id);
      } else {
        walk(n.children);
      }
    }
  };
  walk(nodes);
  return ids;
}

/** 트리에서 모든 leaf 노드를 슬러그 경로와 함께 수집 */
export function collectLeavesWithPath(
  nodes: TreeNode[],
): { id: string; slug: string; slugPath: string[] }[] {
  const leaves: { id: string; slug: string; slugPath: string[] }[] = [];
  const walk = (ns: TreeNode[], parentSlugs: string[]) => {
    for (const n of ns) {
      const slugs = [...parentSlugs, n.slug];
      if (!n.children || n.children.length === 0) {
        leaves.push({ id: n.id, slug: n.slug, slugPath: slugs });
      } else {
        walk(n.children, slugs);
      }
    }
  };
  walk(nodes, []);
  return leaves;
}

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DEPTH = 5;

/** 트리 노드 검증 — 컨벤션 (kebab id/slug, 형제 slug 유일, 깊이 ≤ 5) */
export function validateBookTree(book: Book): { ok: true } | { ok: false; error: string } {
  if (!book.id || !book.basePath || !book.title) {
    return { ok: false, error: "책의 id/basePath/title이 필요합니다" };
  }
  if (!KEBAB.test(book.id)) {
    return { ok: false, error: `책 id는 kebab-case만 허용: ${book.id}` };
  }

  const seenIds = new Set<string>();
  return walk(book.children ?? [], 2, seenIds);
}

function walk(
  nodes: TreeNode[],
  depth: number,
  seenIds: Set<string>,
): { ok: true } | { ok: false; error: string } {
  if (depth > MAX_DEPTH) {
    return { ok: false, error: `최대 깊이(${MAX_DEPTH}) 초과` };
  }

  const siblingSlugs = new Set<string>();
  for (const node of nodes) {
    if (!node.id || !node.slug || !node.title) {
      return { ok: false, error: `노드에 id/slug/title 누락` };
    }
    if (!KEBAB.test(node.id)) {
      return { ok: false, error: `노드 id는 kebab-case만 허용: ${node.id}` };
    }
    if (!KEBAB.test(node.slug)) {
      return { ok: false, error: `노드 slug는 kebab-case만 허용: ${node.slug}` };
    }
    if (seenIds.has(node.id)) {
      return { ok: false, error: `중복 노드 id: ${node.id}` };
    }
    seenIds.add(node.id);
    if (siblingSlugs.has(node.slug)) {
      return { ok: false, error: `형제 노드 간 slug 중복: ${node.slug}` };
    }
    siblingSlugs.add(node.slug);

    if (node.children && node.children.length > 0) {
      const sub = walk(node.children, depth + 1, seenIds);
      if (!sub.ok) return sub;
    }
  }
  return { ok: true };
}

/** src/basket/index.ts — 전체 재생성 */
export function genBasketIndex(baskets: { id: string }[]): string {
  const imports = baskets.map((b) => {
    const camel = toCamelCase(b.id);
    return `import { ${camel}Basket } from "./${b.id}";`;
  });

  const allBasketsArray = baskets
    .map((b) => `${toCamelCase(b.id)}Basket`)
    .join(", ");

  return `export type { Basket } from "./types";

${imports.join("\n")}
import type { Basket } from "./types";

/** 모든 바구니 */
export const allBaskets: Basket[] = [${allBasketsArray}];

/** ID로 바구니 찾기 */
export function getBasketById(id: string): Basket | undefined {
  return allBaskets.find((b) => b.id === id);
}

/** 특정 책이 속한 바구니 목록 */
export function getBasketsForBook(bookId: string): Basket[] {
  return allBaskets.filter((b) => b.bookIds.includes(bookId));
}
`;
}
