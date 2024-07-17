import React, { useState } from "react";
import TypewriterEffect from "../components/TypewriterEffect";
import DotMatrix from "../components/DotMatrix";

const RootPage: React.FC = () => {
  const [showDotMatrix, setShowDotMatrix] = useState(false);
  const sentence =
    "four weeks ago in flagstaff i met a man who considered himself a dragon and so displayed scales, each laden with a poultice created with solved forms of extra-intrinsical abolishment. deeply concerned for the man's wellbeing i produced a blindfold from the inner pocket of my best jacket and wrestled him to the ground.";

  const specialWords = [
    {
      word: "scales",
      className: "transition-colors duration-200 text-green-500",
      onClick: () => setShowDotMatrix(true)
    }
  ];

  const handleCloseDotMatrix = () => {
    setShowDotMatrix(false);
  };

  return (
    <>
      <DotMatrix isTappable={showDotMatrix} />
      {showDotMatrix && (
        <button 
          onClick={handleCloseDotMatrix}
          className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded"
        >
          Close
        </button>
      )}
      {!showDotMatrix && (
        <div className="min-h-screen flex flex-col justify-center items-center p-5 text-white">
          <div className="w-full max-w-2xl">
            <TypewriterEffect 
              text={sentence} 
              loop={true} 
              specialWords={specialWords}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RootPage;
