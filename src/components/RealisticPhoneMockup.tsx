'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealisticPhoneMockupProps {
  isLight?: boolean;
  onOpenWaitlist?: (interest?: 'personal') => void;
  onOpenWhatsApp?: () => void;
  onOpenCommandDrawer?: () => void;
  defaultView?: 'whatsapp' | 'app';
  autoPlay?: boolean;
}

type PhoneViewMode = 'whatsapp' | 'app';

interface HumanChatScenario {
  id: string;
  pillLabel: string;
  pillEmoji: string;
  userMessage: string;
  userTime: string;
  aiReply: string;
  aiPill: string;
  notificationTitle: string;
  notificationSub: string;
  walletBalanceBefore: number;
  walletBalanceAfter: number;
  walletTransactionTitle: string;
  walletTransactionType: string;
  walletTransactionAmount: string;
  walletTransactionCredit: boolean;
  walletCardFrozen?: boolean;
  walletVaultActive?: boolean;
}

const HUMAN_SCENARIOS: HumanChatScenario[] = [
  {
    id: 'mum_transfer',
    pillLabel: 'Send to Mum',
    pillEmoji: '🥑',
    userMessage: 'Hey Axoora, send ₦15,000 to Mum for groceries 🥑',
    userTime: '09:41',
    aiReply:
      'Done! ₦15,000 sent to Mummy (Mrs. F. Bello). Delivered via direct NIP rails in 0.8s with ₦0.00 fee. Saved ₦53.75 💚',
    aiPill: '⚡ 0s NIP Settlement · ₦0.00 Fee',
    notificationTitle: '₦15,000 Sent to Mummy',
    notificationSub: '₦0.00 fee · Balance updated in wallet',
    walletBalanceBefore: 112430.0,
    walletBalanceAfter: 97430.0,
    walletTransactionTitle: 'Mummy (Groceries)',
    walletTransactionType: 'Instant NIP Transfer · 09:41',
    walletTransactionAmount: '– ₦15,000.00',
    walletTransactionCredit: false,
  },
  {
    id: 'savings_yield',
    pillLabel: 'Monthly Savings',
    pillEmoji: '💰',
    userMessage: 'Axoora, how much have I saved on transfer fees this month?',
    userTime: '09:42',
    aiReply:
      'You avoided ₦4,850 in transfer fees, and your Halal Vault earned +₦3,200 in ethical profit sharing. Total ₦8,050 kept in your pocket! 💰',
    aiPill: '🌱 0% Riba · Real Asset Growth',
    notificationTitle: '+₦8,050 Kept in Your Pocket',
    notificationSub: 'Zero fees + Halal profit share',
    walletBalanceBefore: 97430.0,
    walletBalanceAfter: 100630.0,
    walletTransactionTitle: 'Halal Vault Profit Share',
    walletTransactionType: 'Ethical Mudarabah Yield · Today',
    walletTransactionAmount: '+ ₦3,200.00',
    walletTransactionCredit: true,
    walletVaultActive: true,
  },
  {
    id: 'card_security',
    pillLabel: '1-Tap Freeze',
    pillEmoji: '🔒',
    userMessage: 'Freeze my card quick, left my wallet in an Uber!',
    userTime: '09:43',
    aiReply:
      'Locked immediately 🔒 Both virtual & physical cards are frozen. Zero transactions can pass. Reply "unfreeze" whenever you find it.',
    aiPill: '🛡️ Instant 1-Tap Freeze Protection',
    notificationTitle: 'Debit Card Frozen & Protected',
    notificationSub: 'All transactions blocked · 1-tap unfreeze ready',
    walletBalanceBefore: 97430.0,
    walletBalanceAfter: 97430.0,
    walletTransactionTitle: 'Security Lock Activated',
    walletTransactionType: 'Card Frozen via WhatsApp · 09:43',
    walletTransactionAmount: 'Active 🔒',
    walletTransactionCredit: false,
    walletCardFrozen: true,
  },
];

// Pixel-perfect official WhatsApp verified badge
const WhatsAppVerifiedBadge = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 inline-block">
    <path
      d="M12 2L14.5 4.5L18 4L19 7.5L22 9.5L21.5 13L23 16.5L20 18.5L19.5 22L16 21.5L13.5 24L10.5 21.5L7 22L6.5 18.5L3.5 16.5L5 13L4.5 9.5L7.5 7.5L8.5 4L12 4.5L12 2Z"
      fill="#00A884"
    />
    <path
      d="M9.5 12.5L11 14L15 10"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// WhatsApp Double Blue Checkmarks (Read Receipts)
