'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const autoMinimizeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem('axoora_cookie_dismissed');
    if (dismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);

        // Auto-minimize after 8 seconds so it NEVER blocks user reading or interaction
        autoMinimizeTimerRef.current = setTimeout(() => {
          setIsMinimized(true);
        }, 8000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoMinimizeTimerRef.current) clearTimeout(autoMinimizeTimerRef.current);
    };
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('axoora_cookie_dismissed', 'true');
    }
    setIsVisible(false);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (autoMinimizeTimerRef.current) clearTimeout(autoMinimizeTimerRef.current);
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized State: Sleek micro-badge that never blocks anything */
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={handleExpand}
            title="Privacy & Essential Cookies (Click to review)"
            className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer group ${
              isLight
                ? 'bg-white/90 border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-blue-500/10'
                : 'bg-[#0A1B3D]/85 border-[#14294F] text-[#A8BBD6] hover:border-[#0D95FE]/50 hover:text-[#F2F5F9]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wide">
              Privacy &amp; Cookies
            </span>
            <span className="text-[10px] text-slate-400 group-hover:translate-y-[-1px] transition-transform">
              ↗
            </span>
          </motion.button>
        ) : (
          /* Expanded State: Non-intrusive slim floating glass pill */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onMouseEnter={() => {
              // Pause auto-minimize if the user is hovering/reading
              if (autoMinimizeTimerRef.current) clearTimeout(autoMinimizeTimerRef.current);
            }}
            className={`pointer-events-auto max-w-[calc(100vw-32px)] sm:max-w-md p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 transition-colors ${
              isLight
                ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-slate-900/10'
                : 'bg-[#0A1B3D]/90 border-[#14294F] text-[#F2F5F9] shadow-[#01091C]/80'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00DF8F] shrink-0" />
                <span className="text-xs font-bold tracking-tight">
                  Encrypted Session Privacy
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleMinimize}
                  title="Minimize"
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  minimize _
                </button>
                <button
                  onClick={handleAccept}
                  title="Close"
                  className="px-1.5 py-0.5 rounded text-[11px] text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <p className={`text-[11.5px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              We only use encrypted cookies for banking authentication and terminal uptime. Zero advertising trackers, zero data reselling.
            </p>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
              <span className="text-[10px] font-mono text-[#00DF8F] flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00DF8F]" />
                Zero third-party trackers
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-[#14294F]/60 hover:bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
                  }`}
                >
                  Minimize
                </button>
                <button
                  onClick={handleAccept}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-[#002447] text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
