import { presaleRateTimeline } from '@/content/data/presale-rights';

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';
const highlightBg = '#e6f7ff';

const cell: React.CSSProperties = { border, padding: 8 };
const headerCell: React.CSSProperties = { ...cell, fontWeight: 'bold' };

export function PresaleRateTimelineTable() {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: headerBg }}>
            <th style={headerCell}>사례</th>
            <th style={headerCell}>분양권 계약일</th>
            <th style={headerCell}>세율 적용</th>
          </tr>
        </thead>
        <tbody>
          {presaleRateTimeline.map((row, i) => (
            <tr key={i} style={row.highlight ? { backgroundColor: highlightBg } : undefined}>
              <td style={cell}>{row.caseLabel}</td>
              <td style={cell}>{row.contractPeriod}</td>
              <td style={cell}>{row.rateApplication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
