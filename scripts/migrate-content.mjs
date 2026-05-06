// Migration script: mdx pattern (Outline/Callout) -> math pattern (CalcBox/SubSection/Insight)
// See MIGRATION_RULES.md
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILES = [
  "01-duplicate-exclusion.tsx",
  "02-incorporation.tsx",
  "03-majority-shareholder.tsx",
  "04-financial-merger.tsx",
  "05-donation.tsx",
  "06-rnd-lab.tsx",
  "07-senior-welfare.tsx",
  "08-green-building.tsx",
  "09-farmer-loan.tsx",
  "10-replacement.tsx",
  "11-corp-merger.tsx",
  "12-corp-division.tsx",
  "13-restricted-land.tsx",
  "14-welfare-corp.tsx",
  "15-social-enterprise.tsx",
];

const ROOT = path.resolve(
  __dirname,
  "..",
  "src",
  "content",
  "corp-acquisition-tax",
  "reductions"
);

// Helper: find indices of all occurrences of a pattern
function* findAllMatches(text, regex) {
  const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
  const re = new RegExp(regex.source, flags);
  let m;
  while ((m = re.exec(text)) !== null) {
    yield m;
    if (m.index === re.lastIndex) re.lastIndex++;
  }
}

// Token-by-token search for matching JSX close given an open tag start.
// Returns [openTagEndIdx, closeTagStartIdx, closeTagEndIdx] or null.
// We just need to find the matching </TagName> that pairs with first <TagName ...>.
function findMatchingClose(text, openIdx, tagName) {
  // Find end of opening tag
  // Determine if it's self-closing
  let i = openIdx;
  // skip "<TagName"
  i = openIdx + 1 + tagName.length;
  let depth = 1;
  // We're now somewhere after the tag name. Walk until > to consume opening tag attrs.
  // But within attrs there may be {...} which can have any chars including > inside JSX... Outline/Callout only have simple attrs (level/type), so a simple scan suffices.
  while (i < text.length) {
    const c = text[i];
    if (c === ">") {
      if (text[i - 1] === "/") {
        // self-closing
        return { openEnd: i + 1, closeStart: -1, closeEnd: -1 };
      }
      i++;
      break;
    }
    i++;
  }
  const openEnd = i;
  // Now scan for matching nested tags
  while (i < text.length) {
    const lt = text.indexOf("<", i);
    if (lt === -1) return null;
    if (text.startsWith(`</${tagName}>`, lt)) {
      depth--;
      if (depth === 0) {
        return { openEnd, closeStart: lt, closeEnd: lt + 3 + tagName.length };
      }
      i = lt + 3 + tagName.length;
    } else if (
      text.startsWith(`<${tagName} `, lt) ||
      text.startsWith(`<${tagName}>`, lt)
    ) {
      depth++;
      i = lt + 1 + tagName.length;
    } else {
      i = lt + 1;
    }
  }
  return null;
}

// Step 1: Convert Callout -> Insight
function convertCallout(src) {
  // <Callout type="..."> ... </Callout>
  return src.replace(
    /<Callout\s+type=(?:"[^"]*"|'[^']*'|\{[^}]*\})\s*>/g,
    "<Insight>"
  ).replace(/<\/Callout>/g, "</Insight>");
}

