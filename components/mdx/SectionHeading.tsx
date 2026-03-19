'use client';

import { useSections } from '@/lib/context/sections-context';
import { SectionCommentButton } from '@/components/comments/SectionCommentButton';

export function SectionHeading(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { id, children, ...rest } = props;
  const { sections } = useSections();

  const isSection = id && sections.some((s) => s.id === id);

  return (
    <h2 id={id} {...rest} style={{ fontSize: '1.4em', marginTop: 20, marginBottom: 12 }}>
      {children}
      {isSection && <SectionCommentButton sectionId={id} />}
    </h2>
  );
}
