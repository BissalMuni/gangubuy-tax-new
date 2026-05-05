'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSections } from '@/lib/context/sections-context';

interface SectionCommentButtonProps {
  sectionId: string;
}

export function SectionCommentButton({ sectionId }: SectionCommentButtonProps) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { sections, contentPath } = useSections();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sectionLabel = sections.find((s) => s.id === sectionId)?.label ?? sectionId;

  // 토스트 자동 제거
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const openModal = useCallback(() => {
    setOpen(true);
    // dialog를 다음 프레임에서 열기
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      textareaRef.current?.focus();
    });
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
    setBody('');
  }, []);

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
        setToast({ type: 'error', text: err.error || '댓글 작성에 실패했습니다.' });
        return;
      }

      setToast({ type: 'success', text: '댓글이 등록되었습니다.' });
      setBody('');
      setOpen(false);
      dialogRef.current?.close();
      window.dispatchEvent(new CustomEvent('comments-refresh'));
    } catch {
      setToast({ type: 'error', text: '댓글 작성에 실패했습니다.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!contentPath) return null;

  return (
    <>
      <button
        onClick={openModal}
        title={`${sectionLabel} 섹션에 댓글 작성`}
        className="ml-2 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded border-none bg-transparent align-middle text-gray-400 transition-colors hover:text-blue-500"
      >
        {/* 댓글 아이콘 */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <dialog
          ref={dialogRef}
          onClose={closeModal}
          className="w-full max-w-lg rounded-lg border-none p-0 shadow-xl backdrop:bg-black/50"
        >
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                댓글 작성 — <span className="text-blue-500">{sectionLabel}</span>
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
                aria-label="닫기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <textarea
              ref={textareaRef}
              rows={4}
              placeholder="댓글을 입력하세요"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={5000}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!body.trim() || submitting}
                className="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? '작성 중...' : '작성'}
              </button>
            </div>
          </div>
        </dialog>
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
    </>
  );
}
