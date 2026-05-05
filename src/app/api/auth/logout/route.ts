import { NextResponse } from "next/server";
import { sessionCookieDeleteOptions } from "@/lib/auth/session";

export async function POST() {
  const cookie = sessionCookieDeleteOptions();
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie);
  return response;
}
