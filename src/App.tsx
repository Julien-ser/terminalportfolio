import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Terminal } from './components/Terminal';
import { usePortfolioStore } from './store/usePortfolioStore';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

// Lazy load pages for code splitting
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Achievements = React.lazy(() => import('./pages/Achievements'));
const Contact = React.lazy(() => import('./pages/Contact'));

const App: React.FC = () => {
  const fetchData = usePortfolioStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black overflow-x-hidden">
          {/* Skip to content link for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-900 focus:text-green-100 focus:border focus:border-green-400 focus:rounded"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Suspense fallback={
              <div className="min-h-screen bg-black text-green-400 flex items-center justify-center" role="status" aria-live="polite">
                Loading...
              </div>
            }>
              <Routes>
                <Route
                  path="/"
                  element={<Terminal />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </AccessibilityProvider>
  );
};

export default App;
