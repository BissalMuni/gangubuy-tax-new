import { notFound } from 'next/navigation';
import { corpAcquisitionTax } from '@/book/corp-acquisition-tax';
import { findNodeBySlugs } from '@/book';
import { TopicPage } from '@/components/content/topic-page';

export default async function CorpAcquisitionTaxCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const node = findNodeBySlugs(corpAcquisitionTax.children, slug);
  if (!node) notFound();

  return <TopicPage node={node} slugs={slug} basePath="corp-acquisition-tax" book={corpAcquisitionTax} />;
}
