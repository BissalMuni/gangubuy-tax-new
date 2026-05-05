'use client';

import { useState } from 'react';
import { useSections } from '@/lib/context/sections-context';

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
    <div className="py-4">
      <form onSubmit={(e) => e.preventDefault()}>
        {sections.length > 0 && (
          <div className="mb-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              해당 메뉴
            </label>
            <select
              value={section ?? ''}
              onChange={(e) => setSection(e.target.value || null)}
              className="max-w-[360px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">수정사항이 해당하는 메뉴를 선택하세요 (선택사항)</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            댓글
          </label>
          <textarea
            rows={3}
            placeholder="댓글을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={5000}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!body.trim() || loading}
          className="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? '작성 중...' : '댓글 작성'}
        </button>
      </form>
    </div>
  );
}
