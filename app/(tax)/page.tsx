'use client';

import { Card, Typography, Row, Col } from 'antd';
import {
  FileTextOutlined,
  BankOutlined,
  CarOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const categories = [
  {
    title: '취득세',
    description: '부동산, 차량 등 취득 시 부과되는 세금',
    icon: <FileTextOutlined style={{ fontSize: 32, color: '#1677ff' }} />,
    href: '/acquisition/themes/multi-house',
  },
  {
    title: '재산세',
    description: '보유 부동산에 대해 부과되는 세금',
    icon: <BankOutlined style={{ fontSize: 32, color: '#1677ff' }} />,
    href: '/property',
  },
  {
    title: '자동차세',
    description: '자동차 소유에 대해 부과되는 세금',
    icon: <CarOutlined style={{ fontSize: 32, color: '#1677ff' }} />,
    href: '/vehicle',
  },
];

export default function Home() {
  return (
    <div>
      <Title level={2}>GanguBuy Tax</Title>
      <Paragraph type="secondary">
        지방세 정보 안내 사이트입니다. 좌측 메뉴에서 세목을 선택하세요.
      </Paragraph>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {categories.map((cat) => (
          <Col xs={24} sm={12} md={8} key={cat.title}>
            <Link href={cat.href} style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                {cat.icon}
                <Title level={4} style={{ marginTop: 12 }}>
                  {cat.title}
                </Title>
                <Paragraph type="secondary">{cat.description}</Paragraph>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
