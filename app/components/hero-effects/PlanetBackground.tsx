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
  // Normalizing variables
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition); // View direction in camera space

  // Fresnel effect for the rim light
  float fresnel = dot(viewDir, normal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0); // Adjust power to control sharpness

  // Mouse interaction: Calculate direction to mouse
  // Mapping uMouse (0 to 1) to view space roughly
  vec3 lightDir = normalize(vec3(uMouse.x * 2.0 - 1.0, uMouse.y * 2.0 - 1.0, 1.0));
  
  // Diffuse lighting based on mouse position
  float diffuse = max(dot(normal, lightDir), 0.0);
  
  // Combine Fresnel and Diffuse for the glow
  // We want the edge to always glow (Fresnel), and the face to glow based on mouse (Diffuse/Rim)
  
  float glowIntensity = fresnel * 2.5; 
  
  // Add a moving "sun" glow that follows mouse
  // We use the dot product of normal and lightDir, but focused on the edge
  float sunGlow = max(0.0, dot(normal, lightDir));
  sunGlow = pow(sunGlow, 6.0) * 1.5; // Sharp highlight

  vec3 finalColor = mix(vec3(0.0), uGlowColor, fresnel);
  finalColor += uGlowColor * sunGlow; // Add sun highlight

  // Atmospheric fade at the bottom
  float fade = smoothstep(-1.0, 1.0, vPosition.y); 

  gl_FragColor = vec4(finalColor, fresnel * (0.8 + sunGlow * 0.5)); 
}
`;

const Planet = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color("#020617") }, // Dark slate
      uGlowColor: { value: new Color("#22d3ee") }, // Cyan-400
      uMouse: { value: new Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smoothly interpolate mouse position
      const targetX = state.pointer.x * 0.5 + 0.5; // Convert -1..1 to 0..1
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
      position={[0, -viewport.height * 0.65, -8]} // Positioned lower to be a horizon
      scale={[viewport.width * 2, viewport.width * 2, viewport.width * 2]} // Massive scale
    >
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        // blending={THREE.AdditiveBlending}
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
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
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
