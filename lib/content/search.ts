import { Index as FlexSearchIndex } from 'flexsearch';
import { getMdxFiles, readMdxFile, getContentPath } from './loader';
import { getContentDir } from './loader';
import type { SearchResult, TaxCategory } from '@/lib/types';
import { navigationConfig } from '@/lib/navigation/nav.config';
import type { NavigationNode } from '@/lib/types';

interface SearchDocument {
  id: string;
  title: string;
  category: string;
  path: string;
  body: string;
}

// Find label from nav config for a given path
function findNavLabel(path: string, node?: NavigationNode): string | null {
  if (!node) {
    for (const n of Object.values(navigationConfig)) {
      const found = findNavLabel(path, n);
      if (found) return found;
    }
    return null;
  }
  if (node.path === path) return node.label;
  if (node.children) {
    for (const child of Object.values(node.children)) {
      const found = findNavLabel(path, child);
      if (found) return found;
    }
  }
  return null;
}

const CATEGORIES: TaxCategory[] = ['acquisition', 'property', 'vehicle'];

let indexInstance: FlexSearchIndex | null = null;
let documentsMap: Map<number, SearchDocument> = new Map();

function buildIndex() {
  if (indexInstance) return;

  indexInstance = new FlexSearchIndex({
    tokenize: 'forward',
    resolution: 9,
  });
  documentsMap = new Map();

  let docId = 0;

  for (const category of CATEGORIES) {
    const dir = getContentDir(category);
    const files = getMdxFiles(dir);

    for (const file of files) {
      const { meta, rawSource } = readMdxFile(file);
      const contentPath = getContentPath(file);
      // Build URL path: "acquisition/themes/multi-house" → "/acquisition/themes/multi-house"
      const urlPath = `/${contentPath}`;

      const doc: SearchDocument = {
        id: contentPath,
        title: meta.title,
        category: findNavLabel(`/${category}`) || category,
        path: urlPath,
        body: rawSource,
      };

      documentsMap.set(docId, doc);
      // Index title + body together
      indexInstance.add(docId, `${doc.title} ${doc.body}`);
      docId++;
    }
  }
}

export function searchContent(query: string, limit = 20): SearchResult[] {
  buildIndex();
  if (!indexInstance || !query.trim()) return [];

  const results = indexInstance.search(query, { limit });

  return (results as number[]).map((id) => {
    const doc = documentsMap.get(id)!;
    // Extract snippet around the first match
    const lowerBody = doc.body.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIdx = lowerBody.indexOf(lowerQuery);
    let snippet = '';

    if (matchIdx >= 0) {
      const start = Math.max(0, matchIdx - 40);
      const end = Math.min(doc.body.length, matchIdx + query.length + 80);
      snippet =
        (start > 0 ? '...' : '') +
        doc.body.slice(start, end).replace(/\n/g, ' ').trim() +
        (end < doc.body.length ? '...' : '');
    } else {
      snippet = doc.body.slice(0, 120).replace(/\n/g, ' ').trim() + '...';
    }

    return {
      id: doc.id,
      title: doc.title,
      category: doc.category,
      path: doc.path,
      snippet,
      score: 1,
    };
  });
}

/**
 * Reset the search index (useful for testing or when content changes)
 */
export function resetSearchIndex() {
  indexInstance = null;
  documentsMap = new Map();
}
