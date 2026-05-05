import type { Metadata } from 'next';
import { Sidebar } from '@/components/navigation/sidebar';
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
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
