import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

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
          <p className="text-white mb-4">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;