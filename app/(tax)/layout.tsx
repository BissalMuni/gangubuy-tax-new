'use client';

import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { MobileNav } from '@/components/ui/MobileNav';

const { Content } = Layout;

const MOBILE_BREAKPOINT = 768;

export default function TaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* 헤더: Ant Design Layout 바깥에 고정 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header
          showMenuButton={isMobile}
          onMenuClick={() => setDrawerOpen(true)}
        />
      </div>
      <Layout style={{ minHeight: '100vh', paddingTop: 48 }}>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        )}
        <Content
          role="main"
          style={{
            padding: isMobile ? '16px' : '24px 32px',
            minHeight: 'calc(100vh - 48px)',
            overflow: 'auto',
            maxWidth: 900,
            background: 'var(--bg-color)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </>
  );
}
