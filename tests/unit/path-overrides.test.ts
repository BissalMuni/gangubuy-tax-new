import { describe, it, expect } from 'vitest';
import { resolveMode, validatePathOverrides } from '@/lib/changes/path-overrides';

describe('resolveMode', () => {
  it('overrides 빈 객체 → globalMode 그대로', () => {
    expect(resolveMode('content/a/b', 'manual', {})).toBe('manual');
    expect(resolveMode('content/a/b', 'auto', {})).toBe('auto');
  });

  it('매칭되는 패턴이 있으면 그 모드 사용', () => {
    expect(
      resolveMode('content/property-tax/foo', 'manual', {
        'content/property-tax/**': 'auto',
      }),
    ).toBe('auto');
    expect(
      resolveMode('content/acquisition-tax/foo', 'auto', {
        'content/acquisition-tax/**': 'manual',
      }),
    ).toBe('manual');
  });

  it('매칭되지 않으면 globalMode 사용', () => {
    expect(
      resolveMode('content/other/foo', 'auto', {
        'content/property-tax/**': 'manual',
      }),
    ).toBe('auto');
  });

  it('target_kind=structure는 항상 manual (FR-030)', () => {
    expect(
      resolveMode('content/anything', 'auto', { 'content/**': 'auto' }, { targetKind: 'structure' }),
    ).toBe('manual');
  });
});

describe('validatePathOverrides', () => {
  it('null/undefined → 빈 객체', () => {
    expect(validatePathOverrides(null)).toEqual({ ok: true, value: {} });
    expect(validatePathOverrides(undefined)).toEqual({ ok: true, value: {} });
  });

  it('객체 아닌 값 → 에러', () => {
    expect(validatePathOverrides('foo')).toMatchObject({ ok: false });
    expect(validatePathOverrides([])).toMatchObject({ ok: false });
    expect(validatePathOverrides(123)).toMatchObject({ ok: false });
  });

  it('잘못된 모드 → 에러', () => {
    expect(
      validatePathOverrides({ 'content/**': 'invalid' }),
    ).toMatchObject({ ok: false });
  });

  it('정상 입력 → ok', () => {
    const result = validatePathOverrides({
      'content/a/**': 'auto',
      'content/b/**': 'manual',
    });
    expect(result).toEqual({
      ok: true,
      value: { 'content/a/**': 'auto', 'content/b/**': 'manual' },
    });
  });
});
