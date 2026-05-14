'use client';

import { useEffect, useRef, useState } from 'react';
import { useSections } from '@/lib/context/sections-context';

// 가장 가까운 세로 스크롤 가능한 조상 요소를 찾는다.
// 레이아웃이 <main class="overflow-y-auto">이면 window가 아니라 main이 스크롤 컨테이너다.
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let parent: HTMLElement | null = node?.parentElement ?? null;
  while (parent) {
    const overflowY = getComputedStyle(parent).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') return parent;
    parent = parent.parentElement;
  }
  return null;
}

const HEADER_OFFSET = 80; // 스크롤 이동 시 active 임계선 / 스크롤 도착 위치 기준

/**
 * 페이지에 단 1회 마운트되는 플로팅 섹션 네비.
 * - 스크롤 중에만 보이고, 정지 후 1.5초가 지나면 사라진다.
 * - 기본은 현재 섹션 이름이 적힌 작은 버튼.
 * - 데스크탑에서는 마우스 올리면 펼쳐지고, 모바일/데스크탑 모두 버튼 클릭으로 토글된다.
 */
export function FloatingSectionNav() {
  const { sections } = useSections();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const firstEl = document.getElementById(sections[0].id);
    const scrollParent = getScrollParent(firstEl);
    const target: HTMLElement | Window = scrollParent ?? window;

    const computeActive = () => {
      const scrollTop = scrollParent ? scrollParent.scrollTop : window.scrollY;
      const containerTop = scrollParent ? scrollParent.getBoundingClientRect().top : 0;
      const threshold = scrollTop + HEADER_OFFSET + 8;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (!element) continue;
        const elementTop = scrollParent
          ? element.getBoundingClientRect().top - containerTop + scrollTop
          : element.offsetTop;
        if (elementTop <= threshold) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection(sections[0]?.id ?? '');
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setIsScrolling(false), 1500);
      computeActive();
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    computeActive();

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [sections]);

  // 펼쳐진 상태에서 바깥을 누르면 닫는다 (모바일 탭 닫기).
  useEffect(() => {
    if (!isExpanded) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isExpanded]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const scrollParent = getScrollParent(element);

    if (scrollParent) {
      const containerRect = scrollParent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const top = elementRect.top - containerRect.top + scrollParent.scrollTop - HEADER_OFFSET;
      scrollParent.scrollTo({ top, behavior: 'smooth' });
    } else {
      const top = element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  if (sections.length === 0) return null;

  const activeLabel =
    sections.find((s) => s.id === activeSection)?.label ?? sections[0].label;
  const visible = isScrolling || isExpanded;

  return (
    <div
      ref={containerRef}
      className={`fixed top-20 right-4 z-[90] transition-opacity duration-300 lg:top-6 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsScrolling(true);
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setIsScrolling(false), 800);
      }}
    >
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="섹션 네비 열기"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500 bg-white/95 dark:bg-gray-900/95 text-blue-600 dark:text-blue-400 text-xs font-semibold shadow-md backdrop-blur max-w-[200px]"
        >
          <span className="truncate">{activeLabel}</span>
          <span aria-hidden className="text-[10px] opacity-70">▾</span>
        </button>
      ) : (
        <div className="flex flex-col gap-1 p-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl min-w-[180px] max-w-[260px]">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                activeSection === section.id
                  ? 'border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
