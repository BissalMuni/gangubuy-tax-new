import { LawLink } from './LawLink';
import type { LawName } from '@/lib/content/law-link-schema';

export interface LawReferenceRow {
  kind: string;       // 구분 (예: 근거법, 시행령, 판례, 부칙)
  lawName: string;    // 법령명 표시 텍스트
  articleText: string; // 조항 셀 표시 텍스트 (예: §11①5, 2020두53972)
  note: string;       // 비고
  // law.go.kr 링크 가능한 경우만 제공. 미제공 시 articleText는 plain text.
  link?: {
    law: LawName;
    article?: string; // 제N조 또는 제N조의M
  };
}

interface Props {
  refs: LawReferenceRow[];
}

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';

const cell: React.CSSProperties = { border, padding: 8 };
const headerCell: React.CSSProperties = { ...cell, fontWeight: 'bold' };

export function LawReferenceTable({ refs }: Props) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: headerBg }}>
            <th style={headerCell}>구분</th>
            <th style={headerCell}>법령명</th>
            <th style={headerCell}>조항</th>
            <th style={headerCell}>비고</th>
          </tr>
        </thead>
        <tbody>
          {refs.map((r, i) => (
            <tr key={i}>
              <td style={cell}>{r.kind}</td>
              <td style={cell}>{r.lawName}</td>
              <td style={cell}>
                {r.link ? (
                  <LawLink law={r.link.law} article={r.link.article}>
                    {r.articleText}
                  </LawLink>
                ) : (
                  r.articleText
                )}
              </td>
              <td style={cell}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
