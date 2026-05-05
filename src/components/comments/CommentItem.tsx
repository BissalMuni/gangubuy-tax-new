'use client';

import type { Comment } from '@/lib/types';
import type { Section } from '@/lib/context/sections-context';

interface CommentItemProps {
  comment: Comment;
  currentAuthor: string;
  onDelete: (id: string) => void;
  sections?: Section[];
}

export function CommentItem({ comment, currentAuthor, onDelete, sections }: CommentItemProps) {
  const isOwner = comment.author === currentAuthor;
  const date = new Date(comment.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const sectionLabel = comment.section
    ? (sections?.find((s) => s.id === comment.section)?.label ?? comment.section)
    : null;

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(comment.id);
    }
  };

  return (
    <article
      aria-label={`${comment.author}의 댓글`}
      className="border-b border-gray-100 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* 사용자 아이콘 */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">{comment.author}</span>
          {sectionLabel && (
            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              {sectionLabel}
            </span>
          )}
          <span className="text-xs text-gray-500">
            <time dateTime={comment.created_at}>{date}</time>
          </span>
          {comment.processed && (
            <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-xs text-green-600">
              {/* 체크 아이콘 */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              반영됨
            </span>
          )}
        </div>
        {isOwner && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-400 transition-colors hover:text-red-600"
            aria-label="댓글 삭제"
          >
            {/* 삭제 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <p className="mb-0 mt-2 whitespace-pre-wrap">
        {comment.body}
      </p>
    </article>
  );
}
