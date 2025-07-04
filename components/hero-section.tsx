"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Environment, OrbitControls } from "@react-three/drei"
import { FuturisticButton } from "./futuristic-button"
import { DroneModel } from "./drone-model"

export function HeroSection() {
  const { ref, inView } = useInView({
    threshold: 0, // Show as long as any part of section is visible
    rootMargin: "-100px", // allow drone to persist until full section scrolls out
  })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Drone Canvas - stays in background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          shadows
          camera={{ position: [0, 4, 12], fov: 45 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <DroneModel visible={inView} />

            {/* Ground for shadow */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -5.8, 0]}
              receiveShadow
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.25} />
            </mesh>

            <Environment preset="apartment" background={false} />

            <directionalLight
              position={[5, 10, 5]}
              intensity={2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[-10, 5, -10]} intensity={1.5} color="#aaffff" />

            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-4xl z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          NEXUS DRONES
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-cyan-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Advanced Aerial Technology for the Future
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <FuturisticButton>Explore Models</FuturisticButton>
          <FuturisticButton>Watch Demo</FuturisticButton>
        </motion.div>
      </div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001f3f33] to-black opacity-50 pointer-events-none z-0" />
    </section>
  )
}
