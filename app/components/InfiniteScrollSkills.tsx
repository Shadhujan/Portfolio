"use client";

import React from "react";
import { skillIconMap } from "@/lib/portfolioData";

interface InfiniteScrollSkillsProps {
  skillsData: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    tools: string[];
    machineLearning?: string[];
    architecture?: string[];
  };
}

const SkillCard = ({ skill }: { skill: string }) => {
  const iconClass = skillIconMap[skill] || "devicon-devicon-plain";
  let displayIconClass = iconClass;
  if (iconClass.startsWith("devicon-") && !iconClass.includes("colored") && !iconClass.includes("text-")) {
    displayIconClass += " colored";
  }

  const isCustomImage = iconClass.startsWith("/") || iconClass.startsWith("http");
  const isGeneric = iconClass.includes("devicon-devicon-plain");

  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-full min-w-max hover:border-emerald-500/50 hover:bg-slate-800 transition-colors group">
      <div className="w-8 h-8 flex items-center justify-center">
        {isCustomImage ? (
          <img 
            src={iconClass} 
            alt={skill} 
            className={`object-contain ${skill === "OpenAI" ? "w-8 h-8 invert p-0.5" : skill === "Render" ? "w-6 h-6 invert" : "w-6 h-6"}`} 
          />
        ) : isGeneric ? (
          <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
            {skill.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <i className={`${displayIconClass} text-2xl`} />
        )}
      </div>
      <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-300 transition-colors">
        {skill}
      </span>
    </div>
  );
};

const ScrollRow = ({
  items,
  direction = "left",
  speed = "normal",
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}) => {
  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  
  // Duplicate items to ensure seamless loop
  const displayItems = [...items, ...items, ...items, ...items];

  // Calculate duration based on approximate content width to ensure consistent visual speed
  // "Machine Learning" (5 items, mixed length) felt right at ~25s.
  // We approximate width as (charCount * 1 + baseWidthPerItem * 6).
  // Factor 0.4 derives from calibrating against the ML section.
  const contentFactor = items.reduce((acc, item) => acc + item.length + 6, 0);
  const duration = `${Math.max(contentFactor * 0.4, 20)}s`;

  return (
    <div className="relative flex overflow-hidden w-full pause-on-hover py-2">
       <div 
         className={`flex gap-4 ${animationClass} whitespace-nowrap`}
         style={{ animationDuration: duration }}
       >
        {displayItems.map((skill, idx) => (
          <SkillCard key={`${skill}-${idx}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const InfiniteScrollSkills = ({ skillsData }: InfiniteScrollSkillsProps) => {
  return (
    <div className="flex flex-col gap-6 w-full py-8 mask-gradient">
      
      {/* 1. Frontend */}
      <div>
        <div className="flex items-center gap-4 mb-2 px-4">
           <span className="h-[1px] bg-slate-800 flex-1"></span>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Frontend</span>
           <span className="h-[1px] bg-slate-800 flex-1"></span>
        </div>
        <ScrollRow items={skillsData.frontend} direction="left" />
      </div>

      {/* 2. Backend & Core */}
      <div>
        <div className="flex items-center gap-4 mb-2 px-4">
           <span className="h-[1px] bg-slate-800 flex-1"></span>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Backend & Core</span>
           <span className="h-[1px] bg-slate-800 flex-1"></span>
        </div>
        <ScrollRow items={[...skillsData.backend, ...skillsData.languages]} direction="right" />
      </div>

      {/* 4. Databases */}
      <div>
        <div className="flex items-center gap-4 mb-2 px-4">
           <span className="h-[1px] bg-slate-800 flex-1"></span>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Database</span>
           <span className="h-[1px] bg-slate-800 flex-1"></span>
        </div>
        <ScrollRow items={skillsData.databases} direction="left" />
      </div>

       {/* 5. DevOps */}
      <div>
        <div className="flex items-center gap-4 mb-2 px-4">
           <span className="h-[1px] bg-slate-800 flex-1"></span>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">DevOps</span>
           <span className="h-[1px] bg-slate-800 flex-1"></span>
        </div>
        <ScrollRow items={skillsData.devops} direction="right" />
      </div>

       {/* 6. Tools */}
      <div>
        <div className="flex items-center gap-4 mb-2 px-4">
           <span className="h-[1px] bg-slate-800 flex-1"></span>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Tools</span>
           <span className="h-[1px] bg-slate-800 flex-1"></span>
        </div>
        <ScrollRow items={skillsData.tools} direction="left" />
      </div>

      {/* 7. Machine Learning */}
      {skillsData.machineLearning && (
        <div>
          <div className="flex items-center gap-4 mb-2 px-4">
             <span className="h-[1px] bg-slate-800 flex-1"></span>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Machine Learning</span>
             <span className="h-[1px] bg-slate-800 flex-1"></span>
          </div>
          <ScrollRow items={skillsData.machineLearning} direction="right" />
        </div>
      )}

      {/* 8. Architecture */}
      {skillsData.architecture && (
        <div>
          <div className="flex items-center gap-4 mb-2 px-4">
             <span className="h-[1px] bg-emerald-900/40 flex-1"></span>
             <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] animate-pulse">Architecture</span>
             <span className="h-[1px] bg-emerald-900/40 flex-1"></span>
          </div>
          <ScrollRow items={skillsData.architecture} direction="left" />
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollSkills;
