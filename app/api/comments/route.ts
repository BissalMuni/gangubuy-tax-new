import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/supabase/comments';
import { verifyPassword } from '@/lib/auth/env-passwords';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/auth/rate-limit';
import { recordAudit } from '@/lib/changes/audit';
import { getAuthPhase } from '@/lib/auth/session';
import { getCurrentSession } from '@/lib/auth/role-guard';

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

  const phase = getAuthPhase();

  // Phase 1: 비번 게이트로 무기명 제출. Phase 2: Supabase Auth 세션 검증.
  let authorEmail: string | null = null;
  let authorUserId: string | null = null;
  let actorLabel = 'editor(anonymous)';

  if (phase === 2) {
    const session = await getCurrentSession();
    if (!session || session.phase !== 2) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    authorEmail = session.email;
    authorUserId = session.userId;
    actorLabel = session.email;
  } else {
    if (!verifyPassword(password, 'editor')) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }

  // IP 레이트리밋 (10회/시간) — 양 페이즈 공통
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
      author: authorEmail,
      author_user_id: authorUserId,
    });
    await recordAudit({
      change_kind: 'comment',
      change_id: data.id,
      from_status: null,
      to_status: 'pending',
      action: 'create',
      actor: actorLabel,
      metadata: { content_path: trimmedPath, target_kind: kind, phase },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'failed to create comment' },
      { status: 500 },
    );
  }
}
