<<<<<<< HEAD
import React from 'react';
import { FiBookOpen, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const PropertySpecial: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FiBookOpen className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">재산세 특례</h1>
            <p className="text-gray-600 mt-1">
              재산세 감면 및 특례 적용 기준을 확인하세요
            </p>
          </div>
        </div>
      </div>

      {/* 주요 재산세 특례 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">1세대 1주택 특례</h3>
              <p className="text-gray-600 text-sm">주택 재산세 감면</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">공시가격 6억원 이하: 25% 감면</span>
            </div>
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">고령자·장애인 추가 감면</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              1세대가 1주택만 보유하는 경우
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">농지 감면</h3>
              <p className="text-gray-600 text-sm">농업용 토지 감면</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-gray-600">농지: 50% 감면</span>
            </div>
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-gray-600">축사·농업용 창고: 50% 감면</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              농업인이 직접 농업에 사용하는 농지
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiCheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">소상공인 특례</h3>
              <p className="text-gray-600 text-sm">소상공인 사업장 감면</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-gray-600">소상공인 사업장: 50% 감면</span>
            </div>
            <div className="flex items-center text-sm">
              <FiCheckCircle className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-gray-600">영세사업자 추가 혜택</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              일정 규모 이하 소상공인 사업장
            </div>
          </div>
        </div>
      </div>

      {/* 감면 대상 및 비율 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">감면 대상 및 비율</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">대상</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">감면율</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기준</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1세대 1주택</td>
                <td className="px-4 py-4 text-sm text-gray-900">1세대가 1주택만 소유</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">25%</td>
                <td className="px-4 py-4 text-sm text-gray-500">공시가격 6억원 이하</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">농지</td>
                <td className="px-4 py-4 text-sm text-gray-900">농업인 직접 경작 농지</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">50%</td>
                <td className="px-4 py-4 text-sm text-gray-500">농업경영체 등록</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">임야</td>
                <td className="px-4 py-4 text-sm text-gray-900">산림소유자 보유 임야</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">50%</td>
                <td className="px-4 py-4 text-sm text-gray-500">임업경영체 등록</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">소상공인</td>
                <td className="px-4 py-4 text-sm text-gray-900">소상공인 사업장</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">50%</td>
                <td className="px-4 py-4 text-sm text-gray-500">매출액 기준</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 특례 적용 조건 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">특례 적용 조건</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">필수 요건</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">거주 요건</p>
                  <p className="text-gray-600 text-sm">1세대 1주택의 경우 실제 거주 필요</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">소유 기간</p>
                  <p className="text-gray-600 text-sm">일정 기간 이상 소유 필요</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">용도 제한</p>
                  <p className="text-gray-600 text-sm">해당 용도로만 사용해야 함</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">신청 절차</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">신청서 작성</p>
                  <p className="text-gray-600 text-sm">감면신청서 및 구비서류 준비</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">제출</p>
                  <p className="text-gray-600 text-sm">해당 지방자치단체에 제출</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">심사·승인</p>
                  <p className="text-gray-600 text-sm">요건 심사 후 감면 적용</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 신청 기한 및 유의사항 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiCheckCircle className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-blue-900">신청 기한</h3>
          </div>
          <div className="space-y-2 text-blue-700">
            <p className="text-sm">• 과세기준일로부터 60일 이내</p>
            <p className="text-sm">• 부과고지를 받은 날로부터 30일 이내</p>
            <p className="text-sm">• 사유 발생일로부터 60일 이내</p>
            <p className="text-xs text-blue-600 mt-2">※ 지자체별로 다를 수 있음</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiAlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-medium text-yellow-800">주의사항</h3>
          </div>
          <div className="space-y-2 text-yellow-700">
            <p className="text-sm">• 허위 신청 시 3배 추징</p>
            <p className="text-sm">• 용도 변경 시 감면 취소</p>
            <p className="text-sm">• 매년 재신청 필요한 경우 있음</p>
            <p className="text-xs text-yellow-600 mt-2">※ 정확한 정보는 해당 지자체 확인</p>
          </div>
        </div>
      </div>

      {/* 필요 서류 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">필요 서류</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">1세대 1주택</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 감면신청서</li>
              <li>• 주민등록등본</li>
              <li>• 건물등기부등본</li>
              <li>• 거주사실확인서</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">농지 감면</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 감면신청서</li>
              <li>• 농업경영체증명서</li>
              <li>• 농지원부</li>
              <li>• 직접경작확인서</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">소상공인</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 감면신청서</li>
              <li>• 사업자등록증</li>
              <li>• 매출액증명서</li>
              <li>• 임대차계약서</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySpecial;
=======
import React from 'react';
import { Card, Row, Col, Typography, Space, Table, Steps } from 'antd';
import { BookOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PropertySpecial: React.FC = () => {
  const columns = [
    { title: '구분', dataIndex: 'category', key: 'category', width: 100 },
    { title: '대상', dataIndex: 'target', key: 'target', width: 200 },
    {
      title: '감면율',
      dataIndex: 'rate',
      key: 'rate',
      width: 80,
      render: (text: string, record: any) => (
        <Text strong style={{ color: record.color }}>{text}</Text>
      )
    },
    { title: '기준', dataIndex: 'standard', key: 'standard', width: 150 },
  ];

  const dataSource = [
    { key: '1', category: '1세대 1주택', target: '1세대가 1주택만 소유', rate: '25%', standard: '공시가격 6억원 이하', color: '#52c41a' },
    { key: '2', category: '농지', target: '농업인 직접 경작 농지', rate: '50%', standard: '농업경영체 등록', color: '#1890ff' },
    { key: '3', category: '임야', target: '산림소유자 보유 임야', rate: '50%', standard: '임업경영체 등록', color: '#fa8c16' },
    { key: '4', category: '소상공인', target: '소상공인 사업장', rate: '50%', standard: '매출액 기준', color: '#722ed1' },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* 헤더 */}
      <Card>
        <Space align="center">
          <BookOutlined style={{ fontSize: 32, color: '#52c41a' }} />
          <div>
            <Title level={3} style={{ margin: 0 }}>재산세 특례</Title>
            <Text type="secondary">재산세 감면 및 특례 적용 기준을 확인하세요</Text>
          </div>
        </Space>
      </Card>

      {/* 주요 재산세 특례 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <div style={{ background: '#f6ffed', padding: 12, borderRadius: 8 }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                </div>
                <div>
                  <Text strong style={{ fontSize: 16 }}>1세대 1주택 특례</Text>
                  <br />
                  <Text type="secondary">주택 재산세 감면</Text>
                </div>
              </Space>
              <Space direction="vertical" size={4}>
                <Space><CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>공시가격 6억원 이하: 25% 감면</Text></Space>
                <Space><CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>고령자·장애인 추가 감면</Text></Space>
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>1세대가 1주택만 보유하는 경우</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <div style={{ background: '#e6f7ff', padding: 12, borderRadius: 8 }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                </div>
                <div>
                  <Text strong style={{ fontSize: 16 }}>농지 감면</Text>
                  <br />
                  <Text type="secondary">농업용 토지 감면</Text>
                </div>
              </Space>
              <Space direction="vertical" size={4}>
                <Space><CheckCircleOutlined style={{ color: '#1890ff' }} /><Text>농지: 50% 감면</Text></Space>
                <Space><CheckCircleOutlined style={{ color: '#1890ff' }} /><Text>축사·농업용 창고: 50% 감면</Text></Space>
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>농업인이 직접 농업에 사용하는 농지</Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <div style={{ background: '#f9f0ff', padding: 12, borderRadius: 8 }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: '#722ed1' }} />
                </div>
                <div>
                  <Text strong style={{ fontSize: 16 }}>소상공인 특례</Text>
                  <br />
                  <Text type="secondary">소상공인 사업장 감면</Text>
                </div>
              </Space>
              <Space direction="vertical" size={4}>
                <Space><CheckCircleOutlined style={{ color: '#722ed1' }} /><Text>소상공인 사업장: 50% 감면</Text></Space>
                <Space><CheckCircleOutlined style={{ color: '#722ed1' }} /><Text>영세사업자 추가 혜택</Text></Space>
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>일정 규모 이하 소상공인 사업장</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 감면 대상 및 비율 */}
      <Card title="감면 대상 및 비율">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
        />
      </Card>

      {/* 특례 적용 조건 */}
      <Card title="특례 적용 조건">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={5}>필수 요건</Title>
            <Space direction="vertical" size="middle">
              <Space align="start">
                <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                <div>
                  <Text strong>거주 요건</Text>
                  <br />
                  <Text type="secondary">1세대 1주택의 경우 실제 거주 필요</Text>
                </div>
              </Space>
              <Space align="start">
                <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                <div>
                  <Text strong>소유 기간</Text>
                  <br />
                  <Text type="secondary">일정 기간 이상 소유 필요</Text>
                </div>
              </Space>
              <Space align="start">
                <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                <div>
                  <Text strong>용도 제한</Text>
                  <br />
                  <Text type="secondary">해당 용도로만 사용해야 함</Text>
                </div>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>신청 절차</Title>
            <Steps
              direction="vertical"
              size="small"
              current={-1}
              items={[
                { title: '신청서 작성', description: '감면신청서 및 구비서류 준비' },
                { title: '제출', description: '해당 지방자치단체에 제출' },
                { title: '심사·승인', description: '요건 심사 후 감면 적용' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* 신청 기한 및 유의사항 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card style={{ background: '#e6f7ff', borderColor: '#91d5ff' }}>
            <Space align="start">
              <CheckCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              <div>
                <Text strong style={{ color: '#003a8c' }}>신청 기한</Text>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: '#1890ff' }}>
                  <li>과세기준일로부터 60일 이내</li>
                  <li>부과고지를 받은 날로부터 30일 이내</li>
                  <li>사유 발생일로부터 60일 이내</li>
                </ul>
                <Text type="secondary" style={{ fontSize: 12 }}>※ 지자체별로 다를 수 있음</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ background: '#fffbe6', borderColor: '#ffe58f' }}>
            <Space align="start">
              <WarningOutlined style={{ fontSize: 24, color: '#faad14' }} />
              <div>
                <Text strong style={{ color: '#ad6800' }}>주의사항</Text>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: '#d48806' }}>
                  <li>허위 신청 시 3배 추징</li>
                  <li>용도 변경 시 감면 취소</li>
                  <li>매년 재신청 필요한 경우 있음</li>
                </ul>
                <Text type="secondary" style={{ fontSize: 12 }}>※ 정확한 정보는 해당 지자체 확인</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 필요 서류 */}
      <Card title="필요 서류">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#fafafa' }}>
              <Text strong>1세대 1주택</Text>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                <li>감면신청서</li>
                <li>주민등록등본</li>
                <li>건물등기부등본</li>
                <li>거주사실확인서</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#fafafa' }}>
              <Text strong>농지 감면</Text>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                <li>감면신청서</li>
                <li>농업경영체증명서</li>
                <li>농지원부</li>
                <li>직접경작확인서</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#fafafa' }}>
              <Text strong>소상공인</Text>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                <li>감면신청서</li>
                <li>사업자등록증</li>
                <li>매출액증명서</li>
                <li>임대차계약서</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default PropertySpecial;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
