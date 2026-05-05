'use client';

import { ThemeNav } from './ThemeNav';
import { acquisitionThemes } from '@/config/themes';

export function AcquisitionThemeNav() {
  return <ThemeNav themes={acquisitionThemes} />;
}
