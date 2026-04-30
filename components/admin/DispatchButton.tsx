'use client';

import { useState } from 'react';
import { Button, App, Modal } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

export function DispatchButton() {
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDispatch = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: 'review-feedback.yml', ref: 'main' }),
      });
      if (res.ok) {
        message.success('워크플로가 실행 큐에 들어갔습니다.');
        setConfirmOpen(false);
      } else {
        const err = await res.json().catch(() => ({}));
        message.error(`실행 실패 (${res.status}): ${err.error || ''}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<ThunderboltOutlined />}
        onClick={() => setConfirmOpen(true)}
      >
        지금 처리 (workflow_dispatch)
      </Button>
      <Modal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onOk={handleDispatch}
        confirmLoading={submitting}
        title="강제 실행 확인"
        okText="실행"
        cancelText="취소"
      >
        <p>
          review-feedback 워크플로를 즉시 실행합니다. cron 정지 상태에서도 통과합니다.
          승인된 항목이 처리됩니다.
        </p>
      </Modal>
    </>
  );
}
