import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePermission } from "@/lib/auth/require-role";
import { ROLES, type Role } from "@/lib/auth/constants";

/** 사용자 역할 변경 — admin 이상만 가능 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // view_audit 권한이 있는 admin 이상만 역할 변경 가능
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const newRole = body.role as Role;

  if (!newRole || !ROLES.includes(newRole)) {
    return NextResponse.json(
      { error: "유효하지 않은 역할" },
      { status: 400 }
    );
  }

  // service role 키로 직접 프로필 업데이트
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, role: newRole });
}
