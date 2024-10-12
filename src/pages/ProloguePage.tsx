import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterEffect from '../components/TypewriterEffect';
import { useGameState } from '../contexts/GameStateContext';

type SceneButton = {
    text: string;
    onClick: () => void;
};

type Scene = {
    text: string;
    buttons?: SceneButton[];
    input?: boolean;
};

type Scenes = {
    [key: string]: Scene;
};

const ProloguePage: React.FC = () => {
    const navigate = useNavigate();
    const { gameState, setGameState } = useGameState();
    const [sceneHistory, setSceneHistory] = useState<string[]>(['start']);
    const [givenName, setGivenName] = useState('');
    const [replacementAnswer, setReplacementAnswer] = useState('');
    const [completedScenes, setCompletedScenes] = useState<Set<string>>(new Set());
    const [selectedChoices, setSelectedChoices] = useState<{[key: string]: string}>({});
    const [visitedWater, setVisitedWater] = useState(false);
    const revisitableScenes = ['water']; // Scenes that can be revisited freely


    const handleChoice = useCallback((choice: string, buttonText: string) => {
        const currentScene = sceneHistory[sceneHistory.length - 1];
        setSelectedChoices(prev => ({...prev, [currentScene]: buttonText}));
    
        switch (currentScene) {
            case 'light':
                setSceneHistory(prev => [...prev, 'water']);
                setCompletedScenes(prev => {
                    // todo fix scene history and revisitable scenes
                    const newSet = new Set(prev);
                    newSet.delete('water'); // Reset 'water' scene to re-trigger typewriter
                    return newSet;
                });
                break;
            case 'water':
                if (!visitedWater) setVisitedWater(true); // Mark water as visited
                if (choice === 'shadow') {
                    setSceneHistory(prev => [...prev, 'shadow']);
                } else {
                    setSceneHistory(prev => [...prev, 'light']);
                }
                break;
            case 'shadow':
                setSceneHistory(prev => [...prev, 'respond']);
                setGameState(prev => ({ ...prev, givenName: givenName }));
                break;
            case 'respond':
                setSceneHistory(prev => [...prev, 'thread']);
                setGameState(prev => ({ ...prev, root_or_worm: choice }));
                break;
            case 'thread':
                setSceneHistory(prev => [...prev, 'end']);
                setGameState(prev => ({ ...prev, replacementAnswer: replacementAnswer }));
                break;
            case 'end':
                navigate('/cabin');
                break;
            default:
                setSceneHistory(prev => [...prev, 'light']);
        }
    }, [sceneHistory, setGameState, navigate, givenName, replacementAnswer, visitedWater]);    

    const renderButtons = (buttons: SceneButton[], currentScene: string) => {
        const isRevisitable = revisitableScenes.includes(currentScene); // Check if the scene is revisitable
    
        return (
            <div className="my-4 space-x-4">
                {buttons.map((button, index) => {
                    const isSelected = selectedChoices[currentScene] === button.text;
                    const isDisabled = selectedChoices[currentScene] !== undefined && !isRevisitable; // Disable only for non-revisitable scenes
                    return (
                        <button
                            key={index}
                            onClick={() => !isDisabled && button.onClick()}
                            className={`px-4 py-2 transition-colors duration-300 
                                ${isSelected ? 'bg-white text-black' : 'bg-black text-white'} 
                                border ${isDisabled ? 'border-gray-500 cursor-not-allowed' : 'border-white hover:bg-white hover:text-black'}`}
                            disabled={isDisabled}
                        >
                            {button.text}
                        </button>
                    );
                })}
            </div>
        );
    };
    

    const scenes: Scenes = {
        start: {
            text: "You stand at the edge of a field. A mass of lights bob lazily above the ground in the foggy distance. Water softly rushes nearby.",
            buttons: [
                { text: "Go light", onClick: () => handleChoice('light', 'Go light') },
                { text: "Go water", onClick: () => handleChoice('water', 'Go water') }
            ]
        },
        light: {
            text: "Whispers in the field. The lights wink and fade above shallow pits in the soil.",
            buttons: [
                { text: "Go water", onClick: () => handleChoice('water', 'Go water') }
            ]
        },
        water: {
            text: "You see a small dock in the distance. A shadow flickers at the end of it against the fog.",
            buttons: visitedWater ? [ // Show only 'Go shadow' on revisit
                { text: "Go shadow", onClick: () => handleChoice('shadow', 'Go shadow') }
            ] : [
                { text: "Go shadow", onClick: () => handleChoice('shadow', 'Go shadow') },
                { text: "Go light", onClick: () => handleChoice('light', 'Go light') }
            ]
        },        
        shadow: {
            text: "You tread the length of the creaky dock. The shadow flickers:\n\n\"Who are you?\"",
            input: true
        },
        respond: {
            text: `A phone starts ringing in the distance. The fog gives way to an oarsman; tall; cloaked in deep blue cloths; oar rested upon a broad shoulder. His grayish, piercing eyes fix upon you. "A phone is ringing in the garden. Tell me…are you the root or the worm?"`,
            buttons: [
                { text: "root", onClick: () => handleChoice('root', 'root') },
                { text: "worm", onClick: () => handleChoice('worm', 'worm') }
            ]
        },
        thread: {
            text: "I see…and if nothing's forgotten then how's it replaced?",
            input: true
        },
        end: {
            text: `Is that so? Well, ${gameState.root_or_worm || 'traveler'}, off you go then…

The boatsman stamps his oar against the planks at his feet and with a crack the dock, the man, his oar, and the field disappear from view, replaced by a dark static and the sound of a thousand overlapping voices. Then, as suddenly as it begins, it stops. You taste soil in your mouth.`,
            buttons: [{ text: "Continue", onClick: () => handleChoice('continue', 'Continue') }]
        }
    };

    const handleSceneComplete = useCallback((sceneName: string) => {
        setCompletedScenes(prev => new Set(prev).add(sceneName));
    }, []);

    const handleUserInput = (sceneName: string) => {
        if (sceneName === 'shadow') {
            handleChoice('respond', 'Respond');
        } else if (sceneName === 'thread') {
            handleChoice('end', 'Respond');
        }
    };

    const renderScene = (sceneName: string, index: number) => {
        const scene = scenes[sceneName];
        if (!scene) return null;
        const isCompleted = completedScenes.has(sceneName);
        const isCurrentScene = index === sceneHistory.length - 1;

        return (
            <div key={index} className="mb-6">
                {isCompleted ? (
                    <div className="text-lg whitespace-pre-wrap">{scene.text}</div>
                ) : (
                    <TypewriterEffect 
                        text={scene.text}
                        onComplete={() => handleSceneComplete(sceneName)}
                    />
                )}
                {isCompleted && scene.buttons && renderButtons(scene.buttons, sceneName)}
                {isCompleted && scene.input && isCurrentScene && (
                    <div className="mt-4">
                        <input 
                            type="text" 
                            value={sceneName === 'shadow' ? givenName : replacementAnswer}
                            onChange={(e) => sceneName === 'shadow' ? setGivenName(e.target.value) : setReplacementAnswer(e.target.value)}
                            className="bg-black text-white border border-white px-2 py-1"
                            placeholder={sceneName === 'shadow' ? "Enter your name" : "Enter your answer"}
                        />
                        <button 
                            onClick={() => handleUserInput(sceneName)}
                            className="bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2 ml-2 transition-colors duration-300"
                        >
                            Respond
                        </button>
                    </div>
                )}
                {isCompleted && scene.input && !isCurrentScene && (
                    <div className="mt-4">
                        <span className="text-gray-500"> {sceneName === 'shadow' ? givenName : replacementAnswer}</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-start items-center p-5 bg-black text-white overflow-y-auto">
            <div className="w-full max-w-2xl">
                {sceneHistory.map(renderScene)}
            </div>
        </div>
    );
};

export default ProloguePage;