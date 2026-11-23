'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Search, Clock, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const BusinessOverviewPhone: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isLivePulse, setIsLivePulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLivePulse((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative will-change-transform"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-transparent rounded-[52px] blur-xl -z-10 pointer-events-none" />

      <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden">
          <div>
            {/* Top Status Bar */}
            <PhoneStatusBar />

            {/* Balance Section with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-2"
            >
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hideBalance ? 'hidden' : 'visible'}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="text-[26px] font-bold tracking-tight text-[#161c22]"
                  >
                    {hideBalance ? (
                      '₦ ••••••••'
                    ) : (
                      <>
                        <span className="text-[20px] font-semibold mr-0.5">₦</span>
                        112,430
                        <span className="text-[18px] text-[#4c5866] font-normal">.00</span>
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
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-[#6c7a89] font-medium">
                  Current Balance · Live
                </span>
              </div>
            </motion.div>

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
            <div className="mt-4 space-y-3.5">
              {/* Section: Tomorrow */}
              <div>
                <div className="flex justify-between items-center text-[10.5px] font-bold pb-1.5 border-b border-[#edf1f7]">
                  <span className="text-[#161c22] flex items-center gap-1">
                    Tomorrow
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                  </span>
                  <span className="text-[#9a6000]">− ₦ 34,900 .00</span>
                </div>

                <div className="pt-2 space-y-2.5">
                  {/* Item 1: Chidinma Okafor */}
                  <motion.div
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveItem(activeItem === 'co' ? null : 'co')}
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
                          <Clock className="w-2.5 h-2.5 text-[#b45309]" />
                          Scheduled · 08:00
                        </div>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#9a6000]">
                      − ₦ 29,400 .00
                    </span>
                  </motion.div>

                  {/* Item 2: DStv */}
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="flex items-center justify-between cursor-pointer rounded-lg p-1 -mx-1 hover:bg-[#f7f9fc] transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0082c8] text-white flex items-center justify-center text-[9px] font-extrabold tracking-tight shrink-0 shadow-xs">
                        DStv
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#161c22]">
                          DStv
                        </div>
                        <div className="text-[9.5px] text-[#8492a6]">
                          Subscription · 08:00
                        </div>
                      </div>
                    </div>
                    <span className="text-[11.5px] font-bold text-[#9a6000]">
                      − ₦ 5,500 .00
                    </span>
                  </motion.div>
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
                    animate={isLivePulse ? { backgroundColor: ['#ffffff', '#ecfdf5', '#ffffff'] } : {}}
                    transition={{ duration: 2 }}
                    whileHover={{ x: 2 }}
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

          {/* Bottom indicator */}
          <div className="text-center pt-2 border-t border-[#f0f4f9] mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#0976da]" />
            <span className="text-[8.5px] text-[#6c7a89] font-medium">
              Commercial Account · NIBSS Direct Connected
            </span>
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
};
