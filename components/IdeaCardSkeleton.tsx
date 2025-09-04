import React from 'react';

export const IdeaCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
      
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <ul className="space-y-3">
        <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></li>
        <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></li>
        <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
      </ul>
      
      <div className="mt-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};
