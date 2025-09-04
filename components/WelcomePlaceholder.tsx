import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { useLanguage } from '../contexts/LanguageContext';

export const WelcomePlaceholder: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center p-12 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex justify-center mb-4">
        <LightbulbIcon className="h-16 w-16 text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {t('welcomeTitle')}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        {t('welcomeSubtitle')}
      </p>
    </div>
  );
};