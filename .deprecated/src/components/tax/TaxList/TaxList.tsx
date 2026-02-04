import React from 'react';
<<<<<<< HEAD
import { TaxItem } from '@/types/tax.types';

=======
import { Card, Tag, Typography, Space, Badge, Collapse } from 'antd';
import { TaxItem } from '@/types/tax.types';

const { Text, Title } = Typography;
const { Panel } = Collapse;

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
interface TaxListProps {
  items: TaxItem[];
}

const TaxList: React.FC<TaxListProps> = ({ items }) => {
  // 아이템을 취득 유형별로 그룹화
  const groupedItems = items.reduce((acc, item) => {
    const acquisitionType = item.path[0] || '기타';
    if (!acc[acquisitionType]) {
      acc[acquisitionType] = [];
    }
    acc[acquisitionType].push(item);
    return acc;
  }, {} as Record<string, TaxItem[]>);

  // 취득 유형 순서 정의
  const typeOrder = ['유상취득', '무상취득', '원시취득'];
  const sortedTypes = Object.keys(groupedItems).sort((a, b) => {
    const aIndex = typeOrder.indexOf(a);
    const bIndex = typeOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
<<<<<<< HEAD
    <div className="tax-list-container">
      {sortedTypes.map((type) => (
        <div key={type} className="acquisition-group">
          <h2 className="acquisition-type-header">
            <span className="type-badge">{type}</span>
            <span className="item-count">({groupedItems[type].length}건)</span>
          </h2>
          
          <div className="data-list">
            {groupedItems[type].map((item) => (
              <div key={item.id} className="data-item">
                <div className="data-item-header">
                  <div>
                    <div className="data-item-title">
                      {/* 첫 번째 항목(취득유형)을 제외한 나머지 경로 표시 */}
                      <span className="main-category">
                        {item.path[1] || '일반'}
                      </span>
                      {item.path.length > 2 && (
                        <span className="sub-categories">
                          {item.path.slice(2).map((path, index) => (
                            <span key={index} className="sub-category">
                              {path}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="data-item-type">{item.category}</span>
                </div>
                
                <div className="data-item-content">
                  {Object.entries(item.data).map(([key, value]) => (
                    <div key={key} className="tax-info">
                      <div className="tax-label">{key}</div>
                      <div className="tax-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <style>{`
        .tax-list-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .acquisition-group {
          margin-bottom: 1.5rem;
        }

        .acquisition-type-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: linear-gradient(to right, #f8f9fa, transparent);
          border-left: 4px solid #03C75A;
        }

        .type-badge {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .item-count {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .main-category {
          font-size: 1.125rem;
          font-weight: 600;
          color: #333;
          margin-right: 0.75rem;
        }

        .sub-categories {
          display: inline-flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sub-category {
          padding: 0.25rem 0.75rem;
          background: #e8f5f0;
          color: #03C75A;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .sub-category:before {
          content: '•';
          margin-right: 0.5rem;
          color: #6c757d;
        }

        @media (max-width: 768px) {
          .sub-categories {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.5rem;
          }
        }
      `}</style>
=======
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
      {sortedTypes.map((type) => (
        <Card
          key={type}
          title={
            <Space>
              <Title level={5} style={{ margin: 0 }}>{type}</Title>
              <Badge count={groupedItems[type].length} style={{ backgroundColor: '#52c41a' }} />
            </Space>
          }
          style={{ borderLeft: '4px solid #52c41a' }}
        >
          <Collapse defaultActiveKey={[]} ghost>
            {groupedItems[type].map((item) => (
              <Panel
                key={item.id}
                header={
                  <Space wrap>
                    <Text strong style={{ fontSize: 15 }}>
                      {item.path[1] || '일반'}
                    </Text>
                    {item.path.slice(2).map((path, pathIndex) => (
                      <Tag key={pathIndex} color="green">{path}</Tag>
                    ))}
                    <Tag color="blue">{item.category}</Tag>
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  {Object.entries(item.data).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: '#fafafa',
                        borderRadius: 4,
                      }}
                    >
                      <Text type="secondary">{key}</Text>
                      <Text
                        strong
                        style={{
                          color: key === '취득세' ? '#1890ff' : key === '지방교육세' ? '#52c41a' : '#fa8c16',
                        }}
                      >
                        {value}
                      </Text>
                    </div>
                  ))}
                </Space>
              </Panel>
            ))}
          </Collapse>
        </Card>
      ))}
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    </div>
  );
};

<<<<<<< HEAD
export default TaxList;
=======
export default TaxList;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
