import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// isolate: false 환경에서 테스트 간 DOM 누적 방지 — 각 테스트 후 cleanup 실행
afterEach(cleanup);

// jsdom에서 누락된 브라우저 API 모킹

// Ant Design ResizeObserver 의존성 모킹
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Ant Design matchMedia 의존성 모킹 (vi.fn 대신 plain stub — globals 초기화 전 실행 안전)
if (typeof window !== 'undefined' && !window.matchMedia) {
  const stub = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
  Object.defineProperty(window, 'matchMedia', { writable: true, value: stub });
}

// File.arrayBuffer 모킹 (jsdom에서 미지원)
if (!File.prototype.arrayBuffer) {
  File.prototype.arrayBuffer = function () {
    return new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.readAsArrayBuffer(this);
    });
  };
}
