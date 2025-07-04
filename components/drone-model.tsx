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

  // Make all mesh materials shiny and shadow-enabled
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

  useEffect(() => {
    if (!visible) return

    animations.forEach((clip) => {
      const action = mixer.clipAction(clip)
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
    })

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
  }, [visible, animations, mixer])

  useFrame((state, delta) => {
    if (!visible) return

    mixer.update(delta)

    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const floatY = Math.sin(time * 0.8) * 0.5
      const floatX = Math.sin(time * 0.5) * 0.25
      const floatZ = Math.cos(time * 0.6) * 0.15
      const entranceOffsetY = (1 - entranceProgress) * -12

      meshRef.current.position.set(floatX, floatY + entranceOffsetY, floatZ)
      meshRef.current.rotation.set(0.4, 0.15, Math.sin(time * 0.5) * 0.1)
    }
  })

  if (!visible) return null

  return (
    <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={[0, 0, -5]}
        scale={[25, 25, 25]}
        rotation={[0.4, 0.2, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  )
}

useGLTF.preload("/models/drone.glb")
