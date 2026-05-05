import { NextRequest, NextResponse } from "next/server";
import { authenticate, createSession, sessionCookieOptions } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  let body: { password: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { password } = body;
  if (!password) {
    return NextResponse.json({ error: "비밀번호 필요" }, { status: 400 });
  }

  const role = authenticate(password);
  if (!role) {
    return NextResponse.json({ error: "인증 실패" }, { status: 401 });
  }

  const token = await createSession(role);
  const cookie = sessionCookieOptions(token);

  const response = NextResponse.json({ success: true, role });
  response.cookies.set(cookie);
  return response;
}
