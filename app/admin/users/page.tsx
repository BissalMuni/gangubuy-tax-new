import { redirect } from 'next/navigation';
import { Card, Space, Typography, Alert } from 'antd';
import { getCurrentSession, hasRole } from '@/lib/auth/role-guard';
import { getAuthPhase } from '@/lib/auth/session';
import { getSupabase } from '@/lib/supabase/server';
import { UserInviteForm } from '@/components/admin/UserInviteForm';
import { UserList } from '@/components/admin/UserList';
import type { AppRole } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

interface UserRow {
  id: string;
  email: string;
  roles: AppRole[];
  active: boolean;
  invited_by: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 사용자 관리 페이지 (관리자 전용, Phase 2 활성).
 *
 * Phase 1에서는 의미 없으므로 안내 배너 + 빈 폼.
 */
export default async function AdminUsersPage() {
  const session = await getCurrentSession();
  if (!session) redirect('/admin/login?from=/admin/users');
  if (!hasRole(session, ['admin'])) redirect('/admin/changes');

  const phase = getAuthPhase();

  let users: UserRow[] = [];
  let loadError: string | null = null;

  if (phase === 2) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('id, email, roles, active, invited_by, created_at, updated_at')
      .order('created_at', { ascending: false });
    if (error) {
      loadError = error.message;
    } else {
      users = (data ?? []) as UserRow[];
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <header style={{ marginBottom: 24 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          사용자 관리
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          관리자 / 승인자 / 담당자 초대, 역할 변경, 비활성화.
        </Typography.Paragraph>
      </header>

      {phase !== 2 && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Phase 2 비활성"
          description="환경변수 AUTH_PHASE=2 로 전환한 후에만 사용자 초대/관리가 가능합니다. 현재는 Phase 1 비번 게이트 운영 중."
        />
      )}

      {loadError && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="사용자 목록 로드 실패"
          description={loadError}
        />
      )}

      <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 920 }}>
        <Card title="사용자 초대">
          <UserInviteForm disabled={phase !== 2} />
        </Card>

        <Card title={`사용자 목록 (${users.length})`}>
          <UserList initialUsers={users} canEdit={phase === 2} />
        </Card>
      </Space>
    </div>
  );
}
