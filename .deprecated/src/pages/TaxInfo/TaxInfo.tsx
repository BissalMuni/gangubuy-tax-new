import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
=======
import { Card, Typography, Space, Button, Segmented, Empty, message } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined, TableOutlined, ReloadOutlined } from '@ant-design/icons';
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
import { useTaxData, useMarketRecognitionPrice } from '@/hooks/useTaxData';
import { useTaxStore } from '@/store/useTaxStore';
import { TaxItem, FilterOptions, ViewMode, TaxType, ProcessedTaxSection } from '@/types/tax.types';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import TaxList from '@/components/tax/TaxList';
import TaxCard from '@/components/tax/TaxCard';
import TaxTable from '@/components/tax/TaxTable';
import MarketRecognitionPrice from '@/components/tax/MarketRecognitionPrice';
<<<<<<< HEAD
import { FiList, FiGrid, FiTable } from 'react-icons/fi';
import toast from 'react-hot-toast';
=======

const { Title, Text } = Typography;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf

const TaxInfo: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { data: taxData, isLoading, error } = useTaxData();
  const { data: marketRecognitionData, isLoading: isMarketLoading, error: marketError } = useMarketRecognitionPrice();
<<<<<<< HEAD
  
  // 시가인정액 페이지인지 확인
  const isMarketRecognitionPage = category === 'market-recognition-price';
  
