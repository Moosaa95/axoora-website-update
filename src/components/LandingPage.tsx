'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType, BankAccount } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';

interface LandingPageProps {
  account?: BankAccount;
  onNavigate?: (screen: ScreenType) => void;
  onOpenOnboarding?: () => void;
  onOpenTransfer?: () => void;
  onOpenLogin?: () => void;
}

type CardType = 'physical' | 'virtual';
type CardFinish = 'obsidian' | 'emerald' | 'cyan' | 'platinum';

export const LandingPage: React.FC<LandingPageProps> = ({
  account = {
    accountNumber: '0284918204',
    bankName: 'Wema Bank (Axoora Rail)',
    balance: 482450.8,
    currency: 'NGN',
    tier: 'Tier 3 (Verified Merchant)',
    dailyLimit: 25000000,
    dailySpent: 3410200,
  },
  onNavigate = () => {},
  onOpenOnboarding = () => {},
  onOpenTransfer = () => {},
  onOpenLogin = () => {},
}) => {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState<string>('Personal');

  // Hero Pixel Mockup States
  const [heroBalance, setHeroBalance] = useState<number>(account.balance);
  const [showLiveIncoming, setShowLiveIncoming] = useState<boolean>(true);
  const [isIncomingSettled, setIsIncomingSettled] = useState<boolean>(false);

  // Scrollytelling Pinned Stage States
  const scrollyContainerRef = useRef<HTMLDivElement>(null);
  const [scrollyStep, setScrollyStep] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(45);
  const [stepApproved, setStepApproved] = useState<Record<number, boolean>>({});

  // 3D Card Interactive Switcher States (Revolut Style)
  const [cardType, setCardType] = useState<CardType>('physical');
  const [cardFinish, setCardFinish] = useState<CardFinish>('obsidian');
  const [spendingLimit, setSpendingLimit] = useState<number>(3420);
  const [isInternationalEnabled, setIsInternationalEnabled] = useState<boolean>(true);
  const [isAtmEnabled, setIsAtmEnabled] = useState<boolean>(true);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [copiedPan, setCopiedPan] = useState<boolean>(false);
  const [cvv, setCvv] = useState<string>('824');
  const [cvvTimer, setCvvTimer] = useState<number>(54);

  // Mouse Parallax for 3D Card
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number; sheenX: number; sheenY: number }>({
    x: 0,
    y: 0,
    sheenX: 50,
    sheenY: 50,
  });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const cardStageRef = useRef<HTMLDivElement>(null);

  // Rolling CVV countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCvvTimer((prev) => {
        if (prev <= 1) {
          setCvv(Math.floor(100 + Math.random() * 900).toString());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio waveform pulse simulation
  useEffect(() => {
    let audioInterval: any;
    if (isPlayingAudio) {
      audioInterval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);
    }
    return () => clearInterval(audioInterval);
  }, [isPlayingAudio]);

  // Scrollytelling scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollyContainerRef.current) return;
      const rect = scrollyContainerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollableDistance = rect.height - windowH;

      if (rect.top <= 0 && rect.bottom >= windowH) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
        const step = Math.min(2, Math.floor(progress * 3));
        setScrollyStep(step);
      } else if (rect.top > 0) {
        setScrollyStep(0);
      } else if (rect.bottom < windowH) {
        setScrollyStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Parallax Mouse Tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setCardTilt({ x: rotateX, y: rotateY, sheenX, sheenY });
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    setCardTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  const handleCopyPan = (panText: string) => {
    navigator.clipboard?.writeText(panText.replace(/\s+/g, ''));
    setCopiedPan(true);
    setTimeout(() => setCopiedPan(false), 2000);
  };

  // Scrollytelling Modules Data
  const scrollyModules = [
    {
      id: 'voice-send',
      badge: 'PINNED STEP 1 // WHATSAPP VOICE & CHAT',
      title: 'Send money via voice & chat',
      tagline: 'Instant Pidgin, Yorùbá, Hausa & English speech-to-NIP clearing.',
      description:
        'Transact naturally without opening an app. Speak into WhatsApp: "Abeeg send ₦25,000 to Chidinma for fuel". Axoora’s fine-tuned RAG parses bank details, displays account resolution, and dispatches via Central Bank NIBSS switch in 0.89s.',
      accent: '#00DF8F',
      borderClass: 'border-[#00DF8F]',
      bgAccent: 'bg-[#00DF8F]/10',
      textAccent: 'text-[#00DF8F]',
      audioQuote: '"Abeeg send ₦25,000 to Chidinma for fuel"',
      mockupData: {
        chatUser: 'Abeeg send ₦25,000 to Chidinma for fuel',
        aiBadge: 'INTENT RESOLVED // NIP DISPATCH',
        recipient: 'Chidinma Okafor',
        bank: 'Access Bank Plc • 0128941029',
        amount: '₦25,000.00',
        fee: '₦0.00 (Zero Fee)',
        latency: '0.84s NIBSS Handshake',
        actionLabel: 'Confirm with Biometric Touch ID',
      },
    },
    {
      id: 'vtu-instant',
      badge: 'PINNED STEP 2 // HIGH-SPEED TELCO GATEWAY',
      title: 'Buy airtime & data instantly',
      tagline: 'Direct Telco clearing across MTN, Airtel, Glo & 9mobile.',
      description:
        'Recharge shop lines and renew high-speed data bundles with zero surcharges. Voice commands trigger automated telco API handshakes with instant receipt tokens generated right inside your chat stream.',
      accent: '#0D95FE',
      borderClass: 'border-[#0D95FE]',
      bgAccent: 'bg-[#0D95FE]/10',
      textAccent: 'text-[#0D95FE]',
      audioQuote: '"Load 10GB MTN data to my shop number"',
      mockupData: {
        chatUser: 'Load 10GB MTN data to my shop line 0803 491 0283',
        aiBadge: 'VTU TELCO DIRECT CLEARED',
        recipient: '0803 491 0283 (MTN 4G)',
        bank: 'Direct Telco Switch (Tier 1)',
        amount: '₦3,000.00 (10GB SME 30-Day)',
        fee: '₦0.00 (Zero Fee)',
        latency: '0.22s API Clearing',
        actionLabel: 'Bundle Active on Device',
      },
    },
    {
      id: 'ajo-automated',
      badge: 'PINNED STEP 3 // AUTONOMOUS ROTATIONAL LEDGER',
      title: 'Schedule automated Ajo pools',
      tagline: 'Communal rotational savings with smart escrow protection.',
      description:
        'Organize thrift circles (Esusu/Ajo) and daily supplier floats. Set automated cron rules: "Every morning send ₦20k to supplier Musa at 8am". Axoora locks funds in high-yield vaults paying 15.5% APY until payout day.',
      accent: '#F2A93B',
      borderClass: 'border-[#F2A93B]',
      bgAccent: 'bg-[#F2A93B]/10',
      textAccent: 'text-[#F2A93B]',
      audioQuote: '"Every morning send ₦20k to supplier Musa at 8am"',
      mockupData: {
        chatUser: 'Lock ₦100,000 for Balogun Traders Ajo Circle turn 3',
        aiBadge: 'AJO ESCROW LOCKED // 15.5% APY',
        recipient: 'Balogun Traders Circle (Turn 3 of 10)',
        bank: 'Street Vault Smart Escrow',
        amount: '₦100,000.00 / mo',
        fee: '₦0.00 Custody Fee',
        latency: 'Pmt Guaranteed via Smart Contract',
        actionLabel: 'Escrow Locked & Compounding',
      },
    },
  ];

  // Card theme styling helper
  const getCardStyle = () => {
    switch (cardFinish) {
      case 'obsidian':
        return {
          bg: 'from-[#0A1128] via-[#04091A] to-[#010614]',
          border: 'border-[#1E3A6B]',
          glow: 'rgba(13, 149, 254, 0.15)',
          chip: '#C0C7D6',
          label: 'Obsidian Stealth Titanium',
        };
      case 'emerald':
        return {
          bg: 'from-[#022A1E] via-[#011710] to-[#010A07]',
          border: 'border-[#00DF8F]/50',
          glow: 'rgba(0, 223, 143, 0.25)',
          chip: '#A7F3D0',
          label: 'Sovereign Emerald Foil',
        };
      case 'cyan':
        return {
          bg: 'from-[#082846] via-[#03152B] to-[#010A14]',
          border: 'border-[#0D95FE]/60',
          glow: 'rgba(13, 149, 254, 0.3)',
          chip: '#BAE6FD',
          label: 'Cyber Cyan Multi-Currency',
        };
      case 'platinum':
        return {
          bg: 'from-[#2A374A] via-[#1A2536] to-[#0C1420]',
          border: 'border-[#A8BBD6]/40',
          glow: 'rgba(242, 245, 249, 0.15)',
          chip: '#E2E8F0',
          label: 'Raw Platinum Dual-Rail',
        };
    }
  };

  const currentCardStyle = getCardStyle();

  return (
    <div className="min-h-screen w-full bg-[#020F2E] text-[#F2F5F9] font-sans overflow-x-hidden selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* ========================================================================= */}
      {/* 1. NAVIGATION BAR (Sticky Glassmorphic Shell) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#020F2E]/80 border-b border-[#14294F] transition-all">
        <div className="h-20 w-full px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
          {/* Axoora Logo with Emerald Glow Indicator */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => {
                setActiveNav('Personal');
                onNavigate('personal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative">
                <img
                  alt="Axoora Logo"
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                  src={BRAND_LOGO_URL}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Emerald glow dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00DF8F]"></span>
                </span>
              </div>
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#F2F5F9]">
                Axoora<span className="text-[#0D95FE]">.ai</span>
              </span>
            </button>

            {/* Regulatory Live Pill */}
            <div className="hidden md:flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse"></span>
              <span className="text-[11px] text-[#00DF8F] uppercase tracking-wider font-semibold font-mono">
                CBN PSSP Rail Active
              </span>
            </div>
          </div>

          {/* Centered Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0A1B3D]/60 p-1.5 rounded-full border border-[#14294F]/80">
            {[
              { label: 'Personal', screen: 'personal' as ScreenType },
              { label: 'Business', screen: 'business-treasury' as ScreenType },
              { label: 'POS Agents', screen: 'pos-agents' as ScreenType },
              { label: 'WhatsApp AI', screen: 'whatsapp-ai' as ScreenType },
            ].map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    onNavigate(item.screen);
                  }}
                  className={`relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#F2F5F9]'
                      : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#14294F]/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#14294F] border border-[#0D95FE]/50 shadow-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Primary Pill Button & Quick Access */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTransfer}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#14294F] bg-[#0A1B3D] text-xs font-semibold text-[#6FBDFE] hover:border-[#0D95FE] hover:bg-[#14294F] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Send Money</span>
            </button>

            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-[#14294F] bg-[#0A1B3D] text-sm font-semibold text-[#F2F5F9] hover:bg-[#14294F] hover:border-[#A8BBD6]/40 transition-all"
            >
              Login
            </button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenOnboarding}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0D95FE] text-sm text-[#00325b] font-bold hover:bg-[#00DF8F] hover:text-[#003825] transition-colors cursor-pointer border border-[#0D95FE]"
            >
              Get Started Free
            </motion.button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION & GOOGLE PIXEL MOCKUP */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0D95FE]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#00DF8F]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column (7 cols): Massive H1, punchy subtext, dual CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 self-start py-1.5 px-3 rounded-full bg-[#0A1B3D] border border-[#14294F]">
              <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse" />
              <span className="font-mono text-xs text-[#00DF8F] font-semibold tracking-wider uppercase">
                Live across Nigeria • ₦4.2B+ Daily Settlement • CBN Regulated
              </span>
            </div>

            {/* Massive H1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2F5F9] leading-[1.05]">
              Money, simplified <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F5F9] via-[#A8BBD6] to-[#0D95FE]">
                for the street.
              </span>
            </h1>

            {/* Punchy Subtext */}
            <p className="text-lg sm:text-xl text-[#A8BBD6] max-w-2xl leading-relaxed">
              The sovereign AI banking rail built for high-velocity Nigerian commerce. Transact via
              natural WhatsApp voice notes, auto-compound idle cash at{' '}
              <span className="text-[#00DF8F] font-semibold">15.5% APY</span>, and disburse supplier
              payments with zero transfer fees.
            </p>

            {/* Dual CTAs & NIP trigger */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenOnboarding}
                className="px-7 py-3.5 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all flex items-center gap-2 cursor-pointer border border-[#0D95FE]"
              >
                <span>Get Started Free</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </motion.button>

              <button
                onClick={() => {
                  setActiveNav('WhatsApp AI');
                  onNavigate('whatsapp-ai');
                }}
                className="px-6 py-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] font-semibold text-base hover:border-[#00DF8F] hover:text-[#00DF8F] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#00DF8F]">chat</span>
                <span>Transact on WhatsApp</span>
              </button>

              <button
                onClick={onOpenTransfer}
                className="px-4 py-3 rounded-full border border-[#14294F] bg-[#0A1B3D]/60 text-xs font-mono text-[#6FBDFE] hover:bg-[#14294F] transition-all"
              >
                ⚡ Live 0.84s NIP Sandbox
              </button>
            </div>

            {/* Trust and Compliance Badges Row */}
            <div className="pt-6 border-t border-[#14294F] flex flex-wrap items-center gap-6 text-xs text-[#A8BBD6]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified</span>
                <span>CBN Regulated PSSP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">
                  account_balance
                </span>
                <span>NDIC Insured Custody</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">lock</span>
                <span>PCI-DSS Level 1 Validated</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Hyper-realistic Google Pixel Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] sm:max-w-[370px] rounded-[44px] p-3.5 bg-[#01091C] border-2 border-[#14294F] relative shadow-none">
              {/* Outer chassis frame */}
              <div className="rounded-[36px] bg-[#01091C] border border-[#14294F] overflow-hidden flex flex-col relative text-[#F2F5F9]">
                {/* Android Camera Punch Hole & Status Bar */}
                <div className="px-6 pt-3 pb-2 flex items-center justify-between text-[#A8BBD6] font-mono text-[11px] bg-[#01091C]">
                  <span className="font-semibold text-[#F2F5F9]">09:41</span>
                  {/* Google Pixel Camera Cutout */}
                  <div className="w-4 h-4 rounded-full bg-[#01091C] border-2 border-[#14294F] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#020F2E]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[13px]">wifi</span>
                    <span className="material-symbols-outlined text-[13px]">battery_full</span>
                  </div>
                </div>

                {/* In-App Header */}
                <div className="px-5 py-3 flex items-center justify-between border-b border-[#14294F] bg-[#0A1B3D]/80">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#020F2E] flex items-center justify-center border border-[#14294F]">
                      <span className="font-bold text-xs text-[#00DF8F]">A●</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F2F5F9] leading-tight">
                        Axoora Street Vault
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]"></span>
                        <span className="text-[10px] text-[#00DF8F] font-mono">Tier 3 Verified</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenOnboarding}
                    className="w-8 h-8 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#A8BBD6] hover:text-[#F2F5F9]"
                  >
                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                  </button>
                </div>

                {/* Phone Inside Canvas */}
                <div className="p-4 flex flex-col gap-3.5 bg-[#020F2E]">
                  {/* Balance Card: ₦482,450.80 */}
                  <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#A8BBD6] uppercase tracking-wider font-mono">
                        Total Liquid Balance
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F] text-[#00DF8F] font-mono text-[11px]">
                        +15.5% APY Daily
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono text-[#F2F5F9] tabular-nums">
                        ₦{heroBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#14294F] font-mono text-[11px] text-[#A8BBD6]">
                      <span>NUBAN: {account.accountNumber}</span>
                      <span className="text-[#0D95FE] font-medium">Wema Auto-Sweep</span>
                    </div>
                  </div>

                  {/* Quick Action Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <button
                      onClick={onOpenTransfer}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#0D95FE] group-hover:border-[#0D95FE] transition-all">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </div>
                      <span className="text-[11px] text-[#F2F5F9]">Send</span>
                    </button>

                    <button
                      onClick={() => onNavigate('ajo-vaults')}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#00DF8F] group-hover:border-[#00DF8F] transition-all">
                        <span className="material-symbols-outlined text-[18px]">savings</span>
                      </div>
                      <span className="text-[11px] text-[#F2F5F9]">Ajo</span>
                    </button>

                    <button
                      onClick={() => onNavigate('pos-agents')}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#F2A93B] group-hover:border-[#F2A93B] transition-all">
                        <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                      </div>
                      <span className="text-[11px] text-[#F2F5F9]">POS</span>
                    </button>

                    <button
                      onClick={() => {
                        const el = document.getElementById('card-showcase-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#6FBDFE] group-hover:border-[#6FBDFE] transition-all">
                        <span className="material-symbols-outlined text-[18px]">credit_card</span>
                      </div>
                      <span className="text-[11px] text-[#F2F5F9]">Cards</span>
                    </button>
                  </div>

                  {/* Live Incoming WhatsApp Transaction Card (+₦25,000.00 from Chidinma Okafor) */}
                  <AnimatePresence>
                    {showLiveIncoming && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-3.5 rounded-2xl bg-[#0A1B3D] border-2 border-[#00DF8F] flex flex-col gap-2 relative shadow-none"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-ping" />
                            <span className="text-[11px] font-mono text-[#00DF8F] uppercase font-semibold">
                              Incoming WhatsApp Transfer
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#A8BBD6]">Just now</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-[#00DF8F]/20 border border-[#00DF8F] flex items-center justify-center text-[#00DF8F] shrink-0">
                              <span className="material-symbols-outlined text-[18px]">south_west</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-[#F2F5F9] truncate">
                                Chidinma Okafor
                              </span>
                              <span className="text-[11px] text-[#A8BBD6] truncate">
                                Voice Note: "Fuel refund for Balogun delivery"
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-base font-bold text-[#00DF8F]">
                              +₦25,000.00
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#14294F] text-[10px] font-mono text-[#A8BBD6]">
                          <span>Rail: Access → Wema NIP (0.84s)</span>
                          <span className="text-[#00DF8F] font-semibold">Settled Instantly</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Street Activity Item */}
                  <div className="p-3 rounded-xl bg-[#0A1B3D]/70 border border-[#14294F] flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#14294F] flex items-center justify-center text-[#A8BBD6] shrink-0">
                        <span className="material-symbols-outlined text-[16px]">storefront</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-[#F2F5F9] truncate font-medium">
                          Balogun Wholesale Market
                        </span>
                        <span className="text-[10px] text-[#A8BBD6]">Direct POS Supplier</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#F2F5F9] font-semibold shrink-0">
                      -₦142,500.00
                    </span>
                  </div>
                </div>

                {/* Home indicator bar */}
                <div className="w-24 h-1 bg-[#14294F] rounded-full mx-auto my-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE SCROLLYTELLING FEATURE SECTION (OwO Style) */}
      {/* ========================================================================= */}
      <section
        ref={scrollyContainerRef}
        id="scrollytelling-section"
        className="relative w-full border-b border-[#14294F] bg-[#020F2E]"
      >
        {/* Step Indicator & Pinned Container */}
        <div className="sticky top-20 min-h-[calc(100vh-5rem)] w-full flex flex-col justify-center px-4 sm:px-8 py-12">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
            {/* Header Stage Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#14294F]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-[#00DF8F] tracking-widest uppercase font-semibold">
                  SCROLL-DRIVEN TIMELINE // ZERO-APP COMMERCE ENGINE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F2F5F9] tracking-tight">
                  How Nigerian Commerce Moves on Axoora
                </h2>
              </div>

              {/* Step Pills Switcher */}
              <div className="flex items-center gap-2 bg-[#0A1B3D] p-1.5 rounded-full border border-[#14294F]">
                {scrollyModules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    onClick={() => setScrollyStep(idx)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-full transition-all ${
                      scrollyStep === idx
                        ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]'
                        : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Module Stage */}
            <AnimatePresence mode="wait">
              {(() => {
                const currentMod = scrollyModules[scrollyStep];
                return (
                  <motion.div
                    key={currentMod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Left: Tactile Content Card */}
                    <div className="lg:col-span-6 flex flex-col gap-5">
                      <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#0A1B3D] border-2 border-[#14294F]">
                        <span className={`font-mono text-xs font-bold ${currentMod.textAccent}`}>
                          {currentMod.badge}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-5xl font-extrabold text-[#F2F5F9] tracking-tight leading-tight">
                        {currentMod.title}
                      </h3>

                      <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed">
                        {currentMod.description}
                      </p>

                      {/* Interactive Audio Player Simulation */}
                      <div className="p-4 rounded-2xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className={currentMod.textAccent}>INCOMING AUDIO NOTE</span>
                          <span className="text-[#A8BBD6]">0:04 WAV • PIDGIN NLP</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-[#020F2E] font-bold transition-all shrink-0 cursor-pointer ${
                              isPlayingAudio ? 'bg-[#00DF8F]' : 'bg-[#0D95FE]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[24px]">
                              {isPlayingAudio ? 'pause' : 'play_arrow'}
                            </span>
                          </button>

                          <div className="flex-1 flex flex-col gap-1.5">
                            <span className="text-xs italic text-[#F2F5F9]">
                              {currentMod.audioQuote}
                            </span>
                            <div className="w-full h-2 rounded-full bg-[#14294F] overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#0D95FE] to-[#00DF8F]"
                                style={{ width: `${audioProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={onOpenTransfer}
                          className="px-5 py-2.5 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all border border-[#0D95FE]"
                        >
                          Try This Module
                        </button>
                        <button
                          onClick={() => {
                            setActiveNav('WhatsApp AI');
                            onNavigate('whatsapp-ai');
                          }}
                          className="px-5 py-2.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] font-semibold text-sm hover:border-[#0D95FE] transition-all"
                        >
                          Explore WhatsApp Sandbox
                        </button>
                      </div>
                    </div>

                    {/* Right: Simulated WhatsApp Live Transaction Card */}
                    <div className="lg:col-span-6 flex justify-center">
                      <div className="w-full max-w-md rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] p-6 flex flex-col gap-4 relative shadow-none">
                        {/* Status bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F] border border-[#00DF8F]">
                              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-[#F2F5F9]">Axoora WhatsApp AI</h5>
                              <p className="text-[10px] text-[#00DF8F] font-mono">Meta Verified Bot</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#14294F] text-[10px] font-mono text-[#A8BBD6]">
                            TLS 1.3 SECURE
                          </span>
                        </div>

                        {/* User Chat Bubble */}
                        <div className="self-end max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm bg-[#14294F] border border-[#1E3A6B] text-xs text-[#F2F5F9]">
                          <p>{currentMod.mockupData.chatUser}</p>
                          <span className="text-[9px] text-[#A8BBD6] text-right block mt-1">
                            09:42 • Delivered
                          </span>
                        </div>

                        {/* AI Resolved Intent Card with 2px feedback border */}
                        <div
                          className={`p-4 rounded-2xl bg-[#020F2E] border-2 ${currentMod.borderClass} flex flex-col gap-3`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[10px] font-mono uppercase font-bold ${currentMod.textAccent}`}
                            >
                              {currentMod.mockupData.aiBadge}
                            </span>
                            <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-xs text-[#A8BBD6]">Recipient / Target</span>
                              <span className="text-sm font-bold text-[#F2F5F9]">
                                {currentMod.mockupData.recipient}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-[#A8BBD6]">Amount</span>
                              <span className={`text-base font-bold font-mono ${currentMod.textAccent}`}>
                                {currentMod.mockupData.amount}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-2.5 rounded-xl bg-[#0A1B3D] border border-[#14294F]">
                            <div>
                              <span className="text-[#A8BBD6] block">Rail / Institution:</span>
                              <span className="text-[#F2F5F9] font-medium">
                                {currentMod.mockupData.bank}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#A8BBD6] block">Dispatch Latency:</span>
                              <span className="text-[#00DF8F] font-bold">
                                {currentMod.mockupData.latency}
                              </span>
                            </div>
                          </div>

                          {/* Instant Biometric Approval Button */}
                          <button
                            onClick={() => {
                              setStepApproved((prev) => ({
                                ...prev,
                                [scrollyStep]: !prev[scrollyStep],
                              }));
                            }}
                            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              stepApproved[scrollyStep]
                                ? 'bg-[#00DF8F] text-[#003825]'
                                : 'bg-[#0D95FE] text-[#00325b] hover:bg-[#00DF8F]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {stepApproved[scrollyStep] ? 'check_circle' : 'fingerprint'}
                            </span>
                            <span>
                              {stepApproved[scrollyStep]
                                ? 'Settled on Central Rail (0.84s)'
                                : currentMod.mockupData.actionLabel}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE 3D CARD & HARDWARE SWITCHER (Revolut Style) */}
      {/* ========================================================================= */}
      <section
        id="card-showcase-section"
        className="relative w-full px-4 sm:px-8 py-20 lg:py-28 border-b border-[#14294F] bg-[#020F2E] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Section Header & Subtext */}
          <div className="flex flex-col items-center text-center gap-3">
            <span className="font-mono text-xs text-[#0D95FE] tracking-widest uppercase font-semibold">
              SOVEREIGN CARD HARDWARE // DUAL-RAIL TITANIUM & VIRTUAL
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F2F5F9] tracking-tight">
              Elevate your spend
            </h2>
            <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl">
              Customize your card to match your vibe. Zero cross-border failure rates, dynamic rolling
              CVV, and instant dual-currency NGN &amp; USD clearing.
            </p>

            {/* Interactive Tab/Pill Toggle: Physical Titanium vs Virtual USD/NGN */}
            <div className="mt-4 p-1.5 rounded-full bg-[#0A1B3D] border-2 border-[#14294F] flex items-center gap-2">
              <button
                onClick={() => {
                  setCardType('physical');
                  setCardFinish('obsidian');
                }}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  cardType === 'physical'
                    ? 'text-[#00325b]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                {cardType === 'physical' && (
                  <motion.div
                    layoutId="cardTypePill"
                    className="absolute inset-0 rounded-full bg-[#0D95FE]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">credit_card</span>
                  Physical Titanium
                </span>
              </button>

              <button
                onClick={() => {
                  setCardType('virtual');
                  setCardFinish('cyan');
                }}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  cardType === 'virtual'
                    ? 'text-[#003825]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                {cardType === 'virtual' && (
                  <motion.div
                    layoutId="cardTypePill"
                    className="absolute inset-0 rounded-full bg-[#00DF8F]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">devices</span>
                  Virtual USD / NGN
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Card Stage & Live Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: 3D Floating Morphing Card */}
            <div
              className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] perspective-1000"
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={handleCardMouseLeave}
              ref={cardStageRef}
            >
              <motion.div
                animate={{
                  rotateX: isCardHovered ? cardTilt.x : 0,
                  rotateY: isCardHovered ? cardTilt.y : 0,
                  scale: isCardHovered ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full max-w-[420px] aspect-[1.586] rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-shadow border-2"
              >
                {/* Dynamic Gradient Background and Border based on Finish */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${currentCardStyle.bg} ${currentCardStyle.border} rounded-3xl z-0`}
                />

                {/* Specular Sheen Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 z-10 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at ${cardTilt.sheenX}% ${cardTilt.sheenY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                  }}
                />

                {/* Frosted Security Freeze Overlay */}
                <AnimatePresence>
                  {isFrozen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 backdrop-blur-md bg-[#020F2E]/80 z-40 rounded-3xl flex flex-col items-center justify-center gap-2 border-2 border-[#FF6A6A]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FF6A6A]/20 flex items-center justify-center text-[#FF6A6A]">
                        <span className="material-symbols-outlined text-[28px]">lock</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#FF6A6A] tracking-wider uppercase">
                        CARD INSTANTLY FROZEN
                      </span>
                      <span className="text-[11px] text-[#A8BBD6]">Zero auth allowed on POS/Web</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Row: Axoora Brand & EMV Chip / Contactless */}
                <div className="relative z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl tracking-tight text-[#F2F5F9]">
                      Axoora<span className="text-[#0D95FE]">.ai</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#14294F]/80 text-[10px] font-mono text-[#00DF8F] border border-[#00DF8F]/40">
                      {cardType === 'physical' ? 'TITANIUM' : 'VIRTUAL MULTI-CURRENCY'}
                    </span>
                  </div>

                  <span className="material-symbols-outlined text-[24px] text-[#A8BBD6] rotate-90">
                    wifi
                  </span>
                </div>

                {/* Middle: EMV Chip & Holographic Accents */}
                <div className="relative z-20 flex items-center justify-between my-2">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-tr from-[#D1D5DB] via-[#E5E7EB] to-[#9CA3AF] border border-[#6B7280] flex items-center justify-center shadow-inner">
                    <div className="w-10 h-7 border border-[#4B5563]/60 rounded grid grid-cols-2 grid-rows-2 opacity-60" />
                  </div>

                  <span className="font-mono text-xs text-[#A8BBD6]">
                    {cardType === 'physical' ? 'NFC ENABLED' : 'APPLE / GOOGLE PAY'}
                  </span>
                </div>

                {/* Bottom: 16-Digit PAN, Holder Name, Expiry & CVV */}
                <div className="relative z-20 flex flex-col gap-2">
                  <div
                    onClick={() => handleCopyPan('5399 4108 9210 4402')}
                    className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#F2F5F9] hover:text-[#0D95FE] transition-colors flex items-center gap-2"
                  >
                    <span>5399 4108 9210 4402</span>
                    <span className="material-symbols-outlined text-[16px] text-[#A8BBD6]">
                      {copiedPan ? 'check' : 'content_copy'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#A8BBD6] uppercase block">Cardholder</span>
                      <span className="font-semibold text-[#F2F5F9]">BABATUNDE ALIYU</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#A8BBD6] uppercase block">Expires</span>
                      <span className="font-semibold text-[#F2F5F9]">09/29</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#00DF8F] uppercase block">
                        Rolling CVV ({cvvTimer}s)
                      </span>
                      <span className="font-bold text-[#00DF8F]">{cvv}</span>
                    </div>

                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
                      <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card Finish Colorway Selector */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-xs text-[#A8BBD6] font-mono uppercase">Card Finish:</span>
                {[
                  { id: 'obsidian' as CardFinish, color: '#0A1128', border: '#1E3A6B' },
                  { id: 'emerald' as CardFinish, color: '#022A1E', border: '#00DF8F' },
                  { id: 'cyan' as CardFinish, color: '#082846', border: '#0D95FE' },
                  { id: 'platinum' as CardFinish, color: '#2A374A', border: '#A8BBD6' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCardFinish(item.id)}
                    style={{ backgroundColor: item.color, borderColor: item.border }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      cardFinish === item.id ? 'scale-125 ring-2 ring-[#0D95FE]' : 'hover:scale-110'
                    }`}
                  />
                ))}
                <span className="text-xs font-mono text-[#F2F5F9] ml-2">
                  {currentCardStyle.label}
                </span>
              </div>
            </div>

            {/* Right: Security Limits & Real-Time Console */}
            <div className="lg:col-span-5 flex flex-col gap-5 bg-[#0A1B3D] p-6 sm:p-8 rounded-3xl border-2 border-[#14294F]">
              <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                <div>
                  <h4 className="text-lg font-bold text-[#F2F5F9]">Live Security Controls</h4>
                  <p className="text-xs text-[#A8BBD6]">Real-time adjustments without reissuing</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F] text-[11px] font-mono text-[#00DF8F]">
                  HSM ACTIVE
                </span>
              </div>

              {/* Monthly Spending Cap Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A8BBD6]">Monthly Spending Cap</span>
                  <span className="font-bold text-[#0D95FE]">
                    ${spendingLimit.toLocaleString()} (~₦{(spendingLimit * 1540).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(Number(e.target.value))}
                  className="w-full accent-[#0D95FE] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#A8BBD6]">
                  <span>$500</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Toggle Switches */}
              <div className="flex flex-col gap-3 pt-2">
                {/* International Payments Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#020F2E] border border-[#14294F]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#0D95FE]">public</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#F2F5F9]">Cross-Border Multi-Currency</span>
                      <span className="text-[10px] text-[#A8BBD6]">USD, GBP, EUR online billing</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsInternationalEnabled(!isInternationalEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isInternationalEnabled ? 'bg-[#00DF8F]' : 'bg-[#14294F]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        isInternationalEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* ATM Cashout Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#020F2E] border border-[#14294F]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#F2A93B]">atm</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#F2F5F9]">ATM Cashout Authorization</span>
                      <span className="text-[10px] text-[#A8BBD6]">Physical PIN terminal access</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAtmEnabled(!isAtmEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isAtmEnabled ? 'bg-[#00DF8F]' : 'bg-[#14294F]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        isAtmEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Dynamic CVV status box */}
              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#00DF8F]/40 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">timer</span>
                  <span className="text-[#A8BBD6]">Rotating CVV Refresh:</span>
                </div>
                <span className="text-[#00DF8F] font-bold">{cvvTimer}s remaining</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsFrozen(!isFrozen)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    isFrozen
                      ? 'bg-[#00DF8F] text-[#003825] border-[#00DF8F]'
                      : 'bg-[#FF6A6A]/10 text-[#FF6A6A] border-[#FF6A6A]/50 hover:bg-[#FF6A6A]/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFrozen ? 'lock_open' : 'ac_unit'}
                  </span>
                  <span>{isFrozen ? 'Unfreeze Card' : 'Freeze Card Instantly'}</span>
                </button>

                <button
                  onClick={onOpenOnboarding}
                  className="px-5 py-3 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-xs hover:bg-[#00DF8F] transition-all cursor-pointer"
                >
                  Order Physical
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE THREE CORE PILLARS (Moniepoint Authority) */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-8 py-20 lg:py-28 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs text-[#00DF8F] tracking-widest uppercase font-semibold">
                INSTITUTIONAL TRUST // THREE FOUNDATIONAL PILLARS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
                Engineered for High-Velocity Street Liquidity
              </h2>
            </div>
            <p className="text-sm text-[#A8BBD6] max-w-sm">
              From market traders at Balogun to nationwide distributors and licensed POS agents.
            </p>
          </div>

          {/* 3 Equal Columns Using Raised Navy Surfaces (#0A1B3D) and Clean Borders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Personal (15.5% APY Daily Vault Yield) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#0A1B3D] rounded-3xl border-2 border-[#14294F] hover:border-[#00DF8F] p-8 flex flex-col justify-between gap-6 transition-all group"
            >
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/10 border-2 border-[#00DF8F] flex items-center justify-center text-[#00DF8F]">
                  <span className="material-symbols-outlined text-[26px]">account_balance_wallet</span>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#00DF8F] font-semibold tracking-wider">
                    COMMUNAL &amp; RETAIL VAULTS
                  </span>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mt-1">Personal Banking</h3>
                </div>

                <div className="py-3 px-4 rounded-xl bg-[#020F2E] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Daily Vault Yield</span>
                  <span className="text-xl font-bold font-mono text-[#00DF8F]">15.5% APY</span>
                </div>

                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Automated communal Ajo rotational pools, zero-failure virtual USD/NGN cards, and
                  daily yield on idle savings paid out every midnight directly to your pocket.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveNav('Personal');
                  onNavigate('ajo-vaults');
                }}
                className="inline-flex items-center gap-2 text-[#00DF8F] font-semibold text-sm group-hover:gap-3 transition-all text-left cursor-pointer"
              >
                <span>Explore Ajo Vaults</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </motion.div>

            {/* Pillar 2: Business (0.00s Payout Window) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#0A1B3D] rounded-3xl border-2 border-[#14294F] hover:border-[#0D95FE] p-8 flex flex-col justify-between gap-6 transition-all group"
            >
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0D95FE]/10 border-2 border-[#0D95FE] flex items-center justify-center text-[#0D95FE]">
                  <span className="material-symbols-outlined text-[26px]">corporate_fare</span>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#0D95FE] font-semibold tracking-wider">
                    TREASURY &amp; DISBURSEMENTS
                  </span>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mt-1">Business Banking</h3>
                </div>

                <div className="py-3 px-4 rounded-xl bg-[#020F2E] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Payout Window</span>
                  <span className="text-xl font-bold font-mono text-[#0D95FE]">0.00s</span>
                </div>

                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Dedicated merchant NUBANs, automated sub-wallets for VAT/Tax, multi-branch float
                  management, and integrated instant bulk supplier disbursement without transfer fees.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveNav('Business');
                  onNavigate('business-treasury');
                }}
                className="inline-flex items-center gap-2 text-[#0D95FE] font-semibold text-sm group-hover:gap-3 transition-all text-left cursor-pointer"
              >
                <span>Explore Business Treasury</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </motion.div>

            {/* Pillar 3: POS Agents (99.98% Dual-Network Uptime) */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#0A1B3D] rounded-3xl border-2 border-[#14294F] hover:border-[#F2A93B] p-8 flex flex-col justify-between gap-6 transition-all group"
            >
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/10 border-2 border-[#F2A93B] flex items-center justify-center text-[#F2A93B]">
                  <span className="material-symbols-outlined text-[26px]">point_of_sale</span>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#F2A93B] font-semibold tracking-wider">
                    AGENCY BANKING NETWORK
                  </span>
                  <h3 className="text-2xl font-bold text-[#F2F5F9] mt-1">POS Agent Network</h3>
                </div>

                <div className="py-3 px-4 rounded-xl bg-[#020F2E] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Dual-Network Uptime</span>
                  <span className="text-xl font-bold font-mono text-[#F2A93B]">99.98%</span>
                </div>

                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Hardened 4G Android 13 terminals with dual-eSIM fallback, instant dispute resolution
                  within 60 seconds, and market-leading agent commission structures.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveNav('POS Agents');
                  onNavigate('pos-agents');
                }}
                className="inline-flex items-center gap-2 text-[#F2A93B] font-semibold text-sm group-hover:gap-3 transition-all text-left cursor-pointer"
              >
                <span>Explore POS Terminals</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INSTITUTIONAL DARK FOOTER */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#01091C] border-t border-[#14294F] mt-auto">
        <div className="w-full px-4 sm:px-8 py-14 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Branding & Corporate Mandate */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#F2F5F9]">
                  Axoora<span className="text-[#0D95FE]">.ai</span>
                </span>
              </div>
              <p className="text-sm text-[#A8BBD6] leading-relaxed max-w-sm">
                Sovereign enterprise payments infrastructure, AI-orchestrated liquidity, and regulated
                digital settlement rails for emerging market economies.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#00DF8F]">
                  CBN LICENSED PSSP
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#0D95FE]">
                  NDIC INSURED VAULTS
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#A8BBD6]">
                  PCI-DSS LEVEL 1
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#F2A93B]">
                  ISO 27001 SECURE
                </span>
              </div>
              <p className="text-xs text-[#A8BBD6]/70 pt-2 leading-normal">
                © 2026 Axoora Technologies Ltd. All rights reserved. Operating under Central Bank of
                Nigeria regulatory supervision.
              </p>
            </div>

            {/* Products Links */}
            <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
                Products
              </h4>
              <nav className="flex flex-col gap-2.5 text-sm text-[#A8BBD6]">
                <button
                  onClick={() => onNavigate('personal')}
                  className="text-left hover:text-[#0D95FE] transition-colors"
                >
                  Personal Banking
                </button>
                <button
                  onClick={() => onNavigate('business-treasury')}
                  className="text-left hover:text-[#0D95FE] transition-colors"
                >
                  Business Treasury
                </button>
                <button
                  onClick={() => onNavigate('pos-agents')}
                  className="text-left hover:text-[#0D95FE] transition-colors"
                >
                  POS Terminals
                </button>
                <button
                  onClick={() => onNavigate('ajo-vaults')}
                  className="text-left hover:text-[#0D95FE] transition-colors"
                >
                  Ajo Vaults
                </button>
                <button
                  onClick={() => onNavigate('whatsapp-ai')}
                  className="text-left hover:text-[#0D95FE] transition-colors"
                >
                  WhatsApp AI Banking
                </button>
              </nav>
            </div>

            {/* Developer API & Rails */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
                Developer APIs
              </h4>
              <nav className="flex flex-col gap-2.5 text-sm text-[#A8BBD6]">
                <span className="text-left hover:text-[#0D95FE] cursor-pointer transition-colors">
                  NIBSS ISO 20022 Protocols
                </span>
                <span className="text-left hover:text-[#0D95FE] cursor-pointer transition-colors">
                  Encrypted HSM Webhooks
                </span>
                <span className="text-left hover:text-[#0D95FE] cursor-pointer transition-colors">
                  RAG Natural Language API
                </span>
                <button
                  onClick={onOpenOnboarding}
                  className="text-left text-[#00DF8F] hover:underline transition-colors font-medium"
                >
                  Spawn Sandbox Virtual Account →
                </button>
              </nav>
            </div>

            {/* Regulatory Governance */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
                Governance &amp; Trust
              </h4>
              <div className="flex flex-col gap-2.5 text-xs text-[#A8BBD6]">
                <div className="flex items-center gap-1.5 text-[#00DF8F]">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>Central Bank License: PSSP-2024/9912</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0D95FE]">
                  <span className="material-symbols-outlined text-[15px]">account_balance</span>
                  <span>NDIC Insurance: ₦5,000,000 per depositor</span>
                </div>
                <span>Anti-Money Laundering (AML/CFT) Directives</span>
                <span>Nigeria Data Protection Regulation (NDPR)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Address and Status Strip */}
        <div className="w-full border-t border-[#14294F] bg-[#01091C]">
          <div className="w-full px-4 sm:px-8 py-4 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#A8BBD6]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">location_on</span>
              <span className="font-medium text-[#F2F5F9]">
                Plot 1044 Constitution Avenue, Maitama District, Abuja FCT, Nigeria
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00DF8F] inline-block animate-pulse" />
                <span>NIBSS Instant Payment (NIP): 99.98% OK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00DF8F] inline-block" />
                <span>Settlement Rail: Operational (0.84s)</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
