"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 250 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    sizes[i] = Math.random() * 1.5 + 0.3;
    opacities[i] = Math.random() * 0.5 + 0.2;
  }

  // 15-20% faster rotation
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.025; // was 0.02
    mesh.current.rotation.x = t * 0.012; // was 0.01

    // Breathing
    const scale = 1 + Math.sin(t * 0.35) * 0.04; // was 0.3 speed
    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#D6B36A"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  // 15% faster motion
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed * 1.15 + offset.current;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.35) * 0.3;
    meshRef.current.position.z = position[2] + Math.sin(t * 0.25) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.06}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-50">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#D6B36A" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#E8D4A2" />
        <pointLight position={[0, 0, 8]} intensity={0.1} color="#C8CCD4" />
        <Particles count={200} />
        <FloatingOrb position={[-5, 2, -4]} color="#D6B36A" scale={2} speed={0.8} />
        <FloatingOrb position={[5, -1, -6]} color="#E8D4A2" scale={2.5} speed={0.6} />
        <FloatingOrb position={[0, 4, -10]} color="#C8CCD4" scale={3.5} speed={0.5} />
        <FloatingOrb position={[-3, -3, -5]} color="#D6B36A" scale={1.5} speed={1} />
      </Canvas>
    </div>
  );
}
