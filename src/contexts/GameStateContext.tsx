import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export type GameState = {};

interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  lastSave: Date;
  updateGameState: (newState: GameState) => Promise<void>;
  clearGameState: () => Promise<void>;
}

const defaultDate = new Date('2024-09-19T00:00:00Z');

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({});
  const [lastSave, setLastSave] = useState<Date>(defaultDate);

  useEffect(() => {
    // Fetch initial game state
    api.get('/game-state')
      .then(response => {
        setGameState(response.data.state);
        setLastSave(new Date(response.data.last_updated));
      })
      .catch(error => console.error('Failed to fetch game state:', error));
  }, []);

  const updateGameState = async (newState: GameState) => {
    try {
      const response = await api.post('/game-state', { game_state: newState });
      setGameState(response.data.state);
      setLastSave(new Date(response.data.last_updated));
    } catch (error) {
      console.error('Failed to update game state:', error);
    }
  };

  const clearGameState = async () => {
    try {
      const response = await api.post('/game-state/clear');
      setGameState(response.data.state);
      setLastSave(new Date(response.data.last_updated));
    } catch (error) {
      console.error('Failed to clear game state:', error);
    }
  }

  return (
    <GameStateContext.Provider value={{ gameState, setGameState, lastSave, updateGameState, clearGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};