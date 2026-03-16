import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded transition-colors ${
      isActive
        ? 'bg-green-900 text-green-300'
        : 'text-green-400 hover:bg-green-950 hover:text-green-200'
    }`;

  return (
    <nav className="bg-gray-900 border-b border-green-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-xl font-bold text-green-400">
            Portfolio
          </NavLink>

          <div className="flex space-x-2">
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/achievements" className={navLinkClass}>
              Achievements
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
