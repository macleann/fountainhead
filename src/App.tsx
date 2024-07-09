import React, { useState, useEffect } from 'react';

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <div className="relative">
      <span className="text-2xl font-mono text-white">{displayText}</span>
      <span className="absolute w-2 h-6 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

function App() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      <TypewriterEffect text="Are you the root or the worm?" />
      <div className="mt-8 space-x-4">
        <button className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200">
          root
        </button>
        <button className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200">
          worm
        </button>
      </div>
    </div>
  );
}

export default App;
