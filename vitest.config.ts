import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    // Windows에서 fork 워커 타임아웃 방지: 단일 워커로 순차 실행
    maxWorkers: 1,
    // 모듈 캐시 공유: Ant Design CSS-in-JS 반복 초기화 방지 (worker 시작 타임아웃 해결)
    isolate: false,
    // Ant Design 컴포넌트 비동기 렌더링 허용
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
