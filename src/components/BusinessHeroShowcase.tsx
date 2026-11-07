'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BusinessHeroShowcaseProps {
  isLight?: boolean;
  onOpenWaitlist: (interest?: 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const BusinessHeroShowcase: React.FC<BusinessHeroShowcaseProps> = ({
  isLight = false,
  onOpenWaitlist,
}) => {
  // Live dynamic counter for instant settlement demo
  const [liveAmount, setLiveAmount] = useState<number>(85400);
  const [pulseKey, setPulseKey] = useState<number>(0);
  const [posTapSuccess, setPosTapSuccess] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate periodic live sales arriving via NIBSS
      const deltas = [35000, 18500, 92000, 45000, 120000, 68000];
      const randomDelta = deltas[Math.floor(Math.random() * deltas.length)];
      setLiveAmount(randomDelta);
      setPulseKey((k) => k + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handlePosScreenTap = () => {
    setPosTapSuccess(true);
    setTimeout(() => setPosTapSuccess(false), 2400);
  };

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none py-4">
      {/* Subtle Background Blueprint Grid */}
      <div
        className="absolute -inset-4 sm:-inset-8 pointer-events-none opacity-40"
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(to right, rgba(13, 149, 254, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(13, 149, 254, 0.08) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(20, 41, 79, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 41, 79, 0.45) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Atmospheric Radial Studio Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#0D95FE]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#00DF8F]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-[#F2A93B]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* SVG Connecting Traces (Network Constellation) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D95FE" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00DF8F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F2A93B" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Path linking Tunde node to Instant T+0 Credit Card */}
        <motion.path
          d="M 180 380 Q 240 330 280 270"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Path linking POS terminal to Verified Trader */}
        <motion.path
          d="M 230 140 Q 320 120 380 150"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Path linking Instant Credit to Platinum Card */}
        <motion.path
          d="M 360 270 Q 420 310 460 360"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* ========================================================================= */}
      {/* 1. TOP FLOATING VAULT PILL (20% APY Daily Compound Vault) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 flex justify-start pl-6 sm:pl-10 mb-2"
      >
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer ${
            isLight
              ? 'bg-white/95 border-amber-300 text-slate-800 shadow-amber-500/10'
              : 'bg-[#0B1733]/90 border-[#254275] text-slate-200 shadow-black/40'
          }`}
          onClick={() => onOpenWaitlist('business')}
        >
          <div className="w-5 h-5 rounded-full bg-[#F2A93B]/20 border border-[#F2A93B]/40 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[13px] text-[#F2A93B]">
              savings
            </span>
          </div>
          <span className="text-xs font-black font-mono text-[#F2A93B] tracking-tight">
            20% APY
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-[11px] font-semibold text-slate-300">
            Daily Compound Vault
          </span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. TOP TIER: AXOORA PRO SMART POS (LEFT) + VERIFIED TRADER (RIGHT) */}
      {/* ========================================================================= */}
      <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4 items-start">
        
        {/* Left Item: Axoora Pro Smart POS Terminal (cols 1-7) */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="col-span-7 sm:col-span-6 relative z-10"
        >
          <div
            className={`dark-hardware preserve-dark rounded-[24px] sm:rounded-[28px] p-3.5 sm:p-4 border shadow-2xl transition-all ${
              isLight
                ? 'bg-slate-900 border-slate-700 text-white shadow-slate-900/30'
                : 'bg-[#071328] border-[#163363] text-white shadow-black/80'
            }`}
          >
            {/* Top Bar: Axoora Pro + 4G+4G + Battery */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00DF8F]" />
                <span className="font-bold tracking-wider font-mono text-slate-200">
                  AXOORA PRO
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#0D95FE]/25 border border-[#0D95FE]/50 text-[#0D95FE] font-mono font-bold text-[9px]">
                  4G+4G
                </span>
                <div className="flex items-center gap-0.5 text-slate-400">
                  <span className="material-symbols-outlined text-[13px]">wifi</span>
                  <span className="font-mono text-[9px]">99%</span>
                </div>
              </div>
            </div>

            {/* Screen Display Area */}
            <div
              onClick={handlePosScreenTap}
              className="mt-2.5 p-3 rounded-2xl bg-[#030A17] border border-[#0F2347] flex flex-col items-center text-center cursor-pointer hover:border-[#0D95FE]/50 transition-all group"
            >
              <div className="flex items-center gap-1 text-[9.5px] font-mono text-slate-400 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[13px] text-[#00DF8F] animate-pulse">
                  podcasts
                </span>
                <span>READY FOR PAYMENT</span>
              </div>

              {/* Amount Display */}
              <div className="my-1.5 font-mono text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                ₦420,000<span className="text-slate-400 text-sm font-normal">.00</span>
              </div>

              {/* Action Pill Button */}
              <div className={`w-full py-1.5 px-3 rounded-full border text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                posTapSuccess
                  ? 'bg-[#00DF8F] border-[#00DF8F] text-[#003825]'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-[#00DF8F] group-hover:bg-emerald-500/20'
              }`}>
                <span className="material-symbols-outlined text-[13px]">
                  {posTapSuccess ? 'check_circle' : 'contactless'}
                </span>
                <span>{posTapSuccess ? 'Approved & Settled!' : 'Tap, Insert or Transfer'}</span>
              </div>
            </div>

            {/* SIM 1 & SIM 2 Status Boxes */}
            <div className="grid grid-cols-2 gap-1.5 mt-2.5">
              <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
                <span className="text-[8.5px] font-mono text-slate-400">SIM 1</span>
                <span className="text-[9.5px] font-mono font-bold text-[#00DF8F] truncate flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#00DF8F]" />
                  MTN 4G • FAST
                </span>
              </div>

              <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
                <span className="text-[8.5px] font-mono text-slate-400">SIM 2</span>
                <span className="text-[9.5px] font-mono font-bold text-[#0D95FE] truncate flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#0D95FE]" />
                  AIRTEL AUTO
                </span>
              </div>
            </div>

            {/* Faint Tactile Keypad Silhouette */}
            <div className="grid grid-cols-3 gap-1 pt-2 opacity-35">
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">1</div>
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">2</div>
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">3</div>
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">4</div>
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">5</div>
              <div className="h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold">6</div>
            </div>

            {/* POS Footer Uptime */}
            <div className="pt-2 text-center text-[9.5px] font-mono text-slate-400 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
              <span>99.99% Core Uptime</span>
            </div>
          </div>
        </motion.div>

        {/* Right Item: Real Verified Trader Photo (cols 8-12) */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="col-span-5 sm:col-span-6 relative z-0 -ml-4 sm:-ml-2 pt-2"
        >
          <div
            className={`relative w-full h-[250px] sm:h-[285px] rounded-3xl overflow-hidden border shadow-2xl transition-all ${
              isLight
                ? 'border-slate-300 shadow-slate-300/60'
                : 'border-[#1D3A6F] shadow-black/80'
            }`}
          >
            {/* Real Local Black Nigerian Merchant Portrait in her shop */}
            <img
              src="/merchants/local_trader_woman.jpg"
              alt="Authentic Local Nigerian Market Trader"
              className="w-full h-full object-cover object-center filter brightness-[0.98]"
            />

            {/* Vignette Shadow for Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Top-Right Badge: VERIFIED TRADER */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-ping" />
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-300">
                VERIFIED TRADER
              </span>
            </div>

            {/* Bottom Live Turnover Stat */}
            <div className="absolute bottom-3 right-3 z-10 text-right">
              <div className="flex items-center justify-end gap-1 text-[9.5px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                <span>LIVE TODAY</span>
              </div>
              <div className="font-mono text-sm sm:text-base font-black text-white tracking-tight drop-shadow-md">
                ₦1,840,500
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER OVERLAPPING FLOATING CARD: INSTANT T+0 CREDIT (0.18s Latency) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-30 -mt-16 sm:-mt-20 mx-auto w-[92%] sm:w-[84%] max-w-[340px]"
      >
        <div
          className={`p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-400/40'
              : 'bg-[#0B1A38]/95 border-[#1E4380] text-white shadow-black/90'
          }`}
        >
          {/* Header Row */}
          <div className={`flex items-center justify-between pb-2.5 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">
                  bolt
                </span>
              </div>
              <div>
                <span className={`block text-xs font-black tracking-tight leading-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Instant T+0 Credit
                </span>
                <span className={`block text-[9.5px] font-mono leading-tight ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  0.18s latency pipe
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9.5px] font-mono font-bold text-[#00DF8F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
              <span>NIBSS LIVE</span>
            </div>
          </div>

          {/* Settlement Velocity & Dynamic Amount Row */}
          <div className="pt-2.5 flex items-center justify-between">
            {/* Circular Velocity Ring Indicator */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-[#00DF8F] border-t-transparent animate-spin" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[11px] font-black font-mono leading-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  0.18s •
                </span>
                <span className={`text-[9px] leading-tight ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Settlement velocity
                </span>
              </div>
            </div>

            {/* Dynamic Changing Live Payment Amount */}
            <AnimatePresence mode="wait">
              <motion.div
                key={pulseKey}
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-right"
              >
                <span className="block text-sm sm:text-base font-black font-mono text-[#00DF8F] tracking-tight tabular-nums">
                  +₦{liveAmount.toLocaleString()}.00
                </span>
                <span className={`block text-[9px] font-mono ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  • Received 2s ago
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM TIER: TUNDE CIRCULAR AVATAR (LEFT) + AXOORA PLATINUM CARD (RIGHT) */}
      {/* ========================================================================= */}
      <div className="relative z-20 mt-3 sm:mt-4 grid grid-cols-12 gap-3 sm:gap-4 items-center">
        
        {/* Left: Tunde • Ikeja Hub Circular Profile (cols 1-5) */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="col-span-5 flex flex-col items-center sm:items-start pl-2 sm:pl-4"
        >
          <div className="relative">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 shadow-2xl ${
                isLight ? 'border-slate-300' : 'border-[#1E4380]'
              }`}
            >
              <img
                src="/merchants/local_trader_male.jpg"
                alt="Local Black Nigerian Trader"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bottom Label Pill */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[9.5px] font-medium flex items-center gap-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D95FE]" />
              <span>Tunde • Ikeja Hub</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Axoora Platinum Business Debit Card (cols 6-12) */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="col-span-7 flex justify-end pr-1 sm:pr-2"
        >
          <div
            className={`dark-hardware preserve-dark w-[210px] sm:w-[245px] h-[130px] sm:h-[148px] rounded-2xl p-3.5 sm:p-4 border shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all ${
              isLight
                ? 'bg-gradient-to-br from-[#0c1833] via-[#071126] to-[#040a17] border-slate-700 text-white'
                : 'bg-gradient-to-br from-[#0c1833] via-[#071126] to-[#040a17] border-[#234277] text-white'
            }`}
          >
            {/* Metallic Sheen Diagonal Light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Top Row: Brand + Platinum Badge + Contactless Icon */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs tracking-tight">Axoora</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 border border-amber-400/40 text-[#F2A93B] font-mono text-[8px] font-bold uppercase tracking-wider">
                  PLATINUM
                </span>
              </div>

              <span className="material-symbols-outlined text-[15px] text-slate-400">
                contactless
              </span>
            </div>

            {/* Middle: EMV Gold Chip */}
            <div className="relative z-10 my-0.5">
              <div className="w-7 h-5 rounded bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-600/50 flex items-center justify-center relative overflow-hidden shadow-sm">
                <div className="w-full h-[0.5px] bg-amber-800/40 absolute top-1.5" />
                <div className="w-full h-[0.5px] bg-amber-800/40 absolute bottom-1.5" />
                <div className="h-full w-[0.5px] bg-amber-800/40 absolute left-2.5" />
                <div className="h-full w-[0.5px] bg-amber-800/40 absolute right-2.5" />
              </div>
            </div>

            {/* Bottom Row: Card Number + Cardholder Category + Mastercard Circles */}
            <div className="flex items-end justify-between relative z-10 text-[10px]">
              <div>
                <div className="font-mono text-[11px] font-bold tracking-widest text-slate-200">
                  •••• 8824
                </div>
                <div className="text-[8px] font-mono uppercase text-slate-400 tracking-wider">
                  COMMERCIAL BUSINESS
                </div>
              </div>

              {/* Interlocking Mastercard Circles */}
              <div className="flex -space-x-1.5 opacity-90">
                <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                <div className="w-4 h-4 rounded-full bg-[#F79E1B]/90" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};
