import { getSupabase } from '@/lib/supabase/server';
import type { ChangeStatus } from './status-machine';

/**
 * change_audit 기록 헬퍼. 모든 상태 전이 / soft delete / 복원에서 호출.
 *
 * 주의: audit 실패가 호출자의 본 요청 흐름을 막아서는 안 된다 — 로그만 남기고
 * 본 요청은 진행시킨다.
 */
export type ChangeKind = 'comment' | 'attachment';

export type ChangeAction =
  | 'create'
  | 'approve'
  | 'reject'
  | 'process'
  | 'apply'
  | 'fail'
  | 'delete'
  | 'restore';

export interface AuditEntry {
  change_kind: ChangeKind;
  change_id: string;
  from_status?: ChangeStatus | null;
  to_status?: ChangeStatus | null;
  action: ChangeAction;
  actor: string;
  reason?: string | null;
  metadata?: Record<string, unknown>;
}

export async function recordAudit(entry: AuditEntry): Promise<void> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('change_audit').insert({
      change_kind: entry.change_kind,
      change_id: entry.change_id,
      from_status: entry.from_status ?? null,
      to_status: entry.to_status ?? null,
      action: entry.action,
      actor: entry.actor,
      reason: entry.reason ?? null,
      metadata: entry.metadata ?? {},
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.warn('[audit] failed to record entry', error.message, entry);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[audit] unexpected error recording entry', err);
  }
}
