'use client';

import { useEffect, useState } from 'react';
import { ConfigProvider, App, theme } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { usePreferencesStore } from '@/lib/stores/preferences';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const darkMode = usePreferencesStore((state) => state.darkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode, mounted]);

  // Use light theme during SSR and initial hydration to prevent mismatch
  const isDark = mounted && darkMode;

  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
