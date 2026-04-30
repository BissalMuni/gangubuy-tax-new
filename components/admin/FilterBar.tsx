'use client';

import { Checkbox, Space, Switch, Typography } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChangeStatus } from '@/lib/types';

const STATUS_OPTIONS: { value: ChangeStatus; label: string }[] = [
  { value: 'pending', label: '대기' },
  { value: 'approved', label: '승인됨' },
  { value: 'processing', label: '처리 중' },
  { value: 'applied', label: '반영됨' },
  { value: 'rejected', label: '반려됨' },
  { value: 'failed', label: '실패' },
];

interface FilterBarProps {
  selected: ChangeStatus[];
  showDeleted: boolean;
}

export function FilterBar({ selected, showDeleted }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (next: { status?: ChangeStatus[]; deleted?: boolean }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.status !== undefined) {
      if (next.status.length > 0) {
        params.set('status', next.status.join(','));
      } else {
        params.delete('status');
      }
    }
    if (next.deleted !== undefined) {
      if (next.deleted) {
        params.set('deleted', '1');
      } else {
        params.delete('deleted');
      }
    }
    router.replace(`/admin/changes?${params.toString()}`);
  };

  return (
    <Space size="middle" wrap style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <Typography.Text strong>상태:</Typography.Text>
      <Checkbox.Group
        value={selected}
        onChange={(values) => updateParams({ status: values as ChangeStatus[] })}
        options={STATUS_OPTIONS}
      />
      <span style={{ marginLeft: 16 }}>
        <Typography.Text style={{ marginRight: 8 }}>삭제됨 보기</Typography.Text>
        <Switch
          checked={showDeleted}
          onChange={(checked) => updateParams({ deleted: checked })}
          size="small"
        />
      </span>
    </Space>
  );
}
