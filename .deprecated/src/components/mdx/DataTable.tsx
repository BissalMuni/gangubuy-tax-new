import React from 'react';
import { Card, Table, Tag, Typography, Flex } from 'antd';
import {
  TeamOutlined,
  PercentageOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';

const { Text, Link } = Typography;

// 마크다운 링크 [text](url)을 React 요소로 변환
const parseMarkdownLinks = (text: string): React.ReactNode => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link key={match.index} href={match[2]} target="_blank">
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const iconMap: Record<string, React.ReactNode> = {
  TeamOutlined: <TeamOutlined />,
  PercentageOutlined: <PercentageOutlined />,
  UsergroupDeleteOutlined: <UsergroupDeleteOutlined />,
};

interface Column {
  key: string;
  title: string;
  width?: string;
}

interface Row {
  [key: string]: string | boolean | number | undefined;
  highlight?: boolean;
}

interface DataTableProps {
  title: string;
  icon?: string;
  columns: Column[];
  rows: Row[];
}

export const DataTable: React.FC<DataTableProps> = ({ title, icon, columns, rows }) => {
  const tableColumns = columns.map((col) => ({
    title: col.title,
    dataIndex: col.key,
    key: col.key,
    width: col.width,
    render: (text: string, record: Row) => {
      if (col.key === 'included') {
        return text === 'O' ? (
          <Tag color="green">O</Tag>
        ) : (
          <Tag color="red">X</Tag>
        );
      }
      const parsedText = typeof text === 'string' ? parseMarkdownLinks(text) : text;
      if (record.highlight) {
        return <Text strong style={{ color: '#1890ff', fontSize: 14 }}>{parsedText}</Text>;
      }
      return <span style={{ fontSize: 14, wordBreak: 'keep-all' }}>{parsedText}</span>;
    },
  }));

  const dataSource = rows.map((row, idx) => ({
    key: idx,
    ...row,
  }));

  return (
    <Card
      size="small"
      title={
        <Flex align="center" gap={8}>
          {icon && iconMap[icon]}
          <span style={{ fontSize: 16 }}>{title}</span>
        </Flex>
      }
      style={{ marginBottom: 16 }}
    >
      <Table
        columns={tableColumns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        bordered
      />
    </Card>
  );
};
