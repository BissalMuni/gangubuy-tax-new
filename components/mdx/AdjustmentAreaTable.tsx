import { adjustmentAreas, type AdjustmentArea } from '@/content/data/adjustment-areas';

const border = '1px solid #d9d9d9';
const headerBg = '#fafafa';
const highlightBg = '#e6f7ff';

const headerCell: React.CSSProperties = {
  border,
  padding: 8,
  fontWeight: 'bold',
  backgroundColor: headerBg,
};

const cell: React.CSSProperties = {
  border,
  padding: 8,
};

const dateCell: React.CSSProperties = {
  ...cell,
  fontWeight: 'bold',
  backgroundColor: headerBg,
  verticalAlign: 'top',
};

const regionCell: React.CSSProperties = {
  ...cell,
  fontWeight: 'bold',
  backgroundColor: headerBg,
};

const sourceCell: React.CSSProperties = {
  ...cell,
  fontSize: 12,
  color: '#666',
};

function formatDate(iso: string): string {
  return iso.replace(/-/g, '.');
}

function AreaGroup({ area }: { area: AdjustmentArea }) {
  const totalRows = area.rows.length + 1;
  return (
    <>
      {area.rows.map((row, i) => {
        const rowBg = row.highlight ? highlightBg : undefined;
        return (
          <tr key={`${area.effectiveDate}-${i}`}>
            {i === 0 && (
              <td rowSpan={totalRows} style={{ ...dateCell, width: 120 }}>
                {formatDate(area.effectiveDate)}
              </td>
            )}
            <td style={{ ...regionCell, width: 80, backgroundColor: rowBg ?? headerBg }}>
              {row.region}
            </td>
            <td style={{ ...cell, backgroundColor: rowBg }}>{row.districts}</td>
          </tr>
        );
      })}
      <tr>
        <td colSpan={2} style={sourceCell}>
          *{' '}
          <a href={area.source.url} target="_blank" rel="noopener noreferrer">
            {area.source.label}
          </a>
          {area.source.suffix ? ` ${area.source.suffix}` : null}
        </td>
      </tr>
    </>
  );
}

export function AdjustmentAreaTable() {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...headerCell, width: 120 }}>시행일</th>
            <th style={{ ...headerCell, width: 80 }}>구분</th>
            <th style={headerCell}>지역</th>
          </tr>
        </thead>
        <tbody>
          {adjustmentAreas.map((area) => (
            <AreaGroup key={area.effectiveDate} area={area} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
