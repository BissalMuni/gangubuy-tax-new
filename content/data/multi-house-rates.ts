import { z } from 'zod';

const PercentLike = z.string().regex(/^\d+(\.\d+)?(~\d+(\.\d+)?)?%$/, 'must be like "1.1%" or "1.1~3.3%"');

const RateValues = z.object({
  total: PercentLike,
  acquisition: PercentLike,
  education: PercentLike,
  ruralSpecial: PercentLike,
  isHeavy: z.boolean().optional(),
});

export const PaidRateRowSchema = z.object({
  view: z.enum(['paid-adjusted', 'paid-non-adjusted']),
  payer: z.literal('개인'),
  households: z.string().min(1),
  priceRange: z.string().optional(),
  area: z.enum(['85㎡ 이하', '85㎡ 초과']),
}).extend(RateValues.shape);

export const SimpleRateRowSchema = z.object({
  view: z.enum(['gift-adjusted', 'corporate']),
  payer: z.enum(['개인', '법인']),
  area: z.enum(['85㎡ 이하', '85㎡ 초과']),
}).extend(RateValues.shape);

export const MultiHouseRateRowSchema = z.union([PaidRateRowSchema, SimpleRateRowSchema]);

export type PaidRateRow = z.infer<typeof PaidRateRowSchema>;
export type SimpleRateRow = z.infer<typeof SimpleRateRowSchema>;
export type MultiHouseRateRow = z.infer<typeof MultiHouseRateRowSchema>;
export type RateView = MultiHouseRateRow['view'];

export const multiHouseRates: MultiHouseRateRow[] = [
  // === Table 1: 유상취득 - 조정대상지역 (개인) ===
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '6억원 이하', area: '85㎡ 이하',
    total: '1.1%', acquisition: '1.0%', education: '0.1%', ruralSpecial: '0.0%' },
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '6억원 이하', area: '85㎡ 초과',
    total: '1.3%', acquisition: '1.0%', education: '0.1%', ruralSpecial: '0.2%' },
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '6억원 초과 9억원 이하', area: '85㎡ 이하',
    total: '1.1~3.3%', acquisition: '1.0~3.0%', education: '0.1~0.3%', ruralSpecial: '0.0%' },
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '6억원 초과 9억원 이하', area: '85㎡ 초과',
    total: '1.3~3.5%', acquisition: '1.0~3.0%', education: '0.1~0.3%', ruralSpecial: '0.2%' },
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '9억원 초과', area: '85㎡ 이하',
    total: '3.3%', acquisition: '3.0%', education: '0.3%', ruralSpecial: '0.0%' },
  { view: 'paid-adjusted', payer: '개인', households: '1주택', priceRange: '9억원 초과', area: '85㎡ 초과',
    total: '3.5%', acquisition: '3.0%', education: '0.3%', ruralSpecial: '0.2%' },
  { view: 'paid-adjusted', payer: '개인', households: '2주택', area: '85㎡ 이하',
    total: '8.4%', acquisition: '8.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'paid-adjusted', payer: '개인', households: '2주택', area: '85㎡ 초과',
    total: '9%', acquisition: '8.0%', education: '0.4%', ruralSpecial: '0.6%', isHeavy: true },
  { view: 'paid-adjusted', payer: '개인', households: '3주택 이상', area: '85㎡ 이하',
    total: '12.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'paid-adjusted', payer: '개인', households: '3주택 이상', area: '85㎡ 초과',
    total: '13.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '1.0%', isHeavy: true },

  // === Table 2: 유상취득 - 비조정대상지역 (개인) ===
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '6억원 이하', area: '85㎡ 이하',
    total: '1.1%', acquisition: '1.0%', education: '0.1%', ruralSpecial: '0.0%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '6억원 이하', area: '85㎡ 초과',
    total: '1.3%', acquisition: '1.0%', education: '0.1%', ruralSpecial: '0.2%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '6억원 초과 9억원 이하', area: '85㎡ 이하',
    total: '1.1~3.3%', acquisition: '1.0~3.0%', education: '0.1~0.3%', ruralSpecial: '0.0%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '6억원 초과 9억원 이하', area: '85㎡ 초과',
    total: '1.3~3.5%', acquisition: '1.0~3.0%', education: '0.1~0.3%', ruralSpecial: '0.2%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '9억원 초과', area: '85㎡ 이하',
    total: '3.3%', acquisition: '3.0%', education: '0.3%', ruralSpecial: '0.0%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '2주택 이하', priceRange: '9억원 초과', area: '85㎡ 초과',
    total: '3.5%', acquisition: '3.0%', education: '0.3%', ruralSpecial: '0.2%' },
  { view: 'paid-non-adjusted', payer: '개인', households: '3주택', area: '85㎡ 이하',
    total: '8.4%', acquisition: '8.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'paid-non-adjusted', payer: '개인', households: '3주택', area: '85㎡ 초과',
    total: '9.0%', acquisition: '8.0%', education: '0.4%', ruralSpecial: '0.6%', isHeavy: true },
  { view: 'paid-non-adjusted', payer: '개인', households: '4주택 이상', area: '85㎡ 이하',
    total: '12.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'paid-non-adjusted', payer: '개인', households: '4주택 이상', area: '85㎡ 초과',
    total: '13.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '1.0%', isHeavy: true },

  // === Table 3: 무상취득 - 조정대상지역 (개인) ===
  { view: 'gift-adjusted', payer: '개인', area: '85㎡ 이하',
    total: '12.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'gift-adjusted', payer: '개인', area: '85㎡ 초과',
    total: '13.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '1.0%', isHeavy: true },

  // === Table 4: 법인 주택 취득 ===
  { view: 'corporate', payer: '법인', area: '85㎡ 이하',
    total: '12.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '0.0%', isHeavy: true },
  { view: 'corporate', payer: '법인', area: '85㎡ 초과',
    total: '13.4%', acquisition: '12.0%', education: '0.4%', ruralSpecial: '1.0%', isHeavy: true },
];
