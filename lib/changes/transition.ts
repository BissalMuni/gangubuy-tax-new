import { getSupabase } from '@/lib/supabase/server';
import {
  canTransition,
  type ChangeStatus,
  type ChangeAction as TransitionAction,
  targetStatusOf,
} from './status-machine';
import { recordAudit, type ChangeKind, type ChangeAction as AuditAction } from './audit';

/**
 * 상태 전이 + 낙관적 락 + 감사 로그를 묶어 처리하는 헬퍼.
 *
 * 입력: 항목 id 목록 + 클라이언트가 본 마지막 updated_at(낙관적 락 체크용).
 * 출력: 성공한 id, 실패한 id (사유와 함께).
 */

const ACTION_AUDIT: Record<TransitionAction, AuditAction> = {
  approve: 'approve',
  reject: 'reject',
  process: 'process',
  apply: 'apply',
  fail: 'fail',
  retry: 'approve', // 재시도는 approve와 같은 의미로 기록
};

export interface TransitionRequest {
  id: string;
  /** 클라이언트가 본 마지막 updated_at 값 (낙관적 락) */
  expected_updated_at?: string;
}

export interface TransitionResult {
  succeeded: string[];
  conflicts: { id: string; current?: unknown; reason: string }[];
  invalid: { id: string; from?: ChangeStatus; reason: string }[];
}

interface TransitionOptions {
  table: ChangeKind extends 'comment' ? 'comments' : 'attachments';
  kind: ChangeKind;
  ids: TransitionRequest[];
  action: TransitionAction;
  actor: string;
  /** 추가 컬럼 업데이트 (예: reviewer, reviewed_at, reject_reason, applied_commit_sha) */
  extraUpdate?: Record<string, unknown>;
  /** audit reason */
  reason?: string;
  /** audit metadata */
  metadata?: Record<string, unknown>;
}

/**
 * 일괄 상태 전이.
 *
 * 각 항목별로:
 * 1) 현재 상태 조회 + canTransition 검증
 * 2) UPDATE ... WHERE id=$id AND updated_at=$expected (낙관적 락)
 * 3) audit 로그 기록
 *
 * 단일 트랜잭션이 아니지만, Supabase API는 RPC 없이는 트랜잭션을 묶기 어렵다.
 * 일괄 작업이라 작업 성패가 항목별로 나뉘는 것은 의도적이다.
 */
export async function bulkTransition(opts: TransitionOptions): Promise<TransitionResult> {
  const supabase = getSupabase();
  const targetStatus = targetStatusOf(opts.action);
  const result: TransitionResult = { succeeded: [], conflicts: [], invalid: [] };

  for (const req of opts.ids) {
    // 1) 현재 상태 조회
    const { data: current, error: fetchError } = await supabase
      .from(opts.table)
      .select('id, status, updated_at, deleted_at')
      .eq('id', req.id)
      .maybeSingle();

    if (fetchError || !current) {
      result.invalid.push({ id: req.id, reason: 'not found' });
      continue;
    }

    if (current.deleted_at) {
      result.invalid.push({
        id: req.id,
        from: current.status as ChangeStatus,
        reason: 'item is soft-deleted',
      });
      continue;
    }

    if (!canTransition(current.status as ChangeStatus, targetStatus)) {
      result.invalid.push({
        id: req.id,
        from: current.status as ChangeStatus,
        reason: `cannot transition ${current.status} → ${targetStatus}`,
      });
      continue;
    }

    // 2) 낙관적 락 UPDATE
    const updatePayload: Record<string, unknown> = {
      status: targetStatus,
      ...opts.extraUpdate,
    };

    let updateBuilder = supabase
      .from(opts.table)
      .update(updatePayload)
      .eq('id', req.id);

    if (req.expected_updated_at) {
      updateBuilder = updateBuilder.eq('updated_at', req.expected_updated_at);
    }

    const { data: updated, error: updateError } = await updateBuilder
      .select('*')
      .maybeSingle();

    if (updateError) {
      result.conflicts.push({ id: req.id, reason: updateError.message });
      continue;
    }
    if (!updated) {
      // 클라이언트가 본 updated_at과 현재 값이 다름 → conflict
      const { data: fresh } = await supabase
        .from(opts.table)
        .select('*')
        .eq('id', req.id)
        .maybeSingle();
      result.conflicts.push({
        id: req.id,
        current: fresh,
        reason: 'optimistic lock conflict (item was modified by another user)',
      });
      continue;
    }

    // 3) 감사 로그
    await recordAudit({
      change_kind: opts.kind,
      change_id: req.id,
      from_status: current.status as ChangeStatus,
      to_status: targetStatus,
      action: ACTION_AUDIT[opts.action],
      actor: opts.actor,
      reason: opts.reason ?? null,
      metadata: opts.metadata,
    });

    result.succeeded.push(req.id);
  }

  return result;
}
