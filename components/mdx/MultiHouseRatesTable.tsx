import {
  multiHouseRates,
  type MultiHouseRateRow,
  type RateView,
  type PaidRateRow,
  type SimpleRateRow,
} from '@/content/data/multi-house-rates';

const border = '1px solid #d9d9d9';
const headerBg = '#f0f0f0';
const subHeaderBg = '#fafafa';

const colors = {
  total: '#cf1322',
  acquisition: '#1890ff',
  education: '#52c41a',
  ruralSpecial: '#fa8c16',
  heavy: '#cf1322',
} as const;

const cell: React.CSSProperties = { border, padding: 8 };
const payerCell: React.CSSProperties = { ...cell, fontWeight: 'bold', backgroundColor: subHeaderBg };
const headerCell: React.CSSProperties = { ...cell, fontWeight: 'bold' };
const headerRowStyle: React.CSSProperties = { backgroundColor: headerBg };

function spanRun<T>(rows: T[], i: number, key: (r: T) => string): number {
  let n = 1;
  while (i + n < rows.length && key(rows[i + n]) === key(rows[i])) n++;
  return n;
}

function PaidBody({ rows }: { rows: PaidRateRow[] }) {
  const payerKey = (r: PaidRateRow) => `${r.payer}|${r.priceRange ? 'p' : 'np'}`;
  const householdKey = (r: PaidRateRow) =>
    `${payerKey(r)}|${r.households}|${r.priceRange ?? ''}`;
  const priceKey = householdKey;

  return (
    <>
      {rows.map((row, i) => {
        const isFirstPayer = i === 0 || payerKey(rows[i - 1]) !== payerKey(row);
        const isFirstHouse = i === 0 || householdKey(rows[i - 1]) !== householdKey(row);
        const isFirstPrice = i === 0 || priceKey(rows[i - 1]) !== priceKey(row);
        const heavyStyle: React.CSSProperties = row.isHeavy
          ? { color: colors.heavy, fontWeight: 'bold' }
          : { fontWeight: 'bold' };

        return (
          <tr key={i}>
            {isFirstPayer && (
              <td rowSpan={spanRun(rows, i, payerKey)} style={payerCell}>
                {row.payer}
              </td>
            )}
            {isFirstHouse && (
              <td rowSpan={spanRun(rows, i, householdKey)} style={cell}>
                {row.households}
              </td>
            )}
            {isFirstPrice && (
              <td rowSpan={spanRun(rows, i, priceKey)} style={cell}>
                {row.priceRange ?? ''}
              </td>
            )}
            <td style={cell}>{row.area}</td>
            <td style={{ ...cell, ...heavyStyle }}>{row.total}</td>
            <td style={{ ...cell, color: colors.acquisition }}>{row.acquisition}</td>
            <td style={{ ...cell, color: colors.education }}>{row.education}</td>
            <td style={{ ...cell, color: colors.ruralSpecial }}>{row.ruralSpecial}</td>
          </tr>
        );
      })}
    </>
  );
}

function SimpleBody({ rows }: { rows: SimpleRateRow[] }) {
  const payerKey = (r: SimpleRateRow) => r.payer;
  return (
    <>
      {rows.map((row, i) => {
        const isFirstPayer = i === 0 || payerKey(rows[i - 1]) !== payerKey(row);
        const heavyStyle: React.CSSProperties = row.isHeavy
          ? { color: colors.heavy, fontWeight: 'bold' }
          : { fontWeight: 'bold' };
        return (
          <tr key={i}>
            {isFirstPayer && (
              <td rowSpan={spanRun(rows, i, payerKey)} style={payerCell}>
                {row.payer}
              </td>
            )}
            <td style={cell}>{row.area}</td>
            <td style={{ ...cell, ...heavyStyle }}>{row.total}</td>
            <td style={{ ...cell, color: colors.acquisition }}>{row.acquisition}</td>
            <td style={{ ...cell, color: colors.education }}>{row.education}</td>
            <td style={{ ...cell, color: colors.ruralSpecial }}>{row.ruralSpecial}</td>
          </tr>
        );
      })}
    </>
  );
}

interface Props {
  view: RateView;
}

export function MultiHouseRatesTable({ view }: Props) {
  const rows = multiHouseRates.filter((r): r is MultiHouseRateRow => r.view === view);
  const isPaid = view === 'paid-adjusted' || view === 'paid-non-adjusted';

  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={headerCell}>납세자</th>
            {isPaid && <th style={headerCell}>주택수</th>}
            {isPaid && <th style={headerCell}>가격</th>}
            <th style={headerCell}>면적</th>
            <th style={{ ...headerCell, color: colors.total }}>합계</th>
            <th style={{ ...headerCell, color: colors.acquisition }}>취득세</th>
            <th style={{ ...headerCell, color: colors.education }}>지방교육세</th>
            <th style={{ ...headerCell, color: colors.ruralSpecial }}>농특세</th>
          </tr>
        </thead>
        <tbody>
          {isPaid ? (
            <PaidBody rows={rows as PaidRateRow[]} />
          ) : (
            <SimpleBody rows={rows as SimpleRateRow[]} />
          )}
        </tbody>
      </table>
    </div>
  );
}
