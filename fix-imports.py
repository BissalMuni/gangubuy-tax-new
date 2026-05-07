#!/usr/bin/env python3
"""
Add missing `@/components/content/shared` imports based on actual JSX usage.
Detects <CalcBox/<SubSection/<Insight in already-migrated files.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent / "src" / "content"

USE_CALCBOX_RE = re.compile(r'<CalcBox[\s>]')
USE_SUBSECTION_RE = re.compile(r'<SubSection[\s>]')
USE_INSIGHT_RE = re.compile(r'<Insight[\s>]')

EXISTING_IMPORT_RE = re.compile(r'^import \{[^}]*\} from "@/components/content/shared";\s*\n', re.MULTILINE)
SECTIONNAV_IMPORT_RE = re.compile(r'^import \{ SectionNav \} from "@/components/mdx/SectionNav";\s*\n', re.MULTILINE)
USE_CLIENT_RE = re.compile(r'^"use client";\s*\n', re.MULTILINE)


def fix_file(path: Path) -> str:
    content = path.read_text(encoding='utf-8')

    used = []
    if USE_CALCBOX_RE.search(content):
        used.append('CalcBox')
    if USE_SUBSECTION_RE.search(content):
        used.append('SubSection')
    if USE_INSIGHT_RE.search(content):
        used.append('Insight')

    if not used:
        return 'no-shared-usage'

    # Check if shared import already exists; if so, ensure it has all needed
    existing = EXISTING_IMPORT_RE.search(content)
    if existing:
        existing_line = existing.group(0)
        # Parse existing components
        m = re.search(r'\{([^}]*)\}', existing_line)
        if m:
            current = {x.strip() for x in m.group(1).split(',') if x.strip()}
            needed = set(used) | current
            if needed == current:
                return 'already-correct'
            # Replace with merged
            new_line = f'import {{ {", ".join(sorted(needed))} }} from "@/components/content/shared";\n'
            content = content[:existing.start()] + new_line + content[existing.end():]
            path.write_text(content, encoding='utf-8')
            return 'updated-existing'

    # No existing import — insert one
    new_import = f'import {{ {", ".join(used)} }} from "@/components/content/shared";\n'

    sn = SECTIONNAV_IMPORT_RE.search(content)
    if sn:
        insert_pos = sn.end()
        content = content[:insert_pos] + new_import + content[insert_pos:]
    else:
        uc = USE_CLIENT_RE.search(content)
        if uc:
            insert_pos = uc.end()
            content = content[:insert_pos] + '\n' + new_import + content[insert_pos:]
        else:
            content = new_import + content

    path.write_text(content, encoding='utf-8')
    return 'added'


def main():
    fixed = 0
    skipped = 0
    for f in ROOT.rglob('*.tsx'):
        result = fix_file(f)
        if result == 'added' or result == 'updated-existing':
            fixed += 1
            print(f"{result}: {f.relative_to(ROOT)}")
        else:
            skipped += 1
    print(f"\nFixed: {fixed}, Skipped: {skipped}")


if __name__ == '__main__':
    main()
