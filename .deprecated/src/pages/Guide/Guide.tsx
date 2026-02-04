import React from 'react';
<<<<<<< HEAD
import { Card, Typography, Collapse, Space, Timeline, Alert, Tag, Divider } from 'antd';
import {
  BookOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Guide: React.FC = () => {
  const faqItems = [
    {
      key: '1',
      label: '취득세는 언제 납부해야 하나요?',
      children: (
        <Paragraph>
          부동산을 취득한 날로부터 60일 이내에 신고 및 납부해야 합니다.
          기한 내 납부하지 않으면 가산세가 부과될 수 있으니 주의하세요.
        </Paragraph>
      ),
    },
    {
      key: '2',
      label: '재산세는 언제 내나요?',
      children: (
        <Paragraph>
          재산세는 연 2회 납부합니다:
          <ul>
            <li>주택분: 7월(1/2), 9월(1/2)</li>
            <li>토지분: 9월(전액)</li>
            <li>건축물분: 7월(전액)</li>
          </ul>
        </Paragraph>
      ),
    },
    {
      key: '3',
      label: '1주택자 취득세 감면 조건은?',
      children: (
        <Paragraph>
          6억원 이하, 85㎡ 이하 주택을 취득하는 1주택자는 취득세 1%, 농어촌특별세 비과세 혜택을 받을 수 있습니다.
          단, 조정대상지역 여부에 따라 조건이 달라질 수 있습니다.
        </Paragraph>
      ),
    },
    {
      key: '4',
      label: '증여와 상속의 세율 차이는?',
      children: (
        <Paragraph>
          <strong>증여:</strong> 취득세율 3.5%<br />
          <strong>상속:</strong> 취득세율 2.8%<br />
          상속이 증여보다 세율이 낮지만, 상속세 등 다른 세금도 고려해야 합니다.
        </Paragraph>
      ),
    },
    {
      key: '5',
      label: '다주택자 중과세율은?',
      children: (
        <Paragraph>
          조정대상지역에서 2주택 이상 소유 시 중과세율이 적용됩니다:
          <ul>
            <li>2주택: 8%</li>
            <li>3주택 이상: 12%</li>
          </ul>
          단, 지역과 취득 시기에 따라 예외가 있을 수 있습니다.
        </Paragraph>
      ),
    },
  ];

  const updateHistory = [
    {
      date: '2024.08.15',
      content: '2024년 하반기 부동산 취득세율 조정',
      color: 'red',
    },
    {
      date: '2024.08.01',
      content: '조정대상지역 추가 지정 (강남구, 서초구)',
      color: 'blue',
    },
    {
      date: '2024.07.15',
      content: '농어촌특별세 감면 조건 완화',
      color: 'green',
    },
    {
      date: '2024.06.01',
      content: '재산세 과세표준 개정',
      color: 'orange',
    },
    {
      date: '2024.05.01',
      content: '신혼부부 취득세 감면 확대',
      color: 'purple',
    },
  ];

  return (
    <div>
      <Title level={2}>
        <BookOutlined /> 사용 가이드
      </Title>
      <Text type="secondary">
        지방세 정보 포털 사용 방법과 자주 묻는 질문을 확인하세요.
      </Text>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 시작 가이드 */}
        <Card title={<><QuestionCircleOutlined /> 시작 가이드</>} bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              message="환영합니다!"
              description="지방세 정보 포털에서 취득세, 재산세 등 다양한 세금 정보를 확인하고 계산할 수 있습니다."
              type="info"
              showIcon
            />

            <div>
              <Title level={5}>주요 기능</Title>
              <Space direction="vertical">
                <Text>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <strong>세율 정보:</strong> 왼쪽 메뉴에서 취득세/재산세 세율을 확인할 수 있습니다.
                </Text>
                <Text>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <strong>과세표준:</strong> 세금 계산의 기준이 되는 과세표준을 조회할 수 있습니다.
                </Text>
                <Text>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <strong>세금 계산기:</strong> 예상 세금을 미리 계산해볼 수 있습니다.
                </Text>
                <Text>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <strong>특례:</strong> 감면 및 특례 조건을 확인할 수 있습니다.
                </Text>
              </Space>
            </div>
          </Space>
        </Card>

        {/* 자주 묻는 질문 */}
        <Card title={<><QuestionCircleOutlined /> 자주 묻는 질문</>} bordered={false}>
          <Collapse accordion items={faqItems} />
        </Card>

        {/* 업데이트 내역 */}
        <Card title={<><ClockCircleOutlined /> 최근 업데이트</>} bordered={false}>
          <Timeline
            items={updateHistory.map((item) => ({
              color: item.color,
              children: (
                <div>
                  <Text strong>{item.content}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.date}
                  </Text>
                </div>
              ),
            }))}
          />
        </Card>

        {/* 주의사항 */}
        <Card title={<><ExclamationCircleOutlined /> 주의사항</>} bordered={false}>
          <Space direction="vertical" size="middle">
            <Alert
              message="면책 조항"
              description="본 포털에서 제공하는 정보는 참고용이며, 실제 세액과 차이가 있을 수 있습니다. 정확한 세액은 관할 지방자치단체 또는 세무사에게 문의하시기 바랍니다."
              type="warning"
              showIcon
            />

            <div>
              <Paragraph>
                <strong>세금 납부 시 주의사항:</strong>
              </Paragraph>
              <ul>
                <li>취득세는 부동산 취득일로부터 60일 이내 신고·납부</li>
                <li>기한 내 미납 시 가산세 부과</li>
                <li>조정대상지역 지정 여부를 반드시 확인</li>
                <li>특례 및 감면 조건을 사전에 검토</li>
                <li>정확한 면적과 취득가액 확인 필요</li>
              </ul>
            </div>

            <div>
              <Paragraph>
                <strong>문의처:</strong>
              </Paragraph>
              <Space wrap>
                <Tag color="blue">국세청 콜센터: 126</Tag>
                <Tag color="green">관할 구청 세무과</Tag>
                <Tag color="purple">위택스(wetax.go.kr)</Tag>
              </Space>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
=======
import { Card, Typography, Empty } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Guide: React.FC = () => {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <QuestionCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginRight: 16 }} />
        <div>
          <Title level={3} style={{ margin: 0 }}>사용 가이드</Title>
          <Text type="secondary">시스템 사용 방법과 세금 정보 가이드</Text>
        </div>
      </div>
      <Empty
        description="사용 가이드가 곧 추가될 예정입니다."
        style={{ padding: 48 }}
      />
    </Card>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
  );
};

export default Guide;
