'use client';

import type { TaxCategory } from '@/lib/types';

interface ContentPageWrapperProps {
  currentPath: string;
  category: TaxCategory;
  children: React.ReactNode;
}

export function ContentPageWrapper({
  children,
}: ContentPageWrapperProps) {
  return (
    <div>
      {children}
    </div>
  );
}
