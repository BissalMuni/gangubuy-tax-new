"use client";

import { useState, useEffect } from "react";
import type { CalendarEvent } from "@/lib/types";

/**
 * 오늘 일정 팝업 알림.
 * 레이아웃이나 메인 페이지에 삽입하면 로그인 시 오늘 일정을 팝업으로 보여준다.
 * 세션당 한 번만 표시 (sessionStorage).
 */
export function TodayEventsPopup() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 세션당 한 번만 표시
    const key = `calendar-popup-${new Date().toISOString().split("T")[0]}`;
    if (sessionStorage.getItem(key)) return;

    (async () => {
      try {
        const res = await fetch("/api/calendar/today");
        if (!res.ok) return;
        const json = await res.json();
        const items: CalendarEvent[] = json.data || [];
        if (items.length > 0) {
          setEvents(items);
          setVisible(true);
          sessionStorage.setItem(key, "1");
        }
      } catch {
        // 무시 — 비로그인 사용자 등
      }
    })();
  }, []);

  if (!visible || events.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 animate-[slideUp_0.3s_ease-out] rounded-xl border border-blue-200 bg-white p-4 shadow-2xl dark:border-blue-800 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">
          📅 오늘 일정 ({events.length})
        </h3>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      <ul className="max-h-48 space-y-1 overflow-y-auto">
        {events.map((ev) => (
          <li key={ev.id} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: ev.color }}
            />
            <span className="flex-1 truncate">{ev.title}</span>
            {!ev.all_day && (
              <span className="shrink-0 text-xs text-gray-400">
                {new Date(ev.start_date).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
