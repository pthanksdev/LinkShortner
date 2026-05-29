"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart3, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatsCards() {
  const stats = [
    { icon: Globe, label: "Global Reach", detail: "Redirect anywhere instantly", color: "text-indigo-400" },
    { icon: BarChart3, label: "Live Analytics", detail: "Track every single click", color: "text-blue-400" },
    { icon: ShieldCheck, label: "Secure & Reliable", detail: "SSL protected links", color: "text-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
      {stats.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-colors">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} mb-4 border border-white/5`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-neutral-100 mb-1">{item.label}</h3>
              <p className="text-neutral-500 text-sm">{item.detail}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
