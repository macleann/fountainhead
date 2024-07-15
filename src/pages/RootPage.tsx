import React from "react";
import TypewriterEffect from "../components/TypewriterEffect";

const RootPage: React.FC = () => {
  const sentence =
    "four weeks ago in flagstaff i met a man who considered himself a dragon and so displayed scales, each laden with a poultice created with solved forms of extra-intrinsical abolishment. deeply concerned for the man's wellbeing i produced a blindfold from the inner pocket of my best jacket and wrestled him to the ground.";

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      <div className="w-full max-w-2xl">
        <TypewriterEffect text={sentence} loop={true} />
      </div>
    </div>
  );
};

export default RootPage;
