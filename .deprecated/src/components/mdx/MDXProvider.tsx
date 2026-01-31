import React from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { Typography } from 'antd';
import { Alert } from './Alert';
import { DataTable } from './DataTable';
import { List, ListItem, SubItem } from './List';
import { Criteria, Condition } from './Criteria';
import { Comparison, ComparisonItem } from './Comparison';
import { Cases, Case, Analysis } from './Cases';
import { Steps, Step } from './Steps';
import { References, Reference } from './References';

const { Title, Paragraph } = Typography;

const components = {
  // MDX 커스텀 컴포넌트
  Alert,
  DataTable,
  List,
  ListItem,
  SubItem,
  Criteria,
  Condition,
  Comparison,
  ComparisonItem,
  Cases,
  Case,
  Analysis,
  Steps,
  Step,
  References,
  Reference,

  // HTML 요소 스타일링
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Title level={2} style={{ marginTop: 24, marginBottom: 16 }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Title level={3} style={{ marginTop: 20, marginBottom: 12 }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Title level={4} style={{ marginTop: 16, marginBottom: 8 }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Paragraph style={{ marginBottom: 12, lineHeight: 1.6, fontSize: 18 }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ marginLeft: 20, marginBottom: 12, fontSize: 18 }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 4, lineHeight: 1.6, fontSize: 18 }} {...props} />
  ),
};

interface MDXProviderProps {
  children: React.ReactNode;
}

export const MDXProvider: React.FC<MDXProviderProps> = ({ children }) => (
  <BaseMDXProvider components={components}>{children}</BaseMDXProvider>
);
