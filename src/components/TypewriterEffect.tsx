import React, { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  loop?: boolean;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  loop = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (index < text.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // Controls the text speed
    }

    return () => clearTimeout(timer);
  }, [index, text]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (index === text.length && loop) {
      timer = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000); // 5 second pause before restarting
    }
  }, [index]);

  return (
    <div className="relative">
      <span className="text-lg font-mono text-white">{displayText}</span>
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;
