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
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        showMenuButton={isMobile}
        onMenuClick={() => setDrawerOpen(true)}
      />
      <Layout>
        {!isMobile && <Sidebar />}
        {isMobile && (
          <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        )}
        <Content
          style={{
            padding: isMobile ? '16px' : '24px 32px',
            minHeight: 'calc(100vh - 48px)',
            overflow: 'auto',
            maxWidth: 900,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
