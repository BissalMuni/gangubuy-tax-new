import { z } from 'zod';

export const HouseholdMemberRowSchema = z.object({
  // 가족 구분 (좌측 셀)
  category: z.string().min(1),
  // 동일세대 여부 (가운데 셀)
  status: z.string().min(1),
  // 동일세대 여부의 의미: same=항상 동일세대(녹), conditional=조건부, never=별도(빨강)
  statusKind: z.enum(['same', 'conditional', 'never']),
  // 조건 / 비고. **bold** 마크업 지원.
  condition: z.string().min(1),
});

export type HouseholdMemberRow = z.infer<typeof HouseholdMemberRowSchema>;

export const householdMembers: HouseholdMemberRow[] = [
  {
    category: '배우자',
    status: 'O (주소 불문)',
    statusKind: 'same',
    condition: '법률혼만 해당, 사실혼 제외 / 이혼 후에도 생계 같이하면 포함',
  },
  {
    category: '30세 미만 미혼 자녀',
    status: 'O (주소 불문)',
    statusKind: 'same',
    condition: '단, ①중위소득 40%↑ ②독립생계 ③성년 → 3가지 **모두** 충족 시 별도세대',
  },
  {
    category: '30세 이상 자녀',
    status: '등본상 동거 시',
    statusKind: 'conditional',
    condition: '별도 주소 시 별도세대',
  },
  {
    category: '기혼 자녀',
    status: '등본상 동거 시',
    statusKind: 'conditional',
    condition: '별도 주소 시 별도세대 (연령 불문)',
  },
  {
    category: '직계존속 (부모)',
    status: '등본상 동거 시',
    statusKind: 'conditional',
    condition:
      '취득자가 30세 미만 미혼이면 **항상** 동일세대 / 65세↑ 봉양합가 시 별도세대 인정',
  },
  {
    category: '형제자매',
    status: '등본상 동거 시',
    statusKind: 'conditional',
    condition: '등본 분리 시 별도세대',
  },
  {
    category: '직계혈족의 배우자\n(며느리·사위 등)',
    status: '동거 + 생계 같이',
    statusKind: 'conditional',
    condition: '인척 → 민법 §779 생계를 같이해야 가족',
  },
  {
    category: '배우자의 직계혈족\n(시부모·장인장모 등)',
    status: '동거 + 생계 같이',
    statusKind: 'conditional',
    condition: '인척 → 민법 §779 생계를 같이해야 가족',
  },
  {
    category: '동거인',
    status: 'X',
    statusKind: 'never',
    condition: '가족이 아니므로 세대원에 해당하지 않음',
  },
];
