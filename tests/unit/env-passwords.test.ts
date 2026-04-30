import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { verifyPassword } from '@/lib/auth/env-passwords';

describe('env-passwords.verifyPassword', () => {
  const original = {
    admin: process.env.ADMIN_PASSWORD,
    approver: process.env.APPROVER_PASSWORD,
    editor: process.env.EDITOR_PASSWORD,
  };

  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'admin-secret-1234';
    process.env.APPROVER_PASSWORD = 'approver-secret-1234';
    process.env.EDITOR_PASSWORD = 'editor-secret-1234';
  });

  afterEach(() => {
    process.env.ADMIN_PASSWORD = original.admin;
    process.env.APPROVER_PASSWORD = original.approver;
    process.env.EDITOR_PASSWORD = original.editor;
  });

  it('비번이 일치하면 true', () => {
    expect(verifyPassword('admin-secret-1234', 'admin')).toBe(true);
    expect(verifyPassword('approver-secret-1234', 'approver')).toBe(true);
    expect(verifyPassword('editor-secret-1234', 'editor')).toBe(true);
  });

  it('비번이 다르면 false', () => {
    expect(verifyPassword('wrong', 'admin')).toBe(false);
    expect(verifyPassword('editor-secret-1234', 'admin')).toBe(false);
  });

  it('빈 입력은 항상 false', () => {
    expect(verifyPassword('', 'admin')).toBe(false);
    expect(verifyPassword(null, 'admin')).toBe(false);
    expect(verifyPassword(undefined, 'admin')).toBe(false);
  });

  it('env가 비어 있으면 항상 false (오작동 방어)', () => {
    delete process.env.ADMIN_PASSWORD;
    expect(verifyPassword('admin-secret-1234', 'admin')).toBe(false);
  });

  it('길이가 다르면 timingSafeEqual 호출 전에 false 반환 (예외 X)', () => {
    expect(verifyPassword('short', 'admin')).toBe(false);
    expect(verifyPassword('a-very-very-very-long-input-that-will-not-match', 'admin')).toBe(false);
  });
});
