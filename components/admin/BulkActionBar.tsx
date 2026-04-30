'use client';

import { useState } from 'react';
import { Button, Space, Modal, Input, App } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

interface SelectableItem {
  kind: 'comment' | 'attachment';
  id: string;
  updated_at: string;
}

interface BulkActionBarProps {
  selected: SelectableItem[];
  onClear: () => void;
  canRestore: boolean;
}

function group(items: SelectableItem[]) {
  return {
    comments: items.filter((i) => i.kind === 'comment'),
    attachments: items.filter((i) => i.kind === 'attachment'),
  };
}

async function postBulk(
  endpoint: string,
  kind: 'comment' | 'attachment',
  items: SelectableItem[],
  extra: Record<string, unknown> = {},
): Promise<Response> {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      kind,
      ids: items.map((i) => ({ id: i.id, expected_updated_at: i.updated_at })),
      ...extra,
    }),
  });
}

export function BulkActionBar({ selected, onClear, canRestore }: BulkActionBarProps) {
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const count = selected.length;
  const groups = group(selected);

  const handleApprove = async () => {
    if (count === 0) return;
    setSubmitting(true);
    try {
      const results = [];
      if (groups.comments.length > 0) {
        results.push(await postBulk('/api/admin/changes/approve', 'comment', groups.comments));
      }
      if (groups.attachments.length > 0) {
        results.push(await postBulk('/api/admin/changes/approve', 'attachment', groups.attachments));
      }
      const failed = results.filter((r) => !r.ok && r.status !== 207);
      if (failed.length > 0) {
        message.error('일부 항목 승인에 실패했습니다.');
      } else {
        message.success(`${count}건 승인되었습니다.`);
        onClear();
        window.dispatchEvent(new CustomEvent('changes-refresh'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (count === 0 || !rejectReason.trim()) return;
    setSubmitting(true);
    try {
      const results = [];
      if (groups.comments.length > 0) {
        results.push(
          await postBulk('/api/admin/changes/reject', 'comment', groups.comments, {
            reason: rejectReason.trim(),
          }),
        );
      }
      if (groups.attachments.length > 0) {
        results.push(
          await postBulk('/api/admin/changes/reject', 'attachment', groups.attachments, {
            reason: rejectReason.trim(),
          }),
        );
      }
      const failed = results.filter((r) => !r.ok && r.status !== 207);
      if (failed.length > 0) {
        message.error('일부 항목 반려에 실패했습니다.');
      } else {
        message.success(`${count}건 반려되었습니다.`);
        setRejectOpen(false);
        setRejectReason('');
        onClear();
        window.dispatchEvent(new CustomEvent('changes-refresh'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (count === 0) return;
    setSubmitting(true);
    try {
      const results = [];
      if (groups.comments.length > 0) {
        results.push(
          await fetch('/api/admin/changes/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'comment', ids: groups.comments.map((c) => c.id) }),
          }),
        );
      }
      if (groups.attachments.length > 0) {
        results.push(
          await fetch('/api/admin/changes/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'attachment', ids: groups.attachments.map((a) => a.id) }),
          }),
        );
      }
      const failed = results.filter((r) => !r.ok && r.status !== 207);
      if (failed.length > 0) {
        message.error('일부 항목 삭제에 실패했습니다.');
      } else {
        message.success(`${count}건 삭제되었습니다.`);
        onClear();
        window.dispatchEvent(new CustomEvent('changes-refresh'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Space style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', flexWrap: 'wrap' }}>
        <span>선택: <strong>{count}</strong>건</span>
        <Button
          icon={<CheckCircleOutlined />}
          type="primary"
          onClick={handleApprove}
          disabled={count === 0 || submitting}
          loading={submitting}
        >
          선택 승인
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          danger
          onClick={() => setRejectOpen(true)}
          disabled={count === 0 || submitting}
        >
          선택 반려
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          disabled={count === 0 || submitting}
        >
          선택 삭제
        </Button>
        {count > 0 && (
          <Button type="text" onClick={onClear}>
            선택 해제
          </Button>
        )}
        {!canRestore && <span style={{ color: '#999' }}>(복원 권한은 관리자 전용)</span>}
      </Space>

      <Modal
        title="선택 항목 반려"
        open={rejectOpen}
        onOk={handleReject}
        confirmLoading={submitting}
        onCancel={() => setRejectOpen(false)}
        okText="반려"
        cancelText="취소"
        okButtonProps={{ danger: true, disabled: !rejectReason.trim() }}
      >
        <p>반려 사유를 입력해 주세요. (필수)</p>
        <Input.TextArea
          rows={3}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          maxLength={500}
          showCount
        />
      </Modal>
    </>
  );
}
