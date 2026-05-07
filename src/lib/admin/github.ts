/** GitHub API 공통 유틸 (관리자 구조/책/바구니 변경에 사용) */

export interface GitHubConfig {
  token: string;
  repo: string;
}

/** 환경변수에서 GitHub 설정 로드 */
export function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return { token, repo };
}

/** GitHub API 호출 헬퍼 */
export async function githubFetch(
  repo: string,
  path: string,
  token: string,
  options?: RequestInit
) {
  const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return res.json();
}

/** 여러 파일을 한 번에 GitHub에 커밋 */
export async function commitFiles(
  gh: GitHubConfig,
  files: { path: string; content: string }[],
  message: string
): Promise<{ sha: string; filesChanged: string[] }> {
  // 1) main 최신 커밋 SHA
  const ref = await githubFetch(gh.repo, "git/ref/heads/main", gh.token);
  const latestSha = ref.object.sha;

  // 2) blob 생성
  const treeItems = await Promise.all(
    files.map(async (file) => {
      const blob = await githubFetch(gh.repo, "git/blobs", gh.token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: file.content, encoding: "utf-8" }),
      });
      return {
        path: file.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blob.sha,
      };
    })
  );

  // 3) 새 트리 생성
  const newTree = await githubFetch(gh.repo, "git/trees", gh.token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base_tree: latestSha, tree: treeItems }),
  });

  // 4) 커밋 생성
  const newCommit = await githubFetch(gh.repo, "git/commits", gh.token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      tree: newTree.sha,
      parents: [latestSha],
    }),
  });

  // 5) main ref 업데이트
  await githubFetch(gh.repo, "git/refs/heads/main", gh.token, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sha: newCommit.sha }),
  });

  return { sha: newCommit.sha, filesChanged: files.map((f) => f.path) };
}

/** GitHub 커밋 목록 조회 응답의 일부 (수정 이력 화면이 사용하는 필드만) */
export interface CommitSummary {
  sha: string;
  message: string;
  authorName: string;
  authorLogin: string | null;
  authorAvatarUrl: string | null;
  date: string;
  htmlUrl: string;
}

/** 옵션: GitHub commits API 파라미터 */
export interface ListCommitsOptions {
  /** 특정 경로(폴더/파일)에 영향을 준 커밋만 — GitHub commits API의 path 파라미터 */
  path?: string;
  /** 1-indexed 페이지 번호 */
  page?: number;
  /** 페이지 크기 (기본 30, 최대 100) */
  perPage?: number;
  /** 브랜치/SHA. 기본은 main */
  sha?: string;
}

/** main 브랜치 커밋 목록 조회 */
export async function listCommits(
  gh: GitHubConfig,
  options: ListCommitsOptions = {}
): Promise<CommitSummary[]> {
  const params = new URLSearchParams();
  params.set("sha", options.sha ?? "main");
  if (options.path) params.set("path", options.path);
  if (options.page) params.set("page", String(options.page));
  params.set("per_page", String(Math.min(options.perPage ?? 30, 100)));

  const raw = (await githubFetch(
    gh.repo,
    `commits?${params.toString()}`,
    gh.token
  )) as Array<{
    sha: string;
    html_url: string;
    commit: {
      author: { name?: string; date?: string } | null;
      message: string;
    };
    author: { login?: string; avatar_url?: string } | null;
  }>;

  return raw.map((c) => ({
    sha: c.sha,
    message: c.commit.message,
    authorName: c.commit.author?.name ?? "",
    authorLogin: c.author?.login ?? null,
    authorAvatarUrl: c.author?.avatar_url ?? null,
    date: c.commit.author?.date ?? "",
    htmlUrl: c.html_url,
  }));
}
