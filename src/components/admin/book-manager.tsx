"use client";

import { useState, useEffect } from "react";
import type { Book, TreeNode } from "@/book/types";

interface Props {
  books: Book[];
}

type Message = { type: "success" | "error"; text: string };

/** 책의 첫 루트 노드 id에서 prefix 추출 (예: "prop-vol1" → "prop"). 없으면 book.id 사용. */
function detectIdPrefix(book: Book): string {
  for (const n of book.children ?? []) {
    const m = n.id.match(/^([a-z0-9]+)-/);
    if (m) return m[1];
  }
  return book.id;
}

/** 경로 부모의 children 배열 반환 (불변 갱신용 새 배열). */
function mapChildrenAtParent(
  children: TreeNode[],
  parentPath: number[],
  fn: (siblings: TreeNode[]) => TreeNode[],
): TreeNode[] {
  if (parentPath.length === 0) return fn(children);
  const [head, ...rest] = parentPath;
  return children.map((n, i) => {
    if (i !== head) return n;
    const next = mapChildrenAtParent(n.children ?? [], rest, fn);
    return { ...n, children: next };
  });
}

/** path 위치의 노드를 갱신. */
function updateNodeAt(
  children: TreeNode[],
  path: number[],
  updater: (n: TreeNode) => TreeNode,
): TreeNode[] {
  if (path.length === 0) return children;
  const parentPath = path.slice(0, -1);
  const idx = path[path.length - 1];
  return mapChildrenAtParent(children, parentPath, (sibs) =>
    sibs.map((n, i) => (i === idx ? updater(n) : n)),
  );
}

/** path 위치의 노드 삭제. */
function removeNodeAt(children: TreeNode[], path: number[]): TreeNode[] {
  if (path.length === 0) return children;
  const parentPath = path.slice(0, -1);
  const idx = path[path.length - 1];
  return mapChildrenAtParent(children, parentPath, (sibs) =>
    sibs.filter((_, i) => i !== idx),
  );
}

/** path 위치의 노드를 형제 내에서 이동 (-1 위, +1 아래). 범위 벗어나면 변경 없음. */
function moveNodeAt(
  children: TreeNode[],
  path: number[],
  delta: -1 | 1,
): TreeNode[] {
  if (path.length === 0) return children;
  const parentPath = path.slice(0, -1);
  const idx = path[path.length - 1];
  return mapChildrenAtParent(children, parentPath, (sibs) => {
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= sibs.length) return sibs;
    const next = sibs.slice();
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    return next;
  });
}

