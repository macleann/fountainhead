// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameStateProvider } from './contexts/GameStateContext';
// import HomePage from './pages/HomePage';
// import JournalPage from './pages/JournalPage';
// import RootPage from './pages/RootPage';
// import WormPage from './pages/WormPage';
// import DotMatrix from './components/DotMatrix';
import SaveIcon from './components/SaveIcon/SaveIcon';
import LandingPage from './pages/LandingPage';
// import OldFriendChatPage from './pages/OldFriendChatPage';
import ChatProvider from './contexts/ChatContext';
// import HedgeEntrancePage from './pages/HedgeEntrancePage';
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
                  {/* <Route path="/game" element={<HomePage setIsVisible={setIsVisible} />} />
                  <Route path="/hedgepath" element={<HedgeEntrancePage />} />
                  <Route path="/root" element={<RootPage setIsTappable={setIsTappable} />} />
                  <Route path="/worm" element={<WormPage />} />
                  <Route path="/journal" element={<JournalPage />} /> */}
                  {/* <Route path="/oldfriend" element={<OldFriendChatPage />} /> */}
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
