'use client';

import { Layout, Typography, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { FontSizeControl } from './FontSizeControl';
import { DarkModeToggle } from './DarkModeToggle';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton }: HeaderProps) {
  return (
    <AntHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#001529',
        padding: '0 24px',
        height: 48,
        lineHeight: '48px',
        gap: 12,
      }}
    >
      {showMenuButton && (
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: '#fff', fontSize: 18 }} />}
          onClick={onMenuClick}
          style={{ padding: '4px 8px' }}
        />
      )}
      <Link href="/" style={{ textDecoration: 'none', flex: 1 }}>
        <Typography.Title
          level={4}
          style={{ color: '#fff', margin: 0, fontSize: 18 }}
        >
          GanguBuy Tax
        </Typography.Title>
      </Link>
      <FontSizeControl />
      <DarkModeToggle />
    </AntHeader>
  );
}