/** parentPath 위치 노드의 children 끝에 새 노드 추가. parentPath = [] 이면 루트 추가. */
function addChildAt(
  children: TreeNode[],
  parentPath: number[],
  newNode: TreeNode,
): TreeNode[] {
  return mapChildrenAtParent(children, parentPath, (sibs) => [...sibs, newNode]);
}

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function BookManager({ books }: Props) {
  const [activeId, setActiveId] = useState(books[0]?.id ?? "");
  const [bookStates, setBookStates] = useState<Record<string, Book>>(() =>
    Object.fromEntries(books.map((b) => [b.id, JSON.parse(JSON.stringify(b))])),
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const original = books.find((b) => b.id === activeId);
  const current = bookStates[activeId];

  if (!current || !original) {
    return <div className="text-sm text-gray-500">책이 없습니다.</div>;
  }

  const hasChanges = JSON.stringify(current) !== JSON.stringify(original);
  const idPrefix = detectIdPrefix(current);

  const applyChildrenUpdate = (
    fn: (children: TreeNode[]) => TreeNode[],
  ) => {
    setBookStates((prev) => ({
      ...prev,
      [activeId]: { ...prev[activeId], children: fn(prev[activeId].children ?? []) },
    }));
    setMessage(null);
  };

  const handleSwitch = (id: string) => {
    setActiveId(id);
    setMessage(null);
  };

  const handleDiscard = () => {
    setBookStates((prev) => ({
      ...prev,
      [activeId]: JSON.parse(JSON.stringify(original)),
    }));
    setMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/books/${activeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book: current }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "저장 실패" });
        return;
      }
      setMessage({
        type: "success",
        text: `책 트리 저장 완료 (commit: ${data.commit?.slice(0, 7)}). 배포 후 반영됩니다.`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "네트워크 오류",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 책 선택 */}
      <div className="flex flex-wrap gap-2">
        {books.map((b) => (
          <button
            key={b.id}
            onClick={() => handleSwitch(b.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              b.id === activeId
                ? "bg-blue-600 text-white"
                : "bg-gray-100 border border-gray-300 text-gray-600 hover:text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {b.title}
          </button>
        ))}
      </div>

      {/* 책 헤더 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-semibold">{current.title}</h3>
          <span className="text-xs text-gray-500 font-mono">
            id: {current.id} · basePath: /{current.basePath}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{current.description}</p>
      </div>

      {/* 트리 */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {(current.children?.length ?? 0) === 0 ? (
          <div className="p-4 text-sm text-gray-500">루트 노드가 없습니다.</div>
        ) : (
          <ul className="p-2">
            {current.children!.map((node, i) => (
              <NodeRow
                key={node.id}
                node={node}
                path={[i]}
                depth={1}
                isFirst={i === 0}
                isLast={i === current.children!.length - 1}
                bookId={current.basePath}
                slugPath={[node.slug]}
                onUpdate={(p, updater) =>
                  applyChildrenUpdate((ch) => updateNodeAt(ch, p, updater))
                }
                onDelete={(p) =>
                  applyChildrenUpdate((ch) => removeNodeAt(ch, p))
                }
                onMove={(p, d) =>
                  applyChildrenUpdate((ch) => moveNodeAt(ch, p, d))
                }
                onAddChild={(p, newNode) =>
                  applyChildrenUpdate((ch) => addChildAt(ch, p, newNode))
                }
              />
            ))}
          </ul>
        )}
        <AddRootButton
          parentId={idPrefix}
          existingSlugs={new Set((current.children ?? []).map((n) => n.slug))}
          onAdd={(newNode) =>
            applyChildrenUpdate((ch) => [...ch, newNode])
          }
        />
      </div>

      {/* 메시지 */}
      {message && (
        <div
          className={`rounded px-4 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 저장 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`rounded px-6 py-2 text-sm font-medium text-white ${
            hasChanges && !saving
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          {saving ? "저장 중..." : "GitHub에 저장"}
        </button>
        {hasChanges && (
          <>
            <button
              onClick={handleDiscard}
              disabled={saving}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              변경 취소
            </button>
            <span className="text-xs text-amber-500">변경사항이 있습니다</span>
          </>
        )}
      </div>
    </div>
  );
}

interface NodeRowProps {
  node: TreeNode;
  path: number[];
  depth: number;
  isFirst: boolean;
  isLast: boolean;
  bookId: string;
  slugPath: string[];
  onUpdate: (path: number[], updater: (n: TreeNode) => TreeNode) => void;
  onDelete: (path: number[]) => void;
  onMove: (path: number[], delta: -1 | 1) => void;
  onAddChild: (path: number[], child: TreeNode) => void;
}

function NodeRow({
  node,
  path,
  depth,
  isFirst,
  isLast,
  bookId,
  slugPath,
  onUpdate,
  onDelete,
  onMove,
  onAddChild,
}: NodeRowProps) {
  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(node.title);
  const [adding, setAdding] = useState(false);
  const [editingContent, setEditingContent] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isLeaf = !hasChildren;

  const commitTitle = () => {
    const t = titleDraft.trim();
    if (!t) {
      setTitleDraft(node.title);
      setEditing(false);
      return;
    }
    if (t !== node.title) onUpdate(path, (n) => ({ ...n, title: t }));
    setEditing(false);
  };

  const handleDelete = () => {
    const msg = hasChildren
      ? `"${node.title}" 노드에 자식 ${node.children!.length}개가 있습니다. 모두 삭제하시겠습니까?`
      : `"${node.title}" 노드를 삭제하시겠습니까?`;
    if (confirm(msg)) onDelete(path);
  };

  return (
    <li>
      <div
        className="group flex items-center gap-2 rounded py-1 hover:bg-gray-50 dark:hover:bg-gray-900/40"
        style={{ paddingLeft: `${(depth - 1) * 16 + 8}px` }}
      >
        <span className="text-xs text-gray-400 w-4">
          {hasChildren ? "▾" : "·"}
        </span>
        {editing ? (
          <input
            type="text"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitTitle();
              if (e.key === "Escape") {
                setTitleDraft(node.title);
                setEditing(false);
              }
            }}
            className="flex-1 rounded border border-blue-500 bg-white px-2 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex-1 text-left text-sm hover:underline"
          >
            {node.title}
          </button>
        )}
        <span className="text-xs text-gray-400 font-mono opacity-0 group-hover:opacity-100">
          {node.slug}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          {isLeaf && (
            <button
              onClick={() => setEditingContent((v) => !v)}
              title="내용 편집"
              className="rounded px-1.5 py-0.5 text-xs text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
            >
              📝
            </button>
          )}
          <button
            onClick={() => setAdding((v) => !v)}
            title="자식 추가"
            className="rounded px-1.5 py-0.5 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            +
          </button>
          <button
            onClick={() => onMove(path, -1)}
            disabled={isFirst}
            title="위로"
            className="rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-800"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(path, 1)}
            disabled={isLast}
            title="아래로"
            className="rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-800"
          >
            ↓
          </button>
          <button
            onClick={handleDelete}
            title="삭제"
            className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            ×
          </button>
        </div>
      </div>

      {adding && (
        <div style={{ paddingLeft: `${depth * 16 + 8}px` }}>
          <AddChildForm
            parentId={node.id}
            existingSlugs={new Set((node.children ?? []).map((n) => n.slug))}
            onCancel={() => setAdding(false)}
            onAdd={(child) => {
              onAddChild(path, child);
              setAdding(false);
            }}
          />
        </div>
      )}

      {editingContent && isLeaf && (
        <div style={{ paddingLeft: `${depth * 16 + 8}px` }}>
          <LeafContentEditor
            bookId={bookId}
            slugPath={slugPath}
            title={node.title}
            onClose={() => setEditingContent(false)}
          />
        </div>
      )}

      {hasChildren && (
        <ul>
          {node.children!.map((child, i) => (
            <NodeRow
              key={child.id}
              node={child}
              path={[...path, i]}
              depth={depth + 1}
              isFirst={i === 0}
              isLast={i === node.children!.length - 1}
              bookId={bookId}
              slugPath={[...slugPath, child.slug]}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
              onAddChild={onAddChild}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface AddChildFormProps {
  parentId: string;
  existingSlugs: Set<string>;
  onCancel: () => void;
  onAdd: (node: TreeNode) => void;
}

function AddChildForm({ parentId, existingSlugs, onCancel, onAdd }: AddChildFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const t = title.trim();
    const s = slug.trim();
    if (!t) return setError("title 필요");
    if (!s) return setError("slug 필요");
    if (!KEBAB.test(s)) return setError("slug는 kebab-case (a-z, 0-9, -)");
    if (existingSlugs.has(s)) return setError(`형제 slug 중복: ${s}`);
    onAdd({ id: `${parentId}-${s}`, slug: s, title: t });
  };

  return (
    <div className="my-1 flex flex-wrap items-center gap-2 rounded border border-blue-500 bg-blue-50/30 p-2 dark:bg-blue-900/10">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title (예: Ⅰ. 법조문 구성)"
        className="flex-1 min-w-[200px] rounded border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        autoFocus
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value.toLowerCase())}
        placeholder="slug (예: statute)"
        className="w-32 rounded border border-gray-300 bg-white px-2 py-1 text-xs font-mono dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
      />
      <span className="text-xs text-gray-400 font-mono">→ id: {parentId}-{slug || "?"}</span>
      <button onClick={submit} className="text-xs text-blue-600 hover:text-blue-500">
        추가
      </button>
      <button
        onClick={() => {
          setTitle("");
          setSlug("");
          setError(null);
          onCancel();
        }}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        취소
      </button>
      {error && <span className="w-full text-xs text-red-600">{error}</span>}
    </div>
  );
}

interface LeafContentEditorProps {
  bookId: string;
  slugPath: string[];
  title: string;
  onClose: () => void;
}

function LeafContentEditor({ bookId, slugPath, title, onClose }: LeafContentEditorProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const slugsJoined = slugPath.join("/");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = `/api/admin/content?book=${encodeURIComponent(
          bookId,
        )}&slugs=${encodeURIComponent(slugsJoined)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setMessage({ type: "error", text: data.error || "로드 실패" });
        } else {
          setText(data.text ?? "");
        }
      } catch (err) {
        if (cancelled) return;
        setMessage({
          type: "error",
          text: err instanceof Error ? err.message : "네트워크 오류",
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookId, slugsJoined]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book: bookId, slugs: slugPath.join("/"), text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "저장 실패" });
      } else {
        setMessage({
          type: "success",
          text: `저장 완료 (commit: ${data.commit?.slice(0, 7)})`,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "네트워크 오류",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-2 rounded border border-emerald-500 bg-emerald-50/30 p-3 dark:bg-emerald-900/10">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="font-medium">
          📝 {title}
          <span className="ml-2 font-mono text-gray-500">
            src/content/{bookId}/{slugPath.join("/")}.md
          </span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          닫기
        </button>
      </div>
      {loading ? (
        <p className="text-xs text-gray-500">불러오는 중...</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="내용을 입력하세요. 줄바꿈은 그대로 표시됩니다."
            className="w-full rounded border border-gray-300 bg-white p-2 text-sm font-mono dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`rounded px-3 py-1 text-xs font-medium text-white ${
                saving ? "cursor-not-allowed bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {saving ? "저장 중..." : "GitHub에 저장"}
            </button>
            <span className="text-xs text-gray-500">{text.length}자</span>
            {message && (
              <span
                className={`text-xs ${
                  message.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {message.text}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface AddRootButtonProps {
  parentId: string;
  existingSlugs: Set<string>;
  onAdd: (node: TreeNode) => void;
}

function AddRootButton({ parentId, existingSlugs, onAdd }: AddRootButtonProps) {
  const [adding, setAdding] = useState(false);
  if (!adding) {
    return (
      <button
        onClick={() => setAdding(true)}
        className="w-full rounded-b-lg border-t border-dashed border-gray-300 px-4 py-2 text-left text-xs text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-gray-900/40"
      >
        + 최상위 노드 추가
      </button>
    );
  }
  return (
    <div className="border-t border-gray-200 p-2 dark:border-gray-700">
      <AddChildForm
        parentId={parentId}
        existingSlugs={existingSlugs}
        onCancel={() => setAdding(false)}
        onAdd={(n) => {
          onAdd(n);
          setAdding(false);
        }}
      />
    </div>
  );
}
