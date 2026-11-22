'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
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
import { PhoneFrame, PhoneStatusBar } from './shared';

export type PersonalScreen = 'send' | 'pay' | 'save' | 'spend';

interface PersonalPhoneShowcaseProps {
  activeScreen?: PersonalScreen;
  onScreenChange?: (screen: PersonalScreen) => void;
  onOpenWhatsApp?: () => void;
  onOpenDownloadApp?: () => void;
}

const SCREENS: PersonalScreen[] = ['send', 'pay', 'save', 'spend'];

export const PersonalPhoneShowcase: React.FC<PersonalPhoneShowcaseProps> = ({
  activeScreen: controlledScreen,
  onScreenChange,
}) => {
  const [internalScreen, setInternalScreen] = useState<PersonalScreen>('send');
  const active = controlledScreen ?? internalScreen;

  const setScreen = (s: PersonalScreen) => {
    setInternalScreen(s);
    onScreenChange?.(s);
  };

  // Auto-switch across the 4 screens every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setScreen(SCREENS[(SCREENS.indexOf(active) + 1) % SCREENS.length]);
    }, 4800);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ─── Mode Indicator Pills (Send · Pay · Save · Spend) ─── */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 mb-3 shadow-lg z-20">
        {[
          { key: 'send', label: 'Send.' },
          { key: 'pay', label: 'Pay.' },
          { key: 'save', label: 'Save.' },
          { key: 'spend', label: 'Spend.' },
        ].map(({ key, label }) => {
          const isSelected = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setScreen(key as PersonalScreen)}
              className={`relative px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-tight transition-all cursor-pointer ${
                isSelected
                  ? 'text-white bg-[#0976da] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{label}</span>
              {isSelected && (
                <motion.div
                  layoutId="activePillPersonalFour"
                  className="absolute inset-0 rounded-full border border-white/35 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Phone Hardware Bezel ─── */}
      <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between">
          {/* Top Status Bar */}
          <div className="px-[14px] shrink-0">
            <PhoneStatusBar />
          </div>

          {/* Screen Content Carousel */}
          <div className="flex-1 relative overflow-hidden px-[14px] pt-0.5 pb-2">
            <AnimatePresence mode="wait">
              {/* ═══════════════════════════════════════════════════════
                  SCREEN 1: SEND ("Send to Chidinma")
                  ═══════════════════════════════════════════════════════ */}
              {active === 'send' && (
                <motion.div
                  key="screen-send"
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top navigation */}
                    <div className="flex items-center gap-2 pt-0.5 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Send to Chidinma</span>
                    </div>

                    {/* Recipient Card */}
                    <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#f7f9fb] border border-[#edf1f7] mt-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#043e97] text-white font-bold text-[11px] flex items-center justify-center shadow-xs">
                          CO
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#161c22] uppercase tracking-wide">
                            CHIDINMA OKAFOR
                          </div>
                          <div className="text-[9px] text-[#6c7a89]">GTBank · 0123456789</div>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Amount Block */}
                    <div className="mt-4 flex flex-col items-center">
                      <span className="text-[10px] text-[#6c7a89] font-medium">Amount</span>
                      <div className="text-[32px] font-bold text-[#161c22] tracking-tight mt-0.5">
                        ₦25,000<span className="text-[20px] font-normal text-[#8492a6]">.00</span>
                      </div>
                      {/* Available bar */}
                      <div className="w-full max-w-[190px] h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div className="w-[65%] h-full bg-[#0976da] rounded-full" />
                      </div>
                      <span className="text-[9.5px] text-[#6c7a89] mt-1.5 font-medium">
                        ₦112,430.00 available
                      </span>
                    </div>

                    {/* Recent Amounts Pills */}
                    <div className="mt-4">
                      <span className="text-[9.5px] font-bold text-[#6c7a89]">Recent Amounts</span>
                      <div className="flex gap-2 mt-1.5">
                        {['₦5,000', '₦10,000', '₦25,000'].map((amt, idx) => (
                          <div
                            key={amt}
                            className={`flex-1 py-1.5 rounded-[8px] text-[10.5px] font-bold text-center border ${
                              idx === 2
                                ? 'border-[#0976da] bg-[#ebf5fc] text-[#0976da]'
                                : 'border-[#dde3ea] bg-white text-[#4c5866]'
                            }`}
                          >
                            {amt}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Remark Field */}
                    <div className="mt-3.5">
                      <span className="text-[9.5px] font-bold text-[#6c7a89]">Remark (Optional)</span>
                      <div className="mt-1 px-3 py-2 rounded-[8px] border border-[#dde3ea] text-[10.5px] text-[#161c22] bg-[#fbfcfe]">
                        Rent for October
                      </div>
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="pt-2">
                    <div className="w-full py-2.5 rounded-[10px] bg-[#0976da] text-white font-bold text-[12px] text-center shadow-xs">
                      Send ₦25,000.00
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══════════════════════════════════════════════════════
                  SCREEN 2: PAY ("Bills & More")
                  ═══════════════════════════════════════════════════════ */}
              {active === 'pay' && (
                <motion.div
                  key="screen-pay"
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top navigation */}
                    <div className="flex items-center gap-2 pt-0.5 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Bills & More</span>
                    </div>

                    {/* Search box */}
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
                              <div className="text-[10.5px] font-bold text-[#161c22]">Ikeja Electric</div>
                              <div className="text-[8px] text-[#6c7a89]">Meter 45012338 · last ₦8,500.00</div>
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
                              <div className="text-[10.5px] font-bold text-[#161c22]">MTN · My Line</div>
                              <div className="text-[8px] text-[#6c7a89]">0803 441 7201 · last ₦2,000.00</div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                        </div>

                        {/* DStv */}
                        <div className="p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#00529b] text-white font-bold text-[7px] flex items-center justify-center">
                              DStv
                            </div>
                            <div>
                              <div className="text-[10.5px] font-bold text-[#161c22]">DStv</div>
                              <div className="text-[8px] text-amber-700 font-medium">
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

              {/* ═══════════════════════════════════════════════════════
                  SCREEN 3: SAVE ("Flexible" Halal / Non-Interest Savings)
                  ═══════════════════════════════════════════════════════ */}
              {active === 'save' && (
                <motion.div
                  key="screen-save"
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top navigation */}
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
                      <div className="text-[9px] text-[#6c7a89] font-medium">Your balance · take it out anytime</div>
                    </div>

                    {/* Stats Card */}
                    <div className="mt-2.5 p-2.5 rounded-[12px] bg-[#f7f9fb] border border-[#edf1f7] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6c7a89]">Profit Shared in August</span>
                        <span className="font-bold text-[#161c22]">
                          ₦2,000<span className="text-[#8492a6]">.00</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6c7a89]">Since You Opened</span>
                        <span className="font-bold text-[#161c22]">
                          ₦6,400<span className="text-[#8492a6]">.00</span>
                        </span>
                      </div>
                    </div>

                    {/* Where the Profit Came From */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[9.5px] mb-1.5">
                        <span className="font-bold text-[#161c22]">Where the Profit Came From</span>
                        <span className="text-[#8492a6] text-[8px]">August 2026</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* Sukuk */}
                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Sukuk - Government</span>
                            <span className="font-bold text-[#161c22]">50% ₦1,000.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[50%] h-full bg-[#0976da] rounded-full" />
                          </div>
                        </div>

                        {/* Halal Trade Finance */}
                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Halal Trade Finance</span>
                            <span className="font-bold text-[#161c22]">30% ₦600.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[30%] h-full bg-[#0976da]/80 rounded-full" />
                          </div>
                        </div>

                        {/* Commodity Murabaha */}
                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Commodity Murabaha</span>
                            <span className="font-bold text-[#161c22]">20% ₦400.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[20%] h-full bg-[#0976da]/60 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Past Statements */}
                    <div className="mt-2.5 p-2 rounded-[8px] bg-white border border-[#dde3ea] flex items-center justify-between text-[9.5px] font-semibold text-[#161c22]">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0976da]" />
                        <span>Past Statements</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-[#8492a6]" />
                    </div>
                  </div>

                  {/* Withdraw Button */}
                  <div className="pt-2">
                    <div className="w-full py-2 rounded-[8px] border border-[#0976da] text-[#0976da] font-bold text-[11px] text-center hover:bg-[#ebf5fc] transition-colors">
                      Withdraw
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══════════════════════════════════════════════════════
                  SCREEN 4: SPEND ("Cards" Naira & Dollar)
                  ═══════════════════════════════════════════════════════ */}
              {active === 'spend' && (
                <motion.div
                  key="screen-spend"
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top navigation */}
                    <div className="flex items-center gap-2 pt-0.5 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Cards</span>
                    </div>

                    {/* Card 1: Naira Card */}
                    <div className="relative w-full h-[146px] rounded-[16px] bg-gradient-to-r from-[#043e97] to-[#0976da] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden">
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
                        <span className="text-[9.5px] font-medium text-white/90">Adaeze N. Balogun</span>
                        <span className="text-[12.5px] font-bold text-white tracking-tight">
                          ₦112,430.00
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Dollar Card */}
                    <div className="mt-2.5 relative w-full h-[146px] rounded-[16px] bg-[#161c22] border border-[#2b3542] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden">
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
                        <span className="text-[9.5px] font-medium text-slate-300">Adaeze N. Balogun</span>
                        <span className="text-[12.5px] font-bold text-white tracking-tight">$ 248.10</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar that tracks the 4.8s switch */}
          <div className="px-4 pb-2.5">
            <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.8, ease: 'linear' }}
                className="h-full bg-[#0976da]"
              />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
