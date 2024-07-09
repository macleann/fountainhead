import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 20);  // Increased speed for longer texts
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <div className="relative whitespace-pre-wrap">
      <span className="text-lg font-mono text-white">{displayText}</span>
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;