import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type TaxClient = SupabaseClient<any, 'tax'>;

let _supabase: TaxClient | null = null;

/** 서버사이드 Supabase 클라이언트 (service role, tax 스키마)
 *  같은 Supabase 프로젝트를 다른 앱(math)과 공유하므로 'tax' 전용 스키마를 사용한다.
 *  Supabase Settings → API → Exposed schemas 에 'tax' 추가 필요. */
export function getSupabase(): TaxClient {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables',
    );
  }

  _supabase = createClient(supabaseUrl, supabaseServiceKey, {
    db: { schema: 'tax' },
  });
  return _supabase;
}
