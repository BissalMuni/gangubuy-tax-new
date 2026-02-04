import type { Metadata } from 'next';
import { AntdProvider } from '@/components/providers/AntdProvider';
import { FontSizeProvider } from '@/components/providers/FontSizeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'GanguBuy Tax',
  description: '지방세 정보 사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AntdProvider>
          <FontSizeProvider>{children}</FontSizeProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
