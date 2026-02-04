import React, { useState } from 'react';
<<<<<<< HEAD
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PercentageOutlined,
  CalculatorOutlined,
  BookOutlined,
  KeyOutlined,
  FileTextOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuItem[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '홈',
    },
    {
      key: 'acquisition',
      icon: <KeyOutlined />,
      label: '취득세',
      children: [
        {
          key: '/tax-info/acquisition/rates',
          icon: <PercentageOutlined />,
          label: '세율',
        },
        {
          key: '/tax-info/acquisition/standard',
          icon: <FileTextOutlined />,
          label: '과세표준',
        },
        {
          key: '/tax-info/acquisition/requirements',
          icon: <BookOutlined />,
          label: '과세요건',
        },
        {
          key: '/tax-info/acquisition/special',
          icon: <SafetyOutlined />,
          label: '특례',
        },
      ],
    },
    {
      key: 'property',
      icon: <HomeOutlined />,
      label: '재산세',
      children: [
        {
          key: '/tax-info/property/rates',
          icon: <PercentageOutlined />,
          label: '세율',
        },
        {
          key: '/tax-info/property/standard',
          icon: <FileTextOutlined />,
          label: '과세표준',
        },
        {
          key: '/tax-info/property/special',
          icon: <SafetyOutlined />,
          label: '특례',
        },
      ],
    },
    {
      key: '/calculator',
      icon: <CalculatorOutlined />,
      label: '계산기',
    },
    {
      key: '/guide',
      icon: <BookOutlined />,
      label: '가이드',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  // Get default selected and open keys based on current path
  const getSelectedKeys = () => {
    return [location.pathname];
  };

  const getOpenKeys = () => {
    if (location.pathname.includes('/tax-info/acquisition')) {
      return ['acquisition'];
    }
    if (location.pathname.includes('/tax-info/property')) {
      return ['property'];
    }
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: collapsed ? '14px' : '16px',
          }}
        >
          {collapsed ? 'GBT' : 'GanguBuyTax'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ fontSize: '18px', fontWeight: 500 }}>
            지방세 정보 포털
          </div>
          <div style={{ width: 64 }} />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
=======
import { Outlet } from 'react-router-dom';
import { Layout, Grid } from 'antd';
import Header from '@components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import MobileNav from '@/components/common/MobileNav';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MobileNav />
        <Content
          style={{
            marginTop: 140, // MobileNav 높이에 맞춤
            padding: '12px',
            minHeight: 'calc(100vh - 140px)',
            background: '#f5f5f5',
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
          }}
        >
          <Outlet />
        </Content>
<<<<<<< HEAD
        <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
          <div style={{ marginBottom: 8 }}>
            <strong>GanguBuyTax</strong> - 지방세 정보 포털
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            복잡한 세금 정보를 쉽고 빠르게 확인하세요. 최신 세율부터 계산까지 모든 것을 한 곳에서.
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: 8 }}>
            © 2025 GanguBuyTax. All rights reserved.
          </div>
        </Footer>
=======
      </Layout>
    );
  }

  // 데스크탑 레이아웃
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'margin-left 0.2s' }}>
          <Content
            style={{
              margin: '88px 24px 24px',
              padding: '24px',
              minHeight: 280,
              background: '#f5f5f5',
            }}
          >
            <Outlet />
          </Content>
          <Footer />
        </Layout>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      </Layout>
    </Layout>
  );
};

export default MainLayout;
