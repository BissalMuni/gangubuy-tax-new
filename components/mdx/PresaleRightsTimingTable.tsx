import {
  rightAcquisitionTiming,
  type RightAcquisitionTimingRow,
} from '@/content/data/presale-rights';

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';
const groupBgs: Record<RightAcquisitionTimingRow['rightType'], string> = {
  입주권: '#e6f7ff',
  주택분양권: '#fafafa',
};
const emphasisColor = '#cf1322';

const cell: React.CSSProperties = { border, padding: 10, verticalAlign: 'top' };
const headerCell: React.CSSProperties = { border, padding: 8, fontWeight: 'bold' };

function spanRun<T>(rows: T[], i: number, key: (r: T) => string): number {
  let n = 1;
  while (i + n < rows.length && key(rows[i + n]) === key(rows[i])) n++;
  return n;
}

function TimingCellContent({ timing, emphasis, notes }: RightAcquisitionTimingRow) {
  const idx = timing.indexOf(emphasis);
  const before = idx >= 0 ? timing.slice(0, idx) : '';
  const after = idx >= 0 ? timing.slice(idx + emphasis.length) : '';
  return (
    <>
      {before}
      <strong style={{ color: emphasisColor }}>{emphasis}</strong>
      {after}
      {notes.map((n, j) => (
        <div key={j} style={{ marginTop: 4 }}>
          {n}
        </div>
      ))}
    </>
  );
}

export function PresaleRightsTimingTable() {
  const rows = rightAcquisitionTiming;
  const groupKey = (r: RightAcquisitionTimingRow) => r.rightType;

  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: headerBg }}>
            <th style={{ ...headerCell, width: 120 }}>구분</th>
            <th style={{ ...headerCell, width: 180 }}>최초취득 / 승계취득</th>
            <th style={headerCell}>취득 시점</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isFirstOfGroup = i === 0 || groupKey(rows[i - 1]) !== groupKey(row);
            const groupBg = groupBgs[row.rightType];
            return (
              <tr key={i} style={{ backgroundColor: groupBg }}>
                {isFirstOfGroup && (
                  <td
                    rowSpan={spanRun(rows, i, groupKey)}
                    style={{
                      ...cell,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      fontSize: 14,
                      backgroundColor: groupBg,
                    }}
                  >
                    {row.rightType}
                  </td>
                )}
                <td style={{ ...cell, fontWeight: 'bold' }}>
                  {row.acquirerType}
                  <br />
                  <span style={{ fontWeight: 'normal', color: '#666' }}>
                    ({row.acquirerSubLabel})
                  </span>
                </td>
                <td style={cell}>
                  <TimingCellContent {...row} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
