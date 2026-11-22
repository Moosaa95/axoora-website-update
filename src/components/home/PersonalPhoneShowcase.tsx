'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Plus,
  RefreshCw,
  Zap,
  Eye,
  EyeOff,
  Bell,
  MessageCircle,
  Check,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export type DemoMode = 'app' | 'whatsapp';

interface PersonalPhoneShowcaseProps {
  onOpenWhatsApp?: () => void;
  onOpenDownloadApp?: () => void;
}

export const PersonalPhoneShowcase: React.FC<PersonalPhoneShowcaseProps> = ({
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const [mode, setMode] = useState<DemoMode>('app');
  const [hideBalance, setHideBalance] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  // Auto-switch between "In the App" and "On WhatsApp" continuously every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMode((current) => (current === 'app' ? 'whatsapp' : 'app'));
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  // Reset transfer toast simulation on app mode switch
  useEffect(() => {
    if (mode === 'app') {
      setTransferComplete(false);
      const t = setTimeout(() => setTransferComplete(true), 1500);
      return () => clearTimeout(t);
    }
  }, [mode]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ─── Mode Indicator Pill (In the App vs On WhatsApp) ─── */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 mb-3 shadow-lg z-20">
        {[
          { key: 'app', label: 'In the App', icon: Smartphone },
          { key: 'whatsapp', label: 'On WhatsApp', icon: MessageCircle },
        ].map(({ key, label, icon: Icon }) => {
          const isActive = mode === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key as DemoMode)}
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
                  layoutId="activePillPersonal"
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
          <div className="flex-1 relative overflow-hidden px-[13px] pt-1 pb-3">
            <AnimatePresence mode="wait">
              {/* ══════════════════════════════════════
                  VIEW 1: IN THE APP (Send & Pay)
                  ══════════════════════════════════════ */}
              {mode === 'app' && (
                <motion.div
                  key="app-view"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top user bar */}
                    <div className="flex items-center gap-[8px] py-[3px]">
                      <div className="w-[28px] h-[28px] rounded-full bg-[#043e97] text-white text-[11px] font-semibold flex items-center justify-center shadow-sm">
                        AB
                      </div>
                      <div className="flex-1 flex items-center gap-[6px]">
                        <span className="text-[12.5px] font-semibold text-[#161c22]">Hi, Adaeze</span>
                        <span className="px-[6px] py-[1.5px] rounded-full bg-[#eef4fb] text-[9px] font-bold text-[#0976da]">
                          Tier 3
                        </span>
                      </div>
                      <div className="w-[28px] h-[28px] rounded-full bg-[#f2f5f9] flex items-center justify-center text-[#4c5866]">
                        <Bell className="w-[13px] h-[13px]" />
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="mt-3 flex flex-col items-center gap-[3px]">
                      <div className="flex items-center gap-[8px]">
                        {hideBalance ? (
                          <span className="text-[30px] font-bold text-[#161c22]">₦••••••</span>
                        ) : (
                          <span className="text-[30px] font-bold text-[#161c22] tracking-tight">
                            ₦{transferComplete ? '112,430' : '137,430'}
                            <span className="text-[#8492a6] font-normal text-[22px]">.00</span>
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label="Toggle balance"
                          onClick={() => setHideBalance(!hideBalance)}
                          className="text-[#8492a6] hover:text-[#161c22] cursor-pointer"
                        >
                          {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                      <span className="text-[10px] text-[#5c6877] font-medium">Available Balance</span>
                    </div>

                    {/* 4 Action Buttons */}
                    <div className="mt-3 flex justify-between px-3">
                      {[
                        { label: 'Send', Icon: ArrowUpRight, active: true },
                        { label: 'Add Money', Icon: Plus, active: false },
                        { label: 'Circles', Icon: RefreshCw, active: false },
                        { label: 'Bills', Icon: Zap, active: false },
                      ].map(({ label, Icon, active }) => (
                        <div key={label} className="flex flex-col items-center gap-[5px]">
                          <div
                            className={`w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors ${
                              active
                                ? 'bg-[#0976da] text-white shadow-sm ring-2 ring-[#0976da]/20'
                                : 'bg-[#f2f5f9] text-[#0976da]'
                            }`}
                          >
                            <Icon className="w-4 h-4" strokeWidth={2} />
                          </div>
                          <span className="text-[9.5px] font-medium text-[#4c5866]">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Instant Payment Animation Toast */}
                    <motion.div
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-3 p-2.5 rounded-[12px] bg-emerald-50 border border-emerald-200/80 flex items-center gap-2.5 shadow-xs"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10.5px] font-bold text-emerald-950 flex items-center justify-between">
                          <span>Instant Transfer Sent</span>
                          <span className="text-emerald-700 font-mono">−₦25,000</span>
                        </div>
                        <div className="text-[9px] text-emerald-700 truncate">To Tunde Adebayo · 0.4s settlement</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-2.5 flex flex-col">
                    <div className="text-[11px] font-bold text-[#161c22] mb-1.5 flex items-center justify-between">
                      <span>Recent Activity</span>
                      <span className="text-[9.5px] text-[#0976da] font-semibold cursor-pointer">View All</span>
                    </div>

                    <div className="bg-[#f7f9fb] rounded-[10px] p-2.5 flex flex-col gap-2 border border-[#edf1f7]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-[26px] h-[26px] rounded-full bg-[#1e3a6b] text-white text-[8px] font-bold flex items-center justify-center">
                            CO
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#161c22]">Chidinma Okafor</div>
                            <div className="text-[8.5px] text-[#6c7a89]">Received · Today</div>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-[#065f41]">+ ₦25,000.00</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-[26px] h-[26px] rounded-full bg-amber-500/10 text-amber-600 text-[8px] font-bold flex items-center justify-center">
                            IE
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#161c22]">Ikeja Electric</div>
                            <div className="text-[8.5px] text-[#6c7a89]">Bills · 09:20</div>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-[#161c22]">− ₦8,500.00</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══════════════════════════════════════
                  VIEW 2: ON WHATSAPP (Conversational)
                  ══════════════════════════════════════ */}
              {mode === 'whatsapp' && (
                <motion.div
                  key="whatsapp-view"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="h-full flex flex-col justify-between"
                >
                  {/* WhatsApp Top Bar */}
                  <div className="p-2 rounded-[10px] bg-[#075e54] text-white flex items-center gap-2 shadow-xs">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-[11px]">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
                        <span>Axoora AI</span>
                        <CheckCircle2 className="w-3 h-3 text-[#25d366] fill-[#25d366]" />
                      </div>
                      <div className="text-[8px] text-white/80">Official WhatsApp Banking</div>
                    </div>
                  </div>

                  {/* Chat Conversation */}
                  <div className="flex-1 flex flex-col justify-center gap-2.5 py-2">
                    {/* User bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="self-end max-w-[85%] bg-[#d9fdd3] text-[#111b21] p-2.5 rounded-[12px] rounded-tr-none text-[10px] shadow-xs"
                    >
                      Send ₦15,000 to Mum from my Naira account
                    </motion.div>

                    {/* Bot prompt */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="self-start max-w-[90%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[9.5px] shadow-xs border border-[#e2e8f0]"
                    >
                      <div className="font-semibold text-[#043e97] mb-0.5">Transfer Confirmation:</div>
                      <div>Recipient: Zainab Balogun (Zenith)</div>
                      <div>Amount: ₦15,000.00 · Fee: ₦0.00</div>
                      <div className="text-[8.5px] text-slate-500 mt-1">Reply &apos;1&apos; with PIN to confirm.</div>
                    </motion.div>

                    {/* User PIN confirm */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="self-end bg-[#d9fdd3] text-[#111b21] px-3 py-1 rounded-[10px] rounded-tr-none text-[10px] shadow-xs font-mono"
                    >
                      ••••
                    </motion.div>

                    {/* Bot Success */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.85 }}
                      className="self-start max-w-[92%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[9.5px] shadow-xs border border-emerald-300"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Transfer Completed!</span>
                      </div>
                      <div className="text-[9px] text-slate-700">Receipt #AX-9481 generated. New balance: ₦97,430.00.</div>
                    </motion.div>
                  </div>

                  {/* WhatsApp input bar */}
                  <div className="p-2 rounded-[8px] bg-[#f0f2f5] flex items-center justify-between text-[9.5px] text-[#667781]">
                    <span>Type a banking command...</span>
                    <div className="w-5 h-5 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar that fills up across the 5.2s interval */}
          <div className="px-4 pb-2.5">
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
