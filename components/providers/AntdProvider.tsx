'use client';

import { ConfigProvider, App } from 'antd';
import koKR from 'antd/locale/ko_KR';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
