import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const About: React.FC = () => {
  const { personal, isLoading, error } = usePortfolioStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (!personal) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        No personal data available.
      </div>
    );
  }

  const { name, title, bio, avatar, resumeUrl, skills, languages, education, experience } = personal;

  return (
    <div className="min-h-screen bg-black text-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">{name}</h1>
          <p className="text-xl text-gray-400">{title}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="bg-gray-900 border border-green-800 rounded-lg p-4">
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-full rounded mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23777" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EAvatar%3C/text%3E%3C/svg%3E';
                }}
              />
              <a
                href={resumeUrl}
                className="block w-full text-center bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-green-400 mb-3">About Me</h2>
              <p className="whitespace-pre-line">{bio}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-green-400 mb-3">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.role} className="border-l-2 border-green-800 pl-4">
                    <h3 className="font-semibold text-white">{exp.role}</h3>
                    <p className="text-gray-400">{exp.company} | {exp.duration}</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-300">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-green-400 mb-3">Skills</h2>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-medium text-gray-300 capitalize mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill: { name: string; proficiency: string }) => (
                    <span
                      key={skill.name}
                      className="bg-gray-900 border border-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.name} <span className="text-gray-500">({skill.proficiency})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-green-400 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.degree} className="border-l-2 border-green-800 pl-4">
                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.institution} | {edu.year}</p>
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-300">
                    {edu.highlights.map((h: string, idx: number) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-green-400 mb-3 mt-6">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang.language}
                  className="bg-gray-900 border border-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {lang.language} ({lang.level})
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
