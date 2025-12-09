"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const FloatingCards = () => {
  const [cards, setCards] = useState([
    { id: "code", title: "Code", color: "from-emerald-500 to-teal-500", icon: "💻" },
    { id: "design", title: "Design", color: "from-violet-500 to-purple-500", icon: "🎨" },
    { id: "deploy", title: "Deploy", color: "from-blue-500 to-cyan-500", icon: "🚀" },
  ]);

  const moveToEnd = (fromIndex: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [movedCard] = newCards.splice(fromIndex, 1);
      newCards.push(movedCard);
      return newCards;
    });
  };

  const handleCardClick = () => {
    moveToEnd(0);
  };

  // Mouse position state for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] flex items-center justify-center perspective-1000 cursor-pointer"
      onClick={handleCardClick}
    >
      {cards.map((card, index) => {
        // Calculate visual properties based on index
        // Index 0 is front, 1 is middle, 2 is back
        // We want them to stack: Front (bottom-right), Middle (center), Back (top-left)
        // Wait, original design was: Back (top-right), Middle (more bottom-right), Front (most bottom-right)
        // Let's reverse the visual mapping so index 0 (Front) is at the front visually.
        
        return (
          <Card
            key={card.id}
            data={card}
            index={index}
            total={cards.length}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        );
      })}
    </div>
  );
};

const Card = ({ data, index, total, mouseX, mouseY }: any) => {
  // Visual position calculations
  // index 0 = Front
  // index 1 = Middle
  // index 2 = Back
  
  // We want the front card to be at z-index 30, middle 20, back 10
  const zIndex = (total - index) * 10;
  
  // Offset calculations
  // Front: 0, 0
  // Middle: -20, -20
  // Back: -40, -40
  // But in the original design they were offset positively (top/right).
  // Let's replicate the "cascading" look.
  // Front (index 0): top-30 right-30 (largest offset from top/right origin)
  // Middle (index 1): top-20 right-20
  // Back (index 2): top-10 right-10
  
  // Let's use transforms instead of absolute positioning classes for smoother animation
  const yOffset = index * -40; // 0, -40, -80
  const xOffset = index * -40; // 0, -40, -80
  const scale = 1 - index * 0.05; // 1, 0.95, 0.9
  const opacity = 1 - index * 0.2; // 1, 0.8, 0.6
  
  // Parallax effects
  // Front card moves more than back cards
  const depth = 3 - index; 
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10 * depth, -10 * depth]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10 * depth, 10 * depth]), { stiffness: 150, damping: 20 });
  
  return (
    <motion.div
      layoutId={data.id}
      style={{ 
        rotateX, 
        rotateY, 
        zIndex,
      }}
      animate={{
        scale,
        opacity,
        x: xOffset + 40, // Center adjustment
        y: yOffset + 40, // Center adjustment
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={`absolute w-48 h-64 rounded-2xl bg-gradient-to-br ${data.color} p-1 shadow-xl backdrop-blur-sm border border-white/10 origin-center`}
    >
      <div className="w-full h-full bg-slate-950/90 rounded-xl p-4 flex flex-col justify-between select-none">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
          {data.icon}
        </div>
        <div>
          <div className="h-2 w-16 bg-white/10 rounded mb-2" />
          <div className="h-2 w-24 bg-white/10 rounded mb-2" />
          <div className="h-2 w-20 bg-white/10 rounded" />
        </div>
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          {data.title}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCards;
