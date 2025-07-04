"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

interface DroneModelProps {
  visible: boolean
}

export function DroneModel({ visible }: DroneModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/drone.glb")
  const { mixer } = useAnimations(animations, scene)
  const [entranceProgress, setEntranceProgress] = useState(1)

  // Set up materials to reflect light & cast shadows
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial
        if (mat) {
          mat.metalness = 1
          mat.roughness = 0.1
          mat.envMapIntensity = 1.5
        }
      }
    })
  }, [scene])

  // Handle Blender animation
  useEffect(() => {
    if (!visible) return

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip)
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.timeScale = 0.35 // ✅ SMOOTH playback for propellers
      action.play()
    })

    const start = performance.now()
    const duration = 1500

    const animateIn = () => {
      const elapsed = performance.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setEntranceProgress(easeOut)
      if (progress < 1) requestAnimationFrame(animateIn)
    }

    setEntranceProgress(0)
    animateIn()
  }, [visible, animations, mixer])

  // Animate drone movement and update mixer
  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 1 / 30) // ✅ prevent jumpy motion
    mixer.update(safeDelta)

    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const floatY = Math.sin(time * 0.8) * 0.3
      const floatX = Math.sin(time * 0.5) * 0.15
      const floatZ = Math.cos(time * 0.6) * 0.1
      const entranceOffsetY = (1 - entranceProgress) * -10

      meshRef.current.position.set(floatX, floatY + entranceOffsetY, floatZ)

      meshRef.current.rotation.set(
        Math.PI / 4.5 + Math.sin(time * 0.3) * 0.01,
        Math.PI / 3 + Math.sin(time * 0.4) * 0.01,
        Math.sin(time * 0.5) * 0.02
      )
    }
  })

  if (!visible) return null

  return (
    <Float speed={0.2} rotationIntensity={0.03} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={[0, -1.2, 0]} // initial position
        scale={[25, 25, 25]}    // large size
        rotation={[Math.PI / 4.5, Math.PI / 3, 0]} // initial angled look
      >
        <primitive object={scene} />
      </group>
    </Float>
  )
}

useGLTF.preload("/models/drone.glb")
