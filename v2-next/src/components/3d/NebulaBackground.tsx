"use client";
import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleNebula() {
  const ref = useRef<THREE.Points>(null);
  // 4000 particles — restored to near-original density for visual richness
  // while still saving ~20% vs the original 5000
  const count = 4000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 22 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.z = state.clock.elapsedTime * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ec3642"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

const NebulaBackground = memo(function NebulaBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-100">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <fog attach="fog" args={['#050505', 12, 28]} />
        <ParticleNebula />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark pointer-events-none" />
    </div>
  );
});

export default NebulaBackground;
