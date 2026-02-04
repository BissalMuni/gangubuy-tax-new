'use client';

import { Tag, Typography, Tooltip } from 'antd';
import { CommentOutlined, PaperClipOutlined } from '@ant-design/icons';
import { VersionSelector } from '@/components/ui/VersionSelector';
import type { ContentMeta, ContentVersion } from '@/lib/types';

const { Title, Text } = Typography;

interface ContentHeaderProps {
  meta: ContentMeta;
  versions?: ContentVersion[];
  showInteractionLinks?: boolean;
}

export function ContentHeader({ meta, versions, showInteractionLinks = true }: ContentHeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ marginBottom: 24, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Title level={3} style={{ marginBottom: 0 }}>
          {meta.title}
        </Title>
        {showInteractionLinks && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tooltip title="댓글로 이동">
              <CommentOutlined
                style={{ fontSize: 18, color: '#1890ff', cursor: 'pointer' }}
                onClick={() => scrollToSection('comments-section')}
              />
            </Tooltip>
            <Tooltip title="첨부파일로 이동">
              <PaperClipOutlined
                style={{ fontSize: 18, color: '#1890ff', cursor: 'pointer' }}
                onClick={() => scrollToSection('attachments-section')}
              />
            </Tooltip>
          </div>
        )}
      </div>
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
