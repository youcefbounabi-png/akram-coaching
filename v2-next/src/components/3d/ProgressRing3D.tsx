"use client";
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function HUD() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.z = t * 0.5;
    if (ring2.current) ring2.current.rotation.z = -t * 0.3;
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.2;
      ring3.current.rotation.y = t * 0.4;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Outer Progress Ring */}
        <Torus ref={ring1} args={[2.2, 0.03, 16, 100, Math.PI * 1.5]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#ec3642" emissive="#ec3642" emissiveIntensity={2} />
        </Torus>
        
        {/* Inner Wireframe Ring */}
        <Torus ref={ring2} args={[1.8, 0.05, 16, 100, Math.PI * 2]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} wireframe />
        </Torus>

        {/* Core Abstract Ring */}
        <Torus ref={ring3} args={[1.4, 0.01, 8, 50]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#ec3642" emissive="#ec3642" emissiveIntensity={1} wireframe />
        </Torus>

        {/* Center Text */}
        <Text position={[0, 0.2, 0]} fontSize={1.2} color="#ffffff" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8pn62IFA.woff">
          90
        </Text>
        <Text position={[0, -0.6, 0]} fontSize={0.3} color="#ec3642" anchorX="center" anchorY="middle" letterSpacing={0.2} font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8pn62IFA.woff">
          DAYS
        </Text>
      </Float>
    </group>
  );
}

export default function ProgressRing3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ec3642" />
        <HUD />
      </Canvas>
    </div>
  );
}
