'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography, Divider, Spin, App, Segmented } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { useSections } from '@/lib/context/sections-context';
import type { Comment } from '@/lib/types';

const { Title } = Typography;

interface CommentListProps {
  contentPath: string;
}

export function CommentList({ contentPath }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const { message } = App.useApp();
  const { sections } = useSections();

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

  // 섹션 댓글 팝업에서 작성 시 새로고침
  useEffect(() => {
    const handler = () => fetchComments();
    window.addEventListener('comments-refresh', handler);
    return () => window.removeEventListener('comments-refresh', handler);
  }, [fetchComments]);

  const handleSubmit = async (author: string, body: string, section?: string | null) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content_path: contentPath, author, body, section }),
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

  // 섹션 필터 옵션 생성 (댓글에 실제 사용된 섹션만 포함)
  const usedSectionIds = new Set(comments.map((c) => c.section).filter(Boolean));
  const filterOptions = [
    { label: `전체 (${comments.length})`, value: '전체' },
    ...sections
      .filter((s) => usedSectionIds.has(s.id))
      .map((s) => ({
        label: `${s.label} (${comments.filter((c) => c.section === s.id).length})`,
        value: s.id,
      })),
    ...(usedSectionIds.has(null) || comments.some((c) => !c.section)
      ? [{ label: `기타 (${comments.filter((c) => !c.section).length})`, value: '__none__' }]
      : []),
  ];

  const filteredComments = comments.filter((c) => {
    if (activeFilter === '전체') return true;
    if (activeFilter === '__none__') return !c.section;
    return c.section === activeFilter;
  });

  return (
    <section id="comments-section" role="region" aria-label="댓글" style={{ marginTop: 48 }}>
      <Divider />
      <Title level={5} id="comments-heading">
        <CommentOutlined style={{ marginRight: 8 }} />
        댓글 ({comments.length})
      </Title>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }} aria-label="댓글 로딩 중">
          <Spin />
        </div>
      ) : (
        <>
          {sections.length > 0 && filterOptions.length > 1 && (
            <div style={{ marginBottom: 16 }}>
              <Segmented
                options={filterOptions}
                value={activeFilter}
                onChange={(val) => setActiveFilter(val as string)}
              />
            </div>
          )}
          {filteredComments.map((comment, idx) => (
            <CommentItem
              key={comment.id ?? `imported-${comment.commit_sha ?? idx}-${idx}`}
              comment={comment}
              currentAuthor={currentAuthor}
              onDelete={handleDelete}
              sections={sections}
            />
          ))}
          <CommentForm onSubmit={handleSubmit} loading={submitting} />
        </>
      )}
    </section>
  );
}
