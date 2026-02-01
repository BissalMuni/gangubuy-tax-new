'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Spin, Divider } from 'antd';
import { mdxComponents } from '@/components/mdx';
import { ContentHeader } from './ContentHeader';
import { getNextPath } from '@/lib/navigation/contentSequence';
import type { ContentMeta, TaxCategory } from '@/lib/types';

interface LoadedSection {
  path: string;
  meta: ContentMeta;
  mdxSource: MDXRemoteSerializeResult;
}

interface InfiniteScrollLoaderProps {
  initialPath: string;
  category: TaxCategory;
  onVisiblePathChange?: (path: string) => void;
}

export function InfiniteScrollLoader({
  initialPath,
  category,
  onVisiblePathChange,
}: InfiniteScrollLoaderProps) {
  const [sections, setSections] = useState<LoadedSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const nextPathRef = useRef<string | null>(null);

  // Compute next path based on loaded sections
  useEffect(() => {
    const lastPath =
      sections.length > 0
        ? sections[sections.length - 1].path
        : initialPath;
    nextPathRef.current = getNextPath(lastPath);
    if (!nextPathRef.current) {
      setHasMore(false);
    }
  }, [sections, initialPath]);

  // Fetch next content
  const loadNext = useCallback(async () => {
    const nextPath = nextPathRef.current;
    if (!nextPath || loading) return;

    setLoading(true);
    try {
      // Extract slug from path: "/acquisition/themes/multi-house" → "themes/multi-house"
      const slug = nextPath
        .split('/')
        .filter(Boolean)
        .slice(1)
        .join('/');

      const res = await fetch(
        `/api/content?category=${category}&slug=${encodeURIComponent(slug)}`,
      );
      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const data = await res.json();
      setSections((prev) => [
        ...prev,
        { path: nextPath, meta: data.meta, mdxSource: data.mdxSource },
      ]);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, loading]);

  // IntersectionObserver for sentinel
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading) {
          loadNext();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadNext]);

  // IntersectionObserver for URL update and sidebar sync
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const path = entry.target.getAttribute('data-path');
            if (path) {
              history.replaceState(null, '', path);
              onVisiblePathChange?.(path);
            }
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    for (const [, el] of sectionRefs.current) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections, onVisiblePathChange]);

  // Track when scrolling back to initial content
  const initialRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!initialRef.current || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          history.replaceState(null, '', initialPath);
          onVisiblePathChange?.(initialPath);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    observer.observe(initialRef.current);
    return () => observer.disconnect();
  }, [initialPath, sections.length, onVisiblePathChange]);

  return (
    <>
      {/* Invisible marker for detecting when initial content is in view */}
      <div ref={initialRef} data-path={initialPath} style={{ height: 1 }} />

      {sections.map((section) => (
        <div
          key={section.path}
          data-path={section.path}
          ref={(el) => {
            if (el) sectionRefs.current.set(section.path, el);
          }}
        >
          <Divider />
          <article>
            <ContentHeader meta={section.meta} />
            <div style={{ fontSize: 'var(--content-font-size)' }}>
              <MDXRemote {...section.mdxSource} components={mdxComponents} />
            </div>
          </article>
        </div>
      ))}

      {/* Sentinel element for triggering next load */}
      {hasMore && (
        <div ref={sentinelRef} style={{ padding: '24px 0', textAlign: 'center' }}>
          {loading && <Spin tip="다음 콘텐츠 로딩 중..." />}
        </div>
      )}
    </>
  );
}
