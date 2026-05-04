import { NextResponse, type NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE_NAME, getAuthPhase } from '@/lib/auth/session';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/auth-client';

/**
 * /admin/* 보호 — Phase 1 / Phase 2 통합.
 *
 * Edge runtime에서 실행되므로 jose(Web Crypto)와 Supabase Auth(@supabase/ssr)만 사용.
 * Node 전용 모듈, service_role 키 접근(`lib/supabase/server.ts`)은 절대 import 금지.
 *
 * - Phase 1: jose JWT 쿠키 자체 검증 + role 분기
 * - Phase 2: Supabase Auth getUser()로 인증만 확인 (역할 검사는 page/layout에서 수행 —
 *   Edge에서 DB lookup 회피 위해)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 로그인 페이지는 양 페이즈 모두 통과
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (getAuthPhase() === 2) {
    return guardPhase2(req, pathname);
  }
  return guardPhase1(req, pathname);
}

async function guardPhase1(req: NextRequest, pathname: string): Promise<NextResponse> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySession(token);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = `?from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // admin 전용 경로 가드
  const adminOnly = ['/admin/settings', '/admin/users'];
  if (adminOnly.some((p) => pathname.startsWith(p)) && session.role !== 'admin') {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/changes';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

async function guardPhase2(req: NextRequest, pathname: string): Promise<NextResponse> {
  // Supabase 클라이언트는 응답 객체에 갱신된 쿠키를 기록하므로,
  // res를 먼저 만들고 클라이언트에 전달.
  const res = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `?from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // Phase 2 역할 검사는 page/layout에서 수행 (DB lookup 필요).
  // 미들웨어는 인증만 보장하고 통과.
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
