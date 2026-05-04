import { redirect } from 'next/navigation';
import { Card, Space, Typography, Divider } from 'antd';
import { getCurrentSession, hasRole } from '@/lib/auth/role-guard';
import { loadAutomationSettings } from '@/lib/supabase/automation-settings';
import { ModeToggle } from '@/components/admin/ModeToggle';
import { PathOverrideEditor } from '@/components/admin/PathOverrideEditor';
import { SystemPromptEditor } from '@/components/admin/SystemPromptEditor';
import { DispatchButton } from '@/components/admin/DispatchButton';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getCurrentSession();
  if (!session) redirect('/admin/login?from=/admin/settings');
  if (!hasRole(session, ['admin'])) redirect('/admin/changes');

  const settings = await loadAutomationSettings();

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <header style={{ marginBottom: 24 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          관리 설정
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          마지막 갱신: {new Date(settings.updated_at).toLocaleString('ko-KR')} ·{' '}
          {settings.updated_by ?? '(미기록)'}
        </Typography.Paragraph>
      </header>

      <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 920 }}>
        <Card title="자동화 모드 / 비상 정지">
          <ModeToggle
            initialMode={settings.mode}
            initialCronEnabled={settings.cron_enabled}
            canEdit
          />
          <Divider />
          <DispatchButton />
        </Card>

        <Card title="경로별 모드 강제">
          <PathOverrideEditor initial={settings.path_overrides} canEdit />
        </Card>

        <Card title="AI 시스템 프롬프트">
          <SystemPromptEditor initial={settings.system_prompt} canEdit />
        </Card>
      </Space>
    </div>
  );
}
