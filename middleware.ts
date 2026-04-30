import { NextResponse, type NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE_NAME } from '@/lib/auth/session';

/**
 * /admin/* 보호 — Phase 1.
 *
 * - /admin/login만 통과
 * - 세션 없거나 만료 → /admin/login 리다이렉트
 * - role 별 추가 검사:
 *     /admin/settings, /admin/users → admin만
 *
 * 미들웨어는 Edge runtime에서 실행되므로 jose(Web Crypto)만 사용.
 * Node 전용 모듈(Buffer, crypto.timingSafeEqual)은 절대 import 금지.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

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

export const config = {
  matcher: ['/admin/:path*'],
};
