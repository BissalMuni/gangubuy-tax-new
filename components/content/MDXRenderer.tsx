import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';
import { ContentHeader } from './ContentHeader';
import { CommentList } from '@/components/comments/CommentList';
import { AttachmentList } from '@/components/attachments/AttachmentList';
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
      <div style={{ fontSize: 'var(--content-font-size)' }}>
        <MDXRemote source={source} components={mdxComponents} />
      </div>
      {contentPath && (
        <div style={{ marginTop: 24 }}>
          <CommentList contentPath={contentPath} />
          <AttachmentList contentPath={contentPath} />
        </div>
      )}
    </article>
  );
}
