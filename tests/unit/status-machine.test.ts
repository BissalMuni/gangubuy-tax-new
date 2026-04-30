import { describe, it, expect } from 'vitest';
import {
  canTransition,
  targetStatusOf,
  isTerminalStatus,
} from '@/lib/changes/status-machine';

describe('status-machine.canTransition', () => {
  it('pending → approved/rejected 허용', () => {
    expect(canTransition('pending', 'approved')).toBe(true);
    expect(canTransition('pending', 'rejected')).toBe(true);
  });

  it('approved → processing만 허용', () => {
    expect(canTransition('approved', 'processing')).toBe(true);
    expect(canTransition('approved', 'applied')).toBe(false);
  });

  it('processing → applied/failed 허용', () => {
    expect(canTransition('processing', 'applied')).toBe(true);
    expect(canTransition('processing', 'failed')).toBe(true);
  });

  it('failed → approved 재시도 허용', () => {
    expect(canTransition('failed', 'approved')).toBe(true);
  });

  it('applied/rejected는 종료 상태', () => {
    expect(isTerminalStatus('applied')).toBe(true);
    expect(isTerminalStatus('rejected')).toBe(true);
    expect(canTransition('applied', 'pending')).toBe(false);
    expect(canTransition('rejected', 'pending')).toBe(false);
  });

  it('역행 금지: approved → pending 등', () => {
    expect(canTransition('approved', 'pending')).toBe(false);
    expect(canTransition('processing', 'pending')).toBe(false);
    expect(canTransition('processing', 'approved')).toBe(false);
  });
});

describe('status-machine.targetStatusOf', () => {
  it('action을 status로 매핑', () => {
    expect(targetStatusOf('approve')).toBe('approved');
    expect(targetStatusOf('reject')).toBe('rejected');
    expect(targetStatusOf('process')).toBe('processing');
    expect(targetStatusOf('apply')).toBe('applied');
    expect(targetStatusOf('fail')).toBe('failed');
    expect(targetStatusOf('retry')).toBe('approved');
  });
});
