import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DEFAULT_FONT_SIZE,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  FONT_SIZE_STEP,
} from '@/lib/types';

interface PreferencesState {
  fontSize: number;
  darkMode: boolean;
  increase: () => void;
  decrease: () => void;
  toggleDarkMode: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      fontSize: DEFAULT_FONT_SIZE,
      darkMode: false,
      increase: () =>
        set({ fontSize: Math.min(get().fontSize + FONT_SIZE_STEP, MAX_FONT_SIZE) }),
      decrease: () =>
        set({ fontSize: Math.max(get().fontSize - FONT_SIZE_STEP, MIN_FONT_SIZE) }),
      toggleDarkMode: () => set({ darkMode: !get().darkMode }),
    }),
    {
      name: 'gangubuy-preferences',
    },
  ),
);
