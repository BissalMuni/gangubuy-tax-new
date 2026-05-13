import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { allBooks } from "../src/book";
import { collectLeavesWithPath, genLeafTsx } from "../src/lib/admin/templates";

const bookId = process.argv[2];
if (!bookId) {
  console.error("usage: tsx scripts/backfill-property-skeletons.ts <book-id>");
  console.error(`available: ${allBooks.map((b) => b.id).join(", ")}`);
  process.exit(1);
}

const book = allBooks.find((b) => b.id === bookId);
if (!book) {
  console.error(`unknown book: ${bookId}`);
  process.exit(1);
}

const root = join(process.cwd(), "src", "content", book.basePath);
const leaves = collectLeavesWithPath(book.children);

let created = 0;
let skipped = 0;

for (const leaf of leaves) {
  const filePath = join(root, ...leaf.slugPath) + ".tsx";
  if (existsSync(filePath)) {
    skipped += 1;
    continue;
  }
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, genLeafTsx(leaf.slug), "utf8");
  created += 1;
  console.log(`+ ${filePath}`);
}

console.log(`\nDone. book=${book.id} created=${created}, skipped=${skipped}, total=${leaves.length}`);
