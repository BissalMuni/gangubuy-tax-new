'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSections } from '@/lib/context/sections-context';
import { SectionCommentButton } from './SectionCommentButton';

/**
 * SectionNav에서 등록된 각 섹션의 h2 요소를 찾아
 * React Portal로 댓글 버튼을 주입하는 컴포넌트
 */
export function SectionCommentButtons() {
  const { sections, contentPath } = useSections();
  const [containers, setContainers] = useState<{ sectionId: string; el: HTMLElement }[]>([]);

  useEffect(() => {
    if (!contentPath || sections.length === 0) return;

    const newContainers: { sectionId: string; el: HTMLElement }[] = [];

    for (const section of sections) {
      const heading = document.getElementById(section.id);
      if (!heading) continue;

      // 이미 버튼 컨테이너가 있으면 스킵
      const existing = heading.querySelector('[data-comment-portal]');
      if (existing) {
        newContainers.push({ sectionId: section.id, el: existing as HTMLElement });
        continue;
      }

      // Outline 컴포넌트(div)가 있으면 그 안쪽 텍스트 옆에 붙이기
      const target = heading.querySelector('div') || heading;

      const container = document.createElement('span');
      container.setAttribute('data-comment-portal', section.id);
      container.style.display = 'inline';
      container.style.verticalAlign = 'middle';
      target.appendChild(container);
      newContainers.push({ sectionId: section.id, el: container });
    }

    setContainers(newContainers);

    return () => {
      for (const { el } of newContainers) {
        el.remove();
      }
    };
  }, [sections, contentPath]);

  if (!contentPath || containers.length === 0) return null;

  return (
    <>
      {containers.map(({ sectionId, el }) =>
        createPortal(<SectionCommentButton sectionId={sectionId} />, el),
      )}
    </>
  );
}
