import React, { useState, useCallback, useEffect } from 'react';
import TypewriterEffect from '../../components/TypewriterEffect';
import { useGameState } from '../../contexts/GameStateContext';
import { useTypewriter } from '../../contexts/TypewriterContext';
import { useCabin } from '../../contexts/CabinContext';

interface CabinExplorationProps {
    onReturnToConversation: () => void;
}

const CabinExploration: React.FC<CabinExplorationProps> = ({ onReturnToConversation }) => {
    const { gameState, setGameState } = useGameState();
    const { setShouldAnimate, setShouldBlink, setOnComplete } = useTypewriter();
    const { cabinState, setCabinState, explorationText, setExplorationText } = useCabin();
    const [displayButtons, setDisplayButtons] = useState(false);

    useEffect(() => {
        setShouldAnimate(true);
        setShouldBlink(true);
        setOnComplete(() => setDisplayButtons(true));
    }, [cabinState.visits, setShouldAnimate, setShouldBlink, setOnComplete]);

    const handleInspectItem = useCallback((item: string) => {
        let response = '';
        switch(item) {
            case 'Go curtains':
                response = "A desk. Beneath a painting of a tower. There’s radio equipment on it. Underneath a drawer. The cat watches you.";
                setCabinState(prev => ({ ...prev, curtainOpened: true }));
                break;
            case 'Go desk':
                response = "A desk with radio equipment on it. There's a drawer underneath.";
                setCabinState(prev => ({ ...prev, deskExamined: true }));
                break;
            case 'Go drawer':
                if (!gameState.inventory?.includes('cabin_key')) {
                    response = "It’s locked. “Oh! I was told to tell you,” Old Friend leaps up onto the desk, “there’s a key here for you. And that it unlocks the desk in this drawer, or the other way around, and that’s where…some - “ the cat sits up straighter, “which is where - something…I’ve forgotten now. Sorry! There’s something in that drawer and the key is in this room. Somewhere.” The cat looks pleased with itself and licks its paw.";
                } else {
                    response = "It’s locked. You have a key in your inventory that might fit.";
                }
                break;
            case 'Use key on drawer':
                response = "It fits. The drawer slides open and reveals its contents. TBA on Context Report";
                setCabinState(prev => ({ ...prev, drawerOpened: true }));
                break;
            case 'Go radio equipment (RM-7)':
                response = "The radio box hums as you sit down behind it. A pair of headphones hangs on a hook on the wall above the desk. A button that has the word TRANSMIT etched above it is duct taped over."
                setCabinState(prev => ({ ...prev, radioExamined: true }));
                break;
            case 'Remove duct tape':
                setCabinState(prev => ({ ...prev, ductTapeRemoved: true }));
                break;
            case 'Press button':
                response = "the TRANSMIT button doesn’t light up."
                setCabinState(prev => ({ ...prev, buttonPressed: true }));
                break;
            case 'Engage RM-7':
                response = "A voice crackles through the headphones: “hey, long time no talk station KGMX - find me some tunes…"
                setCabinState(prev => ({ ...prev, radioEngaged: true }));
                break;
            case 'Pick up headphones':
                // todo - open file tree modal with Fields Manual already selected
                response = "Neil here, this is yet to be implemented. Ultimately, the file tree modal will open with the Fields Manual already selected for the user to view its contents. When they X out of the Fields Manual file tree, they will return to looking around and there will be text here saying \n\n 'The headphones have been added to your inventory'. \n\n The button would then say 'Plug in headphones' instead of 'Pick up headphones'.";
                break;
            case 'Go painting/mantel':
                response = "You stand before a painting of two birds perched atop a hedge wall. Beneath each other stands an archway. A clock hangs between the archways…what’s beyond them is hard to say. A mantel stretches the length of the painting. It holds a simple bowl with a small apple in it.";
                setCabinState(prev => ({ ...prev, mantelExamined: true }));
                break;
            case 'Take apple':
                response = "You take the apple. It's been added to your inventory.";
                setGameState(prevState => ({
                    ...prevState,
                    inventory: [...(prevState.inventory || []), 'apple']
                }));
                break;
            case 'Take bowl':
                response = "You cannot take this bowl, but in picking it up you’ve revealed a key hiding underneath.";
                setCabinState(prev => ({ ...prev, bowlExamined: true }));
                break;
            case 'Take key':
                response = "You take the key from under the bowl. It's been added to your inventory.";
                setGameState(prevState => ({
                    ...prevState,
                    inventory: [...(prevState.inventory || []), 'cabin_key']
                }));
                break;
        }
        if (item === 'Remove duct tape') {
            setExplorationText(prev => `${prev}\n\n> ${item}`);
        } else {
            setExplorationText(prev => `${prev}\n\n> ${item}\n\n${response}`);
        }
        setDisplayButtons(false);
        setShouldAnimate(true);
    }, [setCabinState, setGameState, gameState.inventory, setExplorationText, setShouldAnimate]);

    const renderOptions = useCallback(() => {
        if (!displayButtons) return null;

        return (
            <div className="mt-4 space-y-2">
                {!cabinState.curtainOpened && (
                    <button onClick={() => handleInspectItem('Go curtains')} className="button">
                        Go curtains
                    </button>
                )}
                {/* Desk and radio buttons */}
                {cabinState.curtainOpened && !cabinState.deskExamined && (
                    <button onClick={() => handleInspectItem('Go desk')} className="button">
                        Go desk
                    </button>
                )}
                {cabinState.deskExamined && !cabinState.drawerOpened && (
                    <button onClick={() => handleInspectItem('Go drawer')} className="button">
                        Go drawer
                    </button>
                )}
                {cabinState.deskExamined && !cabinState.drawerOpened && gameState.inventory?.includes('cabin_key') && (
                    <button onClick={() => handleInspectItem('Use key on drawer')} className="button">
                        Use key on drawer
                    </button>
                )}
                {cabinState.deskExamined && !cabinState.radioExamined && (
                    <button onClick={() => handleInspectItem('Go radio equipment (RM-7)')} className="button">
                        Go radio equipment (RM-7)
                    </button>
                )}
                {cabinState.radioExamined && !cabinState.ductTapeRemoved && (
                    <button onClick={() => handleInspectItem('Remove duct tape')} className="button">
                        Remove duct tape
                    </button>
                )}
                {cabinState.ductTapeRemoved && !cabinState.buttonPressed && (
                    <button onClick={() => handleInspectItem('Press button')} className="button">
                        Press button
                    </button>
                )}
                {cabinState.radioExamined && !cabinState.radioEngaged && (
                    <button onClick={() => handleInspectItem('Engage RM-7')} className="button">
                        Engage RM-7
                    </button>
                )}
                {cabinState.radioExamined && (
                    <button onClick={() => handleInspectItem('Pick up headphones')} className="button">
                        Pick up headphones
                    </button>
                )}
                {/* Mantel/Painting buttons */}
                {!cabinState.mantelExamined && (
                    <button onClick={() => handleInspectItem('Go painting/mantel')} className="button">
                        Go painting/mantel on wall
                    </button>
                )}
                {cabinState.mantelExamined && !gameState.inventory?.includes('apple') && (
                    <button onClick={() => handleInspectItem('Take apple')} className="button">
                        Take apple
                    </button>
                )}
                {cabinState.mantelExamined && !cabinState.bowlExamined && (
                    <button onClick={() => handleInspectItem('Take bowl')} className="button">
                        Take bowl
                    </button>
                )}
                {cabinState.bowlExamined && !gameState.inventory?.includes('cabin_key') && (
                    <button onClick={() => handleInspectItem('Take key')} className="button">
                        Take key
                    </button>
                )}
                <button onClick={onReturnToConversation} className="button">
                    Talk to Old Friend
                </button>
            </div>
        );
    }, [cabinState, displayButtons, gameState.inventory, handleInspectItem, onReturnToConversation]);

    return (
        <div className="w-full max-w-2xl">
            <TypewriterEffect 
                text={explorationText}
            />
            {renderOptions()}
        </div>
    );
};

export default CabinExploration;