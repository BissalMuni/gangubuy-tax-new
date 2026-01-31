import React from 'react';
import { Card, Typography, Flex, Row, Col } from 'antd';
import { DiffOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  DiffOutlined: <DiffOutlined />,
};

interface ComparisonProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

interface ComparisonItemProps {
  title: string;
  value: string;
  description: string;
  legalBasis?: string;
  variant: 'primary' | 'secondary';
}

export const Comparison: React.FC<ComparisonProps> = ({ title, icon, children }) => {
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
      <Row gutter={[16, 16]}>
        {children}
      </Row>
    </Card>
  );
};

export const ComparisonItem: React.FC<ComparisonItemProps> = ({
  title,
  value,
  description,
  legalBasis,
  variant,
}) => (
  <Col xs={24} sm={12}>
    <Card
      size="small"
      style={{
        borderColor: variant === 'primary' ? '#1890ff' : '#722ed1',
        borderWidth: 2,
      }}
    >
      <Flex vertical gap={4}>
        <Text strong style={{ color: variant === 'primary' ? '#1890ff' : '#722ed1', fontSize: 14 }}>
          {title}
        </Text>
        <Title level={4} style={{ margin: 0 }}>{value}</Title>
        <Text type="secondary" style={{ fontSize: 14, wordBreak: 'keep-all' }}>{description}</Text>
        {legalBasis && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({legalBasis})
          </Text>
        )}
      </Flex>
    </Card>
  </Col>
);
