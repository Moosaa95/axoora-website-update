'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSpreadsheet,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  MessageCircle,
  Briefcase,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar, Money } from './shared';
import { PhoneGroup, PhoneTx } from './phoneParts';

export type BusinessDemoMode = 'batch' | 'whatsapp';

export const BusinessPhoneShowcase: React.FC = () => {
  const [mode, setMode] = useState<BusinessDemoMode>('batch');
  const [hideBalance, setHideBalance] = useState(false);
  const [batchApproved, setBatchApproved] = useState(false);

  // Auto-switch between "In the App" and "On WhatsApp" continuously every 5.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMode((current) => (current === 'batch' ? 'whatsapp' : 'batch'));
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  // Reset batch approval simulation on mode switch
  useEffect(() => {
    if (mode === 'batch') {
      setBatchApproved(false);
      const t = setTimeout(() => setBatchApproved(true), 1600);
      return () => clearTimeout(t);
    }
  }, [mode]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ─── Mode Switcher Indicator Pill ─── */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 mb-3 shadow-lg z-20">
        {[
          { key: 'batch', label: 'In the App', icon: Briefcase },
          { key: 'whatsapp', label: 'On WhatsApp', icon: MessageCircle },
        ].map(({ key, label, icon: Icon }) => {
          const isActive = mode === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key as BusinessDemoMode)}
              className={`relative px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'text-white bg-[#0976da] shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activePillBusiness"
                  className="absolute inset-0 rounded-full border border-white/35 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Phone Hardware Bezel ─── */}
      <PhoneFrame width={310} height={500} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between">
          {/* Top Status Bar */}
          <div className="px-[12px] shrink-0">
            <PhoneStatusBar />
          </div>

          {/* Screen Content Carousel */}
          <div className="flex-1 relative overflow-hidden px-[12px] pt-1 pb-2">
            <AnimatePresence mode="wait">
              {/* ══════════════════════════════════════
                  VIEW 1: IN THE APP (Batch Payout & Cashflow)
                  ══════════════════════════════════════ */}
              {mode === 'batch' && (
                <motion.div
                  key="batch-view"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top Balance Bar */}
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2">
                          {hideBalance ? (
                            <span className="text-[20px] font-bold text-[#161c22]">₦••••••••</span>
                          ) : (
                            <span className="text-[20px] font-bold text-[#161c22]">
                              ₦{batchApproved ? '13,600,200' : '18,450,200'}
                              <span className="text-[14px] text-[#4c5866] font-normal">.00</span>
                            </span>
                          )}
                          <button
                            type="button"
                            aria-label="Toggle balance"
                            onClick={() => setHideBalance(!hideBalance)}
                            className="text-[#4c5866] cursor-pointer"
                          >
                            {hideBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="text-[8.5px] text-[#4c5866] font-medium">Axoora Business Operating Account</div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#e8f3fc] text-[#0976da]">
                        Live
                      </span>
                    </div>

                    {/* Batch Run Simulated Card */}
                    <div className="mt-2.5 p-3 rounded-[12px] bg-gradient-to-br from-[#f2f8ff] to-[#e4f0fc] border border-[#cbe1f7] shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FileSpreadsheet className="w-4 h-4 text-[#0976da]" />
                          <span className="text-[10.5px] font-bold text-[#043e97]">payroll_november.csv</span>
                        </div>
                        <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-white text-[#043e97] border border-[#cbe1f7]">
                          48 staff
                        </span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-[14px] font-bold text-[#161c22]">₦4,850,000.00</span>
                        <span className="text-[8.5px] font-semibold text-emerald-700">48 valid · 0 failed</span>
                      </div>

                      {/* Approval Status */}
                      <div className="mt-2.5">
                        {batchApproved ? (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full py-1.5 px-2.5 rounded-[8px] bg-emerald-600 text-white flex items-center justify-between text-[9.5px] font-bold shadow-xs"
                          >
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              All 48 Paid Instantly
                            </span>
                            <span className="text-[8px] font-normal text-emerald-100">1.2s settlement</span>
                          </motion.div>
                        ) : (
                          <div className="w-full py-1.5 px-2.5 rounded-[8px] bg-[#043e97] text-white flex items-center justify-between text-[9.5px] font-bold shadow-xs">
                            <span>Authorizing Batch with PIN...</span>
                            <span className="font-mono text-[10px] tracking-widest">••••</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Cashflow Runs */}
                  <div className="mt-2 flex flex-col gap-1.5">
                    <PhoneGroup label="Tomorrow · Scheduled" total="− ₦34,900" totalClass="text-[#8a4b00]">
                      <PhoneTx initials="CO" name="Chidinma Okafor" sub="Contractor · 08:00" amount="− ₦29,400" tone="debitPending" />
                      <PhoneTx logo="DStv" name="DStv Office" sub="Subscription · 08:00" amount="− ₦5,500" tone="debitPending" />
                    </PhoneGroup>

                    <PhoneGroup label="Today · Collections" total="+ ₦1,250,000" totalClass="text-[#065f41]">
                      <PhoneTx initials="ZB" name="Zenith Settlement" sub="Cleared · 14:08" amount="+ ₦1,250,000" tone="credit" />
                    </PhoneGroup>
                  </div>
                </motion.div>
              )}

              {/* ══════════════════════════════════════
                  VIEW 2: ON WHATSAPP (Batch Payout Approval)
                  ══════════════════════════════════════ */}
              {mode === 'whatsapp' && (
                <motion.div
                  key="whatsapp-business-view"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  {/* WhatsApp Business Header */}
                  <div className="p-2 rounded-[10px] bg-[#075e54] text-white flex items-center gap-2 shadow-xs">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-[11px]">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
                        <span>Axoora Business</span>
                        <CheckCircle2 className="w-3 h-3 text-[#25d366] fill-[#25d366]" />
                      </div>
                      <div className="text-[8px] text-white/80">Automated Corporate Payouts</div>
                    </div>
                  </div>

                  {/* WhatsApp Conversation */}
                  <div className="flex-1 flex flex-col justify-center gap-2 py-1.5">
                    {/* Bot prompt */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="self-start max-w-[92%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[9.5px] shadow-xs border border-[#e2e8f0]"
                    >
                      <div className="font-semibold text-[#043e97] mb-0.5">🔔 Batch Payout Ready for Approval:</div>
                      <div>File: <span className="font-mono text-[#0976da]">payroll_november.csv</span></div>
                      <div>Staff: 48 recipients · Total: ₦4,850,000.00</div>
                      <div className="text-[8.5px] text-slate-500 mt-1">Reply &apos;APPROVE&apos; with Master PIN.</div>
                    </motion.div>

                    {/* Admin Response */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="self-end bg-[#d9fdd3] text-[#111b21] px-3 py-1.5 rounded-[12px] rounded-tr-none text-[9.5px] shadow-xs font-semibold"
                    >
                      APPROVE ••••
                    </motion.div>

                    {/* Bot Confirmation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="self-start max-w-[94%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[9.5px] shadow-xs border border-emerald-300"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Batch Disbursed Successfully!</span>
                      </div>
                      <div className="text-[8.5px] text-slate-700">All 48 accounts credited in 1.4s. Audit schedule PDF sent to finance@axoora.ai.</div>
                    </motion.div>
                  </div>

                  {/* Fake input bar */}
                  <div className="p-2 rounded-[8px] bg-[#f0f2f5] flex items-center justify-between text-[9px] text-[#667781]">
                    <span>Type business command...</span>
                    <div className="w-5 h-5 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar that tracks the 5.2s auto-switch */}
          <div className="px-4 pb-2">
            <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                key={mode}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5.2, ease: 'linear' }}
                className="h-full bg-[#0976da]"
              />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};

