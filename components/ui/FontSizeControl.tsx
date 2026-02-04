'use client';

import { useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { usePreferencesStore } from '@/lib/stores/preferences';
import { MIN_FONT_SIZE, MAX_FONT_SIZE, DEFAULT_FONT_SIZE } from '@/lib/types';

export function FontSizeControl() {
  const fontSize = usePreferencesStore((state) => state.fontSize);
  const increase = usePreferencesStore((state) => state.increase);
  const decrease = usePreferencesStore((state) => state.decrease);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default font size during SSR to prevent hydration mismatch
  const displaySize = mounted ? fontSize : DEFAULT_FONT_SIZE;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Tooltip title="글자 축소">
        <Button
          size="small"
          type="text"
          icon={<MinusOutlined />}
          disabled={displaySize <= MIN_FONT_SIZE}
          style={{ color: displaySize <= MIN_FONT_SIZE ? '#666' : '#ccc' }}
          onClick={decrease}
        />
      </Tooltip>
      <span style={{ color: '#ccc', fontSize: 12, minWidth: 32, textAlign: 'center' }}>
        {displaySize}px
      </span>
      <Tooltip title="글자 확대">
        <Button
          size="small"
          type="text"
          icon={<PlusOutlined />}
          disabled={displaySize >= MAX_FONT_SIZE}
          style={{ color: displaySize >= MAX_FONT_SIZE ? '#666' : '#ccc' }}
          onClick={increase}
        />
      </Tooltip>
    </div>
  );
}