// Step 2: Replace level-1 Outline blocks with CalcBox open + close at next h2/level-1 boundary or before </div>
// Also handles the wrapper <h2 id="..."><Outline level={1}>title</Outline></h2>
function convertCalcBoxes(src) {
  // Find all level-1 occurrences. They may appear in two forms:
  // Form A: <h2 id="X">\s*<Outline level={1}>TITLE</Outline>\s*</h2>
  // Form B: <Outline level={1}>TITLE</Outline>  (no h2 wrapper)
  // We'll process by repeatedly finding the next level-1 boundary.

  // Build a list of boundaries (start, end-of-replaced-block, id, title)
  const boundaries = [];

  const reA =
    /<h2\s+id="([^"]+)">\s*<Outline\s+level=\{1\}>([^<]*)<\/Outline>\s*<\/h2>/g;
  const reB =
    /<Outline\s+level=\{1\}>([^<]*)<\/Outline>/g;

  // Mark form A first
  const marks = [];
  let m;
  while ((m = reA.exec(src)) !== null) {
    marks.push({
      start: m.index,
      end: m.index + m[0].length,
      id: m[1],
      title: m[2].trim(),
      kind: "A",
    });
  }
  // Then form B - but only those not overlapping with A
  while ((m = reB.exec(src)) !== null) {
    const start = m.index;
    const overlap = marks.some(
      (mk) => start >= mk.start && start < mk.end
    );
    if (overlap) continue;
    marks.push({
      start,
      end: start + m[0].length,
      id: null,
      title: m[1].trim(),
      kind: "B",
    });
  }
  marks.sort((a, b) => a.start - b.start);

  if (marks.length === 0) return src;

  // The closing point of CalcBox N is the start of CalcBox N+1, or for the last one,
  // the position of the closing </div> of the return wrapper (the last </div> before );
  // Find that closing </div>.
  // Strategy: find last </div> in src (works since the return is the last JSX block).
  const lastDivClose = src.lastIndexOf("</div>");
  if (lastDivClose === -1) return src;

  // Build result piece by piece
  let out = "";
  let cursor = 0;
  for (let i = 0; i < marks.length; i++) {
    const cur = marks[i];
    const nextStart = i + 1 < marks.length ? marks[i + 1].start : lastDivClose;

    // Append text up to current mark
    out += src.slice(cursor, cur.start);

    // Compose CalcBox open
    const idAttr = cur.id ? ` id="${cur.id}"` : "";
    const open = `<CalcBox title="■ ${cur.title}"${idAttr}>`;

    // Inner content is from cur.end .. nextStart
    const inner = src.slice(cur.end, nextStart);

    out += open + inner + "</CalcBox>";

    // For a continuous chain we want a blank line; preserve original spacing by not adding extra newlines.
    cursor = nextStart;
  }
  // Append the remainder
  out += src.slice(cursor);

  return out;
}

// Step 3: Convert level-2 Outline -> SubSection wrapping content up to next level-2 Outline OR </CalcBox>
function convertSubSections(src) {
  // Find all level-2 markers
  const re = /<Outline\s+level=\{2\}>([^<]*)<\/Outline>/g;
  const marks = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    marks.push({
      start: m.index,
      end: m.index + m[0].length,
      title: m[1].trim(),
    });
  }
  if (marks.length === 0) return src;

  // For each mark, the SubSection content extends until the next level-2 Outline (within same CalcBox)
  // OR the next </CalcBox>, whichever comes first.
  // Build replacement using a single pass.
  let out = "";
  let cursor = 0;
  for (let i = 0; i < marks.length; i++) {
    const cur = marks[i];
    const next = i + 1 < marks.length ? marks[i + 1].start : Infinity;
    // Find next </CalcBox> after cur.end
    const calcboxClose = src.indexOf("</CalcBox>", cur.end);
    let stop;
    if (calcboxClose === -1) stop = next;
    else if (next < calcboxClose) stop = next;
    else stop = calcboxClose;

    if (stop === Infinity) {
      // No CalcBox close found - fallback to last </div>
      stop = src.lastIndexOf("</div>");
    }

    // Append text before mark
    out += src.slice(cursor, cur.start);
    // Append SubSection wrapping
    const inner = src.slice(cur.end, stop);
    out += `<SubSection title="● ${cur.title}">` + inner + "</SubSection>";
    cursor = stop;
  }
  out += src.slice(cursor);
  return out;
}

// Step 4: Convert imports
function convertImports(src) {
  // Remove Outline & Callout imports
  let out = src
    .replace(
      /^\s*import\s+\{\s*Outline\s*\}\s+from\s+["']@\/components\/mdx\/Outline["'];?\s*\n/gm,
      ""
    )
    .replace(
      /^\s*import\s+\{\s*Callout\s*\}\s+from\s+["']@\/components\/mdx\/Callout["'];?\s*\n/gm,
      ""
    );

  // Determine which of CalcBox/SubSection/Insight are used
  const usesCalcBox = /<CalcBox\b/.test(out);
  const usesSubSection = /<SubSection\b/.test(out);
  const usesInsight = /<Insight\b/.test(out);
  const parts = [];
  if (usesCalcBox) parts.push("CalcBox");
  if (usesSubSection) parts.push("SubSection");
  if (usesInsight) parts.push("Insight");

  if (parts.length === 0) return out;

  const importLine = `import { ${parts.join(", ")} } from "@/components/content/shared";\n`;

  // Insert after last existing import
  const lines = out.split("\n");
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s+/.test(lines[i])) lastImportIdx = i;
  }
  if (lastImportIdx === -1) {
    // Insert after "use client" if present, else top
    let insertAt = 0;
    if (lines[0]?.includes('"use client"')) {
      insertAt = 1;
      // skip following blank lines
      while (lines[insertAt] === "") insertAt++;
    }
    lines.splice(insertAt, 0, importLine.trimEnd());
  } else {
    lines.splice(lastImportIdx + 1, 0, importLine.trimEnd());
  }
  return lines.join("\n");
}

