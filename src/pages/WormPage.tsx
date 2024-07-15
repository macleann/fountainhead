import React from "react";
import TypewriterEffect from "../components/TypewriterEffect";
import { useFont } from "../components/fontprovider/FontContext";

const WormPage: React.FC = () => {
  const sentence =
    "cabinated freedom path bleakly goes, tumbling, wildly along with complete yada yada yada yada yada yada yada for hopeful impact with concerned citizen invested only in the accounts given by folks living here years earlier while deep toff rolls about within a luxurious bin made there by frequencies which that who whom escaped control and went on to annihilate separate and regulated persons in direct commission with traders previously believed worthy and active in their attempts to partition areas located beyond normal and familiar grounds of restriction.";
  const { font } = useFont();
  
  return (
    <div className={`bg-black min-h-screen flex flex-col justify-center items-center p-5 font-${font} text-white`}>
      <div className="w-full max-w-2xl">
        <TypewriterEffect text={sentence} loop={true} />
      </div>
    </div>
  );
};

export default WormPage;
