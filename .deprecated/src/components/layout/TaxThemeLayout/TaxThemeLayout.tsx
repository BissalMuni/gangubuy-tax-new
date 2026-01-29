import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Spin, Divider, Grid } from 'antd';
import { ContentItem, getContentSequence } from '@/config/contentSequence';
import ThemeContentRenderer from './ThemeContentRenderer';
import { useActiveContent } from '@/contexts/ActiveContentContext';

const { useBreakpoint } = Grid;

const TaxThemeLayout: React.FC = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { setActivePath } = useActiveContent();

  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedItems, setLoadedItems] = useState<ContentItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);
  const initialLoadDone = useRef(false);

  // 현재 아이템 변경 시 Context 업데이트
  useEffect(() => {
    if (currentItem?.path) {
      setActivePath(currentItem.path);
    }
  }, [currentItem, setActivePath]);

  // 초기 콘텐츠 로드
  useEffect(() => {
    if (initialLoadDone.current) return;

    const { current, sequence } = getContentSequence(location.pathname);
    if (current && sequence.length > 0) {
      setCurrentItem(current);
      // 전체 시퀀스 로드 (모든 탭 간 이동 가능하도록)
      setLoadedItems(sequence);
      initialLoadDone.current = true;
    }
  }, [location.pathname]);

  // URL 변경 시 해당 위치로 스크롤
  useEffect(() => {
    const { current } = getContentSequence(location.pathname);
    if (current && loadedItems.length > 0) {
      const element = document.querySelector(`[data-content-key="${current.key}"]`);
      if (element) {
        // 고정 헤더 높이를 고려한 스크롤 (헤더 64px + 여유 16px)
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [location.pathname, loadedItems]);

  // 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (loadingRef.current || loadedItems.length === 0) return;

    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // 하단에 도달했을 때 다음 콘텐츠 로드
    if (scrollBottom < 300) {
      const lastItem = loadedItems[loadedItems.length - 1];
      const { next } = getContentSequence(lastItem?.path || '');

      if (next && !loadedItems.find(item => item.key === next.key)) {
        loadingRef.current = true;
        setIsLoading(true);
        setLoadedItems(prev => [...prev, next]);

        setTimeout(() => {
          loadingRef.current = false;
          setIsLoading(false);
        }, 300);
      }
    }

    // 현재 보이는 콘텐츠 업데이트
    const sections = document.querySelectorAll('[data-content-key]');
    let foundCurrent = false;

    sections.forEach((section) => {
      if (foundCurrent) return;

      const rect = section.getBoundingClientRect();
      // 섹션이 뷰포트 상단에 있으면 현재 콘텐츠로 설정
      if (rect.top <= 150 && rect.bottom > 100) {
        const key = section.getAttribute('data-content-key');
        const item = loadedItems.find(i => i.key === key);
        if (item && item.key !== currentItem?.key) {
          setCurrentItem(item);
          // URL 업데이트 (히스토리에 추가하지 않음)
          window.history.replaceState(null, '', item.path);
          foundCurrent = true;
        }
      }
    });
  }, [loadedItems, currentItem]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loadedItems.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  // 모바일 레이아웃
  if (isMobile) {
    return (
      <div ref={containerRef}>
        <Flex vertical gap={16} style={{ width: '100%' }}>
          {loadedItems.map((item, index) => (
            <div
              key={item.key}
              data-content-key={item.key}
              id={`content-${item.key}`}
              style={{ width: '100%', scrollMarginTop: 160 }}
            >
              <ThemeContentRenderer
                contentKey={item.key}
                isMobile={true}
              />

              {index < loadedItems.length - 1 && (
                <Divider style={{ margin: '24px 0' }} />
              )}
            </div>
          ))}

          {/* 로딩 인디케이터 */}
          {isLoading && (
            <Flex justify="center" style={{ padding: 24 }}>
              <Spin />
            </Flex>
          )}
        </Flex>
      </div>
    );
  }

  // 데스크탑 레이아웃
  return (
    <div ref={containerRef}>
      <Flex vertical gap={32} style={{ width: '100%' }}>
        {loadedItems.map((item, index) => (
          <div
            key={item.key}
            data-content-key={item.key}
            id={`content-${item.key}`}
            style={{ width: '100%', scrollMarginTop: 100 }}
          >
            <ThemeContentRenderer
              contentKey={item.key}
              isMobile={false}
            />

            {index < loadedItems.length - 1 && (
              <Divider style={{ margin: '32px 0' }} />
            )}
          </div>
        ))}

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <Flex justify="center" style={{ padding: 32 }}>
            <Spin />
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default TaxThemeLayout;
