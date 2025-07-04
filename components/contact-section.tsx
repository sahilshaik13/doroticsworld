"use client"

import { motion } from "framer-motion"
import { TechPanel } from "./tech-panel"
import { FuturisticButton } from "./futuristic-button"

export function ContactSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          CONTACT US
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <TechPanel>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Get in Touch</h3>
                <div className="space-y-4 text-cyan-200">
                  <div>
                    <strong>Email:</strong> info@nexusdrones.com
                  </div>
                  <div>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </div>
                  <div>
                    <strong>Address:</strong> 123 Future Tech Blvd, Cyber City, CC 12345
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Quick Contact</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-black/30 border border-cyan-400/30 text-cyan-200 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-black/30 border border-cyan-400/30 text-cyan-200 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-black/30 border border-cyan-400/30 text-cyan-200 placeholder-cyan-400/50 focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </form>
              </div>
            </div>
            <div className="mt-8 text-center">
              <FuturisticButton>Send Message</FuturisticButton>
            </div>
          </TechPanel>
        </motion.div>
      </div>
    </section>
  )
}
