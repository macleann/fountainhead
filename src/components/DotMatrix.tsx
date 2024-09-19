import React, { useEffect, useState } from 'react';
import playTone from './PlayTone';

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const KEY_MAP: { [key: string]: string } = {
  'a': 'A', 'w': 'A#', 's': 'B', 'd': 'C', 'r': 'C#', 'f': 'D',
  't': 'D#', 'g': 'E', 'h': 'F', 'u': 'F#', 'j': 'G', 'i': 'G#'
};

interface DotMatrixProps {
  isTappable: boolean;
  isVisible: boolean;
  isPlayable?: boolean;
}

const DotMatrix: React.FC<DotMatrixProps> = ({ isTappable, isVisible }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const baseOctave = 4; // Default octave
  const [octaveShift, setOctaveShift] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const note = KEY_MAP[key];
      
      // Handle octave shifts
      if (key === 'z') {
        setOctaveShift(prevShift => Math.max(prevShift - 1, -1)); // Limit downward shift
      } else if (key === 'x') {
        setOctaveShift(prevShift => Math.min(prevShift + 1, 1)); // Limit upward shift
      }

      if (note) {
        setActiveNote(`${note}-${baseOctave + octaveShift}`);
        playTone(note, baseOctave + octaveShift);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setActiveNote(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [octaveShift]);

  // Create a 6x6 grid
  const grid = Array(6).fill(null).map(() => Array(6).fill(null));
  let noteIndex = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const octave = Math.floor(noteIndex / NOTES.length) + 3; // Octaves 3, 4, 5
      grid[i][j] = `${NOTES[noteIndex % NOTES.length]}-${octave}`;
      noteIndex++;
    }
  }

  const handleDotClick = (noteWithOctave: string) => {
    if (isTappable && noteWithOctave) {
      const [note, octave] = noteWithOctave.split('-');
      setActiveNote(noteWithOctave);
      playTone(note, parseInt(octave));
      setTimeout(() => setActiveNote(null), 300); // Reset after 300ms
    }
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className={`fixed inset-0 z-0 ${isTappable ? 'pointer-events-auto' : 'pointer-events-none'} flex items-center justify-center`}>
      <div className="grid grid-cols-6 gap-2">
        {grid.flat().map((noteWithOctave, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(noteWithOctave)}
            className={`w-10 h-10 transition-all duration-150 ${
              noteWithOctave
                ? (activeNote === noteWithOctave 
                    ? 'bg-green-500 opacity-100 scale-110' 
                    : `bg-gray-300 ${isTappable ? 'opacity-25 hover:opacity-75 hover:scale-105' : 'opacity-25'}`)
                : 'bg-transparent'
            } ${isTappable ? 'cursor-pointer' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DotMatrix;