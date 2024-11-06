import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';
import { useGameState } from '../contexts/GameStateContext';
import { useTypewriter } from '../contexts/TypewriterContext';

const ProloguePage: React.FC = () => {
    const navigate = useNavigate();
    const { gameState, setGameState } = useGameState();
    const { setShouldAnimate, setShouldBlink, setOnComplete } = useTypewriter();
    const [currentScene, setCurrentScene] = useState('start');
    const [displayButtons, setDisplayButtons] = useState(false);
    const [givenName, setGivenName] = useState('');
    const [replacementAnswer, setReplacementAnswer] = useState('');
    const [conversationText, setConversationText] = useState('');

    useEffect(() => {
        setShouldAnimate(true);
        setShouldBlink(true);
        setOnComplete(() => {
            setDisplayButtons(true);
        });
        setConversationText("You stand at the edge of a field. A mass of lights bob lazily above the ground in the foggy distance. Water softly rushes nearby.");
    }, [setShouldAnimate, setShouldBlink, setOnComplete]);

    const handleChoice = useCallback((choice: string, buttonText: string) => {
        let nextScene = '';
        let newText = '';

        switch (currentScene) {
            case 'start':
                nextScene = choice;
                newText = choice === 'light' 
                    ? "Whispers in the field. The lights wink and fade above shallow pits in the soil."
                    : "You see a small dock in the distance. A shadow flickers at the end of it against the fog.";
                break;
            case 'light':
                nextScene = 'water';
                newText = "You see a small dock in the distance. A shadow flickers at the end of it against the fog.";
                break;
            case 'water':
                if (choice === 'shadow') {
                    nextScene = 'shadow';
                    newText = "You tread the length of the creaky dock. The shadow flickers:\n\n\"Who are you?\"";
                    setShouldBlink(false);
                } else {
                    nextScene = 'light';
                    newText = "Whispers in the field. The lights wink and fade above shallow pits in the soil.";
                }
                break;
            case 'shadow':
                nextScene = 'respond';
                newText = `A phone starts ringing in the distance. The fog gives way to an oarsman; tall; cloaked in deep blue cloths; oar rested upon a broad shoulder. His grayish, piercing eyes fix upon you. "A phone is ringing in the garden. Tell me…are you the root or the worm?"`;
                setGameState(prev => ({ ...prev, given_name: givenName }));
                break;
            case 'respond':
                nextScene = 'thread';
                newText = "I see…and if nothing's forgotten then how's it replaced?";
                setShouldBlink(false);
                setGameState(prev => ({ ...prev, root_or_worm: choice }));
                break;
            case 'thread':
                nextScene = 'end';
                newText = `Is that so? Well, ${gameState.root_or_worm || 'traveler'}, off you go then…

The boatsman stamps his oar against the planks at his feet and with a crack the dock, the man, his oar, and the field disappear from view, replaced by a dark static and the sound of a thousand overlapping voices. Then, as suddenly as it begins, it stops. You taste soil in your mouth.`;
                break;
            case 'end':
                // setGameState(prev => ({ ...prev, prologue_complete: true }));
                setGameState(prev => ({ ...prev, replacement_answer: replacementAnswer }));
                console.log(gameState);
                console.log(gameState.replacement_answer)
                navigate('/cabin');
                return;
        }

        setConversationText(prev => `${prev}\n\n> ${buttonText}\n\n${newText}`);
        setCurrentScene(nextScene);
        setDisplayButtons(false);
        setShouldAnimate(true);
        setOnComplete(() => {
            setDisplayButtons(true);
        });
    }, [currentScene, navigate, setGameState, gameState, givenName, replacementAnswer, setShouldAnimate, setShouldBlink, setOnComplete]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentScene === 'shadow') {
            handleChoice('respond', givenName);
        } else if (currentScene === 'thread') {
            handleChoice('end', replacementAnswer);
        }
        setShouldBlink(true);
        setOnComplete(() => setDisplayButtons(true));
    }, [currentScene, givenName, replacementAnswer, handleChoice, setShouldBlink, setOnComplete]);

    const renderOptions = useCallback(() => {
        if (!displayButtons) return null;

        switch (currentScene) {
            case 'start':
                return (
                    <div className="mt-4 space-y-2">
                        <button onClick={() => handleChoice('light', 'Go light')} className="button">
                            Go light
                        </button>
                        <button onClick={() => handleChoice('water', 'Go water')} className="button">
                            Go water
                        </button>
                    </div>
                );
            case 'light':
                return (
                    <div className="mt-4 space-y-2">
                        <button onClick={() => handleChoice('water', 'Go water')} className="button">
                            Go water
                        </button>
                    </div>
                );
            case 'water':
                return (
                    <div className="mt-4 space-y-2">
                        <button onClick={() => handleChoice('shadow', 'Go shadow')} className="button">
                            Go shadow
                        </button>
                        <button onClick={() => handleChoice('light', 'Go light')} className="button">
                            Go light
                        </button>
                    </div>
                );
            case 'shadow':
            case 'thread':
                return (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input 
                            type="text" 
                            value={currentScene === 'shadow' ? givenName : replacementAnswer}
                            onChange={(e) => currentScene === 'shadow' ? setGivenName(e.target.value) : setReplacementAnswer(e.target.value)}
                            className="bg-black text-white border border-white outline-none px-2 py-1 caret-white"
                            placeholder={currentScene === 'shadow' ? "Enter your name" : "Enter your answer"}
                            autoFocus
                        />
                        <button 
                            type='submit'
                            className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2 ml-2 transition-colors duration-300"
                        >
                            Respond
                        </button>
                    </form>
                );
            case 'respond':
                return (
                    <div className="mt-4 space-y-2">
                        <button onClick={() => handleChoice('Root', 'Root')} className="button">
                            Root
                        </button>
                        <button onClick={() => handleChoice('Worm', 'Worm')} className="button">
                            Worm
                        </button>
                    </div>
                );
            case 'end':
                return (
                    <div className="mt-4 space-y-2">
                        <button onClick={() => handleChoice('continue', 'Continue')} className="button">
                            Continue
                        </button>
                    </div>
                );
            default:
                return null;
        }
    }, [currentScene, displayButtons, givenName, replacementAnswer, handleChoice, handleSubmit]);

    return (
        <div className="min-h-screen flex flex-col justify-start items-center p-5 bg-black text-white overflow-y-auto">
            <div className="w-full max-w-2xl">
                <TypewriterEffect 
                    text={conversationText}
                />
                {renderOptions()}
            </div>
        </div>
    );
};

export default ProloguePage;