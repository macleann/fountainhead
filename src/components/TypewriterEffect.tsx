import React, { useState, useEffect } from "react";
import { useFont } from "../components/fontprovider/FontContext";

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
  const { font } = useFont();

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (index < text.length) {
      typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // Controls the text speed
    }

    return () => clearTimeout(typingTimer);
  }, [index, text, font]);

  useEffect(() => {
    let textTimer: NodeJS.Timeout;

    if (index === text.length && loop) {
      textTimer = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000); // 5 second pause before restarting
    }
  }, [index, font]);

  return (
    <div className="relative">
      <span className={`text-lg font-${font} text-white`}>{displayText}</span>
      <span className="absolute w-2 h-5 bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default TypewriterEffect;
