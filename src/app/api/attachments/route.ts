import { NextRequest, NextResponse } from 'next/server';
import { getAttachments, uploadAttachment } from '@/lib/supabase/attachments';
import { requirePermission, getRoleFromRequest } from '@/lib/auth/require-role';
import { ROLE_LABELS } from '@/lib/auth/constants';

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
  // 첨부 업로드는 editor 이상만 허용 (내용 편집 권한과 동급)
  const denied = requirePermission(request, 'edit_content');
  if (denied) return denied;

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

  if (!file || !contentPath) {
    return NextResponse.json(
      { error: 'file, content_path are required' },
      { status: 400 },
    );
  }

  // uploaded_by 는 클라이언트 입력을 신뢰하지 않고 JWT 역할에서 도출
  const role = getRoleFromRequest(request);
  const uploadedBy = role ? ROLE_LABELS[role] : '익명';

  try {
    const data = await uploadAttachment(file, contentPath.trim(), uploadedBy);
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error('[api/attachments POST] upload failed:', err);
    const message = err instanceof Error ? err.message : 'failed to upload';
    const status = message.includes('not allowed') || message.includes('exceeds') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
