import React from "react";
import { useNavigate } from "react-router-dom";
import TypewriterEffect from "../components/TypewriterEffect";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleChoice = (choice: "root" | "worm") => {
    navigate(`/${choice}`);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      <TypewriterEffect text="Are you the root or the worm?" />
      <div className="mt-8 space-x-4">
        <button
          className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200"
          onClick={() => handleChoice("root")}
        >
          root
        </button>
        <button
          className="border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200"
          onClick={() => handleChoice("worm")}
        >
          worm
        </button>
      </div>
    </div>
  );
};

export default HomePage;
