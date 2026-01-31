import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const count = 200; // Number of particles
  const connectionDistance = 2; // Max distance for connections

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }
    return temp;
  }, []);

  const linesGeometry = useRef();
  const pointsGeometry = useRef();

  useFrame(() => {
    // Update particle positions
    particles.forEach((particle) => {
      particle.position.add(particle.velocity);

      // Bounce off boundaries (simplified)
      if (Math.abs(particle.position.x) > 10) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 10) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 10) particle.velocity.z *= -1;
    });

    // Update points
    if (pointsGeometry.current) {
      pointsGeometry.current.setFromPoints(particles.map(p => p.position));
      pointsGeometry.current.attributes.position.needsUpdate = true;
    }

    // Update lines
    const connections = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);
        if (dist < connectionDistance) {
          connections.push(particles[i].position);
          connections.push(particles[j].position);
        }
      }
    }
    
    if (linesGeometry.current) {
        linesGeometry.current.setFromPoints(connections);
    }
  });

  return (
    <>
      <points>
        <bufferGeometry ref={pointsGeometry} />
        <pointsMaterial color="#ff0080" size={0.1} transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeometry} />
        <lineBasicMaterial color="#9d4edd" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-primary">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
        {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
