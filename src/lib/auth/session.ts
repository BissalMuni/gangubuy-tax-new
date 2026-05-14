import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { type Role, ROLES } from "./constants";

/** 쿠키에서 Supabase 세션 읽기 (Server Component / Route Handler 용) */
export async function getSessionFromCookies(): Promise<{
  role: Role;
} | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Custom JWT Hook이 주입한 user_role 클레임에서 역할 읽기
  const role = (user.app_metadata?.user_role ?? "reader") as Role;
  if (!ROLES.includes(role)) return null;

  return { role };
}
