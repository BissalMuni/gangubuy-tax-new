import React from 'react';
<<<<<<< HEAD
import { TaxItem } from '@/types/tax.types';

=======
import { Card, Tag, Typography, Space, Divider, Row, Col } from 'antd';
import { TaxItem } from '@/types/tax.types';

const { Text } = Typography;

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
interface TaxCardProps {
  items: TaxItem[];
}

const TaxCard: React.FC<TaxCardProps> = ({ items }) => {
  return (
<<<<<<< HEAD
    <div className="data-cards">
      {items.map((item) => (
        <div key={item.id} className="data-card">
          <div className="card-header">
            <div className="card-title">{item.name}</div>
            <span className="card-badge">{item.category}</span>
          </div>
          
          <div className="card-body">
            {Object.entries(item.data).map(([key, value]) => (
              <div key={key} className="tax-info">
                <div className="tax-label">{key}</div>
                <div className="tax-value">{value}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {item.path.join(' > ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaxCard;
=======
    <Row gutter={[16, 16]} style={{ padding: 16 }}>
      {items.map((item) => (
        <Col key={item.id} xs={24} sm={12} lg={8}>
          <Card
            size="small"
            title={
              <Space>
                <Text strong>{item.name}</Text>
                <Tag color="blue">{item.category}</Tag>
              </Space>
            }
            hoverable
          >
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              {Object.entries(item.data).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary">{key}</Text>
                  <Text strong style={{ color: key === '취득세' ? '#1890ff' : key === '지방교육세' ? '#52c41a' : '#fa8c16' }}>
                    {value}
                  </Text>
                </div>
              ))}
            </Space>
            <Divider style={{ margin: '12px 0' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {item.path.join(' > ')}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaxCard;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
