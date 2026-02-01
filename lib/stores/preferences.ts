import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FontSize } from '@/lib/types';

interface PreferencesState {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'gangubuy-preferences',
    },
  ),
);
