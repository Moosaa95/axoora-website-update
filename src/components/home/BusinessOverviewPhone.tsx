'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Search,
  Clock,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Send,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const BusinessOverviewPhone: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Automated sequence stage: 0 = idle, 1 = processing batch, 2 = disbursed, 3 = inbound inflow
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3200);

    return () => clearInterval(cycle);
  }, []);

  // Compute dynamic animated balance based on step
  const currentBalanceDisplay =
    step === 2
      ? { main: '77,530', sub: '.00', change: '−₦34,900.00 batch' }
      : { main: '112,430', sub: '.00', change: step === 3 ? '+₦34,900.00 settled' : null };

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative will-change-transform"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-transparent rounded-[52px] blur-xl -z-10 pointer-events-none" />

      <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden relative">
          {/* Top Automated Floating Toast */}
          <div className="absolute top-11 left-3 right-3 z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="batch-running"
                  initial={{ opacity: 0, y: -12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#043e97] text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="animate-spin w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full" />
                    Clearing 18 batch rows...
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    NIBSS
                  </span>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="batch-done"
                  initial={{ opacity: 0, y: -12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-emerald-600 text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    ₦34,900.00 Disbursed (18 paid)
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    Sent
                  </span>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="inbound-settled"
                  initial={{ opacity: 0, y: -12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0976da] text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    Inbound Inflow Settled
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    +₦34,900
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {/* Top Status Bar */}
            <PhoneStatusBar />

            {/* Balance Section with Dynamic Automation */}
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hideBalance ? 'hidden' : currentBalanceDisplay.main}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[26px] font-bold tracking-tight text-[#161c22]"
                  >
                    {hideBalance ? (
                      '₦ ••••••••'
                    ) : (
                      <>
                        <span className="text-[20px] font-semibold mr-0.5">₦</span>
                        {currentBalanceDisplay.main}
                        <span className="text-[18px] text-[#4c5866] font-normal">
                          {currentBalanceDisplay.sub}
                        </span>
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  aria-label="Toggle balance visibility"
                  onClick={() => setHideBalance(!hideBalance)}
                  className="text-[#8492a6] hover:text-[#161c22] transition cursor-pointer p-0.5 rounded-full"
                >
                  {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </motion.button>
              </div>

              {/* Real-time active status pulse */}
              <div className="flex items-center justify-between mt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] text-[#6c7a89] font-medium">
                    Current Balance · Live
                  </span>
                </div>

                {currentBalanceDisplay.change && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                      step === 2
                        ? 'text-[#9a6000] bg-amber-50'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    {currentBalanceDisplay.change}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-3.5 relative">
              <Search className="w-3.5 h-3.5 text-[#8492a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                readOnly
                placeholder="Search transactions"
                className="w-full bg-[#f4f7fa] text-[11.5px] text-[#161c22] placeholder:text-[#8492a6] pl-8 pr-3 py-2 rounded-full border border-transparent focus:outline-none cursor-default transition hover:bg-[#eef3f8]"
              />
            </div>

            {/* Transactions List */}
            <div className="mt-3.5 space-y-3">
              {/* Section: Tomorrow */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-bold pb-1.5 border-b border-[#edf1f7]">
                  <span className="text-[#161c22] flex items-center gap-1">
                    Tomorrow
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full transition-colors ${
                        step === 1 ? 'bg-[#0976da] animate-pulse' : 'bg-[#b45309]'
                      }`}
                    />
                  </span>
                  <span
                    className={`transition-colors font-bold ${
                      step === 2 ? 'text-emerald-600 line-through' : 'text-[#9a6000]'
                    }`}
                  >
                    − ₦ 34,900 .00
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  {/* Item 1: Chidinma Okafor */}
                  <motion.div
                    animate={
                      step === 1
                        ? { backgroundColor: ['#ffffff', '#e8f2fc', '#ffffff'] }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: step === 1 ? Infinity : 0 }}
                    className="flex items-center justify-between cursor-pointer rounded-lg p-1 -mx-1 hover:bg-[#f7f9fc] transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-xs">
                        CO
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#161c22]">
                          Chidinma Okafor
                        </div>
                        <div className="text-[9.5px] text-[#8492a6] flex items-center gap-1">
                          {step === 1 ? (
                            <span className="text-[#0976da] font-medium flex items-center gap-0.5">
                              <span className="animate-spin w-2 h-2 border border-[#0976da] border-t-transparent rounded-full" />
                              Clearing now
                            </span>
                          ) : step >= 2 ? (
                            <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              Disbursed · 08:00
                            </span>
                          ) : (
                            <>
                              <Clock className="w-2.5 h-2.5 text-[#b45309]" />
                              Scheduled · 08:00
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#9a6000]">
                      − ₦ 29,400 .00
                    </span>
                  </motion.div>

                  {/* Item 2: DStv */}
                  <div className="flex items-center justify-between rounded-lg p-1 -mx-1 hover:bg-[#f7f9fc] transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0082c8] text-white flex items-center justify-center text-[9px] font-extrabold tracking-tight shrink-0 shadow-xs">
                        DStv
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#161c22]">
                          DStv
                        </div>
                        <div className="text-[9.5px] text-[#8492a6]">
                          {step >= 2 ? 'Subscription · Paid' : 'Subscription · 08:00'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#9a6000]">
                      − ₦ 5,500 .00
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Today */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-bold pb-1.5 border-b border-[#edf1f7]">
                  <span className="text-[#161c22] flex items-center gap-1">
                    Today
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[#0f6b45] font-bold">+ ₦ 25,000 .00</span>
                </div>

                <div className="pt-2 space-y-2">
                  {/* Item 1: Incoming payment */}
                  <motion.div
                    animate={
                      step === 3
                        ? { backgroundColor: ['#ffffff', '#ecfdf5', '#ffffff'] }
                        : {}
                    }
                    transition={{ duration: 1.2 }}
                    className="flex items-center justify-between rounded-lg p-1 -mx-1 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-xs">
                        CO
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#161c22]">
                          Chidinma Okafor
                        </div>
                        <div className="text-[9.5px] text-[#0f6b45] font-medium flex items-center gap-0.5">
                          <ArrowDownLeft className="w-2.5 h-2.5" />
                          Settled · 14:08
                        </div>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#0f6b45]">
                      + ₦ 25,000 .00
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Section: Yesterday */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-bold pb-1.5 border-b border-[#edf1f7]">
                  <span className="text-[#161c22]">Yesterday</span>
                  <span className="text-[#6c7a89]">− ₦ 10,500 .00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom indicator with animated status pill */}
          <div className="text-center pt-2 border-t border-[#f0f4f9] mt-2 flex items-center justify-between px-1">
            <span className="text-[8.5px] text-[#6c7a89] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#0976da]" />
              Commercial Account · NIBSS
            </span>
            <span className="text-[8px] font-bold text-[#043e97] bg-[#eef4fc] px-1.5 py-0.5 rounded-full">
              Auto-Reconciled
            </span>
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
};
