import React, { useCallback, useState, useEffect } from 'react';
import TypewriterEffect from '../../components/TypewriterEffect';
import { useNavigate } from 'react-router-dom';
import { useTypewriter } from '../../contexts/TypewriterContext';
import CabinExploration from './CabinExploration';

const CabinReturn: React.FC = () => {
    const [conversationText] = useState(`The cabin you found yourself earlier. Old Friend trots over to the desk and gazes at you,

'Have we been here before? Seems familiar and perhaps of importance?'`)
    const [displayButtons, setDisplayButtons] = useState(false);
    const [isLookingAround, setIsLookingAround] = useState(false);
    const { setShouldAnimate, setShouldBlink, setOnComplete } = useTypewriter();
    const navigate = useNavigate();

    useEffect(() => {
        setShouldAnimate(true);
        setShouldBlink(true);
        setOnComplete(() => setDisplayButtons(true));
    }, [setShouldAnimate, setShouldBlink, setOnComplete]);

    const handleLookAround = useCallback(() => {
        setIsLookingAround(true);
        setDisplayButtons(false);
        setShouldAnimate(true);
    }, [setShouldAnimate]);

    const handleReturnToConversation = useCallback(() => {
        setIsLookingAround(false);
        setDisplayButtons(true);
        setShouldAnimate(false);
    }, [setShouldAnimate]);

    const renderOptions = useCallback(() => {
        if (!displayButtons) return null;

        return (
            <div className="flex flex-col space-y-2">
                <button
                    onClick={handleLookAround}
                    className="w-full bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2 transition-colors duration-300"
                >
                    Look around
                </button>
                <button
                    onClick={() => {navigate('/notice-board')}}
                    className="w-full bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2 transition-colors duration-300"
                >
                    Leave
                </button>
            </div>
        );
    }, [displayButtons, navigate, handleLookAround]);

    return (
        <div className='min-h-screen flex flex-col justify-start items-center p-5 font-tiny5 text-white'>
            <div className="w-full max-w-2xl">
                {isLookingAround ? (
                    <CabinExploration 
                        onReturnToConversation={handleReturnToConversation}
                    />
                ) : (
                    <>
                        <TypewriterEffect
                            text={conversationText}
                        />
                        {renderOptions()}
                    </>
                )}
            </div>
        </div>
    );
}

export default CabinReturn;
