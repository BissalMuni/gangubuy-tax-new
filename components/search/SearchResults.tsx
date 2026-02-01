'use client';

import { List, Tag, Typography } from 'antd';
import Link from 'next/link';
import type { SearchResult } from '@/lib/types';

const { Text, Paragraph } = Typography;

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

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
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <Text type="secondary">
          &quot;{query}&quot;에 대한 검색 결과가 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={results}
      renderItem={(item) => (
        <List.Item>
          <Link href={item.path} style={{ textDecoration: 'none' }}>
            <div>
              <Text strong style={{ fontSize: 16 }}>
                {highlightText(item.title, query)}
              </Text>
              <Tag color="blue" style={{ marginLeft: 8 }}>
                {item.category}
              </Tag>
            </div>
            <Paragraph
              type="secondary"
              style={{ marginTop: 4, marginBottom: 0 }}
            >
              {highlightText(item.snippet, query)}
            </Paragraph>
          </Link>
        </List.Item>
      )}
    />
  );
}
