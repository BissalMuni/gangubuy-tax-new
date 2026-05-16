"use client";

import { useState } from "react";
import type { CalendarEvent, RecurrenceType } from "@/lib/types";
import { COLOR_OPTIONS } from "./admin-calendar-client";

interface Props {
  event: CalendarEvent | null; // null = 신규
  defaultDate: string;
  onClose: (saved?: boolean) => void;
}

const RECURRENCE_OPTIONS: { value: RecurrenceType; label: string }[] = [
  { value: "none", label: "반복 없음" },
  { value: "weekly", label: "매주" },
  { value: "monthly", label: "매월" },
  { value: "yearly", label: "매년" },
];

export function EventFormModal({ event, defaultDate, onClose }: Props) {
  const isEdit = !!event;

  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startDate, setStartDate] = useState(
    event?.start_date
      ? event.start_date.substring(0, 16)
      : defaultDate
        ? `${defaultDate}T09:00`
        : "",
  );
  const [endDate, setEndDate] = useState(
    event?.end_date ? event.end_date.substring(0, 16) : "",
  );
  const [allDay, setAllDay] = useState(event?.all_day ?? true);
  const [recurrence, setRecurrence] = useState<RecurrenceType>(event?.recurrence || "none");
  const [color, setColor] = useState(event?.color || "#3b82f6");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !startDate) {
      setError("제목과 날짜는 필수입니다");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      start_date: new Date(startDate).toISOString(),
      end_date: endDate ? new Date(endDate).toISOString() : null,
      all_day: allDay,
      recurrence,
      color,
    };

    try {
      const url = isEdit
        ? `/api/admin/calendar/${event.id}`
        : "/api/admin/calendar";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "저장 실패");
        return;
      }
      onClose(true);
    } catch {
      setError("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !confirm("이 일정을 삭제하시겠습니까?")) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/calendar/${event.id}`, { method: "DELETE" });
      onClose(true);
    } catch {
      setError("삭제 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">
          {isEdit ? "일정 수정" : "새 일정"}
        </h2>

        <div className="space-y-3">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            autoFocus
          />

          {/* 설명 */}
          <textarea
            placeholder="설명 (선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          />

          {/* 종일 여부 */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="rounded"
            />
            종일
          </label>

          {/* 시작/종료 날짜 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs text-gray-500">시작</label>
              <input
                type={allDay ? "date" : "datetime-local"}
                value={allDay ? startDate.substring(0, 10) : startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">종료</label>
              <input
                type={allDay ? "date" : "datetime-local"}
                value={allDay ? endDate.substring(0, 10) : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* 반복 */}
          <div>
            <label className="mb-1 block text-xs text-gray-500">반복</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            >
              {RECURRENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 색상 */}
          <div>
            <label className="mb-1 block text-xs text-gray-500">색상</label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={`h-6 w-6 rounded-full border-2 transition-transform ${
                    color === opt.value
                      ? "scale-125 border-gray-800 dark:border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.label}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* 버튼 */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                삭제
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !title.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "저장 중..." : isEdit ? "수정" : "등록"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
