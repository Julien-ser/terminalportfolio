import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Achievements: React.FC = () => {
  useDocumentTitle({ title: 'Achievements' });

  const { achievements, isLoading, error } = usePortfolioStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center" role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center" role="alert" aria-live="assertive">
        Error: {error}
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center" role="alert" aria-live="polite">
        No achievements to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto" role="main">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Achievements</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Certifications, awards, and recognitions</p>
        </header>

        <div className="space-y-4" role="list">
          {achievements.map((achievement) => (
            <article
              key={achievement.id}
              className="bg-gray-900 border border-green-800 rounded-lg p-4 sm:p-6 hover:border-green-600 transition-colors"
              role="listitem"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-4xl" aria-hidden="true">{achievement.icon}</span>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-green-300 mb-1">
                    {achievement.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">
                    {achievement.issuer} | {achievement.date}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mb-3">{achievement.description}</p>

                  <div className="flex gap-2">
                    <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 capitalize" aria-label={`Achievement type: ${achievement.type}`}>
                      {achievement.type}
                    </span>
                    {achievement.url && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-green-400 hover:text-green-300 text-xs sm:text-sm underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                        aria-label={`Verify ${achievement.title}`}
                      >
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
