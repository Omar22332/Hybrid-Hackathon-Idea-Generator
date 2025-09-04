import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSelector } from './LanguageSelector';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-8 w-8 text-purple-500" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {t('appTitle')}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
