import React from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { FiHome, FiBook, FiUser, FiHelpCircle } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick: _ }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈', icon: FiHome },
    { path: '/tax-info', label: '세율정보', icon: FiBook },
    { path: '/calculator', label: '계산기', icon: FiUser },
    { path: '/guide', label: '가이드', icon: FiHelpCircle },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="header">
      <div className="header-nav">
        {/* <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
        > */}
          {/* <FiMenu className="h-6 w-6" /> */}
          <span className="font-bold text-green-600" >G</span>
          <span className="font-bold text-blue-600" >B</span>
          <span className="g-12 font-bold text-red-600 mr-2" >T</span>
        {/* </button> */}
        
        <Link to="/" className="logo">
          GanguBuyTax
        </Link>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">알림</span>
            🔔
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">설정</span>
            ⚙️
          </button>
        </div>
      </div>
      
      {/* <div className="header-title">
        <div className="title-container">
          <h1>대한민국 세금 정보 포털</h1>
          <p>복잡한 세금 정보를 쉽고 빠르게 확인하세요. 최신 세율부터 계산까지 모든 것을 한 곳에서.</p>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
=======
import { Layout, Menu, Button, Space, Badge } from 'antd';
import {
  BellOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { headerMenuItems, getHeaderSelectedKey } from '@/config/menu.config';
import { ROUTES } from '@/constants/routes';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <AntHeader
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#001529',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {onToggle && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#fff',
            }}
          />
        )}
        <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
          <span style={{ color: '#52c41a', fontWeight: 'bold', fontSize: '18px' }}>G</span>
          <span style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '18px' }}>B</span>
          <span style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '18px', marginRight: '8px' }}>T</span>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>GanguBuyTax</span>
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={getHeaderSelectedKey(location.pathname)}
        items={headerMenuItems}
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          borderBottom: 'none',
        }}
      />

      <Space size="middle">
        <Badge count={0} showZero={false}>
          <Button
            type="text"
            icon={<BellOutlined />}
            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
          />
        </Badge>
        <Button
          type="text"
          icon={<SettingOutlined />}
          style={{ color: 'rgba(255, 255, 255, 0.65)' }}
        />
      </Space>
    </AntHeader>
  );
};

export default Header;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
