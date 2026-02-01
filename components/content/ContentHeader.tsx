import { Tag, Typography } from 'antd';
import { VersionSelector } from '@/components/ui/VersionSelector';
import type { ContentMeta, ContentVersion } from '@/lib/types';

const { Title, Text } = Typography;

interface ContentHeaderProps {
  meta: ContentMeta;
  versions?: ContentVersion[];
}

export function ContentHeader({ meta, versions }: ContentHeaderProps) {
  return (
    <div style={{ marginBottom: 24, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
      <Title level={3} style={{ marginBottom: 8 }}>
        {meta.title}
      </Title>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {versions && versions.length > 1 ? (
          <VersionSelector versions={versions} currentVersion={meta.version} />
        ) : (
          <Tag color="blue">v{meta.version}</Tag>
        )}
        {meta.legalBasis && <Tag>{meta.legalBasis}</Tag>}
        {meta.lastUpdated && (
          <Text type="secondary" style={{ fontSize: 13 }}>
            최종 수정: {meta.lastUpdated}
          </Text>
        )}
      </div>
    </div>
  );
}
