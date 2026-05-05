import { getSessionFromCookies } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { ROLE_LABELS } from "@/lib/auth/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
              ← 홈으로
            </a>
            <AdminNav role={session.role} />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {ROLE_LABELS[session.role]}
          </span>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
