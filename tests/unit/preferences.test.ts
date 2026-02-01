import { describe, it, expect, beforeEach } from 'vitest';
import { usePreferencesStore } from '@/lib/stores/preferences';

describe('preferences store', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ fontSize: 'medium' });
  });

  it('should have default font size of medium', () => {
    const { fontSize } = usePreferencesStore.getState();
    expect(fontSize).toBe('medium');
  });

  it('should update font size', () => {
    usePreferencesStore.getState().setFontSize('large');
    expect(usePreferencesStore.getState().fontSize).toBe('large');
  });

  it('should accept small, medium, large values', () => {
    const { setFontSize } = usePreferencesStore.getState();

    setFontSize('small');
    expect(usePreferencesStore.getState().fontSize).toBe('small');

    setFontSize('medium');
    expect(usePreferencesStore.getState().fontSize).toBe('medium');

    setFontSize('large');
    expect(usePreferencesStore.getState().fontSize).toBe('large');
  });
});
