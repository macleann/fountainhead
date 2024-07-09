import React, { useState, useEffect, useRef } from 'react';
import TypewriterEffect from '../components/TypewriterEffect';

const WormPage: React.FC = () => {
  const baseSentence = "cabinated freedom path bleakly goes, tumbling, wildly along with complete yada yada yada yada yada yada yada for hopeful impact with concerned citizen invested only in the accounts given by folks living here years earlier while deep toff rolls about within a luxurious bin made there by frequencies which that who whom escaped control and went on to annihilate separate and regulated persons in direct commission with traders previously believed worthy and active in their attempts to partition areas located beyond normal and familiar grounds of restriction. ";
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
        className="w-full max-w-2xl h-[80vh] overflow-y-auto scroll-smooth scrollbar-thin"
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

export default WormPage;