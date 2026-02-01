import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';
import { ContentHeader } from './ContentHeader';
import type { ContentMeta, ContentVersion } from '@/lib/types';

interface MDXRendererProps {
  meta: ContentMeta;
  source: string;
  versions?: ContentVersion[];
}

export function MDXRenderer({ meta, source, versions }: MDXRendererProps) {
  return (
    <article>
      <ContentHeader meta={meta} versions={versions} />
      <div style={{ fontSize: 'var(--content-font-size)' }}>
        <MDXRemote source={source} components={mdxComponents} />
      </div>
    </article>
  );
}
