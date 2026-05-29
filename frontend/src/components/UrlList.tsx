"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, BarChart3, Check, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface UrlMapping {
  id: number;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
}

interface UrlListProps {
  mappings: UrlMapping[];
}

export default function UrlList({ mappings }: UrlListProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const copyToClipboard = (code: string) => {
    const shortUrl = `${API_URL}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative z-10 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Recent Activity
        </h2>
        <Badge variant="outline" className="bg-white/5 border-white/10 text-neutral-400 rounded-full px-4 py-1">
          {mappings.length} Links Generated
        </Badge>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-[300px] text-neutral-400 font-bold uppercase text-[10px] tracking-wider py-6 px-8">Short Link</TableHead>
              <TableHead className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider py-6">Original Destination</TableHead>
              <TableHead className="text-right text-neutral-400 font-bold uppercase text-[10px] tracking-wider py-6 px-8">Clicks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {mappings.map((mapping, idx) => (
                <motion.tr
                  key={mapping.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-indigo-400">/{mapping.shortCode}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(mapping.shortCode)}
                        className="h-9 w-9 rounded-xl bg-white/5 border border-white/5 text-neutral-400 hover:text-white hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        {copiedCode === mapping.shortCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 max-w-[400px]">
                    <p className="text-neutral-500 text-sm truncate font-medium">
                      {mapping.originalUrl}
                    </p>
                  </TableCell>
                  <TableCell className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Badge className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20 font-bold px-3 py-1 rounded-lg">
                        {mapping.clickCount} <BarChart3 className="w-3 h-3 ml-1.5 inline" />
                      </Badge>
                      <a
                        href={`${API_URL}/${mapping.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-neutral-500 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>

            {mappings.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-600 border border-white/5">
                      <Link2 className="w-6 h-6" />
                    </div>
                    <p className="text-neutral-500 font-medium">No links shortened yet</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
