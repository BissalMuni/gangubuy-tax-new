'use client';

import { useState } from 'react';
import { Button, Input, Typography, App, Alert } from 'antd';

interface PathOverrideEditorProps {
  initial: Record<string, string>;
  canEdit: boolean;
}

export function PathOverrideEditor({ initial, canEdit }: PathOverrideEditorProps) {
  const { message } = App.useApp();
  const [text, setText] = useState(JSON.stringify(initial, null, 2));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'invalid JSON';
      setError(`JSON 파싱 실패: ${msg}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path_overrides: parsed }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setError(e.error || '저장 실패');
        return;
      }
      message.success('path_overrides가 저장되었습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography.Title level={5}>경로별 모드 강제 (path_overrides)</Typography.Title>
      <Typography.Paragraph type="secondary">
        JSON 객체 형식. 키는 minimatch glob 패턴, 값은 <code>auto</code> 또는 <code>manual</code>.
        예: <code>{`{ "content/property-tax/**": "manual" }`}</code>
      </Typography.Paragraph>
      <Input.TextArea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!canEdit}
        spellCheck={false}
        style={{ fontFamily: 'monospace', fontSize: 13 }}
      />
      {error && <Alert type="error" showIcon message={error} style={{ marginTop: 12 }} />}
      <Button
        type="primary"
        onClick={handleSave}
        loading={submitting}
        disabled={!canEdit}
        style={{ marginTop: 12 }}
      >
        저장
      </Button>
    </div>
  );
}
