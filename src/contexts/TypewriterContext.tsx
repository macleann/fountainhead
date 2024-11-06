import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface TypewriterContextType {
  shouldAnimate: boolean;
  setShouldAnimate: (shouldAnimate: boolean) => void;
  shouldBlink: boolean;
  setShouldBlink: (shouldBlink: boolean) => void;
  setOnComplete: (onComplete: () => void) => void;
  triggerComplete: () => void;
}

const TypewriterContext = createContext<TypewriterContextType | undefined>(undefined);

export const TypewriterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [shouldBlink, setShouldBlink] = useState(true);
  const onCompleteRef = useRef<() => void>(() => {});

  const setOnComplete = useCallback((onComplete: () => void) => {
    onCompleteRef.current = onComplete;
  }, []);

  const triggerComplete = useCallback(() => {
    onCompleteRef.current();
  }, []);

  return (
    <TypewriterContext.Provider 
      value={{ 
        shouldAnimate, 
        setShouldAnimate, 
        shouldBlink, 
        setShouldBlink, 
        setOnComplete,
        triggerComplete
      }}
    >
      {children}
    </TypewriterContext.Provider>
  );
};

export const useTypewriter = () => {
  const context = useContext(TypewriterContext);
  if (context === undefined) {
    throw new Error('useTypewriter must be used within a TypewriterProvider');
  }
  return context;
};