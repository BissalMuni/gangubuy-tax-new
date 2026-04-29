import { luxuryOverlapRates } from '@/content/data/luxury-overlap-rates';

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';
const totalColor = '#cf1322';

const cell: React.CSSProperties = { border, padding: 8 };
const headerCell: React.CSSProperties = { ...cell, fontWeight: 'bold' };

export function LuxuryOverlapTable() {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: headerBg }}>
            <th style={headerCell}>상황</th>
            <th style={headerCell}>기본 중과</th>
            <th style={headerCell}>추가 중과</th>
            <th style={{ ...headerCell, color: totalColor }}>합계</th>
          </tr>
        </thead>
        <tbody>
          {luxuryOverlapRates.map((row, i) => (
            <tr key={i}>
              <td style={cell}>{row.situation}</td>
              <td style={cell}>{row.baseRate}</td>
              <td style={cell}>{row.additionalRate}</td>
              <td style={{ ...cell, fontWeight: 'bold', color: totalColor }}>{row.totalRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
