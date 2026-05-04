import { describe, it, expect } from 'vitest';
import {
  hasRole,
  actorOf,
  actingRoleOf,
  toPhase2Session,
  type Session,
} from '@/lib/auth/role-guard';
import type { AppUser } from '@/lib/supabase/users';

const phase1Admin: Session = { phase: 1, role: 'admin' };
const phase1Approver: Session = { phase: 1, role: 'approver' };

function makeAppUser(roles: AppUser['roles']): AppUser {
  return {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'multi@example.com',
    roles,
    active: true,
    invitedBy: null,
    createdAt: '2026-04-30T00:00:00Z',
    updatedAt: '2026-04-30T00:00:00Z',
  };
}

describe('role-guard.hasRole — Phase 1', () => {
  it('admin 세션 + allowed=admin → true', () => {
    expect(hasRole(phase1Admin, ['admin'])).toBe(true);
  });
  it('approver 세션 + allowed=admin → false', () => {
    expect(hasRole(phase1Approver, ['admin'])).toBe(false);
  });
  it('approver 세션 + allowed=[admin, approver] → true', () => {
    expect(hasRole(phase1Approver, ['admin', 'approver'])).toBe(true);
  });
});

describe('role-guard.hasRole — Phase 2', () => {
  it('roles=[admin, approver] + allowed=[admin] → true', () => {
    const session = toPhase2Session(makeAppUser(['admin', 'approver']));
    expect(hasRole(session, ['admin'])).toBe(true);
  });
  it('roles=[editor] + allowed=[admin, approver] → false', () => {
    const session = toPhase2Session(makeAppUser(['editor']));
    expect(hasRole(session, ['admin', 'approver'])).toBe(false);
  });
});

describe('role-guard.actorOf', () => {
  it('Phase 1 → "<role>(shared)" 형식', () => {
    expect(actorOf(phase1Admin)).toBe('admin(shared)');
    expect(actorOf(phase1Approver)).toBe('approver(shared)');
  });
  it('Phase 2 → 사용자 이메일', () => {
    const session = toPhase2Session(makeAppUser(['admin']));
    expect(actorOf(session)).toBe('multi@example.com');
  });
});

describe('role-guard.actingRoleOf', () => {
  it('Phase 1 → 단일 role 반환', () => {
    expect(actingRoleOf(phase1Approver, ['admin', 'approver'])).toBe('approver');
  });
  it('Phase 2 다중 역할 → allowed와 첫 매칭 반환', () => {
    const session = toPhase2Session(makeAppUser(['editor', 'approver']));
    expect(actingRoleOf(session, ['admin', 'approver'])).toBe('approver');
  });
  it('Phase 2 매치 없으면 throw (requireSession 누락 가드)', () => {
    const session = toPhase2Session(makeAppUser(['editor']));
    expect(() => actingRoleOf(session, ['admin'])).toThrow();
  });
});
