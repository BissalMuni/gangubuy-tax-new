import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { AdminChangesClient } from "@/components/admin/admin-changes-client";

export default async function AdminChangesPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  // admin 이상만 (view_audit 권한)
  if (!hasPermission(session.role, "view_audit")) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">수정 이력</h1>
        <p className="mt-1 text-sm text-gray-500">
          GitHub main 브랜치의 커밋 이력을 조회합니다. 콘텐츠·책 트리·바구니
          등 범위로 필터링할 수 있습니다.
        </p>
      </div>

      <AdminChangesClient />
    </div>
  );
}
