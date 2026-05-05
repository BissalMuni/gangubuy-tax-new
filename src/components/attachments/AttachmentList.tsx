'use client';

import { useState, useEffect, useCallback } from 'react';
import { AttachmentUpload } from './AttachmentUpload';
import type { Attachment } from '@/lib/types';

interface AttachmentListProps {
  contentPath: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentList({ contentPath }: AttachmentListProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [currentUser, setCurrentUser] = useState('');

  // 토스트 자동 제거
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    setCurrentUser(localStorage.getItem('gangubuy-comment-author') || '');
  }, []);

  const fetchAttachments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/attachments?content_path=${encodeURIComponent(contentPath)}`,
      );
      const data = await res.json();
      setAttachments(data.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [contentPath]);

  useEffect(() => {
    fetchAttachments();
  }, [fetchAttachments]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('파일을 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(
        `/api/attachments/${id}?uploaded_by=${encodeURIComponent(currentUser)}`,
        { method: 'DELETE' },
      );

      if (!res.ok) {
        const err = await res.json();
        setToast({ type: 'error', text: err.error || '삭제에 실패했습니다.' });
        return;
      }

      setToast({ type: 'success', text: '파일이 삭제되었습니다.' });
      await fetchAttachments();
    } catch {
      setToast({ type: 'error', text: '삭제에 실패했습니다.' });
    }
  };

  return (
    <section id="attachments-section" role="region" aria-label="첨부파일" className="mt-8">
      <hr className="border-gray-200" />
      <div className="mb-4 mt-4 flex items-center justify-between">
        <h5 id="attachments-heading" className="m-0 flex items-center gap-2 text-base font-semibold">
          {/* 클립 아이콘 */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
          </svg>
          첨부파일 ({attachments.length})
        </h5>
        <AttachmentUpload contentPath={contentPath} onUploaded={fetchAttachments} />
      </div>

      {loading ? (
        <div className="p-6 text-center" aria-label="첨부파일 로딩 중">
          <svg className="mx-auto h-6 w-6 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : attachments.length === 0 ? (
        <div className="p-6 text-center text-gray-400">
          첨부파일이 없습니다
        </div>
      ) : (
        <div>
          {attachments.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-100 py-2"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* 파일 아이콘 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <div className="min-w-0">
                  <div className="font-medium">{item.file_name}</div>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(item.file_size)} · {item.uploaded_by} ·{' '}
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                      {item.mime_type.split('/').pop()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                {item.download_url && (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {/* 다운로드 아이콘 */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    다운로드
                  </a>
                )}
                {item.uploaded_by === currentUser && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded border border-red-200 p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label={`${item.file_name} 삭제`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
