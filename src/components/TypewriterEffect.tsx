import React, { useState, useEffect } from "react";

interface SpecialWord {
  word: string;
  className: string;
  onClick: (word: string) => void;
}

interface TypewriterEffectProps {
  text: string;
  loop?: boolean;
  specialWords?: SpecialWord[];
  onComplete?: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  loop = false,
  specialWords = [],
  onComplete = () => {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (index < text.length) {
      typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50);
    } else {
      setIsTypingComplete(true);
      onComplete();
    }

    return () => clearTimeout(typingTimer);
  }, [index, text, onComplete]);

  useEffect(() => {
    if (index === text.length && loop) {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
        setIsTypingComplete(false);
      }, 5000);
    }
  }, [index, text.length, loop]);

  const renderWord = (word: string, key: number) => {
    const specialWord = specialWords.find(sw => sw.word.toLowerCase() === word.toLowerCase());
    if (specialWord) {
      return (
        <span 
          key={key}
          onClick={() => specialWord.onClick(word)}
          className={`cursor-pointer ${specialWord.className}`}
        >
          {word}
        </span>
      );
    }
    return <span key={key}>{word}</span>;
  };

  return (
    <div className="text-lg whitespace-pre-wrap">
      {displayText.split(/(\s+)/).map((part, index) => {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
          return <span key={index}>{part}</span>;
        }
        const word = trimmedPart.replace(/[.,!?;:]$/, '');
        const punctuation = trimmedPart.slice(word.length);
        return (
          <React.Fragment key={index}>
            {renderWord(word, index)}
            {punctuation}
          </React.Fragment>
        );
      })}
      {!isTypingComplete && (
        <span className="inline-block w-2 h-5 bg-white ml-1 animate-blink"></span>
      )}
    </div>
  );
};

export default TypewriterEffect;