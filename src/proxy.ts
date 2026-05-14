import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLES, hasPermission, type Role } from "@/lib/auth/constants";

/** 경로별 최소 권한 매핑 */
const ROUTE_PERMISSIONS: { path: string; permission: string; role?: Role }[] = [
  { path: "/api/admin/rollback", permission: "rollback" },
  { path: "/admin/structure", permission: "edit_structure" },
  { path: "/api/admin/structure", permission: "edit_structure" },
  { path: "/api/admin/baskets", permission: "edit_structure" },
  { path: "/api/admin/books", permission: "edit_structure" },
];

/** 경로에 필요한 최소 역할/권한 확인 */
function checkRouteAccess(pathname: string, role: Role): boolean {
  for (const route of ROUTE_PERMISSIONS) {
    if (pathname.startsWith(route.path)) {
      if (route.role && role !== route.role) return false;
      return hasPermission(role, route.permission);
    }
  }
  // 기본 admin 경로는 editor 이상이면 접근 가능
  return ROLES.indexOf(role) >= ROLES.indexOf("editor");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminGuarded =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  // Supabase 세션 리프레시 + 사용자 정보 읽기
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          // 요청 쿠키에도 반영 (다운스트림에서 읽을 수 있도록)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          // 응답 쿠키에 반영 (브라우저에 전달)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // JWT custom claim에서 역할 추출
  let role: Role | null = null;
  if (user) {
    const r = (user.app_metadata?.user_role ?? "reader") as Role;
    if (ROLES.includes(r)) role = r;
  }

  // x-user-role 헤더 주입 (외부 위조 방지)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-user-role");
  if (role) requestHeaders.set("x-user-role", role);

  // admin 경로 보호
  if (isAdminGuarded) {
    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!checkRouteAccess(pathname, role)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 헤더가 주입된 새 response 생성
  response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // 세션 리프레시로 설정된 쿠키 유지
  const supabaseCookies = request.cookies.getAll();
  for (const cookie of supabaseCookies) {
    if (cookie.name.startsWith("sb-")) {
      response.cookies.set(cookie.name, cookie.value);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/comments/:path*",
    "/api/attachments/:path*",
  ],
};
