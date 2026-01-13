import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000;

const MagicParticles = () => {
  const pointsRef = useRef();
  const { viewport, mouse } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.set([(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10], i * 3);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Hiện tại vẫn dùng CHUỘT để test trước
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2];
      
      let dx = targetX - px + (Math.random() - 0.5) * 0.5;
      let dy = targetY - py + (Math.random() - 0.5) * 0.5;
      let dz = 0 - pz;

      positions[i3] += dx * 0.05;
      positions[i3 + 1] += dy * 0.05;
      positions[i3 + 2] += dz * 0.05;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00ff88" sizeAttenuation={true} transparent={true} opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export default MagicParticles;