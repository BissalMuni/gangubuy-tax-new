import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { AdminCalendarClient } from "@/components/admin/calendar/admin-calendar-client";

export default async function CalendarPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");
  if (!hasPermission(session.role, "edit_structure")) redirect("/admin");

  return <AdminCalendarClient />;
}
