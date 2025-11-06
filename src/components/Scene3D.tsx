import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Box, Sphere, Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Object3DProps {
  id: string;
  type: 'box' | 'sphere' | 'cone' | 'cylinder';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

function Object3D({ id, type, position, rotation, scale, color, isSelected, onSelect }: Object3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const props = {
    ref: meshRef,
    position,
    rotation,
    scale,
    onClick: onSelect,
    onPointerOver: () => document.body.style.cursor = 'pointer',
    onPointerOut: () => document.body.style.cursor = 'default',
  };

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={isSelected ? color : '#000000'}
      emissiveIntensity={isSelected ? 0.3 : 0}
    />
  );

  switch (type) {
    case 'sphere':
      return <Sphere {...props}>{material}</Sphere>;
    case 'cone':
      return <Cone {...props}>{material}</Cone>;
    case 'cylinder':
      return <Cylinder {...props}>{material}</Cylinder>;
    default:
      return <Box {...props}>{material}</Box>;
  }
}

interface SceneObject {
  id: string;
  type: 'box' | 'sphere' | 'cone' | 'cylinder';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

interface Scene3DProps {
  objects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
}

export default function Scene3D({ objects, selectedObjectId, onSelectObject }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800"
      onPointerMissed={() => onSelectObject(null)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6b7280"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#9ca3af"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />

      {objects.map((obj) => (
        <Object3D
          key={obj.id}
          {...obj}
          isSelected={obj.id === selectedObjectId}
          onSelect={() => onSelectObject(obj.id)}
        />
      ))}

      <OrbitControls makeDefault />
    </Canvas>
  );
}

export type { SceneObject };
