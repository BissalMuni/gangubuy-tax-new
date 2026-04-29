import { z } from 'zod';

export const AdjustmentAreaSourceSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
  suffix: z.string().optional(),
});

export const AdjustmentAreaRowSchema = z.object({
  region: z.string().min(1),
  districts: z.string().min(1),
  highlight: z.boolean().optional(),
});

export const AdjustmentAreaSchema = z.object({
  effectiveDate: z.iso.date(),
  rows: z.array(AdjustmentAreaRowSchema).min(1),
  source: AdjustmentAreaSourceSchema,
});

export type AdjustmentArea = z.infer<typeof AdjustmentAreaSchema>;

export const adjustmentAreas: AdjustmentArea[] = [
  {
    effectiveDate: '2025-10-16',
    rows: [
      {
        region: '서울',
        districts: '전 자치구 (25개구 전체)',
        highlight: true,
      },
      {
        region: '경기',
        districts:
          '성남(수정·중원·분당구), 수원(장안·팔달·영통구), 안양 동안구, 과천, 광명, 하남, 의왕, 용인 수지구',
      },
    ],
    source: {
      label: '국토교통부공고 제2025-1223호',
      url: 'https://www.molit.go.kr/USR/BORD0201/m_69/DTL.jsp?mode=view&idx=265746',
      suffix: '(10.15 부동산 대책)',
    },
  },
  {
    effectiveDate: '2023-01-05',
    rows: [
      {
        region: '서울',
        districts: '강남구, 서초구, 송파구, 용산구 (4개구만 유지)',
      },
    ],
    source: {
      label: '국토교통부공고 제2023-33호',
      url: 'https://www.molit.go.kr/USR/I0204/m_45/dtl.jsp?idx=17701',
      suffix: '- 나머지 전국 조정대상지역 전면 해제',
    },
  },
];
