'use client';

import { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';
import { useSections } from '@/lib/context/sections-context';

const { TextArea } = Input;

interface CommentFormProps {
  onSubmit: (author: string, body: string, section?: string | null) => Promise<void>;
  loading?: boolean;
}

export function CommentForm({ onSubmit, loading }: CommentFormProps) {
  const [author] = useState('익명');
  const [body, setBody] = useState('');
  const [section, setSection] = useState<string | null>(null);
  const { sections } = useSections();

  const handleSubmit = async () => {
    if (!body.trim()) return;
    await onSubmit(author, body.trim(), section);
    setBody('');
    setSection(null);
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <Form layout="vertical">
        {sections.length > 0 && (
          <Form.Item label="해당 메뉴" style={{ marginBottom: 8 }}>
            <Select
              placeholder="수정사항이 해당하는 메뉴를 선택하세요 (선택사항)"
              value={section}
              onChange={(val) => setSection(val)}
              allowClear
              style={{ maxWidth: 360 }}
              options={sections.map((s) => ({ value: s.id, label: s.label }))}
            />
          </Form.Item>
        )}
        <Form.Item label="댓글" style={{ marginBottom: 8 }}>
          <TextArea
            rows={3}
            placeholder="댓글을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={5000}
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!body.trim()}
        >
          댓글 작성
        </Button>
      </Form>
    </div>
  );
}
