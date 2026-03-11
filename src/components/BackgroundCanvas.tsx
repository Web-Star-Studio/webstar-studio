'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import CinematicGlobe from './CinematicGlobe';

function BackgroundScene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.5} />
      <Environment preset="studio" environmentIntensity={0.1} />
      <CinematicGlobe />
    </>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
      <Canvas
        gl={{ antialias: true, alpha: false, toneMapping: THREE.NoToneMapping }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <BackgroundScene />
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} mipmapBlur intensity={2.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
