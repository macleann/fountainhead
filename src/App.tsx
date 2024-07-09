import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import RootPage from './pages/RootPage';
import WormPage from './pages/WormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/root" element={<RootPage />} />
        <Route path="/worm" element={<WormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
