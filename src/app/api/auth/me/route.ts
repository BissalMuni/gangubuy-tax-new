import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { ROLE_LABELS, ROLE_PERMISSIONS, ROLES, type Role } from "@/lib/auth/constants";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
  }

  const role = (user.app_metadata?.user_role ?? "reader") as Role;
  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: "유효하지 않은 역할" }, { status: 403 });
  }

  return NextResponse.json({
    role,
    label: ROLE_LABELS[role],
    permissions: ROLE_PERMISSIONS[role],
    email: user.email,
  });
}
