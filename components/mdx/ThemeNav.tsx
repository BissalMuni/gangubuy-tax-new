'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ThemeItem {
  label: string;
  href: string;
}

interface ThemeNavProps {
  themes: ThemeItem[];
}

export function ThemeNav({ themes }: ThemeNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mb-6">
      <div className="grid grid-cols-5 gap-2">
        {themes.map((theme) => {
          const isActive = pathname === theme.href;
          return (
            <Link
              key={theme.href}
              href={theme.href}
              className={`px-3 py-2 rounded-lg text-sm transition-all no-underline text-center ${
                isActive
                  ? 'border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 font-semibold'
                  : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-normal hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {theme.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
