import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getBookByPath } from "@/book";
import {
  getGitHubConfig,
  commitFiles,
  pathExistsInRepo,
} from "@/lib/admin/github";
import {
  genBookDataJson,
  genLeafTsx,
  validateBookTree,
  collectLeafIds,
  collectLeavesWithPath,
} from "@/lib/admin/templates";
import type { Book } from "@/book/types";

/** PUT: 특정 책의 트리 전체 업데이트 (src/book/data/{id}.json 커밋) */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  const { bookId } = await context.params;
  const existing = getBookByPath(bookId);
  if (!existing) {
    return NextResponse.json({ error: `존재하지 않는 책: ${bookId}` }, { status: 404 });
  }

  const gh = getGitHubConfig();
  if (!gh) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN 또는 GITHUB_REPO가 설정되지 않았습니다" },
      { status: 500 }
    );
  }

  let body: { book: Book };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { book } = body;
  if (!book) {
    return NextResponse.json({ error: "book 누락" }, { status: 400 });
  }
  if (book.id !== bookId || book.basePath !== existing.basePath) {
    return NextResponse.json(
      { error: "책 id/basePath는 변경할 수 없습니다" },
      { status: 400 }
    );
  }

  const v = validateBookTree(book);
  if (!v.ok) {
    return NextResponse.json({ error: v.error }, { status: 400 });
  }

  // 신규 leaf 감지 → 빈 TSX 스켈레톤도 같은 커밋에 포함
  // (1 leaf = 1 TSX 파일 — CLAUDE.md / CONVENTION_CONTENT.md 원칙)
  const oldLeafIds = collectLeafIds(existing.children ?? []);
  const newLeaves = collectLeavesWithPath(book.children ?? []).filter(
    (leaf) => !oldLeafIds.has(leaf.id),
  );

  // 기존 파일을 덮어쓰지 않도록 GitHub에서 한 번 더 확인
  const skeletonFiles = (
    await Promise.all(
      newLeaves.map(async (leaf) => {
        const tsxPath = `src/content/${book.basePath}/${leaf.slugPath.join("/")}.tsx`;
        if (await pathExistsInRepo(gh, tsxPath)) return null;
        return { path: tsxPath, content: genLeafTsx(leaf.slug) };
      }),
    )
  ).filter((f): f is { path: string; content: string } => f !== null);

  const commitMessage =
    skeletonFiles.length > 0
      ? `feat(book): update ${book.id} tree + ${skeletonFiles.length} new leaf skeleton(s) via admin UI`
      : `feat(book): update ${book.id} tree via admin UI`;

  try {
    const result = await commitFiles(
      gh,
      [
        {
          path: `src/book/data/${book.id}.json`,
          content: genBookDataJson(book),
        },
        ...skeletonFiles,
      ],
      commitMessage,
    );

    return NextResponse.json({
      success: true,
      commit: result.sha,
      filesChanged: result.filesChanged,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json(
      { error: `GitHub 커밋 실패: ${message}` },
      { status: 500 }
    );
  }
}
