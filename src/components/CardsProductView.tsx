'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Snowflake,
  CreditCard,
  Lock,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { StoreButtons, PhoneFrame, PhoneStatusBar, CheckBullet } from './home/shared';

interface CardsProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const CardsProductView: React.FC<CardsProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // State for which card is in front in the 3D Hero
  const [activeCard, setActiveCard] = useState<'naira' | 'dollar'>('naira');

  // Interactive freeze states for the in-app phone mockup
  const [nairaFrozen, setNairaFrozen] = useState(false);
  const [dollarFrozen, setDollarFrozen] = useState(false);

  // 3D Mouse Parallax motion for Hero Cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Two Cards. Two Balances. (Image 1)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px]">
          {/* Left Column: Copy & Store Buttons */}
          <div className="lg:col-span-6 pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
            <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block">
              Cards
            </span>

            <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
              Two Cards. Two Balances.
            </h1>

            <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
              Pay online in naira. Pay abroad in dollars, from a balance of its own.
            </p>

            <StoreButtons
              tone="onBlue"
              onApp={onOpenDownloadApp ?? (() => {})}
              onWhatsApp={onOpenWhatsApp}
            />
          </div>

          {/* Right Column: 3D Animated Floating Cards Showcase */}
          <div
            className="lg:col-span-6 flex items-center justify-center relative perspective-[1200px] py-12 lg:py-0 select-none cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveCard((prev) => (prev === 'naira' ? 'dollar' : 'naira'))}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-[340px] sm:w-[420px] h-[320px] sm:h-[360px] flex items-center justify-center transform-gpu"
            >
              {/* ──────────────────────────────────────────────────
                  DOLLAR CARD (Black Matte)
                  ────────────────────────────────────────────────── */}
              <motion.div
                animate={
                  activeCard === 'dollar'
                    ? {
                        zIndex: 30,
                        x: 20,
                        y: -10,
                        rotateZ: 4,
                        scale: 1.05,
                      }
                    : {
                        zIndex: 10,
                        x: 50,
                        y: -45,
                        rotateZ: 7,
                        scale: 0.96,
                      }
                }
                whileHover={{ scale: activeCard === 'dollar' ? 1.08 : 1.0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                className="absolute w-[300px] sm:w-[360px] h-[190px] sm:h-[225px] rounded-[22px] bg-[#161c22] border border-[#2d3748] text-white p-5 sm:p-6 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.55)] overflow-hidden transform-gpu"
              >
                {/* Holographic light sheen reflection */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.08) 100%)',
                  }}
                />

                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px]">
                      ▲
                    </div>
                    <span className="text-[17px] font-bold tracking-tight">axoora</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-[6px] bg-white/15 backdrop-blur-md text-white font-bold text-[10.5px] tracking-wider shadow-xs">
                    $ USD
                  </span>
                </div>

                <div className="text-[16px] sm:text-[18px] font-mono tracking-[0.22em] z-10 font-bold text-white/90">
                  4852 •••• •••• 9014
                </div>

                <div className="flex items-end justify-between z-10">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-wider text-white/50 block font-semibold">
                      Cardholder
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-medium text-white/90">
                      Adaeze N. Balogun
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8.5px] uppercase tracking-wider text-white/50 block font-semibold">
                      Balance
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight">
                      $ 248.10
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ──────────────────────────────────────────────────
                  NAIRA CARD (Blue Vibrant Gradient)
                  ────────────────────────────────────────────────── */}
              <motion.div
                animate={
                  activeCard === 'naira'
                    ? {
                        zIndex: 30,
                        x: -30,
                        y: 35,
                        rotateZ: -4,
                        scale: 1.05,
                      }
                    : {
                        zIndex: 10,
                        x: -50,
                        y: 40,
                        rotateZ: -6,
                        scale: 0.96,
                      }
                }
                whileHover={{ scale: activeCard === 'naira' ? 1.08 : 1.0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                className="absolute w-[300px] sm:w-[360px] h-[190px] sm:h-[225px] rounded-[22px] bg-gradient-to-r from-[#0066f5] to-[#04a1fe] text-white p-5 sm:p-6 flex flex-col justify-between shadow-[0_35px_70px_rgba(4,62,151,0.65)] overflow-hidden transform-gpu"
              >
                {/* Holographic glossy sheen */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      'linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.15) 100%)',
                  }}
                />

                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px]">
                      ▲
                    </div>
                    <span className="text-[17px] font-bold tracking-tight">axoora</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-[6px] bg-white text-[#043e97] font-bold text-[10.5px] tracking-wider shadow-xs">
                    ₦ NGN
                  </span>
                </div>

                <div className="text-[16px] sm:text-[18px] font-mono tracking-[0.22em] z-10 font-bold text-white">
                  5061 •••• •••• 4417
                </div>

                <div className="flex items-end justify-between z-10">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-wider text-white/60 block font-semibold">
                      Cardholder
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-medium text-white/95">
                      Adaeze N. Balogun
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8.5px] uppercase tracking-wider text-white/60 block font-semibold">
                      Balance
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight">
                      ₦ 112,430.00
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: WHAT THE CARDS DO · 4 Feature Cards (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-8">
          What the Cards Do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Freeze in a Tap */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Snowflake className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Freeze in a Tap
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Naira or Dollar, from the app. Unfreeze just as fast.
              </p>
            </div>
          </div>

          {/* Card 2: Its Own Dollar Balance */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <CreditCard className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Its Own Dollar Balance
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Your dollar spending never touches your naira.
              </p>
            </div>
          </div>

          {/* Card 3: Safe Online */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Lock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Safe Online
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Every online payment is approved by you, in the app.
              </p>
            </div>
          </div>

          {/* Card 4: Lost It? Replace It */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <RefreshCw className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Lost It? Replace It
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Report it, freeze it, and order a new one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: In the App · Freeze Either One in a Tap (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 lg:gap-16 items-center">
          {/* Left Column: Phone Frame showing both cards in the app */}
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-10 flex items-center justify-center">
            <PhoneFrame width={310} height={540} className="shadow-[0_20px_45px_rgba(2,15,46,0.2)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none font-sans">
                <PhoneStatusBar />

                <div>
                  {/* Top Bar: ← Cards */}
                  <div className="flex items-center gap-2 pt-1 pb-3">
                    <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                    <span className="text-[14px] font-bold text-[#161c22]">Cards</span>
                  </div>

                  {/* Card 1: Naira Card (Interactive Freeze Toggle) */}
                  <div className="relative group">
                    <motion.div
                      animate={{ opacity: nairaFrozen ? 0.6 : 1 }}
                      className="relative w-full h-[152px] rounded-[18px] bg-gradient-to-r from-[#0066f5] to-[#04a1fe] text-white p-4 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                      onClick={() => setNairaFrozen(!nairaFrozen)}
                    >
                      <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-bold tracking-tight">axoora</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-[4px] bg-white text-[#043e97] font-bold text-[9px] shadow-xs">
                          ₦ NGN
                        </span>
                      </div>

                      <div className="text-[13.5px] font-mono tracking-widest z-10 font-bold">
                        5061 •••• •••• 4417
                      </div>

                      <div className="flex items-end justify-between z-10">
                        <span className="text-[10px] font-medium text-white/95">
                          Adaeze N. Balogun
                        </span>
                        <span className="text-[13px] font-bold text-white tracking-tight">
                          ₦112,430.00
                        </span>
                      </div>

                      {/* Frozen Overlay */}
                      {nairaFrozen && (
                        <div className="absolute inset-0 bg-[#043e97]/75 backdrop-blur-[2px] flex items-center justify-center gap-2 z-20">
                          <Snowflake className="w-5 h-5 text-white animate-pulse" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Card Frozen
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <div className="flex justify-between items-center px-1 pt-1.5 text-[9.5px] text-[#6c7a89]">
                      <span>Naira debit card</span>
                      <button
                        type="button"
                        onClick={() => setNairaFrozen(!nairaFrozen)}
                        className="text-[#0976da] font-bold cursor-pointer hover:underline"
                      >
                        {nairaFrozen ? 'Tap to unfreeze' : 'Tap card to freeze'}
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Dollar Card (Interactive Freeze Toggle) */}
                  <div className="relative group mt-3">
                    <motion.div
                      animate={{ opacity: dollarFrozen ? 0.6 : 1 }}
                      className="relative w-full h-[152px] rounded-[18px] bg-[#161c22] border border-[#2b3542] text-white p-4 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                      onClick={() => setDollarFrozen(!dollarFrozen)}
                    >
                      <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-bold tracking-tight">axoora</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#f2f5f9] text-[#161c22] font-bold text-[9px] shadow-xs">
                          $ USD
                        </span>
                      </div>

                      <div className="text-[13.5px] font-mono tracking-widest z-10 font-bold">
                        4852 •••• •••• 9014
                      </div>

                      <div className="flex items-end justify-between z-10">
                        <span className="text-[10px] font-medium text-white/90">
                          Adaeze N. Balogun
                        </span>
                        <span className="text-[13px] font-bold text-white tracking-tight">
                          $ 248.10
                        </span>
                      </div>

                      {/* Frozen Overlay */}
                      {dollarFrozen && (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center gap-2 z-20">
                          <Snowflake className="w-5 h-5 text-white animate-pulse" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            Card Frozen
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <div className="flex justify-between items-center px-1 pt-1.5 text-[9.5px] text-[#6c7a89]">
                      <span>Dollar debit card</span>
                      <button
                        type="button"
                        onClick={() => setDollarFrozen(!dollarFrozen)}
                        className="text-[#0976da] font-bold cursor-pointer hover:underline"
                      >
                        {dollarFrozen ? 'Tap to unfreeze' : 'Tap card to freeze'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[9px] text-[#8492a6]">
                    Both cards protected by 3D Secure & Axoora Shield
                  </span>
                </div>
              </div>
            </PhoneFrame>
          </div>

          {/* Right Column: Copy & Bullets */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              In the App
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08] mb-4">
              Freeze Either One in a Tap.
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#4c5866] dark:text-slate-300 max-w-xl mb-7">
              Both cards live on one screen. Check the balance, see the last payment, and shut it down the moment something looks wrong.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              {[
                'One screen for both cards',
                'See the last payment on each',
                'Freeze, unfreeze, or replace',
              ].map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 text-[15px] font-medium text-[#161c22] dark:text-white"
                >
                  <CheckBullet />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: Closing CTA · Get a Card That Keeps Up (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Get a Card That Keeps Up.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Naira straight away. Dollar once you are Tier 3.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={onOpenDownloadApp ?? (() => {})}
            onWhatsApp={onOpenWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};

