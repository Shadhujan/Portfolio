"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skillIconMap } from "@/lib/portfolioData";

interface SkillBubblesProps {
  skills: string[];
}

export default function SkillBubbles({ skills }: SkillBubblesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      layout
      className="relative mx-auto max-w-3xl flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-10 px-4"
    >
      {skills.map((skill, index) => {
        const id = skill;
        const isHovered = hoveredId === id;
        const isAnyHovered = hoveredId !== null;

        // Get icon class and append 'colored' if it's a devicon class
        let iconClass = skillIconMap[skill] || "devicon-devicon-plain";
        if (iconClass.startsWith("devicon-")) {
          iconClass += " colored";
        }

        return (
          <motion.button
            key={id}
            type="button"
            layout
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 shadow-lg overflow-hidden transition-shadow duration-300 ${
              isHovered ? "shadow-2xl z-20" : "z-10"
            }`}
            // Animate width/height for layout shift
            animate={{
              width: isHovered ? 140 : 80, // Expanded vs Normal width
              height: isHovered ? 140 : 80, // Expanded vs Normal height
              opacity: isAnyHovered && !isHovered ? 0.6 : 1, // Dim others
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            {/* Floating animation (only when not hovered to avoid jitter) */}
            <motion.div
              className="flex flex-col items-center justify-center pointer-events-none"
              animate={
                isHovered
                  ? {}
                  : {
                      y: [0, -3, 0],
                    }
              }
              transition={{
                duration: 3 + (index % 3), // Deterministic duration based on index
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.1,
              }}
            >
              <i
                className={`${iconClass} transition-all duration-300 ${
                  isHovered ? "text-6xl" : "text-4xl"
                }`}
              />
            </motion.div>

            {/* Label tooltip - visible only on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-slate-50 shadow-sm pointer-events-none whitespace-nowrap"
            >
              {skill}
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
