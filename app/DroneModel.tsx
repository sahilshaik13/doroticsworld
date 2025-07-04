"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

interface DroneModelProps {
  inView: boolean
}

export function DroneModel({ inView }: DroneModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/drone.glb")
  const { mixer } = useAnimations(animations, scene)
  const [entranceProgress, setEntranceProgress] = useState(1)

  useEffect(() => {
    // Start all animations in loop
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip)
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
    })
  }, [animations, mixer])

  useEffect(() => {
    if (inView) {
      const start = performance.now()
      const duration = 2000

      const animateIn = () => {
        const elapsed = performance.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setEntranceProgress(easeOut)
        if (progress < 1) requestAnimationFrame(animateIn)
      }

      setEntranceProgress(0)
      animateIn()
    }
  }, [inView])

  useFrame((state, delta) => {
    mixer.update(delta)

    if (meshRef.current) {
      const time = state.clock.elapsedTime

      const floatY = Math.sin(time * 0.8) * 0.5
      const floatX = Math.sin(time * 0.5) * 0.25
      const floatZ = Math.cos(time * 0.6) * 0.15
      const entranceOffsetY = (1 - entranceProgress) * -12

      // Apply position and subtle movement
      meshRef.current.position.set(floatX, floatY + entranceOffsetY, floatZ)

      // Subtle tilting + forward lean to reveal blades
      meshRef.current.rotation.set(0.4, 0.15, Math.sin(time * 0.5) * 0.1)
    }
  })

  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={[0, 0, -5]} // initial Z pushback
        scale={[15, 15, 15]}
        rotation={[0.4, 0.2, 0]} // forward tilt to show back blades
      >
        <primitive object={scene} />
      </group>
    </Float>
  )
}

useGLTF.preload("/models/drone.glb")
