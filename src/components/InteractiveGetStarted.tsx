'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveGetStartedProps {
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenDownloadApp: () => void;
  onOpenWhatsApp?: () => void;
}

interface StepData {
  num: number;
  tag: string;
  title: string;
  desc: string;
  accent: string;
  user: {
    photo: string;
    name: string;
    role: string;
    location: string;
    comment: string;
  };
}

export const InteractiveGetStarted: React.FC<InteractiveGetStartedProps> = ({
  onOpenWaitlist,
  onOpenDownloadApp,
  onOpenWhatsApp,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  // Scroll listener to calculate progress and lock the user into the sequence until finished
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Distance scrolled from top of section
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const currentProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setProgress(currentProgress);

      // Distribute into 4 steps
      if (currentProgress < 0.25) {
        setActiveStep(1);
      } else if (currentProgress < 0.50) {
        setActiveStep(2);
      } else if (currentProgress < 0.75) {
        setActiveStep(3);
      } else {
        setActiveStep(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStepClick = (stepNum: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (stepNum - 1) / 4 + 0.04;

    window.scrollTo({
      top: sectionTop + targetProgress * totalScrollable,
      behavior: 'smooth',
    });
  };

  const steps: StepData[] = [
    {
      num: 1,
      tag: '01. Sign-up & Phone',
      title: 'Download the App & Enter Phone Number',
      desc: 'Get Axoora on iOS, Android, or bank straight through WhatsApp. Enter your Nigerian mobile number to receive an instant 6-digit WhatsApp or SMS verification code.',
      accent: '#0D95FE',
      user: {
        photo: '/merchants/shopper.jpg',
        name: 'Amina Bello',
        role: 'Personal & Business Shopper',
        location: 'Ikeja, Lagos',
        comment: 'Received WhatsApp OTP in 1.2 seconds flat.',
      },
    },
    {
      num: 2,
      tag: '02. Identity & BVN',
      title: '30-Second BVN & Facial Biometrics Match',
      desc: 'Verify your identity in under 30 seconds via direct CBN NIBSS check. Take a quick selfie for 3D liveness match—no bank queues, zero paper affidavits, Tier-3 limits unlocked.',
      accent: '#00DF8F',
      user: {
        photo: '/merchants/fatima.jpg',
        name: 'Fatima Al-Hassan',
        role: 'Founder, Zaynab Couture',
        location: 'Wuse II, Abuja',
        comment: 'BVN & selfie matched in 20s without bank queues.',
      },
    },
    {
      num: 3,
      tag: '03. Dedicated NUBAN',
      title: 'Instant Account Funding & Dedicated NUBAN',
      desc: 'Your dedicated Nigerian business or personal NUBAN is assigned instantly. Receive customer transfers from all commercial banks with sub-second NIBSS settlement.',
      accent: '#0D95FE',
      user: {
        photo: '/merchants/emeka.jpg',
        name: 'Emeka Chukwu',
        role: 'Distributor, Emeka Gadgets',
        location: 'Computer Village, Lagos',
        comment: 'Shop NUBAN was active and taking payments on Day 1.',
      },
    },
    {
      num: 4,
      tag: '04. Transact & Hardware',
      title: 'Ready for Business: Card Active & POS Dispatched',
      desc: 'Activate your free virtual Dollar & Naira card immediately. Request your dual-eSIM Apex POS terminal delivered directly to your shop counter within 48 hours.',
      accent: '#F2A93B',
      user: {
        photo: '/merchants/tunde.jpg',
        name: 'Tunde Bakare',
        role: 'Operations Manager, Fresh Mart',
        location: 'Lekki Phase 1, Lagos',
        comment: 'Apex terminal arrived at our store in under 48 hours.',
      },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-to-get-started"
      className="relative w-full h-[340vh] bg-[#020F2E] border-b border-[#14294F] text-[#F2F5F9]"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0D95FE]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* PINNED STICKY CONTAINER: Stays locked in viewport while user scrolls through */}
      {/* all 4 steps before allowing normal page scroll down */}
      {/* ========================================================================= */}
      <div className="sticky top-16 lg:top-20 w-full min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* Top Header & Continuous Scroll Progress Indicators */}
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D95FE]">
                ONBOARDING IN 4 STEPS // ZERO BRANCH VISITS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F2F5F9] tracking-tight">
                How to Get Started
              </h2>
              <p className="text-xs sm:text-sm text-[#A8BBD6]">
                Scroll down to see each step unfold sequentially before proceeding.
              </p>
            </div>

            {/* Step Checkpoints Navigator */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#05112A] border border-[#14294F] p-1.5 rounded-full self-center md:self-auto shadow-inner">
              {[1, 2, 3, 4].map((s) => {
                const isCurrent = activeStep === s;
                const isPassed = activeStep > s;
                return (
                  <button
                    key={s}
                    onClick={() => handleStepClick(s)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-[#0D95FE] text-[#00284D] font-bold shadow-md'
                        : isPassed
                        ? 'bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/30'
                        : 'text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span>{isPassed ? '✓' : `0${s}`}</span>
                    <span className="hidden sm:inline">
                      {s === 1 ? 'Download' : s === 2 ? 'Verify' : s === 3 ? 'Fund' : 'Transact'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Global Continuous Scroll Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-[#05112A] border border-[#14294F] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0D95FE] via-[#00DF8F] to-[#F2A93B]"
              style={{ width: `${Math.min(Math.max(progress * 100, 3), 100)}%` }}
            />
          </div>
        </div>

        {/* MIDDLE SECTION: Interactive Two-Column Stage */}
        <div className="max-w-7xl mx-auto w-full my-auto py-3 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Sequential Step Cards with Progress Highlight */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3 relative">
            {/* Glowing Vertical Connector Line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[#14294F] -z-0 hidden sm:block">
              <motion.div
                className="w-full bg-[#0D95FE]"
                style={{ height: `${Math.min(Math.max(progress * 100, 5), 100)}%` }}
              />
            </div>

            {steps.map((item) => {
              const isCurrent = activeStep === item.num;
              const isDone = activeStep > item.num;
              const stepFraction = Math.min(Math.max((progress - (item.num - 1) * 0.25) / 0.25, 0), 1);

              return (
                <div
                  key={item.num}
                  onClick={() => handleStepClick(item.num)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col gap-1.5 ${
                    isCurrent
                      ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-xl shadow-[#0D95FE]/10 scale-[1.01]'
                      : isDone
                      ? 'bg-[#05112A]/85 border-[#00DF8F]/40 opacity-85 hover:opacity-100'
                      : 'bg-[#05112A]/40 border-[#14294F] opacity-45 hover:opacity-75'
                  }`}
                >
                  {/* Step inner progress bar synced to scroll within this step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#0D95FE] to-[#00DF8F]"
                      style={{ width: `${stepFraction * 100}%` }}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs font-mono shrink-0 transition-colors ${
                          isCurrent
                            ? 'bg-[#0D95FE] text-[#00284D] shadow-md shadow-[#0D95FE]/30'
                            : isDone
                            ? 'bg-[#00DF8F] text-[#003825]'
                            : 'bg-[#14294F] text-[#A8BBD6]'
                        }`}
                      >
                        {isDone ? '✓' : `0${item.num}`}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">
                          {item.tag}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-white leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] text-[10px] font-mono font-bold uppercase shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-ping" />
                        <span>Active Step</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed pl-10 sm:pl-11">
                    {item.desc}
                  </p>

                  {/* Real Human User Endorsement Pill (Grounding the Brand in Reality) */}
                  <div className="ml-10 sm:ml-11 mt-1 flex items-center gap-2.5 p-1.5 sm:p-2 rounded-xl bg-[#020B1D]/80 border border-[#14294F]/80">
                    <img
                      src={item.user.photo}
                      alt={item.user.name}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-[#00DF8F]/50 shrink-0"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[11px] overflow-hidden">
                      <span className="font-semibold text-white truncate">{item.user.name}</span>
                      <span className="text-[#00DF8F] font-mono text-[10px] hidden sm:inline">({item.user.location})</span>
                      <span className="text-[#A8BBD6] italic truncate">"{item.user.comment}"</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Action CTAs */}
            <div className="pt-1 pl-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenWaitlist('business')}
                className="px-5 py-2.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00284D] hover:text-[#003825] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Open an Account</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenDownloadApp}
                className="px-4 py-2.5 rounded-full bg-[#0A1B3D] hover:bg-[#14294F] text-white border border-[#14294F] font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Download App</span>
                <span className="material-symbols-outlined text-[16px]">download</span>
              </button>

              {onOpenWhatsApp && (
                <button
                  onClick={onOpenWhatsApp}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#A8BBD6] hover:text-[#00DF8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">chat</span>
                  <span>WhatsApp Banking</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Smartphone synced to Active Step with Real People & Hardware */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-64 sm:w-72 lg:w-80 h-[440px] sm:h-[470px] rounded-[44px] p-[6px] bg-gradient-to-b from-[#2A4374] via-[#142A58] to-[#0A1B3D] shadow-2xl border-2 border-[#14294F]">
              <div className="w-full h-full rounded-[38px] bg-[#020B1D] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-inner text-white">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7B9CD2] pb-2 border-b border-[#14294F]">
                  <span>9:41</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700" />
                  <span>4G ●●●</span>
                </div>

                {/* Animated Screen Content Synced to Active Scroll Step */}
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step-1-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center gap-3 py-1"
                    >
                      {/* Customer Photo Profile in context */}
                      <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#0A1B3D] border border-[#14294F]">
                        <img
                          src="/merchants/shopper.jpg"
                          alt="Amina Bello"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0D95FE] shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white leading-tight">Amina Bello</span>
                          <span className="text-[10px] text-[#00DF8F] font-mono">Personal Account Holder</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">Step 1 · Phone &amp; OTP</span>
                        <h5 className="font-bold text-sm text-white mt-0.5">Enter Nigerian Number</h5>
                        <p className="text-[11px] text-[#A8BBD6]">Instant 6-digit WhatsApp or SMS code.</p>
                      </div>

                      <div className="p-2 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center gap-2">
                        <span className="text-xs font-bold text-[#00DF8F]">🇳🇬 +234</span>
                        <span className="text-xs font-mono text-white">803 123 4567</span>
                      </div>

                      <div className="flex gap-1.5 justify-center">
                        {[4, 9, 2, 0, '•', '•'].map((digit, i) => (
                          <div
                            key={i}
                            className="w-7 h-8 rounded-lg bg-[#0E1D3B] border border-[#0D95FE] flex items-center justify-center font-mono font-bold text-xs text-[#0D95FE]"
                          >
                            {digit}
                          </div>
                        ))}
                      </div>

                      <div className="p-1.5 rounded-xl bg-emerald-950/60 border border-[#00DF8F]/50 text-center">
                        <span className="text-[10px] font-mono text-[#00DF8F] font-bold">
                          ✓ OTP VERIFIED IN 1.2s
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center gap-2.5 py-1 text-center"
                    >
                      {/* Realistic Biometric Selfie Viewfinder with Actual Human Photo */}
                      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#00DF8F] shadow-lg shadow-[#00DF8F]/20">
                        <img
                          src="/merchants/fatima.jpg"
                          alt="Fatima Al-Hassan - Face Match"
                          className="w-full h-full object-cover object-top"
                        />
                        <div
                          className="absolute inset-0 border-2 border-dashed border-[#00DF8F] rounded-full animate-spin"
                          style={{ animationDuration: '10s' }}
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-[#00DF8F] text-[#003825] text-[8px] font-mono font-black py-0.5">
                          ✓ 99.4% LIVENESS MATCH
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">Step 2 · Instant KYC</span>
                        <h5 className="font-bold text-sm text-white mt-0.5">BVN &amp; Face Match</h5>
                        <p className="text-[11px] text-[#A8BBD6]">Direct automated CBN NIBSS check.</p>
                      </div>

                      <div className="p-2 rounded-xl bg-[#0A1B3D] border border-[#00DF8F] flex items-center justify-between text-xs">
                        <span className="text-white font-medium">BVN Identity Match</span>
                        <span className="text-[#00DF8F] font-bold">✓ PASSED</span>
                      </div>

                      <div className="p-1.5 rounded-xl bg-[#020F2E] border border-[#0D95FE]/50 text-center">
                        <span className="text-[10px] font-mono text-[#0D95FE] font-bold">
                          TIER 3 DAILY LIMIT: ₦5,000,000
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step-3-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center gap-2.5 py-1"
                    >
                      {/* Merchant Shop Profile in context */}
                      <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#0A1B3D] border border-[#14294F]">
                        <img
                          src="/merchants/emeka.jpg"
                          alt="Emeka Chukwu"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0D95FE] shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white leading-tight">Emeka Gadgets World</span>
                          <span className="text-[10px] text-[#00DF8F] font-mono">Ikeja, Lagos</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">Step 3 · Instant Funding</span>
                        <h5 className="font-bold text-sm text-white mt-0.5">Dedicated NUBAN Created</h5>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-0.5">
                        <span className="text-[9px] text-[#7B9CD2] uppercase font-mono">Axoora Business NUBAN</span>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold font-mono text-white">9012345678</span>
                          <span className="text-[10px] text-[#00DF8F] font-bold uppercase">Ready</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-emerald-950/80 border border-[#00DF8F] text-center">
                        <span className="text-[10px] text-white font-bold block">First Inflow Settled in 0.9s</span>
                        <span className="text-sm font-black text-[#00DF8F] font-mono">+ ₦50,000.00</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 4 && (
                    <motion.div
                      key="step-4-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center gap-2.5 py-1"
                    >
                      {/* Mart Manager Profile in context */}
                      <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#0A1B3D] border border-[#14294F]">
                        <img
                          src="/merchants/tunde.jpg"
                          alt="Tunde Bakare"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F2A93B] shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white leading-tight">Tunde Bakare</span>
                          <span className="text-[10px] text-[#00DF8F] font-mono">Fresh Mart · Lekki Phase 1</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#F2A93B] uppercase font-bold">Step 4 · Transact &amp; Scale</span>
                        <h5 className="font-bold text-sm text-white mt-0.5">Card Active &amp; POS Dispatched</h5>
                      </div>

                      <div className="p-2 rounded-xl bg-[#0A1B3D] border border-[#0D95FE] flex items-center justify-between text-xs">
                        <span className="text-white font-medium">Virtual Dollar &amp; Naira Card</span>
                        <span className="text-[#0D95FE] font-bold">ACTIVE</span>
                      </div>

                      <div className="p-2 rounded-xl bg-[#0A1B3D] border border-[#00DF8F] flex items-center justify-between text-xs">
                        <span className="text-white font-medium">Apex Dual-eSIM POS</span>
                        <span className="text-[#00DF8F] font-bold">DISPATCHED (48H)</span>
                      </div>

                      <div className="p-1.5 rounded-xl bg-emerald-950/60 border border-[#00DF8F] text-center">
                        <span className="text-[10px] font-mono text-[#00DF8F] font-bold">
                          ✓ ALL ONBOARDING STEPS COMPLETE
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Phone Home Indicator Bar */}
                <div className="w-24 h-1 rounded-full bg-slate-600 self-center mt-2" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom subtle progress hint */}
        <div className="max-w-7xl mx-auto w-full pt-2 flex items-center justify-between text-[11px] text-[#A8BBD6]/70 border-t border-[#14294F]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
            <span>Step {activeStep} of 4 · Keep scrolling to advance sequence</span>
          </div>
          <span className="font-mono text-[10px] text-[#00DF8F]">
            {activeStep === 4 ? '✓ All steps completed — ready to scroll' : `${Math.round(progress * 100)}% viewed`}
          </span>
        </div>

      </div>
    </section>
  );
};
