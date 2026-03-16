import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Terminal } from './components/Terminal';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Achievements } from './pages/Achievements';
import { Contact } from './pages/Contact';
import { usePortfolioStore } from './store/usePortfolioStore';

const App: React.FC = () => {
  const fetchData = usePortfolioStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black overflow-x-hidden">
        <Navbar />
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
      </div>
    </BrowserRouter>
  );
};

export default App;
