import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getBookByPath } from "@/book";
import { getGitHubConfig, commitFiles } from "@/lib/admin/github";
import { genBookDataJson, validateBookTree } from "@/lib/admin/templates";
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

  try {
    const result = await commitFiles(
      gh,
      [
        {
          path: `src/book/data/${book.id}.json`,
          content: genBookDataJson(book),
        },
      ],
      `feat(book): update ${book.id} tree via admin UI`
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
