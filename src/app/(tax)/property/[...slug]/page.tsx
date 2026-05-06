import { notFound } from 'next/navigation';
import { property } from '@/book/property';
import { findNodeBySlugs } from '@/book';
import { TopicPage } from '@/components/content/topic-page';

export default async function PropertyCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const node = findNodeBySlugs(property.children, slug);
  if (!node) notFound();

  return <TopicPage node={node} slugs={slug} basePath="property" book={property} />;
}
