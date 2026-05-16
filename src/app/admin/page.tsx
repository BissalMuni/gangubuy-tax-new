import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  const { role } = session;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* subadmin 이상: 책/바구니 관리 */}
        {hasPermission(role, "edit_structure") && (
          <Link
            href="/admin/structure"
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <h2 className="font-semibold">책/바구니 관리</h2>
            <p className="text-sm text-gray-500">권한 있는 책 목차와 바구니 편집</p>
          </Link>
        )}

        {/* admin 이상: 수정 이력 */}
        {hasPermission(role, "view_audit") && (
          <Link
            href="/admin/changes"
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <h2 className="font-semibold">수정 이력</h2>
            <p className="text-sm text-gray-500">콘텐츠 변경 이력 조회</p>
          </Link>
        )}

        {/* admin 이상: 첨부파일 관리 */}
        {hasPermission(role, "view_audit") && (
          <Link
            href="/admin/attachments"
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <h2 className="font-semibold">첨부파일 관리</h2>
            <p className="text-sm text-gray-500">전체 첨부 조회·필터·미리보기·삭제</p>
          </Link>
        )}

        {/* subadmin 이상: 일정 관리 */}
        {hasPermission(role, "edit_structure") && (
          <Link
            href="/admin/calendar"
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <h2 className="font-semibold">일정 관리</h2>
            <p className="text-sm text-gray-500">세무 일정 등록·캘린더·당일 알림</p>
          </Link>
        )}
      </div>
    </div>
  );
}
