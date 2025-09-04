import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IdeaGenerator } from './components/IdeaGenerator';
import { IdeaCard } from './components/IdeaCard';
import { WelcomePlaceholder } from './components/WelcomePlaceholder';
import { IdeaCardSkeleton } from './components/IdeaCardSkeleton';
import { HistoryPanel } from './components/HistoryPanel';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { generateHackathonIdea } from './services/geminiService';
import { Idea } from './types';

const AppContent: React.FC = () => {
  const [history, setHistory] = useState<Idea[]>(() => {
    try {
      const savedHistory = localStorage.getItem('hackathon_ideas_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      return [];
    }
  });

  const [idea, setIdea] = useState<Idea | null>(() => {
    // On initial load, set the current idea to the most recent one from history
    if (history.length > 0) {
      return history[0];
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { locale } = useLanguage();

  const handleGenerateIdea = useCallback(async (category1: string, category2: string) => {
    setIsLoading(true);
    setError(null);
    setIdea(null);
    try {
      const newIdea = await generateHackathonIdea(category1, category2, locale);
      const ideaWithId: Idea = { ...newIdea, id: Date.now().toString(), timestamp: Date.now() };
      
      setIdea(ideaWithId);

      setHistory(prevHistory => {
        const updatedHistory = [ideaWithId, ...prevHistory].slice(0, 50); // Keep history to 50 items
        localStorage.setItem('hackathon_ideas_history', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [locale]);
  
  const handleClearHistory = () => {
    setHistory([]);
    setIdea(null);
    localStorage.removeItem('hackathon_ideas_history');
  };

  const handleSelectFromHistory = (selectedIdea: Idea) => {
    setError(null);
    setIdea(selectedIdea);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IdeaGenerator onGenerate={handleGenerateIdea} isLoading={isLoading} />
            <div className="mt-8">
              {isLoading && <IdeaCardSkeleton />}
              {error && <div className="text-red-500 text-center p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">{error}</div>}
              {idea && !isLoading && <IdeaCard idea={idea} />}
              {!idea && !isLoading && !error && <WelcomePlaceholder />}
            </div>
          </div>
          <div className="lg:col-span-1">
            <HistoryPanel 
              history={history} 
              onSelect={handleSelectFromHistory}
              onClear={handleClearHistory} 
              activeIdeaId={idea?.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;