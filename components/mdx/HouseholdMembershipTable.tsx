import { Fragment } from 'react';
import {
  householdMembers,
  type HouseholdMemberRow,
} from '@/content/data/household-membership';

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';
const evenRowBg = '#e6f7ff';
const neverRowBg = '#fafafa';
const greenColor = '#52c41a';
const redColor = '#cf1322';

const cell: React.CSSProperties = { border, padding: 8 };
const headerCell: React.CSSProperties = { ...cell, fontWeight: 'bold' };

function statusStyle(kind: HouseholdMemberRow['statusKind']): React.CSSProperties {
  if (kind === 'same') return { color: greenColor, fontWeight: 'bold' };
  if (kind === 'never') return { color: redColor, fontWeight: 'bold' };
  return {};
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Very small parser: only handles **bold**.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

function renderMultilineCategory(text: string): React.ReactNode {
  return text.split('\n').map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ));
}

export function HouseholdMembershipTable() {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: headerBg }}>
            <th style={{ ...headerCell, width: 140 }}>구분</th>
            <th style={{ ...headerCell, width: 120 }}>동일세대 여부</th>
            <th style={headerCell}>조건 / 비고</th>
          </tr>
        </thead>
        <tbody>
          {householdMembers.map((row, i) => {
            const rowBg =
              row.statusKind === 'never'
                ? neverRowBg
                : i % 2 === 0
                  ? evenRowBg
                  : undefined;
            const categoryStyle: React.CSSProperties = {
              ...cell,
              fontWeight: 'bold',
              ...(row.statusKind === 'never' ? { color: redColor } : {}),
            };
            return (
              <tr key={i} style={rowBg ? { backgroundColor: rowBg } : undefined}>
                <td style={categoryStyle}>{renderMultilineCategory(row.category)}</td>
                <td style={{ ...cell, textAlign: 'center', ...statusStyle(row.statusKind) }}>
                  {row.status}
                </td>
                <td style={cell}>{renderInlineMarkdown(row.condition)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
