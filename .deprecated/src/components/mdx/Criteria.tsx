import React from 'react';
import { Card, Tag, Typography, Flex, Alert, Row, Col } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  CalculatorOutlined: <CalculatorOutlined />,
};

interface CriteriaProps {
  title: string;
  icon?: string;
  description: string;
  legalBasis?: string;
  note?: string;
  children: React.ReactNode;
}

interface ConditionProps {
  condition: string;
  result: string;
  type: 'positive' | 'negative';
}

export const Criteria: React.FC<CriteriaProps> = ({
  title,
  icon,
  description,
  legalBasis,
  note,
  children,
}) => {
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
      <Flex vertical gap={12} style={{ width: '100%' }}>
        <Paragraph style={{ fontSize: 14, margin: 0, wordBreak: 'keep-all' }}>
          {description}
        </Paragraph>
        {legalBasis && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({legalBasis})
          </Text>
        )}
        <Row gutter={[16, 16]}>
          {children}
        </Row>
        {note && (
          <Alert
            type="info"
            message={<div style={{ wordBreak: 'keep-all', lineHeight: 1.5 }}>{note}</div>}
            showIcon
            style={{ fontSize: 14, width: '100%' }}
          />
        )}
      </Flex>
    </Card>
  );
};

export const Condition: React.FC<ConditionProps> = ({ condition, result, type }) => (
  <Col xs={24} sm={12}>
    <Card
      size="small"
      style={{
        borderColor: type === 'negative' ? '#ff4d4f' : '#52c41a',
        backgroundColor: type === 'negative' ? '#fff2f0' : '#f6ffed',
      }}
    >
      <Flex vertical gap={4}>
        <Text strong style={{ fontSize: 14, wordBreak: 'keep-all' }}>{condition}</Text>
        <Tag color={type === 'negative' ? 'red' : 'green'}>{result}</Tag>
      </Flex>
    </Card>
  </Col>
);
