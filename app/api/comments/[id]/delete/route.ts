import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth/role-guard';
import { getSupabase } from '@/lib/supabase/server';
import { recordAudit } from '@/lib/changes/audit';

/**
 * Phase 2 — 본인 pending 댓글 soft delete.
 *
 * 흐름:
 *   POST /api/comments/<id>/delete
 *   → session.userId === comment.author_user_id 확인
 *   → comment.status === 'pending' 확인
 *   → comment.deleted_at IS NULL 확인 (멱등 처리)
 *   → UPDATE deleted_at = now(), deleted_by_user_id = session.userId
 *
 * Phase 1에서는 무기명이라 본인 식별 불가능 → 항상 403.
 * 승인된(approved 이상) 댓글은 본인이 직접 삭제 불가 — 승인자/관리자 경로
 * (/api/admin/changes/delete) 사용.
 */
export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (session.phase !== 2) {
    // Phase 1은 무기명. 본인 식별 자체가 불가능.
    return NextResponse.json(
      { error: 'self-delete requires AUTH_PHASE=2' },
      { status: 403 },
    );
  }

  const { id } = await context.params;
  if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: existing, error: fetchError } = await supabase
    .from('comments')
    .select('id, author_user_id, status, deleted_at')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  if (!existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  if (existing.author_user_id !== session.userId) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  if (existing.status !== 'pending') {
    return NextResponse.json(
      { error: 'only pending comments can be self-deleted' },
      { status: 403 },
    );
  }
  if (existing.deleted_at) {
    // 이미 삭제됨 → 멱등성 보장
    return NextResponse.json({ ok: true, already: true });
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('comments')
    .update({
      deleted_at: now,
      deleted_by: session.email,
      deleted_by_user_id: session.userId,
    })
    .eq('id', id)
    .is('deleted_at', null);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  await recordAudit({
    change_kind: 'comment',
    change_id: id,
    action: 'delete',
    actor: session.email,
    metadata: { self_delete: true },
  });

  return NextResponse.json({ ok: true });
}
