import React from 'react';

interface RootOrWormModalProps {
  isOpen: boolean;
  onClose: () => void;
//   onChoice: () => void;
}

const RootOrWormModal: React.FC<RootOrWormModalProps> = ({ isOpen, onClose }) => { // re-add onChoice
  if (!isOpen) return null;

//   const handleChoice = () => {
//     onChoice();
//     onClose();
//   };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black border border-white w-80">
        <div className="bg-red-600 px-2 py-1 flex justify-between items-center">
          <span className="text-black text-sm">Error</span>
          <button onClick={onClose} className="text-black">
            ✕
          </button>
        </div>
        <div className="p-4">
          <p className="text-white mb-4">you do not have access to the pleasure garden</p>
          <div className="flex justify-end">
            {/* <button
              onClick={handleChoice}
              className="bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2 mr-2"
            >
              root
            </button>
            <button
              onClick={handleChoice}
              className="bg-black hover:bg-white text-white hover:text-black border border-white hover:border-black px-4 py-2"
            >
              worm
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootOrWormModal;