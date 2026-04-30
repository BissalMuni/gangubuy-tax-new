/**
 * load-prompt.ts — automation_settings.system_prompt를 stdout으로 출력 (slice 6).
 *
 * 워크플로 YAML에서 `PROMPT=$(npx tsx scripts/load-prompt.ts)` 형식으로 호출.
 * DB가 비었거나 빈 문자열이면 fallback 기본 프롬프트를 출력.
 */

import { config as loadDotenv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadDotenv({ path: '.env.local' });

const FALLBACK_PROMPT = `이 레포에서 review-feedback 작업을 수행해줘.
절대 규칙:
- content/ 내의 파일만 수정 가능
- 다른 경로의 파일은 읽기만 가능
- 합리적인 의견만 반영, 비합리/감상은 reject
- git commit/push는 하지 말 것`;

async function main(): Promise<void> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    process.stdout.write(FALLBACK_PROMPT);
    return;
  }
  try {
    const client = createClient(url, key);
    const { data } = await client
      .from('automation_settings')
      .select('system_prompt')
      .eq('id', 1)
      .maybeSingle();
    const prompt = (data?.system_prompt ?? '').trim();
    process.stdout.write(prompt || FALLBACK_PROMPT);
  } catch {
    process.stdout.write(FALLBACK_PROMPT);
  }
}

main();
