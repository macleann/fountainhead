import React, { useState, useEffect, useCallback } from "react";

interface TypewriterEffectProps {
  text: string;
  onComplete?: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  onComplete = () => {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  const typeNextCharacter = useCallback(() => {
    if (index < text.length) {
      setDisplayText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    } else if (index === text.length) {
      onComplete();
      setIndex((prev) => prev + 1); // Ensure this only runs once
    }
  }, [index, text, onComplete]);

  useEffect(() => {
    const timer = setTimeout(typeNextCharacter, 20);
    return () => clearTimeout(timer);
  }, [typeNextCharacter]);

  return (
    <div className="text-lg whitespace-pre-wrap">
      {displayText}
      {index <= text.length && (
        <span className="inline-block w-2 h-5 bg-white ml-1 animate-blink"></span>
      )}
    </div>
  );
};

export default TypewriterEffect;