"use client";

import { Suspense } from "react";
import { getContentComponent } from "@/lib/map";
import type { Book, TreeNode } from "@/lib/book";

/** 소단원 콘텐츠 표시 — React.lazy로 동적 로드 */
export function TopicContent({
  node,
  contentPath,
  book,
}: {
  node: TreeNode;
  contentPath: string;
  book: Book;
}) {
  const Content = getContentComponent(book, node);

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">{node.title}</h1>
      </div>

      <div>
        {Content ? (
          <Suspense fallback={<p className="text-gray-400">콘텐츠를 불러오는 중...</p>}>
            <Content />
          </Suspense>
        ) : (
          <p className="text-gray-400 italic">이 단원의 콘텐츠가 준비 중입니다.</p>
        )}
      </div>
    </>
  );
}
