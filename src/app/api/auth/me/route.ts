import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { ROLE_LABELS, ROLE_PERMISSIONS, ROLES, type Role } from "@/lib/auth/constants";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
  }

  const payload = JSON.parse(atob(session.access_token.split(".")[1]));
  const role = (payload.user_role ?? session.user.app_metadata?.user_role ?? "reader") as Role;
  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: "유효하지 않은 역할" }, { status: 403 });
  }

  return NextResponse.json({
    role,
    label: ROLE_LABELS[role],
    permissions: ROLE_PERMISSIONS[role],
    email: session.user.email,
  });
}
