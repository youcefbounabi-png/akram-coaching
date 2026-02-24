import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Capsule, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  // Hoist reusable objects to avoid per-frame allocation (GC pressure fix)
  const _target = useRef(new THREE.Vector3());
  const _up = useRef(new THREE.Vector3(0, 1, 0));
  const _mat4 = useRef(new THREE.Matrix4());
  const _targetQuat = useRef(new THREE.Quaternion());

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !auraRef.current) return;

    // 1. Follow cursor (Interactive) — reuse pre-allocated objects, zero GC
    _target.current.set(state.pointer.x * 4, state.pointer.y * 4, 5);
    _mat4.current.lookAt(groupRef.current.position, _target.current, _up.current);
    _targetQuat.current.setFromRotationMatrix(_mat4.current);
    groupRef.current.quaternion.slerp(_targetQuat.current, 0.05);

    // 2. Breathing / Pulsing coloured energy
    const time = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(time * 2.5) * 0.15;
    const auraPulse = 1 + Math.sin(time * 2.5 + Math.PI) * 0.1;

    coreRef.current.scale.set(pulse, pulse, pulse);
    auraRef.current.scale.set(auraPulse, auraPulse, auraPulse);

    // Rotate aura
    auraRef.current.rotation.y = time * 0.5;
    auraRef.current.rotation.z = time * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Head */}
        <Sphere args={[0.4, 24, 24]} position={[0, 1.6, 0]}>
          <MeshDistortMaterial color="#050505" emissive="#ec3642" emissiveIntensity={0.4} distort={0.2} speed={2} wireframe />
        </Sphere>

        {/* Torso / Armor */}
        <Capsule args={[0.65, 1.2, 4, 24]} position={[0, 0, 0]}>
          <MeshDistortMaterial color="#050505" emissive="#ec3642" emissiveIntensity={0.2} distort={0.1} speed={1} wireframe />
        </Capsule>

        {/* Energy Core (Heart) */}
        <Sphere ref={coreRef} args={[0.25, 24, 24]} position={[0, 0.3, 0.3]}>
          <meshStandardMaterial color="#ffffff" emissive="#ff3333" emissiveIntensity={4} toneMapped={false} />
        </Sphere>

        {/* Outer Energy Aura */}
        <Sphere ref={auraRef} args={[0.8, 24, 24]} position={[0, 0.2, 0]}>
          <MeshDistortMaterial color="#ec3642" transparent opacity={0.15} distort={0.5} speed={3} side={THREE.BackSide} />
        </Sphere>

        {/* Abstract Shoulders */}
        <Sphere args={[0.35, 12, 12]} position={[-1, 0.6, 0]}>
          <MeshDistortMaterial color="#050505" emissive="#ec3642" emissiveIntensity={0.5} wireframe />
        </Sphere>
        <Sphere args={[0.35, 12, 12]} position={[1, 0.6, 0]}>
          <MeshDistortMaterial color="#050505" emissive="#ec3642" emissiveIntensity={0.5} wireframe />
        </Sphere>
      </Float>
    </group>
  );
}

export default function FitnessAvatar() {
  return (
    <div className="absolute inset-0 z-10 cursor-crosshair">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ec3642" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <AvatarModel />
      </Canvas>
    </div>
  );
}
