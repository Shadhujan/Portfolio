"use client";

import React, { useMemo } from 'react';

interface GlitchTextProps {
  text: string;
  isHovered: boolean;
  glitchColor?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, isHovered, glitchColor = '#8b5cf6' }) => {
  const letters = useMemo(() => text.split('').map((char, index) => {
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    const randomRot = Math.random() * 15 - 7.5;
    const randomScale = 1 + Math.random() * 0.1;

    const letterStyle = isHovered ? {
      transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(${randomScale})`,
      opacity: Math.random() > 0.1 ? 1 : 0.2,
      transitionDelay: `${index * 0.05}s`,
    } : {
      transform: 'translate(0, 0) rotate(0deg) scale(1)',
      opacity: 1,
      transitionDelay: '0s',
    };

    return (
      <span
        key={index}
        className="inline-block transition-all duration-300 ease-in-out"
        style={letterStyle}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  }), [text, isHovered]);

  return (
    <div 
        className="inline-block relative" 
        style={{ 
            filter: isHovered ? 'url(#glitch-filter)' : 'none',
            '--glitch-color': glitchColor 
        } as React.CSSProperties}
    >
      {/* SVG Filter Definition - Included here to ensure it's available */}
      <svg className="hidden absolute">
        <filter id="glitch-filter">
          <feTurbulence baseFrequency="0.02 0.05" numOctaves="2" result="noise" seed="1"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={isHovered ? 50 : 0} xChannelSelector="R" yChannelSelector="G"/>
          <feOffset in="SourceGraphic" dx={isHovered ? 4 : 0} dy={0} result="redShift"/>
          <feOffset in="SourceGraphic" dx={isHovered ? -4 : 0} dy={0} result="blueShift"/>
          <feBlend in="redShift" in2="blueShift" mode="screen" result="glitched"/>
        </filter>
      </svg>
      
      {/* Custom Styles for the filter offset colors */}
      <style jsx={true}>{`
        #glitch-filter feOffset[in="redShift"] {
            flood-color: var(--glitch-color);
            flood-opacity: 1;
        }
        #glitch-filter feOffset[in="blueShift"] {
            flood-color: var(--glitch-color);
            flood-opacity: 1;
        }
      `}</style>
      
      {letters}
    </div>
  );
};

export default GlitchText;
