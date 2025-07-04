"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FuturisticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function FuturisticButton({ children, className = "", onClick }: FuturisticButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold tracking-wider uppercase overflow-hidden group transition-all duration-300 hover:text-black ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
