import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="죄송합니다. 요청하신 페이지를 찾을 수 없습니다."
      extra={
        <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      }
    />
  );
};

export default NotFound;
