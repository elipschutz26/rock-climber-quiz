'use client'

import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 380

function ChalkDust() {
  const { geo, velocities, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT)
    const offsets = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      velocities[i] = 0.004 + Math.random() * 0.01
      offsets[i]    = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geo, velocities, offsets }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = geo.attributes.position.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += velocities[i]
      pos[i * 3]     += Math.sin(t * 0.22 + offsets[i]) * 0.004

      if (pos[i * 3 + 1] > 9) {
        pos[i * 3 + 1] = -9
        pos[i * 3]     = (Math.random() - 0.5) * 24
      }
    }

    geo.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geo}>
      <pointsMaterial
        color="#e8e0d4"
        size={0.065}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function RockScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 72 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ChalkDust />
    </Canvas>
  )
}
