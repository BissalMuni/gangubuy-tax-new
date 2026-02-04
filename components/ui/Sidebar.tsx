'use client';

import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  BankOutlined,
  CarOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { navigationConfig } from '@/lib/navigation/nav.config';
import type { NavigationNode } from '@/lib/types';
import type { MenuProps } from 'antd';

const OPEN_KEYS_STORAGE_KEY = 'gangubuy-sidebar-open-keys';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  'file-text': <FileTextOutlined />,
  bank: <BankOutlined />,
  car: <CarOutlined />,
  search: <SearchOutlined />,
};

function nodeToMenuItem(
  key: string,
  node: NavigationNode,
): MenuItem {
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

function getAncestorKeys(path: string): string[] {
  const parts = path.split('/').filter(Boolean);
  const keys: string[] = [];
  let current = '';
  for (const part of parts) {
    current += `/${part}`;
    keys.push(current);
  }
  return keys;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Track the currently visible content path (updated by infinite scroll)
  const [scrollPath, setScrollPath] = useState<string | null>(null);

  // Listen for content-path-change events from InfiniteScrollLoader
  useEffect(() => {
    const handler = (e: Event) => {
      const path = (e as CustomEvent).detail?.path;
      if (path) setScrollPath(path);
    };
    window.addEventListener('content-path-change', handler);
    return () => window.removeEventListener('content-path-change', handler);
  }, []);

  // Reset scrollPath when real navigation occurs
  useEffect(() => {
    setScrollPath(null);
  }, [pathname]);

  const activePath = scrollPath || pathname;

  const menuItems = useMemo(() => {
    return Object.entries(navigationConfig).map(([key, node]) =>
      nodeToMenuItem(node.path, node),
    );
  }, []);

  // Compute path-based keys that should be open for the active route
  const pathOpenKeys = useMemo(() => {
    return getAncestorKeys(activePath);
  }, [activePath]);

  // Controlled openKeys state: initialize consistently for SSR, then restore from sessionStorage
  const [openKeys, setOpenKeys] = useState<string[]>(pathOpenKeys);
  const [mounted, setMounted] = useState(false);

  // Restore openKeys from sessionStorage after mounting (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(OPEN_KEYS_STORAGE_KEY);
      if (stored) {
        const parsed: string[] = JSON.parse(stored);
        // Merge stored keys with current path keys (ensure current path is always open)
        setOpenKeys((prev) => [...new Set([...parsed, ...prev])]);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // When pathname changes, ensure all ancestor keys for the new path are open
  useEffect(() => {
    if (!mounted) return;
    setOpenKeys((prev) => {
      const merged = [...new Set([...prev, ...pathOpenKeys])];
      return merged;
    });
  }, [pathOpenKeys, mounted]);

  // Persist openKeys to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(OPEN_KEYS_STORAGE_KEY, JSON.stringify(openKeys));
    } catch {
      // ignore storage errors
    }
  }, [openKeys]);

  const handleOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <Sider
      width={260}
      style={{
        background: '#fff',
        overflow: 'auto',
        height: 'calc(100vh - 48px)',
        position: 'sticky',
        top: 48,
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[activePath]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        items={menuItems}
        onClick={handleClick}
        style={{ borderRight: 0, fontSize: 14 }}
      />
    </Sider>
  );
}
