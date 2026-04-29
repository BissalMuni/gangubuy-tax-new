import { z } from 'zod';

const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');

const VersionString = z
  .string()
  .regex(/^\d+\.\d+(\.\d+)?$/, 'must be like "1.0" or "1.0.0"');

const Status = z.enum(['draft', 'review', 'published']);
const Audience = z.enum(['internal', 'public']);

const baseFields = {
  title: z.string().min(1),
  version: VersionString,
  last_updated: DateString,
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
};

export const AcquisitionFM = z.object({
  category: z.literal('취득세'),
  ...baseFields,
  audience: Audience,
  source: z.string(),
  effective_date: DateString,
  status: Status,
  law_reference: z.string(),
  section_id: z.string().optional(),
  subcategory: z.string().optional(),
  page_range: z.tuple([z.number().int(), z.number().int()]).optional(),
  source_sections: z.array(z.number().int()).optional(),
});

export const CorpAcquisitionFM = z.object({
  category: z.literal('corp-acquisition-tax'),
  ...baseFields,
  group: z.string(),
  group_label: z.string(),
  order: z.number().int(),
  source_book: z.string(),
  source_book_title: z.string(),
  source_leaf: z.string(),
  source_pages: z.array(z.number().int()),
  source_tax_types: z.array(z.string()),
  source_key_law_refs: z.array(z.string()).optional(),
  law_reference: z.string().optional(),
  effective_date: DateString.optional(),
  status: Status.optional(),
});

export const HomeFM = z.object({
  category: z.literal('home'),
  ...baseFields,
  effective_date: DateString,
  legal_basis: z.string(),
  deprecated: z.boolean(),
  superseded_by: z.string().nullable(),
});

export const Frontmatter = z.discriminatedUnion('category', [
  AcquisitionFM,
  CorpAcquisitionFM,
  HomeFM,
]);

export type FrontmatterT = z.infer<typeof Frontmatter>;
export type AcquisitionFMT = z.infer<typeof AcquisitionFM>;
export type CorpAcquisitionFMT = z.infer<typeof CorpAcquisitionFM>;
export type HomeFMT = z.infer<typeof HomeFM>;

export function expectedDialectFromPath(filePath: string): 'acquisition' | 'corp-acquisition-tax' | 'home' | 'unknown' {
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.includes('/content/home/')) return 'home';
  if (normalized.includes('/content/corp-acquisition-tax/')) return 'corp-acquisition-tax';
  if (normalized.includes('/content/acquisition/')) return 'acquisition';
  return 'unknown';
}
