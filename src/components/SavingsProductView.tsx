'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Lock,
  RefreshCw,
  Coins,
  FileText,
  Clock,
  Users,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  UserPlus,
  Landmark,
  ArrowUpRight,
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { StoreButtons, PhoneFrame, PhoneStatusBar, CheckBullet } from './home/shared';

interface SavingsProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const SavingsProductView: React.FC<SavingsProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // ─── Hero Phone: Auto-switching between Overview and Statement Breakdown ───
  const [heroPhoneView, setHeroPhoneView] = useState<'overview' | 'statement'>('overview');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroPhoneView((prev) => (prev === 'overview' ? 'statement' : 'overview'));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // ─── Circles Phone: Live member count & turn animation loop ───
  const [joinedCount, setJoinedCount] = useState(6);
  const [activeCircleTurn, setActiveCircleTurn] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setJoinedCount((prev) => (prev === 6 ? 7 : 6));
      setActiveCircleTurn((prev) => (prev === 4 ? 5 : 4));
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Save on Your Own. Or Save Together. (Image 1)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Copy & Store Buttons */}
          <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
            <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block">
              Savings and Ajo
            </span>

            <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
              Save on Your Own. Or Save Together.
            </h1>

            <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
              Non-interest plans that show their working, and Ajo circles that keep the record.
            </p>

            <StoreButtons
              tone="onBlue"
              onApp={onOpenDownloadApp ?? (() => {})}
              onWhatsApp={onOpenWhatsApp}
            />
          </div>

          {/* Right Column: Phone Mockup with Animated Savings Plans */}
          <div className="lg:col-span-5 flex items-end justify-center self-end">
            <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none font-sans relative overflow-hidden">
                <PhoneStatusBar />

                <div className="flex-1 flex flex-col justify-between pt-1">
                  <AnimatePresence mode="wait">
                    {/* ──────────────────────────────────────────────────
                        STATE A: Savings Overview
                        ────────────────────────────────────────────────── */}
                    {heroPhoneView === 'overview' ? (
                      <motion.div
                        key="savings-overview"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          {/* Top Bar: ← Savings + Tab toggle indicator */}
                          <div className="flex items-center justify-between pt-1 pb-2">
                            <div className="flex items-center gap-2">
                              <ArrowLeft className="w-4 h-4 text-[#161c22]" />
                              <span className="text-[13.5px] font-bold text-[#161c22]">Savings</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setHeroPhoneView('statement')}
                              className="text-[9.5px] font-bold text-[#0976da] bg-[#eef6fc] px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#dcebf9] transition flex items-center gap-1"
                            >
                              <span>Statement</span>
                              <ChevronRight className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Total Saved Headline with animated profit ping */}
                          <div className="text-center mt-2 relative">
                            <motion.div
                              initial={{ scale: 0.96 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="text-[32px] font-bold text-[#161c22] tracking-tight"
                            >
                              ₦85,000<span className="text-[20px] font-normal text-[#6c7a89]">.00</span>
                            </motion.div>
                            <div className="flex items-center justify-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-[#6c7a89] font-medium">
                                Saved · Profit-Sharing, No Interest
                              </span>
                              <motion.span
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-[#e6f4ea] text-[8px] font-bold text-[#137333]"
                              >
                                +₦2k shared
                              </motion.span>
                            </div>
                          </div>

                          {/* Your Plans */}
                          <div className="mt-5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-bold text-[#161c22]">Your Plans</span>
                              <span className="text-[9px] text-[#6c7a89]">2 Active</span>
                            </div>

                            {/* Plan 1: Flexible */}
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex flex-col gap-2 cursor-pointer transition hover:border-[#dde3ea]"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[#ebf5ff] text-[#0976da] flex items-center justify-center font-bold">
                                    <RefreshCw className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-[11.5px] font-bold text-[#161c22]">Flexible</div>
                                    <div className="text-[9px] text-[#6c7a89]">Take it out anytime</div>
                                  </div>
                                </div>
                                <span className="font-bold text-[12px] text-[#161c22]">₦ 35,000.00</span>
                              </div>
                              {/* Animated Progress Tracker */}
                              <div className="w-full bg-[#e2e8f0] h-1 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '42%' }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                  className="h-full bg-[#0976da] rounded-full"
                                />
                              </div>
                            </motion.div>

                            {/* Plan 2: Fixed · 12 Months */}
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="mt-2.5 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex flex-col gap-2 cursor-pointer transition hover:border-[#dde3ea]"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[#f0f7f3] text-[#0f6b45] flex items-center justify-center font-bold">
                                    <Lock className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-[11.5px] font-bold text-[#161c22]">
                                      Fixed · 12 Months
                                    </div>
                                    <div className="text-[9px] text-[#6c7a89]">Unlocks 3 Aug 2027</div>
                                  </div>
                                </div>
                                <span className="font-bold text-[12px] text-[#161c22]">₦ 50,000.00</span>
                              </div>
                              {/* Animated Progress Tracker */}
                              <div className="w-full bg-[#e2e8f0] h-1 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '58%' }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="h-full bg-[#0f6b45] rounded-full"
                                />
                              </div>
                            </motion.div>
                          </div>

                          {/* Bottom Card: Profit Shared in August */}
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setHeroPhoneView('statement')}
                            className="mt-4 bg-[#eef6fc] rounded-xl p-3.5 border border-[#d8eaf8] cursor-pointer group"
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-[#0976da] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Coins className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1">
                                <div className="text-[11px] font-bold text-[#0976da] flex items-center justify-between">
                                  <span>₦2,000 Profit Shared in August</span>
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                </div>
                                <div className="text-[9px] text-[#4c5866] mt-0.5">
                                  See where it came from.
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHeroPhoneView('statement');
                                  }}
                                  className="mt-2.5 px-3 py-1 bg-white border border-[#dde3ea] rounded-full text-[9px] font-bold text-[#161c22] group-hover:bg-[#0976da] group-hover:text-white transition shadow-2xs cursor-pointer flex items-center gap-1"
                                >
                                  <span>See Statement</span>
                                  <ChevronRight className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Switch indicator dots */}
                        <div className="flex items-center justify-center gap-1.5 pt-3 pb-1">
                          <button
                            type="button"
                            onClick={() => setHeroPhoneView('overview')}
                            className="h-1.5 w-5 bg-[#0976da] rounded-full transition-all cursor-pointer"
                            aria-label="View overview"
                          />
                          <button
                            type="button"
                            onClick={() => setHeroPhoneView('statement')}
                            className="h-1.5 w-1.5 bg-[#d0d7de] hover:bg-[#a8b3cf] rounded-full transition-all cursor-pointer"
                            aria-label="View statement"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      /* ──────────────────────────────────────────────────
                          STATE B: Statement & Underlying Working Breakdown
                          ────────────────────────────────────────────────── */
                      <motion.div
                        key="savings-statement"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          {/* Top Bar: ← Return to Plans */}
                          <div className="flex items-center justify-between pt-1 pb-2">
                            <button
                              type="button"
                              onClick={() => setHeroPhoneView('overview')}
                              className="flex items-center gap-2 cursor-pointer text-[#161c22]"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span className="text-[13.5px] font-bold text-[#161c22]">
                                August Statement
                              </span>
                            </button>
                            <span className="text-[9px] font-bold text-[#0f6b45] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                              Credited
                            </span>
                          </div>

                          {/* Profit Header Box */}
                          <div className="mt-2 bg-[#f0f7f3] rounded-xl p-3 border border-[#d1e7dd] text-center">
                            <span className="text-[9px] uppercase tracking-wider text-[#0f6b45] font-semibold block">
                              Total Profit Distributed
                            </span>
                            <div className="text-[26px] font-extrabold text-[#0f6b45] mt-0.5 tracking-tight">
                              +₦2,000.00
                            </div>
                            <span className="text-[8.5px] text-[#4c5866] mt-0.5 block">
                              Paid directly to wallet on 31 Aug 2026
                            </span>
                          </div>

                          {/* Underlying Investment Allocation */}
                          <div className="mt-4">
                            <span className="text-[10px] font-bold text-[#161c22] uppercase tracking-wider block mb-2">
                              Investments That Funded It
                            </span>

                            {/* Asset 1: Sovereign Sukuk Fund */}
                            <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-[#edf1f7] mb-2">
                              <div className="flex justify-between items-center text-[10.5px]">
                                <span className="font-bold text-[#161c22]">Sovereign Sukuk Fund</span>
                                <span className="font-extrabold text-[#0f6b45]">50% · ₦1,000.00</span>
                              </div>
                              <div className="flex justify-between items-center text-[8.5px] text-[#6c7a89] mt-0.5">
                                <span>Federal Gov Infrastructure</span>
                                <span>Mudarabah</span>
                              </div>
                              <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mt-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '50%' }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                  className="h-full bg-[#0976da] rounded-full"
                                />
                              </div>
                            </div>

                            {/* Asset 2: Agricultural Trade Murabaha */}
                            <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-[#edf1f7] mb-2">
                              <div className="flex justify-between items-center text-[10.5px]">
                                <span className="font-bold text-[#161c22]">
                                  Agricultural Murabaha
                                </span>
                                <span className="font-extrabold text-[#0f6b45]">30% · ₦600.00</span>
                              </div>
                              <div className="flex justify-between items-center text-[8.5px] text-[#6c7a89] mt-0.5">
                                <span>Grain Storage Financing</span>
                                <span>Murabaha</span>
                              </div>
                              <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mt-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '30%' }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="h-full bg-[#0f6b45] rounded-full"
                                />
                              </div>
                            </div>

                            {/* Asset 3: Commodity Murabaha */}
                            <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-[#edf1f7]">
                              <div className="flex justify-between items-center text-[10.5px]">
                                <span className="font-bold text-[#161c22]">Commodity Murabaha</span>
                                <span className="font-extrabold text-[#0f6b45]">20% · ₦400.00</span>
                              </div>
                              <div className="flex justify-between items-center text-[8.5px] text-[#6c7a89] mt-0.5">
                                <span>Short-Term Liquidity</span>
                                <span>Murabaha</span>
                              </div>
                              <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mt-1.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '20%' }}
                                  transition={{ duration: 0.8, delay: 0.3 }}
                                  className="h-full bg-[#0256c4] rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Switch indicator dots */}
                        <div className="flex items-center justify-center gap-1.5 pt-3 pb-1">
                          <button
                            type="button"
                            onClick={() => setHeroPhoneView('overview')}
                            className="h-1.5 w-1.5 bg-[#d0d7de] hover:bg-[#a8b3cf] rounded-full transition-all cursor-pointer"
                            aria-label="View overview"
                          />
                          <button
                            type="button"
                            onClick={() => setHeroPhoneView('statement')}
                            className="h-1.5 w-5 bg-[#0976da] rounded-full transition-all cursor-pointer"
                            aria-label="View statement"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: WHAT NON-INTEREST ACTUALLY MEANS (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-2">
          What Non–Interest Actually Means
        </h2>
        <p className="text-[16px] text-[#4c5866] dark:text-slate-300 mb-8 max-w-xl">
          No promised rate, and no pretending. You see where the profit came from.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: A Range, Not a Rate */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-xs min-h-[240px] hover:shadow-md transition">
            <div>
              <Coins className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                A Range, Not a Rate
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Plans show an expected profit range. Never a figure we cannot stand behind.
              </p>
            </div>
          </div>

          {/* Card 2: The Working, Shown */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-xs min-h-[240px] hover:shadow-md transition">
            <div>
              <FileText className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                The Working, Shown
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Each statement lists which investments your profit came from.
              </p>
            </div>
          </div>

          {/* Card 3: Take It Out Early */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-xs min-h-[240px] hover:shadow-md transition">
            <div>
              <Clock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Take It Out Early
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                You see the exact amount you will receive before you confirm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: AJO AND PAY CIRCLE · Ajo, Without the Notebook (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 lg:gap-16 items-center">
          {/* Left Column: Phone Mockup showing Circles with Live Animations */}
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-10 flex items-center justify-center">
            <PhoneFrame width={310} height={540} className="shadow-[0_20px_45px_rgba(2,15,46,0.2)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none font-sans">
                <PhoneStatusBar />

                <div>
                  {/* Top Bar: ← Circles */}
                  <div className="flex items-center justify-between pt-1 pb-3">
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                      <span className="text-[13.5px] font-bold text-[#161c22]">Circles</span>
                    </div>
                    <span className="text-[9px] font-bold text-[#0976da] bg-[#eef6fc] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live Sync</span>
                    </span>
                  </div>

                  {/* Section: Your Circles */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#6c7a89] uppercase tracking-wider block">
                        Your Circles
                      </span>
                      <span className="text-[9px] text-[#6c7a89]">Automatic Escrow</span>
                    </div>

                    {/* Circle 1: Lagos Traders Circle */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between cursor-pointer transition hover:border-[#dde3ea]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#f0f2f5] text-[#4c5866] flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11.5px] font-bold text-[#161c22]">
                            Lagos Traders Circle
                          </div>
                          <div className="text-[8.5px] text-[#6c7a89]">
                            8 members · ₦10,000 monthly
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9.5px] font-semibold text-[#6c7a89] block">
                          Due Fri
                        </span>
                        <span className="text-[8px] text-emerald-600 font-medium">
                          7 of 8 paid
                        </span>
                      </div>
                    </motion.div>

                    {/* Circle 2: Sisters' Savings (Your Turn) with animated pulse */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-2.5 bg-[#f7f9fb] rounded-xl p-3 border border-[#0976da]/30 bg-gradient-to-r from-[#f7f9fb] to-[#f0f7ff] flex items-center justify-between cursor-pointer transition relative overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#ebf5ff] text-[#0976da] flex items-center justify-center shadow-xs">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11.5px] font-bold text-[#161c22]">
                            Sisters&apos; Savings
                          </div>
                          <div className="text-[8.5px] text-[#6c7a89]">
                            6 members · ₦5,000 weekly
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-0.5">
                        <motion.span
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                          className="px-2.5 py-0.5 rounded-full bg-[#0976da] text-[9px] font-bold text-white shadow-xs"
                        >
                          Your Turn
                        </motion.span>
                        <span className="text-[8px] text-[#0976da] font-medium">
                          Payout ₦30,000
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Section: Waiting to Fill with Dynamic Join Counter */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#6c7a89] uppercase tracking-wider block">
                        Waiting to Fill
                      </span>
                      <span className="text-[9px] text-[#0976da] font-semibold flex items-center gap-1">
                        <UserPlus className="w-2.5 h-2.5" />
                        <span>Filling Fast</span>
                      </span>
                    </div>

                    {/* Circle 3: Ikeja Flat Mates */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex flex-col gap-2 cursor-pointer transition hover:border-[#dde3ea]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#f0f2f5] text-[#8492a6] flex items-center justify-center">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11.5px] font-bold text-[#161c22]">
                              Ikeja Flat Mates
                            </div>
                            <div className="text-[8.5px] text-[#6c7a89]">₦20,000 monthly</div>
                          </div>
                        </div>

                        {/* Animated Member Count Badge */}
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={joinedCount}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-[9px] font-semibold text-[#0976da] bg-[#ebf5ff] px-2 py-0.5 rounded-full"
                          >
                            {joinedCount} of 8 Joined
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      {/* Filling progress bar */}
                      <div className="w-full bg-[#e2e8f0] h-1 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: joinedCount === 7 ? '87.5%' : '75%' }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full bg-[#0976da] rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[9px] text-[#8492a6]">
                    Rotational payouts guaranteed by Axoora Smart Escrow
                  </span>
                </div>
              </div>
            </PhoneFrame>
          </div>

          {/* Right Column: Copy & Bullets */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              Ajo and Pay Circle
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08] mb-4">
              Ajo, Without the Notebook.
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#4c5866] dark:text-slate-300 max-w-xl mb-7">
              Run a circle with people you trust. Everyone sees who has paid, who is next, and what the payout will be.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              {[
                'Everyone sees the same record',
                'Who is next, and when',
                'Contributions tracked automatically',
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
          SECTION 4: Closing CTA · Start a Plan, or Start a Circle (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Start a Plan, or Start a Circle.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Both live in the same app, on the same balance.
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
