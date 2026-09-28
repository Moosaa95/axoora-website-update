'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroDeviceShowcaseProps {
  isLight: boolean;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp: () => void;
  defaultMode?: ShowcaseMode;
}

type ShowcaseMode = 'duo' | 'phone' | 'pos' | 'video';

export const HeroDeviceShowcase: React.FC<HeroDeviceShowcaseProps> = ({
  isLight,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  defaultMode = 'duo',
}) => {
  const [mode, setMode] = useState<ShowcaseMode>(defaultMode);

  useEffect(() => {
    if (defaultMode) {
      setMode(defaultMode);
    }
  }, [defaultMode]);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isSimulatingTransaction, setIsSimulatingTransaction] = useState<boolean>(false);
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);
  const [phoneBalance, setPhoneBalance] = useState<number>(112430.0);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [copiedType, setCopiedType] = useState<'account' | 'id' | null>(null);
  const [posState, setPosState] = useState<'idle' | 'tapping' | 'approved'>('idle');
  const [aiVoiceActive, setAiVoiceActive] = useState<boolean>(false);

  // Auto-cycle through views when enabled and not actively simulating
  useEffect(() => {
    if (!isAutoPlaying || isSimulatingTransaction) return;

    const modes: ShowcaseMode[] = ['duo', 'phone', 'pos', 'video'];
    const timer = setInterval(() => {
      setMode((current) => {
        const nextIndex = (modes.indexOf(current) + 1) % modes.length;
        return modes[nextIndex];
      });
    }, 7500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isSimulatingTransaction]);

  // Simulate end-to-end POS tap to phone settlement
  const handleSimulatePayment = () => {
    if (isSimulatingTransaction) return;
    setIsSimulatingTransaction(true);
    setPosState('tapping');
    setTransactionSuccess(false);

    // 1. Terminal card tap & processing (800ms)
    setTimeout(() => {
      setPosState('approved');

      // 2. Receipt printed & phone receives instant notification (1100ms)
      setTimeout(() => {
        setTransactionSuccess(true);
        setPhoneBalance((prev) => prev + 25000);

        // Reset after 7 seconds
        setTimeout(() => {
          setIsSimulatingTransaction(false);
          setTransactionSuccess(false);
          setPosState('idle');
        }, 7000);
      }, 1000);
    }, 1100);
  };

  const handleCopy = (type: 'account' | 'id', text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* ========================================================================= */}
      {/* SHOWCASE CONTROLS & MODE TOGGLE */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-2 max-w-lg">
        {/* View Segmented Pill */}
        <div
          className={`p-1 rounded-full border flex items-center gap-1 backdrop-blur-md shadow-sm transition-colors ${
            isLight
              ? 'bg-white/90 border-[#CBD5E1]'
              : 'bg-[#0A1B3D]/80 border-[#14294F]'
          }`}
        >
          {(
            [
              { id: 'duo', label: 'Ecosystem', icon: 'devices' },
              { id: 'phone', label: 'Mobile App', icon: 'smartphone' },
              { id: 'pos', label: 'Apex POS', icon: 'point_of_sale' },
              { id: 'video', label: 'Live Video', icon: 'smart_display' },
            ] as const
          ).map((tab) => {
            const isActive = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setMode(tab.id);
                  setIsAutoPlaying(false);
                }}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'text-[#0F172A] font-bold'
                      : 'text-[#F2F5F9] font-bold'
                    : isLight
                    ? 'text-[#64748B] hover:text-[#0F172A]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
                title={`Switch to ${tab.label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="heroDeviceModeActive"
                    className={`absolute inset-0 rounded-full ${
                      isLight
                        ? 'bg-[#E2E8F0] shadow-sm'
                        : 'bg-[#14294F] border border-[#0D95FE]/30'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`material-symbols-outlined text-[15px] relative z-10 ${
                    isActive
                      ? tab.id === 'phone'
                        ? 'text-[#00DF8F]'
                        : tab.id === 'pos'
                        ? 'text-[#F2A93B]'
                        : tab.id === 'video'
                        ? 'text-[#0D95FE]'
                        : 'text-[#00DF8F]'
                      : ''
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                {tab.id === 'video' && (
                  <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Auto-cycle Play/Pause & Live Settlement Simulator Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded-full border text-xs flex items-center justify-center transition-colors cursor-pointer ${
              isLight
                ? 'bg-white border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A]'
                : 'bg-[#0A1B3D] border-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
            }`}
            title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-rotation'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAutoPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={handleSimulatePayment}
            disabled={isSimulatingTransaction}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
              isSimulatingTransaction
                ? 'bg-[#00DF8F] text-[#003825] border-[#00DF8F] animate-pulse'
                : isLight
                ? 'bg-[#E6F8F0] border-[#A7F3D0] text-[#00875A] hover:bg-[#00875A] hover:text-white'
                : 'bg-[#00DF8F]/15 border-[#00DF8F]/40 text-[#00DF8F] hover:bg-[#00DF8F] hover:text-[#003825]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isSimulatingTransaction ? 'sync' : 'contactless'}
            </span>
            <span className="hidden sm:inline">
              {isSimulatingTransaction ? 'Settling ₦25,000...' : 'Tap POS to Pay Phone'}
            </span>
            <span className="sm:hidden">
              {isSimulatingTransaction ? 'Settling' : 'Test Pay'}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D STAGE FOR PHONE & POS DEVICES */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[560px] h-[670px] sm:h-[700px] flex items-center justify-center perspective-[1200px]">
        {/* Ambient Glowing Halos */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#0D95FE]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00DF8F]/15 rounded-full blur-3xl pointer-events-none" />
        {mode === 'pos' && (
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#F2A93B]/15 rounded-full blur-3xl pointer-events-none" />
        )}

        {/* Dynamic Beam between Devices in Duo Mode */}
        {mode === 'duo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute z-35 pointer-events-none hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-[#020F2E]/90 border border-[#00DF8F]/40 text-[#00DF8F] text-[10px] font-mono shadow-lg backdrop-blur-md -top-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-ping" />
            <span>NIBSS Instant 2.4s Settlement Stream Active</span>
          </motion.div>
        )}

        {/* ===================================================================== */}
        {/* DEVICE 1: THE AXOORA SMARTPHONE (EXACT MATCH TO USER UPLOADED DESIGN) */}
        {/* ===================================================================== */}
        <motion.div
          animate={{
            x:
              mode === 'video'
                ? -160
                : mode === 'duo'
                ? -65
                : mode === 'phone'
                ? 0
                : -115,
            y:
              mode === 'video'
                ? 40
                : mode === 'duo'
                ? -5
                : mode === 'phone'
                ? 0
                : 25,
            scale:
              mode === 'video'
                ? 0.7
                : mode === 'phone'
                ? 1.02
                : mode === 'duo'
                ? 0.94
                : 0.82,
            rotateZ:
              mode === 'video'
                ? -8
                : mode === 'duo'
                ? -3
                : mode === 'phone'
                ? 0
                : -7,
            rotateY:
              mode === 'video'
                ? 14
                : mode === 'duo'
                ? 5
                : mode === 'phone'
                ? 0
                : 12,
            zIndex:
              mode === 'video'
                ? 5
                : mode === 'phone'
                ? 30
                : mode === 'duo'
                ? 25
                : 10,
            opacity: mode === 'video' ? 0 : mode === 'pos' ? 0.65 : 1,
            pointerEvents: mode === 'video' ? 'none' : 'auto',
            filter: mode === 'pos' ? 'blur(0.5px)' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={() => {
            if (mode !== 'phone') setMode('phone');
          }}
          className="absolute w-[305px] sm:w-[330px] rounded-[52px] p-[5px] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] cursor-pointer select-none"
          style={{
            background:
              'linear-gradient(135deg, #DEAA79 0%, #C38A56 25%, #8B592A 50%, #C38A56 75%, #ECC093 100%)',
          }}
        >
          {/* Side Hardware Buttons (Bronze/Gold Metallic Chamfer) */}
          <div className="absolute -right-[3px] top-[140px] w-[3px] h-[36px] bg-[#9D6837] rounded-r-sm" />
          <div className="absolute -right-[3px] top-[188px] w-[3px] h-[48px] bg-[#9D6837] rounded-r-sm" />
          <div className="absolute -left-[3px] top-[150px] w-[3px] h-[30px] bg-[#9D6837] rounded-l-sm" />

          {/* Thin inner black rim bezel */}
          <div className="w-full h-full rounded-[47px] p-[6px] bg-[#000000]">
            {/* The Actual Display Screen - Zero Scroll: Everything fits perfectly inside */}
            <div className="w-full h-[620px] sm:h-[645px] rounded-[41px] bg-[#020B1D] text-[#F2F5F9] font-sans overflow-hidden relative flex flex-col justify-between p-3 shadow-inner">
              {/* TOP STATUS BAR */}
              <div className="w-full pt-0.5 pb-1 flex items-center justify-between text-xs px-2 z-20 shrink-0">
                <span className="font-bold text-[12px] tracking-tight text-white font-sans">
                  9:41
                </span>

                {/* Punch-hole camera (Centered) */}
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700/80 flex items-center justify-center relative shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a1a36]" />
                </div>

                {/* Cellular signal dots */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* USER PROFILE HEADER ROW */}
              <div className="flex items-center justify-between pt-0.5 shrink-0">
                {/* Avatar and user info */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#0D47A1] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#1976D2]/40">
                    AB
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white leading-tight">
                      Adaeze
                    </span>
                    <span className="text-[10px] text-[#8EA2C6] leading-tight mt-0.5">
                      Tier 3 · no daily cap
                    </span>
                  </div>
                </div>

                {/* Wallet & Bell Actions */}
                <div className="flex items-center gap-1.5">
                  <div className="px-2.5 py-1 rounded-full bg-[#0E1D3B] border border-[#1B3564] flex items-center gap-1.5 text-white">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#7B9CD2]">
                        grid_view
                      </span>
                      <span className="text-[11px] font-semibold">Wallet</span>
                    </div>
                    <span className="text-[#1B3564]">|</span>
                    <span className="material-symbols-outlined text-[13px] text-[#7B9CD2]">
                      chat_bubble
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#0E1D3B] border border-[#1B3564] flex items-center justify-center text-[#7B9CD2] hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                      notifications
                    </span>
                  </div>
                </div>
              </div>

              {/* AVAILABLE BALANCE ROW */}
              <div className="flex flex-col gap-0.5 pt-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#7B9CD2] font-semibold uppercase">
                    <span>AVAILABLE</span>
                    <span className="h-[1px] w-20 bg-[#1A325E]" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBalance(!showBalance);
                    }}
                    className="text-[#7B9CD2] hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showBalance ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>

                {/* Big Naira Currency & Amount */}
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight">
                    ₦{showBalance
                      ? phoneBalance.toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : '••••••••••'}
                  </span>
                </div>

                <p className="text-[10px] text-[#7B9CD2] leading-tight">
                  No daily cap · ₦{phoneBalance.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  available now
                </p>
              </div>

              {/* ACCOUNT NUMBER & AXOORA ID QUICK CARDS */}
              <div className="grid grid-cols-12 gap-1.5 pt-1 shrink-0">
                {/* Account Number Card */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy('account', '9012345678');
                  }}
                  className="col-span-5 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
                >
                  <span className="text-[8px] font-mono uppercase text-[#7B9CD2] tracking-wider">
                    ACCOUNT
                  </span>
                  <div className="flex items-center justify-between text-[11px] font-bold text-white mt-0.5">
                    <span>9012345678</span>
                    <span className="material-symbols-outlined text-[12px] text-[#7B9CD2]">
                      {copiedType === 'account' ? 'check' : 'content_copy'}
                    </span>
                  </div>
                </div>

                {/* Axoora ID Card */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy('id', '@adaeze');
                  }}
                  className="col-span-5 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
                >
                  <span className="text-[8px] font-mono uppercase text-[#7B9CD2] tracking-wider">
                    AXOORA ID
                  </span>
                  <div className="flex items-center justify-between text-[11px] font-bold text-white mt-0.5">
                    <span>@adaeze</span>
                    <span className="material-symbols-outlined text-[12px] text-[#7B9CD2]">
                      {copiedType === 'id' ? 'check' : 'content_copy'}
                    </span>
                  </div>
                </div>

                {/* Share Button */}
                <div className="col-span-2 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex items-center justify-center text-[#7B9CD2] hover:text-white cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">
                    share
                  </span>
                </div>
              </div>

              {/* AI SEARCH & INTENT BAR */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setAiVoiceActive(!aiVoiceActive);
                }}
                className="w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-[#0C244E] to-[#0A1D3F] border border-[#1B3A6C] flex items-center justify-between shadow-sm cursor-pointer hover:border-[#0D95FE] transition-colors shrink-0"
              >
                <div className="flex items-center gap-2 text-[11px]">
                  {/* Axoora Cyan Triangle Logo */}
                  <div className="w-4 h-4 rounded-md bg-[#0D95FE] flex items-center justify-center text-white text-[9px] font-black">
                    ▲
                  </div>
                  <span className="text-[#A8BBD6]">
                    Ask Axoora — <span className="text-white font-medium">"send 5k to Musa"</span>
                  </span>
                </div>
                <span className="material-symbols-outlined text-[15px] text-[#7B9CD2]">
                  mic
                </span>
              </div>

              {/* 4 QUICK ACTION BUTTONS */}
              <div className="grid grid-cols-4 gap-2 text-center pt-0.5 shrink-0">
                {/* Send */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWaitlist('personal');
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#0D95FE] text-[#00284D] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">
                      north_east
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-white">Send</span>
                </button>

                {/* Bills & more */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWaitlist('personal');
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                      bolt
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#A8BBD6]">Bills & more</span>
                </button>

                {/* Add money */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWaitlist('personal');
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                      south_west
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#A8BBD6]">Add money</span>
                </button>

                {/* Mall */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWaitlist('personal');
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                      storefront
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#A8BBD6]">Mall</span>
                </button>
              </div>

              {/* SCHEDULED PAYMENTS / DUE TOMORROW BANNER */}
              <div className="p-2 rounded-xl bg-[#07142E] border border-[#142A58] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-dashed border-[#F2A93B] text-[#F2A93B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">
                      schedule
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white">
                      Due tomorrow · 2 payments
                    </span>
                    <span className="text-[9px] text-[#7B9CD2]">
                      Chidinma Okafor and DStv
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-[#F2A93B] font-bold text-[11px]">
                  <span>– ₦34,900.00</span>
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                </div>
              </div>

              {/* BOTTOM SHEET: PAY CIRCLE, SAVINGS & RECENT (EXACT MATCH TO DESIGN) */}
              <div className="rounded-2xl bg-[#08152F] border border-[#142A58] p-2 flex flex-col gap-1.5 shrink-0">
                {/* TWO BENTO CARDS: PAY CIRCLE & SAVINGS */}
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Pay Circle Card */}
                  <div className="p-2 rounded-xl bg-[#0B1A3A] border border-[#152B56] flex flex-col justify-between gap-1">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[16px] text-[#7B9CD2]">
                        groups
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#00DF8F]/20 text-[#00DF8F] text-[8px] font-bold flex items-center gap-0.5">
                        ↓ Payout
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[11px] text-white">Pay Circle</span>
                      <span className="text-[9px] text-[#7B9CD2]">2 circles · due Friday</span>
                    </div>
                    <span className="font-bold font-mono text-[11px] text-white">
                      ₦ 10,000.00
                    </span>
                  </div>

                  {/* Savings Card */}
                  <div className="p-2 rounded-xl bg-[#0B1A3A] border border-[#152B56] flex flex-col justify-between gap-1">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-[16px] text-[#7B9CD2]">
                        inventory_2
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[11px] text-white">Savings</span>
                      <span className="text-[9px] text-[#7B9CD2]">2 plans · non-interest</span>
                    </div>
                    <span className="font-bold font-mono text-[11px] text-white">
                      ₦ 85,000.00
                    </span>
                  </div>
                </div>

                {/* Dashed Separator */}
                <div className="w-full border-t border-dashed border-[#1B3564]" />

                {/* RECENT TRANSACTIONS ROW */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white">Recent</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWaitlist('personal');
                      }}
                      className="text-[9px] font-bold text-[#0D95FE] tracking-wider uppercase hover:underline"
                    >
                      SEE ALL
                    </button>
                  </div>

                  {/* Transaction Item: Chidinma Okafor Received */}
                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#0A1A38] border border-[#142A58] flex items-center justify-center text-[#00DF8F]">
                        <span className="material-symbols-outlined text-[13px]">
                          south_west
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-white leading-tight">
                          Chidinma Okafor
                        </span>
                        <span className="text-[9px] text-[#7B9CD2] leading-tight">
                          Received · 14:08
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold font-mono text-[#00DF8F]">
                      + ₦25,000.00
                    </span>
                  </div>
                </div>
              </div>

              {/* HOME INDICATOR BAR */}
              <div className="w-full flex items-center justify-center pt-0.5 shrink-0">
                <div className="w-24 h-1 rounded-full bg-white/40" />
              </div>

              {/* Instant Inflow Toast when POS Simulates Payment */}
              <AnimatePresence>
                {transactionSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="absolute inset-x-3 bottom-12 z-30 p-2.5 rounded-2xl bg-gradient-to-r from-[#00DF8F] to-[#0D95FE] text-[#003825] shadow-2xl flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] font-bold">
                      check_circle
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold">₦25,000.00 Inflow Added</span>
                        <span className="text-[8px] font-mono font-black bg-black/15 px-1 rounded">
                          SETTLED
                        </span>
                      </div>
                      <p className="text-[9px] opacity-90 truncate">
                        Apex POS #7821 Wuse Market settlement
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* DEVICE 2: THE AXOORA APEX PRO POS TERMINAL */}
        {/* ===================================================================== */}
        <motion.div
          animate={{
            x:
              mode === 'video'
                ? 160
                : mode === 'duo'
                ? 90
                : mode === 'pos'
                ? 0
                : 115,
            y:
              mode === 'video'
                ? 40
                : mode === 'duo'
                ? 20
                : mode === 'pos'
                ? 0
                : -25,
            scale:
              mode === 'video'
                ? 0.7
                : mode === 'pos'
                ? 1
                : mode === 'duo'
                ? 0.94
                : 0.82,
            rotateZ:
              mode === 'video'
                ? 8
                : mode === 'duo'
                ? 4
                : mode === 'pos'
                ? 0
                : 7,
            rotateY:
              mode === 'video'
                ? -14
                : mode === 'duo'
                ? -5
                : mode === 'pos'
                ? 0
                : -12,
            zIndex:
              mode === 'video'
                ? 5
                : mode === 'pos'
                ? 30
                : mode === 'duo'
                ? 20
                : 10,
            opacity: mode === 'video' ? 0 : mode === 'phone' ? 0.65 : 1,
            pointerEvents: mode === 'video' ? 'none' : 'auto',
            filter: mode === 'phone' ? 'blur(0.5px)' : 'none',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={() => {
            if (mode !== 'pos') setMode('pos');
          }}
          className={`absolute w-[280px] sm:w-[310px] rounded-[36px] p-3 shadow-2xl cursor-pointer transition-shadow ${
            isLight
              ? 'bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-2 border-slate-300'
              : 'bg-gradient-to-b from-[#14294F] via-[#0A1B3D] to-[#01091C] shadow-[0_30px_70px_-15px_rgba(242,169,59,0.25)] border-2 border-[#F2A93B]/40'
          }`}
        >
          {/* Top Thermal Printer Slot */}
          <div className="w-full relative mb-2 flex flex-col items-center">
            {/* Paper Exit Chamber */}
            <div className="w-44 h-2.5 rounded-full bg-black/80 border border-slate-700/80 shadow-inner flex items-center justify-center">
              <div className="w-36 h-0.5 bg-slate-900 rounded-full" />
            </div>

            {/* Thermal Receipt Paper Ejection Animation */}
            <motion.div
              animate={{
                height:
                  posState === 'approved' || transactionSuccess
                    ? 110
                    : mode === 'pos'
                    ? 60
                    : 35,
                opacity: 1,
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-40 bg-[#FFFDF5] text-slate-900 font-mono rounded-t-sm shadow-md overflow-hidden px-2 pt-1 border-x border-t border-amber-200/60 z-10 -mt-0.5 text-center flex flex-col justify-start"
            >
              <div className="border-b border-dashed border-slate-400 pb-1 mb-1">
                <span className="text-[9px] font-extrabold tracking-wider block text-slate-900">
                  AXOORA APEX PRO 4G
                </span>
                <span className="text-[7px] text-slate-600 block">
                  GARKI COMMERCIAL TERMINAL #7821
                </span>
              </div>
              <div className="text-[8px] flex items-center justify-between font-bold text-slate-800">
                <span>SALE (0.4% FLAT)</span>
                <span>APPROVED</span>
              </div>
              <div className="text-[11px] font-black text-emerald-700 tabular-nums">
                ₦25,000.00
              </div>
              <div className="text-[7px] text-slate-500 font-mono">
                NIBSS INSTANT SETTLEMENT ✓
              </div>
              {/* Serrated Bottom Edge */}
              <div className="w-full mt-auto pt-1 overflow-hidden">
                <svg className="w-full h-1.5 text-[#1E293B]" viewBox="0 0 160 6" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,6 L5,0 L10,6 L15,0 L20,6 L25,0 L30,6 L35,0 L40,6 L45,0 L50,6 L55,0 L60,6 L65,0 L70,6 L75,0 L80,6 L85,0 L90,6 L95,0 L100,6 L105,0 L110,6 L115,0 L120,6 L125,0 L130,6 L135,0 L140,6 L145,0 L150,6 L155,0 L160,6 Z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* POS Color Screen Unit */}
          <div className="w-full pos-terminal-display bg-[#020F2E] rounded-[22px] border-2 border-[#1E3A6B] p-3 text-white flex flex-col gap-2 relative overflow-hidden shadow-inner">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#A8BBD6] border-b border-[#14294F] pb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                <span className="text-[#00DF8F] font-bold">MTN 4G + AIRTEL</span>
              </div>
              <div className="flex items-center gap-1">
                <span>99.98%</span>
                <span className="material-symbols-outlined text-[12px] text-[#00DF8F]">
                  battery_charging_full
                </span>
              </div>
            </div>

            {/* Screen Brand Banner */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-wider text-[#F2A93B] font-bold uppercase">
                AXOORA APEX PAY
              </span>
              <span className="text-[8px] font-mono text-slate-400">#AX-7821</span>
            </div>

            {/* Terminal Main Display Area */}
            <div
              className={`rounded-xl p-3 border text-center transition-all ${
                posState === 'approved'
                  ? 'bg-emerald-950/80 border-[#00DF8F]'
                  : posState === 'tapping'
                  ? 'bg-[#0A1B3D] border-[#0D95FE] animate-pulse'
                  : 'bg-[#01091C] border-[#14294F]'
              }`}
            >
              <span className="text-[9px] text-[#A8BBD6] uppercase font-mono block mb-0.5">
                {posState === 'approved'
                  ? 'TRANSACTION APPROVED'
                  : posState === 'tapping'
                  ? 'READING CHIP / NFC...'
                  : 'ENTER AMOUNT OR TAP'}
              </span>

              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight tabular-nums text-[#F2F5F9]">
                ₦ 25,000.00
              </div>

              {/* Pulsing Contactless NFC Radio Waves */}
              <div className="py-1.5 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 0.1, 0.6],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute w-12 h-12 rounded-full border-2 border-[#00DF8F]"
                  />
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      posState === 'approved'
                        ? 'bg-[#00DF8F] text-[#003825]'
                        : posState === 'tapping'
                        ? 'bg-[#0D95FE] text-[#00325b]'
                        : 'bg-[#14294F] text-[#00DF8F]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      contactless
                    </span>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-[#00DF8F] font-bold mt-1 tracking-wider">
                  {posState === 'approved'
                    ? 'SETTLED · 0.4% FLAT'
                    : 'TAP / INSERT CARD'}
                </span>
              </div>
            </div>

            {/* Terminal Hardware Feature Ticker */}
            <div className="flex items-center justify-between text-[8px] font-mono text-[#A8BBD6] pt-0.5">
              <span>Dual-eSIM Redundancy</span>
              <span className="text-[#00DF8F]">Offline Mode Ready</span>
            </div>
          </div>

          {/* Physical Tactile POS Keypad Grid */}
          <div className="w-full mt-2 grid grid-cols-4 gap-1.5 px-1">
            {['1', '2', '3', '✕', '4', '5', '6', '⌫', '7', '8', '9', 'OK'].map(
              (key, i) => {
                const isCancel = key === '✕';
                const isClear = key === '⌫';
                const isEnter = key === 'OK';
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isEnter) handleSimulatePayment();
                    }}
                    className={`h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-transform active:scale-95 shadow-sm border ${
                      isCancel
                        ? 'bg-red-950/70 border-red-700/60 text-red-300 hover:bg-red-900'
                        : isClear
                        ? 'bg-amber-950/70 border-amber-700/60 text-amber-300 hover:bg-amber-900'
                        : isEnter
                        ? 'bg-emerald-950/80 border-[#00DF8F]/80 text-[#00DF8F] hover:bg-emerald-800'
                        : 'pos-keypad-btn bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] hover:bg-[#1E3A6B]'
                    }`}
                  >
                    {key}
                  </button>
                );
              }
            )}
          </div>

          {/* Bottom Card Chip Slot */}
          <div className="w-full mt-2 flex items-center justify-center">
            <div className="w-36 h-2 rounded-full bg-black/90 border border-slate-700 flex items-center justify-center">
              <span className="w-20 h-0.5 bg-[#00DF8F]/60 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* MODE: PROMINENT VIDEO SHOWCASE (HIGH-DEFINITION THEATER VIEW) */}
        {/* ===================================================================== */}
        <AnimatePresence>
          {mode === 'video' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.4 }}
              className="absolute z-40 w-full max-w-[420px] rounded-3xl p-4 bg-[#0A1B3D]/98 border-2 border-[#0D95FE] shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#14294F]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-ping" />
                  <span className="font-mono text-xs font-bold text-[#F2F5F9]">
                    AXOORA LIVE STREET STREAM
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00DF8F]/20 text-[9px] font-mono text-[#00DF8F] font-bold">
                  AUTOPLAY • 1080P
                </span>
              </div>

              {/* Video Element with App & POS Demonstration */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black my-3 border border-[#14294F]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                </video>

                {/* Overlaid Live Badges */}
                <div className="absolute top-2 left-2 bg-[#020F2E]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#00DF8F]/60 font-mono text-[9px] text-[#00DF8F]">
                  ● Wuse Market Terminal #7821
                </div>
                <div className="absolute bottom-2 right-2 bg-[#020F2E]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#0D95FE]/60 font-mono text-[9px] text-[#0D95FE]">
                  ⚡ 0.9s NIBSS Settlement
                </div>
              </div>

              {/* Video Footer */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[#A8BBD6] text-[11px]">
                  Unedited street footage of real Nigerian commerce
                </span>
                <button
                  onClick={onOpenWhatsApp}
                  className="px-3 py-1.5 rounded-full bg-[#00DF8F] text-[#003825] font-bold text-[11px] hover:bg-[#0D95FE] hover:text-[#00325b] transition-all cursor-pointer whitespace-nowrap"
                >
                  Chat with Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================== */}
        {/* FLOATING CONTEXTUAL BADGES */}
        {/* ===================================================================== */}
        {/* Floating Badge 1: 99.98% POS Uptime */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -bottom-2 -left-2 sm:-left-6 z-35 px-3 py-2 rounded-2xl border shadow-xl flex items-center gap-2 backdrop-blur-md ${
            isLight
              ? 'bg-white/95 border-[#E2E8F0] text-[#0F172A]'
              : 'bg-[#0A1B3D]/95 border-[#14294F] text-[#F2F5F9]'
          }`}
        >
          <div className="w-7 h-7 rounded-xl bg-[#F2A93B]/20 text-[#F2A93B] flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F2A93B] uppercase font-bold block">
              99.98% Uptime
            </span>
            <span className="text-xs font-bold block">Dual-eSIM Redundancy</span>
          </div>
        </motion.div>

        {/* Floating Badge 2: 2.4s AI Latency */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className={`absolute -top-3 -right-2 sm:-right-6 z-35 px-3 py-2 rounded-2xl border shadow-xl flex items-center gap-2 backdrop-blur-md ${
            isLight
              ? 'bg-white/95 border-[#E2E8F0] text-[#0F172A]'
              : 'bg-[#0A1B3D]/95 border-[#14294F] text-[#F2F5F9]'
          }`}
        >
          <div className="w-7 h-7 rounded-xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">chat</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold block">
              WhatsApp &amp; App AI
            </span>
            <span className="text-xs font-bold block">Instant Chat Banking</span>
          </div>
        </motion.div>
      </div>

      {/* Street Sync Hint */}
      <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#A8BBD6]">
        <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">
          touch_app
        </span>
        <span>Tap either device or use tabs above to inspect in detail</span>
      </div>
    </div>
  );
};
