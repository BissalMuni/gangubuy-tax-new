import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { mdxComponents } from '@/components/mdx';
import { ContentHeader } from './ContentHeader';
import { CommentList } from '@/components/comments/CommentList';
import { AttachmentList } from '@/components/attachments/AttachmentList';
import { SectionsProvider } from '@/lib/context/sections-context';
import type { ContentMeta, ContentVersion } from '@/lib/types';

interface MDXRendererProps {
  meta: ContentMeta;
  source: string;
  versions?: ContentVersion[];
  contentPath?: string;
}

export function MDXRenderer({ meta, source, versions, contentPath }: MDXRendererProps) {
  return (
    <article>
      <ContentHeader meta={meta} versions={versions} showInteractionLinks={!!contentPath} />
      <SectionsProvider>
        <div style={{ fontSize: 'var(--content-font-size)' }}>
          <MDXRemote source={source} components={mdxComponents} options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }} />
        </div>
        {contentPath && (
          <div style={{ marginTop: 24 }}>
            <CommentList contentPath={contentPath} />
            <AttachmentList contentPath={contentPath} />
          </div>
        )}
      </SectionsProvider>
    </article>
  );
}
