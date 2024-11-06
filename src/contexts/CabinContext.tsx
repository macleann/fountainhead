import React, { createContext, useContext, useState } from 'react';

interface CabinState {
  visits: number;
  curtainOpened: boolean;
  deskExamined: boolean;
  drawerOpened: boolean;
  radioExamined: boolean;
  radioEngaged: boolean;
  ductTapeRemoved: boolean;
  buttonPressed: boolean; // todo - is this needed?
  mantelExamined: boolean;
  bowlExamined: boolean;
}

interface CabinContextType {
  cabinState: CabinState;
  setCabinState: React.Dispatch<React.SetStateAction<CabinState>>;
  conversationText: string;
  setConversationText: React.Dispatch<React.SetStateAction<string>>;
  askedQuestions: Set<string>;
  setAskedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
  explorationText: string;
  setExplorationText: React.Dispatch<React.SetStateAction<string>>;
}

const CabinContext = createContext<CabinContextType | undefined>(undefined);

export const CabinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cabinState, setCabinState] = useState<CabinState>({
    visits: 0,
    curtainOpened: false,
    deskExamined: false,
    drawerOpened: false,
    radioExamined: false,
    radioEngaged: false,
    ductTapeRemoved: false,
    buttonPressed: false,
    mantelExamined: false,
    bowlExamined: false,
  });
  const [conversationText, setConversationText] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const [explorationText, setExplorationText] = useState(
    `A simple structure. Classic cabin. Two doors punctuate the thick wooden walls: one at the front with the word STATIC painted on it and one at the back with the word PLEASURE GARDEN on it. A red privacy curtain hangs in the corner. You see a painting on the wall with a mantelpiece beneath it. A large and smooth stone is set in the floor.`
  );

  return (
    <CabinContext.Provider 
      value={{ 
        cabinState, 
        setCabinState,
        conversationText,
        setConversationText,
        askedQuestions,
        setAskedQuestions,
        explorationText, 
        setExplorationText,
      }}
    >
      {children}
    </CabinContext.Provider>
  );
};

export const useCabin = () => {
  const context = useContext(CabinContext);
  if (context === undefined) {
    throw new Error('useCabin must be used within a CabinProvider');
  }
  return context;
};