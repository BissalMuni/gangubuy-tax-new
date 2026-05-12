"use client";

import { useState } from "react";
import type { Book } from "@/book/types";
import type { Basket } from "@/basket/types";
import { BasketManager } from "./basket-manager";
import { BookManager } from "./book-manager";

type TabKey = "books" | "baskets";

interface Props {
  books: Book[];
  baskets: Basket[];
}

export function StructurePageTabs({ books, baskets }: Props) {
  const [tab, setTab] = useState<TabKey>("books");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "books", label: "책 관리" },
    { key: "baskets", label: "바구니 관리" },
  ];

  return (
    <div className="space-y-6">
      {/* 탭 바 */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 패널 */}
      {tab === "books" && <BookManager books={books} />}
      {tab === "baskets" && <BasketManager books={books} baskets={baskets} />}
    </div>
  );
}
