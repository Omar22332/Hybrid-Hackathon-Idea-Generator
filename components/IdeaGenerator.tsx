import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShuffleIcon } from './icons/ShuffleIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface IdeaGeneratorProps {
  onGenerate: (category1: string, category2: string) => void;
  isLoading: boolean;
}

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onGenerate, isLoading }) => {
  const { t, categories } = useLanguage();

  const techCategory = categories && categories.length > 0 ? categories[0] : { name: '', options: [] };
  const industryCategory = categories && categories.length > 1 ? categories[1] : { name: '', options: [] };

  const [category1, setCategory1] = useState(techCategory.options[0] || '');
  const [category2, setCategory2] = useState(industryCategory.options[0] || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category1 && techCategory.options.length > 0) {
      setCategory1(techCategory.options[0]);
    }
    if (!category2 && industryCategory.options.length > 0) {
      setCategory2(industryCategory.options[0]);
    }
  }, [categories, techCategory, industryCategory, category1, category2]);

  const handleGenerate = () => {
    if (category1 === category2) { // This check remains for safety, though categories are from different lists
      setError(t('errorSameCategory'));
      return;
    }
    setError('');
    onGenerate(category1, category2);
  };
  
  const handleShuffle = () => {
      if (techCategory.options.length < 1 || industryCategory.options.length < 1) return;
      
      const newCat1 = techCategory.options[Math.floor(Math.random() * techCategory.options.length)];
      const newCat2 = industryCategory.options[Math.floor(Math.random() * industryCategory.options.length)];

      setCategory1(newCat1);
      setCategory2(newCat2);
      setError('');
      // NOTE: This no longer calls onGenerate directly, improving user experience.
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <SparklesIcon className="h-6 w-6 text-purple-500" />
        {t('generatorTitle')}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{t('generatorSubtitle')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="category1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{techCategory.name}</label>
          <select
            id="category1"
            value={category1}
            onChange={(e) => setCategory1(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
            disabled={isLoading || techCategory.options.length === 0}
          >
            {techCategory.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{industryCategory.name}</label>
          <select
            id="category2"
            value={category2}
            onChange={(e) => setCategory2(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
            disabled={isLoading || industryCategory.options.length === 0}
          >
            {industryCategory.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !category1 || !category2}
          className="w-full flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-purple-400 dark:disabled:bg-purple-800 disabled:cursor-not-allowed transition"
        >
          {isLoading ? t('generatingButton') : t('generateButton')}
        </button>
        <button
            onClick={handleShuffle}
            disabled={isLoading}
            aria-label={t('shuffleAriaLabel')}
            className="w-full sm:w-auto p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
        >
            <ShuffleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};