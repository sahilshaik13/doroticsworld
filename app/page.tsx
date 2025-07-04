"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useScroll } from "framer-motion"
import { DroneModel } from "@/components/drone-model"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SpecificationsSection } from "@/components/specifications-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [showDrone, setShowDrone] = useState(true)
  const [droneKey, setDroneKey] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollY(latest * 1000)

      const wasShowingDrone = showDrone
      const shouldShowDrone = latest < 0.2

      // Hide drone after hero section (first 20% of scroll)
      setShowDrone(shouldShowDrone)

      // If drone comes back into view, trigger entrance animation
      if (!wasShowingDrone && shouldShowDrone) {
        setDroneKey((prev) => prev + 1)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, showDrone])

  return (
    <div className="min-h-[500vh] text-white overflow-x-hidden">
      {/* Hero Section with Drone */}
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative">
        {/* Fixed 3D Scene with Large Drone - Only in Hero */}
        {showDrone && (
          <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[20, 20, 20]} intensity={2} color="#00ffff" />
              <pointLight position={[-20, -20, -20]} intensity={1} color="#0088ff" />
              <spotLight position={[0, 50, 0]} intensity={1.5} color="#ffffff" angle={0.3} />
              <DroneModel key={droneKey} scrollY={scrollY} />
              <Environment preset="night" />
            </Canvas>
          </div>
        )}

        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      {/* Other Sections with Different Backgrounds */}
      <div className="bg-slate-900">
        <FeaturesSection />
      </div>

      <div className="bg-gradient-to-b from-slate-900 to-purple-900">
        <SpecificationsSection />
      </div>

      <div className="bg-black">
        <GallerySection />
      </div>

      <div className="bg-gradient-to-b from-slate-900 to-blue-900">
        <ContactSection />
      </div>
    </div>
  )
}
