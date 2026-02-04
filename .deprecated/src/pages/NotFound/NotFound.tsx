import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const NotFound: React.FC = () => {
<<<<<<< HEAD
  const navigate = useNavigate();

=======
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
  return (
    <Result
      status="404"
      title="404"
<<<<<<< HEAD
      subTitle="죄송합니다. 요청하신 페이지를 찾을 수 없습니다."
      extra={
        <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
=======
      subTitle="페이지를 찾을 수 없습니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
      extra={
        <Link to="/">
          <Button type="primary" icon={<HomeOutlined />}>
            홈으로 돌아가기
          </Button>
        </Link>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      }
    />
  );
};

export default NotFound;
