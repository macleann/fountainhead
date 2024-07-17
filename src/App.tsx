import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import RootPage from './pages/RootPage';
import WormPage from './pages/WormPage';
import DotMatrix from './components/DotMatrix';

function App() {
  return (
    <Router>
        <div className="relative min-h-screen bg-black">
          <DotMatrix />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/root" element={<RootPage />} />
              <Route path="/worm" element={<WormPage />} />
              <Route path="/journal" element={<JournalPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
