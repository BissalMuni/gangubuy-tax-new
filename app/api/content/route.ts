import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';
import { findContentFile, readMdxFile } from '@/lib/content/loader';
import type { TaxCategory } from '@/lib/types';

const VALID_CATEGORIES: TaxCategory[] = ['acquisition', 'property', 'vehicle'];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category') as TaxCategory | null;
  const slug = searchParams.get('slug');
  const version = searchParams.get('v') || undefined;

  if (!category || !slug) {
    return NextResponse.json(
      { error: 'category and slug are required' },
      { status: 400 },
    );
  }

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: 'invalid category' },
      { status: 400 },
    );
  }

  const slugParts = slug.split('/').filter(Boolean);
  const file = findContentFile(category, slugParts, version);

  if (!file) {
    return NextResponse.json(
      { error: 'content not found' },
      { status: 404 },
    );
  }

  const { meta, rawSource } = readMdxFile(file);
  const mdxSource = await serialize(rawSource);

  return NextResponse.json({ meta, mdxSource });
}
