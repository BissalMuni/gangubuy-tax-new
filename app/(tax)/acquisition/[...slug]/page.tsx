import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRenderer } from '@/components/content/MDXRenderer';
import { ContentPageWrapper } from '@/components/content/ContentPageWrapper';
import { findContentFile, readMdxFile, getContentSlugs } from '@/lib/content/loader';
import { getContentVersions } from '@/lib/content/versions';

interface PageProps {
  params: { slug: string[] };
  searchParams: { v?: string };
}

export function generateStaticParams() {
  return getContentSlugs('acquisition').map((slug) => ({ slug }));
}

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const file = findContentFile('acquisition', params.slug, searchParams.v);
  if (!file) return { title: '페이지를 찾을 수 없습니다' };
  const { meta } = readMdxFile(file);
  return {
    title: `${meta.title} | 취득세 | GanguBuy Tax`,
    description: meta.description || `${meta.title} - 취득세 관련 문서`,
  };
}

export default function AcquisitionContentPage({ params, searchParams }: PageProps) {
  const file = findContentFile('acquisition', params.slug, searchParams.v);

  if (!file) {
    notFound();
  }

  const { meta, rawSource } = readMdxFile(file);
  const currentPath = `/acquisition/${params.slug.join('/')}`;
  const versions = getContentVersions('acquisition', params.slug);

  return (
    <ContentPageWrapper currentPath={currentPath} category="acquisition">
      <MDXRenderer meta={meta} source={rawSource} versions={versions} />
    </ContentPageWrapper>
  );
}
