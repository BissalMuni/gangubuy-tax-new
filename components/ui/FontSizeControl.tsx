'use client';

import { Button, Tooltip } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { usePreferencesStore } from '@/lib/stores/preferences';
import { MIN_FONT_SIZE, MAX_FONT_SIZE } from '@/lib/types';

export function FontSizeControl() {
  const { fontSize, increase, decrease } = usePreferencesStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Tooltip title="글자 축소">
        <Button
          size="small"
          type="text"
          icon={<MinusOutlined />}
          disabled={fontSize <= MIN_FONT_SIZE}
          style={{ color: fontSize <= MIN_FONT_SIZE ? '#666' : '#ccc' }}
          onClick={decrease}
        />
      </Tooltip>
      <span style={{ color: '#ccc', fontSize: 12, minWidth: 32, textAlign: 'center' }}>
        {fontSize}px
      </span>
      <Tooltip title="글자 확대">
        <Button
          size="small"
          type="text"
          icon={<PlusOutlined />}
          disabled={fontSize >= MAX_FONT_SIZE}
          style={{ color: fontSize >= MAX_FONT_SIZE ? '#666' : '#ccc' }}
          onClick={increase}
        />
      </Tooltip>
    </div>
  );
}
