import React, { useEffect, useState, ReactNode, TouchEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  color?: string;
  content: ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  color = 'white', 
  content,
  width = 'w-80'
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(50);

  // Convert Tailwind width class to pixel value
  const getWidthInPixels = (widthClass: string) => {
    const numStr = widthClass.replace('w-', '');
    if (numStr === 'full') return window.innerWidth;
    if (numStr === '80') return 320; // 20rem * 16px
    if (numStr === '96') return 384; // 24rem * 16px
    return 320; // default fallback
  };

  useEffect(() => {
    if (isOpen) {
      const modalWidth = getWidthInPixels(width);
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - 200;

      const randomX = Math.min(Math.max(0, Math.floor(Math.random() * window.innerWidth - modalWidth)), maxX);
      const randomY = Math.min(Math.max(0, Math.floor(Math.random() * maxY)), maxY);

      setPosition({ x: randomX, y: randomY });
      setZIndex(prev => prev + 1);
    }
  }, [isOpen, width]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setZIndex(prev => prev + 1);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const modalWidth = getWidthInPixels(width);
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - 200;

      const newX = Math.min(Math.max(0, e.clientX - dragOffset.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);

      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
    setZIndex(prev => prev + 1);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      const modalWidth = getWidthInPixels(width);
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - 200;

      const newX = Math.min(Math.max(0, touch.clientX - dragOffset.x), maxX);
      const newY = Math.min(Math.max(0, touch.clientY - dragOffset.y), maxY);

      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed touch-none"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: zIndex
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`bg-black border border-white ${width}`}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div 
          className={`bg-${color} px-2 py-1 flex justify-between items-center`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <span className="text-black text-sm select-none">{title}</span>
          <button 
            onClick={onClose} 
            className="text-black hover:bg-black hover:text-white px-2"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {typeof content === 'string' ? (
            <p className="text-white mb-4">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;