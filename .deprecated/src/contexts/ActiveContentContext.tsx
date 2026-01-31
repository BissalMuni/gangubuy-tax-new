import React, { createContext, useContext, useState, useCallback } from 'react';

interface ActiveContentContextType {
  activePath: string;
  setActivePath: (path: string) => void;
}

const ActiveContentContext = createContext<ActiveContentContextType | undefined>(undefined);

export const ActiveContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePath, setActivePathState] = useState('');

  const setActivePath = useCallback((path: string) => {
    setActivePathState(path);
  }, []);

  return (
    <ActiveContentContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </ActiveContentContext.Provider>
  );
};

export const useActiveContent = () => {
  const context = useContext(ActiveContentContext);
  if (!context) {
    throw new Error('useActiveContent must be used within ActiveContentProvider');
  }
  return context;
};
