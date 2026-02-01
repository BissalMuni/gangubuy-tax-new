'use client';

import { Button, Tooltip } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { usePreferencesStore } from '@/lib/stores/preferences';
import type { FontSize } from '@/lib/types';

const FONT_SIZES: { key: FontSize; label: string; size: string }[] = [
  { key: 'small', label: '작게', size: '13px' },
  { key: 'medium', label: '보통', size: '15px' },
  { key: 'large', label: '크게', size: '17px' },
];

export function FontSizeControl() {
  const { fontSize, setFontSize } = usePreferencesStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <FontSizeOutlined style={{ color: '#fff', marginRight: 4 }} />
      {FONT_SIZES.map((fs) => (
        <Tooltip key={fs.key} title={fs.label}>
          <Button
            size="small"
            type={fontSize === fs.key ? 'primary' : 'text'}
            style={{
              fontSize: fs.size,
              minWidth: 28,
              color: fontSize === fs.key ? undefined : '#ccc',
              padding: '0 4px',
            }}
            onClick={() => setFontSize(fs.key)}
          >
            가
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
