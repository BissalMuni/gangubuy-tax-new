import { getSupabase } from '@/lib/supabase/server';
import { recordAudit, type ChangeKind } from './audit';

/**
 * soft delete + 복원.
 *
 * - softDelete: deleted_at = now, deleted_by = actor. 멱등 (이미 삭제된 건 skip).
 * - restore: deleted_at = NULL, deleted_by = NULL. 관리자만 호출 (라우트 가드 외부).
 *
 * status는 그대로 유지된다 (직교성, FR-013).
 */

export interface BulkDeleteResult {
  succeeded: string[];
  errors: { id: string; reason: string }[];
}

export async function bulkSoftDelete(
  table: 'comments' | 'attachments',
  kind: ChangeKind,
  ids: string[],
  actor: string,
): Promise<BulkDeleteResult> {
  const supabase = getSupabase();
  const result: BulkDeleteResult = { succeeded: [], errors: [] };

  for (const id of ids) {
    const { data: current } = await supabase
      .from(table)
      .select('id, deleted_at')
      .eq('id', id)
      .maybeSingle();

    if (!current) {
      result.errors.push({ id, reason: 'not found' });
      continue;
    }

    if (current.deleted_at) {
      // 이미 삭제됨 → 멱등성 보장
      result.succeeded.push(id);
      continue;
    }

    const { error } = await supabase
      .from(table)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: actor,
      })
      .eq('id', id)
      .is('deleted_at', null);

    if (error) {
      result.errors.push({ id, reason: error.message });
      continue;
    }

    await recordAudit({
      change_kind: kind,
      change_id: id,
      action: 'delete',
      actor,
    });

    result.succeeded.push(id);
  }

  return result;
}

export async function bulkRestore(
  table: 'comments' | 'attachments',
  kind: ChangeKind,
  ids: string[],
  actor: string,
): Promise<BulkDeleteResult> {
  const supabase = getSupabase();
  const result: BulkDeleteResult = { succeeded: [], errors: [] };

  for (const id of ids) {
    const { error } = await supabase
      .from(table)
      .update({ deleted_at: null, deleted_by: null })
      .eq('id', id);

    if (error) {
      result.errors.push({ id, reason: error.message });
      continue;
    }

    await recordAudit({
      change_kind: kind,
      change_id: id,
      action: 'restore',
      actor,
    });

    result.succeeded.push(id);
  }

  return result;
}
