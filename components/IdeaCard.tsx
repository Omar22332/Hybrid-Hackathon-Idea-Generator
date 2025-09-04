import React, { useState } from 'react';
import { Idea } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ShareIcon } from './icons/ShareIcon';
import { CheckIcon } from './icons/CheckIcon';

interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { t, direction } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const ideaText = `
${t('clipboardTitle')}: ${idea.title}
${t('clipboardDescription')}: ${idea.description}
${t('clipboardFeatures')}:
${idea.features.map(f => `- ${f}`).join('\n')}
${t('clipboardTargetAudience')}: ${idea.targetAudience}
    `;
    navigator.clipboard.writeText(ideaText.trim())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy idea: ', err));
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative" dir={direction}>
      <button 
        onClick={handleShare}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label={copied ? t('shareCopiedAriaLabel') : t('shareAriaLabel')}
      >
        {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <ShareIcon className="h-5 w-5" />}
      </button>

      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3">{idea.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{idea.description}</p>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('featuresTitle')}</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {idea.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('audienceTitle')}</h4>
        <p className="text-gray-600 dark:text-gray-300">{idea.targetAudience}</p>
      </div>
    </div>
  );
};