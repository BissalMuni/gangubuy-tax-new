import { NextRequest, NextResponse } from 'next/server';
import { deleteAttachment } from '@/lib/supabase/attachments';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const uploadedBy = request.nextUrl.searchParams.get('uploaded_by');

  if (!uploadedBy) {
    return NextResponse.json(
      { error: 'uploaded_by query parameter is required' },
      { status: 400 },
    );
  }

  try {
    const result = await deleteAttachment(id, uploadedBy);

    if (!result.success) {
      const status = result.error === 'attachment not found' ? 404 : 403;
      return NextResponse.json({ error: result.error }, { status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'failed to delete attachment' },
      { status: 500 },
    );
  }
}
