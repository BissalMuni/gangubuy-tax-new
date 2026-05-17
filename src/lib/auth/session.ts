import { createSupabaseServerClient } from "@/lib/supabase/server-auth";
import { type Role, ROLES } from "./constants";

/** 쿠키에서 Supabase 세션 읽기 (Server Component / Route Handler 용) */
export async function getSessionFromCookies(): Promise<{
  role: Role;
} | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  // Custom JWT Hook이 주입한 user_role 클레임에서 역할 읽기
  // access_token을 디코딩하여 최상위 claims에서 user_role 추출
  const payload = JSON.parse(atob(session.access_token.split(".")[1]));
  const role = (payload.user_role ?? session.user.app_metadata?.user_role ?? "reader") as Role;
  if (!ROLES.includes(role)) return null;

  return { role };
}
