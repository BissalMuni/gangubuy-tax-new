import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/lib/content/search';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20', 10);

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const results = searchContent(query, Math.min(limit, 50));
  return NextResponse.json({ results });
}
