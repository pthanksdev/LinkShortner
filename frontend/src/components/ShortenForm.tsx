"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ShortenFormProps {
  onSuccess: () => void;
}

export default function ShortenForm({ onSuccess }: ShortenFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/urls/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        setUrl('');
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to shorten:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 mb-20"
    >
      <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10">
        <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-indigo-400 transition-colors">
              <Link2 className="w-5 h-5" />
            </div>
            <Input 
              type="text" 
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-14 h-14 bg-black/20 border-white/10 rounded-2xl text-white placeholder:text-neutral-500 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-0 transition-all text-lg"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="h-14 px-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Shorten URL
                <Zap className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
