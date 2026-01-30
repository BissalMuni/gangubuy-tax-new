import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Statistic, Timeline, Tag, Space, Button } from 'antd';
import {
  BookOutlined,
  CalculatorOutlined,
  RiseOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  FileTextOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      title: '세금 정보 조회',
      description: '취득세, 지방교육세, 농어촌특별세 등 다양한 세금 정보를 확인하세요.',
      path: '/tax-info/acquisition/rates',
      color: '#1890ff',
    },
    {
      icon: <CalculatorOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      title: '세금 계산기',
      description: '부동산 취득 시 필요한 세금을 간편하게 계산해보세요.',
      path: '/calculator',
      color: '#52c41a',
    },
    {
      icon: <RiseOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
      title: '세율 분석',
      description: '최신 세율 동향과 변경사항을 한눈에 파악하세요.',
      path: '/guide',
      color: '#722ed1',
    },
  ];

  const recentUpdates = [
    {
      title: '2024년 부동산 취득세율 변경',
      date: '2024.08.15',
      category: '정책변경',
      color: 'red',
    },
    {
      title: '조정대상지역 추가 지정',
      date: '2024.08.01',
      category: '지역정보',
      color: 'blue',
    },
    {
      title: '농어촌특별세 감면 조건 완화',
      date: '2024.07.15',
      category: '세제혜택',
      color: 'green',
    },
  ];

  const popularLinks = [
    {
      title: '부동산 유상취득 세율',
      description: '주택, 토지 취득 시 적용되는 세율',
      path: '/tax-info/acquisition/rates',
      icon: <PercentageOutlined />,
    },
    {
      title: '취득세 계산기',
      description: '간편하게 세금을 계산해보세요',
      path: '/calculator',
      icon: <CalculatorOutlined />,
    },
    {
      title: '과세표준',
      description: '세금 계산의 기준이 되는 과세표준',
      path: '/tax-info/acquisition/standard',
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          marginBottom: 24,
          border: 'none',
        }}
        bodyStyle={{ padding: '48px 32px' }}
      >
        <Row>
          <Col span={24}>
            <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
              지방세 정보 포털
            </Title>
            <Paragraph style={{ color: '#fff', fontSize: 18, opacity: 0.95, marginBottom: 0 }}>
              지방세 정보를 쉽고 빠르게 확인하세요.
              <br />
              과세표준, 세율, 감면, 특례, 세금계산까지 모든 것을 한 곳에서.
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* Features */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        {features.map((feature) => (
          <Col xs={24} md={8} key={feature.title}>
            <Card
              hoverable
              onClick={() => navigate(feature.path)}
              style={{ height: '100%' }}
              bodyStyle={{ padding: 24 }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {feature.title}
                  </Title>
                  <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                    {feature.description}
                  </Paragraph>
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                    자세히 보기
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="전체 세율 항목"
              value={157}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="취득세 항목"
              value={89}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="재산세 항목"
              value={68}
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Updates and Popular Links */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={<Text strong style={{ fontSize: 16 }}>최근 업데이트</Text>}
            extra={
              <Button type="link" onClick={() => navigate('/guide')}>
                전체 보기
              </Button>
            }
          >
            <Timeline
              items={recentUpdates.map((update) => ({
                children: (
                  <div>
                    <div style={{ marginBottom: 4 }}>
                      <Text strong>{update.title}</Text>
                      <Tag color={update.color} style={{ marginLeft: 8 }}>
                        {update.category}
                      </Tag>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {update.date}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={<Text strong style={{ fontSize: 16 }}>자주 찾는 정보</Text>}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {popularLinks.map((link) => (
                <Card
                  key={link.title}
                  size="small"
                  hoverable
                  onClick={() => navigate(link.path)}
                  bodyStyle={{ padding: 16 }}
                >
                  <Space>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: '#f0f5ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: '#1890ff',
                      }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <div>
                        <Text strong>{link.title}</Text>
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {link.description}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
