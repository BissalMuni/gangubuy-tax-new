#!/usr/bin/env python3
"""
gangubuy-tax-new content migration: mdx pattern → math pattern.
- <h2 id="X"><Outline level={1}>TITLE</Outline></h2> + content → <CalcBox title="■ TITLE" id="X">content</CalcBox>
- <Outline level={2}>TITLE</Outline> + content → <SubSection title="● TITLE">content</SubSection>
- <Callout type="X">content</Callout> → <Insight>content</Insight>
- export const meta = {...}; → JSDoc /** meta: ... */
- imports rewritten; SectionNav kept; tables/h1/blockquote/etc untouched
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent / "src" / "content"

H2_OUTLINE_RE = re.compile(
    r'<h2 id="([^"]*)">\s*<Outline level=\{1\}>([^<]*)</Outline>\s*</h2>',
    re.MULTILINE
)
OUTLINE_LEVEL2_RE = re.compile(
    r'<Outline level=\{2\}>([^<]*)</Outline>',
)
CALLOUT_OPEN_RE = re.compile(r'<Callout\s+type="[^"]*">')
CALLOUT_CLOSE_RE = re.compile(r'</Callout>')

META_RE = re.compile(
    r'export const meta = (\{[\s\S]*?\});\s*',
    re.MULTILINE
)

IMPORT_OUTLINE_RE = re.compile(r'^import \{ Outline \} from "@/components/mdx/Outline";\s*\n', re.MULTILINE)
IMPORT_CALLOUT_RE = re.compile(r'^import \{ Callout \} from "@/components/mdx/Callout";\s*\n', re.MULTILINE)
IMPORT_SECTIONNAV_RE = re.compile(r'^import \{ SectionNav \} from "@/components/mdx/SectionNav";\s*\n', re.MULTILINE)


def meta_to_jsdoc(meta_obj_str: str) -> str:
    """Convert {key: value, ...} object literal to JSDoc YAML lines.
    Best-effort: preserves the inner content, just changes wrapper."""
    body = meta_obj_str.strip()
    # Strip outer braces
    body = body[1:-1].strip()
    lines = []
    # Split by top-level commas (naive — doesn't handle nested strings/arrays w commas perfectly)
    # Use a simple state machine
    parts = []
    depth = 0
    current = []
    in_string = False
    string_char = None
    for ch in body:
        if in_string:
            current.append(ch)
            if ch == string_char:
                in_string = False
        else:
            if ch in ('"', "'"):
                in_string = True
                string_char = ch
                current.append(ch)
            elif ch in ('{', '['):
                depth += 1
                current.append(ch)
            elif ch in ('}', ']'):
                depth -= 1
                current.append(ch)
            elif ch == ',' and depth == 0:
                parts.append(''.join(current).strip())
                current = []
            else:
                current.append(ch)
    if current:
        last = ''.join(current).strip()
        if last:
            parts.append(last)

    out = ['/**', ' * meta:']
    for p in parts:
        # p like 'key: value' or 'key: "value"' or 'key: [a, b]'
        # Just indent it
        out.append(' *   ' + p)
    out.append(' */')
    return '\n'.join(out)


def determine_imports_used(content: str) -> tuple[bool, bool, bool, bool]:
    """Returns (uses_calcbox, uses_subsection, uses_insight, uses_sectionnav) AFTER migration."""
    # CalcBox: any level-1 h2/Outline pattern
    has_calcbox = bool(H2_OUTLINE_RE.search(content))
    # SubSection: any level-2 outline
    has_subsection = bool(OUTLINE_LEVEL2_RE.search(content))
    # Insight: any Callout
    has_insight = bool(CALLOUT_OPEN_RE.search(content))
    # SectionNav: present
    has_sectionnav = '<SectionNav' in content
    return has_calcbox, has_subsection, has_insight, has_sectionnav


def transform_callouts(content: str) -> str:
    """Replace <Callout type="X"> ... </Callout> with <Insight>...</Insight>."""
    content = CALLOUT_OPEN_RE.sub('<Insight>', content)
    content = CALLOUT_CLOSE_RE.sub('</Insight>', content)
    return content


def transform_calcboxes(content: str) -> str:
    """Wrap each <h2><Outline level={1}>TITLE</Outline></h2> + following content
    until next such h2 (or </div> end) in <CalcBox title="■ TITLE" id="ID">...</CalcBox>.
    """
    matches = list(H2_OUTLINE_RE.finditer(content))
    if not matches:
        return content

    # Find the closing </div> of the outer return — assume last </div> in file
    end_div_idx = content.rfind('</div>')
    if end_div_idx == -1:
        return content

    # Build result by replacing each match's range
    pieces = []
    last_end = 0
    for i, m in enumerate(matches):
        # Append content before this match unchanged
        pieces.append(content[last_end:m.start()])
        ident = m.group(1)
        title = m.group(2)
        # Determine where this CalcBox's content ends:
        # next match start, or end_div_idx
        if i + 1 < len(matches):
            section_end = matches[i + 1].start()
        else:
            section_end = end_div_idx
        section_body = content[m.end():section_end]
        # Strip leading/trailing whitespace inside body
        body_stripped = section_body.strip('\n')
        pieces.append(f'<CalcBox title="■ {title}" id="{ident}">\n{body_stripped}\n      </CalcBox>')
        last_end = section_end

    # Append remainder
    pieces.append(content[last_end:])
    return ''.join(pieces)


def transform_subsections(content: str) -> str:
    """For each <Outline level={2}>TITLE</Outline> wrap following content until next
    level-2 or end of enclosing CalcBox in <SubSection>.

    Strategy: process within each CalcBox region.
    """
    # Find each CalcBox region (after CalcBox transformation)
    calcbox_open_re = re.compile(r'<CalcBox title="[^"]*" id="[^"]*">')
    out = []
    pos = 0
    for m_open in calcbox_open_re.finditer(content):
        out.append(content[pos:m_open.end()])
        # Find matching </CalcBox>
        close_idx = content.find('</CalcBox>', m_open.end())
        if close_idx == -1:
            pos = m_open.end()
            continue
        body = content[m_open.end():close_idx]
        # Process subsections in body
        body = process_subsections_in_body(body)
        out.append(body)
        out.append('</CalcBox>')
        pos = close_idx + len('</CalcBox>')
    out.append(content[pos:])
    return ''.join(out)


def process_subsections_in_body(body: str) -> str:
    """Within a CalcBox body, wrap level-2 Outline + following content in SubSection."""
    matches = list(OUTLINE_LEVEL2_RE.finditer(body))
    if not matches:
        return body

    pieces = []
    last_end = 0
    for i, m in enumerate(matches):
        pieces.append(body[last_end:m.start()])
        title = m.group(1)
        if i + 1 < len(matches):
            section_end = matches[i + 1].start()
        else:
            section_end = len(body)
        sub_body = body[m.end():section_end]
        sub_stripped = sub_body.strip('\n')
        pieces.append(f'<SubSection title="● {title}">\n{sub_stripped}\n        </SubSection>')
        last_end = section_end
    pieces.append(body[last_end:])
    return ''.join(pieces)


def rewrite_imports(content: str) -> str:
    """Remove Outline/Callout imports, add CalcBox import based on usage."""
    has_calcbox, has_subsection, has_insight, has_sectionnav = determine_imports_used(content)

    # Remove old imports
    content = IMPORT_OUTLINE_RE.sub('', content)
    content = IMPORT_CALLOUT_RE.sub('', content)

    # Build new shared import
    components = []
    if has_calcbox:
        components.append('CalcBox')
    if has_subsection:
        components.append('SubSection')
    if has_insight:
        components.append('Insight')

    if not components:
        return content  # nothing to add

    new_import = f'import {{ {", ".join(components)} }} from "@/components/content/shared";\n'

    # Insert after SectionNav import if present, else after "use client"; line
    sn_match = IMPORT_SECTIONNAV_RE.search(content)
    if sn_match:
        insert_pos = sn_match.end()
        content = content[:insert_pos] + new_import + content[insert_pos:]
    else:
        # Insert after "use client";
        uc_match = re.search(r'^"use client";\s*\n', content, re.MULTILINE)
        if uc_match:
            insert_pos = uc_match.end()
            content = content[:insert_pos] + '\n' + new_import + content[insert_pos:]
        else:
            content = new_import + content

    return content


def transform_meta(content: str) -> str:
    """Convert export const meta = {...}; to JSDoc above default export."""
    m = META_RE.search(content)
    if not m:
        return content
    meta_obj = m.group(1)
    jsdoc = meta_to_jsdoc(meta_obj)

    # Remove the meta declaration
    content = content[:m.start()] + content[m.end():]

    # Insert jsdoc before "export default function"
    func_match = re.search(r'^export default function ', content, re.MULTILINE)
    if func_match:
        insert_pos = func_match.start()
        content = content[:insert_pos] + jsdoc + '\n' + content[insert_pos:]

    return content


def migrate_file(path: Path) -> str:
    content = path.read_text(encoding='utf-8')
    original = content

    # Step 1: Transform callouts first (string-based, doesn't affect structure)
    content = transform_callouts(content)

    # Step 2: Wrap level-1 outlines in CalcBox
    content = transform_calcboxes(content)

    # Step 3: Within each CalcBox, wrap level-2 outlines in SubSection
    content = transform_subsections(content)

    # Step 4: Convert meta to JSDoc
    content = transform_meta(content)

    # Step 5: Rewrite imports
    content = rewrite_imports(content)

    if content != original:
        path.write_text(content, encoding='utf-8')
        return 'migrated'
    return 'unchanged'


def find_unmigrated() -> list[Path]:
    """Find files still using mdx pattern (Outline/Callout/meta)."""
    files = []
    for f in ROOT.rglob('*.tsx'):
        try:
            text = f.read_text(encoding='utf-8')
        except Exception:
            continue
        if 'Outline level=' in text or '<Callout' in text or re.search(r'^export const meta', text, re.MULTILINE):
            files.append(f)
    return sorted(files)


def main():
    files = find_unmigrated()
    print(f"Found {len(files)} unmigrated files")

    if len(sys.argv) > 1 and sys.argv[1] == '--list':
        for f in files:
            print(f.relative_to(ROOT))
        return

    success = 0
    failed = []
    for f in files:
        try:
            result = migrate_file(f)
            if result == 'migrated':
                success += 1
                print(f"OK: {f.relative_to(ROOT)}")
            else:
                print(f"unchanged: {f.relative_to(ROOT)}")
        except Exception as e:
            failed.append((f, str(e)))
            print(f"FAIL: {f.relative_to(ROOT)} — {e}")

    print(f"\nSummary: {success} migrated, {len(failed)} failed")
    if failed:
        for f, err in failed:
            print(f"  - {f.relative_to(ROOT)}: {err}")


if __name__ == '__main__':
    main()
