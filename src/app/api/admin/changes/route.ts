import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getGitHubConfig, listCommits } from "@/lib/admin/github";

/** GET: GitHub main 브랜치 커밋 이력 */
export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  const gh = getGitHubConfig();
  if (!gh) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN 또는 GITHUB_REPO가 설정되지 않았습니다" },
      { status: 500 }
    );
  }

  const { searchParams } = request.nextUrl;
  const pathParam = searchParams.get("path") ?? undefined;
  const pageRaw = Number(searchParams.get("page") ?? "1");
  const perPageRaw = Number(searchParams.get("per_page") ?? "30");
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const perPage =
    Number.isFinite(perPageRaw) && perPageRaw > 0 ? Math.min(perPageRaw, 100) : 30;

  try {
    const commits = await listCommits(gh, {
      path: pathParam,
      page,
      perPage,
    });
    return NextResponse.json({
      repo: gh.repo,
      page,
      perPage,
      commits,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error("[api/admin/changes GET] failed:", err);
    return NextResponse.json(
      { error: `GitHub 조회 실패: ${message}` },
      { status: 500 }
    );
  }
}
