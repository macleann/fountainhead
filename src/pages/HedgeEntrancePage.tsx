import React from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';

const HedgeEntrancePage: React.FC = () => {
    const navigate = useNavigate();

    const description = "You find yourself in front of a hedge wall. A wrought iron door splits the wall in two. A weathered looking cat sits to the left of the door, watching you closely. A thin fog lingers in the air.";

    const handleAction = (action: string) => {
        switch(action) {
            case 'go left':
                navigate('/left-path');
                break;
            case 'talk to cat':
                navigate('/oldfriend');
                break;
            case 'inspect door':
                navigate('/door');
                break;
            case 'go right':
                navigate('/right-path');
                break;
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between p-5 text-white">
            <div className="w-full max-w-2xl mx-auto">
                <TypewriterEffect text={description} />
            </div>
            <div className="flex justify-center space-x-4 mt-8">
                <button onClick={() => handleAction('go left')} className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2">
                    Go Left
                </button>
                <button onClick={() => handleAction('talk to cat')} className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2">
                    Talk to Cat
                </button>
                <button onClick={() => handleAction('inspect door')} className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2">
                    Inspect Door
                </button>
                <button onClick={() => handleAction('go right')} className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2">
                    Go Right
                </button>
            </div>
        </div>
    );
};

export default HedgeEntrancePage;