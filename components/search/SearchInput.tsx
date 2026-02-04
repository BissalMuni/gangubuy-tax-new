'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  loading?: boolean;
}

export function SearchInput({ value, onChange, onSearch, loading }: SearchInputProps) {
  return (
    <Search
      placeholder="검색어를 입력하세요"
      allowClear
      enterButton={<SearchOutlined />}
      size="large"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSearch={onSearch}
      loading={loading}
      style={{ maxWidth: 600 }}
    />
  );
}
