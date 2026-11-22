'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Snowflake, Lock, Unlock, ArrowLeftRight, Check, Sparkles } from 'lucide-react';

export const AnimatedCardsTile: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'naira' | 'dollar'>('naira');
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-fanning nudge so visitors see the depth
  const isNairaFront = activeCard === 'naira';

  return (
    <div
      className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-6 sm:p-10 flex flex-col lg:flex-row gap-6 min-h-[280px] justify-between items-start lg:items-center relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#0976da]/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Text & Interactive controls */}
      <div className="flex flex-col gap-3.5 flex-1 min-w-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#ebf5ff] dark:bg-slate-800 flex items-center justify-center text-[#0976da]">
            <CreditCard className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <span className="text-[12px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#e8f3fc] text-[#0976da] dark:bg-blue-950 dark:text-blue-300">
            Instant Virtual & Physical
          </span>
        </div>

        <h3 className="text-[26px] sm:text-[30px] leading-[1.08] tracking-[-0.66px] font-bold text-[#161c22] dark:text-white">
          Naira and Dollar Cards
        </h3>

        <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#4c5866] dark:text-slate-300 max-w-[360px]">
          Two cards, two balances. Freeze either one in a tap.
        </p>

        {/* Live Interactive Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              setActiveCard(isNairaFront ? 'dollar' : 'naira');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-[#f2f5f9] dark:bg-slate-800 hover:bg-[#e4ebf5] dark:hover:bg-slate-700 text-[#161c22] dark:text-white transition-colors cursor-pointer border border-[#dde3ea] dark:border-slate-700"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#0976da]" />
            Switch to {isNairaFront ? 'Dollar ($)' : 'Naira (₦)'}
          </button>

          <button
            type="button"
            onClick={() => setIsFrozen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              isFrozen
                ? 'bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-white dark:bg-slate-800 border border-[#dde3ea] dark:border-slate-700 text-[#4c5866] dark:text-slate-200 hover:border-cyan-400'
            }`}
          >
            {isFrozen ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                Unfreeze Card
              </>
            ) : (
              <>
                <Snowflake className="w-3.5 h-3.5 text-cyan-500" />
                Tap to Freeze
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: 3D Animated Overlapping Cards */}
      <div className="relative w-full sm:w-[240px] h-[160px] shrink-0 flex items-center justify-center select-none pt-2 sm:pt-0">
        <div className="relative w-[210px] h-[132px]">
          {/* ══════════════════════════════════════
              CARD A: DOLLAR CARD ($ USD)
              ══════════════════════════════════════ */}
          <motion.div
            onClick={() => setActiveCard('dollar')}
            animate={{
              x: !isNairaFront ? 14 : isHovered ? -16 : 0,
              y: !isNairaFront ? 14 : isHovered ? -10 : 0,
              rotate: !isNairaFront ? 2 : isHovered ? -8 : -3,
              scale: !isNairaFront ? 1.04 : 0.96,
              zIndex: !isNairaFront ? 20 : 10,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`absolute left-0 top-0 w-[205px] h-[130px] rounded-[14px] p-3.5 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.22)] cursor-pointer overflow-hidden border ${
              isFrozen && !isNairaFront
                ? 'bg-gradient-to-br from-[#1a2e3b] to-[#0f1f28] border-cyan-400/60 ring-2 ring-cyan-400/30'
                : 'bg-[#161c22] border-[#2b3542]'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between z-10">
              <span className="text-white text-[12px] font-bold tracking-tight">axoora</span>
              <span className="bg-[#f2f5f9] text-[#161c22] text-[11px] font-bold px-2 py-0.5 rounded-[5px] flex items-center gap-1 shadow-sm">
                <span>$ USD</span>
              </span>
            </div>

            {/* Chip & contactless wave */}
            <div className="flex items-center gap-2 z-10 my-0.5">
              <div className="w-7 h-5 rounded-[4px] bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-500/40 shadow-inner flex items-center justify-center">
                <div className="w-4 h-2.5 border-t border-b border-amber-600/40 rounded-[2px]" />
              </div>
              <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                <path d="M12 19a8.5 8.5 0 0 0 0-14" />
              </svg>
            </div>

            {/* Card details */}
            <div className="flex items-end justify-between text-white z-10">
              <div>
                <div className="text-[8px] uppercase tracking-wider text-slate-400 font-medium">Balance</div>
                <div className="text-[12px] font-bold tracking-tight">$1,248.50</div>
              </div>
              <span className="text-slate-300 text-[11px] font-mono tracking-widest">•••• 9120</span>
            </div>

            {/* FROZEN OVERLAY if frozen while in front */}
            <AnimatePresence>
              {isFrozen && !isNairaFront && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  animate={{ opacity: 1, backdropFilter: 'blur(3px)' }}
                  exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  className="absolute inset-0 bg-cyan-950/70 border border-cyan-400/50 flex flex-col items-center justify-center text-cyan-200 z-30"
                >
                  <Snowflake className="w-6 h-6 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-[11px] font-bold tracking-wider uppercase mt-1 text-cyan-100">Card Frozen</span>
                  <span className="text-[8px] text-cyan-300/80">Tap unfreeze to use</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle gloss gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </motion.div>

          {/* ══════════════════════════════════════
              CARD B: NAIRA CARD (₦ NGN)
              ══════════════════════════════════════ */}
          <motion.div
            onClick={() => setActiveCard('naira')}
            animate={{
              x: isNairaFront ? 14 : isHovered ? -16 : 0,
              y: isNairaFront ? 14 : isHovered ? -10 : 0,
              rotate: isNairaFront ? 2 : isHovered ? -8 : -3,
              scale: isNairaFront ? 1.04 : 0.96,
              zIndex: isNairaFront ? 20 : 10,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`absolute left-0 top-0 w-[205px] h-[130px] rounded-[14px] p-3.5 flex flex-col justify-between shadow-[0_14px_34px_rgba(4,62,151,0.32)] cursor-pointer overflow-hidden border ${
              isFrozen && isNairaFront
                ? 'bg-gradient-to-br from-[#0c3552] to-[#041c2c] border-cyan-400/70 ring-2 ring-cyan-400/40'
                : 'bg-gradient-to-br from-[#043e97] via-[#0759be] to-[#0976da] border-[#297cd6]'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between z-10">
              <span className="text-white text-[12px] font-bold tracking-tight flex items-center gap-1">
                axoora
              </span>
              <span className="bg-white/95 text-[#043e97] text-[11px] font-bold px-2 py-0.5 rounded-[5px] flex items-center gap-1 shadow-sm">
                <span>₦ NGN</span>
              </span>
            </div>

            {/* Chip & contactless wave */}
            <div className="flex items-center gap-2 z-10 my-0.5">
              <div className="w-7 h-5 rounded-[4px] bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 border border-amber-500/40 shadow-inner flex items-center justify-center">
                <div className="w-4 h-2.5 border-t border-b border-amber-600/40 rounded-[2px]" />
              </div>
              <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                <path d="M12 19a8.5 8.5 0 0 0 0-14" />
              </svg>
            </div>

            {/* Card details */}
            <div className="flex items-end justify-between text-white z-10">
              <div>
                <div className="text-[8px] uppercase tracking-wider text-blue-100 font-medium">Balance</div>
                <div className="text-[12px] font-bold tracking-tight">₦480,000.00</div>
              </div>
              <span className="text-white text-[11px] font-mono tracking-widest">•••• 4417</span>
            </div>

            {/* FROZEN OVERLAY if frozen while in front */}
            <AnimatePresence>
              {isFrozen && isNairaFront && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  animate={{ opacity: 1, backdropFilter: 'blur(3px)' }}
                  exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  className="absolute inset-0 bg-cyan-950/70 border border-cyan-400/60 flex flex-col items-center justify-center text-cyan-200 z-30"
                >
                  <Snowflake className="w-6 h-6 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-[11px] font-bold tracking-wider uppercase mt-1 text-cyan-100">Card Frozen</span>
                  <span className="text-[8px] text-cyan-300/80">Tap unfreeze to use</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Diagonal shine shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none -translate-x-full hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

