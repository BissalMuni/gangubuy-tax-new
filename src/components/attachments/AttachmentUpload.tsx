'use client';

import { useState, useRef, useEffect } from 'react';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@/lib/types';

interface AttachmentUploadProps {
  contentPath: string;
  onUploaded: () => void;
}

export function AttachmentUpload({ contentPath, onUploaded }: AttachmentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 토스트 자동 제거
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 선택 후 input 초기화 (같은 파일 다시 선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (file.size > MAX_FILE_SIZE) {
      setToast({ type: 'error', text: '파일 크기는 10MB를 초과할 수 없습니다.' });
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      setToast({ type: 'error', text: '허용되지 않는 파일 형식입니다.' });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content_path', contentPath);
      formData.append('uploaded_by', '익명');

      const res = await fetch('/api/attachments', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        setToast({ type: 'error', text: err.error || '업로드에 실패했습니다.' });
        return;
      }

      setToast({ type: 'success', text: '파일이 업로드되었습니다.' });
      onUploaded();
    } catch {
      setToast({ type: 'error', text: '업로드에 실패했습니다.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
        aria-label="파일 업로드 (최대 10MB)"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
      >
        {uploading ? (
          <svg className="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
        파일 업로드
      </button>

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
