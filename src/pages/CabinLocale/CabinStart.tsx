import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterEffect from '../../components/TypewriterEffect';
import { useTypewriter } from '../../contexts/TypewriterContext';
import { useGameState } from '../../contexts/GameStateContext';
import { useCabin } from '../../contexts/CabinContext';
import CabinExploration from './CabinExploration';

const CabinStart: React.FC = () => {
    const navigate = useNavigate();
    const { setShouldAnimate, setShouldBlink, setOnComplete } = useTypewriter();
    const { gameState } = useGameState();
    const { cabinState, conversationText, setConversationText, askedQuestions, setAskedQuestions } = useCabin();
    const [isLookingAround, setIsLookingAround] = useState(false);
    const [displayButtons, setDisplayButtons] = useState(false);

    useEffect(() => {
        // todo - If we're reloading the component by using the back or forward buttons, we can skip the animation
        setShouldAnimate(true);
        setShouldBlink(true);
        setOnComplete(() => setDisplayButtons(true));
        if (cabinState.visits === 0 && conversationText === '') {
            setConversationText(`You're standing in a one-room cabin. The peal of a bell is gently fading as a new sound takes its place: the click, click, of something sharp tapping on something hard. And light humming. 

You shake your head and spit soil from your mouth. 

You look up to see an old orange cat prodding in your direction. The cat stops in front of you, fixes its deep green and orange eyes upon your name tag and a soft voice enters your mind: "They weren't kidding about that bell - you got here in no time! Thanks, ${gameState?.root_or_worm}. Are you ready to go?"`)
        }
    }, [cabinState.visits, conversationText, setConversationText, gameState, setShouldAnimate, setShouldBlink, setOnComplete]);

    const handleOldFriendQuestion = useCallback((question: string) => {
        setAskedQuestions(prev => new Set(prev).add(question));
        let response = '';
        switch(question) {
            case 'Where are we?':
                response = "I can't remember exactly. They had a radio here. I wandered in and used it.";
                break;
            case 'Who are you?':
                response = "I'm an old friend! But you can call me Old Friend.";
                break;
            case 'Tell me what?':
                response = "…there's something about…sorry, I've forgotten now. There was something they told me to tell you I think. Can't remember what.";
                break;
            case 'They?':
                response = "Yeah, whoever I spoke with when I called in…a Context Report?…for Zone 7? I think I’m making that up. I can’t be sure."
                break;
        }
        setOnComplete(() => setDisplayButtons(true))
        setDisplayButtons(false);
        setShouldAnimate(true);
        setConversationText(prev => `${prev}\n\n> ${question}\n\n${response}`);
    }, [setAskedQuestions, setConversationText, setShouldAnimate, setOnComplete]);

    const handleLookAround = useCallback(() => {
        setIsLookingAround(true);
        setDisplayButtons(false);
        if (cabinState.visits === 0) {
            setShouldAnimate(true)
            cabinState.visits++;
        }
    }, [cabinState.visits, setShouldAnimate]);

    const handleReadyToGo = useCallback(() => {
        navigate('/hedgepath');
    }, [navigate]);

    const handleReturnToConversation = useCallback(() => {
        setIsLookingAround(false);
        setDisplayButtons(true);
        setShouldAnimate(false);
    }, [setShouldAnimate]);

    const renderOptions = useCallback(() => {
        if (!displayButtons) return null;

        return (
            <div className="mt-4 space-y-2">
                {!askedQuestions.has('Where are we?') && (
                    <button onClick={() => handleOldFriendQuestion('Where are we?')} className="button">
                        Where are we?
                    </button>
                )}
                {!askedQuestions.has('Who are you?') && (
                    <button onClick={() => handleOldFriendQuestion('Who are you?')} className="button">
                        Who are you?
                    </button>
                )}
                {!askedQuestions.has('Tell me what?') && (
                    <button onClick={() => handleOldFriendQuestion('Tell me what?')} className="button">
                        Tell me what?
                    </button>
                )}
                {askedQuestions.has('Tell me what?') && !askedQuestions.has('They?') && (
                    <button onClick={() => handleOldFriendQuestion('They?')} className="button">
                        They?
                    </button>
                )}
                <button onClick={handleLookAround} className="button">
                    Look around
                </button>
                <button onClick={handleReadyToGo} className="button">
                    Ready to go
                </button>
            </div>
        );
    }, [askedQuestions, handleLookAround, handleOldFriendQuestion, handleReadyToGo, displayButtons]);

    return (
        <div className="min-h-screen flex flex-col justify-start items-center p-5 bg-black text-white overflow-y-auto">
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
};

export default CabinStart;