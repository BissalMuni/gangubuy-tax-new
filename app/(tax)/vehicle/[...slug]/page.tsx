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
  return getContentSlugs('vehicle').map((slug) => ({ slug }));
}

export function generateMetadata({ params, searchParams }: PageProps): Metadata {
  const file = findContentFile('vehicle', params.slug, searchParams.v);
  if (!file) return { title: '페이지를 찾을 수 없습니다' };
  const { meta } = readMdxFile(file);
  return {
    title: `${meta.title} | 자동차세 | GanguBuy Tax`,
    description: meta.description || `${meta.title} - 자동차세 관련 문서`,
  };
}

export default function VehicleContentPage({ params, searchParams }: PageProps) {
  const file = findContentFile('vehicle', params.slug, searchParams.v);

  if (!file) {
    notFound();
  }

  const { meta, rawSource } = readMdxFile(file);
  const currentPath = `/vehicle/${params.slug.join('/')}`;
  const versions = getContentVersions('vehicle', params.slug);

  return (
    <ContentPageWrapper currentPath={currentPath} category="vehicle">
      <MDXRenderer meta={meta} source={rawSource} versions={versions} />
    </ContentPageWrapper>
  );
}
