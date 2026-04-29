import { z } from 'zod';

export const RightAcquisitionTimingRowSchema = z.object({
  rightType: z.enum(['입주권', '주택분양권']),
  acquirerType: z.enum(['최초 취득', '승계 취득']),
  acquirerSubLabel: z.string().min(1),
  timing: z.string().min(1),
  // Substring of `timing` to render with emphasis (red + bold). Must appear in `timing`.
  emphasis: z.string().min(1),
  notes: z.array(z.string()).default([]),
});

export type RightAcquisitionTimingRow = z.infer<typeof RightAcquisitionTimingRowSchema>;

export const rightAcquisitionTiming: RightAcquisitionTimingRow[] = [
  {
    rightType: '입주권',
    acquirerType: '최초 취득',
    acquirerSubLabel: '원조합원',
    timing: '"철거" 시점',
    emphasis: '"철거" 시점',
    notes: [
      "철거 전까지는 '주택'으로 봄 (입주권이 아닌 주택 보유로 판단)",
      '※ 관리처분인가일이 아닌 실제 철거 시점 기준',
    ],
  },
  {
    rightType: '입주권',
    acquirerType: '승계 취득',
    acquirerSubLabel: '승계조합원',
    timing: '토지의 잔금 지급일',
    emphasis: '토지의 잔금 지급일',
    notes: [],
  },
  {
    rightType: '주택분양권',
    acquirerType: '최초 취득',
    acquirerSubLabel: '최초 수분양자',
    timing: '분양회사와 수분양자의 분양계약일',
    emphasis: '분양계약일',
    notes: [],
  },
  {
    rightType: '주택분양권',
    acquirerType: '승계 취득',
    acquirerSubLabel: '최초 수분양자로부터 분양권 승계취득자',
    timing: '분양권의 잔금 지급일 (전매계약서 기준)',
    emphasis: '잔금 지급일',
    notes: [],
  },
];

export const PresaleRateTimelineRowSchema = z.object({
  caseLabel: z.string().min(1),
  contractPeriod: z.string().min(1),
  rateApplication: z.string().min(1),
  highlight: z.boolean().default(false),
});

export type PresaleRateTimelineRow = z.infer<typeof PresaleRateTimelineRowSchema>;

export const presaleRateTimeline: PresaleRateTimelineRow[] = [
  { caseLabel: 'EX1', contractPeriod: '2020.7.10 이전', rateApplication: '분양권 주택수 미가산, 종전규정(1~3%) 적용', highlight: false },
  { caseLabel: 'EX2', contractPeriod: '2020.7.11~8.11', rateApplication: '분양권 주택수 미가산, 취득일 기준 세율', highlight: false },
  { caseLabel: 'EX3', contractPeriod: '2020.8.12 이후', rateApplication: '분양권 주택수 산정, 분양권 취득일 기준', highlight: true },
  { caseLabel: 'EX4', contractPeriod: '2020.8.12 이후 (다주택)', rateApplication: '분양권 취득시점의 주택수로 세율 결정', highlight: true },
];
