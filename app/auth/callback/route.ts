import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/auth-client';
import { getActiveUser } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

/**
 * Phase 2 — Supabase Auth Magic Link 콜백.
 *
 * 흐름:
 *   1) 사용자가 메일의 링크 클릭 → /auth/callback?code=<otp>&next=/admin/changes
 *   2) exchangeCodeForSession으로 access/refresh 토큰 쿠키 발급
 *   3) auth.users는 발급되었어도 운영 화이트리스트(users 테이블)에 active=true가
 *      아니면 즉시 sign out + 로그인 페이지로 에러와 함께 복귀
 *   4) 검증 통과 시 next 또는 /admin/changes로 리다이렉트
 *
 * `next` 파라미터는 open-redirect 방지 위해 같은 origin의 경로만 허용.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const errorDescription =
    url.searchParams.get('error_description') ?? url.searchParams.get('error');
  const rawNext = url.searchParams.get('next');
  const safeNext =
    rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//')
      ? rawNext
      : '/admin/changes';

  // Supabase가 OTP 만료 등으로 에러를 붙여 돌려보낸 경우
  if (errorDescription) {
    return redirectToLogin(req, safeNext, 'auth_failed');
  }

  if (!code) {
    return redirectToLogin(req, safeNext, 'missing_code');
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data?.user) {
    return redirectToLogin(req, safeNext, 'exchange_failed');
  }

  // 화이트리스트 검증: users 테이블에 active=true 행이 있어야 통과.
  const appUser = await getActiveUser(data.user.id);
  if (!appUser) {
    // auth 세션은 이미 발급됐으므로 즉시 폐기.
    await supabase.auth.signOut();
    return redirectToLogin(req, safeNext, 'not_authorized');
  }

  return NextResponse.redirect(new URL(safeNext, req.url));
}

function redirectToLogin(req: NextRequest, next: string, reason: string): NextResponse {
  const loginUrl = new URL('/auth/login', req.url);
  loginUrl.searchParams.set('from', next);
  loginUrl.searchParams.set('error', reason);
  return NextResponse.redirect(loginUrl);
}
