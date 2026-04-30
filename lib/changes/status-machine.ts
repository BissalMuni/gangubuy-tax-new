/**
 * 변경 항목 상태 머신 (data-model.md §상태 머신).
 *
 * 본 모듈은 순수 상태 전이 규칙만 다룬다. DB 호출은 status-transition.ts에
 * 분리되어 있으며, 본 함수들은 단위 테스트가 용이하도록 의존성이 없다.
 */

export type ChangeStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'applied'
  | 'rejected'
  | 'failed';

export type ChangeAction =
  | 'approve'
  | 'reject'
  | 'process'
  | 'apply'
  | 'fail'
  | 'retry';

const TRANSITIONS: Record<ChangeStatus, ChangeStatus[]> = {
  pending: ['approved', 'rejected'],
  approved: ['processing'],
  processing: ['applied', 'failed'],
  applied: [],
  rejected: [],
  failed: ['approved'], // 관리자 수동 재시도 (FR-009)
};

const ACTION_TO_STATUS: Record<ChangeAction, ChangeStatus> = {
  approve: 'approved',
  reject: 'rejected',
  process: 'processing',
  apply: 'applied',
  fail: 'failed',
  retry: 'approved',
};

export function canTransition(from: ChangeStatus, to: ChangeStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function targetStatusOf(action: ChangeAction): ChangeStatus {
  return ACTION_TO_STATUS[action];
}

export function isTerminalStatus(status: ChangeStatus): boolean {
  return TRANSITIONS[status]?.length === 0;
}
