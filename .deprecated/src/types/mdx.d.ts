declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const meta: {
    id: string;
    title: string;
    description: string;
    category: 'acquisition' | 'property';
    lastUpdated: string;
    version: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
