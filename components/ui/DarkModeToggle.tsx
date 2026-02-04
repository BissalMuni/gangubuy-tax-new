'use client';

import { useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { usePreferencesStore } from '@/lib/stores/preferences';

export function DarkModeToggle() {
  const darkMode = usePreferencesStore((state) => state.darkMode);
  const toggleDarkMode = usePreferencesStore((state) => state.toggleDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use consistent initial state during SSR
  const isDark = mounted && darkMode;

  return (
    <Tooltip title={isDark ? '라이트 모드' : '다크 모드'}>
      <Button
        size="small"
        type="text"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleDarkMode}
        style={{ color: '#ccc' }}
      />
    </Tooltip>
  );
}
