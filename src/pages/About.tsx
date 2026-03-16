import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const About: React.FC = () => {
  useDocumentTitle({ title: 'About' });

  const { personal, isLoading, error } = usePortfolioStore();

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

  if (!personal) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center" role="alert" aria-live="assertive">
        No personal data available.
      </div>
    );
  }

  const { name, title, bio, avatar, resumeUrl, skills, languages, education, experience } = personal;

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto" role="main">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-green-400 mb-2">{name}</h1>
          <p className="text-base sm:text-xl text-gray-400">{title}</p>
        </header>

        <article className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <section className="md:col-span-1" aria-labelledby="profile-heading">
            <div className="bg-gray-900 border border-green-800 rounded-lg p-3 sm:p-4">
               <img
                 src={avatar}
                 alt={`${name}'s profile avatar`}
                 className="w-full rounded mb-3 sm:mb-4"
                 loading="lazy"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23777" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EAvatar%3C/text%3E%3C/svg%3E';
                 }}
               />
               <a
                href={resumeUrl}
                className="block w-full text-center bg-green-800 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={`Download ${name}'s resume`}
              >
                Download Resume
              </a>
            </div>
          </section>

          <section className="md:col-span-2">
            <h2 id="about-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">About Me</h2>
            <p className="text-sm sm:text-base whitespace-pre-line">{bio}</p>

            <h2 id="experience-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3 mt-6">Experience</h2>
            <div className="space-y-4" role="list">
              {experience.map((exp) => (
                <article key={exp.role} className="border-l-2 border-green-800 pl-4" role="listitem">
                  <h3 className="font-semibold text-white text-sm sm:text-base">{exp.role}</h3>
                  <p className="text-gray-400 text-sm">{exp.company} | {exp.duration}</p>
                  <ul className="mt-2 list-disc list-inside text-xs sm:text-sm text-gray-300">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </article>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Skills</h2>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-300 capitalize mb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2" role="list">
                  {items.map((skill: { name: string; proficiency: string }) => (
                    <span
                      key={skill.name}
                      className="bg-gray-900 border border-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                      role="listitem"
                    >
                      {skill.name} <span className="text-gray-500 text-xs">({skill.proficiency})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="education-heading">
            <h2 id="education-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3">Education</h2>
            <div className="space-y-3" role="list">
              {education.map((edu) => (
                <article key={edu.degree} className="border-l-2 border-green-800 pl-4" role="listitem">
                  <h3 className="font-semibold text-white text-sm sm:text-base">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm">{edu.institution} | {edu.year}</p>
                  <ul className="mt-1 list-disc list-inside text-xs sm:text-sm text-gray-300">
                    {edu.highlights.map((h: string, idx: number) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h2 id="languages-heading" className="text-lg sm:text-2xl font-semibold text-green-400 mb-3 mt-6">Languages</h2>
            <div className="flex flex-wrap gap-2" role="list">
              {languages.map((lang) => (
                <span
                  key={lang.language}
                  className="bg-gray-900 border border-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                  role="listitem"
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
