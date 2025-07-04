"use client"

import { motion } from "framer-motion"
import { TechPanel } from "./tech-panel"
import { FuturisticButton } from "./futuristic-button"

export function SpecificationsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-20"
          animate={{
            y: ["-100px", "calc(100vh + 100px)"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        {/* Hexagon Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300ffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          SPECIFICATIONS
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <TechPanel className="text-center backdrop-blur-md">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Flight Performance</h3>
                <ul className="space-y-2 text-cyan-200">
                  <li>Max Speed: 65 km/h</li>
                  <li>Flight Time: 45 minutes</li>
                  <li>Range: 15 km</li>
                  <li>Max Altitude: 6000m</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Camera System</h3>
                <ul className="space-y-2 text-cyan-200">
                  <li>4K Ultra HD Recording</li>
                  <li>3-Axis Gimbal</li>
                  <li>120fps Slow Motion</li>
                  <li>HDR Photography</li>
                </ul>
              </motion.div>
            </div>
            <motion.div
              className="mt-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <FuturisticButton>Download Full Specs</FuturisticButton>
            </motion.div>
          </TechPanel>
        </motion.div>
      </div>
    </section>
  )
}
