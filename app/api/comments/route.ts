import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/supabase/comments';
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
  let body: {
    content_path?: string;
    body?: string;
    section?: string;
    password?: string;
    target_kind?: 'content' | 'structure';
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const {
    content_path,
    body: commentBody,
    section,
    password,
    target_kind,
  } = body;

  // Phase 1: 담당자 무기명 — author 입력 받지 않음, password로만 게이트.
  if (!verifyPassword(password, 'editor')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // IP 레이트리밋 (10회/시간)
  const ip = getClientIp(request.headers);
  const rl = await checkRateLimit(RATE_LIMITS.COMMENT, ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'rate limit exceeded', reset: rl.reset },
      { status: 429 },
    );
  }

  if (!content_path || !commentBody) {
    return NextResponse.json(
      { error: 'body, content_path are required' },
      { status: 400 },
    );
  }

  const trimmedBody = commentBody.trim().slice(0, 5000);
  const trimmedPath = content_path.trim();
  const trimmedSection = section ? section.trim().slice(0, 100) : null;

  if (!trimmedBody || !trimmedPath) {
    return NextResponse.json(
      { error: 'body, content_path are required' },
      { status: 400 },
    );
  }

  const kind: 'content' | 'structure' =
    target_kind === 'structure' ? 'structure' : 'content';

  try {
    const data = await createComment({
      content_path: trimmedPath,
      body: trimmedBody,
      section: trimmedSection,
      target_kind: kind,
    });
    await recordAudit({
      change_kind: 'comment',
      change_id: data.id,
      from_status: null,
      to_status: 'pending',
      action: 'create',
      actor: 'editor(anonymous)',
      metadata: { content_path: trimmedPath, target_kind: kind },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'failed to create comment' },
      { status: 500 },
    );
  }
}
