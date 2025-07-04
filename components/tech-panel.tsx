"use client"

import type React from "react"

interface TechPanelProps {
  children: React.ReactNode
  className?: string
}

export function TechPanel({ children, className = "" }: TechPanelProps) {
  return (
    <div className={`relative p-6 bg-black/20 backdrop-blur-sm border border-cyan-400/30 ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      {children}
    </div>
  )
}
