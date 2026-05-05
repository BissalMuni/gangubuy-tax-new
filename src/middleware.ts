import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLES, hasPermission, type Role } from "@/lib/auth/constants";

const COOKIE_NAME = "tax_session";

/** JWT 서명 키 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** 경로별 최소 권한 매핑 */
const ROUTE_PERMISSIONS: { path: string; permission: string; role?: Role }[] = [
  // superadmin 전용 — 구조 편집 (바구니/책 생성 등)
  { path: "/admin/super", role: "superadmin", permission: "manage_books" },
  { path: "/api/admin/baskets", permission: "edit_structure" },
  // admin 이상 — 이력 조회, 롤백
  { path: "/api/admin/rollback", permission: "rollback" },
  // subadmin 이상 — 책/바구니 관리
  { path: "/admin/structure", permission: "edit_structure" },
  { path: "/api/admin/structure", permission: "edit_structure" },
];

/** 경로에 필요한 최소 역할/권한 확인 */
function checkRouteAccess(pathname: string, role: Role): boolean {
  for (const route of ROUTE_PERMISSIONS) {
    if (pathname.startsWith(route.path)) {
      // 특정 역할 제한이 있으면 역할 확인
      if (route.role && role !== route.role) return false;
      // 권한 확인
      return hasPermission(role, route.permission);
    }
  }
  // 기본 admin 경로는 editor 이상이면 접근 가능
  return ROLES.indexOf(role) >= ROLES.indexOf("editor");
}

/** 요청 헤더에 x-user-role 을 주입한 NextResponse 반환 */
function passWithRole(request: NextRequest, role: Role | null) {
  const requestHeaders = new Headers(request.headers);
  // 외부 위조 방지: 클라이언트가 보낸 x-user-role 은 무조건 제거
  requestHeaders.delete("x-user-role");
  if (role) requestHeaders.set("x-user-role", role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 경로가 아닌 경우 통과
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return passWithRole(request, null);
  }

  // JWT 세션 확인
  const secret = getSecret();
  if (!secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as Role;

    if (!ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 경로별 권한 체크
    if (!checkRouteAccess(pathname, role)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return passWithRole(request, role);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
