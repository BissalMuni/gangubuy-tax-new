'use client';

import { useCallback } from 'react';
import { InfiniteScrollLoader } from './InfiniteScrollLoader';
import { CommentList } from '@/components/comments/CommentList';
import { AttachmentList } from '@/components/attachments/AttachmentList';
import type { TaxCategory } from '@/lib/types';

interface ContentPageWrapperProps {
  currentPath: string;
  category: TaxCategory;
  children: React.ReactNode;
}

export function ContentPageWrapper({
  currentPath,
  category,
  children,
}: ContentPageWrapperProps) {
  const handleVisiblePathChange = useCallback((path: string) => {
    // Dispatch a custom event so Sidebar can react to path changes from scroll
    window.dispatchEvent(
      new CustomEvent('content-path-change', { detail: { path } }),
    );
  }, []);

  // Convert path to content_path for comments (remove leading slash)
  const contentPath = currentPath.replace(/^\//, '');

  return (
    <div>
      {children}
      <InfiniteScrollLoader
        initialPath={currentPath}
        category={category}
        onVisiblePathChange={handleVisiblePathChange}
      />
      <AttachmentList contentPath={contentPath} />
      <CommentList contentPath={contentPath} />
    </div>
  );
}
