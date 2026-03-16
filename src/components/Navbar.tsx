import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

export const Navbar: React.FC = () => {
  const { highContrast, toggleHighContrast } = useAccessibility();
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 sm:px-4 py-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-400 ${
      isActive
        ? 'bg-green-900 text-green-300'
        : 'text-green-400 hover:bg-green-950 hover:text-green-200'
    }`;

  return (
    <nav className="bg-gray-900 border-b border-green-800 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-12 sm:h-16">
          <NavLink
            to="/"
            className="text-lg sm:text-xl font-bold text-green-400 truncate focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-3 py-2 min-h-[44px] flex items-center"
            aria-label="Return to terminal homepage"
          >
            Portfolio
          </NavLink>

          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-[60%] sm:max-w-none no-scrollbar" role="menubar">
            <NavLink
              to="/about"
              className={navLinkClass}
              role="menuitem"
              aria-current={location.pathname === '/about' ? 'page' : undefined}
            >
              About
            </NavLink>
            <NavLink
              to="/projects"
              className={navLinkClass}
              role="menuitem"
              aria-current={location.pathname === '/projects' ? 'page' : undefined}
            >
              Projects
            </NavLink>
            <NavLink
              to="/achievements"
              className={navLinkClass}
              role="menuitem"
              aria-current={location.pathname === '/achievements' ? 'page' : undefined}
            >
              Achievements
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              role="menuitem"
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
            >
              Contact
            </NavLink>
          </div>

          <div className="flex items-center">
          <button
            onClick={toggleHighContrast}
            className={`px-3 sm:px-4 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
              highContrast
                ? 'bg-green-800 text-green-100'
                : 'bg-gray-800 text-green-400 hover:bg-gray-700'
            }`}
            aria-pressed={highContrast}
            aria-label={`Toggle high contrast mode${highContrast ? ' (currently on)' : ''}`}
          >
            {highContrast ? 'HC ON' : 'HC OFF'}
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
