'use client';

import { useState } from 'react';
import { Button, Modal, Input, App } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { useSections } from '@/lib/context/sections-context';

const { TextArea } = Input;

interface SectionCommentButtonProps {
  sectionId: string;
}

export function SectionCommentButton({ sectionId }: SectionCommentButtonProps) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { sections, contentPath } = useSections();
  const { message } = App.useApp();

  const sectionLabel = sections.find((s) => s.id === sectionId)?.label ?? sectionId;

  const handleSubmit = async () => {
    if (!body.trim() || !contentPath) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_path: contentPath,
          author: '익명',
          body: body.trim(),
          section: sectionId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '댓글 작성에 실패했습니다.');
        return;
      }

      message.success('댓글이 등록되었습니다.');
      setBody('');
      setOpen(false);
      window.dispatchEvent(new CustomEvent('comments-refresh'));
    } catch {
      message.error('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!contentPath) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={`${sectionLabel} 섹션에 댓글 작성`}
        className="inline-flex items-center justify-center w-6 h-6 ml-2 text-gray-400 hover:text-blue-500 transition-colors rounded cursor-pointer"
        style={{ border: 'none', background: 'none', verticalAlign: 'middle' }}
      >
        <CommentOutlined style={{ fontSize: 16 }} />
      </button>
      <Modal
        title={
          <span>
            댓글 작성 — <span style={{ color: '#1677ff' }}>{sectionLabel}</span>
          </span>
        }
        open={open}
        onCancel={() => { setOpen(false); setBody(''); }}
        footer={null}
        destroyOnClose
      >
        <div style={{ marginTop: 16 }}>
          <TextArea
            rows={4}
            placeholder="댓글을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={5000}
            autoFocus
          />
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={!body.trim()}
            >
              작성
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
