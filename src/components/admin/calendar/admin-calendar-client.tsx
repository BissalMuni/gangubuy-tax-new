"use client";

import { useState, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventClickArg, DatesSetArg, DateSelectArg } from "@fullcalendar/core";
import type { CalendarEvent, RecurrenceType } from "@/lib/types";
import { EventFormModal } from "./event-form-modal";

// FullCalendar 이벤트 형식으로 변환
function toFcEvent(e: CalendarEvent) {
  return {
    id: e.id,
    title: e.title,
    start: e.start_date,
    end: e.end_date || undefined,
    allDay: e.all_day,
    color: e.completed ? "#9ca3af" : e.color,
    textColor: e.completed ? "#6b7280" : undefined,
    classNames: e.completed ? ["line-through", "opacity-60"] : [],
    extendedProps: { ...e },
  };
}

const COLOR_OPTIONS = [
  { value: "#3b82f6", label: "파랑" },
  { value: "#ef4444", label: "빨강" },
  { value: "#22c55e", label: "초록" },
  { value: "#f59e0b", label: "노랑" },
  { value: "#8b5cf6", label: "보라" },
  { value: "#ec4899", label: "분홍" },
  { value: "#6b7280", label: "회색" },
];

export { COLOR_OPTIONS };

export function AdminCalendarClient() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState<string>("");

  // 현재 보이는 기간 저장 (재조회용)
  const currentRange = useRef<{ start: string; end: string } | null>(null);

  const fetchEvents = useCallback(async (start: string, end: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/calendar?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
      );
      const json = await res.json();
      setEvents(json.data || []);
    } catch {
      // 무시
    } finally {
      setLoading(false);
    }
  }, []);

  // FullCalendar 날짜 범위 변경 시
  const handleDatesSet = useCallback(
    (arg: DatesSetArg) => {
      const start = arg.startStr;
      const end = arg.endStr;
      currentRange.current = { start, end };
      fetchEvents(start, end);
    },
    [fetchEvents],
  );

  // 날짜 선택 (빈 영역 클릭/드래그)
  const handleDateSelect = useCallback((arg: DateSelectArg) => {
    setEditingEvent(null);
    setDefaultDate(arg.startStr);
    setModalOpen(true);
  }, []);

  // 이벤트 클릭
  const handleEventClick = useCallback((arg: EventClickArg) => {
    const ev = arg.event.extendedProps as CalendarEvent;
    setEditingEvent(ev);
    setDefaultDate("");
    setModalOpen(true);
  }, []);

  // 모달 닫기 후 재조회
  const handleModalClose = useCallback(
    (saved?: boolean) => {
      setModalOpen(false);
      setEditingEvent(null);
      if (saved && currentRange.current) {
        fetchEvents(currentRange.current.start, currentRange.current.end);
      }
    },
    [fetchEvents],
  );

  // 완료 토글
  const handleToggleComplete = useCallback(
    async (id: string, completed: boolean) => {
      await fetch(`/api/admin/calendar/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (currentRange.current) {
        fetchEvents(currentRange.current.start, currentRange.current.end);
      }
    },
    [fetchEvents],
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">일정 관리</h1>
        <button
          type="button"
          onClick={() => {
            setEditingEvent(null);
            setDefaultDate(new Date().toISOString().split("T")[0]);
            setModalOpen(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + 새 일정
        </button>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">불러오는 중...</div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 [&_.fc-toolbar-title]:text-lg [&_.fc-toolbar-title]:font-semibold [&_.fc-button]:!rounded [&_.fc-button]:!text-sm [&_.fc-button-active]:!bg-blue-600 [&_.fc-today-button]:!bg-blue-500 [&_.fc-event]:!cursor-pointer [&_.fc-daygrid-event]:!rounded [&_.fc]:text-sm">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
          }}
          buttonText={{
            today: "오늘",
            month: "월",
            week: "주",
            day: "일",
            list: "일정",
          }}
          events={events.map(toFcEvent)}
          selectable
          selectMirror
          editable={false}
          datesSet={handleDatesSet}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="auto"
          dayMaxEvents={3}
          nowIndicator
          weekNumbers={false}
          firstDay={0}
        />
      </div>

      {/* 하단: 오늘 할일 리스트 */}
      <TodayTaskList
        events={events}
        onToggle={handleToggleComplete}
        onEdit={(ev) => {
          setEditingEvent(ev);
          setModalOpen(true);
        }}
      />

      {/* 이벤트 등록/수정 모달 */}
      {modalOpen && (
        <EventFormModal
          event={editingEvent}
          defaultDate={defaultDate}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

/** 오늘 할일 요약 */
function TodayTaskList({
  events,
  onToggle,
  onEdit,
}: {
  events: CalendarEvent[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (ev: CalendarEvent) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const todayEvents = events.filter((e) => e.start_date.startsWith(today));

  if (todayEvents.length === 0) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
      <h2 className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
        오늘 일정 ({todayEvents.length})
      </h2>
      <ul className="space-y-1">
        {todayEvents.map((ev) => (
          <li key={ev.id} className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => onToggle(ev.id, !ev.completed)}
              className={`h-4 w-4 shrink-0 rounded border ${
                ev.completed
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-400"
              } flex items-center justify-center text-xs`}
            >
              {ev.completed && "✓"}
            </button>
            <button
              type="button"
              onClick={() => onEdit(ev)}
              className={`text-left hover:underline ${
                ev.completed ? "text-gray-400 line-through" : ""
              }`}
            >
              {ev.title}
            </button>
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: ev.color }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
