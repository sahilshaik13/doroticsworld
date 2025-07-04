"use client"

import { motion } from "framer-motion"
import { TechPanel } from "./tech-panel"
import { useEffect, useState } from "react"

const features = [
  {
    title: "AI Navigation",
    description: "Autonomous flight with advanced obstacle detection and path optimization.",
  },
  {
    title: "4K Recording",
    description: "Ultra-high definition video capture with stabilized gimbal technology.",
  },
  {
    title: "Long Range",
    description: "Extended flight time up to 45 minutes with intelligent battery management.",
  },
]

export function FeaturesSection() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {windowSize.width > 0 &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          ADVANCED FEATURES
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <TechPanel>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400" style={{ fontFamily: "Orbitron, monospace" }}>
                  {feature.title}
                </h3>
                <p className="text-cyan-200">{feature.description}</p>
              </TechPanel>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
      `}</style>
    </section>
  )
}
