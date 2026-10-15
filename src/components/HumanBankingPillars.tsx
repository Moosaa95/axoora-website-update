'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HumanBankingPillarsProps {
  isLight?: boolean;
  onOpenWaitlist?: (interest?: 'personal') => void;
  onOpenWhatsApp?: () => void;
}

type PillarId = 'transfers' | 'whatsapp' | 'halal' | 'paycircle' | 'dollar_card';

interface PillarCard {
  id: PillarId;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  floatingTag: {
    icon: string;
    title: string;
    subtitle: string;
    badge?: string;
  };
  ctaLabel: string;
}

const PILLARS: PillarCard[] = [
  {
    id: 'transfers',
    category: 'PAYMENTS',
    categoryColor: '#00DF8F',
    title: 'Zero-Fee Transfers',
    description: 'Send money to any Nigerian bank with zero transfer fees. First-attempt success rate of 99.9% so you are never left stranded at the supermarket counter.',
    imageSrc: '/images/personal/lifestyle_groceries.jpg',
    imageAlt: 'Nigerian man holding groceries and bank card',
    floatingTag: {
      icon: 'bolt',
      title: '0.8s NIP Settlement',
      subtitle: '₦0.00 fee · Save ₦53.75 vs legacy',
      badge: '99.9% SUCCESS',
    },
    ctaLabel: 'Try Instant Transfer Demo',
  },
  {
    id: 'whatsapp',
    category: 'AI ASSISTANT',
    categoryColor: '#25D366',
    title: 'WhatsApp AI Banking',
    description: 'Bank directly inside your existing WhatsApp. Send money, pay bills, and get instant balance updates in English or Nigerian Pidgin. No 150MB app download needed.',
    imageSrc: '/images/personal/lifestyle_creator.jpg',
    imageAlt: 'Creative entrepreneur banking on WhatsApp',
    floatingTag: {
      icon: 'chat',
      title: '"Axoora send 10k to Mummy"',
      subtitle: 'Voice note or text · 4-digit PIN safe',
      badge: 'WHATSAPP BOT',
    },
    ctaLabel: 'Play Voice Note Demo',
  },
  {
    id: 'halal',
    category: 'ETHICAL WEALTH',
    categoryColor: '#F59E0B',
    title: 'Halal Wealth Vaults',
    description: '100% Shariah-compliant savings backed by real trade assets in the Nigerian economy. Grow your capital without interest (riba), penalties, or lock-in stress.',
    imageSrc: '/images/personal/lifestyle_sofa.jpg',
    imageAlt: 'Young woman enjoying peace of mind on sofa',
    floatingTag: {
      icon: 'savings',
      title: '0% Riba · Mudarabah Vault',
      subtitle: 'Capital backed by real commodities',
      badge: '100% HALAL',
    },
    ctaLabel: 'Calculate Trade Profit',
  },
  {
    id: 'paycircle',
    category: 'COMMUNITY THRIFT',
    categoryColor: '#8B5CF6',
    title: 'Paycircle (Digital Ajo)',
    description: 'Automate your rotational thrift circles without the drama of chasing friends for payments. Collections are automatic, and full payouts go straight to your bank on schedule.',
    imageSrc: '/images/personal/lifestyle_friends_ajo.jpg',
    imageAlt: 'Three Nigerian friends laughing at outdoor brunch',
    floatingTag: {
      icon: 'group',
      title: 'Lekki Friends & Foodies',
      subtitle: '₦200,000 pot · Friday payout automated',
      badge: '4 MEMBERS',
    },
    ctaLabel: 'View Ajo Rotation',
  },
  {
    id: 'dollar_card',
    category: 'GLOBAL SPEND',
    categoryColor: '#0D95FE',
    title: 'Dual-Currency Dollar Cards',
    description: 'Pay for Spotify, Apple Music, Coursera, AWS, and international travel without declined transactions. Funded instantly from your Naira balance at real-time rates.',
    imageSrc: '/images/personal/lifestyle_creator.jpg',
    imageAlt: 'Entrepreneur using virtual dollar card',
    floatingTag: {
      icon: 'credit_card',
      title: 'Axoora Virtual Visa ($)',
      subtitle: 'Zero international decline rate',
      badge: '$2,500 LIMIT',
    },
    ctaLabel: 'Preview Virtual Card',
  },
];

