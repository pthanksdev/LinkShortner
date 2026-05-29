"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Background3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary Glow */}
      <motion.div
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full"
      />
      
      {/* Secondary Glow */}
      <motion.div
        animate={{
          x: -mousePosition.x * 3,
          y: -mousePosition.y * 3,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full"
      />

      {/* Floating Geometric Orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 5,
          y: mousePosition.y * 5,
          rotate: mousePosition.x * 2,
        }}
        className="absolute top-[20%] right-[15%] w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-transparent border border-white/10 backdrop-blur-2xl"
      />

      <motion.div
        animate={{
          x: -mousePosition.x * 8,
          y: -mousePosition.y * 4,
          rotate: -mousePosition.x * 4,
        }}
        className="absolute bottom-[25%] left-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent border border-white/5 backdrop-blur-3xl"
      />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
    </div>
  );
}
