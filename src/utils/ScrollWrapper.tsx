import React, { useRef, useEffect } from 'react';

interface ScrollWrapperProps {
  children: React.ReactNode;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current && anchorRef.current) {
      const observer = new MutationObserver(() => {
        anchorRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      observer.observe(scrollerRef.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div ref={scrollerRef} className="overflow-y-auto h-full bg-black">
      {children}
      <div ref={anchorRef} className="h-px" />
    </div>
  );
};

export default ScrollWrapper;