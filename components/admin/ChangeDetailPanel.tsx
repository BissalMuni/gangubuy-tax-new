'use client';

import { Card, Descriptions, Tag, Typography, Button, App } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import type { Comment, Attachment } from '@/lib/types';

interface ChangeDetailPanelProps {
  item: Comment | Attachment;
  kind: 'comment' | 'attachment';
  canRestore: boolean;
}

function isComment(item: Comment | Attachment, kind: 'comment' | 'attachment'): item is Comment {
  return kind === 'comment';
}

export function ChangeDetailPanel({ item, kind, canRestore }: ChangeDetailPanelProps) {
  const { message } = App.useApp();

  const handleRestore = async () => {
    const res = await fetch('/api/admin/changes/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ids: [item.id] }),
    });
    if (res.ok) {
      message.success('복원되었습니다. 새로고침 후 반영됩니다.');
      window.dispatchEvent(new CustomEvent('changes-refresh'));
    } else {
      message.error('복원에 실패했습니다.');
    }
  };

  return (
    <Card title="상세" size="small" style={{ margin: 16 }}>
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="ID">
          <Typography.Text code copyable>{item.id}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="경로">
          <code>{item.content_path}</code>
        </Descriptions.Item>
        <Descriptions.Item label="상태">
          <Tag>{item.status ?? 'pending'}</Tag>
          {item.deleted_at && <Tag color="red">삭제됨</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="대상 종류">
          {item.target_kind ?? 'content'}
        </Descriptions.Item>
        <Descriptions.Item label="작성일">
          {new Date(item.created_at).toLocaleString('ko-KR')}
        </Descriptions.Item>
        {item.reviewer && (
          <Descriptions.Item label="검토자">{item.reviewer}</Descriptions.Item>
        )}
        {item.reject_reason && (
          <Descriptions.Item label="반려 사유">{item.reject_reason}</Descriptions.Item>
        )}
        {item.applied_commit_sha && (
          <Descriptions.Item label="커밋 SHA">
            <Typography.Text code>{item.applied_commit_sha}</Typography.Text>
          </Descriptions.Item>
        )}
        {item.error_log && (
          <Descriptions.Item label="에러 로그">
            <Typography.Paragraph type="danger">{item.error_log}</Typography.Paragraph>
          </Descriptions.Item>
        )}
      </Descriptions>

      {isComment(item, kind) && item.body && (
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={5}>본문</Typography.Title>
          <Typography.Paragraph style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12 }}>
            {item.body}
          </Typography.Paragraph>
        </div>
      )}

      {!isComment(item, kind) && (
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={5}>첨부 파일</Typography.Title>
          {(item as Attachment).download_url ? (
            <Typography.Link href={(item as Attachment).download_url} target="_blank" rel="noreferrer">
              {(item as Attachment).file_name} ({Math.round((item as Attachment).file_size / 1024)} KB)
            </Typography.Link>
          ) : (
            <Typography.Text>{(item as Attachment).file_name}</Typography.Text>
          )}
        </div>
      )}

      {canRestore && item.deleted_at && (
        <Button
          icon={<UndoOutlined />}
          onClick={handleRestore}
          style={{ marginTop: 16 }}
          type="primary"
          ghost
        >
          복원 (관리자)
        </Button>
      )}
    </Card>
  );
}
