"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, Vector2, Vector3 } from "three";
import * as THREE from "three";

// Vertex Shader
const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
uniform vec3 uColor;
uniform vec3 uGlowColor;
uniform vec2 uMouse;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition);

  // Fresnel
  float fresnel = dot(viewDir, normal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 2.0); // Sharper edge (lower power = thicker edge)

  // Mouse Light
  vec3 lightDir = normalize(vec3(uMouse.x * 2.0 - 1.0, uMouse.y * 2.0 - 1.0, 1.0));
  
  // Sun/Hotspot
  float sunGlow = max(0.0, dot(normal, lightDir));
  sunGlow = pow(sunGlow, 4.0) * 4.0; // Lower power = wider glow, Higher multiplier = brighter

  vec3 finalColor = uColor; 
  finalColor += uGlowColor * fresnel * 4.0; // Extremely bright edge
  finalColor += uGlowColor * sunGlow; 

  // Make sure alpha is high enough
  gl_FragColor = vec4(finalColor, 1.0); 
}
`;

const Planet = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color("#0f172a") }, // Darker slate
      uGlowColor: { value: new Color("#38bdf8") }, // Sky-400
      uMouse: { value: new Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      const targetX = state.pointer.x * 0.5 + 0.5;
      const targetY = state.pointer.y * 0.5 + 0.5;
      
      materialRef.current.uniforms.uMouse.value.lerp(
        new Vector2(targetX, targetY),
        0.1
      );
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, -1.5, -4]} // Hardcoded to be clearly visible at bottom of screen
      scale={[10, 10, 10]} // Fixed large scale
    >
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true} // Allow glow transparency
        depthWrite={false}
      />
    </mesh>
  );
};

// Stars for background depth
const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  const [positions, sizes] = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 30; // Radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      sizes[i] = Math.random() * 1.5;
    }
    
    return [positions, sizes];
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
};

const PlanetBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Planet />
        <Stars />
        {/* Fog to blend the bottom if needed */}
        {/* <fog attach="fog" args={['#020617', 5, 20]} /> */}
      </Canvas>
      {/* Overlay gradient to help blend text legibility if needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
    </div>
  );
};

export default PlanetBackground;
