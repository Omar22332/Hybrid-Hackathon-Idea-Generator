import React from 'react';
import { Idea } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TrashIcon } from './icons/TrashIcon';

interface HistoryPanelProps {
  history: Idea[];
  onSelect: (idea: Idea) => void;
  onClear: () => void;
  activeIdeaId?: string;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear, activeIdeaId }) => {
  const { t, direction } = useLanguage();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full" dir={direction}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('historyTitle')}</h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t('clearHistoryAriaLabel')}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t('historyEmpty')}</p>
      ) : (
        <ul className="space-y-3 overflow-y-auto max-h-[60vh]">
          {history.map((idea) => (
            <li key={idea.id}>
              <button
                onClick={() => onSelect(idea)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  idea.id === activeIdeaId
                    ? 'bg-purple-100 dark:bg-purple-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <p className="font-semibold text-purple-600 dark:text-purple-400 truncate">{idea.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{idea.description}</p>
                 {idea.timestamp && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(idea.timestamp).toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'short'})}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};