import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Locale, Direction, CategorySet, Language } from '../types';
import arTranslations from '../locales/ar';
import enTranslations from '../locales/en';
import esTranslations from '../locales/es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  direction: Direction;
  categories: CategorySet[];
  languages: Language[];
}

const allTranslations: Record<Locale, any> = {
  ar: arTranslations,
  en: enTranslations,
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages: Language[] = [
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'es', name: 'Español', dir: 'ltr' },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
      const storedLang = localStorage.getItem('locale');
      return (storedLang && ['ar', 'en', 'es'].includes(storedLang) ? storedLang : 'ar') as Locale;
  });
  
  const translations = allTranslations[locale];

  useEffect(() => {
    const langData = languages.find(l => l.code === locale);
    if (langData) {
        document.documentElement.lang = locale;
        document.documentElement.dir = langData.dir;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };
  
  const t = (key: string): string => {
    return translations[key] || key;
  };
  
  const direction = useMemo(() => languages.find(l => l.code === locale)?.dir || 'rtl', [locale]);
  const categories = useMemo(() => translations.categories || [], [translations]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
    direction,
    categories,
    languages
  }), [locale, translations, direction, categories]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
