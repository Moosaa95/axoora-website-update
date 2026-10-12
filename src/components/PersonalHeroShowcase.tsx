'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RealisticPhoneMockup } from './RealisticPhoneMockup';

interface PersonalHeroShowcaseProps {
  isLight?: boolean;
  onOpenWaitlist?: (interest?: 'personal') => void;
  onOpenWhatsApp?: () => void;
}

export const PersonalHeroShowcase: React.FC<PersonalHeroShowcaseProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  // Card customization state: 'naira' (physical emerald titanium) vs 'usd' (virtual obsidian)
  const [cardType, setCardType] = useState<'naira' | 'usd'>('naira');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  return (
    <div className="relative w-full max-w-[540px] lg:max-w-none mx-auto flex flex-col items-center justify-center select-none pt-4 pb-8 sm:pb-12">
      {/* Ambient Multi-Hue Specular Glow Behind the Showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-[#00DF8F]/20 via-[#0D95FE]/20 to-[#F2A93B]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Composition Stage */}
      <div className="relative w-full flex items-center justify-center min-h-[580px] sm:min-h-[620px]">
        {/* ============================================================== */}
        {/* 1. THE MOBILE PHONE (App Interface Centerpiece) */}
        {/* ============================================================== */}
        <div className="relative z-10 sm:translate-x-8 lg:translate-x-10 transition-transform duration-500">
          <RealisticPhoneMockup
            isLight={isLight}
            onOpenWaitlist={onOpenWaitlist}
            onOpenWhatsApp={onOpenWhatsApp}
          />
        </div>

        {/* ============================================================== */}
        {/* 2. THE FLOATING 3D DEBIT CARD (Foreground Overlapping Layer) */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -6 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
            rotate: isCardHovered ? -2 : -11,
          }}
          transition={{
            opacity: { duration: 0.6 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0.35, ease: 'easeOut' },
          }}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          className="absolute -bottom-4 sm:bottom-12 -left-2 sm:-left-6 lg:-left-4 z-30 w-[270px] sm:w-[325px] aspect-[1.586/1] cursor-pointer"
          style={{ perspective: 1200 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Card Container with 3D Flip */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="dark-hardware preserve-dark w-full h-full relative rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 shadow-2xl transition-all border-2 overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: isLight
                ? '0 25px 50px -12px rgba(13, 149, 254, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)'
                : '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(0, 223, 143, 0.25)',
              background:
                cardType === 'naira'
                  ? 'linear-gradient(135deg, #02182B 0%, #032733 50%, #0A3D2E 100%)'
                  : 'linear-gradient(135deg, #050811 0%, #0D1B2A 50%, #1B263B 100%)',
              borderColor: cardType === 'naira' ? 'rgba(0, 223, 143, 0.5)' : 'rgba(13, 149, 254, 0.5)',
            }}
          >
            {/* Dynamic Specular Sheen Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-transform duration-700"
              style={{
                background:
                  'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)',
                transform: isCardHovered ? 'translateX(30%)' : 'translateX(-30%)',
              }}
            />

            {/* Micro Dot Matrix Grid Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${
                  cardType === 'naira' ? '#00DF8F' : '#0D95FE'
                } 1px, transparent 1px)`,
                backgroundSize: '14px 14px',
              }}
            />

            {/* -------------------------------------------------------- */}
            {/* FRONT OF THE CARD */}
            {/* -------------------------------------------------------- */}
            <div
              className="w-full h-full flex flex-col justify-between relative z-10 text-white"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              {/* Header: Axoora Brand + Contactless */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-[#00DF8F] to-[#0D95FE] flex items-center justify-center font-black text-white text-[10px] sm:text-xs shadow-sm">
                    ▲
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-extrabold tracking-tight text-xs sm:text-sm text-white">
                      AXOORA
                    </span>
                    <span
                      className={`text-[7px] sm:text-[8px] font-mono tracking-widest uppercase font-semibold ${
                        cardType === 'naira' ? 'text-[#00DF8F]' : 'text-[#0D95FE]'
                      }`}
                    >
                      {cardType === 'naira' ? 'PLATINUM NAIRA' : 'VIRTUAL DOLLAR'}
                    </span>
                  </div>
                </div>

                {/* Contactless Waves Icon */}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white/80" viewBox="0 0 24 24">
                  <path d="M4.5 10.5c1.5-2 3.8-3 6.5-3s5 1 6.5 3l1.5-1.5C16.8 6.8 14 5.5 11 5.5s-5.8 1.3-8 3.5l1.5 1.5zm3 3c.9-1.2 2.2-1.8 3.5-1.8s2.6.6 3.5 1.8l1.5-1.5c-1.3-1.6-3.1-2.3-5-2.3s-3.7.7-5 2.3l1.5 1.5zm3 3c.6-.4 1.3-.5 2-.5s1.4.1 2 .5l1.5-1.5c-1-.8-2.2-1-3.5-1s-2.5.2-3.5 1l1.5 1.5z" />
                </svg>
              </div>

              {/* Middle: Gold EMV Chip & CBN Hologram */}
              <div className="flex items-center justify-between my-auto py-1">
                {/* Authentic EMV Chip */}
                <div className="w-9 sm:w-11 h-7 sm:h-8 rounded-md bg-gradient-to-br from-[#FFE29F] via-[#FFAE34] to-[#C77C1E] p-[1.5px] shadow-sm border border-[#8C5413]/60">
                  <div className="w-full h-full rounded-[4px] grid grid-cols-3 grid-rows-2 gap-[1px] p-[1.5px] bg-[#E3A330]/40">
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                    <div className="border border-[#7A490F]/30 rounded-xs" />
                  </div>
                </div>

                {/* Holographic Seal */}
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/30 shadow-inner flex items-center justify-center text-[7px] sm:text-[8px] font-mono font-bold"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, #00DF8F 0deg, #0D95FE 90deg, #F2A93B 180deg, #9C27B0 270deg, #00DF8F 360deg)',
                    opacity: 0.85,
                  }}
                >
                  <span className="text-white drop-shadow">CBN</span>
                </div>
              </div>

              {/* Card Number */}
              <div className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-white drop-shadow">
                {cardType === 'naira' ? '5399 •••• •••• 8421' : '4111 •••• •••• 9204'}
              </div>

              {/* Card Footer: Name, Expiry & Mastercard Logo */}
              <div className="flex items-end justify-between pt-1">
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono uppercase tracking-wider text-white/60">
                    Cardholder
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-white uppercase">
                    AYOMIDE BELLO
                  </span>
                </div>

                <div className="flex items-end gap-2.5 sm:gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-[7px] font-mono uppercase tracking-wider text-white/60">
                      Expires
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-white">
                      10/29
                    </span>
                  </div>

                  {/* Payment Network Circles */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#EB001B] opacity-90 shadow-sm" />
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F79E1B] opacity-90 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* BACK OF THE CARD (Rotated 180deg) */}
            {/* -------------------------------------------------------- */}
            <div
              className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between bg-[#040C1E] text-white"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="w-full h-7 sm:h-9 bg-slate-900 -mx-4 mt-1 border-y border-white/10" />
              <div className="flex items-center justify-between px-2">
                <div className="w-32 h-6 bg-white/90 rounded text-slate-900 text-right pr-2 text-xs font-mono font-bold flex items-center justify-end">
                  CVV 382
                </div>
                <span className="text-[9px] font-mono text-emerald-400">AUTHORIZED SIGNATURE</span>
              </div>
              <p className="text-[8px] text-slate-400 leading-tight px-1">
                Issued by Axoora MFB. Licensed by CBN. Insured by NDIC. Call +234 201 888 9990 if found.
              </p>
            </div>
          </motion.div>

          {/* Interactive Card Pill Badges */}
          <div className="absolute -top-3 right-2 flex items-center gap-1.5 z-40">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00DF8F] text-[#003825] shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003825] animate-pulse" />
              Active Debit
            </span>
          </div>
        </motion.div>

        {/* Floating Feature Chip in Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`absolute top-6 right-2 sm:right-6 lg:right-4 z-40 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-xl flex items-center gap-2 hidden sm:flex ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-800'
              : 'bg-[#020F2E]/90 border-[#0D95FE]/40 text-[#F2F5F9]'
          }`}
        >
          <span className="material-symbols-outlined text-[#0D95FE] text-[16px]">credit_card</span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-[#0D95FE]">Instant Card</span>
            <span className="text-[9px] opacity-75">Physical + Virtual</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Card Switcher Bar: Lets User Toggle Between Naira & USD */}
      <div className="relative z-20 flex items-center gap-2 mt-4 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#0A1B3D]/80 border border-slate-200 dark:border-[#14294F] shadow-sm">
        <span className="text-[11px] font-mono text-slate-500 dark:text-[#A8BBD6] uppercase px-1">
          Card Preview:
        </span>
        <button
          onClick={() => {
            setCardType('naira');
            setIsFlipped(false);
          }}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            cardType === 'naira'
              ? 'bg-[#00DF8F] text-[#003825] shadow-sm'
              : 'text-slate-600 dark:text-[#A8BBD6] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🇳🇬</span>
          <span>Naira Titanium</span>
        </button>

        <button
          onClick={() => {
            setCardType('usd');
            setIsFlipped(false);
          }}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            cardType === 'usd'
              ? 'bg-[#0D95FE] text-white shadow-sm'
              : 'text-slate-600 dark:text-[#A8BBD6] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🇺🇸</span>
          <span>USD Virtual</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          title="Flip card"
          className="ml-1 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">sync</span>
        </button>
      </div>
    </div>
  );
};
