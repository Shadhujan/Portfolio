"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px] animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-violet-500/20 blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-teal-500/20 blur-[100px] animate-blob animation-delay-6000" />
      </div>

      {/* Planet Horizon Effect - Precise Re-creation */}
      {/* 1. The dark planet body covering the bottom */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[300%] aspect-square rounded-[100%] bg-slate-950 z-0 pointer-events-none" />
      
      {/* 2. The sharp bright atmospheric edge (The Line) */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[300%] aspect-square rounded-[100%] border-t-[3px] border-cyan-200/80 shadow-[0_-4px_30px_rgba(34,211,238,0.6)] z-0 pointer-events-none" />

      {/* 3. The atmospheric glow/haze above the horizon */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[300%] aspect-square rounded-[100%] bg-transparent shadow-[0_-20px_100px_rgba(6,182,212,0.5)] z-0 pointer-events-none mix-blend-screen" />
      
      {/* 4. Secondary blue ambient glow for depth */}
      <div className="absolute top-[46%] left-1/2 -translate-x-1/2 w-[300%] aspect-square rounded-[100%] border-t-[20px] border-sky-600/20 blur-[30px] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </div>
  );
};

export default AuroraBackground;
