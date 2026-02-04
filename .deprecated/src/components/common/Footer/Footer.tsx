import React from 'react';
<<<<<<< HEAD

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">세금 정보 시스템</h3>
          <p className="text-sm text-gray-300 mb-2">
            © 2024 Tax Information System. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            본 시스템은 정보 제공 목적으로만 사용되며, 법적 효력은 없습니다.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              개인정보처리방침
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              이용약관
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
=======
import { Layout, Typography, Flex, Divider } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        background: '#001529',
        padding: '24px 50px',
      }}
    >
      <Typography.Title level={5} style={{ color: '#fff', marginBottom: 16 }}>
        세금 정보 시스템
      </Typography.Title>
      <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
        © 2024 Tax Information System. All rights reserved.
      </Text>
      <br />
      <Text style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 12 }}>
        본 시스템은 정보 제공 목적으로만 사용되며, 법적 효력은 없습니다.
      </Text>
      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.15)', margin: '16px 0' }} />
      <Flex justify="center" gap="middle">
        <Link style={{ color: 'rgba(255, 255, 255, 0.65)' }}>개인정보처리방침</Link>
        <Divider type="vertical" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }} />
        <Link style={{ color: 'rgba(255, 255, 255, 0.65)' }}>이용약관</Link>
        <Divider type="vertical" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }} />
        <Link style={{ color: 'rgba(255, 255, 255, 0.65)' }}>문의하기</Link>
      </Flex>
    </AntFooter>
  );
};

export default Footer;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
