import React from 'react';
import { Card, Tag, Typography, Flex } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Text } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  BookOutlined: <BookOutlined />,
};

interface ReferencesProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

interface ReferenceProps {
  law: string;
  article: string;
  title: string;
  description?: string;
}

export const References: React.FC<ReferencesProps> = ({ title, icon, children }) => {
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
      <Flex vertical gap={8} style={{ width: '100%' }}>
        {children}
      </Flex>
    </Card>
  );
};

export const Reference: React.FC<ReferenceProps> = ({ law, article, title, description }) => {
  const lawUrl = `https://www.law.go.kr/법령/${encodeURIComponent(law)}/${encodeURIComponent(article)}`;

  return (
    <a href={lawUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card
        size="small"
        style={{ background: '#fafafa', cursor: 'pointer' }}
        hoverable
      >
        <Flex vertical gap={2} style={{ width: '100%' }}>
          <Flex align="center" gap={8} wrap="wrap">
            <Tag color="blue" style={{ fontSize: 12 }}>{law}</Tag>
            <Text strong style={{ fontSize: 14 }}>{article}</Text>
          </Flex>
          <div style={{ fontSize: 14, wordBreak: 'keep-all' }}>{title}</div>
          {description && (
            <div style={{ fontSize: 12, color: '#666', wordBreak: 'keep-all' }}>{description}</div>
          )}
        </Flex>
      </Card>
    </a>
  );
};
