"use client";

import React, { useMemo } from 'react';

interface VoxelGridProps {
  currentPalette?: {
    glitch: string;
  };
}

const VoxelGrid: React.FC<VoxelGridProps> = ({ currentPalette }) => {
  const glitchColor = currentPalette?.glitch || '#8b5cf6';

  const voxels = useMemo(() => {
    const voxelElements = [];
    const size = 20; 
    for (let i = 0; i < size * size; i++) {
      voxelElements.push(<div key={i} className="voxel transition-opacity duration-300"></div>);
    }
    return voxelElements;
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ '--glitch-color': glitchColor } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 grid opacity-10 pointer-events-auto" 
        style={{ 
          gridTemplateColumns: `repeat(20, 1fr)`,
          gridTemplateRows: `repeat(20, 1fr)`,
        }}
      >
        {voxels}
      </div>
      
      <style jsx={true}>{`
        .voxel {
          border: 1px solid rgba(255, 255, 255, 0.02);
          position: relative;
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        
        .voxel:hover { 
            opacity: 0.8 !important; 
        }

        .voxel::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: var(--glitch-color);
            transform: translate(-50%, -50%);
            opacity: 0;
            animation: pulse-voxel 4s infinite ease-in-out;
            transition: opacity 0.5s;
        }

        @keyframes pulse-voxel {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default VoxelGrid;
