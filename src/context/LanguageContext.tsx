import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { DEFAULT_LANGUAGE_LABEL, SUPPORTED_LANGUAGES } from '@/constants/languages';

export interface LanguageContextValue {
  currentLanguageLabel: string;
  handleLanguageChange: (label: string | null) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n: i18nInstance } = useTranslation();

  const currentLanguageLabel =
    SUPPORTED_LANGUAGES.find((lang) => lang.value === i18nInstance.language)?.label ||
    DEFAULT_LANGUAGE_LABEL;

  const handleLanguageChange = useCallback((label: string | null) => {
    if (!label) {
      return;
    }

    const selected = SUPPORTED_LANGUAGES.find((language) => language.label === label);
    if (selected) {
      i18n.changeLanguage(selected.value);
      localStorage.setItem('lang', selected.value);
    }
  }, []);

  const value = useMemo(
    () => ({ currentLanguageLabel, handleLanguageChange }),
    [currentLanguageLabel, handleLanguageChange]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