export const HumanBankingPillars: React.FC<HumanBankingPillarsProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Active Interactive Modal
  const [activeModal, setActiveModal] = useState<PillarId | null>(null);

  // Transfer Simulation State
  const [transferState, setTransferState] = useState<'ready' | 'sending' | 'success'>('ready');
  const handleSimulateTransfer = () => {
    if (transferState !== 'ready') return;
    setTransferState('sending');
    setTimeout(() => {
      setTransferState('success');
      setTimeout(() => setTransferState('ready'), 5000);
    }, 850);
  };

  // WhatsApp Voice State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 10;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Halal Vault Calculator State
  const [vaultAmount, setVaultAmount] = useState<number>(250000);
  const estimatedProfit = Math.round(vaultAmount * 0.095);

  // Check scroll position
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="core-banking-pillars"
      className={`relative w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-b overflow-hidden transition-colors scroll-mt-24 ${
        isLight
          ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50 border-slate-200'
          : 'bg-[#020B1D] border-[#14294F]'
      }`}
    >
      {/* Subtle Specular Background Accents */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#00DF8F]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#0D95FE]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        {/* ===================================================================== */}
        {/* HEADER ROW (MONZO STYLE): TITLE + SUBTITLE + CIRCULAR ARROW CONTROLS */}
        {/* ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F]/30 text-xs font-mono font-bold tracking-widest uppercase text-[#00DF8F] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
              <span>BANK WITH AXOORA</span>
            </div>

            <h2
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Enjoy a transfer success rate of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DF8F] via-[#0D95FE] to-[#F2A93B]">
                99.9%.
              </span>
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
              }`}
            >
              No more standing stranded at the supermarket counter or fuel station waiting for a hanging transfer. Experience personal banking that delivers in seconds with zero hidden charges.
            </p>
          </div>

          {/* Monzo Carousel Navigation Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous features"
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollLeft
                  ? isLight
                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm active:scale-95'
                    : 'border-[#1B3564] bg-[#0A1B3D] text-white hover:bg-[#122A5B] hover:border-[#00DF8F]/50 shadow-md active:scale-95'
                  : 'border-transparent opacity-30 cursor-not-allowed text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next features"
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollRight
                  ? isLight
                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm active:scale-95'
                    : 'border-[#1B3564] bg-[#0A1B3D] text-white hover:bg-[#122A5B] hover:border-[#00DF8F]/50 shadow-md active:scale-95'
                  : 'border-transparent opacity-30 cursor-not-allowed text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* CAROUSEL TRACK: HORIZONTAL SCROLL WITH REAL PHOTOGRAPHY & TACTILE UI */}
        {/* ===================================================================== */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-2 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="flex-none w-[310px] sm:w-[350px] lg:w-[380px] snap-start flex flex-col group"
            >
              {/* Media Container: Photo + Floating Tactile UI Card */}
              <div
                onClick={() => setActiveModal(pillar.id)}
                className={`w-full h-[360px] sm:h-[400px] rounded-[28px] overflow-hidden relative border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 shadow-slate-200/60'
                    : 'bg-[#06132D] border-[#162C56] shadow-black/40 hover:border-[#00DF8F]/40'
                }`}
              >
                {/* Real Editorial Lifestyle Photography */}
                <img
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Cinematic Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Corner Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-mono font-black tracking-wider uppercase backdrop-blur-md shadow-md text-white border"
                    style={{
                      backgroundColor: `${pillar.categoryColor}30`,
                      borderColor: `${pillar.categoryColor}80`,
                    }}
                  >
                    {pillar.category}
                  </span>
                </div>

                {/* Floating Tactile Glassmorphism Card (Monzo Style) */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-3.5 rounded-2xl bg-[#091630]/90 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-between gap-3 group-hover:border-[#00DF8F]/60 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                        style={{
                          backgroundColor: `${pillar.categoryColor}20`,
                          color: pillar.categoryColor,
                        }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {pillar.floatingTag.icon}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-white truncate">
                          {pillar.floatingTag.title}
                        </span>
                        <span className="text-[11px] text-[#A8BBD6] truncate">
                          {pillar.floatingTag.subtitle}
                        </span>
                      </div>
                    </div>

                    {pillar.floatingTag.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold shrink-0 bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/30">
                        {pillar.floatingTag.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Content Area: Title + Conversational Copy + Pill Button */}
              <div className="flex flex-col gap-2.5 mt-5 px-1">
                <h3
                  className={`text-xl sm:text-2xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                  }`}
                >
                  {pillar.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed line-clamp-3 ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  {pillar.description}
                </p>

                {/* Monzo-Style Outlined Pill Button */}
                <button
                  onClick={() => setActiveModal(pillar.id)}
                  className={`mt-2 py-2 px-5 rounded-full text-xs sm:text-sm font-bold border w-fit flex items-center gap-2 transition-all cursor-pointer ${
                    isLight
                      ? 'border-slate-800 text-slate-800 hover:bg-slate-900 hover:text-white active:scale-95'
                      : 'border-[#1B3564] text-[#F2F5F9] bg-[#0A1B3D]/60 hover:bg-[#00DF8F] hover:text-[#003825] hover:border-[#00DF8F] active:scale-95 shadow-sm'
                  }`}
                >
                  <span>{pillar.ctaLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* INTERACTIVE PLAYGROUND MODAL: MONIEPOINT-STYLE LIVE SIMULATION */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 overflow-hidden ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#06122B] border-[#1B3564] text-white'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>

              {/* MODAL 1: ZERO-FEE TRANSFERS */}
              {activeModal === 'transfers' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">bolt</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#00DF8F] uppercase tracking-wider">
                        NIBSS INSTANT RAILS // SUB-SECOND
                      </span>
                      <h4 className="text-xl font-black text-white">Instant Transfer Simulator</h4>
                    </div>
                  </div>

                  <p className="text-sm text-[#A8BBD6] leading-relaxed">
                    Test our sovereign NIBSS payment pipeline. See how fast transfers settle without hanging or deduction surprises.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#091630] border border-[#162C56] flex flex-col gap-4">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-[#020B1D] border border-white/5">
                      <div>
                        <span className="text-[10px] text-[#7B9CD2] uppercase block">Recipient</span>
                        <span className="font-bold text-sm text-white">Amina Bello</span>
                        <span className="text-xs text-[#7B9CD2] block">GTBank · 0128491023</span>
                      </div>
                      <span className="text-xs font-bold text-[#00DF8F] bg-[#00DF8F]/15 px-2.5 py-1 rounded-full border border-[#00DF8F]/30">
                        Verified Account ✓
                      </span>
                    </div>

                    <div className="flex justify-between items-center px-1">
                      <div>
                        <span className="text-[10px] text-[#7B9CD2] uppercase block">Amount</span>
                        <span className="text-2xl font-black font-mono text-white">₦25,000.00</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#7B9CD2] uppercase block">Transfer Fee</span>
                        <span className="text-sm font-bold font-mono text-[#00DF8F]">₦0.00</span>
                        <span className="text-[10px] text-rose-400 line-through block">Legacy: ₦53.75</span>
                      </div>
                    </div>

                    {transferState === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-[#00DF8F]/15 border border-[#00DF8F] text-center flex flex-col items-center gap-1.5"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#00DF8F] text-[#003825] flex items-center justify-center font-black">
                          ✓
                        </div>
                        <span className="text-sm font-black text-white">₦25,000.00 Sent to Amina Bello</span>
                        <span className="text-xs text-[#00DF8F] font-mono font-bold">
                          Settled in 0.8s · NIP Ref: AX-948210
                        </span>
                        <span className="text-[10px] text-[#A8BBD6]">Zero transfer fees deducted</span>
                      </motion.div>
                    ) : (
                      <button
                        onClick={handleSimulateTransfer}
                        disabled={transferState === 'sending'}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#00DF8F] hover:bg-[#00C57E] text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00DF8F]/25 active:scale-98 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {transferState === 'sending' ? 'sync' : 'bolt'}
                        </span>
                        <span>
                          {transferState === 'sending'
                            ? 'Settling in 0.8s on NIBSS...'
                            : 'Tap to Send ₦25,000 Instantly'}
                        </span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (onOpenWaitlist) onOpenWaitlist('personal');
                    }}
                    className="w-full py-3 rounded-xl border border-white/20 hover:border-white/40 text-xs font-bold text-center text-white transition-all cursor-pointer"
                  >
                    Open Free Personal Account ➔
                  </button>
                </div>
              )}

              {/* MODAL 2: WHATSAPP BANKING */}
              {activeModal === 'whatsapp' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#25D366] uppercase tracking-wider">
                        CONVERSATIONAL AI // NATIVE WHATSAPP
                      </span>
                      <h4 className="text-xl font-black text-white">WhatsApp Audio & Chat Desk</h4>
                    </div>
                  </div>

                  {/* WhatsApp Message Preview */}
                  <div className="p-4 rounded-2xl bg-[#0B141A] border border-[#202C33] flex flex-col gap-3.5">
                    {/* Voice Note Bubble */}
                    <div className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-[#005C4B] text-white flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setIsPlayingAudio(!isPlayingAudio);
                            setAudioProgress(0);
                          }}
                          className="w-9 h-9 rounded-full bg-white text-[#005C4B] flex items-center justify-center cursor-pointer shrink-0 shadow-md"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <div className="flex items-center gap-1">
                          {[20, 45, 80, 50, 90, 40, 70, 30, 85, 45, 60].map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${isPlayingAudio ? Math.max(12, (h * (audioProgress + 30)) % 32) : h / 3}px` }}
                              className={`w-1 rounded-full transition-all duration-150 ${
                                isPlayingAudio ? 'bg-[#00DF8F]' : 'bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-white/80 font-mono">0:04</span>
                      </div>
                      <span className="text-[11px] italic text-emerald-100">
                        "Axoora send 10k to Mummy for weekend groceries"
                      </span>
                    </div>

                    {/* AI Response Bubble */}
                    <div className="self-start max-w-[85%] p-3.5 rounded-2xl rounded-tl-none bg-[#202C33] text-white flex flex-col gap-2">
                      <span className="text-xs text-[#00DF8F] font-bold">
                        Axoora AI Assistant · NIP Instant
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Transfer of <strong className="text-white">₦10,000.00</strong> to{' '}
                        <strong className="text-white">Mrs. Florence Adeyemi</strong> (Access Bank · 0092184910) completed!
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-white/10 font-mono">
                        <span>Fee: ₦0.00 · Balance: ₦54,230.00</span>
                        <span className="text-[#53BDEB]">✓✓</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenWhatsApp) onOpenWhatsApp();
                      else window.open('https://wa.me/2349110002966?text=Hi%20Axoora', '_blank');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#25D366]/25"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Start Chatting on WhatsApp ➔</span>
                  </button>
                </div>
              )}

              {/* MODAL 3: HALAL VAULT */}
              {activeModal === 'halal' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">savings</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
                        0% RIBA // AUTHENTIC MUDARABAH
                      </span>
                      <h4 className="text-xl font-black text-white">Halal Vault Calculator</h4>
                    </div>
                  </div>

                  <p className="text-sm text-[#A8BBD6] leading-relaxed">
                    Select your target savings capital. Your funds partner directly with physical goods and agriculture in Nigeria with zero debt interest.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[50000, 150000, 250000, 500000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setVaultAmount(amt)}
                        className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          vaultAmount === amt
                            ? 'bg-[#F59E0B] text-[#3D2300] shadow-md scale-102'
                            : 'bg-[#091630] border border-[#162C56] text-white hover:bg-white/5'
                        }`}
                      >
                        ₦{(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#091630] border border-[#162C56] flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-[#7B9CD2] uppercase block">Your Capital</span>
                      <span className="text-2xl font-black font-mono text-white">
                        ₦{vaultAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#F59E0B] uppercase block font-bold">
                        Est. Trade Profit Share
                      </span>
                      <span className="text-2xl font-black font-mono text-[#00DF8F]">
                        +₦{estimatedProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (onOpenWaitlist) onOpenWaitlist('personal');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#3D2300] font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#F59E0B]/25"
                  >
                    Lock Funds in Halal Vault ➔
                  </button>
                </div>
              )}

              {/* MODAL 4: PAYCIRCLE (AJO) */}
              {activeModal === 'paycircle' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">group</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase tracking-wider">
                        DIGITAL THRIFT // AUTOMATED AJO
                      </span>
                      <h4 className="text-xl font-black text-white">Lekki Friends & Foodies</h4>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30">
                    <span className="text-xs font-bold text-white">Weekly Circle Pot</span>
                    <span className="text-sm font-black font-mono text-[#00DF8F]">₦200,000.00</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Adaeze (You)', bank: 'Axoora', status: 'Paid Round 1 ✓' },
                      { name: 'Tunde Bakare', bank: 'GTBank', status: 'Paid Round 2 ✓' },
                      { name: 'Fatima Bello', bank: 'Access Bank', status: 'Receives Pot Friday 🎯' },
                      { name: 'Chinedu Eze', bank: 'Zenith Bank', status: 'Scheduled Round 4' },
                    ].map((m, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2.5 rounded-xl bg-[#091630] border border-white/5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                            {m.name.charAt(0)}
                          </span>
                          <span className="font-bold text-white">{m.name}</span>
                          <span className="text-[10px] text-slate-400">({m.bank})</span>
                        </div>
                        <span className="text-[11px] font-mono text-[#00DF8F]">{m.status}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (onOpenWaitlist) onOpenWaitlist('personal');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#8B5CF6]/25"
                  >
                    Create an Ajo Paycircle ➔
                  </button>
                </div>
              )}

              {/* MODAL 5: DOLLAR CARD */}
              {activeModal === 'dollar_card' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0D95FE]/20 text-[#0D95FE] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">credit_card</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#0D95FE] uppercase tracking-wider">
                        GLOBAL SPEND // DUAL-CURRENCY
                      </span>
                      <h4 className="text-xl font-black text-white">Virtual Visa Dollar Card</h4>
                    </div>
                  </div>

                  {/* Card Visual */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0D95FE] via-[#095499] to-[#041D3B] text-white flex flex-col justify-between h-44 shadow-xl border border-white/20">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold tracking-widest">AXOORA GLOBAL</span>
                      <span className="font-black text-lg italic tracking-wider">VISA</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm tracking-widest">4129 •••• •••• 8821</span>
                      <div className="flex justify-between items-center text-[10px] font-mono opacity-80">
                        <span>EXP 08/29</span>
                        <span>CVV •••</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#A8BBD6] leading-relaxed">
                    No more declined transactions on foreign sites. Instant funding directly from your Naira balance at real-time market rates.
                  </p>

                  <button
                    onClick={() => {
                      setActiveModal(null);
                      if (onOpenWaitlist) onOpenWaitlist('personal');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#0D95FE] hover:bg-[#0B82DE] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#0D95FE]/25"
                  >
                    Request Virtual Dollar Card ➔
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
