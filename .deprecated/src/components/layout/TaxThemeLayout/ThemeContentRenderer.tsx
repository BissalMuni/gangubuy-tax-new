import React from 'react';
import { Card, Typography, Tag, Flex } from 'antd';
import { TeamOutlined, CalendarOutlined, GiftOutlined, HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import { MDXProvider } from '@/components/mdx';
import { taxThemeContent, TaxThemeKey } from '@/content/tax_theme';

const { Title, Text } = Typography;

interface ThemeContentRendererProps {
  contentKey: string;
  isMobile: boolean;
}

// 콘텐츠 키에 따른 아이콘 매핑
const getIconByKey = (key: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'family-trade': <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
    'family-gift': <GiftOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
    'reconstruction': <HomeOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
    'tax-standard': <FileTextOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
  };
  return iconMap[key] || <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
};

const ThemeContentRenderer: React.FC<ThemeContentRendererProps> = ({
  contentKey,
  isMobile,
}) => {
  const themeData = taxThemeContent[contentKey as TaxThemeKey];

  if (!themeData) {
    return (
      <Card>
        <Text type="secondary">콘텐츠를 찾을 수 없습니다.</Text>
      </Card>
    );
  }

  const { Component, meta } = themeData;

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <Flex vertical gap={8} style={{ width: '100%' }}>
        {/* 간략한 헤더 */}
        <Card size="small" styles={{ body: { padding: 12 } }}>
          <Flex align="center" gap={8}>
            {getIconByKey(contentKey)}
            <div style={{ flex: 1 }}>
              <Flex align="center" gap={6} wrap="wrap">
                <Title level={5} style={{ margin: 0, wordBreak: 'keep-all' }}>{meta.title}</Title>
                <Tag color="blue" style={{ margin: 0 }}>취득세</Tag>
              </Flex>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {meta.lastUpdated}
              </Text>
            </div>
          </Flex>
        </Card>

        {/* MDX 콘텐츠 */}
        <Card size="small">
          <MDXProvider>
            <Component />
          </MDXProvider>
        </Card>
      </Flex>
    );
  }

  // 데스크탑 레이아웃
  return (
    <Flex vertical gap={16} style={{ width: '100%' }}>
      {/* 헤더 */}
      <Card>
        <Flex align="flex-start" gap={16}>
          {React.cloneElement(getIconByKey(contentKey) as React.ReactElement, {
            style: { fontSize: 48, color: (getIconByKey(contentKey) as React.ReactElement).props.style?.color || '#1890ff', flexShrink: 0 }
          })}
          <div style={{ flex: 1 }}>
            <Flex align="center" gap={8} wrap="wrap">
              <Title level={2} style={{ margin: 0 }}>{meta.title}</Title>
              <Tag color="blue">{meta.category === 'acquisition' ? '취득세' : meta.category}</Tag>
            </Flex>
            <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
              {meta.description}
            </Text>
            <Flex align="center" gap={8} style={{ marginTop: 8 }}>
              <CalendarOutlined />
              <Text type="secondary">최종 업데이트: {meta.lastUpdated}</Text>
              <Tag>v{meta.version}</Tag>
            </Flex>
          </div>
        </Flex>
      </Card>

      {/* MDX 콘텐츠 */}
      <Card>
        <MDXProvider>
          <Component />
        </MDXProvider>
      </Card>
    </Flex>
  );
};

export default ThemeContentRenderer;
