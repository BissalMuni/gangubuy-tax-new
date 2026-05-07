'use client';

import Link from 'next/link';
import type { SearchResult } from '@/lib/types';

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} style={{ backgroundColor: '#fff566', padding: 0 }}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0 && query) {
    return (
      <div role="status" aria-live="polite" className="py-12 text-center">
        <span className="text-gray-500">
          &quot;{query}&quot;에 대한 검색 결과가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div role="region" aria-label={`검색 결과 ${results.length}건`} aria-live="polite">
      {results.map((item) => (
        <div key={item.path} className="border-b border-gray-100 py-3">
          <Link href={item.path} className="no-underline">
            <div>
              <span className="text-base font-semibold">
                {highlightText(item.title, query)}
              </span>
              <span className="ml-2 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                {item.category}
              </span>
            </div>
            <p className="mb-0 mt-1 text-sm text-gray-500">
              {highlightText(item.snippet, query)}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}
