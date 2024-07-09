import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  onComplete: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 20);  // Adjust speed as needed
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <div className="relative">
      <span className="text-lg font-mono text-white">{displayText}</span>
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;