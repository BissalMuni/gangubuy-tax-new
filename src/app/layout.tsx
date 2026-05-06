import type { Metadata } from 'next';
import { Sidebar } from '@/components/navigation/sidebar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'GanguBuy Tax',
  description: '지방세 정보 사이트',
};

// 하이드레이션 전 localStorage에서 테마를 읽어 <html data-theme>을 미리 설정 (FOUC 방지)
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-full flex">
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
