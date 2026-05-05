import { notFound } from 'next/navigation';
import { acquisition } from '@/lib/book/acquisition';
import { findNodeBySlugs } from '@/lib/book';
import { TopicPage } from '@/components/content/topic-page';

export default async function AcquisitionCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const node = findNodeBySlugs(acquisition.children, slug);
  if (!node) notFound();

  return <TopicPage node={node} slugs={slug} basePath="acquisition" book={acquisition} />;
}
