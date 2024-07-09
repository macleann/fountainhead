import React, { useState, useEffect } from 'react';
import TypewriterEffect from '../components/TypewriterEffect';

const JournalPage: React.FC = () => {
  const currentDate = new Date();
  const journalEntries = [
    { 
      date: new Date('2024-07-09'), 
      text: "cabinated freedom path bleakly goes, tumbling, wildly along with complete yada yada yada yada yada yada yada for hopeful impact with concerned citizen invested only in the accounts given by folks living here years earlier while deep toff rolls about within a luxurious bin made there by frequencies which that who whom escaped control and went on to annihilate separate and regulated persons in direct commission with traders previously believed worthy and active in their attempts to partition areas located beyond normal and familiar grounds of restriction. equally combined and usually given to fits of how-now, all connected persons spread wide their arms in greet of the new arena, preparing not themselves but their others in wake of newest tragedy and willy-bothering."
    },
    { 
      date: new Date('2024-07-16'), 
      text: "several agents found the matter incalculable to the now modern taste, or at least felt as much, and so spent final bits of change on placeholders, delivered from the snowier highlands, mentioned presently. pakri ma ha bagrame included second chances for Buckyard MPG at intervals sanctioned for the approval of ministry officiates. these encounters proved highly evocative of a late fashion and easily removable for all persons of weather, becoming known as the thirdmost, and last, source of True Proximity, in these cases concerning MPGs, locally and globally."
    },
    { 
      date: new Date('2024-07-23'), 
      text: "as it were, a reputation established for the ministry officiates reflected significant growth in the early quarters of the periods, both at home and not at home. pondwideresults garnered in the wake of the final travesty, including analysis concerned with the importation of countered sub-annuities at general rates, gave weight to the events of the afternoon and all opinions express before natural fibers. most continuities felt intimidates at the outpour publicly growing for the ineptitudes received by MPG Primer. ma ha took little notice at the disapproval there displayed as crazemakers burnt themselves openly in hopes of achieving further recognition for crimes, and pleasurable acts, that had origins in maps little known beyond the towns fourfolded."
    },
    { 
      date: new Date('2024-07-30'), 
      text: "gliding, slowly, out and down, victoids were finally awarded with outfitted medals, and strapped to the knees of non-victs, unexpressed, there could be seen a faint black which drew its corners back and forth, alluding the inventions proposed, mystifying common unidentified men. such was the way of a strange land, proving useful when the shop was empty yet simple and dangerous during self-avoidance."
    }
  ];

  const visibleEntries = journalEntries.filter(entry => entry.date <= currentDate);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (currentEntryIndex < visibleEntries.length - 1 && isTypingComplete) {
      const timer = setTimeout(() => {
        setCurrentEntryIndex(prev => prev + 1);
        setIsTypingComplete(false);
      }, 1000); // Wait 1 second before starting the next entry
      return () => clearTimeout(timer);
    }
  }, [currentEntryIndex, isTypingComplete, visibleEntries.length]);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-5 font-mono text-white">
      {visibleEntries.slice(0, currentEntryIndex + 1).map((entry, index) => (
        <div key={index} className="mb-8 max-w-2xl">
          {index === currentEntryIndex ? (
            <TypewriterEffect 
              text={entry.text} 
              onComplete={() => setIsTypingComplete(true)}
            />
          ) : (
            <div className="text-lg font-mono text-white">{entry.text}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalPage;