import { Alert, Table as AntTable } from 'antd';
import { SectionNav } from './SectionNav';
import { AcquisitionThemeNav } from './AcquisitionThemeNav';
import { Outline } from './Outline';

interface CalloutProps {
  type?: 'info' | 'caution' | 'warning';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const typeMap = {
    info: 'info' as const,
    caution: 'warning' as const,
    warning: 'error' as const,
  };

  return (
    <Alert
      type={typeMap[type]}
      title={children}
      showIcon
      style={{ marginBottom: 16 }}
    />
  );
}

export const mdxComponents = {
  Callout,
  SectionNav,
  AcquisitionThemeNav,
  Outline,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table
        {...props}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'inherit',
        }}
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      style={{
        border: '1px solid #d9d9d9',
        padding: '8px 12px',
        backgroundColor: '#fafafa',
        fontWeight: 600,
        textAlign: 'left',
      }}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      style={{
        border: '1px solid #d9d9d9',
        padding: '8px 12px',
      }}
    />
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} style={{ fontSize: '1.75em', marginTop: 24, marginBottom: 16 }} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{ fontSize: '1.4em', marginTop: 20, marginBottom: 12 }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{ fontSize: '1.2em', marginTop: 16, marginBottom: 8 }} />
  ),
};
