import React from 'react';
import { useGameState } from '../../contexts/GameStateContext';
import CabinStart from './CabinStart';
import CabinReturn from './CabinReturn';

const CabinHandler: React.FC = () => {
    const { gameState, setGameState } = useGameState();

    if (!gameState?.locations.includes('cabin')) {
        setGameState(prev => ({
            ...prev,
            locations: ['cabin'],
        }));
    }

    if (gameState?.last_visited !== 'cabin') {
        setGameState(prev => ({
            ...prev,
            last_visited: 'cabin',
        }));
    }

    console.log('gameState:', gameState);
    
    if (!gameState?.prologue_complete) {
        return <CabinStart />;
    }

    return <CabinReturn />;
};

export default CabinHandler;