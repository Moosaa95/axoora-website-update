'use client';

import React from 'react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, CheckCircle2, Clock, Lock, Sparkles, Building2, MapPin } from 'lucide-react';

interface AboutViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ─── Hero Section matching Figma 3227:2547 ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            About Axoora
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            Money Should Be Simple. Especially Here.
          </h1>
          <p className="text-lg sm:text-xl text-[#4c5866] dark:text-slate-300 leading-relaxed mb-8">
            Axoora is a Nigerian wallet built on one rule: you should never have to guess what your money is doing.
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

      {/* ─── Why We Built It ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-14 shadow-xs max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Why We Built It
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed">
            <p>
              Most people in Nigeria do not lose money to fraud. They lose it to <em>not knowing</em>. A transfer that sits in limbo for three days. A debit with no explanation. A balance that does not match the one in your head.
            </p>
            <p>
              So we started from the awkward end. Every failure explicitly states whether you were charged. Every stalled transfer gets a deadline it must resolve by. Every payment is approved by you, with the amount and the verified recipient on screen.
            </p>
            <p>
              The rest of it — sending, paying, saving, and Ajo — is the part everybody builds. The real difference is whether you can trust what it tells you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What We Hold To (The 3 Principles) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
          What We Hold To
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Say If You Were Charged
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Every failure answers the only question that matters: was your money taken, or is it still safe in your wallet?
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-6">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Silent Limbo
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              A payment that stalls gets an automatic time deadline. It resolves or returns.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-6">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Nothing Without You
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Your PIN or your fingerprint on every single payment. Clear amounts on screen.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Institutional Presence ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3 text-blue-400">
              <Building2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Lagos & Abuja Headquarters</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Licensed & Institutional-Grade
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Axoora operates under full Central Bank of Nigeria (CBN) regulatory compliance guidelines. Customer deposits are insured by the NDIC up to legal maximum limits.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Suite 08 Cappador Mall, Maitama, Abuja</span>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2">
            Come and See.
          </h3>
          <p className="text-base text-[#4c5866] dark:text-slate-400">
            Your phone number and BVN are all you need to start.
          </p>
        </div>
        <div className="flex items-center gap-4">
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
      </section>
    </div>
  );
};
