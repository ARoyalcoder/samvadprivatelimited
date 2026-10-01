"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PerceptionCore() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const wireframeRef = React.useRef<THREE.LineSegments>(null);
  const particlesRef = React.useRef<THREE.Points>(null);

  // Generate deterministic particle field for media narrative nodes
  const [particlePositions] = React.useState(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.4;
      const sinPhi = Math.sin(phi);
      positions[i * 3] = r * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((_, delta) => {
    // Clamp delta to prevent huge jumps on tab switch / lag spike
    const clampedDelta = Math.min(delta, 0.1);
    if (meshRef.current) {
      meshRef.current.rotation.y += clampedDelta * 0.12;
      meshRef.current.rotation.x += clampedDelta * 0.04;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= clampedDelta * 0.08;
      wireframeRef.current.rotation.z += clampedDelta * 0.02;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += clampedDelta * 0.05;
    }
  });

  return (
    <group>
      {/* Internal ambient glowing perception core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshStandardMaterial
          color="#161a22"
          emissive="#c39651"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer geodesic wireframe grid */}
      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(2.0, 2)]} />
        <lineBasicMaterial color="#c39651" transparent opacity={0.35} />
      </lineSegments>

      {/* Narrative node particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#f5e0b7" transparent opacity={0.85} sizeAttenuation />
      </points>
    </group>
  );
}

export function PerceptionGlobe() {
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);

    // Viewport Intersection Observer: Pause WebGL canvas rendering when out of viewport
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsVisible(entry?.isIntersecting ?? true);
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    // Tab Visibility API: pause when tab is in background
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (containerRef.current) {
        // Re-check bounding client rect
        const rect = containerRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(inView);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 animate-pulse-subtle rounded-full border border-gold-500/20" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[420px] w-full lg:h-[540px]">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 1.5]} // Cap DPR to 1.5x max to prevent 3x retina overdraw
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#fdfbf7" />
        <pointLight position={[-4, -3, -4]} intensity={0.5} color="#c39651" />
        <PerceptionCore />
      </Canvas>
    </div>
  );
}
