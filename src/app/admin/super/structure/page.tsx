import { getSessionFromCookies } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SuperAdminStructurePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  // superadmin 전용
  if (session.role !== "superadmin") {
    redirect("/admin");
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">구조 편집</h1>
        <p className="mt-1 text-sm text-gray-500">
          트리 구조를 직접 편집합니다. superadmin 전용.
        </p>
      </div>

      <div className="text-sm text-gray-500">
        구조 편집 기능 준비 중...
      </div>
    </div>
  );
}
