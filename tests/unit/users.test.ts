import { describe, it, expect } from 'vitest';
import { hasAnyRole, type AppUser } from '@/lib/supabase/users';

function makeUser(overrides: Partial<AppUser> = {}): AppUser {
  return {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'user@example.com',
    roles: ['editor'],
    active: true,
    invitedBy: null,
    createdAt: '2026-04-30T00:00:00Z',
    updatedAt: '2026-04-30T00:00:00Z',
    ...overrides,
  };
}

describe('users.hasAnyRole', () => {
  it('단일 역할 보유 사용자 — 일치 시 true', () => {
    expect(hasAnyRole(makeUser({ roles: ['admin'] }), ['admin'])).toBe(true);
  });

  it('다중 역할 보유 — 부분 일치 시 true', () => {
    const user = makeUser({ roles: ['approver', 'editor'] });
    expect(hasAnyRole(user, ['admin'])).toBe(false);
    expect(hasAnyRole(user, ['admin', 'approver'])).toBe(true);
    expect(hasAnyRole(user, ['editor'])).toBe(true);
  });

  it('active=false 사용자는 어떤 역할도 보유하지 않은 것으로 처리', () => {
    const user = makeUser({ roles: ['admin'], active: false });
    expect(hasAnyRole(user, ['admin'])).toBe(false);
  });

  it('빈 allowed 배열 → 항상 false', () => {
    expect(hasAnyRole(makeUser(), [])).toBe(false);
  });
});
