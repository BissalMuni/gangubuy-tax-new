'use client';

import { useState } from 'react';
import { Radio, Switch, Space, Typography, App, Alert } from 'antd';
import type { AutomationMode } from '@/lib/changes/path-overrides';

interface ModeToggleProps {
  initialMode: AutomationMode;
  initialCronEnabled: boolean;
  /** 권한 (관리자만 편집) */
  canEdit: boolean;
}

export function ModeToggle({ initialMode, initialCronEnabled, canEdit }: ModeToggleProps) {
  const { message } = App.useApp();
  const [mode, setMode] = useState<AutomationMode>(initialMode);
  const [cronEnabled, setCronEnabled] = useState(initialCronEnabled);
  const [submitting, setSubmitting] = useState(false);

  const updateSettings = async (next: { mode?: AutomationMode; cron_enabled?: boolean }) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        message.error(err.error || '저장 실패');
        return;
      }
      message.success('저장되었습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleModeChange = (value: AutomationMode) => {
    setMode(value);
    updateSettings({ mode: value });
  };

  const handleCronToggle = (checked: boolean) => {
    setCronEnabled(checked);
    updateSettings({ cron_enabled: checked });
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={5}>글로벌 모드</Typography.Title>
        <Typography.Paragraph type="secondary">
          <strong>manual</strong>: 승인된 항목만 AI가 처리. 안전 우선. <br />
          <strong>auto</strong>: pending+approved 모두 AI가 처리. 빠른 반영.
        </Typography.Paragraph>
        <Radio.Group
          value={mode}
          onChange={(e) => handleModeChange(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          disabled={!canEdit || submitting}
        >
          <Radio.Button value="manual">Manual</Radio.Button>
          <Radio.Button value="auto">Auto</Radio.Button>
        </Radio.Group>
      </div>

      <div>
        <Typography.Title level={5}>비상 정지</Typography.Title>
        <Typography.Paragraph type="secondary">
          cron 워크플로 즉시 정지. workflow_dispatch(수동 실행)는 계속 가능.
        </Typography.Paragraph>
        {!cronEnabled && (
          <Alert
            type="warning"
            showIcon
            message="현재 cron이 정지된 상태입니다."
            style={{ marginBottom: 12 }}
          />
        )}
        <Space>
          <Switch
            checked={cronEnabled}
            onChange={handleCronToggle}
            disabled={!canEdit || submitting}
            checkedChildren="cron 켜짐"
            unCheckedChildren="cron 정지"
          />
        </Space>
      </div>
    </Space>
  );
}
