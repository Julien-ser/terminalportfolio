import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('high-contrast');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-contrast: high)').matches;
  });

  useEffect(() => {
    localStorage.setItem('high-contrast', JSON.stringify(highContrast));
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  const toggleHighContrast = () => {
    setHighContrast((prev: boolean) => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
