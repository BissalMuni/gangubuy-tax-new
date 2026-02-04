'use client';

import { Drawer, Menu } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  BankOutlined,
  CarOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { navigationConfig } from '@/lib/navigation/nav.config';
import type { NavigationNode } from '@/lib/types';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  'file-text': <FileTextOutlined />,
  bank: <BankOutlined />,
  car: <CarOutlined />,
  search: <SearchOutlined />,
};

function nodeToMenuItem(key: string, node: NavigationNode): MenuItem {
  const children = node.children
    ? Object.entries(node.children).map(([childKey, childNode]) =>
        nodeToMenuItem(childNode.path, childNode),
      )
    : undefined;

  return {
    key: node.path,
    icon: node.icon ? iconMap[node.icon] : undefined,
    label: node.label,
    children,
  };
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = useMemo(() => {
    return Object.entries(navigationConfig).map(([key, node]) =>
      nodeToMenuItem(node.path, node),
    );
  }, []);

  const openKeys = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const keys: string[] = [];
    let current = '';
    for (const part of parts) {
      current += `/${part}`;
      keys.push(current);
    }
    return keys;
  }, [pathname]);

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
    onClose();
  };

  return (
    <Drawer
      title="메뉴"
      placement="left"
      onClose={onClose}
      open={open}
      width={280}
      styles={{ body: { padding: 0 } }}
    >
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={openKeys}
        items={menuItems}
        onClick={handleClick}
        style={{ borderRight: 0 }}
      />
    </Drawer>
  );
}
