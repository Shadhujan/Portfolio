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
      className="relative mx-auto max-w-xl grid grid-cols-4 sm:grid-cols-5 gap-4 sm:gap-5 justify-items-center py-4"
    >
      {skills.map((skill, index) => {
        // Use the skill name as ID for simplicity
        const id = skill;
        const isHovered = hoveredId === id;
        const iconClass = skillIconMap[skill] || "devicon-devicon-plain"; // Fallback icon

        return (
          <motion.button
            key={id}
            type="button"
            layout
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.45)] aspect-square w-14 sm:w-16 md:w-20 overflow-hidden"
            whileHover={{ scale: 1.4, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* subtle floating animation */}
            <motion.div
              className="flex flex-col items-center justify-center"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.15,
              }}
            >
              <i
                className={`${iconClass} text-2xl sm:text-3xl md:text-4xl`}
              />
            </motion.div>

            {/* label bubble appears only when hovered */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.18 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/95 px-3 py-1 text-[10px] text-slate-50 border border-slate-700 shadow-lg pointer-events-none whitespace-nowrap z-20"
            >
              {skill}
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
