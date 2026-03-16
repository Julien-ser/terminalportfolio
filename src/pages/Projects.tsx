import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Projects: React.FC = () => {
  const { projects, isLoading, error } = usePortfolioStore();

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

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        No projects to display.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Projects</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">A selection of my recent work</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-green-800 rounded-lg overflow-hidden hover:border-green-600 transition-colors flex flex-col"
            >
              <div className="h-40 sm:h-48 bg-gray-800 relative flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23777" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EProject Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                {project.featured && (
                  <span className="absolute top-2 right-2 bg-green-800 text-green-200 px-2 py-1 text-xs rounded">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <h2 className="text-lg sm:text-xl font-semibold text-green-300 mb-2">{project.title}</h2>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-1">{project.shortDescription}</p>

                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-xs sm:text-sm underline"
                  >
                    GitHub
                  </a>
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs sm:text-sm underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.links.documentation && (
                    <a
                      href={project.links.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-xs sm:text-sm underline"
                    >
                      Docs
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
