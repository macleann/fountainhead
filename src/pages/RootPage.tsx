import React, { useState, useEffect, useRef } from 'react';
import TypewriterEffect from '../components/TypewriterEffect';

const RootPage: React.FC = () => {
  const baseSentence = "Four weeks ago in Flagstaff I met a man who considered himself a dragon and so displayed scales. ";
  const [fullText, setFullText] = useState(baseSentence);
  const [visibleText, setVisibleText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFullText(prev => prev + baseSentence);
    }, baseSentence.length * 20 + 1000);

    return () => clearTimeout(timer);
  }, [fullText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const visibleLength = Math.ceil((scrollTop + clientHeight) / 24) * 100; // Approximate characters visible
      setVisibleText(fullText.slice(0, visibleLength));
    };

    handleScroll(); // Initial call

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [fullText]);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      <div 
        ref={containerRef} 
        className="w-full max-w-2xl h-[80vh] overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4a4a4a #262626' }}
      >
        <TypewriterEffect 
          text={visibleText}
          onComplete={() => {}}
        />
        <div style={{ height: `${fullText.length * 24 / 100}px` }}></div>
      </div>
    </div>
  );
};

export default RootPage;