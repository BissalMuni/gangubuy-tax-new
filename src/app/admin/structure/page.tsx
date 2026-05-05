import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { StructurePageTabs } from "@/components/admin/structure-page-tabs";
import { allBooks } from "@/lib/book";
import { allBaskets } from "@/lib/basket";

export default async function AdminStructurePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  // subadmin 이상 (edit_structure 권한)
  if (!hasPermission(session.role, "edit_structure")) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">책/바구니 관리</h1>
        <p className="mt-1 text-sm text-gray-500">
          책과 바구니를 관리합니다. 저장 시 GitHub main 브랜치에 커밋됩니다.
        </p>
      </div>

      <StructurePageTabs books={allBooks} baskets={allBaskets} />
    </div>
  );
}
