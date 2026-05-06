'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STONE_COLORS = ['#8a7f74', '#9e9080', '#b0a090', '#7a8090', '#6e7a8a', '#a09070', '#9090a0']

function Rock({
  position,
  scale,
  rotSpeed,
  colorIndex,
}: {
  position: [number, number, number]
  scale: number
  rotSpeed: [number, number, number]
  colorIndex: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x += rotSpeed[0] * 0.016
    meshRef.current.rotation.y += rotSpeed[1] * 0.016
    meshRef.current.rotation.z += rotSpeed[2] * 0.016
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + offset) * 0.35
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={STONE_COLORS[colorIndex % STONE_COLORS.length]}
        roughness={0.75}
        metalness={0.15}
        emissive={STONE_COLORS[colorIndex % STONE_COLORS.length]}
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

function RocksField() {
  const rocks = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 32,
          (Math.random() - 0.5) * 22,
          -2 - Math.random() * 16,
        ] as [number, number, number],
        scale: 0.14 + Math.random() * 0.72,
        rotSpeed: [
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.25,
        ] as [number, number, number],
        colorIndex: i % STONE_COLORS.length,
      })),
    []
  )

  return (
    <>
      {rocks.map((rock, i) => (
        <Rock key={i} {...rock} />
      ))}
    </>
  )
}

export default function RockScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 72 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={2.0} color="#c4b5fd" />
      <directionalLight position={[-6, -4, 3]} intensity={1.0} color="#818cf8" />
      <RocksField />
    </Canvas>
  )
}