// Step 5: Convert export const meta = {...} to JSDoc comment above default function
function convertMeta(src) {
  // Find "export const meta = {" up to its matching "};"
  const startMarker = "export const meta = {";
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return src;
  // Find balanced closing "};"
  let i = startIdx + startMarker.length;
  let depth = 1;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        // expect ; after
        let j = i + 1;
        while (j < src.length && /\s/.test(src[j]) === false && src[j] !== ";") j++;
        // simpler: just consume "};\n"
        break;
      }
    }
    i++;
  }
  const closeBraceIdx = i;
  // Consume optional ; and trailing newline
  let endIdx = closeBraceIdx + 1;
  if (src[endIdx] === ";") endIdx++;
  // Consume trailing whitespace/newlines (limit to 2)
  while (endIdx < src.length && /[ \t]/.test(src[endIdx])) endIdx++;
  if (src[endIdx] === "\n") endIdx++;

  const metaBlock = src.slice(startIdx + startMarker.length, closeBraceIdx);
  // Parse fields naively: each top-level `key: value,` line
  // We'll preserve as YAML-ish JSDoc lines.
  const lines = metaBlock.split("\n").map((l) => l.trimEnd());
  const yamlLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Strip trailing comma
    const noComma = trimmed.replace(/,$/, "");
    yamlLines.push(`   ${noComma}`);
  }
  const jsdoc =
    `/**\n * meta:\n` +
    yamlLines.map((l) => ` *${l}`).join("\n") +
    `\n */\n`;

  // Find "export default function" and place jsdoc immediately above
  const defaultIdx = src.indexOf("export default function", endIdx);
  if (defaultIdx === -1) {
    // Just remove meta and prepend nothing
    return src.slice(0, startIdx) + src.slice(endIdx);
  }
  // Remove the meta block
  let withoutMeta = src.slice(0, startIdx) + src.slice(endIdx);
  // Recompute defaultIdx in new string
  const newDefaultIdx = withoutMeta.indexOf("export default function");
  // Insert jsdoc just before it; ensure single blank line separation above
  // Trim trailing blank lines just before insertion point, then insert
  let before = withoutMeta.slice(0, newDefaultIdx);
  before = before.replace(/\n+$/, "\n\n");
  const after = withoutMeta.slice(newDefaultIdx);
  return before + jsdoc + after;
}

// Main
const report = { migrated: [], skipped: [], unusual: [] };

for (const file of FILES) {
  const fp = path.join(ROOT, file);
  const original = fs.readFileSync(fp, "utf8");

  const hasOutline = /<Outline\b/.test(original);
  const hasCallout = /<Callout\b/.test(original);
  const hasMeta = /export\s+const\s+meta\s*=/.test(original);

  if (!hasOutline && !hasCallout && !hasMeta) {
    report.skipped.push(file);
    continue;
  }

  let src = original;
  // Order of transformation matters:
  // 1. Callout -> Insight (independent)
  src = convertCallout(src);
  // 2. CalcBox wrapping (level-1 Outline) - run before SubSection so SubSection sees </CalcBox>
  src = convertCalcBoxes(src);
  // 3. SubSection wrapping (level-2 Outline)
  src = convertSubSections(src);
  // 4. Imports
  src = convertImports(src);
  // 5. meta -> JSDoc
  src = convertMeta(src);

  // Sanity checks
  const stillHasOutline = /<Outline\b/.test(src);
  const stillHasCallout = /<Callout\b/.test(src);
  const stillHasMeta = /export\s+const\s+meta\s*=/.test(src);
  if (stillHasOutline || stillHasCallout || stillHasMeta) {
    report.unusual.push({ file, stillHasOutline, stillHasCallout, stillHasMeta });
  }

  fs.writeFileSync(fp, src, "utf8");
  report.migrated.push(file);
}

console.log(JSON.stringify(report, null, 2));
