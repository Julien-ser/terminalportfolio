import React from 'react';
import achievementsData from '../data/achievements.json';

export const Achievements: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-400">Achievements</h1>
          <p className="text-gray-400 mt-2">Certifications, awards, and recognitions</p>
        </header>

        <div className="space-y-4">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gray-900 border border-green-800 rounded-lg p-6 hover:border-green-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-green-300 mb-1">
                    {achievement.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-2">
                    {achievement.issuer} | {achievement.date}
                  </p>
                  <p className="text-gray-300 mb-3">{achievement.description}</p>

                  <div className="flex gap-2">
                    <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 capitalize">
                      {achievement.type}
                    </span>
                    {achievement.url && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm underline"
                      >
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
