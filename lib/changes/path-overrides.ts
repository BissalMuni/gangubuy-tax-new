// minimatch v3 (legacy) exports as default function. v5+ uses named export.
// @ts-expect-error v3 type def is not a module export
import minimatchDefault from 'minimatch';

const minimatch: (path: string, pattern: string) => boolean =
  typeof minimatchDefault === 'function'
    ? (minimatchDefault as unknown as (p: string, pat: string) => boolean)
    : ((minimatchDefault as unknown as { minimatch: (p: string, pat: string) => boolean }).minimatch);

/**
 * 경로별 모드 강제 (path_overrides) 매칭.
 *
 * automation_settings.path_overrides JSON: { "content/property-tax/**": "auto" }
 *
 * 글로벌 모드 + 경로 오버라이드를 결합하여 최종 모드를 결정한다.
 * - target_kind='structure' 항목은 항상 'manual' (FR-030)
 */

export type AutomationMode = 'auto' | 'manual';

const PATH_OVERRIDE_VALUE = new Set<AutomationMode>(['auto', 'manual']);

export function resolveMode(
  contentPath: string,
  globalMode: AutomationMode,
  overrides: Record<string, string> | null | undefined,
  options: { targetKind?: 'content' | 'structure' } = {},
): AutomationMode {
  if (options.targetKind === 'structure') return 'manual';

  if (!overrides || typeof overrides !== 'object') return globalMode;

  for (const [pattern, mode] of Object.entries(overrides)) {
    if (!PATH_OVERRIDE_VALUE.has(mode as AutomationMode)) continue;
    if (minimatch(contentPath, pattern)) {
      return mode as AutomationMode;
    }
  }
  return globalMode;
}

/**
 * path_overrides 객체 검증. 잘못된 키/값을 명시적으로 거부.
 */
export function validatePathOverrides(input: unknown): {
  ok: true;
  value: Record<string, AutomationMode>;
} | { ok: false; error: string } {
  if (input == null) return { ok: true, value: {} };
  if (typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, error: 'path_overrides must be an object' };
  }
  const result: Record<string, AutomationMode> = {};
  for (const [pattern, value] of Object.entries(input as Record<string, unknown>)) {
    if (typeof pattern !== 'string' || pattern.trim() === '') {
      return { ok: false, error: `invalid pattern: ${pattern}` };
    }
    if (value !== 'auto' && value !== 'manual') {
      return { ok: false, error: `invalid mode for "${pattern}": expected "auto" or "manual"` };
    }
    result[pattern] = value;
  }
  return { ok: true, value: result };
}
