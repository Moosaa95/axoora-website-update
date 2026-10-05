'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ScreenType } from '../types';
import { COMPANY_INFO, FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { FaqAccordionItem } from './FaqAccordionItem';
import { BlogArticlesCarousel } from './BlogArticlesCarousel';

interface PersonalProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const PersonalProductView: React.FC<PersonalProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Interactive phone preview tab toggle
  const [activeFeatureTab, setActiveFeatureTab] = useState<'cards' | 'account' | 'payments' | 'savings' | 'paycircle' | 'rewards'>('cards');

  // Interactive Onboarding Steps Active Tab (1 to 4)
  const [activeStep, setActiveStep] = useState<number>(1);

  // FAQ Accordion State
  const personalFaqs = FAQ_LIST.filter(
    (faq) => faq.category === 'Personal & Cards' || faq.category === 'Save and Earn' || faq.category === 'Paycircle' || faq.category === 'Security'
  ).slice(0, 6);
  const [openFaqId, setOpenFaqId] = useState<string | null>(personalFaqs[0]?.id || null);

  // Stagger animation container & child variants for smooth hero entry
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const heroVisualVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.35,
      },
    },
  };

  // Rewards simulation toggle
  const [pointsCount, setPointsCount] = useState<number>(14250);
  const [pointsClaimed, setPointsClaimed] = useState<boolean>(false);

  // Onboarding Step Metadata
  const onboardingSteps = [
    {
      num: 1,
      title: 'Fill in your details and verify phone',
      desc: 'Download Axoora on iOS, Android or launch directly inside WhatsApp. Enter your phone number and confirm with instant 6-digit WhatsApp or SMS OTP.',
      screenPreview: 'phone-verify',
      badge: 'Step 01 // 30 Seconds',
    },
    {
      num: 2,
      title: '30-second BVN & Selfie Face Match',
      desc: 'Provide your BVN for direct NIBSS verification and snap a quick 3D liveness selfie. Instant Tier-3 account limit unlocked with zero paper affidavits.',
      screenPreview: 'bvn-verify',
      badge: 'Step 02 // Automated KYC',
    },
    {
      num: 3,
      title: 'Fund your dedicated NUBAN',
      desc: 'Receive your dedicated 10-digit Nigerian NUBAN immediately. Fund via instant bank transfer from any commercial or digital bank in Nigeria.',
      screenPreview: 'fund-account',
      badge: 'Step 03 // Sub-2s Settlement',
    },
    {
      num: 4,
      title: "You're done! Card active & ready",
      desc: 'Activate your free virtual Naira & Dollar cards immediately. Request physical Mastercard or debit card delivered to your doorstep within 48 hours.',
      screenPreview: 'card-active',
      badge: 'Step 04 // Instant Card Access',
    },
  ];

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: "Get the card that works." WITH TOP CONVERTING BLUE CURVE */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#14294F] bg-gradient-to-b from-[#020F2E] via-[#02143D] to-[#020F2E] overflow-hidden">
        {/* Topographic organic waves in background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0D95FE_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#0D95FE]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00DF8F]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Value Proposition with Staggered Entrance */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          >
            {/* Pill */}
            <motion.div
              variants={heroItemVariants}
              className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-xs font-mono font-medium text-[#00DF8F]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
              <span>LICENSED BY CENTRAL BANK OF NIGERIA // NDIC INSURED</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F2F5F9] leading-[1.08] [text-wrap:balance]"
            >
              Get the card <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F5F9] via-[#00DF8F] to-[#0D95FE]">
                that works.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroItemVariants}
              className="text-base sm:text-lg text-[#A8BBD6] max-w-xl leading-relaxed"
            >
              Brought to you by the technology that powers Nigeria's most trusted merchants. Axoora offers you a reliable personal banking experience with instant NIBSS settlement, 0% transfer fees, and debit cards that never decline.
            </motion.p>

            {/* App Store Download & WhatsApp CTA Buttons */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full"
            >
              <button
                onClick={() => (onOpenDownloadApp ? onOpenDownloadApp() : onOpenWaitlist('personal'))}
                className="px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.04-.52 2.67-1.27" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-neutral-400 leading-tight">Get it on</div>
                  <div className="font-semibold text-xs leading-tight">App Store</div>
                </div>
              </button>

              <button
                onClick={() => (onOpenDownloadApp ? onOpenDownloadApp() : onOpenWaitlist('personal'))}
                className="px-5 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.243-.29-.556-.29-.906V2.72c0-.35.107-.663.289-.906zm11.233 11.233l2.671-2.672-11.758-6.66 9.087 9.332zm0 1.906l-9.087 9.332 11.758-6.66-2.671-2.672zm1.043-1.043l3.074 1.741c.884.501.884 1.32 0 1.821l-3.074 1.741-2.128-2.128 2.128-2.128z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-neutral-400 leading-tight">Get it on</div>
                  <div className="font-semibold text-xs leading-tight">Google Play</div>
                </div>
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="px-5 py-3.5 rounded-2xl bg-[#00DF8F]/15 hover:bg-[#00DF8F]/25 text-[#00DF8F] border border-[#00DF8F]/40 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Bank on WhatsApp</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={heroItemVariants}
              className="flex items-center gap-4 pt-3 text-xs text-[#7B9CD2] font-mono"
            >
              <span className="flex items-center gap-1.5 text-[#00DF8F]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>CBN Licensed</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#0D95FE]">
                <span className="material-symbols-outlined text-[16px]">security</span>
                <span>NDIC Insured</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white">
                <span className="text-[#F2A93B]">★ 4.9</span>
                <span>Rating</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Mockup with Smooth Entrance */}
          <motion.div
            variants={heroVisualVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex justify-center relative"
          >
            {/* Background circular halo */}
            <div className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#0D95FE]/30 via-[#00DF8F]/20 to-[#0A1B3D] absolute -z-0 blur-2xl opacity-70" />

            {/* Floating Hero Composition */}
            <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
              {/* Smiling Customer Visual Card */}
              <div className="w-full relative rounded-3xl overflow-hidden border border-[#14294F] shadow-2xl bg-[#05112A]">
                <img
                  src="/merchants/shopper.jpg"
                  alt="Amina - Axoora Personal Banking User"
                  className="w-full h-80 sm:h-96 object-cover object-top scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020F2E] via-transparent to-transparent" />

                {/* Overlaid Floating Balance Pill (Yellow/Cream accent from video) */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 left-4 bg-[#FFF9E6] text-[#1E293B] px-4 py-3 rounded-2xl shadow-2xl border border-[#FDE68A] flex flex-col"
                >
                  <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold flex items-center justify-between">
                    <span>Available Balance</span>
                    <span className="material-symbols-outlined text-[14px] text-[#059669]">check_circle</span>
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0F172A] mt-0.5">
                    ₦100,050,000.00
                  </div>
                  <span className="text-[10px] text-[#059669] font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#059669] animate-pulse" />
                    Tier-3 Verified Account
                  </span>
                </motion.div>

                {/* Overlaid Action Button Widget (White Card on Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-md text-[#0F172A] p-2.5 rounded-2xl shadow-2xl border border-white flex flex-col gap-2 w-28"
                >
                  <div className="flex flex-col border-b border-neutral-100 pb-1.5">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase font-semibold">Quick Transfer</span>
                    <span className="text-xs font-bold text-[#0D95FE]">₦500,000</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] font-bold text-center">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-[#0D95FE] flex flex-col items-center">
                      <span className="material-symbols-outlined text-[14px]">send</span>
                      <span>Transfer</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00DF8F] flex flex-col items-center">
                      <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                      <span>Scan QR</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VALUE STATEMENT BANNER: "Bank with Axoora." */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-[#14294F] bg-[#030E26] text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
            THE RELIABILITY PROMISE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Bank with <span className="text-[#0D95FE]">Axoora.</span>
          </h2>
          <p className="text-base sm:text-xl text-[#A8BBD6] leading-relaxed max-w-2xl [text-wrap:balance]">
            Enjoy a transfer success rate of <span className="text-[#00DF8F] font-bold">99.98%</span> and experience seamless payment transfers. Need to pay some bills, buy a business item, or send money to family in Kaduna? Axoora transfers go through every single time. We mean it.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-3xl">
            <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F]">
              <div className="text-2xl font-black text-[#00DF8F] font-mono">&lt; 1.8s</div>
              <div className="text-xs text-[#A8BBD6] mt-0.5">Average Transfer Speed</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F]">
              <div className="text-2xl font-black text-[#0D95FE] font-mono">₦0.00</div>
              <div className="text-xs text-[#A8BBD6] mt-0.5">Account Maintenance Fee</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F]">
              <div className="text-2xl font-black text-[#F2A93B] font-mono">99.98%</div>
              <div className="text-xs text-[#A8BBD6] mt-0.5">Payment Success Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F]">
              <div className="text-2xl font-black text-[#00DF8F] font-mono">0% Riba</div>
              <div className="text-xs text-[#A8BBD6] mt-0.5">Halal Ethical Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ALTERNATING FEATURE SHOWCASE WITH ORGANIC BLUE CURVES & PHONE MOCKUPS */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-24">
        {/* --- PILLAR 1: Instant Debit Cards that always work --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start gap-5">
            <span className="px-3 py-1 rounded-full bg-[#0D95FE]/15 border border-[#0D95FE]/30 text-[#0D95FE] text-xs font-mono font-bold uppercase">
              Instant Debit Cards
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Instant Debit cards <br />
              <span className="text-[#00DF8F]">that always work.</span>
            </h3>
            <p className="text-base text-[#A8BBD6] leading-relaxed">
              If failed transfers aren’t your jam, we get it. Request an Axoora physical or virtual debit card and have it delivered directly to your home or office within 48 hours. Activate it in under 60 seconds on WhatsApp or the app, and start spending globally.
            </p>

            <div className="flex flex-col gap-2 w-full pt-1">
              <div className="flex items-center gap-3 text-xs text-[#F2F5F9]">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified</span>
                <span>Zero card maintenance fees, ever</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#F2F5F9]">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified</span>
                <span>Dual currency (Virtual USD for global tools + Naira for domestic POS)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#F2F5F9]">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified</span>
                <span>Instant lock/freeze toggle right from WhatsApp</span>
              </div>
            </div>

            <button
              onClick={() => onOpenWaitlist('personal')}
              className="mt-2 px-6 py-3 bg-[#0D95FE] hover:bg-[#0C84E4] text-[#002447] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Order Your Card →
            </button>
          </div>

          {/* Right Visual: Dual Card & Floating Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-tr from-[#05163D] via-[#092257] to-[#05112A] border border-[#14294F] shadow-2xl flex flex-col items-center">
              {/* Background ambient bubble */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#0D95FE]/20 blur-3xl pointer-events-none" />

              {/* Physical Card Mockup */}
              <div className="relative w-full max-w-sm h-48 sm:h-52 rounded-2xl p-6 bg-gradient-to-tr from-[#0047AB] via-[#0D95FE] to-[#00DF8F] text-white shadow-2xl flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest uppercase">Axoora Debit</span>
                  <span className="material-symbols-outlined text-2xl">contactless</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-lg tracking-widest font-black">5399 •••• •••• 8821</span>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-90">
                    <span>AMINAT BELLO</span>
                    <span>EXP: 09/29</span>
                  </div>
                </div>
              </div>

              {/* Instant Notification Chip */}
              <div className="mt-6 w-full p-3.5 rounded-2xl bg-[#020B1D]/90 border border-[#14294F] flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Card Dispatched to Ikeja</div>
                    <div className="text-[10px] text-[#7B9CD2] font-mono">Estimated delivery: 24-48 Hours</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#00DF8F] bg-[#00DF8F]/15 px-2 py-0.5 rounded-full">
                  FREE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- PILLAR 2: One app for all your banking needs (Alternating Row) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual: Interactive App Screen */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#05112A] border border-[#14294F] shadow-2xl flex flex-col gap-4">
              {/* Phone Status bar */}
              <div className="flex items-center justify-between text-xs text-[#7B9CD2] border-b border-[#14294F] pb-3 font-mono">
                <span className="text-white font-bold">9:41</span>
                <span>Axoora Personal Tier-3</span>
                <span className="text-[#00DF8F]">5G ●</span>
              </div>

              {/* Main Account Balance Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#002447] via-[#0A1B3D] to-[#002447] border border-[#0D95FE]/40 text-center flex flex-col gap-2">
                <span className="text-[11px] font-mono uppercase text-[#7B9CD2]">Active Account Balance</span>
                <div className="text-3xl font-black text-white font-mono">₦100,050,000.00</div>
                <div className="text-xs text-[#00DF8F] font-mono">0123456789 • Dedicated NUBAN</div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#020B1D] border border-[#14294F] hover:border-[#0D95FE] cursor-pointer flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#0D95FE] text-[20px]">send</span>
                  <span className="text-[11px] text-white">Transfer</span>
                </div>
                <div className="p-3 rounded-xl bg-[#020B1D] border border-[#14294F] hover:border-[#00DF8F] cursor-pointer flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">add_circle</span>
                  <span className="text-[11px] text-white">Top-up</span>
                </div>
                <div className="p-3 rounded-xl bg-[#020B1D] border border-[#14294F] hover:border-[#F2A93B] cursor-pointer flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#F2A93B] text-[20px]">receipt_long</span>
                  <span className="text-[11px] text-white">Pay Bills</span>
                </div>
                <div className="p-3 rounded-xl bg-[#020B1D] border border-[#14294F] hover:border-[#0D95FE] cursor-pointer flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[#0D95FE] text-[20px]">qr_code_scanner</span>
                  <span className="text-[11px] text-white">Scan QR</span>
                </div>
              </div>

              {/* Recent Activity Mini Feed */}
              <div className="p-3 rounded-xl bg-[#020B1D] border border-[#14294F] flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7B9CD2]">
                  <span>RECENT TRANSACTIONS</span>
                  <span className="text-[#00DF8F]">NIBSS Instant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Airtime Purchase (MTN)</span>
                  <span className="font-mono text-white">-₦2,000.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Transfer from Musa Garba</span>
                  <span className="font-mono text-[#00DF8F]">+₦150,000.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-5 order-1 lg:order-2">
            <span className="px-3 py-1 rounded-full bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00DF8F] text-xs font-mono font-bold uppercase">
              Personal Account
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              One app for all your <br />
              <span className="text-[#0D95FE]">banking needs.</span>
            </h3>
            <p className="text-base text-[#A8BBD6] leading-relaxed">
              Need to manage your money with ease? We know that your funds are deeply important to you, and we take security very seriously. Manage your balance, schedule group contributions, and pay utility bills from our clean, lightning-fast banking app.
            </p>

            <button
              onClick={() => onOpenWaitlist('personal')}
              className="mt-2 px-6 py-3 bg-[#00DF8F] hover:bg-[#00c77f] text-[#003825] font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Open Your Personal Account →
            </button>
          </div>
        </div>

        {/* --- PILLAR 3: Seamless transactions that always go through --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start gap-5">
            <span className="px-3 py-1 rounded-full bg-[#F2A93B]/15 border border-[#F2A93B]/30 text-[#F2A93B] text-xs font-mono font-bold uppercase">
              Payments &amp; Transfers
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Seamless transactions <br />
              <span className="text-[#00DF8F]">that always go through.</span>
            </h3>
            <p className="text-base text-[#A8BBD6] leading-relaxed">
              Enjoy Smooth Money Moves! Transfer funds to loved ones, buy airtime, settle DSTV or electricity bills effortlessly, or send money to market suppliers across Nigeria. At Axoora, we keep your financial happiness flowing.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="p-3.5 rounded-2xl bg-[#05112A] border border-[#14294F]">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00DF8F] text-[16px]">bolt</span>
                  <span>Direct NIBSS Link</span>
                </div>
                <p className="text-[11px] text-[#A8BBD6] mt-1">Zero intermediary hops. Sub-second verification.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#05112A] border border-[#14294F]">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#0D95FE] text-[16px]">support_agent</span>
                  <span>Instant Recipient Alert</span>
                </div>
                <p className="text-[11px] text-[#A8BBD6] mt-1">Auto SMS and WhatsApp receipts generated on fly.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Visual: Successful Transfer Notification */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#05112A] border border-[#14294F] shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#00DF8F] bg-[#00DF8F]/10 p-3 rounded-2xl border border-[#00DF8F]/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-ping" />
                  <span>TRANSACTION CLEARED</span>
                </span>
                <span>0.84 SECONDS</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#020B1D] border border-[#14294F] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7B9CD2]">Beneficiary Bank:</span>
                  <span className="text-xs font-bold text-white">First Bank of Nigeria</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7B9CD2]">Account Name:</span>
                  <span className="text-xs font-bold text-white">Chukwuemeka Okoye</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7B9CD2]">Session ID:</span>
                  <span className="font-mono text-[10px] text-[#A8BBD6]">99901426093012048</span>
                </div>
                <div className="pt-2 border-t border-[#14294F] flex items-center justify-between text-sm font-extrabold text-[#00DF8F]">
                  <span>Amount Credited:</span>
                  <span>₦240,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PILLAR 4: Save for your dreams (Halal Save & Earn) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#05112A] border border-[#14294F] shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#00DF8F] font-bold">ETHICAL SAVINGS VAULT</span>
                <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] text-[10px] font-mono">
                  100% RIBA FREE
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#020B1D] border border-[#14294F] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A8BBD6]">Target: New Shop Inventory</span>
                  <span className="text-xs font-bold text-[#00DF8F]">₦3,000,000</span>
                </div>
                <div className="w-full bg-[#05112A] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#00DF8F] h-full rounded-full w-[65%]" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold font-mono">₦1,950,000 Saved</span>
                  <span className="text-[#A8BBD6] font-mono">65% Achieved</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F]">
                  <span className="block text-[10px] text-[#7B9CD2]">Returns</span>
                  <span className="font-bold text-white text-xs">Asset Trade</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F]">
                  <span className="block text-[10px] text-[#7B9CD2]">Penalty Fee</span>
                  <span className="font-bold text-[#00DF8F] text-xs">₦0 Penalty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F]">
                  <span className="block text-[10px] text-[#7B9CD2]">Paycircle</span>
                  <span className="font-bold text-[#0D95FE] text-xs">Ajo Groups</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-start gap-5 order-1 lg:order-2">
            <span className="px-3 py-1 rounded-full bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00DF8F] text-xs font-mono font-bold uppercase">
              Save and Earn &bull; Paycircle
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Save for your dreams <br />
              <span className="text-[#00DF8F]">with zero interest debt.</span>
            </h3>
            <p className="text-base text-[#A8BBD6] leading-relaxed">
              Whether you dream of travel, buying a car, or owning a home, you can create a savings plan for your targets. Receive ethical, asset-backed profit shares that are strictly Islamic-compliant and free of compound debt. Plus, automate group Ajo thrift seamlessly with Paycircle.
            </p>

            <button
              onClick={() => onOpenWaitlist('personal')}
              className="mt-2 px-6 py-3 bg-[#00DF8F] hover:bg-[#00c77f] text-[#003825] font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Start Saving Today →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CAMPAIGN HERO BANNER: "Win Your Share of ₦100 Million" (Inspired by Video) */}
      {/* ========================================================================= */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#031B4D] via-[#052975] to-[#0A39A6] border border-[#0D95FE]/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#00DF8F]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text Box */}
          <div className="flex flex-col items-start gap-4 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/40 text-xs font-mono font-bold uppercase">
              <span>🎉 Axoora Pioneers Campaign 2026</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Win your share of <br />
              <span className="text-[#00DF8F]">₦100 Million.</span>
            </h3>
            <p className="text-base text-[#E2E8F0] leading-relaxed">
              It’s Millionaires season! Save consistently, transact with your Axoora card, and share your progress story for a chance to win cash prizes and all-expenses-paid trips.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onOpenWaitlist('personal')}
                className="px-6 py-3 bg-white hover:bg-neutral-100 text-[#00284D] font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Join Campaign →
              </button>
              <button
                onClick={onOpenWhatsApp}
                className="px-5 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Learn on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Image Feature Matching Video Thumbnail */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl max-w-sm">
              <img
                src="/merchants/tunde.jpg"
                alt="Excited Axoora Winner"
                className="w-72 sm:w-80 h-72 sm:h-80 object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs text-white">
                <span className="font-bold">₦100M+ Community Pool</span>
                <span className="text-[#00DF8F] font-mono">1,200+ Winners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OTHER BENEFITS 6-GRID SECTION: "More Reasons to Bank with Axoora" */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#14294F]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              THE AXOORA ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              More Reasons to Bank with Axoora
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A8BBD6] max-w-md">
            World-class consumer banking engineered from day one for the reality of Nigerian commerce and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#0D95FE]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center border border-[#0D95FE]/30">
              <span className="material-symbols-outlined text-[24px]">security</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">Advanced Safety Measures</span>
              <h4 className="text-lg font-bold text-white mt-1">State-of-the-Art Security</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                Axoora utilizes military-grade biometrics, dynamic 60-second rolling CVV, and encrypted tokenization to protect every kobo in your account from unauthorized access.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#00DF8F]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]/30">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">NDIC &amp; CBN Regulated</span>
              <h4 className="text-lg font-bold text-white mt-1">Protection and Peace of Mind</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                Your deposits are legally insured by the Nigeria Deposit Insurance Corporation (NDIC) and fully compliant with Central Bank of Nigeria digital banking standards.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#F2A93B]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/15 text-[#F2A93B] flex items-center justify-center border border-[#F2A93B]/30">
              <span className="material-symbols-outlined text-[24px]">trending_up</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#F2A93B] uppercase font-bold">Simple Limit Upgrade</span>
              <h4 className="text-lg font-bold text-white mt-1">Upgrade Your Limits Easily</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                Reach for the stars! Effortlessly upgrade your daily transfer limits to Tier-3 with automated BVN and facial liveness matching in under 30 seconds.
              </p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#0D95FE]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center border border-[#0D95FE]/30">
              <span className="material-symbols-outlined text-[24px]">credit_card</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">Virtual Dollar &amp; Naira</span>
              <h4 className="text-lg font-bold text-white mt-1">Extra Layer of Security</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                Stay secure while shopping online. Shop internationally with virtual cards without ever exposing your primary bank credentials or physical card PIN.
              </p>
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#00DF8F]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]/30">
              <span className="material-symbols-outlined text-[24px]">wifi_tethering</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">99.98% Reliability</span>
              <h4 className="text-lg font-bold text-white mt-1">Say Goodbye to Downtimes</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                Pay with confidence using a direct NIBSS core engine that never stalls on weekend rush hours or holiday shopping peak periods.
              </p>
            </div>
          </div>

          {/* Benefit 6 */}
          <div className="p-6 rounded-3xl bg-[#05112A] border border-[#14294F] hover:border-[#F2A93B]/60 transition-all flex flex-col justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/15 text-[#F2A93B] flex items-center justify-center border border-[#F2A93B]/30">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#F2A93B] uppercase font-bold">Anytime, Anywhere</span>
              <h4 className="text-lg font-bold text-white mt-1">Round-the-Clock Priority Support</h4>
              <p className="text-xs text-[#A8BBD6] leading-relaxed mt-2">
                We're always here to talk. Reach our dedicated Maitama support squad whenever you need to — by phone, WhatsApp chat, email, or in-app live chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STEP-BY-STEP ONBOARDING: "Open an account in 5 minutes" (From Video) */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#14294F]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
            ZERO STRESS ONBOARDING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            Open an account in 5 minutes
          </h2>
          <p className="text-xs sm:text-sm text-[#A8BBD6] mt-2">
            No endless paperwork, no bank branch queues, no physical affidavits.
          </p>
        </div>

        {/* 4 Interactive Steps Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {onboardingSteps.map((step) => {
            const isCurrent = activeStep === step.num;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-2xl shadow-[#0D95FE]/20'
                    : 'bg-[#05112A] border-[#14294F] hover:border-[#7B9CD2]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-base ${
                      isCurrent
                        ? 'bg-[#0D95FE] text-[#002447]'
                        : 'bg-[#020B1D] text-[#7B9CD2] border border-[#14294F]'
                    }`}
                  >
                    0{step.num}
                  </div>
                  <span className="text-[10px] font-mono text-[#00DF8F]">{step.badge}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-bold text-white">{step.title}</h4>
                  <p className="text-xs text-[#A8BBD6] leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-2 border-t border-[#14294F] flex items-center justify-between text-[11px] font-mono">
                  <span className={isCurrent ? 'text-[#0D95FE] font-bold' : 'text-[#7B9CD2]'}>
                    {isCurrent ? '● Active Step' : 'Click to inspect'}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#7B9CD2]">arrow_forward</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Store Download Row */}
        <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
          <button
            onClick={() => (onOpenDownloadApp ? onOpenDownloadApp() : onOpenWaitlist('personal'))}
            className="px-6 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 font-bold text-xs sm:text-sm flex items-center gap-3 cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.04-.52 2.67-1.27" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-neutral-400">Get it on</div>
              <div className="font-semibold text-xs">App Store</div>
            </div>
          </button>

          <button
            onClick={() => (onOpenDownloadApp ? onOpenDownloadApp() : onOpenWaitlist('personal'))}
            className="px-6 py-3 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 font-bold text-xs sm:text-sm flex items-center gap-3 cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.243-.29-.556-.29-.906V2.72c0-.35.107-.663.289-.906zm11.233 11.233l2.671-2.672-11.758-6.66 9.087 9.332zm0 1.906l-9.087 9.332 11.758-6.66-2.671-2.672zm1.043-1.043l3.074 1.741c.884.501.884 1.32 0 1.821l-3.074 1.741-2.128-2.128 2.128-2.128z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-neutral-400">Get it on</div>
              <div className="font-semibold text-xs">Google Play</div>
            </div>
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="px-6 py-3 rounded-2xl bg-[#00DF8F] hover:bg-[#00c77f] text-[#003825] font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Bank on WhatsApp</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BLOGS & ARTICLES CAROUSEL (Matched from Video) */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#14294F]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              KNOWLEDGE &amp; SECURITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Blogs &amp; Articles
            </h2>
            <p className="text-xs sm:text-sm text-[#A8BBD6] mt-1">
              Discover the roadmap to financial success! Stay updated with the latest tips and trends on our personal finance blog.
            </p>
          </div>
        </div>

        <BlogArticlesCarousel onNavigate={onNavigate} />
      </section>

      {/* ========================================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION (From Video) */}
      {/* ========================================================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#14294F]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
            CLEAR &amp; TRANSPARENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#A8BBD6] mt-1">
            Everything you need to know about personal banking, cards, and security with Axoora.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {personalFaqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id}
              item={faq}
              isOpen={openFaqId === faq.id}
              onToggle={() => setOpenFaqId((prev) => (prev === faq.id ? null : (faq.id || null)))}
              onOpenWhatsApp={onOpenWhatsApp}
              onNavigate={onNavigate}
              onOpenWaitlist={onOpenWaitlist}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM BLUE EXPERIENCE BANNER: "Experience banking that works" */}
      {/* ========================================================================= */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#003882] via-[#0D95FE] to-[#0055CC] text-center text-white relative overflow-hidden">
        {/* Ambient atmospheric shapes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Experience banking that works
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-xl leading-relaxed">
            Join thousands of smart Nigerians who bank without transaction failures, high fees, or annoying delays.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenWaitlist('personal')}
              className="px-8 py-4 rounded-full bg-white text-[#00284D] font-extrabold text-sm sm:text-base hover:bg-neutral-100 transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            >
              Open an Account →
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-7 py-4 rounded-full bg-[#020F2E] text-white border border-white/20 font-bold text-sm sm:text-base hover:bg-black/60 transition-all cursor-pointer"
            >
              Chat on WhatsApp
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-blue-100 font-mono pt-4 opacity-90">
            <span>✓ 2-Minute Onboarding</span>
            <span>•</span>
            <span>✓ No BVN Leakage</span>
            <span>•</span>
            <span>✓ 0% Transfer Fees</span>
          </div>
        </div>
      </section>
    </div>
  );
};
