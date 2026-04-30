import { getSupabase } from './server';
import type { AutomationMode } from '@/lib/changes/path-overrides';

/**
 * automation_settings 단일 행 (id=1) 접근 헬퍼.
 */

export interface AutomationSettings {
  id: number;
  mode: AutomationMode;
  path_overrides: Record<string, AutomationMode>;
  cron_enabled: boolean;
  system_prompt: string;
  updated_by: string | null;
  updated_at: string;
}

const DEFAULT_SETTINGS: AutomationSettings = {
  id: 1,
  mode: 'manual',
  path_overrides: {},
  cron_enabled: true,
  system_prompt: '',
  updated_by: null,
  updated_at: new Date(0).toISOString(),
};

export async function loadAutomationSettings(): Promise<AutomationSettings> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('automation_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return { ...DEFAULT_SETTINGS };
  return {
    id: data.id,
    mode: (data.mode as AutomationMode) ?? 'manual',
    path_overrides: (data.path_overrides ?? {}) as Record<string, AutomationMode>,
    cron_enabled: data.cron_enabled ?? true,
    system_prompt: data.system_prompt ?? '',
    updated_by: data.updated_by ?? null,
    updated_at: data.updated_at,
  };
}

export interface UpdateAutomationSettingsInput {
  mode?: AutomationMode;
  path_overrides?: Record<string, AutomationMode>;
  cron_enabled?: boolean;
  system_prompt?: string;
  updated_by: string;
}

/**
 * 설정 업데이트.
 *
 * system_prompt 변경 시 이전 값을 system_prompt_history에 백업한다 (FR-029).
 * 호출자가 sourceSettings를 미리 fetch한 뒤 changes를 계산해서 이 함수를 부른다
 * (트랜잭션 분리 없이 best-effort).
 */
export async function updateAutomationSettings(
  input: UpdateAutomationSettingsInput,
): Promise<AutomationSettings> {
  const supabase = getSupabase();

  // 시스템 프롬프트가 바뀌면 이전 값 history 적재
  if (input.system_prompt !== undefined) {
    const { data: current } = await supabase
      .from('automation_settings')
      .select('system_prompt')
      .eq('id', 1)
      .maybeSingle();
    if (current && current.system_prompt && current.system_prompt !== input.system_prompt) {
      await supabase.from('system_prompt_history').insert({
        prompt: current.system_prompt,
        updated_by: input.updated_by,
      });
    }
  }

  const payload: Record<string, unknown> = { updated_by: input.updated_by };
  if (input.mode !== undefined) payload.mode = input.mode;
  if (input.path_overrides !== undefined) payload.path_overrides = input.path_overrides;
  if (input.cron_enabled !== undefined) payload.cron_enabled = input.cron_enabled;
  if (input.system_prompt !== undefined) payload.system_prompt = input.system_prompt;

  const { data, error } = await supabase
    .from('automation_settings')
    .update(payload)
    .eq('id', 1)
    .select('*')
    .single();

  if (error) throw error;
  return {
    id: data.id,
    mode: data.mode as AutomationMode,
    path_overrides: (data.path_overrides ?? {}) as Record<string, AutomationMode>,
    cron_enabled: data.cron_enabled,
    system_prompt: data.system_prompt,
    updated_by: data.updated_by,
    updated_at: data.updated_at,
  };
}

export async function loadPromptHistory(limit = 20): Promise<
  Array<{ id: string; prompt: string; updated_by: string; updated_at: string }>
> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('system_prompt_history')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Array<{
    id: string;
    prompt: string;
    updated_by: string;
    updated_at: string;
  }>;
}
