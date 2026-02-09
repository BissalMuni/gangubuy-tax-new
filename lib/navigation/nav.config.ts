import type { NavigationConfig } from '@/lib/types';

export const navigationConfig: NavigationConfig = {
  home: {
    label: '홈',
    path: '/',
    icon: 'home',
  },
  acquisition: {
    label: '취득세',
    path: '/acquisition',
    icon: 'file-text',
    isCategory: true,
    children: {
      'multi-house': {
        label: '다주택 중과',
        path: '/acquisition/multi-house/multi-house',
      },
      luxury: {
        label: '사치성재산 중과',
        path: '/acquisition/themes/luxury',
      },
      exemption: {
        label: '비과세/감면',
        path: '/acquisition/exemption',
        isCategory: true,
        children: {
          'rental-business': {
            label: '임대사업자 감면',
            path: '/acquisition/exemption/rental-business',
          },
          'first-time-buyer': {
            label: '생애최초 주택취득 감면',
            path: '/acquisition/exemption/first-time-buyer',
          },
          'childbirth-housing': {
            label: '출산·양육 주택 감면',
            path: '/acquisition/exemption/childbirth-housing',
          },
          'veterans': {
            label: '국가유공자 감면',
            path: '/acquisition/exemption/veterans',
          },

          'religious-facility': {
            label: '종교시설 감면',
            path: '/acquisition/exemption/religious-facility',
          },
          'affordable-housing': {
            label: '서민주택 감면',
            path: '/acquisition/exemption/affordable-housing',
          },
          'childcare-facility': {
            label: '어린이집 감면',
            path: '/acquisition/exemption/childcare-facility',
          },

          'senior-welfare': {
            label: '노인복지시설 감면',
            path: '/acquisition/exemption/senior-welfare',
          },
          'jeonse-fraud-support': {
            label: '전세사기 피해지원',
            path: '/acquisition/exemption/jeonse-fraud-support',
          },
          'knowledge-industry-center': {
            label: '지식산업센터 감면',
            path: '/acquisition/exemption/knowledge-industry-center',
          },
          'minimum-tax-2025': {
            label: '2025년 최저한세',
            path: '/acquisition/exemption/minimum-tax-2025',
          },
        },
      },
      rates: {
        label: '세율',
        path: '/acquisition/rates',
        isCategory: true,
        children: {
          realestate: {
            label: '부동산',
            path: '/acquisition/rates/realestate',
            isCategory: true,
            children: {
              housing: {
                label: '주택',
                path: '/acquisition/rates/realestate/housing/housing',
              },
              farmland: {
                label: '농지',
                path: '/acquisition/rates/realestate/farmland/farmland',
              },
              'non-farmland': {
                label: '농지 외',
                path: '/acquisition/rates/realestate/non-farmland/non-farmland',
              },
            },
          },
          'non-realestate': {
            label: '부동산 외',
            path: '/acquisition/rates/non-realestate/non-realestate',
          },
          common: {
            label: '공통',
            path: '/acquisition/rates/common/common',
          },
          'officetel-use-change': {
            label: '오피스텔 용도변경',
            path: '/acquisition/rates/officetel-use-change',
          },
          'multi-family-housing-tax': {
            label: '다가구주택 세금',
            path: '/acquisition/rates/multi-family-housing-tax',
          },
          'quasi-housing': {
            label: '준주택',
            path: '/acquisition/rates/quasi-housing',
          },
          'actual-vs-official-status': {
            label: '실제 vs 공부상 현황',
            path: '/acquisition/rates/actual-vs-official-status',
          },
        },
      },

      price: {
        label: '취득가액',
        path: '/acquisition/price',
        isCategory: true,
        children: {
          price: {
            label: '취득가액',
            path: '/acquisition/price/price',
          },
          'tax-base-reform-2023': {
            label: '2023년 과세표준 개편',
            path: '/acquisition/price/tax-base-reform-2023',
          },
        },
      },
      filing: {
        label: '신고',
        path: '/acquisition/filing',
        isCategory: true,
        children: {
          'general-purchase': {
            label: '일반 매매',
            path: '/acquisition/filing/general-purchase',
          },
          'presale-filing': {
            label: '분양권 취득',
            path: '/acquisition/filing/presale-filing',
          },
          'reconstruction-redevelopment': {
            label: '재건축/재개발',
            path: '/acquisition/filing/reconstruction-redevelopment',
          },
          'inheritance-filing': {
            label: '상속',
            path: '/acquisition/filing/inheritance-filing',
          },
          bequest: {
            label: '유증',
            path: '/acquisition/filing/bequest',
          },
          gift: {
            label: '증여',
            path: '/acquisition/filing/gift',
          },
          'gift-with-encumbrance': {
            label: '부담부증여',
            path: '/acquisition/filing/gift-with-encumbrance',
          },
          'housing-land-only-gift': {
            label: '주택/토지 단독 증여',
            path: '/acquisition/filing/housing-land-only-gift',
          },
          'divorce-property-division': {
            label: '이혼재산분할',
            path: '/acquisition/filing/divorce-property-division',
          },
          'land-expropriation': {
            label: '토지수용',
            path: '/acquisition/filing/land-expropriation',
          },
          'exchange-acquisition': {
            label: '교환',
            path: '/acquisition/filing/exchange-acquisition',
          },
          'co-ownership-partition': {
            label: '공유물분할',
            path: '/acquisition/filing/co-ownership-partition',
          },
          'auction-acquisition': {
            label: '경매',
            path: '/acquisition/filing/auction-acquisition',
          },
          'court-judgment': {
            label: '법원판결',
            path: '/acquisition/filing/court-judgment',
          },
          'new-construction': {
            label: '신축',
            path: '/acquisition/filing/new-construction',
          },
          'vessel-acquisition': {
            label: '선박취득',
            path: '/acquisition/filing/vessel-acquisition',
          },
        },
      },
      admin: {
        label: '행정',
        path: '/acquisition/admin',
        isCategory: true,
        children: {
          'internet-filing': {
            label: '인터넷 신고',
            path: '/acquisition/admin/internet-filing',
          },
          'post-approval-correction': {
            label: '사후승인정정',
            path: '/acquisition/admin/post-approval-correction',
          },
          'old-registration-tax': {
            label: '구 등록세',
            path: '/acquisition/admin/old-registration-tax',
          },
          'extension-vs-major-repair': {
            label: '증축 vs 대수선',
            path: '/acquisition/admin/extension-vs-major-repair',
          },
          'facility-vs-equipment': {
            label: '시설 vs 설비',
            path: '/acquisition/admin/facility-vs-equipment',
          },
          'demolition-ledger': {
            label: '멸실대장',
            path: '/acquisition/admin/demolition-ledger',
          },
          'temporary-building': {
            label: '가설건축물',
            path: '/acquisition/admin/temporary-building',
          },
          'property-inquiry-response': {
            label: '재산조회 회신',
            path: '/acquisition/admin/property-inquiry-response',
          },
        },
      },

    },
  },
  property: {
    label: '재산세',
    path: '/property',
    icon: 'bank',
    isCategory: true,
  },
  vehicle: {
    label: '자동차세',
    path: '/vehicle',
    icon: 'car',
    isCategory: true,
  },
  search: {
    label: '검색',
    path: '/search',
    icon: 'search',
  },
};
