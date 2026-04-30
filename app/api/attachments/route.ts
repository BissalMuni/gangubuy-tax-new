import { NextRequest, NextResponse } from 'next/server';
import { getAttachments, uploadAttachment } from '@/lib/supabase/attachments';
import { verifyPassword } from '@/lib/auth/env-passwords';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/auth/rate-limit';
import { recordAudit } from '@/lib/changes/audit';

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
    return NextResponse.json({ error: 'invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const contentPath = formData.get('content_path') as string | null;
  const password = formData.get('password') as string | null;
  const commentId = formData.get('comment_id') as string | null;

  // Phase 1: 담당자 무기명 — uploaded_by 입력 받지 않음, password로만 게이트.
  if (!verifyPassword(password, 'editor')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // IP 레이트리밋
  const ip = getClientIp(request.headers);
  const rl = await checkRateLimit(RATE_LIMITS.COMMENT, ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'rate limit exceeded', reset: rl.reset },
      { status: 429 },
    );
  }

  if (!file || !contentPath) {
    return NextResponse.json(
      { error: 'file, content_path are required' },
      { status: 400 },
    );
  }

  try {
    const data = await uploadAttachment({
      file,
      content_path: contentPath.trim(),
      comment_id: commentId,
    });
    await recordAudit({
      change_kind: 'attachment',
      change_id: data.id,
      from_status: null,
      to_status: 'pending',
      action: 'create',
      actor: 'editor(anonymous)',
      metadata: {
        content_path: contentPath.trim(),
        file_name: file.name,
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'failed to upload';
    const status = message.includes('not allowed') || message.includes('exceeds') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
