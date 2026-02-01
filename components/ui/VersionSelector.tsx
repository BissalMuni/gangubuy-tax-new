'use client';

import { Select, Tag } from 'antd';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { ContentVersion } from '@/lib/types';

interface VersionSelectorProps {
  versions: ContentVersion[];
  currentVersion: string;
}

export function VersionSelector({
  versions,
  currentVersion,
}: VersionSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (versions.length <= 1) return null;

  const latestVersion = versions.find((v) => v.isLatest);
  const isViewingOlder =
    latestVersion && currentVersion !== latestVersion.version;

  const handleChange = (version: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (version === latestVersion?.version) {
      params.delete('v');
    } else {
      params.set('v', version);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Select
        size="small"
        value={currentVersion}
        onChange={handleChange}
        style={{ width: 100 }}
        options={versions.map((v) => ({
          value: v.version,
          label: `v${v.version}${v.isLatest ? ' (최신)' : ''}`,
        }))}
      />
      {isViewingOlder && (
        <Tag color="orange">이전 버전을 보고 있습니다</Tag>
      )}
    </div>
  );
}
