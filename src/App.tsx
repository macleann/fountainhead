import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import RootPage from './pages/RootPage';
import WormPage from './pages/WormPage';
import { FontProvider } from './components/fontprovider/FontContext';
import FontSwitcher from './components/fontprovider/FontSwitcher';

function App() {
  return (
    <FontProvider>
      <Router>
        <div className="relative">
          <FontSwitcher />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/root" element={<RootPage />} />
            <Route path="/worm" element={<WormPage />} />
            <Route path="/journal" element={<JournalPage />} />
          </Routes>
        </div>
      </Router>
    </FontProvider>
  );
}

export default App;
