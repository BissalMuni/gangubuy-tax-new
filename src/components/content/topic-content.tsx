"use client";

import { Suspense, useRef } from "react";
import { AutoSectionComment } from "@/components/feedback/auto-section-comment";
import { SectionComment } from "@/components/feedback/section-comment";
import { getContentComponent } from "@/map";
import type { Book, TreeNode } from "@/book";

/** 소단원 콘텐츠 표시 + 모든 section h2/h3 옆에 의견 버튼 자동 주입 */
export function TopicContent({
  node,
  contentPath,
  book,
  mdText,
  tsxExists,
}: {
  node: TreeNode;
  contentPath: string;
  book: Book;
  /** MD 파일이 있으면 plain text. 있으면 TSX보다 우선. */
  mdText?: string | null;
  /** TSX 파일 존재 여부 (서버에서 미리 확인). 없으면 lazy import 시도하지 않음. */
  tsxExists?: boolean;
}) {
  // MD 우선, 없으면 TSX 파일이 실제 존재할 때만 lazy 시도
  const Content = mdText || !tsxExists ? null : getContentComponent(book, node);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">
          {node.title}
          {/* 소목차 전체에 대한 의견 버튼 */}
          <span className="ml-2 align-middle">
            <SectionComment sectionSlug={node.id} sectionTitle={node.title} level="minor" />
          </span>
        </h1>
      </div>

      <div ref={containerRef} className="topic-content">
        {mdText ? (
          <div className="whitespace-pre-wrap text-base leading-relaxed">{mdText}</div>
        ) : Content ? (
          <Suspense fallback={<p className="text-muted">콘텐츠를 불러오는 중...</p>}>
            <Content />
            {/* 모든 <section><h2> 옆에 의견 버튼 자동 주입.
                lazy Content 하이드레이션이 끝난 뒤에만 useEffect 가 실행되도록
                Suspense 내부에 둔다 (밖에 두면 h2 에 span 을 먼저 끼워넣어
                하이드레이션 미스매치 발생). */}
            <AutoSectionComment containerRef={containerRef} />
          </Suspense>
        ) : (
          <p className="text-muted italic">이 단원의 콘텐츠가 준비 중입니다.</p>
        )}
      </div>
    </>
  );
}
