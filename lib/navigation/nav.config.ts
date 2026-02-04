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
                path: '/acquisition/rates/realestate/housing',
              },
              farmland: {
                label: '농지',
                path: '/acquisition/rates/realestate/farmland',
              },
              'non-farmland': {
                label: '농지 외',
                path: '/acquisition/rates/realestate/non-farmland',
              },
            },
          },
          'non-realestate': {
            label: '부동산 외',
            path: '/acquisition/rates/non-realestate/non-realestate',
          },
          common: {
            label: '공통',
            path: '/acquisition/rates/common',
            isCategory: true,
            children: {
              division: {
                label: '분할취득',
                path: '/acquisition/rates/common/division',
              },
              'metro-surcharge': {
                label: '과밀억제권역 중과',
                path: '/acquisition/rates/common/metro-surcharge',
              },
              'luxury-surcharge': {
                label: '사치성재산 중과',
                path: '/acquisition/rates/common/luxury-surcharge',
              },
              'special-rates': {
                label: '세율 특례/경감',
                path: '/acquisition/rates/common/special-rates',
              },
              'rate-application': {
                label: '세율 적용/추징',
                path: '/acquisition/rates/common/rate-application',
              },
              exemption: {
                label: '면세점',
                path: '/acquisition/rates/common/exemption',
              },
              'housing-count': {
                label: '주택 수 판단',
                path: '/acquisition/rates/common/housing-count',
              },
            },
          },
        },
      },
      themes: {
        label: '테마별 취득세',
        path: '/acquisition/themes',
        isCategory: true,
        children: {
          'multi-house': {
            label: '다주택자 중과',
            path: '/acquisition/themes/multi-house',
          },
          'first-time-buyer': {
            label: '생애최초 주택취득 감면',
            path: '/acquisition/themes/first-time-buyer',
          },
        },
      },
      standard: {
        label: '과세표준',
        path: '/acquisition/standard',
        isCategory: true,
        children: {
          standard: {
            label: '과세표준',
            path: '/acquisition/standard/standard',
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
