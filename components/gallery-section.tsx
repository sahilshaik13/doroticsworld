"use client"

import { motion } from "framer-motion"
import { TechPanel } from "./tech-panel"
import { useEffect, useState } from "react"

export function GallerySection() {
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    setMatrixChars(chars.split(""))
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 bg-black/40">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-sm font-mono opacity-60"
            style={{
              left: `${(i * 2) % 100}%`,
              top: "-100px",
            }}
            animate={{
              y: ["0vh", "120vh"],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            {matrixChars.slice(0, 20).map((char, j) => (
              <div key={j} className="block">
                {Math.random() > 0.5 ? char : Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-green-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          GALLERY
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <TechPanel className="aspect-square border-green-400/30">
                <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-black/40 flex items-center justify-center relative overflow-hidden">
                  <div className="text-green-400 text-4xl font-bold opacity-30">{String(item).padStart(2, "0")}</div>
                  {/* Glitch Effect */}
                  <motion.div
                    className="absolute inset-0 bg-green-400/10"
                    animate={{
                      opacity: [0, 0.3, 0],
                      x: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 3 + 1,
                    }}
                  />
                </div>
              </TechPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
