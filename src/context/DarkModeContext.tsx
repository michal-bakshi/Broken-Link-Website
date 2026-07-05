import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { DARK_MODE_CONTEXT_ERROR } from '@/constants/context.consts';

export interface DarkModeContextValue {
  isDark: boolean;
}

export const DarkModeContext = createContext<DarkModeContextValue | null>(null);

interface DarkModeProviderProps {
  children: ReactNode;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const value = useMemo(() => ({ isDark }), [isDark]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode(): DarkModeContextValue {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(DARK_MODE_CONTEXT_ERROR);
  }

  return context;
}
