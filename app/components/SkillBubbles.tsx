"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillIconMap } from "@/lib/portfolioData";

interface SkillBubblesProps {
  skills: string[];
}

type SkillDef = {
  id: string;
  label: string;
  iconClass: string;
};

type PositionedSkill = SkillDef & {
  x: number;
  y: number;
  baseSize: number;
  isCenter: boolean;
};

// Skills that should be center / highlighted first
const PRIORITY_ORDER = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "TypeScript",
  "React",
  "Next.js",
  "SQL Server",
  "SQL Server (T-SQL)",
  "Azure",
  "JavaScript",
  "Python",
];

// Layout function: one big center bubble, others in a ring
function layoutSkills(
  rawSkills: SkillDef[],
  activeId: string | null
): PositionedSkill[] {
  if (rawSkills.length === 0) return [];

  // Decide which skill is the center one
  let centerSkill: SkillDef | null = null;

  if (activeId) {
    centerSkill = rawSkills.find((s) => s.id === activeId) ?? null;
  }

  if (!centerSkill) {
    const priority = rawSkills.find((s) =>
      PRIORITY_ORDER.includes(s.label)
    );
    centerSkill = priority ?? rawSkills[0];
  }

  const outerSkills = rawSkills.filter((s) => s.id !== centerSkill!.id);

  // Geometry for the container
  const containerDiameter = 380; // matches w-[380px] / h-[380px]
  const containerRadius = containerDiameter / 2;

  const centerSize = 120;
  const outerSize = 52;

  const outerRadius = 120; // distance of ring from center
  const maxReach = outerRadius + outerSize / 2;
  if (maxReach > containerRadius) {
    // If we ever tweak numbers, make sure ring still fits
    console.warn("Skill ring might overflow container, adjust radii.");
  }

  const positioned: PositionedSkill[] = [];

  // Center skill at (0,0)
  positioned.push({
    ...centerSkill!,
    x: 0,
    y: 0,
    baseSize: centerSize,
    isCenter: true,
  });

  // Outer ring (all other skills)
  const count = outerSkills.length;
  if (count > 0) {
    outerSkills.forEach((skill, index) => {
      const angle = (2 * Math.PI * index) / count - Math.PI / 2; // start at top
      const x = outerRadius * Math.cos(angle);
      const y = outerRadius * Math.sin(angle);

      positioned.push({
        ...skill,
        x,
        y,
        baseSize: outerSize,
        isCenter: false,
      });
    });
  }

  return positioned;
}

export default function SkillBubbles({ skills }: SkillBubblesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { positionedSkills } = useMemo(() => {
    // 1. Convert strings to SkillDef with icons
    const skillDefs: SkillDef[] = skills.map((skill) => {
      let iconClass = skillIconMap[skill] || "devicon-devicon-plain";
      if (iconClass.startsWith("devicon-")) {
        iconClass += " colored";
      }
      return {
        id: skill,
        label: skill,
        iconClass,
      };
    });

    // 2. Sort by priority so important skills usually get center first
    skillDefs.sort((a, b) => {
      const idxA = PRIORITY_ORDER.indexOf(a.label);
      const idxB = PRIORITY_ORDER.indexOf(b.label);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.label.localeCompare(b.label);
    });

    // 3. Layout with current activeId (center bubble)
    const positioned = layoutSkills(skillDefs, activeId);

    return { positionedSkills: positioned };
  }, [skills, activeId]);

  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="
          relative w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]
          rounded-full bg-slate-950/60 border border-slate-800
          shadow-[0_0_80px_rgba(0,0,0,0.9)]
          overflow-hidden flex items-center justify-center
        "
      >
        {/* Outer soft ring, similar to your screenshot */}
        <div className="absolute inset-8 rounded-full border border-slate-800/50 pointer-events-none" />

        {positionedSkills.map((skill, index) => {
          const isHovered = hoveredId === skill.id;
          const isCenter = skill.isCenter;
          const hasHover = hoveredId !== null;

          // Center bubble is always big.
          // Outer ones get slightly smaller if something is hovered.
          const targetScale = isCenter
            ? isHovered
              ? 1.05
              : 1
            : hasHover
            ? isHovered
              ? 1.1
              : 0.8
            : 1;

          const opacity = isCenter ? 1 : hasHover && !isHovered ? 0.8 : 1;

          return (
            <motion.button
              key={skill.id}
              type="button"
              className="absolute rounded-full bg-slate-950 flex items-center justify-center shadow-lg border border-slate-800"
              style={{
                width: skill.baseSize,
                height: skill.baseSize,
                zIndex: isCenter || isHovered ? 40 : 10,
              }}
              initial={{ x: skill.x, y: skill.y, scale: 0.9 }}
              animate={{
                x: skill.x,
                y: skill.y,
                scale: targetScale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              onMouseEnter={() => {
                setHoveredId(skill.id);
                // Make this skill the new center
                setActiveId(skill.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Inner icon with subtle breathing animation */}
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: index * 0.08,
                }}
              >
                <i
                  className={`${skill.iconClass} transition-all duration-300`}
                  style={{
                    fontSize: `${skill.baseSize * (skill.isCenter ? 0.45 : 0.5)}px`,
                  }}
                />
              </motion.div>

              {/* Tooltip only on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-50 pointer-events-none border border-slate-700"
                >
                  {skill.label}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
