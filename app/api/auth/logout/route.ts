import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/auth/session';

/**
 * 로그아웃 — 쿠키 삭제. 멱등 (이미 로그아웃 상태여도 200).
 */
export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
