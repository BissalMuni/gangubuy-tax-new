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
  if (process.env.NODE_ENV === 'development') return [];
  return getContentSlugs('corp-acquisition-tax').map((slug) => ({ slug }));
}

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const file = findContentFile('corp-acquisition-tax', params.slug, searchParams.v);
  if (!file) return { title: '페이지를 찾을 수 없습니다' };
  const { meta } = readMdxFile(file);
  return {
    title: `${meta.title} | 법인취득세 | GanguBuy Tax`,
    description: meta.description || `${meta.title} - 법인취득세 관련 문서`,
  };
}

export default function CorpAcquisitionTaxContentPage({ params, searchParams }: PageProps) {
  const file = findContentFile('corp-acquisition-tax', params.slug, searchParams.v);

  if (!file) {
    notFound();
  }

  const { meta, rawSource } = readMdxFile(file);
  const currentPath = `/corp-acquisition-tax/${params.slug.join('/')}`;
  const versions = getContentVersions('corp-acquisition-tax', params.slug);

  return (
    <ContentPageWrapper currentPath={currentPath} category="corp-acquisition-tax">
      <MDXRenderer meta={meta} source={rawSource} versions={versions} contentPath={currentPath.replace(/^\//, '')} />
    </ContentPageWrapper>
  );
}
