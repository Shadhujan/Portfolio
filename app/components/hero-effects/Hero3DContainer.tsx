"use client";

import React, { useState, useRef } from 'react';

interface Hero3DContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Hero3DContainer: React.FC<Hero3DContainerProps> = ({ children, className = '' }) => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setCursorX(x);
    setCursorY(y);

    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
  };

  const dynamicTransformStyle = {
    transform: `perspective(1200px) rotateX(${(cursorY - 0.5) * 8}deg) rotateY(${(cursorX - 0.5) * -8}deg)`,
    transition: 'transform 0.5s ease-out'
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <div 
        className="transition-all duration-500 ease-out"
        style={dynamicTransformStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero3DContainer;
