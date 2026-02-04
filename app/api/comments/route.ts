import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/supabase/comments';

export async function GET(request: NextRequest) {
  const contentPath = request.nextUrl.searchParams.get('content_path');

  if (!contentPath) {
    return NextResponse.json(
      { error: 'content_path is required' },
      { status: 400 },
    );
  }

  try {
    const data = await getComments(contentPath);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'failed to fetch comments' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: { content_path?: string; author?: string; body?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid JSON body' },
      { status: 400 },
    );
  }

  const { content_path, author, body: commentBody } = body;

  if (!content_path || !author || !commentBody) {
    return NextResponse.json(
      { error: 'author, body, content_path are required' },
      { status: 400 },
    );
  }

  // Sanitize: trim and limit lengths
  const trimmedAuthor = author.trim().slice(0, 100);
  const trimmedBody = commentBody.trim().slice(0, 5000);
  const trimmedPath = content_path.trim();

  if (!trimmedAuthor || !trimmedBody || !trimmedPath) {
    return NextResponse.json(
      { error: 'author, body, content_path are required' },
      { status: 400 },
    );
  }

  try {
    const data = await createComment(trimmedPath, trimmedAuthor, trimmedBody);
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'failed to create comment' },
      { status: 500 },
    );
  }
}
