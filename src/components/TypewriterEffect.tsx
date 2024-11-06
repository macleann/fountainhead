import React, { useState, useEffect, useCallback } from "react";
import { useTypewriter } from "../contexts/TypewriterContext";

interface SpecialWord {
  word: string;
  className: string;
  onClick: (word: string) => void;
}

interface TypewriterEffectProps {
  text: string;
  specialWords?: SpecialWord[];
  startFrom?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  specialWords = [],
  startFrom = 0,
}) => {
  const { shouldAnimate, shouldBlink, triggerComplete } = useTypewriter();
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(startFrom);

  const typeNextCharacter = useCallback(() => {
    if (index < text.length) {
      setDisplayText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    } else {
      triggerComplete();
    }
  }, [index, text, triggerComplete]);

  useEffect(() => {
    if (shouldAnimate) {
      const typingTimer = setTimeout(typeNextCharacter, 5);
      return () => clearTimeout(typingTimer);
    } else {
      setDisplayText(text);
      setIndex(text.length);
      triggerComplete();
    }
  }, [shouldAnimate, typeNextCharacter, text, triggerComplete]);

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
      {shouldBlink ? index <= text.length && (
        <span className="inline-block w-2 h-5 bg-white ml-1 animate-blink"></span>
      ) : index < text.length && (
        <span className="inline-block w-2 h-5 bg-white ml-1 animate-blink"></span> 
      )}
    </div>
  );
};

export default TypewriterEffect;