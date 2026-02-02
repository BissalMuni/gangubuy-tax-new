import { describe, it, expect, beforeEach } from 'vitest';
import { usePreferencesStore } from '@/lib/stores/preferences';
import { DEFAULT_FONT_SIZE, MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_STEP } from '@/lib/types';

describe('preferences store', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ fontSize: DEFAULT_FONT_SIZE });
  });

  it('should have default font size', () => {
    const { fontSize } = usePreferencesStore.getState();
    expect(fontSize).toBe(DEFAULT_FONT_SIZE);
  });

  it('should increase font size by step', () => {
    usePreferencesStore.getState().increase();
    expect(usePreferencesStore.getState().fontSize).toBe(DEFAULT_FONT_SIZE + FONT_SIZE_STEP);
  });

  it('should decrease font size by step', () => {
    usePreferencesStore.getState().decrease();
    expect(usePreferencesStore.getState().fontSize).toBe(DEFAULT_FONT_SIZE - FONT_SIZE_STEP);
  });

  it('should not exceed MAX_FONT_SIZE', () => {
    usePreferencesStore.setState({ fontSize: MAX_FONT_SIZE });
    usePreferencesStore.getState().increase();
    expect(usePreferencesStore.getState().fontSize).toBe(MAX_FONT_SIZE);
  });

  it('should not go below MIN_FONT_SIZE', () => {
    usePreferencesStore.setState({ fontSize: MIN_FONT_SIZE });
    usePreferencesStore.getState().decrease();
    expect(usePreferencesStore.getState().fontSize).toBe(MIN_FONT_SIZE);
  });
});
