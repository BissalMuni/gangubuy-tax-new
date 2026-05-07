"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Attachment } from "@/lib/types";

interface Filters {
  contentPath: string;
  uploadedBy: string;
  mimeType: string;
  fileName: string;
}

const PAGE_SIZE = 50;

const MIME_OPTIONS: { label: string; value: string }[] = [
  { label: "전체", value: "" },
  { label: "PDF", value: "application/pdf" },
  { label: "이미지", value: "image" },
  { label: "Excel", value: "application/vnd" },
  { label: "Word", value: "application/msword" },
  { label: "한글", value: "application/haansofthwp" },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mime: string): boolean {
  return mime.startsWith("image/");
}

function isPdf(mime: string): boolean {
  return mime === "application/pdf";
}

export function AdminAttachmentsClient() {
  const [filters, setFilters] = useState<Filters>({
    contentPath: "",
    uploadedBy: "",
    mimeType: "",
    fileName: "",
  });
  // 적용된 필터 (디바운스/검색 버튼 후 반영)
  const [applied, setApplied] = useState<Filters>(filters);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<Attachment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Attachment | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (applied.contentPath) params.set("content_path", applied.contentPath);
      if (applied.uploadedBy) params.set("uploaded_by", applied.uploadedBy);
      if (applied.mimeType) params.set("mime_type", applied.mimeType);
      if (applied.fileName) params.set("file_name", applied.fileName);
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(page * PAGE_SIZE));

      const res = await fetch(`/api/admin/attachments?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `조회 실패 (${res.status})`);
      }
      const json = (await res.json()) as { rows: Attachment[]; total: number };
      setRows(json.rows);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "조회 실패");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [applied, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApply = () => {
    setPage(0);
    setApplied(filters);
  };

  const handleReset = () => {
    const empty = { contentPath: "", uploadedBy: "", mimeType: "", fileName: "" };
    setFilters(empty);
    setApplied(empty);
    setPage(0);
  };

  const handleDelete = async (att: Attachment) => {
    if (!window.confirm(`"${att.file_name}" 파일을 삭제하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/attachments/${att.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setToast({ type: "error", text: body?.error ?? "삭제 실패" });
        return;
      }
      setToast({ type: "success", text: "삭제되었습니다." });
      // 현재 페이지 갱신
      fetchData();
    } catch {
      setToast({ type: "error", text: "삭제 실패" });
    }
  };

  const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);
  const fromCount = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const toCount = Math.min(total, (page + 1) * PAGE_SIZE);

  const filterChips = useMemo(() => {
    const items: { key: keyof Filters; label: string }[] = [];
    if (applied.contentPath) items.push({ key: "contentPath", label: `경로: ${applied.contentPath}` });
    if (applied.uploadedBy) items.push({ key: "uploadedBy", label: `업로더: ${applied.uploadedBy}` });
    if (applied.mimeType) items.push({ key: "mimeType", label: `타입: ${applied.mimeType}` });
    if (applied.fileName) items.push({ key: "fileName", label: `파일명: ${applied.fileName}` });
    return items;
  }, [applied]);

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
            경로 (content_path)
            <input
              type="text"
              value={filters.contentPath}
              onChange={(e) => setFilters((f) => ({ ...f, contentPath: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="/acquisition/..."
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
            파일명
            <input
              type="text"
              value={filters.fileName}
              onChange={(e) => setFilters((f) => ({ ...f, fileName: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="포함 단어"
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
            업로더
            <input
              type="text"
              value={filters.uploadedBy}
              onChange={(e) => setFilters((f) => ({ ...f, uploadedBy: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="예: 편집자"
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
            파일 종류
            <select
              value={filters.mimeType}
              onChange={(e) => setFilters((f) => ({ ...f, mimeType: e.target.value }))}
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
            >
              {MIME_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            필터 적용
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            초기화
          </button>
          {filterChips.length > 0 && (
            <div className="ml-2 flex flex-wrap gap-1">
              {filterChips.map((c) => (
                <span
                  key={c.key}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {c.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 결과 메타 */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          {loading ? "조회 중..." : `${total}건 중 ${fromCount}–${toCount}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading}
            className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-gray-600"
          >
            이전
          </button>
          <span className="text-xs">
            {page + 1} / {lastPage + 1}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={page >= lastPage || loading}
            className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-gray-600"
          >
            다음
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500 dark:bg-gray-700/50 dark:text-gray-400">
            <tr>
              <th className="px-3 py-2">파일</th>
              <th className="px-3 py-2">경로</th>
              <th className="px-3 py-2">크기</th>
              <th className="px-3 py-2">유형</th>
              <th className="px-3 py-2">업로더</th>
              <th className="px-3 py-2">업로드일</th>
              <th className="px-3 py-2 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {error && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!error && !loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-gray-400">
                  조회된 첨부파일이 없습니다
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">
                  <span className="break-all">{row.file_name}</span>
                </td>
                <td className="px-3 py-2">
                  <a
                    href={row.content_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {row.content_path}
                  </a>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {formatFileSize(row.file_size)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                  {row.mime_type.split("/").pop()}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {row.uploaded_by}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                  {new Date(row.created_at).toLocaleString("ko-KR")}
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-1">
                    {row.download_url && (isImage(row.mime_type) || isPdf(row.mime_type)) && (
                      <button
                        type="button"
                        onClick={() => setPreview(row)}
                        className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        바로 보기
                      </button>
                    )}
                    {row.download_url && (
                      <a
                        href={row.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        다운로드
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(row)}
                      className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 미리보기 모달 */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              <div className="min-w-0">
                <div className="truncate font-medium">{preview.file_name}</div>
                <div className="truncate text-xs text-gray-500">{preview.content_path}</div>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
              {isImage(preview.mime_type) && preview.download_url && (
                <img
                  src={preview.download_url}
                  alt={preview.file_name}
                  className="mx-auto max-h-[80vh] object-contain"
                />
              )}
              {isPdf(preview.mime_type) && preview.download_url && (
                <iframe
                  src={preview.download_url}
                  title={preview.file_name}
                  className="h-[80vh] w-full"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
