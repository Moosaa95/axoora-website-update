'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Search,
  ChevronRight,
  Store,
  Phone,
  Wifi,
  Zap,
  Tv,
  Droplet,
  GraduationCap,
  Landmark,
  FileText,
} from 'lucide-react';
import { StoreButtons, PhoneFrame, PhoneStatusBar } from './shared';

export type PersonalNavHeroType = 'send' | 'cards' | 'savings' | 'ajo' | 'mall';

interface PersonalNavHeroProps {
  activeNav?: PersonalNavHeroType;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

const VERBS = [
  { id: 'send', label: 'Send.' },
  { id: 'pay', label: 'Pay.' },
  { id: 'save', label: 'Save.' },
  { id: 'spend', label: 'Spend.' },
];

export const PersonalNavHero: React.FC<PersonalNavHeroProps> = ({
  activeNav,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const [activeVerbIndex, setActiveVerbIndex] = useState(0);

  // Synchronize when activeNav prop changes from top header clicks
  useEffect(() => {
    if (!activeNav) return;
    if (activeNav === 'send') setActiveVerbIndex(0);
    else if (activeNav === 'mall') setActiveVerbIndex(1);
    else if (activeNav === 'savings') setActiveVerbIndex(2);
    else if (activeNav === 'cards') setActiveVerbIndex(3);
    else if (activeNav === 'ajo') setActiveVerbIndex(2);
  }, [activeNav]);

  // Automatic looping: One verb lights at a time, showing the screen behind that word
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVerbIndex((prev) => (prev + 1) % VERBS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12 font-['DM_Sans',sans-serif]">
      {/* ─── A1 Hero Container: Holds Still ─── */}
      <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column: Headline holds still, one verb lights at a time */}
        <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
          <h1 className="text-[64px] sm:text-[80px] lg:text-[92px] font-bold leading-[0.94] tracking-[-0.04em] select-none text-white!">
            {VERBS.map((verb, idx) => {
              const isLit = activeVerbIndex === idx;
              return (
                <span
                  key={verb.id}
                  onClick={() => setActiveVerbIndex(idx)}
                  className={`block transition-colors duration-300 cursor-pointer select-none ${
                    isLit ? 'text-white' : 'text-[#5d8ecf] hover:text-[#90b8ed]'
                  }`}
                >
                  <span className="relative inline-block">
                    {verb.label}
                    {isLit && (
                      <motion.span
                        layoutId="activeVerbUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[4px] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </span>
                </span>
              );
            })}
          </h1>

          {/* Subtitle holds completely still */}
          <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
            One account for all of it. In the app or on WhatsApp.
          </p>

          {/* Store Buttons hold completely still */}
          <StoreButtons
            tone="onBlue"
            onApp={onOpenDownloadApp ?? (() => {})}
            onWhatsApp={onOpenWhatsApp}
          />
        </div>

        {/* Right Column: Phone holds still, screen rotates behind the lit verb */}
        <div className="lg:col-span-5 flex items-end justify-center self-end">
          <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
            <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none relative overflow-hidden bg-white text-[#161c22]">
              <PhoneStatusBar />

              <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* ────────────────────────────────────────────────────────
                      SCREEN 1: "Send." -> Send to Chidinma
                      ──────────────────────────────────────────────────────── */}
                  {activeVerbIndex === 0 && (
                    <motion.div
                      key="screen-send"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-2 pt-0.5 pb-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[13.5px] font-bold text-[#161c22]">
                            Send to Chidinma
                          </span>
                        </div>

                        {/* Recipient Profile Card */}
                        <div className="flex items-center justify-between py-1.5 border-b border-[#edf1f7]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#043e97] text-white font-bold text-[10px] flex items-center justify-center">
                              CO
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-[#161c22] tracking-tight">
                                CHIDINMA OKAFOR
                              </div>
                              <div className="text-[8.5px] text-[#6c7a89]">
                                GTBank · 0123456789
                              </div>
                            </div>
                          </div>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>

                        {/* Amount */}
                        <div className="mt-4 text-center">
                          <span className="text-[10px] text-[#6c7a89] font-medium block">
                            Amount
                          </span>
                          <div className="text-[30px] font-extrabold text-[#161c22] tracking-tight mt-1">
                            ₦25,000<span className="text-[20px] font-normal text-[#6c7a89]">.00</span>
                          </div>
                          {/* Indicator bar */}
                          <div className="w-[110px] h-[3px] bg-[#0976da] rounded-full mx-auto mt-2" />
                          <span className="text-[8.5px] text-[#6c7a89] block mt-1">
                            ₦112,430.00 available
                          </span>
                        </div>

                        {/* Recent Amounts */}
                        <div className="mt-5">
                          <span className="text-[9.5px] font-bold text-[#0976da] underline underline-offset-2 block mb-2">
                            Recent Amounts
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {['₦5,000', '₦10,000', '₦25,000'].map((amt, i) => (
                              <div
                                key={amt}
                                className={`py-1.5 rounded-[8px] border text-center text-[10.5px] font-bold cursor-pointer transition ${
                                  i === 2
                                    ? 'border-[#0976da] text-[#0976da] bg-[#ebf5ff]'
                                    : 'border-[#d0e2f5] text-[#0976da] bg-[#f8fbff]'
                                }`}
                              >
                                {amt}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Remark (Optional) */}
                        <div className="mt-5">
                          <span className="text-[9.5px] text-[#6c7a89] font-medium block mb-1">
                            Remark (Optional)
                          </span>
                          <div className="w-full px-3 py-2 rounded-[8px] border border-[#d0e2f5] bg-white text-[11px] text-[#161c22]">
                            Rent for October
                          </div>
                        </div>
                      </div>

                      {/* Bottom action spacer */}
                      <div className="pt-2">
                        <div className="w-full py-2.5 rounded-[10px] bg-[#0976da] text-white font-bold text-[11.5px] text-center shadow-xs">
                          Continue
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ────────────────────────────────────────────────────────
                      SCREEN 2: "Pay." -> Bills & More
                      ──────────────────────────────────────────────────────── */}
                  {activeVerbIndex === 1 && (
                    <motion.div
                      key="screen-pay"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-2 pt-0.5 pb-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[13.5px] font-bold text-[#161c22]">
                            Bills & More
                          </span>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-0.5 px-3 py-1.5 rounded-[8px] border border-[#dde3ea] flex items-center gap-2 text-[10px] text-[#8492a6] bg-white">
                          <Search className="w-3.5 h-3.5 text-[#8492a6]" />
                          <span>Search a biller</span>
                        </div>

                        {/* Saved Bills */}
                        <div className="mt-3">
                          <span className="text-[9.5px] font-bold text-[#6c7a89]">Saved Bills</span>
                          <div className="mt-1.5 bg-[#f7f9fb] rounded-[10px] border border-[#edf1f7] divide-y divide-[#edf1f7]">
                            {/* Ikeja Electric */}
                            <div className="p-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#ffefe5] text-[#d9822b] font-bold text-[9px] flex items-center justify-center border border-[#fed7aa]">
                                  ie
                                </div>
                                <div>
                                  <div className="text-[10.5px] font-bold text-[#161c22]">
                                    Ikeja Electric
                                  </div>
                                  <div className="text-[8px] text-[#6c7a89]">
                                    Meter 45012338 · last ₦8,500.00
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                            </div>

                            {/* MTN */}
                            <div className="p-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#ffcc00] text-black font-extrabold text-[8px] flex items-center justify-center">
                                  MTN
                                </div>
                                <div>
                                  <div className="text-[10.5px] font-bold text-[#161c22]">
                                    MTN · My Line
                                  </div>
                                  <div className="text-[8px] text-[#6c7a89]">
                                    0803 441 7201 · last ₦2,000.00
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                            </div>

                            {/* DStv */}
                            <div className="p-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#008bd2] text-white font-extrabold text-[8px] flex items-center justify-center">
                                  DStv
                                </div>
                                <div>
                                  <div className="text-[10.5px] font-bold text-[#161c22]">
                                    DStv
                                  </div>
                                  <div className="text-[8px] text-[#e06d53]">
                                    DStv is not responding right now
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                            </div>
                          </div>
                        </div>

                        {/* Categories 3x3 */}
                        <div className="mt-3">
                          <span className="text-[9.5px] font-bold text-[#6c7a89]">Categories</span>
                          <div className="grid grid-cols-3 gap-2 mt-1.5">
                            {[
                              { label: 'Mall', Icon: Store, color: 'text-[#0976da] bg-[#ebf5fc]' },
                              { label: 'Airtime', Icon: Phone, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Data', Icon: Wifi, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Electricity', Icon: Zap, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'TV', Icon: Tv, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Water', Icon: Droplet, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Education', Icon: GraduationCap, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Government', Icon: Landmark, color: 'text-[#0976da] bg-[#f2f5f9]' },
                              { label: 'Insurance', Icon: ShieldCheck, color: 'text-[#0976da] bg-[#f2f5f9]' },
                            ].map(({ label, Icon, color }) => (
                              <div key={label} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
                                  <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                                </div>
                                <span className="text-[8px] text-[#4c5866] font-medium">{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ────────────────────────────────────────────────────────
                      SCREEN 3: "Save." -> Flexible Non-Interest Savings
                      ──────────────────────────────────────────────────────── */}
                  {activeVerbIndex === 2 && (
                    <motion.div
                      key="screen-save"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-2 pt-0.5 pb-1">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[13.5px] font-bold text-[#161c22]">Flexible</span>
                        </div>

                        {/* Balance */}
                        <div className="mt-1 text-center">
                          <div className="text-[28px] font-bold text-[#161c22] tracking-tight">
                            ₦35,000<span className="text-[18px] font-normal text-[#8492a6]">.00</span>
                          </div>
                          <div className="text-[9px] text-[#6c7a89] font-medium">
                            Your balance · take it out anytime
                          </div>
                        </div>

                        {/* Performance Box */}
                        <div className="mt-2.5 p-2.5 rounded-[12px] bg-[#f7f9fb] border border-[#edf1f7] flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#6c7a89]">Profit Shared in August</span>
                            <span className="font-bold text-[#161c22]">₦2,000.00</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#6c7a89]">Since You Opened</span>
                            <span className="font-bold text-[#161c22]">₦6,400.00</span>
                          </div>
                        </div>

                        {/* Where Profit Came From */}
                        <div className="mt-2.5">
                          <div className="flex items-center justify-between text-[9.5px] mb-1.5">
                            <span className="font-bold text-[#161c22]">Where the Profit Came From</span>
                            <span className="text-[#8492a6] text-[8px]">August 2026</span>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div>
                              <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                                <span className="text-[#4c5866]">Sukuk - Government</span>
                                <span className="font-bold text-[#161c22]">50% ₦1,000.00</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '50%' }}
                                  transition={{ duration: 0.6 }}
                                  className="h-full bg-[#0976da] rounded-full"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                                <span className="text-[#4c5866]">Halal Trade Finance</span>
                                <span className="font-bold text-[#161c22]">30% ₦600.00</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '30%' }}
                                  transition={{ duration: 0.6, delay: 0.1 }}
                                  className="h-full bg-[#0976da]/80 rounded-full"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                                <span className="text-[#4c5866]">Commodity Murabaha</span>
                                <span className="font-bold text-[#161c22]">20% ₦400.00</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '20%' }}
                                  transition={{ duration: 0.6, delay: 0.2 }}
                                  className="h-full bg-[#0976da]/60 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Past Statements */}
                        <div className="mt-2.5 p-2 rounded-[8px] bg-white border border-[#dde3ea] flex items-center justify-between text-[9.5px] font-semibold text-[#161c22] cursor-pointer">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#0976da]" />
                            <span>Past Statements</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-[#8492a6]" />
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="pt-2">
                        <div className="w-full py-2 rounded-[8px] border border-[#0976da] text-[#0976da] font-bold text-[11px] text-center cursor-pointer">
                          Withdraw
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ────────────────────────────────────────────────────────
                      SCREEN 4: "Spend." -> Cards
                      ──────────────────────────────────────────────────────── */}
                  {activeVerbIndex === 3 && (
                    <motion.div
                      key="screen-spend"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-2 pt-0.5 pb-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[13.5px] font-bold text-[#161c22]">Cards</span>
                        </div>

                        {/* Card 1: Naira Card */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="relative w-full h-[148px] rounded-[16px] bg-gradient-to-r from-[#043e97] to-[#0976da] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between z-10">
                            <span className="text-[12.5px] font-bold tracking-tight">axoora</span>
                            <span className="px-2 py-0.5 rounded-[4px] bg-white text-[#043e97] font-bold text-[8.5px] shadow-xs">
                              ₦ NGN
                            </span>
                          </div>

                          <div className="text-[13px] font-mono tracking-widest z-10 font-bold">
                            5061 •••• •••• 4417
                          </div>

                          <div className="flex items-end justify-between z-10">
                            <span className="text-[9.5px] font-medium text-white/90">
                              Adaeze N. Balogun
                            </span>
                            <span className="text-[12.5px] font-bold text-white tracking-tight">
                              ₦112,430.00
                            </span>
                          </div>
                        </motion.div>

                        {/* Card 2: Dollar Card */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="mt-2.5 relative w-full h-[148px] rounded-[16px] bg-[#161c22] border border-[#2b3542] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                        >
                          <div className="flex items-center justify-between z-10">
                            <span className="text-[12.5px] font-bold tracking-tight">axoora</span>
                            <span className="px-2 py-0.5 rounded-[4px] bg-[#f2f5f9] text-[#161c22] font-bold text-[8.5px] shadow-xs">
                              $ USD
                            </span>
                          </div>

                          <div className="text-[13px] font-mono tracking-widest z-10 text-slate-200 font-bold">
                            4852 •••• •••• 9014
                          </div>

                          <div className="flex items-end justify-between z-10">
                            <span className="text-[9.5px] font-medium text-slate-300">
                              Adaeze N. Balogun
                            </span>
                            <span className="text-[12.5px] font-bold text-white tracking-tight">
                              $ 248.10
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Bottom note */}
                      <div className="pt-2">
                        <div className="w-full py-2.5 rounded-[10px] bg-[#f2f5f9] text-[#0976da] font-bold text-[11px] text-center">
                          Freeze either card in a tap
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
};
