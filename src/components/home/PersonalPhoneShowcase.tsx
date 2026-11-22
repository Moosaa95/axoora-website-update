'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Plus,
  RefreshCw,
  Zap,
  CreditCard,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Bell,
  MessageCircle,
  Check,
  CheckCircle2,
  Snowflake,
  ShieldCheck,
  Users,
  Smartphone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar, Money } from './shared';

export type DemoMode = 'send' | 'cards' | 'circles' | 'whatsapp';

interface PersonalPhoneShowcaseProps {
  onOpenWhatsApp?: () => void;
  onOpenDownloadApp?: () => void;
}

export const PersonalPhoneShowcase: React.FC<PersonalPhoneShowcaseProps> = ({
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const [mode, setMode] = useState<DemoMode>('send');
  const [isPaused, setIsPaused] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeCardCurrency, setActiveCardCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  // Auto-cycle through the 4 core value propositions every 5.5s
  useEffect(() => {
    if (isPaused) return;

    const modes: DemoMode[] = ['send', 'cards', 'circles', 'whatsapp'];
    const timer = setInterval(() => {
      setMode((current) => {
        const nextIndex = (modes.indexOf(current) + 1) % modes.length;
        return modes[nextIndex];
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Reset mini-simulations on mode switch
  useEffect(() => {
    if (mode === 'send') {
      const t = setTimeout(() => setTransferComplete(true), 1800);
      return () => clearTimeout(t);
    } else {
      setTransferComplete(false);
    }
  }, [mode]);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Mode Pills (Quick interactive navigation) ─── */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/30 backdrop-blur-md border border-white/15 mb-3 shadow-md z-20">
        {[
          { key: 'send', label: 'Send & Pay', icon: ArrowUpRight },
          { key: 'cards', label: 'Cards', icon: CreditCard },
          { key: 'circles', label: 'Ajo & Save', icon: Users },
          { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
        ].map(({ key, label, icon: Icon }) => {
          const isActive = mode === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setMode(key as DemoMode);
                setIsPaused(true);
              }}
              className={`relative px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'text-white bg-[#0976da] shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activePillGlow"
                  className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Phone Hardware Bezel ─── */}
      <PhoneFrame width={320} height={600} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between select-none">
          {/* Top Status Bar with Dynamic Island */}
          <div className="px-[14px] shrink-0">
            <PhoneStatusBar />
          </div>

          {/* Screen Content Carousel */}
          <div className="flex-1 relative overflow-hidden px-[13px] pt-1 pb-4">
            <AnimatePresence mode="wait">
              {/* ══════════════════════════════════════
                  VIEW 1: SEND & PAY (Home Screen)
                  ══════════════════════════════════════ */}
              {mode === 'send' && (
                <motion.div
                  key="send-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col"
                >
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
                  <div className="mt-3.5 flex justify-between px-3">
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

                  {/* Live Transaction Animation Toast */}
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 p-2.5 rounded-[12px] bg-emerald-50 border border-emerald-200/80 flex items-center gap-2.5"
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

                  {/* Recent Activity */}
                  <div className="mt-3 flex-1 flex flex-col justify-end">
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
                  VIEW 2: CARDS (Naira & Dollar)
                  ══════════════════════════════════════ */}
              {mode === 'cards' && (
                <motion.div
                  key="cards-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[13px] font-bold text-[#161c22]">Virtual Cards</span>
                    <div className="flex items-center gap-1 bg-[#f2f5f9] p-0.5 rounded-full text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setActiveCardCurrency('NGN')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer ${
                          activeCardCurrency === 'NGN' ? 'bg-[#043e97] text-white' : 'text-[#4c5866]'
                        }`}
                      >
                        ₦ Naira
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveCardCurrency('USD')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer ${
                          activeCardCurrency === 'USD' ? 'bg-[#161c22] text-white' : 'text-[#4c5866]'
                        }`}
                      >
                        $ Dollar
                      </button>
                    </div>
                  </div>

                  {/* Virtual Card Graphic */}
                  <div className="mt-3 relative w-full h-[145px] rounded-[14px] p-3.5 flex flex-col justify-between text-white shadow-md overflow-hidden transition-all duration-300">
                    {/* Background */}
                    <div
                      className={`absolute inset-0 transition-colors duration-300 ${
                        activeCardCurrency === 'NGN'
                          ? 'bg-gradient-to-br from-[#043e97] via-[#0976da] to-[#032e73]'
                          : 'bg-gradient-to-br from-[#161c22] via-[#242e3a] to-[#0e1217]'
                      }`}
                    />

                    {/* Frozen Glass Overlay */}
                    <AnimatePresence>
                      {isCardFrozen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-cyan-950/75 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-cyan-200"
                        >
                          <Snowflake className="w-7 h-7 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
                          <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-cyan-100">
                            Card Frozen
                          </span>
                          <span className="text-[8px] text-cyan-300/80">Online payments blocked</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Card Content */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-tight">axoora</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                        {activeCardCurrency === 'NGN' ? 'Naira Virtual' : 'Dollar Virtual'}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-6 h-4 rounded-[3px] bg-amber-300/90 border border-amber-400" />
                      <span className="text-[11px] font-mono tracking-widest">
                        •••• {activeCardCurrency === 'NGN' ? '4417' : '9120'}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <div className="text-[7.5px] uppercase text-white/70">Card Balance</div>
                        <div className="text-[13px] font-bold">
                          {activeCardCurrency === 'NGN' ? '₦112,430.00' : '$248.10'}
                        </div>
                      </div>
                      <span className="text-[9px] font-medium text-white/80">08/29</span>
                    </div>
                  </div>

                  {/* Card Controls */}
                  <div className="mt-3.5 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCardFrozen(!isCardFrozen)}
                      className={`w-full py-2 px-3 rounded-[10px] text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer border ${
                        isCardFrozen
                          ? 'bg-cyan-50 border-cyan-300 text-cyan-900'
                          : 'bg-[#f7f9fb] border-[#dde3ea] text-[#161c22] hover:bg-[#edf2f7]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {isCardFrozen ? (
                          <Snowflake className="w-3.5 h-3.5 text-cyan-600" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-[#0976da]" />
                        )}
                        <span>{isCardFrozen ? 'Card is Frozen' : 'Freeze Card in 1 Tap'}</span>
                      </span>
                      <span className="text-[9.5px] font-bold text-[#0976da]">
                        {isCardFrozen ? 'Tap to Unfreeze' : 'Freeze'}
                      </span>
                    </button>

                    <div className="p-2.5 rounded-[10px] bg-[#f7f9fb] border border-[#dde3ea] flex items-center justify-between text-[10px] text-[#4c5866]">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Zero FX Hidden Markup
                      </span>
                      <span className="font-bold text-[#161c22]">CBN Compliant</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══════════════════════════════════════
                  VIEW 3: AJO & SAVINGS CIRCLES
                  ══════════════════════════════════════ */}
              {mode === 'circles' && (
                <motion.div
                  key="circles-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col"
                >
                  <div className="py-1">
                    <span className="text-[13px] font-bold text-[#161c22]">Ajo Circles & Savings</span>
                    <p className="text-[9px] text-[#5c6877]">Rotating savings with verified friends</p>
                  </div>

                  {/* Active Ajo Card */}
                  <div className="mt-2.5 p-3 rounded-[12px] bg-gradient-to-br from-[#f2f8ff] to-[#e4f0fc] border border-[#cbe1f7]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#043e97]">Tech Tribe Ajo</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#043e97] text-white text-[8px] font-bold">
                        Turn 3 of 6 (You)
                      </span>
                    </div>

                    <div className="mt-2 text-[18px] font-bold text-[#161c22]">
                      ₦600,000<span className="text-[12px] text-[#5c6877]"> payout</span>
                    </div>

                    {/* Member Avatars */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {['AB', 'CO', 'TA', 'IM', 'FK', 'ZM'].map((init, i) => (
                          <div
                            key={init}
                            className={`w-[22px] h-[22px] rounded-full border-2 border-white flex items-center justify-center text-[7.5px] font-bold ${
                              i < 4 ? 'bg-[#043e97] text-white' : 'bg-slate-300 text-slate-700'
                            }`}
                          >
                            {init}
                          </div>
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700">4 / 6 paid today</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '66%' }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-[#0976da] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Non-Interest Target Pot */}
                  <div className="mt-3 p-3 rounded-[12px] bg-[#f7f9fb] border border-[#dde3ea]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#0976da]" />
                        <span className="text-[11px] font-bold text-[#161c22]">MacBook Pro Fund</span>
                      </div>
                      <span className="text-[8.5px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Halal Profit
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-baseline justify-between text-[11px]">
                      <span className="font-bold text-[#161c22]">₦425,000</span>
                      <span className="text-[9px] text-[#5c6877]">Target: ₦500,000</span>
                    </div>

                    <div className="mt-1.5 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1 }}
                        className="h-full bg-emerald-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══════════════════════════════════════
                  VIEW 4: WHATSAPP BANKING
                  ══════════════════════════════════════ */}
              {mode === 'whatsapp' && (
                <motion.div
                  key="whatsapp-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col justify-between"
                >
                  {/* WhatsApp Top Bar */}
                  <div className="p-2 rounded-[10px] bg-[#075e54] text-white flex items-center gap-2">
                    <div className="w-[26px] h-[26px] rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold leading-tight flex items-center gap-1">
                        <span>Axoora AI</span>
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#25d366] fill-[#25d366]" />
                      </div>
                      <div className="text-[7.5px] text-white/80">Official WhatsApp Banking</div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="flex-1 flex flex-col justify-center gap-2 py-2">
                    {/* User bubble */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="self-end max-w-[85%] bg-[#d9fdd3] text-[#111b21] p-2 rounded-[10px] rounded-tr-none text-[9.5px] shadow-sm"
                    >
                      Send ₦15,000 to Mum from my Naira account
                    </motion.div>

                    {/* Bot prompt */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="self-start max-w-[90%] bg-white text-[#111b21] p-2 rounded-[10px] rounded-tl-none text-[9px] shadow-sm border border-[#e2e8f0]"
                    >
                      <div className="font-semibold text-[#043e97] mb-0.5">Transfer Confirmation:</div>
                      <div>Recipient: Zainab Balogun (Zenith)</div>
                      <div>Amount: ₦15,000.00 · Fee: ₦0.00</div>
                      <div className="text-[8px] text-slate-500 mt-1">Reply &apos;1&apos; with PIN to confirm.</div>
                    </motion.div>

                    {/* Bot Success */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="self-start max-w-[90%] bg-white text-[#111b21] p-2 rounded-[10px] rounded-tl-none text-[9px] shadow-sm border border-emerald-300"
                    >
                      <div className="flex items-center gap-1 text-emerald-700 font-bold mb-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Transfer Completed!</span>
                      </div>
                      <div className="text-[8.5px]">Receipt #AX-9481 sent to recipient. New balance: ₦97,430.00.</div>
                    </motion.div>
                  </div>

                  {/* Fake input bar */}
                  <div className="p-1.5 rounded-[8px] bg-[#f0f2f5] flex items-center justify-between text-[9px] text-[#667781]">
                    <span>Type a banking command...</span>
                    <div className="w-5 h-5 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Progress Tracker */}
          <div className="px-4 pb-2">
            <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                key={mode}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '100%' : '100%' }}
                transition={{ duration: isPaused ? 0 : 5.5, ease: 'linear' }}
                className="h-full bg-[#0976da]"
              />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
