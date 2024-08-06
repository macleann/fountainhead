import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameStateProvider } from './contexts/GameStateContext';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import RootPage from './pages/RootPage';
import WormPage from './pages/WormPage';
import DotMatrix from './components/DotMatrix';
import SaveIcon from './components/SaveIcon/SaveIcon';

function App() {
  const [isTappable, setIsTappable] = useState(false);

  return (
    <AuthProvider>
      <GameStateProvider>
        <Router>
          <div className="relative min-h-screen bg-black font-tiny5">
            <DotMatrix isTappable={isTappable} />
            <SaveIcon />
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/root" element={<RootPage setIsTappable={setIsTappable} />} />
                <Route path="/worm" element={<WormPage />} />
                <Route path="/journal" element={<JournalPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </GameStateProvider>
    </AuthProvider>
  );
}

export default App;
