"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CommitSummary } from "@/lib/admin/github";

const PER_PAGE = 30;

const SCOPE_OPTIONS: { label: string; value: string }[] = [
  { label: "전체", value: "" },
  { label: "콘텐츠 (src/content)", value: "src/content" },
  { label: "책 트리 (src/book/data)", value: "src/book/data" },
  { label: "바구니 (src/basket)", value: "src/basket" },
  { label: "직접 입력", value: "__custom__" },
];

interface ApiResponse {
  repo: string;
  page: number;
  perPage: number;
  commits: CommitSummary[];
}

function shortSha(sha: string): string {
  return sha.slice(0, 7);
}

function firstLine(message: string): string {
  const idx = message.indexOf("\n");
  return idx === -1 ? message : message.slice(0, idx);
}

function bodyAfterFirstLine(message: string): string | null {
  const idx = message.indexOf("\n");
  if (idx === -1) return null;
  const rest = message.slice(idx + 1).trim();
  return rest.length > 0 ? rest : null;
}

export function AdminChangesClient() {
  const [scope, setScope] = useState<string>("");
  const [customPath, setCustomPath] = useState<string>("");
  const [appliedPath, setAppliedPath] = useState<string>("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (appliedPath) params.set("path", appliedPath);
      params.set("page", String(page));
      params.set("per_page", String(PER_PAGE));

      const res = await fetch(`/api/admin/changes?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `조회 실패 (${res.status})`);
      }
      const json = (await res.json()) as ApiResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "조회 실패");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [appliedPath, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApply = () => {
    const next = scope === "__custom__" ? customPath.trim() : scope;
    setAppliedPath(next);
    setPage(1);
  };

  const handleReset = () => {
    setScope("");
    setCustomPath("");
    setAppliedPath("");
    setPage(1);
  };

  const commits = data?.commits ?? [];
  const repo = data?.repo;
  const hasNext = commits.length === PER_PAGE;

  const scopeChip = useMemo(() => {
    if (!appliedPath) return null;
    return appliedPath;
  }, [appliedPath]);

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
            범위
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
            >
              {SCOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          {scope === "__custom__" && (
            <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
              경로 (저장소 기준)
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
                placeholder="예: src/content/acquisition"
                className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-900"
              />
            </label>
          )}
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
          {scopeChip && (
            <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              경로: {scopeChip}
            </span>
          )}
          {repo && (
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              저장소:{" "}
              <a
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {repo}
              </a>
            </span>
          )}
        </div>
      </div>

      {/* 결과 메타 + 페이지네이션 */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          {loading
            ? "조회 중..."
            : `${commits.length}건${appliedPath ? ` (경로: ${appliedPath})` : ""}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-gray-600"
          >
            이전
          </button>
          <span className="text-xs">{page} 페이지</span>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext || loading}
            className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-gray-600"
          >
            다음
          </button>
        </div>
      </div>

      {/* 커밋 리스트 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {error && (
          <div className="px-4 py-6 text-center text-red-500">{error}</div>
        )}
        {!error && !loading && commits.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-400">
            커밋이 없습니다
          </div>
        )}
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {commits.map((c) => {
            const body = bodyAfterFirstLine(c.message);
            return (
              <li
                key={c.sha}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/40"
              >
                <div className="flex items-start gap-3">
                  {c.authorAvatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.authorAvatarUrl}
                      alt={c.authorLogin ?? c.authorName}
                      className="mt-0.5 h-8 w-8 rounded-full"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <a
                        href={c.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:underline dark:text-gray-100"
                      >
                        {firstLine(c.message)}
                      </a>
                      <a
                        href={c.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        {shortSha(c.sha)}
                      </a>
                    </div>
                    {body && (
                      <pre className="mt-1 whitespace-pre-wrap break-words text-xs text-gray-500 dark:text-gray-400">
                        {body}
                      </pre>
                    )}
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{c.authorLogin ?? c.authorName}</span>
                      <span className="mx-1.5">·</span>
                      <span>
                        {c.date
                          ? new Date(c.date).toLocaleString("ko-KR")
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
