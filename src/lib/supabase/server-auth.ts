import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버사이드 Supabase 클라이언트 (인증용, anon key + 쿠키)
 * 기존 server.ts의 service role 클라이언트(tax 스키마)와 별도.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component에서 호출 시 쿠키 쓰기 불가 — 무시
          }
        },
      },
    }
  );
}
