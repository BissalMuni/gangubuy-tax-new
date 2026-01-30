import React from 'react';
import { Card, Table, Typography, Divider, Tag, Space, Statistic, Row, Col } from 'antd';
import { PercentageOutlined, HomeOutlined, BankOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const PropertyRates: React.FC = () => {
  const housingRates = [
    { key: '1', range: '6천만원 이하', rate: '0.1%' },
    { key: '2', range: '6천만원 ~ 1.5억원', rate: '0.15%' },
    { key: '3', range: '1.5억원 ~ 3억원', rate: '0.25%' },
    { key: '4', range: '3억원 초과', rate: '0.4%' },
  ];

  const landRates = [
    { key: '1', category: '종합합산토지', rate: '0.2% ~ 0.4%' },
    { key: '2', category: '별도합산토지', rate: '0.2% ~ 0.4%' },
    { key: '3', category: '분리과세토지', rate: '0.2% ~ 0.4%' },
  ];

  const buildingRates = [
    { key: '1', type: '일반건축물', rate: '0.25%' },
    { key: '2', type: '주거용 외 건축물', rate: '0.4%' },
  ];

  const columns = [
    {
      title: '구분',
      dataIndex: 'range',
      key: 'range',
      render: (text: string, record: any) => text || record.category || record.type,
    },
    {
      title: '세율',
      dataIndex: 'rate',
      key: 'rate',
      render: (rate: string) => <Tag color="green">{rate}</Tag>,
    },
  ];

  return (
    <div>
      <Title level={2}>
        <PercentageOutlined /> 재산세 세율
      </Title>
      <Text type="secondary">재산세 세율 정보를 확인하세요</Text>

      <Divider />

      {/* 통계 섹션 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="주택 기본세율"
              value="0.1"
              suffix="%"
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="토지 기본세율"
              value="0.2"
              suffix="%"
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="건축물 기본세율"
              value="0.25"
              suffix="%"
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 주택 재산세 */}
        <Card title={<><HomeOutlined /> 주택 재산세율</>} bordered={false}>
          <Paragraph>
            주택의 과세표준에 따라 차등 세율이 적용됩니다.
          </Paragraph>
          <Table
            dataSource={housingRates}
            columns={columns}
            pagination={false}
            size="middle"
          />
        </Card>

        {/* 토지 재산세 */}
        <Card title={<><EnvironmentOutlined /> 토지 재산세율</>} bordered={false}>
          <Paragraph>
            토지의 종류에 따라 다음과 같은 세율이 적용됩니다.
          </Paragraph>
          <Table
            dataSource={landRates}
            columns={columns}
            pagination={false}
            size="middle"
          />
        </Card>

        {/* 건축물 재산세 */}
        <Card title={<><BankOutlined /> 건축물 재산세율</>} bordered={false}>
          <Paragraph>
            건축물의 용도에 따라 다음과 같은 세율이 적용됩니다.
          </Paragraph>
          <Table
            dataSource={buildingRates}
            columns={columns}
            pagination={false}
            size="middle"
          />
        </Card>

        {/* 참고사항 */}
        <Card title="참고사항" type="inner">
          <Space direction="vertical">
            <Text>• 재산세는 매년 6월 1일을 기준으로 부과됩니다.</Text>
            <Text>• 주택분 재산세는 7월과 9월에 1/2씩 납부합니다.</Text>
            <Text>• 토지와 건축물분은 9월에 일괄 납부합니다.</Text>
            <Text>• 정확한 세액은 시가표준액과 공정시장가액비율에 따라 달라집니다.</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default PropertyRates;
