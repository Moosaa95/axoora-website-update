'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealisticPhoneMockupProps {
  isLight?: boolean;
  onOpenWaitlist?: (interest?: 'personal') => void;
  onOpenWhatsApp?: () => void;
  defaultView?: 'whatsapp' | 'app';
  autoPlay?: boolean;
}

type PhoneViewMode = 'whatsapp' | 'app';
type ScenarioKey = 'transfer' | 'card' | 'savings' | 'paycircle';

interface ChatScenario {
  id: ScenarioKey;
  label: string;
  icon: string;
  commandSnippet: string;
  userMessage: string;
  time: string;
  aiIntro: string;
  badge: string;
  badgeColor: string;
  cardTitle: string;
  cardDetails: Array<{ label: string; value: string; highlight?: boolean }>;
  statusText: string;
  notificationText: string;
  syncPillText: string;
  appRecentItem: {
    name: string;
    type: string;
    amount: string;
    isCredit?: boolean;
    time: string;
  };
  balanceBefore: number;
  balanceAfter: number;
}

const SCENARIOS: ChatScenario[] = [
  {
    id: 'transfer',
    label: 'Send ₦15k to Musa',
    icon: 'north_east',
    commandSnippet: 'send ₦15k to Musa',
    userMessage: 'Axoora send ₦15,000 to Musa for lunch from main account',
    time: '09:41',
    aiIntro: 'Transfer confirmed on NIBSS Instant rails. Zero fees:',
    badge: 'NIP Instant (0s)',
    badgeColor: '#00DF8F',
    cardTitle: 'Transfer to Musa Ibrahim',
    cardDetails: [
      { label: 'Recipient', value: 'Musa Ibrahim' },
      { label: 'Bank', value: 'Kuda Bank · 2098411234' },
      { label: 'Amount', value: '₦15,000.00', highlight: true },
      { label: 'Transfer Fee', value: '₦0.00 (Zero Fee)' },
    ],
    statusText: 'Authorized & Settled in 0.8s',
    notificationText: '₦15,000 sent to Musa Ibrahim · ₦0 fee · Bal: ₦97,430.00',
    syncPillText: '₦15,000 Transfer Sent to Musa · 0s NIP Settlement',
    appRecentItem: {
      name: 'Musa Ibrahim',
      type: 'Transfer sent · 09:41',
      amount: '– ₦15,000.00',
      isCredit: false,
      time: '09:41',
    },
    balanceBefore: 112430.0,
    balanceAfter: 97430.0,
  },
  {
    id: 'card',
    label: 'Create $50 Card',
    icon: 'credit_card',
    commandSnippet: 'create $50 card',
    userMessage: 'Create a virtual dollar card with $50 for my OpenAI sub',
    time: '09:42',
    aiIntro: 'Axoora Virtual Dollar Mastercard generated instantly:',
    badge: 'Mastercard Active',
    badgeColor: '#0D95FE',
    cardTitle: 'Axoora Virtual Dollar (USD)',
    cardDetails: [
      { label: 'Card Number', value: '4111 •••• •••• 9204' },
      { label: 'Funded Amount', value: '$50.00 (₦74,250)', highlight: true },
      { label: 'Expiry / CVV', value: '10/29 · 382' },
      { label: 'Security', value: '3D Secure OTP Enabled' },
    ],
    statusText: 'Instant Issuance Verified',
    notificationText: 'Virtual USD Card created with $50.00 · Ready for international checkouts',
    syncPillText: '$50.00 Virtual Card Issued & Funded',
    appRecentItem: {
      name: 'Virtual Dollar Card',
      type: 'Card funded · 09:42',
      amount: '– ₦74,250.00 ($50)',
      isCredit: false,
      time: '09:42',
    },
    balanceBefore: 97430.0,
    balanceAfter: 23180.0,
  },
  {
    id: 'savings',
    label: 'Halal Save & Earn',
    icon: 'savings',
    commandSnippet: 'lock ₦30k in Halal Vault',
    userMessage: 'Check my Save & Earn balance and lock ₦30,000 in Halal Vault',
    time: '09:43',
    aiIntro: 'Non-interest custody locked under Mudarabah trade pool:',
    badge: '0% Riba (Islamic)',
    badgeColor: '#F2A93B',
    cardTitle: 'Mudarabah Halal Vault',
    cardDetails: [
      { label: 'Locked Amount', value: '₦30,000.00', highlight: true },
      { label: 'Expected Return', value: '+₦2,850.00 profit share' },
      { label: 'Ethical Principle', value: '100% Tangible Asset Trade' },
      { label: 'Vault Total', value: '₦115,000.00' },
    ],
    statusText: '100% Non-Interest Custody',
    notificationText: '₦30,000 locked in Halal Vault · 0% Riba · Total Vault: ₦115,000.00',
    syncPillText: '₦30,000 Locked in 0% Riba Halal Vault',
    appRecentItem: {
      name: 'Halal Mudarabah Vault',
      type: 'Locked in savings · 09:43',
      amount: '– ₦30,000.00',
      isCredit: false,
      time: '09:43',
    },
    balanceBefore: 112430.0,
    balanceAfter: 82430.0,
  },
  {
    id: 'paycircle',
    label: 'Paycircle Split',
    icon: 'groups',
    commandSnippet: 'split ajo contribution',
    userMessage: "Split Friday's market contribution with Chidinma and group",
    time: '09:44',
    aiIntro: 'Paycircle split active for 4 members (₦10,000 each):',
    badge: 'Digital Ajo / Esusu',
    badgeColor: '#A855F7',
    cardTitle: 'Maitama Traders Paycircle',
    cardDetails: [
      { label: 'Target Pool', value: '₦40,000.00 (₦10k each)' },
      { label: 'Current Status', value: '2 of 4 Paid (₦20,000)', highlight: true },
      { label: 'Next Payout', value: 'Friday, Oct 18 · Chidinma' },
      { label: 'WhatsApp Bot', value: 'Automated payment alerts' },
    ],
    statusText: 'Automated Circle Reminders Dispatched',
    notificationText: 'Paycircle: 2 members paid ₦20,000. Next payout scheduled Friday.',
    syncPillText: 'Paycircle Inflow: +₦20,000 Received from Group',
    appRecentItem: {
      name: 'Paycircle Inflow',
      type: 'Ajo contribution · 09:44',
      amount: '+ ₦20,000.00',
      isCredit: true,
      time: '09:44',
    },
    balanceBefore: 82430.0,
    balanceAfter: 102430.0,
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
      d="M9 12.3L11.2 14.5L15.5 9.8"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Pixel-perfect official WhatsApp double blue ticks
const DoubleBlueTicks = () => (
  <span className="inline-flex items-center text-[#53BDEB] font-bold text-[10px] leading-none ml-1 select-none">
    <svg width="14" height="9" viewBox="0 0 16 10" fill="none" className="shrink-0">
      <path
        d="M1 5.8L4.2 9L11.5 1.5"
        stroke="#53BDEB"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 5.8L8.7 9L16 1.5"
        stroke="#53BDEB"
        strokeWidth="1.7"
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
  defaultView = 'whatsapp',
  autoPlay = true,
}) => {
  const [activeView, setActiveView] = useState<PhoneViewMode>(defaultView);
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [aiState, setAiState] = useState<'typing' | 'replied'>('replied');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(autoPlay);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [copiedType, setCopiedType] = useState<'account' | 'id' | null>(null);

  const currentScenario = SCENARIOS[scenarioIndex];

  // ---------------------------------------------------------------------------
  // SMART CHOREOGRAPHY ENGINE:
  // Cycles from WhatsApp interaction -> Instant reasoning -> Dynamic notification ->
  // Flips smoothly to App Wallet to show the real-time balance & ledger change!
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isAutoPlaying) return;

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;
    let timeout4: NodeJS.Timeout;
    let timeout5: NodeJS.Timeout;

    // Start with WhatsApp View
    setActiveView('whatsapp');
    setAiState('typing');
    setShowNotification(false);

    // Step 1: AI responds in WhatsApp after 900ms
    timeout1 = setTimeout(() => {
      setAiState('replied');
    }, 900);

    // Step 2: Dynamic notification arrives at 2800ms
    timeout2 = setTimeout(() => {
      setShowNotification(true);
    }, 2800);

    // Step 3: Notification closes and screen switches smoothly to App Wallet at 4400ms
    timeout3 = setTimeout(() => {
      setShowNotification(false);
      setActiveView('app');
    }, 4400);

    // Step 4: After observing App Wallet for 4.2 seconds, advance scenario & return to WhatsApp
    timeout4 = setTimeout(() => {
      setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 8800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
    };
  }, [scenarioIndex, isAutoPlaying]);

  const handleSelectScenario = (index: number) => {
    setScenarioIndex(index);
    setActiveView('whatsapp');
    setAiState('typing');
    setShowNotification(false);

    setTimeout(() => {
      setAiState('replied');
    }, 700);

    setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 2500);
  };

  const handleManualSwitchView = (view: PhoneViewMode) => {
    setActiveView(view);
    // User interacted manually, temporarily halt auto-cycling so they can explore
    setIsAutoPlaying(false);
  };

  const handleCopy = (type: 'account' | 'id', text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="relative w-full max-w-[370px] mx-auto flex flex-col items-center select-none py-2">
      {/* Ambient Multi-Hue Specular Glow Behind Phone */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#00DF8F]/25 via-[#0D95FE]/20 to-[#F2A93B]/15 rounded-full blur-[75px] pointer-events-none" />

      {/* Floating Interactive Badge (Top Left) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className={`absolute -left-6 sm:-left-12 top-14 z-40 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-2 hidden xs:flex ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-[#020F2E]/95 border-[#00DF8F]/40 text-[#F2F5F9]'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-ping" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-black text-[#00DF8F] flex items-center gap-1">
            <span>WhatsApp AI Banking</span>
            <WhatsAppVerifiedBadge />
          </span>
          <span className="text-[9px] opacity-75">Live Conversational Engine</span>
        </div>
      </motion.div>

      {/* Floating Regulatory Badge (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className={`absolute -right-6 sm:-right-10 bottom-24 z-40 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-2 hidden xs:flex ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-[#020F2E]/95 border-[#0D95FE]/40 text-[#F2F5F9]'
        }`}
      >
        <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">verified</span>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-black text-[#0D95FE]">Zero Transfer Fees</span>
          <span className="text-[9px] opacity-75">Sub-2s NIP Settlement</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* THE SMARTPHONE HARDWARE CHASSIS (TITANIUM GOLD / BRONZE BEZEL) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[310px] sm:w-[335px] rounded-[52px] p-[5px] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.7)] select-none transition-transform hover:-translate-y-1 duration-300"
        style={{
          background:
            'linear-gradient(135deg, #DEAA79 0%, #C38A56 25%, #8B592A 50%, #C38A56 75%, #ECC093 100%)',
        }}
      >
        {/* Hardware Chamfer Buttons */}
        <div className="absolute -right-[3px] top-[140px] w-[3px] h-[36px] bg-[#9D6837] rounded-r-sm" />
        <div className="absolute -right-[3px] top-[188px] w-[3px] h-[48px] bg-[#9D6837] rounded-r-sm" />
        <div className="absolute -left-[3px] top-[150px] w-[3px] h-[30px] bg-[#9D6837] rounded-l-sm" />

        {/* Thin inner black bezel */}
        <div className="w-full h-full rounded-[47px] p-[5px] bg-[#000000]">
          {/* THE SCREEN DISPLAY (Fixed viewport, zero accidental scroll) */}
          <div className="dark-hardware preserve-dark w-full h-[630px] sm:h-[655px] rounded-[42px] bg-[#0B141A] text-[#E9EDEF] font-sans overflow-hidden relative flex flex-col justify-between shadow-inner">

            {/* ----------------------------------------------------------------- */}
            {/* 1. TOP HARDWARE STATUS BAR & EXPANDING DYNAMIC ISLAND */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full pt-1 pb-1 px-4 flex items-center justify-between text-xs z-30 shrink-0 bg-[#202C33] border-b border-white/5 relative">
              <span className="font-bold text-[12px] tracking-tight text-white font-sans">
                09:41
              </span>

              {/* Centered Dynamic Island Pill */}
              <AnimatePresence mode="wait">
                {showNotification ? (
                  <motion.div
                    key="dynamic-island-expanded"
                    initial={{ width: 70, height: 18, opacity: 0 }}
                    animate={{ width: 200, height: 26, opacity: 1 }}
                    exit={{ width: 70, height: 18, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    onClick={() => handleManualSwitchView('app')}
                    className="absolute left-1/2 -translate-x-1/2 top-1 z-50 bg-black/95 border border-[#00DF8F]/70 shadow-[0_6px_20px_rgba(0,223,143,0.35)] rounded-full px-2.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00DF8F] text-[#003825] flex items-center justify-center text-[8px] font-black shrink-0">
                        ▲
                      </span>
                      <span className="text-[8.5px] font-bold text-white truncate">
                        {currentScenario.syncPillText}
                      </span>
                    </div>
                    <span className="text-[7.5px] font-mono text-[#00DF8F] font-bold shrink-0 ml-1">
                      0.8s
                    </span>
                  </motion.div>
                ) : (
                  <div
                    key="dynamic-island-idle"
                    className="w-16 h-3.5 rounded-full bg-black border border-neutral-700/80 flex items-center justify-center relative shadow-inner"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0a1a36]" />
                  </div>
                )}
              </AnimatePresence>

              {/* 5G & Battery Indicators */}
              <div className="flex items-center gap-1.5 text-white/90">
                <div className="flex items-center gap-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                </div>
                <span className="text-[10px] font-mono font-bold">5G</span>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 3. DYNAMIC APP SWITCHER CAPSULE + AUTO-DEMO INDICATOR */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full flex items-center justify-between py-1.5 px-3 z-20 shrink-0 bg-[#111B21] border-b border-[#202C33]">
              {/* Segmented Control */}
              <div className="p-0.5 rounded-full bg-[#202C33] border border-[#2A3942] flex items-center gap-1 shadow-sm">
                <button
                  onClick={() => handleManualSwitchView('whatsapp')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'whatsapp'
                      ? 'bg-[#00A884] text-white shadow-sm'
                      : 'text-[#8696A0] hover:text-white'
                  }`}
                  title="Switch to WhatsApp AI View"
                >
                  <span className="material-symbols-outlined text-[13px]">chat</span>
                  <span>WhatsApp AI</span>
                  {activeView === 'whatsapp' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => handleManualSwitchView('app')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeView === 'app'
                      ? 'bg-[#0D95FE] text-white shadow-sm'
                      : 'text-[#8696A0] hover:text-white'
                  }`}
                  title="Switch to App Wallet View"
                >
                  <span className="material-symbols-outlined text-[13px]">account_balance_wallet</span>
                  <span>App Wallet</span>
                  {activeView === 'app' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              </div>

              {/* Auto-Play Toggle Pill */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-2 py-0.5 rounded-md text-[8.5px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/40'
                    : 'bg-[#202C33] text-[#8696A0] hover:text-white border border-[#2A3942]'
                }`}
                title={isAutoPlaying ? 'Click to pause auto-cycle' : 'Click to resume auto-cycle'}
              >
                <span className="material-symbols-outlined text-[11px]">
                  {isAutoPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span>{isAutoPlaying ? 'Auto-Demo' : 'Paused'}</span>
              </button>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 4. MAIN SCREEN DISPLAY: WHATSAPP INTERFACE <-> APP WALLET */}
            {/* ----------------------------------------------------------------- */}
            <div className="flex-1 w-full flex flex-col justify-between overflow-hidden relative">
              <AnimatePresence mode="wait">
                {/* ============================================================== */}
                {/* 4A. ACTUAL WHATSAPP INTERFACE (100% REALISTIC DARK MODE) */}
                {/* ============================================================== */}
                {activeView === 'whatsapp' ? (
                  <motion.div
                    key="whatsapp-view"
                    initial={{ opacity: 0, x: -20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex-1 flex flex-col justify-between overflow-hidden relative bg-[#0B141A]"
                  >
                    {/* Authentic WhatsApp Doodle Wallpaper Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen overflow-hidden">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern
                            id="wa-doodles"
                            width="90"
                            height="90"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M15,20 Q15,12 25,12 L35,12 Q45,12 45,20 L45,26 Q45,34 35,34 L28,34 L20,40 L22,34 L25,34 Q15,34 15,26 Z"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="1.3"
                            />
                            <circle cx="68" cy="22" r="6" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
                            <path d="M68,18 L68,22 L71,24" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
                            <rect x="20" y="58" width="10" height="8" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
                            <path d="M22.5,58 L22.5,54 Q22.5,51 25,51 Q27.5,51 27.5,54 L27.5,58" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
                            <path d="M65,65 L72,65 Q74,65 74,67 L74,72 Q74,74 72,74 L65,74 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#wa-doodles)" />
                      </svg>
                    </div>

                    {/* WhatsApp Top Navigation Bar */}
                    <div className="px-3 py-2 bg-[#202C33] text-white flex items-center justify-between shrink-0 shadow-md border-b border-[#2A3942] z-10">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Back Arrow */}
                        <span className="material-symbols-outlined text-[17px] text-[#A8BBD6] cursor-pointer">
                          arrow_back
                        </span>

                        {/* Verified Business Profile Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A884] via-[#008069] to-[#0D95FE] flex items-center justify-center text-white font-black text-xs shadow-sm">
                            ▲
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00A884] border-2 border-[#202C33]" />
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col min-w-0 text-left">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[12px] text-[#E9EDEF] leading-tight truncate">
                              Axoora AI Banking
                            </span>
                            <WhatsAppVerifiedBadge />
                          </div>
                          <span className="text-[9px] text-[#00A884] font-medium leading-none truncate">
                            {aiState === 'typing' ? 'typing a response...' : 'online · Official Account'}
                          </span>
                        </div>
                      </div>

                      {/* Video / Call Action Icons */}
                      <div className="flex items-center gap-2.5 text-[#A8BBD6]">
                        <button
                          onClick={onOpenWhatsApp}
                          className="hover:text-white transition-colors cursor-pointer"
                          title="WhatsApp Video Call"
                        >
                          <span className="material-symbols-outlined text-[17px]">videocam</span>
                        </button>
                        <button
                          onClick={onOpenWhatsApp}
                          className="hover:text-white transition-colors cursor-pointer"
                          title="WhatsApp Audio Call"
                        >
                          <span className="material-symbols-outlined text-[16px]">call</span>
                        </button>
                        <span className="material-symbols-outlined text-[17px] text-[#8696A0]">
                          more_vert
                        </span>
                      </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 flex flex-col justify-start gap-2.5 px-3 py-2 overflow-y-auto text-left relative z-10">
                      {/* WhatsApp Date Bubble */}
                      <div className="flex justify-center my-0.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[8.5px] font-medium bg-[#182229] text-[#8696A0] uppercase tracking-wider shadow-sm">
                          TODAY
                        </span>
                      </div>

                      {/* WhatsApp End-to-End Encryption Banner */}
                      <div className="p-2 rounded-lg bg-[#182229] border border-[#222E35] text-[#FFD279] text-[8.5px] leading-tight flex items-start gap-1.5 shadow-sm text-center justify-center">
                        <span className="material-symbols-outlined text-[12px] text-[#FFD279] shrink-0">
                          lock
                        </span>
                        <span>
                          Messages are end-to-end encrypted. No one outside of this chat can read them.
                        </span>
                      </div>

                      {/* OUTGOING USER BUBBLE (#005C4B with authentic tail) */}
                      <motion.div
                        key={`msg-user-${currentScenario.id}`}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="self-end max-w-[88%] p-2 rounded-xl rounded-tr-none bg-[#005C4B] text-[#E9EDEF] shadow-md border border-[#00705B]/30 flex flex-col gap-1 relative mr-1"
                      >
                        {/* SVG Outgoing Bubble Tail */}
                        <svg
                          className="absolute -top-[1px] -right-[7px] w-[8px] h-[13px] text-[#005C4B] pointer-events-none"
                          viewBox="0 0 8 13"
                          fill="currentColor"
                        >
                          <path d="M0,0 C3,1 7,4 8,8 C6,9 2,11 0,13 Z" />
                        </svg>

                        <p className="text-[11.5px] leading-relaxed font-normal">
                          {currentScenario.userMessage}
                        </p>
                        <div className="flex items-center justify-end gap-1 text-[8.5px] font-mono text-emerald-200/80 leading-none">
                          <span>{currentScenario.time}</span>
                          <DoubleBlueTicks />
                        </div>
                      </motion.div>

                      {/* INCOMING AXOORA AI BUBBLE (#202C33 with authentic tail) */}
                      <motion.div
                        key={`msg-ai-${currentScenario.id}`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="self-start max-w-[94%] flex flex-col gap-1.5 relative ml-1"
                      >
                        {/* SVG Incoming Bubble Tail */}
                        <svg
                          className="absolute -top-[1px] -left-[7px] w-[8px] h-[13px] text-[#202C33] pointer-events-none"
                          viewBox="0 0 8 13"
                          fill="currentColor"
                        >
                          <path d="M8,0 C5,1 1,4 0,8 C2,9 6,11 8,13 Z" />
                        </svg>

                        {aiState === 'typing' ? (
                          <div className="p-2.5 rounded-xl rounded-tl-none bg-[#202C33] text-[#8696A0] text-[10px] flex items-center gap-2 shadow-md border border-[#2A3942]">
                            <span className="font-sans font-medium text-[#D1D7DB]">Axoora AI is typing</span>
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl rounded-tl-none bg-[#202C33] text-[#E9EDEF] shadow-lg border border-[#2A3942] flex flex-col gap-2">
                            {/* AI Intro Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-[#00A884]">
                                  Axoora AI Assistant
                                </span>
                              </div>
                              <span
                                className="px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold"
                                style={{
                                  backgroundColor: `${currentScenario.badgeColor}25`,
                                  color: currentScenario.badgeColor,
                                }}
                              >
                                {currentScenario.badge}
                              </span>
                            </div>

                            <p className="text-[11px] leading-snug text-[#D1D7DB]">
                              {currentScenario.aiIntro}
                            </p>

                            {/* Embedded WhatsApp Interactive Action Card */}
                            <div className="p-2 rounded-lg bg-[#111B21] border border-[#2A3942] flex flex-col gap-1.5">
                              <div className="flex items-center justify-between border-b border-[#202C33] pb-1">
                                <span className="text-[11px] font-black text-white">
                                  {currentScenario.cardTitle}
                                </span>
                                <span className="text-[7.5px] font-mono text-[#00A884] font-bold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-pulse" />
                                  SETTLED
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                                {currentScenario.cardDetails.map((item, idx) => (
                                  <div key={idx} className="flex flex-col">
                                    <span className="text-[7.5px] font-mono text-[#8696A0] uppercase">
                                      {item.label}
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        item.highlight
                                          ? 'text-[#00DF8F] font-mono font-bold text-[10px]'
                                          : 'text-white'
                                      }`}
                                    >
                                      {item.value}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* WhatsApp Interactive Button to View in App */}
                              <button
                                onClick={() => handleManualSwitchView('app')}
                                className="w-full py-1.5 px-2 mt-1 rounded bg-[#202C33] hover:bg-[#2A3942] text-[#00A884] border border-[#00A884]/40 text-[9.5px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <span>📱 View Updated Balance in App</span>
                                <span className="material-symbols-outlined text-[13px]">
                                  arrow_forward
                                </span>
                              </button>
                            </div>

                            {/* Message Timestamp */}
                            <div className="flex items-center justify-between text-[8px] text-[#8696A0]">
                              <span>{currentScenario.statusText}</span>
                              <span className="font-mono text-[7.5px]">
                                {currentScenario.time}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* 4 INTERACTIVE QUICK-PROMPT CHIPS */}
                    <div className="px-2 pt-1 pb-1 bg-[#111B21] border-t border-[#202C33] flex flex-col gap-1 z-10 shrink-0">
                      <div className="flex items-center justify-between text-[8.5px] px-1 text-[#8696A0]">
                        <span className="font-mono uppercase font-bold flex items-center gap-1 text-[#00A884]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A884]" />
                          Try WhatsApp AI Commands:
                        </span>
                        <span>Tap to run</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        {SCENARIOS.map((sc, idx) => {
                          const isActive = scenarioIndex === idx;
                          return (
                            <button
                              key={sc.id}
                              onClick={() => handleSelectScenario(idx)}
                              className={`p-1.5 rounded-lg border text-left text-[9px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#202C33] border-[#00A884] text-white shadow-sm'
                                  : 'bg-[#182229] border-[#222E35] text-[#8696A0] hover:text-white hover:border-[#2A3942]'
                              }`}
                            >
                              <span
                                className="material-symbols-outlined text-[13px] shrink-0"
                                style={{ color: sc.badgeColor }}
                              >
                                {sc.icon}
                              </span>
                              <span className="truncate">{sc.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* WHATSAPP BOTTOM INPUT BAR */}
                    <div className="p-2 bg-[#202C33] flex items-center gap-1.5 shrink-0 z-10 border-t border-[#2A3942]">
                      <div className="flex-1 py-1.5 px-3 rounded-full bg-[#2A3942] flex items-center justify-between gap-1 text-[#8696A0]">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="material-symbols-outlined text-[17px] cursor-pointer hover:text-white">
                            sentiment_satisfied
                          </span>
                          <span className="text-[10.5px] text-[#D1D7DB] truncate font-sans">
                            Type a banking command...
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-white">
                          attach_file
                        </span>
                      </div>

                      {/* WhatsApp Emerald Send/Mic Button */}
                      <button
                        onClick={onOpenWhatsApp}
                        className="w-8 h-8 rounded-full bg-[#00A884] hover:bg-[#008F6F] text-white flex items-center justify-center font-bold shadow-md cursor-pointer transition-transform hover:scale-105 shrink-0"
                        title="Chat with Real Axoora Desk on WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          send
                        </span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ============================================================== */
                  /* 4B. AXOORA APP WALLET VIEW (SYNCED IN REAL-TIME WITH AI CHAT) */
                  /* ============================================================== */
                  <motion.div
                    key="app-view"
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex-1 flex flex-col justify-between overflow-hidden p-3 bg-[#020B1D] text-[#F2F5F9] text-left"
                  >
                    {/* USER PROFILE HEADER ROW */}
                    <div className="flex items-center justify-between pt-0.5 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#0D47A1] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#1976D2]/40">
                          AB
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-white leading-tight">
                            Adaeze
                          </span>
                          <span className="text-[9px] text-[#8EA2C6] leading-tight">
                            Tier 3 · no daily cap
                          </span>
                        </div>
                      </div>

                      {/* Live Sync Badge & Bell */}
                      <div className="flex items-center gap-1.5">
                        <div className="px-2 py-0.5 rounded-full bg-[#0E1D3B] border border-[#1B3564] text-[#00DF8F] text-[9.5px] font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                          <span>AI Synced</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#0E1D3B] border border-[#1B3564] flex items-center justify-center text-[#7B9CD2]">
                          <span className="material-symbols-outlined text-[14px]">notifications</span>
                        </div>
                      </div>
                    </div>

                    {/* LIVE SYNC STATUS PILL */}
                    <div className="py-1 px-2.5 rounded-xl bg-[#081736] border border-[#00DF8F]/40 flex items-center justify-between gap-1.5 shrink-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-[13px] text-[#00DF8F] shrink-0">
                          sync
                        </span>
                        <span className="text-[9px] text-[#C2D6F5] truncate font-medium">
                          {currentScenario.syncPillText}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-[#00DF8F] font-bold shrink-0">
                        0.8s
                      </span>
                    </div>

                    {/* AVAILABLE BALANCE ROW (DYNAMICALLY UPDATED) */}
                    <div className="flex flex-col gap-0.5 pt-0.5 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#7B9CD2] font-semibold uppercase">
                          <span>AVAILABLE BALANCE</span>
                          <span className="h-[1px] w-12 bg-[#1A325E]" />
                        </div>
                        <button
                          onClick={() => setShowBalance(!showBalance)}
                          className="text-[#7B9CD2] hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {showBalance ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1 mt-0.5">
                        <motion.span
                          key={currentScenario.balanceAfter}
                          initial={{ scale: 0.94, color: '#00DF8F' }}
                          animate={{ scale: 1, color: '#FFFFFF' }}
                          transition={{ duration: 0.4 }}
                          className="text-2xl font-extrabold tracking-tight leading-tight font-sans"
                        >
                          ₦
                          {showBalance
                            ? currentScenario.balanceAfter.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '••••••••••'}
                        </motion.span>
                      </div>

                      <p className="text-[9px] text-[#7B9CD2] leading-tight">
                        No daily cap · Reflected from WhatsApp command
                      </p>
                    </div>

                    {/* ACCOUNT NUMBER & AXOORA ID QUICK CARDS */}
                    <div className="grid grid-cols-12 gap-1.5 pt-0.5 shrink-0">
                      <div
                        onClick={() => handleCopy('account', '9012345678')}
                        className="col-span-6 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
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

                      <div
                        onClick={() => handleCopy('id', '@adaeze')}
                        className="col-span-6 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
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
                    </div>

                    {/* ASK AXOORA AI PROMPT BAR -> CLICKING OPENS WHATSAPP AI */}
                    <div
                      onClick={() => handleManualSwitchView('whatsapp')}
                      className="w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-[#0C244E] to-[#0A1D3F] border border-[#1B3A6C] hover:border-[#00DF8F] flex items-center justify-between shadow-sm cursor-pointer transition-colors shrink-0"
                    >
                      <div className="flex items-center gap-2 text-[10px]">
                        <div className="w-4 h-4 rounded-md bg-[#00DF8F] flex items-center justify-center text-[#003825] text-[9px] font-black">
                          ▲
                        </div>
                        <span className="text-[#A8BBD6]">
                          Ask Axoora AI — <span className="text-white font-medium">"{currentScenario.commandSnippet}"</span>
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[14px] text-[#00DF8F]">
                        chat
                      </span>
                    </div>

                    {/* 4 QUICK ACTION BUTTONS */}
                    <div className="grid grid-cols-4 gap-2 text-center pt-0.5 shrink-0">
                      <button
                        onClick={() => onOpenWaitlist?.('personal')}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-2xl bg-[#0D95FE] text-[#00284D] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[17px]">
                            north_east
                          </span>
                        </div>
                        <span className="text-[9.5px] font-bold text-white">Send</span>
                      </button>

                      <button
                        onClick={() => onOpenWaitlist?.('personal')}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[16px] text-[#A8BBD6]">
                            bolt
                          </span>
                        </div>
                        <span className="text-[9.5px] font-medium text-[#A8BBD6]">Bills</span>
                      </button>

                      <button
                        onClick={() => onOpenWaitlist?.('personal')}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[16px] text-[#A8BBD6]">
                            south_west
                          </span>
                        </div>
                        <span className="text-[9.5px] font-medium text-[#A8BBD6]">Add</span>
                      </button>

                      <button
                        onClick={() => onOpenWaitlist?.('personal')}
                        className="flex flex-col items-center gap-1 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[16px] text-[#A8BBD6]">
                            credit_card
                          </span>
                        </div>
                        <span className="text-[9.5px] font-medium text-[#A8BBD6]">Cards</span>
                      </button>
                    </div>

                    {/* BOTTOM BENTO: RECENT TRANSACTION POWERED BY WHATSAPP AI */}
                    <div className="rounded-2xl bg-[#08152F] border border-[#142A58] p-2 flex flex-col gap-1 shrink-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-bold text-white">Latest Activity</span>
                        <span className="text-[8px] font-mono text-[#00DF8F] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                          VIA WHATSAPP
                        </span>
                      </div>

                      {/* Dynamic Recent Item Synchronized with Current Scenario */}
                      <div className="flex items-center justify-between py-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-[#0A1A38] border border-[#142A58] flex items-center justify-center text-[#00DF8F] shrink-0">
                            <span className="material-symbols-outlined text-[13px]">
                              {currentScenario.appRecentItem.isCredit ? 'south_west' : 'north_east'}
                            </span>
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-[10px] font-bold text-white leading-tight truncate">
                              {currentScenario.appRecentItem.name}
                            </span>
                            <span className="text-[8px] text-[#7B9CD2] leading-tight truncate">
                              {currentScenario.appRecentItem.type}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold font-mono shrink-0 ml-1 ${
                            currentScenario.appRecentItem.isCredit
                              ? 'text-[#00DF8F]'
                              : 'text-white'
                          }`}
                        >
                          {currentScenario.appRecentItem.amount}
                        </span>
                      </div>
                    </div>

                    {/* Return to WhatsApp AI Banner */}
                    <div className="pt-0.5 shrink-0">
                      <button
                        onClick={() => handleManualSwitchView('whatsapp')}
                        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#00A884]/25 via-[#00DF8F]/20 to-[#0D95FE]/20 border border-[#00A884]/50 text-[#00DF8F] text-[9.5px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#00A884]/35 transition-all cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[13px]">chat</span>
                        <span>← Return to Live WhatsApp AI Assistant</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 5. BOTTOM HOME GESTURE INDICATOR BAR */}
            {/* ----------------------------------------------------------------- */}
            <div className="w-full flex items-center justify-center pt-1 pb-1 shrink-0 bg-[#111B21] z-20">
              <div className="w-24 h-1 rounded-full bg-white/35" />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
