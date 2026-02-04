'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography, Divider, Spin, App } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import type { Comment } from '@/lib/types';

const { Title } = Typography;

interface CommentListProps {
  contentPath: string;
}

export function CommentList({ contentPath }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { message } = App.useApp();

  const [currentAuthor, setCurrentAuthor] = useState('');

  useEffect(() => {
    setCurrentAuthor(localStorage.getItem('gangubuy-comment-author') || '');
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?content_path=${encodeURIComponent(contentPath)}`,
      );
      const data = await res.json();
      setComments(data.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [contentPath]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (author: string, body: string) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content_path: contentPath, author, body }),
      });

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '댓글 작성에 실패했습니다.');
        return;
      }

      message.success('댓글이 등록되었습니다.');
      await fetchComments();
    } catch {
      message.error('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `/api/comments/${id}?author=${encodeURIComponent(currentAuthor)}`,
        { method: 'DELETE' },
      );

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '삭제에 실패했습니다.');
        return;
      }

      message.success('댓글이 삭제되었습니다.');
      await fetchComments();
    } catch {
      message.error('삭제에 실패했습니다.');
    }
  };

  return (
    <div id="comments-section" style={{ marginTop: 48 }}>
      <Divider />
      <Title level={5}>
        <CommentOutlined style={{ marginRight: 8 }} />
        댓글 ({comments.length})
      </Title>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      ) : (
        <>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentAuthor={currentAuthor}
              onDelete={handleDelete}
            />
          ))}
          <CommentForm onSubmit={handleSubmit} loading={submitting} />
        </>
      )}
    </div>
  );
}
