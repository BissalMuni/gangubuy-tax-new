import {
  buildLawHref,
  LawLinkPropsSchema,
  type LawLinkProps,
} from '@/lib/content/law-link-schema';

interface Props extends LawLinkProps {
  children: React.ReactNode;
}

export function LawLink({ law, article, children }: Props) {
  // Runtime guard for AI-authored MDX. zod parse throws on invalid law names,
  // surfacing typos at render time rather than silently linking to a 404.
  LawLinkPropsSchema.parse({ law, article });

  const href = buildLawHref({ law, article });
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
