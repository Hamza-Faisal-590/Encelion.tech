'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRobotStore } from './useRobotStore';

export function HumanoidModel() {
  const headRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const { state, audioAmplitude } = useRobotStore();

  useFrame((clockState, delta) => {
    const time = clockState.clock.getElapsedTime();

    // 1. Idle breathing motion
    if (headRef.current) {
      headRef.current.position.y = Math.sin(time * 1.5) * 0.05 + 1.6;
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }

    // 2. Core reactor pulses
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.5 + audioAmplitude * 2;
      }
    }

    // 3. State Machine Animations
    if (state === 'LISTENING') {
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(time * 3) * 0.05;
      }
    } else if (state === 'THINKING') {
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 6) * 0.08;
      }
    } else if (state === 'SPEAKING') {
      if (headRef.current) {
        headRef.current.position.y = 1.6 + Math.sin(time * 12) * 0.02 * (1 + audioAmplitude);
      }
    } else if (state === 'GESTURING') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.4 + Math.sin(time * 5) * 0.2;
      }
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* Head & Glowing Visor */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        {/* Head Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.55, 0.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Neon Cyan Visor */}
        <mesh position={[0, 0.05, 0.26]}>
          <boxGeometry args={[0.42, 0.15, 0.02]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2.5}
            roughness={0.0}
          />
        </mesh>
        {/* Ear Light Panels */}
        <mesh position={[-0.27, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#7000FF" emissive="#7000FF" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0.27, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#7000FF" emissive="#7000FF" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Neck Joint */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshStandardMaterial color="#0F172A" metalness={1.0} roughness={0.2} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.5]} />
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arc Reactor Core */}
      <mesh ref={coreRef} position={[0, 0.6, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 32]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
      </mesh>

      {/* Left Shoulder & Arm */}
      <group ref={leftArmRef} position={[-0.55, 0.9, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        <mesh position={[-0.1, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.7, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
      </group>

      {/* Right Shoulder & Arm */}
      <group ref={rightArmRef} position={[0.55, 0.9, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        <mesh position={[0.1, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.7, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