const DynamicDoubleTicks = ({ isRead = true }: { isRead?: boolean }) => (
  <span className="inline-flex items-center -space-x-1 shrink-0 ml-0.5">
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className={isRead ? 'text-[#53BDEB]' : 'text-[#8696A0]'}
    >
      <path
        d="M2.5 8.5L6 12L13.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className={isRead ? 'text-[#53BDEB]' : 'text-[#8696A0]'}
    >
      <path
        d="M4.5 8.5L8 12L15.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const RealisticPhoneMockup: React.FC<RealisticPhoneMockupProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenCommandDrawer,
  defaultView = 'whatsapp',
  autoPlay = true,
}) => {
  const [activeView, setActiveView] = useState<PhoneViewMode>(defaultView);
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [chatStep, setChatStep] = useState<'user_sent' | 'ai_typing' | 'ai_replied'>('ai_replied');
  const [showDynamicIsland, setShowDynamicIsland] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoPlay);
  const [copiedType, setCopiedType] = useState<'account' | 'id' | null>(null);

  const currentScenario = HUMAN_SCENARIOS[scenarioIndex];

  // ---------------------------------------------------------------------------
  // AUTOMATED CINEMATIC STORY LOOP
  // Rotates between:
  // 1. WhatsApp user message ->
  // 2. AI typing indicator (1.2s) ->
  // 3. AI verified financial reply ->
  // 4. Dynamic Island pops with notification ->
  // 5. Auto-switches to App Wallet to show live ledger impact ->
  // 6. Returns to WhatsApp with the next life scenario
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    let subTimers: NodeJS.Timeout[] = [];

    // Phase 1: User types/sends on WhatsApp (0s - 1.2s)
    setActiveView('whatsapp');
    setChatStep('user_sent');
    setShowDynamicIsland(false);

    // Phase 2: AI Typing indicator (1.2s - 2.8s)
    const t1 = setTimeout(() => {
      setChatStep('ai_typing');
    }, 1200);
    subTimers.push(t1);

    // Phase 3: AI responds with verified receipt & Dynamic Island triggers (2.8s)
    const t2 = setTimeout(() => {
      setChatStep('ai_replied');
      setShowDynamicIsland(true);
    }, 2800);
    subTimers.push(t2);

    // Phase 4: Dynamic Island hands off to Native App Wallet (5.2s)
    const t3 = setTimeout(() => {
      setShowDynamicIsland(false);
      setActiveView('app');
    }, 5200);
    subTimers.push(t3);

    // Phase 5: Advance to next scenario and return to WhatsApp (9.2s)
    const t4 = setTimeout(() => {
      setScenarioIndex((prev) => (prev + 1) % HUMAN_SCENARIOS.length);
    }, 9200);
    subTimers.push(t4);

    return () => {
      subTimers.forEach(clearTimeout);
    };
  }, [scenarioIndex, isAutoPlaying, isHovered]);

  const handleManualSwitchView = (view: PhoneViewMode) => {
    setActiveView(view);
    setShowDynamicIsland(false);
  };

  const handleSelectScenario = (index: number) => {
    setScenarioIndex(index);
    setChatStep('ai_replied');
    setShowDynamicIsland(false);
  };

  const handleCopy = (type: 'account' | 'id', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-[370px] mx-auto"
    >
      {/* ========================================================================= */}
      {/* TOP FLOATING SEGMENTED CONTROLLER (Live WhatsApp AI <-> Native App Wallet) */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col gap-2 mb-3 z-30">
        <div
          className={`flex items-center justify-between p-1 rounded-full border shadow-xl backdrop-blur-xl transition-colors ${
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-700 shadow-slate-200/50'
              : 'bg-slate-900/90 dark:bg-[#020F2E]/95 border-slate-700/60 dark:border-white/10 text-slate-300'
          }`}
        >
          <button
            onClick={() => handleManualSwitchView('whatsapp')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeView === 'whatsapp'
                ? 'bg-[#00A884] text-white shadow-md shadow-[#00A884]/30'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">chat</span>
            <span>WhatsApp AI</span>
            {activeView === 'whatsapp' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>

          <button
            onClick={() => handleManualSwitchView('app')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeView === 'app'
                ? 'bg-[#0D95FE] text-white shadow-md shadow-[#0D95FE]/30'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">account_balance_wallet</span>
            <span>App Wallet</span>
            {activeView === 'app' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>

          {/* Pause / Play Indicator */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title={isAutoPlaying ? 'Pause automatic demo' : 'Resume automatic demo'}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isAutoPlaying && !isHovered ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Story Progress Bars (3 Segments: Mum Transfer -> Savings -> Card Freeze) */}
        <div className="flex items-center gap-1.5 px-2">
          {HUMAN_SCENARIOS.map((sc, idx) => {
            const isCurrent = scenarioIndex === idx;
            return (
              <div
                key={sc.id}
                onClick={() => handleSelectScenario(idx)}
                className={`flex-1 h-1 rounded-full overflow-hidden cursor-pointer group ${
                  isLight ? 'bg-slate-200' : 'bg-slate-700/60'
                }`}
                title={sc.pillLabel}
              >
                <motion.div
                  className={`h-full ${
                    isCurrent
                      ? activeView === 'whatsapp'
                        ? 'bg-[#00A884]'
                        : 'bg-[#0D95FE]'
                      : 'bg-transparent'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: isCurrent ? '100%' : '0%' }}
                  transition={{ duration: isCurrent ? 9.2 : 0.2, ease: 'linear' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE IPHONE 16 PRO HARDWARE CHASSIS */}
      {/* ========================================================================= */}
      <motion.div
        className={`${isLight ? '' : 'dark-hardware preserve-dark'} relative w-full aspect-[9/18.5] max-w-[335px] sm:max-w-[360px] rounded-[50px] p-[10px] sm:p-[12px] bg-gradient-to-b from-[#22272E] via-[#161B22] to-[#0D1117] shadow-[0_30px_90px_rgba(0,0,0,0.85)] border-[3px] border-[#3B434D]/80`}
      >
        {/* Hardware Antenna Bands */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-3 bg-[#485361]/50 rounded-r-xs" />
        <div className="absolute -left-[3px] top-40 w-[3px] h-3 bg-[#485361]/50 rounded-r-xs" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-3 bg-[#485361]/50 rounded-l-xs" />

        {/* Hardware Action Button & Volume Buttons (Left Edge) */}
        <div className="absolute -left-[6px] top-20 w-[3px] h-7 bg-[#2E353F] rounded-l-sm" />
        <div className="absolute -left-[6px] top-34 w-[3px] h-11 bg-[#2E353F] rounded-l-sm" />
        <div className="absolute -left-[6px] top-48 w-[3px] h-11 bg-[#2E353F] rounded-l-sm" />

        {/* Hardware Power Button (Right Edge) */}
        <div className="absolute -right-[6px] top-36 w-[3px] h-16 bg-[#2E353F] rounded-r-sm" />

        {/* Inner Screen Bezel with Glass Specular Rim */}
        <div className="relative w-full h-full rounded-[40px] bg-[#0a0a0a] p-[2px] overflow-hidden shadow-inner flex flex-col justify-between">
          <div
            className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between transition-colors ${
              isLight && activeView === 'app'
                ? 'phone-screen-light bg-[#F8FAFC] text-slate-900'
                : isLight && activeView === 'whatsapp'
                ? 'bg-[#EFEAE2]'
                : 'bg-[#0B141A]'
            }`}
          >

            {/* ============================================================== */}
            {/* 1. STATUS BAR & DYNAMIC ISLAND */}
            {/* ============================================================== */}
            <div
              className={`w-full pt-3 px-6 pb-1 flex items-center justify-between text-[12px] font-sans z-40 shrink-0 transition-colors ${
                isLight && activeView === 'app'
                  ? 'bg-slate-50/95 text-slate-800'
                  : isLight && activeView === 'whatsapp'
                  ? 'bg-[#008069] text-white'
                  : 'bg-black/60 text-white'
              }`}
            >
              <span className="font-bold tracking-tight">09:41</span>

              {/* Dynamic Island Capsule */}
              <AnimatePresence mode="wait">
                {showDynamicIsland ? (
                  <motion.div
                    key="island-expanded"
                    initial={{ width: 68, height: 20, opacity: 0 }}
                    animate={{ width: 205, height: 28, opacity: 1 }}
                    exit={{ width: 68, height: 20, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    onClick={() =>
                      handleManualSwitchView(activeView === 'whatsapp' ? 'app' : 'whatsapp')
                    }
                    className="absolute left-1/2 -translate-x-1/2 top-1.5 bg-black border border-[#00DF8F]/60 shadow-[0_4px_18px_rgba(0,223,143,0.35)] rounded-full px-2.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00DF8F] text-[#003825] flex items-center justify-center text-[8px] font-black shrink-0">
                        ▲
                      </span>
                      <span className="text-[9px] font-bold text-white truncate">
                        {currentScenario.notificationTitle}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-[#00DF8F] font-bold shrink-0 ml-1">
                      0.8s
                    </span>
                  </motion.div>
                ) : (
                  <div
                    key="island-idle"
                    className="w-18 h-4 rounded-full bg-black border border-white/10 flex items-center justify-center relative shadow-inner"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0A1628]" />
                  </div>
                )}
              </AnimatePresence>

              {/* 5G & Battery Icons */}
              <div
                className={`flex items-center gap-1 text-[11px] font-mono font-bold ${
                  isLight && activeView === 'app' ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                <span>5G</span>
                <span className="material-symbols-outlined text-[15px]">battery_full</span>
              </div>
            </div>

            {/* ============================================================== */}
            {/* 2. MAIN ACTIVE VIEW: WHATSAPP INTERFACE <-> NATIVE APP WALLET */}
            {/* ============================================================== */}
            <div className="flex-1 w-full flex flex-col justify-between overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeView === 'whatsapp' ? (
                  /* ------------------------------------------------------------ */
                  /* SCREEN A: ACTUAL REALISTIC WHATSAPP CHAT */
                  /* ------------------------------------------------------------ */
                  <motion.div
                    key="whatsapp-view"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`flex-1 flex flex-col justify-between overflow-hidden relative ${
                      isLight ? 'bg-[#EFEAE2]' : 'bg-[#0B141A]'
                    }`}
                  >
                    {/* Authentic WhatsApp Doodle Wallpaper Pattern */}
                    <div
                      className={`absolute inset-0 pointer-events-none overflow-hidden ${
                        isLight ? 'opacity-[0.06] mix-blend-multiply' : 'opacity-[0.045] mix-blend-screen'
                      }`}
                    >
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern
                            id="wa-doodles-hd"
                            width="90"
                            height="90"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M15,20 Q15,12 25,12 L35,12 Q45,12 45,20 L45,26 Q45,34 35,34 L28,34 L20,40 L22,34 L25,34 Q15,34 15,26 Z"
                              fill="none"
                              stroke={isLight ? '#000000' : '#FFFFFF'}
                              strokeWidth="1.3"
                            />
                            <circle cx="68" cy="22" r="6" fill="none" stroke={isLight ? '#000000' : '#FFFFFF'} strokeWidth="1.3" />
                            <path d="M68,18 L68,22 L71,24" fill="none" stroke={isLight ? '#000000' : '#FFFFFF'} strokeWidth="1.3" strokeLinecap="round" />
                            <rect x="20" y="58" width="10" height="8" rx="1.5" fill="none" stroke={isLight ? '#000000' : '#FFFFFF'} strokeWidth="1.3" />
                            <path d="M22.5,58 L22.5,54 Q22.5,51 25,51 Q27.5,51 27.5,54 L27.5,58" fill="none" stroke={isLight ? '#000000' : '#FFFFFF'} strokeWidth="1.3" />
                            <path d="M65,65 L72,65 Q74,65 74,67 L74,72 Q74,74 72,74 L65,74 Z" fill="none" stroke={isLight ? '#000000' : '#FFFFFF'} strokeWidth="1.1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#wa-doodles-hd)" />
                      </svg>
                    </div>

                    {/* WhatsApp Top Chat Header */}
                    <div
                      className={`px-3 py-2 flex items-center justify-between shrink-0 shadow-md z-20 ${
                        isLight
                          ? 'bg-[#008069] text-white border-b border-[#006e5a]'
                          : 'bg-[#202C33] text-white border-b border-[#2A3942]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[18px] text-white/90">
                          arrow_back
                        </span>

                        {/* Verified Business Profile Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A884] to-[#0D95FE] flex items-center justify-center text-white font-black text-xs shadow-sm">
                            ▲
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00DF8F] border-2 border-[#008069]" />
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col min-w-0 text-left">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[12px] text-white leading-tight truncate">
                              Axoora AI Banking
                            </span>
                            <WhatsAppVerifiedBadge />
                          </div>
                          <span
                            className={`text-[9.5px] font-medium leading-none truncate ${
                              isLight ? 'text-emerald-100' : 'text-[#00A884]'
                            }`}
                          >
                            {chatStep === 'ai_typing' ? (
                              <span className="animate-pulse">typing a response...</span>
                            ) : (
                              'online · Official Account'
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2.5 text-white/90">
                        <span className="material-symbols-outlined text-[18px]">videocam</span>
                        <span className="material-symbols-outlined text-[17px]">call</span>
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </div>
                    </div>

                    {/* Chat Messages Feed */}
                    <div className="flex-1 flex flex-col justify-start gap-3 p-3 overflow-y-auto text-left relative z-10">
                      {/* Date Separator */}
                      <div className="flex justify-center my-0.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[8.5px] font-medium uppercase tracking-wider shadow-xs ${
                            isLight
                              ? 'bg-white/95 text-[#54656F] border border-slate-200/60'
                              : 'bg-[#182229] text-[#8696A0]'
                          }`}
                        >
                          TODAY
                        </span>
                      </div>

                      {/* End-to-End Encryption Notice */}
                      <div
                        className={`p-1.5 rounded-lg text-[8px] leading-tight flex items-center justify-center gap-1.5 shadow-xs text-center border ${
                          isLight
                            ? 'bg-[#FFEECD] border-[#F0E5D0] text-[#54656F]'
                            : 'bg-[#182229] border-[#222E35] text-[#FFD279]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[11px] shrink-0">lock</span>
                        <span>Messages are end-to-end encrypted · Sovereign CBN rails</span>
                      </div>

                      {/* USER OUTGOING BUBBLE */}
                      <motion.div
                        key={`user-msg-${currentScenario.id}`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className={`self-end max-w-[88%] p-2.5 rounded-2xl rounded-tr-none shadow-md flex flex-col gap-1 relative mr-1.5 ${
                          isLight
                            ? 'bg-[#D9FDD3] text-[#111B21] border border-[#C5E8BF]/60'
                            : 'bg-[#005C4B] text-[#E9EDEF] border border-[#00705B]/30'
                        }`}
                      >
                        {/* Outgoing Bubble Triangle Tail */}
                        <svg
                          className={`absolute -top-[1px] -right-[7px] w-[8px] h-[13px] pointer-events-none ${
                            isLight ? 'text-[#D9FDD3]' : 'text-[#005C4B]'
                          }`}
                          viewBox="0 0 8 13"
                          fill="currentColor"
                        >
                          <path d="M0,0 C3,1 7,4 8,8 C6,9 2,11 0,13 Z" />
                        </svg>

                        <p
                          className={`text-[12px] leading-snug font-normal ${
                            isLight ? 'text-[#111B21]' : 'text-white'
                          }`}
                        >
                          {currentScenario.userMessage}
                        </p>

                        <div
                          className={`self-end flex items-center gap-0.5 text-[8.5px] font-mono leading-none ${
                            isLight ? 'text-[#667781]' : 'text-[#99BEB7]'
                          }`}
                        >
                          <span>{currentScenario.userTime}</span>
                          <DynamicDoubleTicks isRead={chatStep !== 'user_sent'} />
                        </div>
                      </motion.div>

                      {/* INCOMING AI BUBBLE */}
                      <motion.div
                        key={`ai-msg-${currentScenario.id}`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                        className={`self-start max-w-[90%] p-2.5 rounded-2xl rounded-tl-none shadow-lg flex flex-col gap-1.5 relative ml-1.5 ${
                          isLight
                            ? 'bg-white text-[#111B21] border border-slate-200/80 shadow-slate-200/50'
                            : 'bg-[#202C33] text-[#E9EDEF] border border-[#2A3942]'
                        }`}
                      >
                        {/* Incoming Bubble Triangle Tail */}
                        <svg
                          className={`absolute -top-[1px] -left-[7px] w-[8px] h-[13px] pointer-events-none ${
                            isLight ? 'text-white' : 'text-[#202C33]'
                          }`}
                          viewBox="0 0 8 13"
                          fill="currentColor"
                        >
                          <path d="M8,0 C5,1 1,4 0,8 C2,9 6,11 8,13 Z" />
                        </svg>

                        {chatStep === 'ai_typing' ? (
                          /* Real WhatsApp 3-Dot Typing Indicator */
                          <div className="py-1 px-2 flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-sans ${
                                isLight ? 'text-slate-500' : 'text-[#8696A0]'
                              }`}
                            >
                              Axoora AI is thinking
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce [animation-delay:0.18s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce [animation-delay:0.36s]" />
                            </div>
                          </div>
                        ) : (
                          /* AI Response Body */
                          <div className="flex flex-col gap-2">
                            <p
                              className={`text-[11.5px] leading-relaxed ${
                                isLight ? 'text-[#111B21]' : 'text-[#E9EDEF]'
                              }`}
                            >
                              {currentScenario.aiReply}
                            </p>

                            {/* Verified Financial Action Badge */}
                            <div
                              className={`p-2 rounded-xl flex items-center justify-between gap-2 border ${
                                isLight
                                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                                  : 'bg-[#111B21] border-[#2A3942] text-[#00DF8F] shadow-inner'
                              }`}
                            >
                              <span className="text-[9.5px] font-mono font-bold">
                                {currentScenario.aiPill}
                              </span>
                              <span className="material-symbols-outlined text-[15px] text-[#00A884]">
                                verified
                              </span>
                            </div>

                            {/* Prompt to View in Wallet */}
                            <button
                              onClick={() => handleManualSwitchView('app')}
                              className={`w-full py-1.5 px-2.5 rounded-xl border text-[9.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                isLight
                                  ? 'bg-[#00A884] hover:bg-[#008F6F] text-white border-transparent shadow-sm'
                                  : 'bg-[#00A884]/20 hover:bg-[#00A884]/30 border-[#00A884]/40 text-[#00DF8F]'
                              }`}
                            >
                              <span>📱 Switch to App Wallet</span>
                              <span className="material-symbols-outlined text-[13px]">
                                arrow_forward
                              </span>
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Authentic WhatsApp Bottom Input Bar */}
                    <div
                      className={`p-2 flex items-center gap-1.5 shrink-0 z-20 border-t ${
                        isLight
                          ? 'bg-[#F0F2F5] border-slate-200'
                          : 'bg-[#202C33] border-[#2A3942]'
                      }`}
                    >
                      <div
                        className={`flex-1 py-1.5 px-3 rounded-full flex items-center justify-between border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-500'
                            : 'bg-[#2A3942] border-transparent text-[#8696A0]'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="material-symbols-outlined text-[18px]">
                            sentiment_satisfied
                          </span>
                          <span
                            className={`text-[10px] truncate font-sans ${
                              isLight ? 'text-slate-600' : 'text-[#D1D7DB]'
                            }`}
                          >
                            Type a message or voice note...
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[17px]">attach_file</span>
                      </div>

                      {/* Microphone / Send Button */}
                      <button
                        onClick={onOpenWhatsApp}
                        className="w-8 h-8 rounded-full bg-[#00A884] hover:bg-[#008F6F] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 shrink-0 cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[17px]">mic</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ------------------------------------------------------------ */
                  /* SCREEN B: AXOORA NATIVE APP WALLET (PERFECT LIGHT & DARK) */
                  /* ------------------------------------------------------------ */
                  <motion.div
                    key="app-view"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`phone-screen-light flex-1 flex flex-col justify-between overflow-hidden p-3 text-left transition-colors ${
                      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#020B1D] text-[#F2F5F9]'
                    }`}
                    style={isLight ? { backgroundColor: '#F8FAFC', color: '#0F172A' } : undefined}
                  >
                    {/* User Profile Header */}
                    <div className="flex items-center justify-between pt-0.5 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0D47A1] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#1976D2]/40">
                          AB
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-bold text-xs leading-tight ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                            style={isLight ? { color: '#0F172A' } : undefined}
                          >
                            Adaeze Bello
                          </span>
                          <span
                            className={`text-[9px] leading-tight ${
                              isLight ? 'text-slate-500' : 'text-[#8EA2C6]'
                            }`}
                            style={isLight ? { color: '#64748B' } : undefined}
                          >
                            Tier 3 · Unlimited NIP
                          </span>
                        </div>
                      </div>

                      {/* Live Sync Beacon */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border ${
                            isLight
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : 'bg-[#0E1D3B] border-[#1B3564] text-[#00DF8F]'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                          <span>AI Synced</span>
                        </div>
                      </div>
                    </div>

                    {/* Live WhatsApp Sync Toast Pill */}
                    <div
                      className={`py-1 px-2.5 rounded-xl border flex items-center justify-between gap-1.5 shrink-0 transition-colors ${
                        isLight
                          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900 shadow-xs'
                          : 'bg-[#081736] border-[#00DF8F]/40 text-[#C2D6F5]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-[13px] text-[#00A884] shrink-0">
                          sync
                        </span>
                        <span className="text-[9px] truncate font-medium">
                          {currentScenario.notificationTitle}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-[#00A884] shrink-0">
                        0.8s
                      </span>
                    </div>

                    {/* Available Balance Display */}
                    <div className="flex flex-col gap-0.5 pt-0.5 shrink-0">
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex items-center gap-2 text-[9px] tracking-widest font-semibold uppercase ${
                            isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                          }`}
                        >
                          <span>AVAILABLE BALANCE</span>
                          <span
                            className={`h-[1px] w-12 ${isLight ? 'bg-slate-200' : 'bg-[#1A325E]'}`}
                          />
                        </div>
                        <button
                          onClick={() => setShowBalance(!showBalance)}
                          className={`transition-colors cursor-pointer ${
                            isLight ? 'text-slate-400 hover:text-slate-900' : 'text-[#7B9CD2] hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {showBalance ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1 mt-0.5">
                        <motion.span
                          key={currentScenario.walletBalanceAfter}
                          initial={{ scale: 0.94 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className={`text-2xl font-extrabold tracking-tight leading-tight font-sans tabular-nums ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                          style={isLight ? { color: '#0F172A' } : undefined}
                        >
                          ₦
                          {showBalance
                            ? currentScenario.walletBalanceAfter.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '••••••••••'}
                        </motion.span>
                      </div>

                      <p
                        className={`text-[9px] leading-tight ${
                          isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                        }`}
                      >
                        ₦0.00 transfer fees · Synced live from WhatsApp
                      </p>
                    </div>

                    {/* Account & Axoora ID Quick Cards (FIXED: High-contrast light & dark modes) */}
                    <div className="grid grid-cols-12 gap-1.5 pt-0.5 shrink-0">
                      <div
                        onClick={() => handleCopy('account', '9012345678')}
                        className={`col-span-6 px-2.5 py-1.5 rounded-xl border flex flex-col justify-between transition-colors cursor-pointer group shadow-xs ${
                          isLight
                            ? 'bg-white border-slate-200 hover:border-[#0D95FE] text-slate-900'
                            : 'bg-[#0B1A3A] border-[#152D5E] hover:border-[#0D95FE] text-white'
                        }`}
                        style={isLight ? { backgroundColor: '#FFFFFF', color: '#0F172A', borderColor: '#E2E8F0' } : undefined}
                      >
                        <span
                          className={`text-[8px] font-mono uppercase tracking-wider font-bold ${
                            isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                          }`}
                          style={isLight ? { color: '#64748B' } : undefined}
                        >
                          ACCOUNT
                        </span>
                        <div className="flex items-center justify-between text-[11px] font-bold mt-0.5">
                          <span
                            className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}
                            style={isLight ? { color: '#0F172A', fontWeight: 800 } : undefined}
                          >
                            9012345678
                          </span>
                          <span
                            className={`material-symbols-outlined text-[12px] ${
                              isLight ? 'text-slate-400 group-hover:text-[#0D95FE]' : 'text-[#7B9CD2]'
                            }`}
                            style={isLight ? { color: '#94A3B8' } : undefined}
                          >
                            {copiedType === 'account' ? 'check' : 'content_copy'}
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => handleCopy('id', '@adaeze')}
                        className={`col-span-6 px-2.5 py-1.5 rounded-xl border flex flex-col justify-between transition-colors cursor-pointer group shadow-xs ${
                          isLight
                            ? 'bg-white border-slate-200 hover:border-[#0D95FE] text-slate-900'
                            : 'bg-[#0B1A3A] border-[#152D5E] hover:border-[#0D95FE] text-white'
                        }`}
                        style={isLight ? { backgroundColor: '#FFFFFF', color: '#0F172A', borderColor: '#E2E8F0' } : undefined}
                      >
                        <span
                          className={`text-[8px] font-mono uppercase tracking-wider font-bold ${
                            isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                          }`}
                          style={isLight ? { color: '#64748B' } : undefined}
                        >
                          AXOORA ID
                        </span>
                        <div className="flex items-center justify-between text-[11px] font-bold mt-0.5">
                          <span
                            className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}
                            style={isLight ? { color: '#0F172A', fontWeight: 800 } : undefined}
                          >
                            @adaeze
                          </span>
                          <span
                            className={`material-symbols-outlined text-[12px] ${
                              isLight ? 'text-slate-400 group-hover:text-[#0D95FE]' : 'text-[#7B9CD2]'
                            }`}
                            style={isLight ? { color: '#94A3B8' } : undefined}
                          >
                            {copiedType === 'id' ? 'check' : 'content_copy'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ask Axoora AI Bar -> Opens WhatsApp */}
                    <div
                      onClick={() => handleManualSwitchView('whatsapp')}
                      className={`w-full py-1.5 px-3 rounded-full border flex items-center justify-between shadow-xs cursor-pointer transition-colors shrink-0 ${
                        isLight
                          ? 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-900'
                          : 'bg-gradient-to-r from-[#0C244E] to-[#0A1D3F] border-[#1B3A6C] hover:border-[#00DF8F]'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[10px]">
                        <div className="w-4 h-4 rounded-md bg-[#00DF8F] flex items-center justify-center text-white text-[9px] font-black shadow-xs">
                          ▲
                        </div>
                        <span className={isLight ? 'text-emerald-900 font-medium' : 'text-[#A8BBD6]'}>
                          Ask Axoora AI on WhatsApp
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[14px] text-[#00A884]">
                        chat
                      </span>
                    </div>

                    {/* 4 Quick Action Buttons */}
                    <div className="grid grid-cols-4 gap-2 text-center pt-0.5 shrink-0">
                      {[
                        { icon: 'north_east', label: 'Send', primary: true },
                        { icon: 'bolt', label: 'Bills' },
                        { icon: 'south_west', label: 'Add' },
                        { icon: 'credit_card', label: 'Cards' },
                      ].map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => onOpenWaitlist?.('personal')}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform ${
                              btn.primary
                                ? 'bg-[#0D95FE] text-white shadow-md shadow-[#0D95FE]/20'
                                : isLight
                                ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                : 'bg-[#0E1D3B] border border-[#1A335E] text-white'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {btn.icon}
                            </span>
                          </div>
                          <span
                            className={`text-[9.5px] font-medium ${
                              isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                            }`}
                          >
                            {btn.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Recent Activity Bento */}
                    <div
                      className={`rounded-2xl border p-2.5 flex flex-col gap-1 shrink-0 shadow-xs transition-colors ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900'
                          : 'bg-[#08152F] border-[#142A58] text-white'
                      }`}
                      style={isLight ? { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' } : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9.5px] font-bold ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                          style={isLight ? { color: '#0F172A' } : undefined}
                        >
                          Latest Activity
                        </span>
                        <span
                          className={`text-[8px] font-mono font-bold flex items-center gap-1 ${
                            isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                          }`}
                          style={isLight ? { color: '#047857' } : undefined}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                          SYNCED VIA WHATSAPP
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                              isLight
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'border-[#142A58] bg-[#0A1A38] text-[#00DF8F]'
                            }`}
                            style={isLight ? { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0', color: '#047857' } : undefined}
                          >
                            <span className="material-symbols-outlined text-[13px]">
                              {currentScenario.walletTransactionCredit
                                ? 'south_west'
                                : 'north_east'}
                            </span>
                          </div>
                          <div className="flex flex-col truncate">
                            <span
                              className={`text-[10px] font-bold leading-tight truncate ${
                                isLight ? 'text-slate-900' : 'text-white'
                              }`}
                              style={isLight ? { color: '#0F172A' } : undefined}
                            >
                              {currentScenario.walletTransactionTitle}
                            </span>
                            <span
                              className={`text-[8px] leading-tight truncate ${
                                isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                              }`}
                              style={isLight ? { color: '#64748B' } : undefined}
                            >
                              {currentScenario.walletTransactionType}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold font-mono shrink-0 ml-1 ${
                            currentScenario.walletTransactionCredit
                              ? isLight
                                ? 'text-emerald-700'
                                : 'text-[#00DF8F]'
                              : isLight
                              ? 'text-slate-900'
                              : 'text-white'
                          }`}
                          style={
                            currentScenario.walletTransactionCredit
                              ? isLight ? { color: '#047857' } : undefined
                              : isLight ? { color: '#0F172A' } : undefined
                          }
                        >
                          {currentScenario.walletTransactionAmount}
                        </span>
                      </div>
                    </div>

                    {/* Return to WhatsApp AI Button */}
                    <div className="pt-0.5 shrink-0">
                      <button
                        onClick={() => handleManualSwitchView('whatsapp')}
                        className={`w-full py-1.5 px-3 rounded-xl border text-[9.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                          isLight
                            ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                            : 'bg-gradient-to-r from-[#00A884]/25 via-[#00DF8F]/20 to-[#0D95FE]/20 border-[#00A884]/50 text-[#00DF8F] hover:bg-[#00A884]/35'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">chat</span>
                        <span>← Return to Live WhatsApp AI Assistant</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom iOS Home Indicator */}
            <div
              className={`w-full flex items-center justify-center pt-1 pb-1.5 shrink-0 z-30 transition-colors ${
                isLight && activeView === 'app'
                  ? 'bg-[#F8FAFC]'
                  : isLight && activeView === 'whatsapp'
                  ? 'bg-[#F0F2F5]'
                  : 'bg-[#111B21]'
              }`}
            >
              <div
                className={`w-24 h-1 rounded-full ${
                  isLight ? 'bg-slate-400' : 'bg-white/35'
                }`}
              />
            </div>

          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* BOTTOM SCENARIO PILLS (Interactive Human Life Moments) */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-center gap-2 mt-3 z-30 flex-wrap">
        {HUMAN_SCENARIOS.map((sc, idx) => {
          const isActive = scenarioIndex === idx;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#00DF8F] text-[#003825] border-[#00DF8F] shadow-md shadow-[#00DF8F]/25 font-bold scale-102'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:text-white'
              }`}
            >
              <span>{sc.pillEmoji}</span>
              <span>{sc.pillLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
