import React, { createContext, useState, useContext } from 'react';

type Font = 'amethysta' | 'tiny5' | 'wittgenstein';

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [font, setFont] = useState<Font>('amethysta');

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};