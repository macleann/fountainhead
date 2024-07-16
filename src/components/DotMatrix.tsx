import React, { useEffect, useState } from 'react';
import playTone from './PlayTone';

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'H'];
const KEY_MAP: { [key: string]: string } = {
  'q': 'A', 'w': 'A#', 'e': 'B', 'r': 'C', 't': 'C#', 'y': 'D',
  'u': 'D#', 'i': 'E', 'o': 'F', 'p': 'F#', '[': 'G', ']': 'G#', '{': 'G', '}': 'G#', "\\": 'H', '|': 'H'
};

const DotMatrix: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [baseOctave, setBaseOctave] = useState(4); // Default octave
  const [octaveShift, setOctaveShift] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const note = KEY_MAP[key];
      
      // Handle octave shifts
      if (key === 'a') {
        setOctaveShift(1);
      } else if (key === 'b') {
        setOctaveShift(-1);
      }

      if (note) {
        setActiveNote(`${note}-${baseOctave + octaveShift}`);
        playTone(note, baseOctave + octaveShift);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'a' || key === 'b') {
        setOctaveShift(0);
      }
      setActiveNote(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [baseOctave, octaveShift]);

  // Create an 8x8 grid
  const grid = Array(8).fill(null).map(() => Array(8).fill(null));
  let noteIndex = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (noteIndex < NOTES.length * 3) {
        const octave = Math.floor(noteIndex / NOTES.length) + 3; // Octaves 3, 4, 5
        grid[i][j] = `${NOTES[noteIndex % NOTES.length]}-${octave}`;
        noteIndex++;
      } else if (noteIndex === NOTES.length * 3) {
        grid[i][j] = 'red'; // The 40th dot
        noteIndex++;
      }
    }
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center mt-20">
      <div className="grid grid-cols-8 gap-2">
        {grid.flat().map((noteWithOctave, index) => (
          <div
            key={index}
            className={`w-10 h-10 ${
              noteWithOctave === 'red'
                ? 'bg-red-500 opacity-50'
                : noteWithOctave 
                  ? (activeNote === noteWithOctave ? 'bg-green-500 opacity-100' : 'bg-gray-300 opacity-25')
                  : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DotMatrix;