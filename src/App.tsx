// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameStateProvider } from './contexts/GameStateContext';
import SaveIcon from './components/SaveIcon/SaveIcon';
import LandingPage from './pages/LandingPage';
import ChatProvider from './contexts/ChatContext';
import NotFoundPage from './pages/404Page';

function App() {
  // const [isTappable, setIsTappable] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  return (
    <GameStateProvider>
      <AuthProvider>
        <ChatProvider>
          <Router>
            <div className="relative min-h-screen bg-black font-tiny5 h-full">
              {/* <DotMatrix isTappable={isTappable} isVisible={isVisible} /> */}
              <SaveIcon />
              <div className="relative z-10">
                <Routes>
                  <Route path="/" element={<LandingPage />} /> {/* re-add setIsVisible to Landing page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </GameStateProvider>
  );
}

export default App;
