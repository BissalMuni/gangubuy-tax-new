import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requirePermission } from "@/lib/auth/require-role";
import { getBookByPath, findNodeBySlugs, isLeafNode } from "@/book";
import { getGitHubConfig, commitFiles } from "@/lib/admin/github";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** body/query를 검증해 책/슬러그/leaf를 해석. 실패 시 NextResponse 반환. */
function resolveLeaf(bookId: string | null, slugsRaw: string | null) {
  if (!bookId) return { error: NextResponse.json({ error: "book 누락" }, { status: 400 }) };
  const book = getBookByPath(bookId);
  if (!book) return { error: NextResponse.json({ error: `책 없음: ${bookId}` }, { status: 404 }) };
  if (!slugsRaw) return { error: NextResponse.json({ error: "slugs 누락" }, { status: 400 }) };
  const slugs = slugsRaw.split("/").filter(Boolean);
  if (slugs.length === 0) return { error: NextResponse.json({ error: "slugs 빈 값" }, { status: 400 }) };
  for (const s of slugs) {
    if (!SLUG.test(s)) {
      return { error: NextResponse.json({ error: `slug kebab-case 위반: ${s}` }, { status: 400 }) };
    }
  }
  const node = findNodeBySlugs(book.children, slugs);
  if (!node) {
    return { error: NextResponse.json({ error: "해당 경로의 노드 없음" }, { status: 404 }) };
  }
  if (!isLeafNode(node)) {
    return { error: NextResponse.json({ error: "leaf 노드만 콘텐츠 편집 가능" }, { status: 400 }) };
  }
  return { book, slugs };
}

/** GET /api/admin/content?book=property&slugs=vol3/affairs/luxury-heavy */
export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const resolved = resolveLeaf(searchParams.get("book"), searchParams.get("slugs"));
  if ("error" in resolved) return resolved.error;

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    resolved.book.basePath,
    ...resolved.slugs,
  ) + ".md";

  try {
    const text = await readFile(filePath, "utf8");
    return NextResponse.json({ text, exists: true });
  } catch {
    return NextResponse.json({ text: "", exists: false });
  }
}

/** PUT /api/admin/content   body: { book, slugs, text } */
export async function PUT(request: NextRequest) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  const gh = getGitHubConfig();
  if (!gh) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN 또는 GITHUB_REPO가 설정되지 않았습니다" },
      { status: 500 }
    );
  }

  let body: { book?: string; slugs?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const resolved = resolveLeaf(body.book ?? null, body.slugs ?? null);
  if ("error" in resolved) return resolved.error;
  if (typeof body.text !== "string") {
    return NextResponse.json({ error: "text는 문자열이어야 함" }, { status: 400 });
  }

  const repoPath = `src/content/${resolved.book.basePath}/${resolved.slugs.join("/")}.md`;
  const content = body.text.endsWith("\n") ? body.text : body.text + "\n";

  try {
    const result = await commitFiles(
      gh,
      [{ path: repoPath, content }],
      `feat(content): edit ${resolved.book.id}/${resolved.slugs.join("/")} via admin UI`
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