=======

  // 시가인정액 페이지인지 확인
  const isMarketRecognitionPage = category === 'market-recognition-price';

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
  const {
    viewMode,
    filters,
    searchTerm,
    setTaxData,
    setFilters,
    setViewMode,
  } = useTaxStore();

  // 데이터가 로드되면 스토어에 저장
  useEffect(() => {
    if (taxData) {
      setTaxData(taxData);
    }
  }, [taxData, setTaxData]);

  // URL 파라미터에 따른 필터 설정
  useEffect(() => {
    if (category) {
      let newFilters: FilterOptions = { ...filters };
<<<<<<< HEAD
      
=======

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      switch (category) {
        case 'paid':
          newFilters = { category: 'acquisition', type: '유상취득' };
          break;
        case 'free':
          newFilters = { category: 'acquisition', type: '무상취득' };
          break;
        case 'original':
          newFilters = { category: 'acquisition', type: '원시취득' };
          break;
        case 'acquisition-tax':
          newFilters = { category: 'rate', type: '취득세' };
          break;
        case 'education-tax':
          newFilters = { category: 'rate', type: '지방교육세' };
          break;
        case 'agricultural-tax':
          newFilters = { category: 'rate', type: '농특세' };
          break;
        case 'housing':
          newFilters = { category: 'standard', type: '주택' };
          break;
        case 'building':
          newFilters = { category: 'standard', type: '건물' };
          break;
        case 'land':
          newFilters = { category: 'standard', type: '토지' };
          break;
        case 'farmland':
          newFilters = { category: 'standard', type: '농지' };
          break;
        case 'market-recognition-price':
          newFilters = { category: 'standard', type: '시가인정액' as TaxType };
          break;
        default:
          newFilters = { category: 'acquisition', type: 'all' };
      }
<<<<<<< HEAD
      
=======

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      setFilters(newFilters);
    }
  }, [category, setFilters]);

  // 에러 처리
  useEffect(() => {
    if (error) {
<<<<<<< HEAD
      toast.error('세금 데이터를 불러오는 중 오류가 발생했습니다.');
    }
    if (marketError) {
      toast.error('시가인정액 데이터를 불러오는 중 오류가 발생했습니다.');
=======
      message.error('세금 데이터를 불러오는 중 오류가 발생했습니다.');
    }
    if (marketError) {
      message.error('시가인정액 데이터를 불러오는 중 오류가 발생했습니다.');
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    }
  }, [error, marketError]);

  // ProcessedTaxSection[]에서 TaxItem[] 추출
  const extractTaxItemsFromSections = (sections: ProcessedTaxSection[]): TaxItem[] => {
    const items: TaxItem[] = [];

    const extractTaxRatesFromContent = (content: any[]): any => {
      const rates: any = {};
<<<<<<< HEAD
      
=======

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      content.forEach((item: any) => {
        if (item.title === '취득세') rates.취득세 = item.content;
        else if (item.title === '지방교육세') rates.지방교육세 = item.content;
        else if (item.title === '농특세') rates.농특세 = item.content;
      });

      return rates;
    };

    const processContent = (content: any[], path: string[], originalCase: string) => {
      content.forEach((item: any) => {
        if (Array.isArray(item.content)) {
<<<<<<< HEAD
          // 세율 데이터인지 확인 (취득세, 지방교육세, 농특세가 모두 있는 배열)
          const hasTaxRates = item.content.some((subItem: any) => 
=======
          const hasTaxRates = item.content.some((subItem: any) =>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
            ['취득세', '지방교육세', '농특세'].includes(subItem.title)
          );

          if (hasTaxRates) {
            const rates = extractTaxRatesFromContent(item.content);
            const taxItem: TaxItem = {
              id: [...path, item.title || item.description || 'unnamed'].join('-'),
              path: [...path, item.title || item.description || 'unnamed'],
              name: item.title || item.description || 'unnamed',
              data: rates,
              category: originalCase,
              subcategory: path.join(' > '),
            };
            items.push(taxItem);
          } else {
<<<<<<< HEAD
            // 더 깊은 레벨 탐색
=======
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
            processContent(item.content, [...path, item.title || item.description || 'unnamed'], originalCase);
          }
        }
      });
    };

    sections.forEach((section: ProcessedTaxSection) => {
      processContent(section.content, [section.title || section.description], section.originalCase);
    });

    return items;
  };

  // 데이터 필터링 및 변환
  const filteredItems = useMemo(() => {
    if (!taxData || !Array.isArray(taxData)) return [];

    const items = extractTaxItemsFromSections(taxData);

    return items.filter((item: TaxItem) => {
      let shouldInclude = true;

<<<<<<< HEAD
      // 카테고리별 필터링
      if (filters.category === 'acquisition' && filters.type !== 'all') {
        shouldInclude = item.category.includes(filters.type.replace('취득', '')) || 
                      item.category.includes(filters.type);
      } else if (filters.category === 'rate') {
        shouldInclude = item.data[filters.type as keyof typeof item.data] !== undefined;
      } else if (filters.category === 'standard') {
        shouldInclude = item.category.includes(filters.type) || 
                      item.name.includes(filters.type) ||
                      Boolean(item.subcategory && item.subcategory.includes(filters.type));
      }

      // 검색어 필터
=======
      if (filters.category === 'acquisition' && filters.type !== 'all') {
        shouldInclude = item.category.includes(filters.type.replace('취득', '')) ||
          item.category.includes(filters.type);
      } else if (filters.category === 'rate') {
        shouldInclude = item.data[filters.type as keyof typeof item.data] !== undefined;
      } else if (filters.category === 'standard') {
        shouldInclude = item.category.includes(filters.type) ||
          item.name.includes(filters.type) ||
          Boolean(item.subcategory && item.subcategory.includes(filters.type));
      }

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
      if (searchTerm && shouldInclude) {
        const searchString = JSON.stringify(item).toLowerCase();
        shouldInclude = searchString.includes(searchTerm.toLowerCase());
      }

      return shouldInclude;
    });
  }, [taxData, filters, searchTerm]);

<<<<<<< HEAD
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
=======
  const handleViewModeChange = (mode: string) => {
    setViewMode(mode as ViewMode);
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
  };

  // 로딩 상태
  if (isMarketRecognitionPage ? isMarketLoading : isLoading) {
    return (
<<<<<<< HEAD
      <div className="flex justify-center items-center h-64">
=======
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태
  if (isMarketRecognitionPage ? marketError : error) {
    return (
<<<<<<< HEAD
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">데이터를 불러올 수 없습니다</div>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          다시 시도
        </button>
      </div>
=======
      <Card style={{ textAlign: 'center', padding: 48 }}>
        <Space direction="vertical" size="large">
          <Text type="danger" style={{ fontSize: 18 }}>데이터를 불러올 수 없습니다</Text>
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </Space>
      </Card>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    );
  }

  // 시가인정액 페이지인 경우 전용 컴포넌트 렌더링
  if (isMarketRecognitionPage && marketRecognitionData) {
    return <MarketRecognitionPrice data={marketRecognitionData} />;
  }

  // 사용 가능한 카테고리 추출
  const availableCategories = useMemo(() => {
    if (!taxData || !Array.isArray(taxData)) return [];
<<<<<<< HEAD
    
=======

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    const categories = new Set<string>();
    taxData.forEach((section: ProcessedTaxSection) => {
      categories.add(section.originalCase);
    });
<<<<<<< HEAD
    
=======

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    return Array.from(categories);
  }, [taxData]);

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {(filters.type === 'all' ? '전체 세금 정보' : filters.type)}
            </h1>
            <p className="text-gray-600 mt-1">
              총 {filteredItems.length}개의 항목
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewModeChange('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="목록형"
            >
              <FiList className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleViewModeChange('card')}
              className={`p-2 rounded-md ${
                viewMode === 'card'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="카드형"
            >
              <FiGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleViewModeChange('table')}
              className={`p-2 rounded-md ${
                viewMode === 'table'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="테이블형"
            >
              <FiTable className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="mt-6">
          <div className="flex items-start space-x-3">
            <span className="text-sm font-medium text-gray-700 min-w-[80px] mt-2">카테고리</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({ category: 'acquisition', type: 'all' })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.type === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              {availableCategories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setFilters({ category: 'acquisition', type: category as TaxType });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.type === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            표시할 데이터가 없습니다.
          </div>
=======
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* 헤더 */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {filters.type === 'all' ? '전체 세금 정보' : filters.type}
            </Title>
            <Text type="secondary">총 {filteredItems.length}개의 항목</Text>
          </div>

          <Segmented
            value={viewMode}
            onChange={handleViewModeChange}
            options={[
              { value: 'list', icon: <UnorderedListOutlined />, label: '목록' },
              { value: 'card', icon: <AppstoreOutlined />, label: '카드' },
              { value: 'table', icon: <TableOutlined />, label: '테이블' },
            ]}
          />
        </div>

        {/* 카테고리 필터 버튼 */}
        <div style={{ marginTop: 24 }}>
          <Space size={[8, 8]} wrap>
            <Text type="secondary" style={{ marginRight: 8 }}>카테고리:</Text>
            <Button
              type={filters.type === 'all' ? 'primary' : 'default'}
              onClick={() => setFilters({ category: 'acquisition', type: 'all' })}
            >
              전체
            </Button>
            {availableCategories.map(cat => (
              <Button
                key={cat}
                type={filters.type === cat ? 'primary' : 'default'}
                onClick={() => setFilters({ category: 'acquisition', type: cat as TaxType })}
              >
                {cat}
              </Button>
            ))}
          </Space>
        </div>
      </Card>

      {/* 컨텐츠 */}
      <Card bodyStyle={{ padding: 0 }}>
        {filteredItems.length === 0 ? (
          <Empty description="표시할 데이터가 없습니다." style={{ padding: 48 }} />
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
        ) : (
          <>
            {viewMode === 'list' && <TaxList items={filteredItems} />}
            {viewMode === 'card' && <TaxCard items={filteredItems} />}
            {viewMode === 'table' && <TaxTable items={filteredItems} />}
          </>
        )}
<<<<<<< HEAD
      </div>
    </div>
  );
};

export default TaxInfo;
=======
      </Card>
    </Space>
  );
};

export default TaxInfo;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
