"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { skillIconMap } from "@/lib/portfolioData";
import * as THREE from "three";

interface SkillOrbitProps {
  skills: string[];
}

const SkillNode = ({
  position,
  label,
  iconClass,
}: {
  position: THREE.Vector3;
  label: string;
  iconClass: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const isGeneric = iconClass.includes("devicon-devicon-plain");
  const isCustomImage = iconClass.startsWith("/");

  return (
    <group position={position}>
      <Html center distanceFactor={12} zIndexRange={[1000, 0]}>
        <div
          className={`
            relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${hovered ? "scale-125 z-50" : "scale-100 opacity-80"}
          `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`
              w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden
              ${hovered ? "border-emerald-500 bg-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.4)]" : ""}
            `}
          >
            {isCustomImage ? (
              <img src={iconClass} alt={label} className="w-8 h-8 object-contain" />
            ) : isGeneric ? (
              <span className="text-sm font-bold text-slate-300">{label.slice(0, 2).toUpperCase()}</span>
            ) : (
              <i className={`${iconClass} text-2xl`} />
            )}
          </div>
          <div
            className={`
              mt-2 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-200 whitespace-nowrap
              transition-opacity duration-300
              ${hovered ? "opacity-100" : "opacity-0"}
            `}
          >
            {label}
          </div>
        </div>
      </Html>
    </group>
  );
};

const RotatingGroup = ({ skills }: { skills: string[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  const nodes = useMemo(() => {
    const tempNodes = [];
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y

      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Scale up to sphere radius
      const sphereRadius = 6;
      const position = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);

      let iconClass = skillIconMap[skills[i]] || "devicon-devicon-plain";
      if (iconClass.startsWith("devicon-")) {
        iconClass += " colored";
      }

      tempNodes.push({
        id: skills[i],
        label: skills[i],
        iconClass,
        position,
      });
    }
    return tempNodes;
  }, [skills]);

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <SkillNode
          key={node.id}
          position={node.position}
          label={node.label}
          iconClass={node.iconClass}
        />
      ))}
    </group>
  );
};

const SkillOrbit = ({ skills }: SkillOrbitProps) => {
  return (
    <div className="w-full h-[500px] relative cursor-move">
      <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
        <fog attach="fog" args={["#020617", 10, 25]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <RotatingGroup skills={skills} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default SkillOrbit;
