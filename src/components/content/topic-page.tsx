import { TopicContent } from "@/components/content/topic-content";
import { SectionsProvider } from "@/lib/context/sections-context";
import { isLeafNode, type TreeNode, type Book } from "@/book";
import Link from "next/link";
import { readFile, access } from "node:fs/promises";
import path from "node:path";

/** leaf의 MD 콘텐츠 파일을 시도해서 텍스트를 반환 (없으면 null) */
async function readLeafMd(basePath: string, slugs: string[]): Promise<string | null> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    basePath,
    ...slugs,
  ) + ".md";
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

/** leaf의 TSX 콘텐츠 파일 존재 여부 */
async function hasLeafTsx(basePath: string, slugs: string[]): Promise<boolean> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    basePath,
    ...slugs,
  ) + ".tsx";
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/** 소단원(leaf) 콘텐츠 페이지 또는 중간 노드 목록 */
export async function TopicPage({
  node,
  slugs,
  basePath,
  book,
}: {
  node: TreeNode;
  slugs: string[];
  basePath: string;
  book: Book;
}) {
  const contentPath = `/${basePath}/${slugs.join("/")}`;

  // leaf 노드 → 콘텐츠 표시
  if (isLeafNode(node)) {
    const mdText = await readLeafMd(basePath, slugs);
    const tsxExists = mdText ? false : await hasLeafTsx(basePath, slugs);
    return (
      <SectionsProvider initialContentPath={contentPath}>
        <div className="max-w-4xl mx-auto px-6 py-12 lg:pl-8">
          <TopicContent
            node={node}
            contentPath={contentPath}
            book={book}
            mdText={mdText}
            tsxExists={tsxExists}
          />
        </div>
      </SectionsProvider>
    );
  }

  // 중간 노드 → 하위 목록 표시
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:pl-8">
      <h1 className="text-2xl font-bold mb-6">{node.title}</h1>
      {node.children && (
        <div className="space-y-2">
          {node.children.map((child) => {
            const childPath = `/${basePath}/${[...slugs, child.slug].join("/")}`;
            return (
              <Link
                key={child.id}
                href={childPath}
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium">{child.title}</span>
                {child.children && (
                  <span className="ml-2 text-xs text-gray-500">
                    ({child.children.length}개 하위 항목)
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
