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
    let typingTimer: NodeJS.Timeout;

    if (index < text.length) {
      typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // Controls the text speed
    }

    return () => clearTimeout(typingTimer);
  }, [index, text]);

  useEffect(() => {
    if (index === text.length && loop) {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000); // 5 second pause before restarting
    }
  }, [index, text.length, loop]);

  return (
    <div className="relative">
      <span className="text-lg font-tiny5 text-white">{displayText}</span>
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;
