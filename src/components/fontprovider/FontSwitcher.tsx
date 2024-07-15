// FontSwitcher.tsx
import React from 'react';
import { useFont } from './FontContext';

const FontSwitcher: React.FC = () => {
  const { font, setFont } = useFont();

  return (
    <div className="absolute top-4 right-4 flex space-x-2">
      <button
        className={`px-3 py-1 rounded font-amethysta ${font === 'amethysta' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        onClick={() => setFont('amethysta')}
      >
        Amethysta
      </button>
      <button
        className={`px-3 py-1 rounded font-tiny5 ${font === 'tiny5' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        onClick={() => setFont('tiny5')}
      >
        Tiny5
      </button>
      <button
        className={`px-3 py-1 rounded font-wittgenstein ${font === 'wittgenstein' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        onClick={() => setFont('wittgenstein')}
      >
        Wittgenstein
      </button>
    </div>
  );
};

export default FontSwitcher;