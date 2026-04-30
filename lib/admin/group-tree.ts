import { navigationConfig } from '@/lib/navigation/tree';
import type { NavigationNode } from '@/lib/types';
import type { Comment, Attachment } from '@/lib/types';

/**
 * `lib/navigation/tree.ts`의 트리에 따라 변경 항목을 메뉴 그룹으로 분류한다.
 * 매핑되지 않는 경로는 '기타' 그룹으로 묶는다.
 */

export interface GroupNode {
  /** 트리 경로 (예: 'acquisition/exemption/rental-business') */
  key: string;
  label: string;
  /** 자식 그룹 */
  children: GroupNode[];
  /** 이 그룹에 직접 속하는 항목 */
  comments: Comment[];
  attachments: Attachment[];
  /** 하위까지 합친 총 카운트 */
  totalComments: number;
  totalAttachments: number;
}

const OTHER_KEY = '__other__';

interface FlatEntry {
  key: string;
  label: string;
  fullPath: string; // content_path와 매칭할 prefix
}

function flattenNavigation(
  nodes: Record<string, NavigationNode> | undefined,
  parentKey: string,
  parentPath: string,
  out: FlatEntry[],
): void {
  if (!nodes) return;
  for (const [k, node] of Object.entries(nodes)) {
    const key = parentKey ? `${parentKey}/${k}` : k;
    // path가 '/foo/bar' 형식 → content_path 매칭은 'foo/bar' 형식
    const stripped = node.path.startsWith('/') ? node.path.slice(1) : node.path;
    const entry: FlatEntry = { key, label: node.label, fullPath: stripped };
    out.push(entry);
    if (node.children) {
      flattenNavigation(node.children, key, stripped, out);
    }
    void parentPath;
  }
}

function buildFlatEntries(): FlatEntry[] {
  const out: FlatEntry[] = [];
  for (const [topKey, topNode] of Object.entries(navigationConfig)) {
    const stripped = topNode.path.startsWith('/') ? topNode.path.slice(1) : topNode.path;
    out.push({ key: topKey, label: topNode.label, fullPath: stripped || topKey });
    if (topNode.children) {
      flattenNavigation(topNode.children, topKey, stripped, out);
    }
  }
  return out;
}

/**
 * content_path에 가장 잘 매칭되는 트리 항목 key를 찾는다.
 * 가장 긴 prefix 매칭을 우선.
 */
export function matchPathToKey(contentPath: string, entries: FlatEntry[]): string {
  let bestKey = OTHER_KEY;
  let bestLen = 0;
  for (const entry of entries) {
    if (entry.fullPath && contentPath.startsWith(entry.fullPath) && entry.fullPath.length > bestLen) {
      bestKey = entry.key;
      bestLen = entry.fullPath.length;
    }
  }
  return bestKey;
}

/**
 * 항목들을 트리 그룹으로 묶는다.
 * 각 키('acquisition/exemption/rental-business' 등)별로 직접 카운트 + 하위 누적 카운트.
 */
export function groupByMenuPath(
  comments: Comment[],
  attachments: Attachment[],
): GroupNode[] {
  const entries = buildFlatEntries();
  const groups = new Map<string, GroupNode>();

  function ensureGroup(key: string, label: string): GroupNode {
    let g = groups.get(key);
    if (!g) {
      g = {
        key,
        label,
        children: [],
        comments: [],
        attachments: [],
        totalComments: 0,
        totalAttachments: 0,
      };
      groups.set(key, g);
    }
    return g;
  }

  // 모든 트리 노드를 미리 그룹으로 등록
  for (const entry of entries) {
    ensureGroup(entry.key, entry.label);
  }
  ensureGroup(OTHER_KEY, '기타');

  // 항목들을 가장 가까운 노드에 배치
  for (const c of comments) {
    const key = matchPathToKey(c.content_path, entries);
    const g = ensureGroup(key, key === OTHER_KEY ? '기타' : key);
    g.comments.push(c);
  }
  for (const a of attachments) {
    const key = matchPathToKey(a.content_path, entries);
    const g = ensureGroup(key, key === OTHER_KEY ? '기타' : key);
    g.attachments.push(a);
  }

  // 트리 구조로 children 매핑
  for (const entry of entries) {
    if (entry.key.includes('/')) {
      const parentKey = entry.key.slice(0, entry.key.lastIndexOf('/'));
      const parent = groups.get(parentKey);
      const child = groups.get(entry.key);
      if (parent && child && !parent.children.includes(child)) {
        parent.children.push(child);
      }
    }
  }

  // 하위 누적 카운트 계산 (재귀)
  function computeTotals(node: GroupNode): { c: number; a: number } {
    let c = node.comments.length;
    let a = node.attachments.length;
    for (const child of node.children) {
      const sub = computeTotals(child);
      c += sub.c;
      a += sub.a;
    }
    node.totalComments = c;
    node.totalAttachments = a;
    return { c, a };
  }

  // 최상위만 컴퓨팅
  const topKeys = Array.from(groups.keys()).filter((k) => !k.includes('/'));
  const topGroups: GroupNode[] = [];
  for (const tk of topKeys) {
    const g = groups.get(tk);
    if (!g) continue;
    computeTotals(g);
    if (g.totalComments > 0 || g.totalAttachments > 0 || tk !== OTHER_KEY) {
      topGroups.push(g);
    }
  }

  // 카운트 0인 빈 그룹 제거 (루트 레벨에서)
  return topGroups.filter((g) => g.totalComments + g.totalAttachments > 0);
}
