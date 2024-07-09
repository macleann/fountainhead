import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import TypewriterEffect from './components/TypewriterEffect';
import JournalPage from './pages/JournalPage';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleChoice = () => {
    navigate('/journal');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      <TypewriterEffect text="Are you the root or the worm?" />
      <div className="mt-8 space-x-4">
        <button 
          className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200"
          onClick={handleChoice}
        >
          root
        </button>
        <button 
          className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200"
          onClick={handleChoice}
        >
          worm
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
