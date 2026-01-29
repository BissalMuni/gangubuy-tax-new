import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Spin, Divider, Grid } from 'antd';
import { ContentItem, getContentSequence } from '@/config/contentSequence';
import { useActiveContent } from '@/contexts/ActiveContentContext';

const { useBreakpoint } = Grid;

// 지방세 기본정보 페이지 동적 임포트
const AcquisitionRates = lazy(() => import('@/pages/TaxInfo/AcquisitionRates'));
const AcquisitionStandard = lazy(() => import('@/pages/TaxInfo/AcquisitionStandard'));
const AcquisitionRequirements = lazy(() => import('@/pages/TaxInfo/AcquisitionRequirements'));
const AcquisitionSpecial = lazy(() => import('@/pages/TaxInfo/AcquisitionSpecial'));
const PropertyRates = lazy(() => import('@/pages/TaxInfo/PropertyRates'));
const PropertyStandard = lazy(() => import('@/pages/TaxInfo/PropertyStandard'));
const PropertySpecial = lazy(() => import('@/pages/TaxInfo/PropertySpecial'));

// 콘텐츠 키에 따른 컴포넌트 매핑
const contentComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'acquisition-rates': AcquisitionRates,
  'acquisition-standard': AcquisitionStandard,
  'acquisition-requirements': AcquisitionRequirements,
  'acquisition-special': AcquisitionSpecial,
  'property-rates': PropertyRates,
  'property-standard': PropertyStandard,
  'property-special': PropertySpecial,
};

const TaxInfoLayout: React.FC = () => {
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

    const { current, sequence, currentIndex } = getContentSequence(location.pathname);
    if (current && sequence.length > 0) {
      setCurrentItem(current);
      // 현재 아이템부터 끝까지 로드
      setLoadedItems(sequence.slice(currentIndex));
      initialLoadDone.current = true;
    }
  }, [location.pathname]);

  // URL 변경 시 해당 위치로 스크롤
  useEffect(() => {
    const { current } = getContentSequence(location.pathname);
    if (current && loadedItems.length > 0) {
      const element = document.querySelector(`[data-content-key="${current.key}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      if (rect.top <= 150 && rect.bottom > 100) {
        const key = section.getAttribute('data-content-key');
        const item = loadedItems.find(i => i.key === key);
        if (item && item.key !== currentItem?.key) {
          setCurrentItem(item);
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

  // 컴포넌트 렌더링
  const renderContent = (item: ContentItem) => {
    const Component = contentComponents[item.key];
    if (!Component) return null;

    return (
      <Suspense fallback={
        <Flex justify="center" align="center" style={{ minHeight: 200 }}>
          <Spin size="large" />
        </Flex>
      }>
        <Component />
      </Suspense>
    );
  };

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
              {renderContent(item)}

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
            {renderContent(item)}

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

export default TaxInfoLayout;
