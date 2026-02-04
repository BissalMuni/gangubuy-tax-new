<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

// Layout
import MainLayout from '@/components/layout/MainLayout';

// Pages
import Home from '@/pages/Home';
import TaxInfo from '@/pages/TaxInfo';
import Calculator from '@/pages/Calculator';
import Guide from '@/pages/Guide';
import NotFound from '@/pages/NotFound';

// Tax Info Specific Pages
import AcquisitionRates from '@/pages/TaxInfo/AcquisitionRates';
import AcquisitionStandard from '@/pages/TaxInfo/AcquisitionStandard';
import AcquisitionRequirements from '@/pages/TaxInfo/AcquisitionRequirements';
import AcquisitionSpecial from '@/pages/TaxInfo/AcquisitionSpecial';
import PropertyRates from '@/pages/TaxInfo/PropertyRates';
import PropertyStandard from '@/pages/TaxInfo/PropertyStandard';
import PropertySpecial from '@/pages/TaxInfo/PropertySpecial';

// Styles
import '@/styles/globals.css';

=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntApp } from 'antd';
import koKR from 'antd/locale/ko_KR';

// Constants
import { ROUTES } from '@/constants/routes';

// Contexts
import { ActiveContentProvider } from '@/contexts/ActiveContentContext';

// Layout
import MainLayout from '@/components/layout/MainLayout';
import { TaxInfoLayout } from '@/components/layout/TaxInfoLayout';
import { TaxThemeLayout } from '@/components/layout/TaxThemeLayout';

// Pages
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

<<<<<<< HEAD
function App() {
  return (
    <ConfigProvider
      locale={koKR}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#f5222d',
          colorInfo: '#1890ff',
          borderRadius: 6,
          fontSize: 14,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                {/* 기존 TaxInfo 라우트 (호환성 유지) */}
                <Route path="tax-info" element={<TaxInfo />} />
                <Route path="tax-info/:category" element={<TaxInfo />} />

                {/* 새로운 구체적인 라우트들 */}
                <Route path="tax-info/acquisition/rates" element={<AcquisitionRates />} />
                <Route path="tax-info/acquisition/standard" element={<AcquisitionStandard />} />
                <Route path="tax-info/acquisition/requirements" element={<AcquisitionRequirements />} />
                <Route path="tax-info/acquisition/special" element={<AcquisitionSpecial />} />
                <Route path="tax-info/property/rates" element={<PropertyRates />} />
                <Route path="tax-info/property/standard" element={<PropertyStandard />} />
                <Route path="tax-info/property/special" element={<PropertySpecial />} />

                <Route path="calculator" element={<Calculator />} />
                <Route path="guide" element={<Guide />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
=======
// Ant Design Theme Configuration
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  },
  components: {
    Layout: {
      headerBg: '#001529',
      siderBg: '#fff',
    },
    Menu: {
      itemBg: 'transparent',
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme} locale={koKR}>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ActiveContentProvider>
            <Routes>
              <Route path={ROUTES.HOME} element={<MainLayout />}>
                <Route index element={<Home />} />

                {/* 지방세정보 - 취득세 (무한 스크롤 레이아웃) */}
                <Route path="local-tax/acquisition/*" element={<TaxInfoLayout />} />

                {/* 지방세정보 - 재산세 (무한 스크롤 레이아웃) */}
                <Route path="local-tax/property/*" element={<TaxInfoLayout />} />

                {/* 테마별 지방세 - 취득세 (무한 스크롤 레이아웃) */}
                <Route path="local-tax-theme/acquisition/*" element={<TaxThemeLayout />} />

                {/* 기존 tax-info 경로 리다이렉트 (호환성) */}
                <Route path="tax-info/acquisition/rates" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.RATES} replace />} />
                <Route path="tax-info/acquisition/standard" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.STANDARD} replace />} />
                <Route path="tax-info/acquisition/requirements" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.REQUIREMENTS} replace />} />
                <Route path="tax-info/acquisition/special" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.SPECIAL} replace />} />
                <Route path="tax-info/property/rates" element={<Navigate to={ROUTES.LOCAL_TAX.PROPERTY.RATES} replace />} />
                <Route path="tax-info/property/standard" element={<Navigate to={ROUTES.LOCAL_TAX.PROPERTY.STANDARD} replace />} />
                <Route path="tax-info/property/special" element={<Navigate to={ROUTES.LOCAL_TAX.PROPERTY.SPECIAL} replace />} />
                <Route path="tax-info" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.RATES} replace />} />

                {/* 지방세정보 기본 경로 */}
                <Route path="local-tax" element={<Navigate to={ROUTES.LOCAL_TAX.ACQUISITION.RATES} replace />} />

                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              </Route>
            </Routes>
            </ActiveContentProvider>
          </Router>
        </QueryClientProvider>
      </AntApp>
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
    </ConfigProvider>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
