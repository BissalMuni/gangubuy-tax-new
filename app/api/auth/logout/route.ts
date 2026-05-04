import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, getAuthPhase } from '@/lib/auth/session';
import { createSupabaseServerClient } from '@/lib/supabase/auth-client';

/**
 * 로그아웃 — 양 페이즈 모두 멱등.
 *
 * - Phase 1: jose JWT 쿠키 삭제
 * - Phase 2: Supabase auth.signOut() (refresh token 무효화 + auth 쿠키 정리)
 * 두 작업 모두 시도하므로 페이즈 전환 시점에도 안전하게 동작.
 */
export async function POST() {
  // Phase 1 쿠키는 항상 삭제 (페이즈 전환 직후 잔존 쿠키 정리)
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  // Phase 2 인증 활성 상태일 때만 Supabase signOut 시도
  if (getAuthPhase() === 2) {
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.auth.signOut();
    } catch {
      // env 미설정 등으로 실패해도 Phase 1 쿠키는 이미 삭제됨 → 응답은 성공 처리
    }
  }

  return NextResponse.json({ ok: true });
}
