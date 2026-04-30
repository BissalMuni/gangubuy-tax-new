import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth/role-guard';

interface DispatchBody {
  /** 대상 워크플로 파일명 (기본: review-feedback.yml) */
  workflow?: string;
  /** 브랜치/refs (기본: main) */
  ref?: string;
}

const ALLOWED_WORKFLOWS = new Set(['review-feedback.yml', 'review-structure.yml']);

export async function POST(request: NextRequest) {
  try {
    // dispatch는 관리자 전용 — 비상 정지 상태에서도 통과 (FR-025)
    await requireSession(['admin']);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 403;
    return NextResponse.json({ error: 'forbidden' }, { status });
  }

  let body: DispatchBody = {};
  try {
    body = (await request.json()) as DispatchBody;
  } catch {
    // 빈 본문 허용 (기본값 사용)
  }

  const workflow = body.workflow && ALLOWED_WORKFLOWS.has(body.workflow)
    ? body.workflow
    : 'review-feedback.yml';
  const ref = body.ref && /^[\w./-]+$/.test(body.ref) ? body.ref : 'main';

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return NextResponse.json(
      { error: 'GITHUB_OWNER / GITHUB_REPO / GITHUB_TOKEN are not configured' },
      { status: 500 },
    );
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'network error';
    return NextResponse.json({ error: `dispatch failed: ${message}` }, { status: 502 });
  }

  if (response.status === 204) {
    return NextResponse.json({ ok: true, workflow, ref });
  }

  const text = await response.text().catch(() => '');
  return NextResponse.json(
    { error: 'dispatch rejected', status: response.status, detail: text.slice(0, 500) },
    { status: response.status },
  );
}
