import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '@/lib/supabase/comments';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const author = request.nextUrl.searchParams.get('author');

  if (!author) {
    return NextResponse.json(
      { error: 'author query parameter is required' },
      { status: 400 },
    );
  }

  try {
    const result = await deleteComment(id, author);

    if (!result.success) {
      const status = result.error === 'comment not found' ? 404 : 403;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'failed to delete comment' },
      { status: 500 },
    );
  }
}
