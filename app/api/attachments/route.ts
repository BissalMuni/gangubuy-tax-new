import { NextRequest, NextResponse } from 'next/server';
import { getAttachments, uploadAttachment } from '@/lib/supabase/attachments';

export async function GET(request: NextRequest) {
  const contentPath = request.nextUrl.searchParams.get('content_path');

  if (!contentPath) {
    return NextResponse.json(
      { error: 'content_path is required' },
      { status: 400 },
    );
  }

  try {
    const data = await getAttachments(contentPath);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'failed to fetch attachments' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'invalid form data' },
      { status: 400 },
    );
  }

  const file = formData.get('file') as File | null;
  const contentPath = formData.get('content_path') as string | null;
  const uploadedBy = formData.get('uploaded_by') as string | null;

  if (!file || !contentPath || !uploadedBy) {
    return NextResponse.json(
      { error: 'file, content_path, uploaded_by are required' },
      { status: 400 },
    );
  }

  try {
    const data = await uploadAttachment(file, contentPath.trim(), uploadedBy.trim());
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to upload';
    const status = message.includes('not allowed') || message.includes('exceeds') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
