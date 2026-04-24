import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx';
import { ContentHeader } from './ContentHeader';
import { CommentList } from '@/components/comments/CommentList';
import { AttachmentList } from '@/components/attachments/AttachmentList';
import { SectionsProvider } from '@/lib/context/sections-context';
import { SectionCommentButtons } from '@/components/comments/SectionCommentButtons';
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
      <SectionsProvider initialContentPath={contentPath}>
        <div style={{ fontSize: 'var(--content-font-size)' }}>
          <MDXRemote
            source={source}
            components={mdxComponents}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
              blockJS: false,
              blockDangerousJS: false,
            }}
          />
        </div>
        <SectionCommentButtons />
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
