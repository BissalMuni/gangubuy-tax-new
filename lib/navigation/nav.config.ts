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
  'corp-acquisition-tax': {
    label: '법인취득세',
    path: '/corp-acquisition-tax',
    icon: 'apartment',
    isCategory: true,
    children: {
      heavy: {
        label: '중과',
        path: '/corp-acquisition-tax/heavy',
        isCategory: true,
        children: {
          '01-rate': { label: '중과 취득세율', path: '/corp-acquisition-tax/heavy/01-rate' },
          '02-practice': { label: '중과 실무', path: '/corp-acquisition-tax/heavy/02-practice' },
          '03-metro-exclusion': { label: '대도시법인 중과제외', path: '/corp-acquisition-tax/heavy/03-metro-exclusion' },
          '04-housing-exclusion': { label: '주택취득 중과제외', path: '/corp-acquisition-tax/heavy/04-housing-exclusion' },
          '05-supreme-court': { label: '대법원 판례', path: '/corp-acquisition-tax/heavy/05-supreme-court' },
          '06-qa-cases': { label: '질의회신 사례', path: '/corp-acquisition-tax/heavy/06-qa-cases' },
          '07-seoul-guide': { label: '서울시 교육자료', path: '/corp-acquisition-tax/heavy/07-seoul-guide' },
        },
      },
      reductions: {
        label: '감면',
        path: '/corp-acquisition-tax/reductions',
        isCategory: true,
        children: {
          '01-duplicate-exclusion': { label: '중복감면 배제', path: '/corp-acquisition-tax/reductions/01-duplicate-exclusion' },
          '02-incorporation': { label: '법인전환 (현물출자·사업양수도)', path: '/corp-acquisition-tax/reductions/02-incorporation' },
          '03-majority-shareholder': { label: '간주취득 (과점주주)', path: '/corp-acquisition-tax/reductions/03-majority-shareholder' },
          '04-financial-merger': { label: '금융회사간 합병', path: '/corp-acquisition-tax/reductions/04-financial-merger' },
          '05-donation': { label: '기부채납 비과세', path: '/corp-acquisition-tax/reductions/05-donation' },
          '06-rnd-lab': { label: '기업부설연구소', path: '/corp-acquisition-tax/reductions/06-rnd-lab' },
          '07-senior-welfare': { label: '노인복지시설', path: '/corp-acquisition-tax/reductions/07-senior-welfare' },
          '08-green-building': { label: '녹색인증 건축물', path: '/corp-acquisition-tax/reductions/08-green-building' },
          '09-farmer-loan': { label: '농어업인 융자', path: '/corp-acquisition-tax/reductions/09-farmer-loan' },
          '10-replacement': { label: '대체취득 (토지수용)', path: '/corp-acquisition-tax/reductions/10-replacement' },
          '11-corp-merger': { label: '법인합병', path: '/corp-acquisition-tax/reductions/11-corp-merger' },
          '12-corp-division': { label: '법인분할', path: '/corp-acquisition-tax/reductions/12-corp-division' },
          '13-restricted-land': { label: '사권제한 토지', path: '/corp-acquisition-tax/reductions/13-restricted-land' },
          '14-welfare-corp': { label: '사회복지법인', path: '/corp-acquisition-tax/reductions/14-welfare-corp' },
          '15-social-enterprise': { label: '사회적기업', path: '/corp-acquisition-tax/reductions/15-social-enterprise' },
          '16-community-credit': { label: '새마을금고', path: '/corp-acquisition-tax/reductions/16-community-credit' },
          '17-childcare': { label: '어린이집·유치원', path: '/corp-acquisition-tax/reductions/17-childcare' },
          '18-rental-housing': { label: '임대주택 (SH·LH)', path: '/corp-acquisition-tax/reductions/18-rental-housing' },
          '19-redevelopment': { label: '재개발조합 체비지·보류지', path: '/corp-acquisition-tax/reductions/19-redevelopment' },
          '20-local-public-corp': { label: '지방공기업', path: '/corp-acquisition-tax/reductions/20-local-public-corp' },
          '21-relocation': { label: '지방이전', path: '/corp-acquisition-tax/reductions/21-relocation' },
          '22-overseas-return': { label: '해외진출기업 국내복귀', path: '/corp-acquisition-tax/reductions/22-overseas-return' },
          '23-knowledge-center': { label: '지식산업센터', path: '/corp-acquisition-tax/reductions/23-knowledge-center' },
          '24-startup-venture': { label: '창업벤처기업', path: '/corp-acquisition-tax/reductions/24-startup-venture' },
          '25-startup-incubator': { label: '창업보육센터', path: '/corp-acquisition-tax/reductions/25-startup-incubator' },
          '26-lh-exemption': { label: '한국토지주택공사(LH)', path: '/corp-acquisition-tax/reductions/26-lh-exemption' },
          '27-research-scholarship': { label: '학술연구·장학단체', path: '/corp-acquisition-tax/reductions/27-research-scholarship' },
          '28-repurchase': { label: '환매권행사 매수부동산', path: '/corp-acquisition-tax/reductions/28-repurchase' },
          '29-minimum-tax': { label: '최소납부제', path: '/corp-acquisition-tax/reductions/29-minimum-tax' },
          '30-general-recapture': { label: '일반적 추징규정', path: '/corp-acquisition-tax/reductions/30-general-recapture' },
        },
      },
      types: {
        label: '취득유형별',
        path: '/corp-acquisition-tax/types',
        isCategory: true,
        children: {
          '01-renovation': { label: '개수·시설·시설물', path: '/corp-acquisition-tax/types/01-renovation' },
          '02-co-ownership-division': { label: '공유물 분할', path: '/corp-acquisition-tax/types/02-co-ownership-division' },
          '03-deposit': { label: '공탁', path: '/corp-acquisition-tax/types/03-deposit' },
          '04-exchange': { label: '교환', path: '/corp-acquisition-tax/types/04-exchange' },
          '05-auction': { label: '경매', path: '/corp-acquisition-tax/types/05-auction' },
          '06-court-judgment': { label: '이행판결 취득일', path: '/corp-acquisition-tax/types/06-court-judgment' },
          '07-gift': { label: '증여 (부담부)', path: '/corp-acquisition-tax/types/07-gift' },
          '08-dation': { label: '대물변제', path: '/corp-acquisition-tax/types/08-dation' },
          '09-trust': { label: '신탁', path: '/corp-acquisition-tax/types/09-trust' },
          '10-land-use-change': { label: '지목변경', path: '/corp-acquisition-tax/types/10-land-use-change' },
          '11-in-kind-contribution': { label: '현물출자', path: '/corp-acquisition-tax/types/11-in-kind-contribution' },
          '12-org-change': { label: '조직변경', path: '/corp-acquisition-tax/types/12-org-change' },
        },
      },
      references: {
        label: '실무참고',
        path: '/corp-acquisition-tax/references',
        isCategory: true,
        children: {
          '00-overview': { label: '목차·개요', path: '/corp-acquisition-tax/references/00-overview' },
          '01-appraisal-table': { label: '부동산 시가표준액표·용도지수', path: '/corp-acquisition-tax/references/01-appraisal-table' },
          '02-housing-bonds': { label: '국민주택채권', path: '/corp-acquisition-tax/references/02-housing-bonds' },
          '03-membership': { label: '회원권', path: '/corp-acquisition-tax/references/03-membership' },
          '04-non-member-land': { label: '비조합원용 토지', path: '/corp-acquisition-tax/references/04-non-member-land' },
          '05-ownership-restoration': { label: '소유권회복·합의해제', path: '/corp-acquisition-tax/references/05-ownership-restoration' },
          '06-just-cause': { label: '정당한 사유', path: '/corp-acquisition-tax/references/06-just-cause' },
          '07-unjust-enrichment': { label: '부당이득금 반환·소멸시효', path: '/corp-acquisition-tax/references/07-unjust-enrichment' },
          '08-penalty-tax': { label: '가산세', path: '/corp-acquisition-tax/references/08-penalty-tax' },
          '09-additional-charge': { label: '가산금', path: '/corp-acquisition-tax/references/09-additional-charge' },
          '10-late-payment-penalty': { label: '납부지연 가산세', path: '/corp-acquisition-tax/references/10-late-payment-penalty' },
          '11-registration-number': { label: '부동산등기용 등록번호', path: '/corp-acquisition-tax/references/11-registration-number' },
          '12-school-religious-residence': { label: '학교·종교단체 사택 감면대상', path: '/corp-acquisition-tax/references/12-school-religious-residence' },
          '13-profit-business': { label: '수익사업의 정의', path: '/corp-acquisition-tax/references/13-profit-business' },
          '14-property-tax-summary': { label: '재산세 정리', path: '/corp-acquisition-tax/references/14-property-tax-summary' },
          '15-industry-classification': { label: '한국표준산업분류 동일업종 판단', path: '/corp-acquisition-tax/references/15-industry-classification' },
          '16-business-code': { label: '사업자등록증 업종코드', path: '/corp-acquisition-tax/references/16-business-code' },
          '17-acquisition-timing': { label: '취득의 시기', path: '/corp-acquisition-tax/references/17-acquisition-timing' },
          '18-acquisition-price': { label: '취득가격 범위', path: '/corp-acquisition-tax/references/18-acquisition-price' },
          '19-land-grade': { label: '토지등급표', path: '/corp-acquisition-tax/references/19-land-grade' },
        },
      },
      registration: {
        label: '등록면허세',
        path: '/corp-acquisition-tax/registration',
        isCategory: true,
        children: {
          '01-registration-license-tax': { label: '등록면허세', path: '/corp-acquisition-tax/registration/01-registration-license-tax' },
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
