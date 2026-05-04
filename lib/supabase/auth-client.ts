import { createServerClient, createBrowserClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { NextRequest, NextResponse } from 'next/server';

/**
 * Phase 2 — Supabase Auth (Magic Link) 클라이언트 팩토리.
 *
 * 기존 lib/supabase/server.ts는 service_role 키로 직접 DB만 다루는 용도이고,
 * 본 모듈은 사용자 세션(쿠키 기반 auth.users)을 다룬다. 두 역할은 분리.
 *
 * env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   - URL/anon은 클라이언트에 노출되어도 안전 (service_role과 다름)
 *
 * 세 가지 컨텍스트별 인스턴스를 분리:
 *   - browser: 'use client' 컴포넌트 / 폼
 *   - server (RSC, route handler): cookies() 동기 어댑터
 *   - middleware: NextRequest/NextResponse를 거쳐 쿠키 갱신
 */

function readPublicEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (Phase 2 auth)',
    );
  }
  return { url, anonKey };
}

/**
 * 브라우저 (클라이언트 컴포넌트) — 매 호출마다 새 인스턴스를 만들지 않도록 호출측에서
 * useMemo로 보관하거나 모듈 스코프 싱글톤을 만들 것.
 */
export function createSupabaseBrowserClient(): SupabaseClient {
  const { url, anonKey } = readPublicEnv();
  return createBrowserClient(url, anonKey);
}

/**
 * 서버 컴포넌트 / Route Handler — Next.js cookies() 어댑터.
 *
 * Next 14 App Router의 cookies()는 RSC에서는 read-only, Route Handler에서만
 * mutate 가능. read-only 컨텍스트에서 set/remove를 호출하면 throw하므로,
 * try/catch로 무시한다 (Supabase는 토큰 갱신 시 set을 시도함).
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  const { cookies: nextCookies } = await import('next/headers');
  const cookieStore = nextCookies();
  const { url, anonKey } = readPublicEnv();
  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // RSC에서는 set 불가 — 무시 (실제 쿠키 갱신은 middleware/route handler에서)
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        } catch {
          // RSC에서는 무시
        }
      },
    },
  });
}

/**
 * 미들웨어 — 요청 쿠키를 읽고, 갱신된 토큰을 응답 쿠키에 반영한다.
 *
 * 사용 패턴:
 *   const res = NextResponse.next();
 *   const supabase = createSupabaseMiddlewareClient(req, res);
 *   const { data: { user } } = await supabase.auth.getUser();
 *   return res; // 갱신된 쿠키가 자동으로 응답에 포함됨
 */
export function createSupabaseMiddlewareClient(
  req: NextRequest,
  res: NextResponse,
): SupabaseClient {
  const { url, anonKey } = readPublicEnv();
  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        req.cookies.set({ name, value, ...options });
        res.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        req.cookies.set({ name, value: '', ...options });
        res.cookies.set({ name, value: '', ...options, maxAge: 0 });
      },
    },
  });
}
