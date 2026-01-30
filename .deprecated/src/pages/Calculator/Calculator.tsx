import React, { useState } from 'react';
import { Card, Form, Input, Select, InputNumber, Button, Divider, Typography, Alert, Space, Row, Col, Table } from 'antd';
import { CalculatorOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface TaxResult {
  acquisitionTax: number;
  localEducationTax: number;
  ruralDevelopmentTax: number;
  totalTax: number;
}

const Calculator: React.FC = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<TaxResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateTax = (values: any) => {
    setLoading(true);

    // 간단한 취득세 계산 로직 (실제로는 더 복잡한 로직이 필요)
    const price = values.price || 0;
    let acquisitionTaxRate = 0;

    // 주택 수에 따른 세율 (간단한 예시)
    if (values.propertyType === 'house') {
      if (values.houseCount === 1) {
        acquisitionTaxRate = price <= 600000000 ? 0.01 : 0.03;
      } else if (values.houseCount === 2) {
        acquisitionTaxRate = 0.03;
      } else {
        acquisitionTaxRate = 0.08;
      }
    } else {
      acquisitionTaxRate = 0.04;
    }

    const acquisitionTax = Math.floor(price * acquisitionTaxRate);
    const localEducationTax = Math.floor(acquisitionTax * 0.1);
    const ruralDevelopmentTax = values.area > 85 ? Math.floor(acquisitionTax * 0.2) : 0;
    const totalTax = acquisitionTax + localEducationTax + ruralDevelopmentTax;

    setTimeout(() => {
      setResult({
        acquisitionTax,
        localEducationTax,
        ruralDevelopmentTax,
        totalTax,
      });
      setLoading(false);
    }, 500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value);
  };

  const resultData = result ? [
    {
      key: '1',
      taxType: '취득세',
      amount: result.acquisitionTax,
    },
    {
      key: '2',
      taxType: '지방교육세',
      amount: result.localEducationTax,
    },
    {
      key: '3',
      taxType: '농어촌특별세',
      amount: result.ruralDevelopmentTax,
    },
    {
      key: '4',
      taxType: '총 세액',
      amount: result.totalTax,
      isTotal: true,
    },
  ] : [];

  const columns = [
    {
      title: '세목',
      dataIndex: 'taxType',
      key: 'taxType',
      render: (text: string, record: any) => (
        <Text strong={record.isTotal}>{text}</Text>
      ),
    },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (amount: number, record: any) => (
        <Text strong={record.isTotal} style={{ fontSize: record.isTotal ? 16 : 14 }}>
          {formatCurrency(amount)}
        </Text>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>
        <CalculatorOutlined /> 세금 계산기
      </Title>
      <Text type="secondary">
        부동산 취득 시 필요한 세금을 간편하게 계산해보세요.
      </Text>

      <Divider />

      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Card title="정보 입력" bordered={false}>
            <Alert
              message="안내"
              description="이 계산기는 참고용이며, 실제 세액은 관할 세무서에 문의하시기 바랍니다."
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form
              form={form}
              layout="vertical"
              onFinish={calculateTax}
              initialValues={{
                propertyType: 'house',
                houseCount: 1,
                area: 85,
              }}
            >
              <Form.Item
                name="propertyType"
                label="부동산 유형"
                rules={[{ required: true, message: '부동산 유형을 선택해주세요' }]}
              >
                <Select>
                  <Option value="house">주택</Option>
                  <Option value="land">토지</Option>
                  <Option value="building">건물</Option>
                </Select>
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.propertyType !== currentValues.propertyType
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('propertyType') === 'house' ? (
                    <Form.Item
                      name="houseCount"
                      label="주택 수"
                      rules={[{ required: true, message: '주택 수를 선택해주세요' }]}
                    >
                      <Select>
                        <Option value={1}>1주택</Option>
                        <Option value={2}>2주택</Option>
                        <Option value={3}>3주택 이상</Option>
                      </Select>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>

              <Form.Item
                name="price"
                label="취득가액"
                rules={[{ required: true, message: '취득가액을 입력해주세요' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  formatter={(value) => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/₩\s?|(,*)/g, '')}
                  placeholder="예: 500,000,000"
                />
              </Form.Item>

              <Form.Item name="area" label="전용면적 (㎡)">
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="예: 85"
                  suffix="㎡"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DollarOutlined />}
                  size="large"
                  block
                  loading={loading}
                >
                  계산하기
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="계산 결과" bordered={false}>
            {result ? (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Table
                  dataSource={resultData}
                  columns={columns}
                  pagination={false}
                  size="middle"
                  rowClassName={(record) => (record.isTotal ? 'total-row' : '')}
                />

                <Alert
                  message="참고사항"
                  description={
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      <li>지방교육세는 취득세의 10%입니다.</li>
                      <li>농어촌특별세는 85㎡ 초과 주택에 취득세의 20%가 부과됩니다.</li>
                      <li>조정대상지역, 취득 시기 등에 따라 실제 세율이 달라질 수 있습니다.</li>
                      <li>정확한 세액은 관할 지방자치단체에 문의하시기 바랍니다.</li>
                    </ul>
                  }
                  type="warning"
                  showIcon
                />
              </Space>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <CalculatorOutlined style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }} />
                <div>
                  <Text type="secondary">
                    왼쪽 폼에 정보를 입력하고 계산하기 버튼을 클릭하세요.
                  </Text>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <style>
        {`
          .total-row {
            background-color: #f0f5ff;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default Calculator;
