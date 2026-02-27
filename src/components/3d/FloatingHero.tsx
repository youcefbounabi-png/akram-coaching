import { useRef, useEffect, useMemo, memo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Octahedron, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// EnergyCore
// ---------------------------------------------------------------------------
function EnergyCore({ color = '#ff1428' }) {
  const r = 1.0;
  const rodRadius = 0.004;

  const verts = useMemo(() => [
    new THREE.Vector3(r, 0, 0),
    new THREE.Vector3(-r, 0, 0),
    new THREE.Vector3(0, r, 0),
    new THREE.Vector3(0, -r, 0),
    new THREE.Vector3(0, 0, r),
    new THREE.Vector3(0, 0, -r),
  ], [r]);

  // Pyramid edges
  const edgeIndices = [
    [2, 0], [2, 1], [2, 4], [2, 5],
    [3, 0], [3, 1], [3, 4], [3, 5],
  ];

  const UP = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  return (
    <group>
      {/* 1. Central Vertical Spine */}
      <mesh position={[0, 0, 0]}>
        {/* Reduced from 64 → 12 segments — rod is 0.008 units wide, difference invisible */}
        <cylinderGeometry args={[rodRadius, rodRadius, r * 2, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
      </mesh>

      {/* 2. Coordinated Pyramid Edges */}
      {edgeIndices.map(([a, b], i) => {
        const start = verts[a];
        const end = verts[b];
        const dir = end.clone().sub(start);
        const len = dir.length();
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            {/* Reduced from 64 → 12 segments */}
            <cylinderGeometry args={[rodRadius * 0.8, rodRadius * 0.8, len, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.2} toneMapped={false} />
          </mesh>
        );
      })}

      {/* 3. Precision Vertex Nodes */}
      {verts.map((v, i) => (
        <mesh key={i} position={v}>
          {/* Reduced from 32x32 → 16x16 — tiny dots, imperceptible difference */}
          <sphereGeometry args={[rodRadius * 2.5, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
      ))}

      {/* 4. The Pulsing Heart */}
      <Octahedron args={[0.35, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.15} toneMapped={false} />
      </Octahedron>
    </group>
  );
}

// ---------------------------------------------------------------------------
// ChiseledCrystal
// ---------------------------------------------------------------------------
const isLowPower =
  typeof window !== 'undefined' &&
  (window.devicePixelRatio <= 1 || window.matchMedia('(max-width: 768px)').matches);

function ChiseledCrystal() {
  const groupRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, mouse.current.y * 0.4, 0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, t * 0.15 + mouse.current.x * 0.4, 0.05
      );
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }

    if (glowLightRef.current) {
      glowLightRef.current.intensity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Outer Glass Shell */}
        <Octahedron args={[1.8, 0]}>
          <MeshTransmissionMaterial
            backside={false}
            thickness={2.5}
            chromaticAberration={0.03}
            anisotropicBlur={0.05}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
            envMapIntensity={0.8}
            roughness={0.05}
            metalness={0.1}
            transmission={0.98}
            ior={1.4}
            color="#dddddd"
            // Reduced from 512 → 256 (halves FBO cost); 128 on low-power devices
            resolution={isLowPower ? 128 : 256}
          />
        </Octahedron>

        {/* Coordinated Internal Energy Core */}
        <EnergyCore color="#ff1428" />

        {/* Center glowing point light */}
        <pointLight ref={glowLightRef} position={[0, 0, 0]} intensity={0.5} color="#ec3642" distance={6} />
      </group>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// FloatingHero
// ---------------------------------------------------------------------------
const FloatingHero = memo(function FloatingHero({ isRTL = false }: { isRTL?: boolean }) {
  // Use a state to track viewport width so the 3D canvas can adapt
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, push it further to the edge (or let it stay deep but scale it down)
  const posX = isRTL ? (isMobile ? 1.8 : 2.5) : (isMobile ? -1.8 : -2.5);
  const scale = isMobile ? 0.8 : 1.3;
  const posY = isMobile ? -0.5 : 0.5;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 md:opacity-70 transition-opacity duration-1000 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ec3642" />

        <group position={[posX, posY, -1]} scale={scale}>
          <ChiseledCrystal />
        </group>

        <Environment files={['/potsdamer_platz_1k.hdr']} />
      </Canvas>
    </div>
  );
});

export default FloatingHero;
