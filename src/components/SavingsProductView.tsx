'use client';

import React, { useState } from 'react';
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
  PieChart,
  X,
  Sparkles,
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

  // Modal for "See Statement" profit breakdown
  const [statementOpen, setStatementOpen] = useState(false);

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

          {/* Right Column: Phone Mockup with Savings Plans */}
          <div className="lg:col-span-5 flex items-end justify-center self-end">
            <PhoneFrame width={320} height={580} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none font-sans relative overflow-hidden">
                <PhoneStatusBar />

                <div className="flex-1 flex flex-col justify-between pt-1">
                  <div>
                    {/* Top Bar: ← Savings */}
                    <div className="flex items-center gap-2 pt-1 pb-3">
                      <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                      <span className="text-[13.5px] font-bold text-[#161c22]">Savings</span>
                    </div>

                    {/* Total Saved Headline */}
                    <div className="text-center mt-2">
                      <div className="text-[32px] font-bold text-[#161c22] tracking-tight">
                        ₦85,000<span className="text-[20px] font-normal text-[#6c7a89]">.00</span>
                      </div>
                      <span className="text-[10px] text-[#6c7a89] font-medium block mt-0.5">
                        Saved · Profit-Sharing, No Interest
                      </span>
                    </div>

                    {/* Your Plans */}
                    <div className="mt-5">
                      <span className="text-[11px] font-bold text-[#161c22] block mb-2">
                        Your Plans
                      </span>

                      {/* Plan 1: Flexible */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between cursor-pointer transition hover:border-[#dde3ea]"
                      >
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
                      </motion.div>

                      {/* Plan 2: Fixed · 12 Months */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="mt-2.5 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between cursor-pointer transition hover:border-[#dde3ea]"
                      >
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
                      </motion.div>
                    </div>

                    {/* Bottom Card: Profit Shared in August */}
                    <div className="mt-5 bg-[#eef6fc] rounded-xl p-3.5 border border-[#d8eaf8]">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#0976da] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Coins className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold text-[#0976da]">
                            ₦2,000 Profit Shared in August
                          </div>
                          <div className="text-[9px] text-[#4c5866] mt-0.5">
                            See where it came from.
                          </div>

                          <button
                            type="button"
                            onClick={() => setStatementOpen(true)}
                            className="mt-2.5 px-3 py-1 bg-white border border-[#dde3ea] rounded-full text-[9px] font-bold text-[#161c22] hover:bg-slate-50 transition shadow-2xs cursor-pointer flex items-center gap-1"
                          >
                            <span>See Statement</span>
                            <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sharia Compliance Badge */}
                  <div className="pt-2 text-center">
                    <span className="text-[8.5px] text-[#8492a6]">
                      Certified Mudarabah & Murabaha · Non-Interest
                    </span>
                  </div>
                </div>

                {/* Profit Statement Slide-up Sheet */}
                <AnimatePresence>
                  {statementOpen && (
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                      className="absolute inset-x-0 bottom-0 top-10 bg-white rounded-t-2xl p-4 shadow-2xl flex flex-col justify-between z-30 border-t border-[#edf1f7]"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#edf1f7]">
                          <span className="text-[12.5px] font-bold text-[#161c22]">
                            August Profit Statement
                          </span>
                          <button
                            type="button"
                            onClick={() => setStatementOpen(false)}
                            className="text-[#8492a6] hover:text-[#161c22] cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7]">
                          <div className="text-[9.5px] text-[#6c7a89]">Total Profit Earned</div>
                          <div className="text-[20px] font-bold text-[#0f6b45] mt-0.5">
                            +₦2,000.00
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-[10px] font-bold text-[#6c7a89] uppercase tracking-wider block mb-2">
                            Investments That Funded It
                          </span>
                          <div className="space-y-2 text-[10px]">
                            <div className="p-2 rounded-lg bg-[#f7f9fb] border border-[#edf1f7] flex justify-between items-center">
                              <div>
                                <div className="font-semibold text-[#161c22]">
                                  Sovereign Sukuk Fund
                                </div>
                                <div className="text-[8px] text-[#6c7a89]">Federal Gov of Nigeria</div>
                              </div>
                              <span className="font-bold text-[#0f6b45]">50% (₦1,000)</span>
                            </div>

                            <div className="p-2 rounded-lg bg-[#f7f9fb] border border-[#edf1f7] flex justify-between items-center">
                              <div>
                                <div className="font-semibold text-[#161c22]">
                                  Agricultural Trade Murabaha
                                </div>
                                <div className="text-[8px] text-[#6c7a89]">Grain Warehousing</div>
                              </div>
                              <span className="font-bold text-[#0f6b45]">30% (₦600)</span>
                            </div>

                            <div className="p-2 rounded-lg bg-[#f7f9fb] border border-[#edf1f7] flex justify-between items-center">
                              <div>
                                <div className="font-semibold text-[#161c22]">
                                  Commodity Murabaha
                                </div>
                                <div className="text-[8px] text-[#6c7a89]">Short-Term Liquidity</div>
                              </div>
                              <span className="font-bold text-[#0f6b45]">20% (₦400)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStatementOpen(false)}
                        className="w-full py-2 bg-[#0976da] text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          {/* Left Column: Phone Mockup showing Circles */}
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-10 flex items-center justify-center">
            <PhoneFrame width={310} height={540} className="shadow-[0_20px_45px_rgba(2,15,46,0.2)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none font-sans">
                <PhoneStatusBar />

                <div>
                  {/* Top Bar: ← Circles */}
                  <div className="flex items-center gap-2 pt-1 pb-3">
                    <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                    <span className="text-[13.5px] font-bold text-[#161c22]">Circles</span>
                  </div>

                  {/* Section: Your Circles */}
                  <div className="mt-2">
                    <span className="text-[10px] font-bold text-[#6c7a89] uppercase tracking-wider block mb-2">
                      Your Circles
                    </span>

                    {/* Circle 1: Lagos Traders Circle */}
                    <div className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between">
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
                      <span className="text-[9.5px] font-semibold text-[#6c7a89]">Due Fri</span>
                    </div>

                    {/* Circle 2: Sisters' Savings (Your Turn) */}
                    <div className="mt-2.5 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#ebf5ff] text-[#0976da] flex items-center justify-center">
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
                      <span className="px-2 py-0.5 rounded-full bg-[#ebf5ff] text-[9px] font-bold text-[#0976da]">
                        Your Turn
                      </span>
                    </div>
                  </div>

                  {/* Section: Waiting to Fill */}
                  <div className="mt-5">
                    <span className="text-[10px] font-bold text-[#6c7a89] uppercase tracking-wider block mb-2">
                      Waiting to Fill
                    </span>

                    {/* Circle 3: Ikeja Flat Mates */}
                    <div className="bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] flex items-center justify-between">
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
                      <span className="text-[9px] font-semibold text-[#6c7a89]">
                        6 of 8 Joined
                      </span>
                    </div>
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
