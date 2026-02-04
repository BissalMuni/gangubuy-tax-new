import React from 'react';
import { Card, Tag, Typography, Flex, Alert, Row, Col } from 'antd';
import {
  FileSearchOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  FileSearchOutlined: <FileSearchOutlined />,
};

interface CasesProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

interface CaseProps {
  title: string;
  scenario: string;
  result: string;
  resultType: 'success' | 'error' | 'warning';
  note?: string;
  children: React.ReactNode;
}

interface AnalysisProps {
  label: string;
  value: string;
}

export const Cases: React.FC<CasesProps> = ({ title, icon, children }) => {
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
        {children}
      </Flex>
    </Card>
  );
};

export const Case: React.FC<CaseProps> = ({
  title,
  scenario,
  result,
  resultType,
  note,
  children,
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <Card
      size="small"
      title={<span style={{ fontSize: 14, wordBreak: 'keep-all' }}>{title}</span>}
      extra={
        <Tag color={resultType === 'success' ? 'green' : 'red'} style={{ fontSize: 12 }}>
          {result}
        </Tag>
      }
      style={{
        borderColor: resultType === 'success' ? '#52c41a' : '#ff4d4f',
      }}
    >
      <Flex vertical gap={8} style={{ width: '100%' }}>
        <Alert
          type="info"
          message={<div style={{ fontSize: 14, wordBreak: 'keep-all', lineHeight: 1.5 }}>{scenario}</div>}
          icon={<InfoCircleOutlined />}
          showIcon
          style={{ width: '100%' }}
        />
        <Row gutter={[8, 8]}>
          {childArray}
        </Row>
        {note && (
          <div style={{ fontSize: 14, color: '#666', wordBreak: 'keep-all' }}>
            {resultType === 'success' ? (
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 4 }} />
            )}
            {note}
          </div>
        )}
      </Flex>
    </Card>
  );
};

export const Analysis: React.FC<AnalysisProps> = ({ label, value }) => (
  <Col xs={12} sm={6}>
    <Card size="small" styles={{ body: { padding: 12, textAlign: 'center' } }}>
      <Text type="secondary" style={{ fontSize: 12, wordBreak: 'keep-all' }}>{label}</Text>
      <br />
      <Text strong style={{ fontSize: 14 }}>{value}</Text>
    </Card>
  </Col>
);
