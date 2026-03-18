'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export interface Section {
  id: string;
  label: string;
}

interface SectionsContextType {
  sections: Section[];
  registerSections: (sections: Section[]) => void;
}

const SectionsContext = createContext<SectionsContextType>({
  sections: [],
  registerSections: () => {},
});

export function SectionsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);

  const registerSections = useCallback((newSections: Section[]) => {
    setSections((prev) => {
      const existingIds = new Set(prev.map((s) => s.id));
      const toAdd = newSections.filter((s) => !existingIds.has(s.id));
      return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
    });
  }, []);

  return (
    <SectionsContext.Provider value={{ sections, registerSections }}>
      {children}
    </SectionsContext.Provider>
  );
}

export const useSections = () => useContext(SectionsContext);
