import { describe, it, expect } from 'vitest';
import { groupByMenuPath } from '@/lib/admin/group-tree';
import type { Comment, Attachment } from '@/lib/types';

function makeComment(id: string, contentPath: string): Comment {
  return {
    id,
    content_path: contentPath,
    body: 'x',
    author: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    status: 'pending',
    target_kind: 'content',
  };
}

describe('groupByMenuPath', () => {
  it('navigation 트리 prefix와 매칭하여 그룹핑', () => {
    const comments: Comment[] = [
      makeComment('a', 'acquisition/multi-house/multi-house'),
      makeComment('b', 'acquisition/exemption/rental-business'),
      makeComment('c', 'acquisition/exemption/rental-business'),
      makeComment('d', 'unknown/path'),
    ];
    const groups = groupByMenuPath(comments, []);

    // 그룹 중 acquisition을 찾는다
    const acq = groups.find((g) => g.key === 'acquisition');
    expect(acq).toBeDefined();
    expect(acq?.totalComments).toBeGreaterThanOrEqual(3);

    // 매칭 안 되는 항목은 '기타' 그룹
    const other = groups.find((g) => g.key === '__other__');
    expect(other).toBeDefined();
    expect(other?.comments.some((c) => c.id === 'd')).toBe(true);
  });

  it('첨부도 같은 그룹에 들어감', () => {
    const att: Attachment = {
      id: 'att-1',
      content_path: 'acquisition/rates',
      file_name: 'a.pdf',
      storage_path: 'a.pdf',
      file_size: 100,
      mime_type: 'application/pdf',
      uploaded_by: null,
      created_at: '2026-01-01T00:00:00Z',
      status: 'pending',
      target_kind: 'content',
    };
    const groups = groupByMenuPath([], [att]);
    const acq = groups.find((g) => g.key === 'acquisition');
    expect(acq).toBeDefined();
    expect(acq?.totalAttachments).toBeGreaterThanOrEqual(1);
  });

  it('빈 입력은 빈 결과', () => {
    expect(groupByMenuPath([], [])).toEqual([]);
  });
});
