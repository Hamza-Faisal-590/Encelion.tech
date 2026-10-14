'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { HumanoidModel } from './HumanoidModel';
import { useRobotStore } from './useRobotStore';

export function HumanoidCanvas() {
  const [mounted, setMounted] = useState(false);
  const { state } = useRobotStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center bg-[#0B0F19]/50 border border-white/10 rounded-2xl animate-pulse">
        <span className="text-sm font-semibold text-[#00F0FF]">Initializing Neural Core...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#111827]/40 via-[#0B0F19]/80 to-[#0B0F19] border border-white/10 shadow-2xl">
      {/* Dynamic Status Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-[#0B0F19]/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            state === 'SPEAKING'
              ? 'bg-[#00F0FF] animate-ping'
              : state === 'LISTENING'
              ? 'bg-emerald-400 animate-pulse'
              : state === 'THINKING'
              ? 'bg-[#7000FF] animate-spin'
              : 'bg-slate-400'
          }`}
        />
        <span className="text-xs font-bold tracking-wider uppercase text-slate-200">
          SYSTEM: {state}
        </span>
      </div>

      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.4, 3.5]} fov={50} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-3, 2, -2]} intensity={2.0} color="#7000FF" />
        <pointLight position={[3, -1, 2]} intensity={2.5} color="#00F0FF" />

        <Suspense fallback={null}>
          <HumanoidModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
