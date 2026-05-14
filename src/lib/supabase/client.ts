import { createBrowserClient } from "@supabase/ssr";

/** 브라우저 사이드 Supabase 클라이언트 (인증용, anon key) */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
