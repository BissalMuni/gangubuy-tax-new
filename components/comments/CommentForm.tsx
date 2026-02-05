'use client';

import { useState } from 'react';
import { Input, Button, Form } from 'antd';

const { TextArea } = Input;

interface CommentFormProps {
  onSubmit: (author: string, body: string) => Promise<void>;
  loading?: boolean;
}

export function CommentForm({ onSubmit, loading }: CommentFormProps) {
  // 작성자를 '익명'으로 고정
  const [author] = useState('익명');
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    if (!body.trim()) return;

    // localStorage 저장 비활성화
    // localStorage.setItem('gangubuy-comment-author', author.trim());
    await onSubmit(author, body.trim());
    setBody('');
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <Form layout="vertical">
        {/* 작성자 입력 필드 비활성화 */}
        {/* <Form.Item label="작성자" style={{ marginBottom: 8 }}>
          <Input
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
            style={{ maxWidth: 200 }}
          />
        </Form.Item> */}
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
