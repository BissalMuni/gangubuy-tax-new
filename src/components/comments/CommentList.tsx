'use client';

import { useState, useEffect, useCallback } from 'react';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { useSections } from '@/lib/context/sections-context';
import type { Comment } from '@/lib/types';

interface CommentListProps {
  contentPath: string;
}

export function CommentList({ contentPath }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { sections } = useSections();

  const [currentAuthor, setCurrentAuthor] = useState('');

  // 토스트 자동 제거
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
        setToast({ type: 'error', text: err.error || '댓글 작성에 실패했습니다.' });
        return;
      }

      setToast({ type: 'success', text: '댓글이 등록되었습니다.' });
      await fetchComments();
    } catch {
      setToast({ type: 'error', text: '댓글 작성에 실패했습니다.' });
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
        setToast({ type: 'error', text: err.error || '삭제에 실패했습니다.' });
        return;
      }

      setToast({ type: 'success', text: '댓글이 삭제되었습니다.' });
      await fetchComments();
    } catch {
      setToast({ type: 'error', text: '삭제에 실패했습니다.' });
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
    <section id="comments-section" role="region" aria-label="댓글" className="mt-12">
      <hr className="border-gray-200" />
      <h5 id="comments-heading" className="mb-4 mt-4 flex items-center gap-2 text-base font-semibold">
        {/* 댓글 아이콘 */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        댓글 ({comments.length})
      </h5>

      {loading ? (
        <div className="p-6 text-center" aria-label="댓글 로딩 중">
          {/* 로딩 스피너 */}
          <svg className="mx-auto h-6 w-6 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        <>
          {sections.length > 0 && filterOptions.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setActiveFilter(opt.value)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    activeFilter === opt.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          {filteredComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentAuthor={currentAuthor}
              onDelete={handleDelete}
              sections={sections}
            />
          ))}
          <CommentForm onSubmit={handleSubmit} loading={submitting} />
        </>
      )}

      {/* 토스트 메시지 */}
      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.text}
        </div>
      )}
    </section>
  );
}
