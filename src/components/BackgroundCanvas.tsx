'use client';

import { Suspense } from 'react';
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
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.1} />
      </Suspense>
      <CinematicGlobe />
    </>
  );
}

export default function BackgroundCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <BackgroundScene />
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={2} luminanceSmoothing={0.9} mipmapBlur intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
