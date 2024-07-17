import React, { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  loop?: boolean;
  onWordClick?: (word: string) => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  loop = false,
  onWordClick
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (index < text.length) {
      typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // Controls the text speed
    }

    return () => clearTimeout(typingTimer);
  }, [index, text]);

  // Loop the text
  useEffect(() => {
    if (index === text.length && loop) {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000); // 5 second pause before restarting
    }
  }, [index, text.length, loop]);

  // Handle word click
  const handleWordClick = (word: string) => {
    if (onWordClick) {
      onWordClick(word);
    }
  };

  return (
    <div className="relative text-lg font-tiny5 text-white">
      {displayText.split(/(\s+)/).map((part, index) => {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
          return <span key={index}>{part}</span>; // This preserves spaces
        }
        const word = trimmedPart.replace(/[.,!?;:]$/, '');
        const punctuation = trimmedPart.slice(word.length);
        return (
          <span key={index}>
            <span 
              onClick={() => handleWordClick(word)}
              className={`${
                word.toLowerCase() === 'scales' ? 'cursor-pointer transition-colors duration-200 text-green-500' : ''
              }`}
            >
              {word}
            </span>
            {punctuation}
          </span>
        );
      })}
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;
