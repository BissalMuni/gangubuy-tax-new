'use client';

import { useState, useCallback } from 'react';
import { Typography } from 'antd';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import type { SearchResult } from '@/lib/types';

const { Title } = Typography;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>
      <Title level={3}>검색</Title>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />
      <div style={{ marginTop: 24 }}>
        {searched && (
          <SearchResults results={results} query={query} />
        )}
      </div>
    </div>
  );
}
