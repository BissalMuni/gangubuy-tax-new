"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/auth/constants";

interface NavItem {
  href: string;
  label: string;
  /** 이 메뉴를 볼 수 있는 최소 역할 */
  minRole: Role;
}

const ROLE_ORDER: Role[] = ["reader", "editor", "subadmin", "admin", "superadmin"];

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "대시보드", minRole: "subadmin" },
  { href: "/admin/changes", label: "수정 이력", minRole: "admin" },
  { href: "/admin/structure", label: "책/바구니 관리", minRole: "subadmin" },
  { href: "/admin/attachments", label: "첨부파일 관리", minRole: "admin" },
  { href: "/admin/calendar", label: "일정 관리", minRole: "subadmin" },
];

function hasMinRole(role: Role, minRole: Role): boolean {
  return ROLE_ORDER.indexOf(role) >= ROLE_ORDER.indexOf(minRole);
}

interface Props {
  role: Role;
}

export function AdminNav({ role }: Props) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter((item) => hasMinRole(role, item.minRole));

  return (
    <nav className="flex gap-1">
      {visibleItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
