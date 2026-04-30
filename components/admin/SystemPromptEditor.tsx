'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Typography, App, List, Modal } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';

interface SystemPromptEditorProps {
  initial: string;
  canEdit: boolean;
}

interface HistoryEntry {
  id: string;
  prompt: string;
  updated_by: string;
  updated_at: string;
}

export function SystemPromptEditor({ initial, canEdit }: SystemPromptEditorProps) {
  const { message } = App.useApp();
  const [text, setText] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_prompt: text }),
      });
      if (!res.ok) {
        message.error('저장 실패');
        return;
      }
      message.success('시스템 프롬프트가 저장되었습니다. 다음 워크플로 실행부터 적용됩니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/admin/prompt-history');
      if (res.ok) {
        const json = await res.json();
        setHistory(json.data || []);
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (historyOpen) loadHistory();
  }, [historyOpen]);

  const handleRestore = (entry: HistoryEntry) => {
    setText(entry.prompt);
    setHistoryOpen(false);
    message.info('복원할 프롬프트를 편집창에 채웠습니다. "저장"을 눌러 적용하세요.');
  };

  return (
    <div>
      <Typography.Title level={5}>AI 시스템 프롬프트</Typography.Title>
      <Typography.Paragraph type="secondary">
        Claude에게 전달되는 절대 규칙. 변경 시 이전 버전이 history에 자동 저장됩니다.
      </Typography.Paragraph>
      <Input.TextArea
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!canEdit}
        spellCheck={false}
        maxLength={20000}
        showCount
        style={{ fontFamily: 'monospace', fontSize: 13 }}
      />
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Button type="primary" onClick={handleSave} loading={submitting} disabled={!canEdit}>
          저장
        </Button>
        <Button icon={<HistoryOutlined />} onClick={() => setHistoryOpen(true)}>
          이력 보기
        </Button>
      </div>

      <Modal
        title="프롬프트 변경 이력"
        open={historyOpen}
        onCancel={() => setHistoryOpen(false)}
        footer={null}
        width={720}
      >
        <List
          loading={historyLoading}
          dataSource={history}
          locale={{ emptyText: '이력이 없습니다' }}
          renderItem={(entry) => (
            <List.Item
              actions={[
                <Button key="restore" size="small" onClick={() => handleRestore(entry)}>
                  이 버전으로 복원
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <span>
                    {new Date(entry.updated_at).toLocaleString('ko-KR')} · {entry.updated_by}
                  </span>
                }
                description={
                  <Typography.Paragraph
                    style={{
                      whiteSpace: 'pre-wrap',
                      maxHeight: 120,
                      overflow: 'auto',
                      background: '#fafafa',
                      padding: 8,
                      fontSize: 12,
                    }}
                  >
                    {entry.prompt}
                  </Typography.Paragraph>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
