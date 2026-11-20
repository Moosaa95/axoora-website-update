'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, Lock, AlertCircle, RefreshCw, Smartphone, KeyRound, CheckCircle2 } from 'lucide-react';

export const SecurityView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ─── Hero Header matching Figma 3222:1583 ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            Security &amp; Financial Trust
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            You Always Know Where Your Money Is.
          </h1>
          <p className="text-lg sm:text-xl text-[#4c5866] dark:text-slate-300 leading-relaxed mb-8">
            Security at Axoora is not an invisible black box. It is immediate transparency on every payment, every failure, and every debit.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={openDownloadApp}
              className="bg-[#161c22] text-white hover:bg-black px-6 py-3 rounded-xl font-bold text-sm transition"
            >
              Get the app
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="border border-[#161c22] dark:border-white text-[#161c22] dark:text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Start on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4 Security Pillars ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-6">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              PIN or Fingerprint on Every Payment
            </h3>
            <p className="text-base text-[#4c5866] dark:text-slate-400 leading-relaxed">
              With the verified recipient name and exact amount on screen before you authorize. No silent background debits, ever.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Your BVN Stays Private
            </h3>
            <p className="text-base text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Used strictly to confirm your legal identity with NIBSS during tier compliance. It is never exposed, shared, or accessible to merchants.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-6">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Clear Answers When Things Fail
            </h3>
            <p className="text-base text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Every failed transfer screen explicitly states whether your balance was debited, why the beneficiary bank refused it, and what happens next.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Stalled Transfers Get a Deadline
            </h3>
            <p className="text-base text-[#4c5866] dark:text-slate-400 leading-relaxed">
              No endless waiting for reversals. When NIBSS interbank rails stall, an automated 2-hour settlement deadline either forces settlement or reverses the funds back into your wallet.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Institutional Compliance Box ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-[#161c22] text-white rounded-[28px] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>CBN &amp; NDIC Protected</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Central Bank of Nigeria Regulated Rails
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              All transactions settle directly over official Nigerian interbank payment switches. Customer balances are safeguarded under legal NDIC insurance guidelines.
            </p>
          </div>
          <button
            type="button"
            onClick={openWhatsApp}
            className="border border-slate-600 text-white hover:bg-slate-800 px-6 py-3 rounded-xl font-bold text-sm shrink-0 transition"
          >
            Ask Compliance Desk
          </button>
        </div>
      </section>
    </div>
  );
};
