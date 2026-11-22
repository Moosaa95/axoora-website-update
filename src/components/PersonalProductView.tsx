'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Zap,
  Clock,
  Sparkles,
  Plane,
  AlertCircle,
  Eye,
  EyeOff,
  Store,
  ChevronRight
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface PersonalProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
  onOpenCommandDrawer?: () => void;
}

export const PersonalProductView: React.FC<PersonalProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Interactive Card freeze state
  const [nairaFrozen, setNairaFrozen] = useState(false);
  const [dollarFrozen, setDollarFrozen] = useState(false);

  // Bank down simulator
  const [simulatingBankDown, setSimulatingBankDown] = useState(false);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ─── Hero Header: Send and Pay (Figma A2 · Send and Pay 3218:675) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-16">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden p-8 sm:p-14 lg:p-16 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block mb-4">
              Send and Pay
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Bank on WhatsApp.
            </h1>
            <p className="text-lg sm:text-xl text-[#d6ebff] font-normal leading-relaxed max-w-lg mb-8">
              The same account either way. Same limits, same PIN. Describe your transfer in natural words.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenDownloadApp}
                className="bg-white text-[#161c22] hover:bg-slate-100 px-6 py-3.5 rounded-[10px] font-bold text-sm transition shadow-sm cursor-pointer"
              >
                Get the app
              </button>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="border-[1.5px] border-white text-white hover:bg-white/10 px-6 py-3.5 rounded-[10px] font-bold text-sm transition cursor-pointer"
              >
                Start on WhatsApp
              </button>
            </div>
          </div>

          {/* Right: Live WhatsApp Chat Simulation */}
          <div className="lg:col-span-5 bg-[#0b141a] rounded-2xl p-5 shadow-2xl font-sans text-xs border border-slate-700 max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800 text-white">
              <div className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <span className="font-bold block text-sm">Axoora Verified Desk</span>
                <span className="text-[10px] text-slate-400">Official Banking Assistant</span>
              </div>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-lg rounded-tl-none max-w-[85%]">
                <span>Hi Adaeze. What do you want to do today?</span>
                <span className="block text-[9px] text-slate-400 text-right mt-1">14:06</span>
              </div>

              <div className="bg-[#005c4b] text-white p-2.5 rounded-lg rounded-tr-none max-w-[85%] ml-auto">
                <span>Send 25k to Chidinma</span>
                <span className="block text-[9px] text-emerald-200 text-right mt-1">14:07</span>
              </div>

              <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-lg rounded-tl-none max-w-[90%]">
                <span className="font-bold text-emerald-400 block mb-1">CHIDINMA OKAFOR</span>
                <span className="block text-slate-300">GTBank · 0123456789</span>
                <span className="block text-slate-300">₦25,000.00 · fee ₦0.00</span>
                <span className="block mt-1 font-semibold text-white">Reply YES to confirm transfer.</span>
                <span className="block text-[9px] text-slate-400 text-right mt-1">14:07</span>
              </div>

              <div className="bg-[#005c4b] text-white p-2.5 rounded-lg rounded-tr-none max-w-[40%] ml-auto text-center font-bold">
                <span>YES</span>
                <span className="block text-[9px] text-emerald-200 text-right mt-1">14:08</span>
              </div>

              <div className="bg-[#202c33] text-slate-100 p-2.5 rounded-lg rounded-tl-none max-w-[90%]">
                <span className="text-emerald-400 font-bold block mb-1">✓ Done!</span>
                <span>₦25,000.00 sent to CHIDINMA OKAFOR. Balance now ₦87,420.00.</span>
                <span className="block text-[9px] text-slate-400 text-right mt-1">14:08</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bank Health Section (Figma 3218:675) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
              Bank Health Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Know a Bank Is Down Before You Send.
            </h2>
            <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed mb-6">
              Nigerian banks go down. When the receiving bank is experiencing downtime, Axoora flags it right where you pick it — before your money leaves.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 dark:text-slate-200">
                  A bank with problems is flagged directly in your beneficiary picker.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 dark:text-slate-200">
                  If an interbank rail fails, you are clearly informed whether you were debited.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 dark:text-slate-200">
                  A stalled transfer gets a guaranteed deadline it must resolve or reverse by.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-amber-200 dark:border-amber-900/40 shadow-xs">
              <div className="flex items-center gap-2.5 text-amber-600 font-bold text-sm mb-2">
                <AlertCircle className="w-5 h-5" />
                <span>GTBank Could Not Take It</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                They are experiencing an outage on their switch right now. This is on their side.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                ✓ You were NOT debited.
              </div>
              <div className="text-[11px] text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Target Beneficiary</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Chidinma Okafor</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Balance</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">₦112,430.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cards Showcase (Figma A3 · Cards 3218:935) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            Multi-Currency Cards
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Two Cards. Two Balances.
          </h2>
          <p className="text-lg text-[#4c5866] dark:text-slate-300">
            Pay online in naira. Pay abroad in dollars, from a balance of its own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Naira Card Box */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase text-slate-500">Naira Debit</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${nairaFrozen ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {nairaFrozen ? 'Frozen' : 'Active'}
                </span>
              </div>
              <div className="h-44 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md mb-6">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Axoora Virtual NGN</span>
                  <span className="font-bold text-white">₦ NGN</span>
                </div>
                <div>
                  <span className="font-mono text-base tracking-widest block mb-1">5061 •••• •••• 4417</span>
                  <span className="text-xs text-slate-300">Adaeze N. Balogun</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNairaFrozen(!nairaFrozen)}
              className="w-full py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {nairaFrozen ? 'Unfreeze Naira Card' : 'Freeze in a Tap'}
            </button>
          </div>

          {/* Dollar Card Box */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase text-blue-500">Dollar Spending</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${dollarFrozen ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {dollarFrozen ? 'Frozen' : 'Active'}
                </span>
              </div>
              <div className="h-44 bg-gradient-to-br from-[#043e97] to-[#0976da] text-white rounded-2xl p-6 flex flex-col justify-between shadow-md mb-6">
                <div className="flex justify-between items-center text-xs text-blue-200">
                  <span>Axoora Global USD</span>
                  <span className="font-bold text-white">$ USD</span>
                </div>
                <div>
                  <span className="font-mono text-base tracking-widest block mb-1">4571 •••• •••• 9120</span>
                  <span className="text-xs text-blue-100">Adaeze N. Balogun</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDollarFrozen(!dollarFrozen)}
              className="w-full py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {dollarFrozen ? 'Unfreeze Dollar Card' : 'Freeze in a Tap'}
            </button>
          </div>
        </div>
      </section>

      {/* ─── Savings & Ajo Showcase (Figma A4 · Savings and Ajo 3222:1402) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-2">
            Ethical Savings & Peer Thrift
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Save on Your Own. Or Save Together.
          </h2>
          <p className="text-lg text-[#4c5866] dark:text-slate-300">
            Non-interest plans that show their working, and Ajo circles that keep the record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Non-Interest Savings */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-6">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mb-2">What Non-Interest Actually Means</h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
              No promised fixed interest rate. Plans show an expected profit-sharing range. Each monthly statement lists which ethical trade assets funded your return.
            </p>
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Flexible Vault (Take out anytime)</span>
                <span className="font-bold text-emerald-600">₦35,000.00</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Fixed 12-Month Plan (3 Aug 2027)</span>
                <span className="font-bold text-emerald-600">₦50,000.00</span>
              </div>
            </div>
          </div>

          {/* Ajo and Pay Circle */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-6">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ajo, Without the Notebook</h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
              Run a circle with people you trust. Everyone sees who has paid, who is next, and what the payout will be.
            </p>
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">Lagos Traders Circle</span>
                  <span className="text-[10px] text-slate-500">8 members · Due Fri</span>
                </div>
                <span className="font-bold text-blue-600">₦10,000/mo</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">Sisters’ Savings</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Your Turn Next</span>
                </div>
                <span className="font-bold text-blue-600">₦5,000/wk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2">
            Send Your First One Today.
          </h3>
          <p className="text-base text-[#4c5866] dark:text-slate-400">
            Your phone number and BVN are all you need to start.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenDownloadApp}
            className="bg-[#161c22] text-white hover:bg-black px-6 py-3 rounded-xl font-bold text-sm transition"
          >
            Get the app
          </button>
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="border border-[#161c22] dark:border-white text-[#161c22] dark:text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Start on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};
