import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  color?: string;
  title: string;
  content: string;
  requirePassword?: boolean;
  onPasswordSubmit?: (password: string) => void;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  color = 'white', 
  title, 
  content,
  requirePassword = false,
  onPasswordSubmit
}) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPasswordSubmit) {
      onPasswordSubmit(password);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black border border-white w-80 max-w-full">
        <div className={`bg-${color} px-2 py-1 flex justify-between items-center`}>
          <span className="text-black text-sm">{title}</span>
          <button onClick={onClose} className="text-black">
            ✕
          </button>
        </div>
        <div className="p-4">
          <p className="text-white mb-4">{content}</p>
          {requirePassword && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-black text-white border border-white"
                placeholder="Enter password"
                autoFocus
              />
              <button 
                type="submit"
                className="w-full bg-black hover:bg-white text-white hover:text-black border border-white px-4 py-2"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;