'use client';

import { useEffect } from 'react';
import { usePreferencesStore } from '@/lib/stores/preferences';

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const fontSize = usePreferencesStore((s) => s.fontSize);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--content-font-size',
      `${fontSize}px`,
    );
  }, [fontSize]);

  return <>{children}</>;
}
