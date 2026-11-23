'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Send,
  Landmark,
  Calendar,
  Pin,
  CheckCircle2,
  Check,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const PayoutsPhone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recents' | 'beneficiaries' | 'contacts'>('recents');
  const [selectedDestination, setSelectedDestination] = useState<'axoora' | 'bank' | 'schedule'>('bank');
  
  // Automated demo step:
  // 0: Typing account number
  // 1: Name resolved against receiving bank
  // 2: Batch rows validated (Ready badges + Send Batch CTA)
  // 3: Disbursed via NIBSS + receipts generated
  const [payoutStep, setPayoutStep] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<string>('');

  const targetAccount = '0123456789';

  useEffect(() => {
    // Automated demo loop
    const cycle = setInterval(() => {
      setPayoutStep((prev) => (prev + 1) % 4);
    }, 3200);

    return () => clearInterval(cycle);
  }, []);

  // Typing animation for step 0
  useEffect(() => {
    if (payoutStep === 0) {
      setTypedChars('');
      let index = 0;
      const typer = setInterval(() => {
        if (index <= targetAccount.length) {
          setTypedChars(targetAccount.slice(0, index));
          index++;
        } else {
          clearInterval(typer);
        }
      }, 100);
      return () => clearInterval(typer);
    } else {
      setTypedChars(targetAccount);
    }
  }, [payoutStep]);

  const recentsList = [
    {
      id: 'mo',
      name: 'MUSA OKONKWO',
      bank: 'GTBank · 0123456789',
      initials: 'MO',
      color: '#0f6b45',
      amount: '₦38,000.00',
      pinned: true,
    },
    {
      id: 'co',
      name: 'CHIDINMA OKAFOR',
      bank: 'Axoora · 5061441700',
      initials: 'CO',
      color: '#043e97',
      amount: '₦45,000.00',
      pinned: true,
    },
    {
      id: 'na',
      name: 'NGOZI ADEYEMI',
      bank: 'Zenith · 1014882057',
      initials: 'NA',
      color: '#b45309',
      amount: '₦52,000.00',
      pinned: false,
    },
    {
      id: 'te',
      name: 'TUNDE EZE',
      bank: 'Access · 0987654321',
      initials: 'TE',
      color: '#bd2735',
      amount: '₦18,000.00',
      pinned: false,
    },
  ];

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative will-change-transform"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-transparent rounded-[52px] blur-xl -z-10 pointer-events-none" />

      <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden relative">
          {/* Top Automated Flow Toast */}
          <div className="absolute top-11 left-3 right-3 z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              {payoutStep === 1 && (
                <motion.div
                  key="resolved"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="bg-emerald-600 text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    Resolved: MUSA OKONKWO
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    GTBank
                  </span>
                </motion.div>
              )}

              {payoutStep === 2 && (
                <motion.div
                  key="checked"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="bg-[#043e97] text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <FileCheck2 className="w-3 h-3 text-sky-200" />
                    Checked Row by Row
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    2/2 Ready
                  </span>
                </motion.div>
              )}

              {payoutStep === 3 && (
                <motion.div
                  key="disbursed"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="bg-emerald-600 text-white text-[10.5px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    Batch Disbursed · Receipts Sent
                  </span>
                  <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                    ₦83,000
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {/* Top Status Bar */}
            <PhoneStatusBar />

            {/* Nav Header: Back Arrow + Send Money */}
            <div className="flex items-center justify-between mt-2 pb-1">
              <div className="flex items-center gap-2.5">
                <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                <h4 className="text-[14px] font-bold text-[#161c22]">Send Money</h4>
              </div>
              <span className="text-[9.5px] font-bold text-[#0976da] bg-[#e8f2fc] px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0976da] animate-ping" />
                Live Batch Mode
              </span>
            </div>

            {/* Search Pill Input with Automated Typing Simulation */}
            <div className="mt-2.5 relative">
              <Search className="w-3.5 h-3.5 text-[#8492a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="w-full bg-[#f4f7fa] text-[11px] text-[#161c22] pl-8 pr-3 py-2 rounded-full border border-transparent flex items-center justify-between">
                <span className="font-mono tracking-wider">
                  {payoutStep === 0 ? (
                    <>
                      {typedChars}
                      <span className="animate-pulse inline-block w-1 h-3 bg-[#0976da] ml-0.5 align-middle" />
                    </>
                  ) : (
                    '0123456789'
                  )}
                </span>
                {payoutStep >= 1 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded"
                  >
                    GTBank ✓
                  </motion.span>
                )}
              </div>
            </div>

            {/* Where Is It Going? Section */}
            <div className="mt-3.5">
              <span className="text-[11px] font-bold text-[#161c22] block mb-2">
                Where Is It Going?
              </span>

              <div className="grid grid-cols-3 gap-2">
                {/* Axoora */}
                <div className="flex flex-col items-center gap-1.5 p-1 rounded-xl transition cursor-pointer hover:bg-[#f4f7fa]">
                  <div className="w-11 h-11 rounded-full bg-[#f0f4f9] text-[#161c22] flex items-center justify-center transition">
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-[#4c5866]">Axoora</span>
                </div>

                {/* Bank (Active) */}
                <div className="flex flex-col items-center gap-1.5 p-1 rounded-xl bg-[#eaf3fd] transition cursor-pointer">
                  <div className="w-11 h-11 rounded-full bg-[#043e97] text-white flex items-center justify-center shadow-xs">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#043e97]">Bank</span>
                </div>

                {/* Schedule */}
                <div className="flex flex-col items-center gap-1.5 p-1 rounded-xl transition cursor-pointer hover:bg-[#f4f7fa]">
                  <div className="w-11 h-11 rounded-full bg-[#f0f4f9] text-[#161c22] flex items-center justify-center transition">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-[#4c5866]">Schedule</span>
                </div>
              </div>
            </div>

            {/* Tabs: Recents, Beneficiaries, Contacts */}
            <div className="mt-4 flex items-center border-b border-[#edf1f7] text-[11px] relative">
              <button
                type="button"
                onClick={() => setActiveTab('recents')}
                className={`pb-2 mr-4 font-bold relative transition ${
                  activeTab === 'recents' ? 'text-[#0976da]' : 'text-[#8492a6]'
                }`}
              >
                Recents
                {activeTab === 'recents' && (
                  <motion.div
                    layoutId="payoutTabActive"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('beneficiaries')}
                className={`pb-2 mr-4 font-medium relative transition ${
                  activeTab === 'beneficiaries' ? 'text-[#0976da]' : 'text-[#8492a6]'
                }`}
              >
                Beneficiaries
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contacts')}
                className={`pb-2 font-medium relative transition ${
                  activeTab === 'contacts' ? 'text-[#0976da]' : 'text-[#8492a6]'
                }`}
              >
                Contacts
              </button>
            </div>

            {/* Recipient List with Automated Validation Highlights */}
            <div className="mt-2 divide-y divide-[#edf1f7]">
              {recentsList.map((item, idx) => {
                const isResolvedTarget = item.id === 'mo' && payoutStep >= 1;
                const isSecondTarget = item.id === 'co' && payoutStep >= 2;
                const isDisbursed = payoutStep === 3 && (item.id === 'mo' || item.id === 'co');

                return (
                  <motion.div
                    key={item.id}
                    animate={
                      isResolvedTarget || isSecondTarget
                        ? {
                            backgroundColor: isDisbursed
                              ? '#ecfdf5'
                              : ['#f0fdf4', '#e0f2fe', '#f0fdf4'],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: isResolvedTarget && !isDisbursed ? Infinity : 0 }}
                    className={`py-1.5 px-1.5 rounded-lg flex items-center justify-between transition ${
                      isResolvedTarget || isSecondTarget
                        ? 'border border-[#86efac]/80'
                        : 'hover:bg-[#f7f9fc]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: item.color }}
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs"
                      >
                        {item.initials}
                      </div>
                      <div>
                        <div className="text-[11.5px] font-bold text-[#161c22] flex items-center gap-1">
                          {item.name}
                          {(isResolvedTarget || isSecondTarget) && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                          )}
                        </div>
                        <div className="text-[9px] text-[#8492a6]">{item.bank}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isDisbursed ? (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" />
                          Sent
                        </span>
                      ) : isResolvedTarget || isSecondTarget ? (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Ready · {item.amount}
                        </span>
                      ) : item.pinned ? (
                        <Pin className="w-3 h-3 text-[#b45309] fill-[#b45309] rotate-45" />
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Automated Action Bar: Disburse Button or NIBSS status */}
          <div className="pt-2 border-t border-[#f0f4f9] mt-2">
            <AnimatePresence mode="wait">
              {payoutStep === 2 ? (
                <motion.button
                  key="btn-run"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  className="w-full bg-[#043e97] hover:bg-[#03327a] text-white py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3 h-3" />
                  Run Batch: 2 recipients (₦83,000.00)
                </motion.button>
              ) : payoutStep === 3 ? (
                <motion.div
                  key="receipts-ready"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-emerald-50 text-emerald-800 py-1.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 border border-emerald-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  All Rows Disbursed · Receipts Generated
                </motion.div>
              ) : (
                <div className="text-center flex items-center justify-between px-1">
                  <span className="text-[8.5px] text-[#6c7a89] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#0976da]" />
                    Checked Row by Row
                  </span>
                  <span className="text-[8px] font-bold text-[#043e97] bg-[#eef4fc] px-1.5 py-0.5 rounded-full">
                    Direct NIBSS Batch
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
};
