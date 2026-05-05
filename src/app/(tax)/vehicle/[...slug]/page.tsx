import { notFound } from 'next/navigation';
import { vehicle } from '@/lib/book/vehicle';
import { findNodeBySlugs } from '@/lib/book';
import { TopicPage } from '@/components/content/topic-page';

export default async function VehicleCatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const node = findNodeBySlugs(vehicle.children, slug);
  if (!node) notFound();

  return <TopicPage node={node} slugs={slug} basePath="vehicle" book={vehicle} />;
}
