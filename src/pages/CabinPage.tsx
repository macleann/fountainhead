import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';
import { useGameState } from '../contexts/GameStateContext';

const CabinPage: React.FC = () => {
    const navigate = useNavigate();
    const { gameState } = useGameState();
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const handleContinue = () => {
        navigate('/hedgepath');
    };

    const cabinText = `You're standing in a one-room cabin. The peal of a bell is gently fading as a new sound takes its place: the click, click, of something sharp tapping on something hard. And light humming. 

You shake your head and spit soil from your mouth. 

You look up to see an old orange cat prodding in your direction. The cat stops in front of you, fixes its deep green and orange eyes upon your name tag and a soft voice enters your mind: "They weren't kidding about that bell - you got here in no time! Thanks, ${gameState?.root_or_worm || 'traveler'}. Are you ready to go?"`;

    return (
        <div className="min-h-screen flex flex-col justify-start items-center p-5 bg-black text-white overflow-y-auto">
            <div className="w-full max-w-2xl">
                <TypewriterEffect 
                    text={cabinText}
                    onComplete={() => setIsTypingComplete(true)}
                />
                {isTypingComplete && (
                    <div className="mt-4">
                        <button 
                            onClick={handleContinue}
                            className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2 transition-colors duration-300"
                        >
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CabinPage;