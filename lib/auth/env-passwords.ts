import { timingSafeEqual } from 'crypto';

/**
 * Phase 1 역할 비번 검증 헬퍼.
 *
 * env에서 평문 비번을 받아 timing-safe 비교로 검증한다. bcrypt 해시는 사용하지
 * 않는다 — env에는 이미 평문이 들어 있으므로 추가 보안 가치가 없고, 비교 비용만
 * 든다. 시간 측정 공격(timing attack)만 차단하면 충분.
 */
export type Phase1Role = 'admin' | 'approver' | 'editor';

const ENV_VAR_BY_ROLE: Record<Phase1Role, string> = {
  admin: 'ADMIN_PASSWORD',
  approver: 'APPROVER_PASSWORD',
  editor: 'EDITOR_PASSWORD',
};

export function verifyPassword(input: string | null | undefined, role: Phase1Role): boolean {
  if (typeof input !== 'string' || input.length === 0) return false;
  const expected = process.env[ENV_VAR_BY_ROLE[role]];
  if (!expected) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
