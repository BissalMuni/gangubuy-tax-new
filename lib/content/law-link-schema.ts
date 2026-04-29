import { z } from 'zod';

/**
 * 법명 enum: content/ 전수조사로 도출한 17종.
 * URL 경로의 정식 법명 그대로 사용. 표시 텍스트(약칭 등)는 children에서 자유롭게.
 */
export const LawName = z.enum([
  '지방세법',
  '지방세법시행령',
  '지방세법시행규칙',
  '지방세특례제한법',
  '지방세특례제한법시행령',
  '지방세기본법',
  '법인세법',
  '민법',
  '주택법',
  '주택법시행규칙',
  '건축법시행령',
  '신탁법',
  '체육시설의설치·이용에관한법률',
  '국세기본법',
  '주민등록법',
  '집합건물의소유및관리에관한법률',
  '조세특례제한법',
]);

export type LawName = z.infer<typeof LawName>;

export const ArticleId = z.string().regex(
  /^제\d+조(의\d+)?$/,
  'must be like "제13조" or "제58조의3"',
);

export const LawLinkPropsSchema = z.object({
  law: LawName,
  article: ArticleId.optional(),
});

export type LawLinkProps = z.infer<typeof LawLinkPropsSchema>;

export function buildLawHref(props: LawLinkProps): string {
  const base = `https://law.go.kr/법령/${props.law}`;
  return props.article ? `${base}/${props.article}` : base;
}
