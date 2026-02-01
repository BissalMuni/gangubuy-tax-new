'use client';

import { useEffect } from 'react';
import { usePreferencesStore } from '@/lib/stores/preferences';

const FONT_SIZE_MAP = {
  small: 'var(--font-size-small)',
  medium: 'var(--font-size-medium)',
  large: 'var(--font-size-large)',
} as const;

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const fontSize = usePreferencesStore((s) => s.fontSize);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--content-font-size',
      FONT_SIZE_MAP[fontSize],
    );
  }, [fontSize]);

  return <>{children}</>;
}
