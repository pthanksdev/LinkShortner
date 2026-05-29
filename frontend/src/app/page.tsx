"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import Background3D from '@/components/Background3D';
import StatsCards from '@/components/StatsCards';
import ShortenForm from '@/components/ShortenForm';
import UrlList from '@/components/UrlList';

interface UrlMapping {
  id: number;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
}

export default function Home() {
  const [mappings, setMappings] = useState<UrlMapping[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const fetchMappings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/urls`);
      if (response.ok) {
        const data = await response.json();
        setMappings(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMappings();
  }, [fetchMappings]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
      <Background3D />

      <main className="relative max-w-5xl mx-auto px-6 pt-24 pb-32 z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Premium Link Infrastructure</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent leading-[1.1]"
          >
            Smarter Links, <br /> 
            <span className="text-indigo-500">Bigger Impact.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-xl max-w-2xl mx-auto font-medium"
          >
            Transform your online presence with professional-grade URL shortening and deep analytics.
          </motion.p>
        </div>

        {/* Core Application Components */}
        <ShortenForm onSuccess={fetchMappings} />
        <StatsCards />
        <UrlList mappings={mappings} />

        {/* Footer Accent */}
        <footer className="mt-32 text-center text-neutral-600 text-sm font-medium">
          <p>© 2026 LinkShortener API Infrastructure. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
