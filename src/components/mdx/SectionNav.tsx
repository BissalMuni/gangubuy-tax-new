'use client';

import { useEffect } from 'react';
import { useSections } from '@/lib/context/sections-context';

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

/**
 * SectionNav 자체는 더 이상 UI를 렌더링하지 않는다.
 * 콘텐츠 파일 안에서 여러 번 호출되어도 섹션 등록만 수행하며,
 * 실제 표시는 페이지에 단 한 번 마운트되는 FloatingSectionNav가 담당한다.
 */
export function SectionNav({ sections = [] }: SectionNavProps) {
  const { registerSections } = useSections();

  useEffect(() => {
    registerSections(sections);
    // sections prop은 콘텐츠에서 정적으로 정의되므로 최초 1회만 등록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
