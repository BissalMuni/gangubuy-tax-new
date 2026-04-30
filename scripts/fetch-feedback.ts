/**
 * fetch-feedback.ts — Phase 1 상태 머신 기반 큐 fetch (slice 6).
 *
 * 사용법:
 *   tsx scripts/fetch-feedback.ts                        — fetch 가능한 항목 출력 (JSON)
 *   tsx scripts/fetch-feedback.ts --mark-processing id   — id를 processing으로
 *   tsx scripts/fetch-feedback.ts --mark-applied id sha  — applied + commit_sha
 *   tsx scripts/fetch-feedback.ts --mark-failed id err   — failed + error_log
 *   tsx scripts/fetch-feedback.ts --sweep-stale          — processing 30분 초과 → failed (self-sweep)
 *
 * 동작:
 * - automation_settings.cron_enabled=false → 빈 배열
 * - mode=manual: status=approved 만
 * - mode=auto: status IN (pending, approved)
 * - path_overrides 적용 (글로벌과 다른 모드 강제)
 * - target_kind='structure' → 항상 manual
 * - deleted_at IS NOT NULL → 항상 제외
 */

import { config as loadDotenv } from 'dotenv';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { resolveMode } from '../lib/changes/path-overrides';

// .env.local 로딩 (로컬 실행 호환)
loadDotenv({ path: '.env.local' });

interface AutomationSettingsRow {
  mode: 'auto' | 'manual';
  path_overrides: Record<string, 'auto' | 'manual'> | null;
  cron_enabled: boolean;
  system_prompt: string;
}

interface QueueRow {
  id: string;
  content_path: string;
  body?: string;
  section?: string | null;
  target_kind: 'content' | 'structure';
  status: 'pending' | 'approved' | 'processing' | 'applied' | 'rejected' | 'failed';
  created_at: string;
  updated_at: string;
  applied_commit_sha?: string | null;
  reject_reason?: string | null;
}

function getClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required');
  }
  return createClient(url, key);
}

async function loadSettings(client: SupabaseClient): Promise<AutomationSettingsRow> {
  const { data, error } = await client
    .from('automation_settings')
    .select('mode, path_overrides, cron_enabled, system_prompt')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw error;
  return (
    data ?? {
      mode: 'manual',
      path_overrides: {},
      cron_enabled: true,
      system_prompt: '',
    }
  );
}

async function fetchQueue(client: SupabaseClient): Promise<QueueRow[]> {
  const settings = await loadSettings(client);
  if (!settings.cron_enabled) {
    return [];
  }

  // mode=auto면 pending+approved 모두, mode=manual이면 approved만 (1차 필터)
  const allowedStatuses =
    settings.mode === 'auto' ? ['pending', 'approved'] : ['approved'];

  const { data, error } = await client
    .from('comments')
    .select(
      'id, content_path, body, section, target_kind, status, created_at, updated_at, applied_commit_sha, reject_reason',
    )
    .in('status', allowedStatuses)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });
  if (error) throw error;

  const rows = (data ?? []) as QueueRow[];

  // path_overrides + target_kind='structure' 필터
  return rows.filter((r) => {
    const mode = resolveMode(r.content_path, settings.mode, settings.path_overrides ?? {}, {
      targetKind: r.target_kind,
    });
    if (mode === 'manual') {
      // manual 강제 시 approved만 통과
      return r.status === 'approved';
    }
    // auto면 pending/approved 모두 통과
    return r.status === 'pending' || r.status === 'approved';
  });
}

async function markProcessing(client: SupabaseClient, ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await client
    .from('comments')
    .update({ status: 'processing' })
    .in('id', ids)
    .in('status', ['pending', 'approved']);
  if (error) throw error;
}

async function markApplied(client: SupabaseClient, ids: string[], sha: string): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await client
    .from('comments')
    .update({ status: 'applied', applied_commit_sha: sha })
    .in('id', ids)
    .eq('status', 'processing');
  if (error) throw error;
}

async function markFailed(
  client: SupabaseClient,
  ids: string[],
  errorLog: string,
): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await client
    .from('comments')
    .update({ status: 'failed', error_log: errorLog })
    .in('id', ids)
    .eq('status', 'processing');
  if (error) throw error;
}

async function sweepStale(client: SupabaseClient): Promise<number> {
  // 워크플로 시작 시 self-sweep — processing 30분 초과 항목을 failed로
  const cutoff = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const { data: cmts, error: cErr } = await client
    .from('comments')
    .update({
      status: 'failed',
      error_log: '[self-sweep] processing >30min timeout',
    })
    .eq('status', 'processing')
    .lt('updated_at', cutoff)
    .select('id');
  if (cErr) throw cErr;

  const { data: atts, error: aErr } = await client
    .from('attachments')
    .update({
      status: 'failed',
      error_log: '[self-sweep] processing >30min timeout',
    })
    .eq('status', 'processing')
    .lt('updated_at', cutoff)
    .select('id');
  if (aErr) throw aErr;

  return (cmts?.length ?? 0) + (atts?.length ?? 0);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const client = getClient();
  const command = args[0];

  switch (command) {
    case '--mark-processing': {
      const ids = (args[1] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      await markProcessing(client, ids);
      console.log(JSON.stringify({ ok: true, marked: ids.length }));
      break;
    }
    case '--mark-applied': {
      const ids = (args[1] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      const sha = args[2] ?? 'unknown';
      await markApplied(client, ids, sha);
      console.log(JSON.stringify({ ok: true, marked: ids.length, sha }));
      break;
    }
    case '--mark-failed': {
      const ids = (args[1] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      const errorLog = args[2] ?? 'unknown error';
      await markFailed(client, ids, errorLog);
      console.log(JSON.stringify({ ok: true, marked: ids.length }));
      break;
    }
    case '--sweep-stale': {
      const swept = await sweepStale(client);
      console.log(JSON.stringify({ ok: true, swept }));
      break;
    }
    default: {
      const items = await fetchQueue(client);
      console.log(JSON.stringify({ ok: true, items }));
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
