import { z } from 'zod';

const PercentLike = z.string().regex(/^\+?\d+(\.\d+)?%$/, 'must be like "8%" or "+8%"');

export const LuxuryOverlapRowSchema = z.object({
  situation: z.string().min(1),
  baseRate: PercentLike,
  additionalRate: PercentLike,
  totalRate: PercentLike,
});

export type LuxuryOverlapRow = z.infer<typeof LuxuryOverlapRowSchema>;

export const luxuryOverlapRates: LuxuryOverlapRow[] = [
  { situation: '조정 2주택 + 고급주택', baseRate: '8%', additionalRate: '+8%', totalRate: '16%' },
  { situation: '조정 3주택 + 고급주택', baseRate: '12%', additionalRate: '+8%', totalRate: '20%' },
  { situation: '법인 + 고급주택', baseRate: '12%', additionalRate: '+8%', totalRate: '20%' },
];
