import React from 'react';
import { Card, Tag, Typography, Flex, Alert } from 'antd';
import { CheckCircleOutlined, FolderOutlined, LinkOutlined } from '@ant-design/icons';

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
  CheckCircleOutlined: <CheckCircleOutlined />,
  FolderOutlined: <FolderOutlined />,
};

interface ListProps {
  title: string;
  icon?: string;
  variant?: 'numbered' | 'bullet';
  legalLink?: string;
  children: React.ReactNode;
}

interface ListItemProps {
  title?: string;
  text?: string;
  description?: string;
  legalBasis?: string;
  note?: string;
  children?: React.ReactNode;
}

interface ListContextType {
  variant: 'numbered' | 'bullet';
  index: number;
}

const ListContext = React.createContext<ListContextType>({ variant: 'bullet', index: 0 });

export const List: React.FC<ListProps> = ({ title, icon, variant = 'bullet', legalLink, children }) => {
  const childArray = React.Children.toArray(children);

  return (
    <Card
      size="small"
      title={
        <Flex align="center" gap={8}>
          {icon && iconMap[icon]}
          {legalLink ? (
            <Link
              href={legalLink}
              target="_blank"
              style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {title} <LinkOutlined style={{ fontSize: 12 }} />
            </Link>
          ) : (
            <span style={{ fontSize: 16 }}>{title}</span>
          )}
        </Flex>
      }
      style={{ marginBottom: 16 }}
    >
      <Flex vertical gap={12} style={{ width: '100%' }}>
        {childArray.map((child, idx) => (
          <ListContext.Provider key={idx} value={{ variant, index: idx }}>
            {child}
          </ListContext.Provider>
        ))}
      </Flex>
    </Card>
  );
};

export const ListItem: React.FC<ListItemProps> = ({
  title,
  text,
  description,
  legalBasis,
  note,
  children,
}) => {
  const { variant, index } = React.useContext(ListContext);

  return (
    <div style={{ width: '100%' }}>
      <Flex vertical gap={4} style={{ width: '100%' }}>
        <Flex align="center" gap={8} wrap="wrap">
          {variant === 'numbered' && <Tag color="blue">{index + 1}</Tag>}
          <Text strong style={{ fontSize: 14, wordBreak: 'keep-all' }}>
            {title || text}
          </Text>
        </Flex>
        {description && (
          <div
            style={{
              marginLeft: variant === 'numbered' ? 32 : 0,
              fontSize: 14,
              color: '#666',
              wordBreak: 'keep-all',
              lineHeight: 1.5,
            }}
          >
            {parseMarkdownLinks(description)}
          </div>
        )}
        {legalBasis && (
          <div
            style={{
              fontSize: 12,
              marginLeft: variant === 'numbered' ? 32 : 0,
              color: '#999',
            }}
          >
            ({legalBasis})
          </div>
        )}
        {note && (
          <Alert
            type="info"
            message={<div style={{ wordBreak: 'keep-all', lineHeight: 1.5 }}>{note}</div>}
            showIcon
            style={{
              marginLeft: variant === 'numbered' ? 32 : 0,
              fontSize: 14,
              width: 'auto',
            }}
          />
        )}
        {children && (
          <ul style={{ marginLeft: 48, marginTop: 4, paddingLeft: 16, marginBottom: 0 }}>
            {children}
          </ul>
        )}
      </Flex>
    </div>
  );
};

export const SubItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li style={{ fontSize: 14, wordBreak: 'keep-all', lineHeight: 1.6 }}>{children}</li>
);
