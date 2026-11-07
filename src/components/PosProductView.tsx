'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenType } from '../types';
import { FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { FaqAccordionItem } from './FaqAccordionItem';
import { BlogArticlesCarousel } from './BlogArticlesCarousel';

interface PosProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
}

export const PosProductView: React.FC<PosProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeNetwork, setActiveNetwork] = useState<'mtn' | 'airtel'>('mtn');

  // Terminal Hardware Specifications
  const hardwareFeatures = [
    {
      icon: 'signal_cellular_alt',
      title: 'Dual-SIM 4G Failover',
      subtitle: 'MTN + Airtel Redundancy',
      desc: 'Smart SIM switching ensures zero dropped checkout transactions during network congestion.',
      accent: '#F2A93B',
      tag: 'Zero Downtime',
    },
    {
      icon: 'bolt',
      title: 'Sub-2s Direct Settlement',
      subtitle: 'Instant NIBSS Clearing',
      desc: 'All customer card swipes and transfers are credited straight to your account in under 2 seconds.',
      accent: '#00DF8F',
      tag: 'Real-Time Credit',
    },
    {
      icon: 'battery_charging_full',
      title: '5200mAh All-Day Battery',
      subtitle: '18+ Hours Market Runtime',
      desc: 'High-density lithium battery crafted for all-day market operations, plus rapid type-C charging.',
      accent: '#0D95FE',
      tag: 'Long Battery Life',
    },
    {
      icon: 'print',
      title: 'High-Speed Thermal Printer',
      subtitle: '58mm Instant Receipts',
      desc: 'Heavy-duty Japanese thermal printhead delivers receipts in under 1 second without ink ribbon jams.',
      accent: '#34C08D',
      tag: 'Reliable Printing',
    },
    {
      icon: 'account_balance_wallet',
      title: 'Daily Agency Working Float',
      subtitle: 'Zero Liquidity Droughts',
      desc: 'Access instant daily working capital on your terminal till to handle customer cash withdrawals.',
      accent: '#00DF8F',
      tag: 'Instant Float',
    },
    {
      icon: 'shield',
      title: 'PCI-PTS 6.x Certified',
      subtitle: 'Encrypted PIN & Chip',
      desc: 'Bank-grade EMV chip, contactless NFC, and encrypted hardware tamper sensors for customer protection.',
      accent: '#0D95FE',
      tag: 'Bank-Grade Security',
    },
  ];

  const posFaqs = FAQ_LIST.filter(
    (faq) => faq.category === 'Business & POS' || faq.tags?.includes('pos')
  ).slice(0, 6);
  const [openFaqId, setOpenFaqId] = useState<string | null>(posFaqs[0]?.id || null);

  return (
    <div
      className={`w-full font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-[#0D95FE]/20 selection:text-slate-900'
          : 'bg-[#020F2E] text-[#F2F5F9] selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b overflow-hidden transition-colors ${
          isLight
            ? 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white'
            : 'border-[#14294F] bg-gradient-to-b from-[#020F2E] via-[#021844] to-[#020F2E]'
        }`}
      >
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#F2A93B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00DF8F]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-amber-50 dark:bg-[#0A1B3D] border border-amber-200 dark:border-[#14294F] text-xs font-mono font-medium text-amber-800 dark:text-[#F2A93B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B] animate-pulse" />
              <span>APEX 4G ANDROID POS TERMINALS // SUB-2S SETTLEMENT</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              High-Uptime Hardware <br />
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isLight
                    ? 'from-slate-900 via-amber-600 to-emerald-600'
                    : 'from-[#F2F5F9] via-[#F2A93B] to-[#00DF8F]'
                }`}
              >
                For Agents &amp; Merchants.
              </span>
            </h1>

            <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Equipped with dual active 4G SIM slots (MTN + Airtel) that auto-failover to eliminate transaction drops. Sub-2s NIBSS settlement directly to your account.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <button
                onClick={() => onOpenWaitlist('pos-agent')}
                className="px-6 py-3.5 rounded-2xl bg-[#F2A93B] hover:bg-[#00DF8F] text-[#01091C] font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-[#F2A93B]/25 transition-all cursor-pointer active:scale-98"
              >
                <span>Request Apex POS Terminal</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenWhatsApp}
                className={`px-5 py-3.5 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-[#0A1B3D] hover:bg-[#14294F] text-[#F2F5F9] border-[#14294F]'
                }`}
              >
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">chat</span>
                <span>Inquire on WhatsApp</span>
              </button>
            </div>

            {/* Quick Specs Pill Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-mono">
              <span className={`px-3 py-1 rounded-lg border font-semibold ${
                isLight ? 'bg-white border-slate-200 text-amber-700' : 'bg-[#0A1B3D] border-[#14294F] text-[#F2A93B]'
              }`}>
                ✓ Dual-SIM 4G Failover
              </span>
              <span className={`px-3 py-1 rounded-lg border font-semibold ${
                isLight ? 'bg-white border-slate-200 text-emerald-700' : 'bg-[#0A1B3D] border-[#14294F] text-[#00DF8F]'
              }`}>
                ✓ Sub-2s Settlement
              </span>
              <span className={`px-3 py-1 rounded-lg border font-semibold ${
                isLight ? 'bg-white border-slate-200 text-blue-700' : 'bg-[#0A1B3D] border-[#14294F] text-[#0D95FE]'
              }`}>
                ✓ Instant Agent Float
              </span>
            </div>
          </div>

          {/* Right Column: Interactive POS Device Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl flex flex-col gap-5 w-full max-w-md ${
              isLight ? 'bg-white border-slate-200 shadow-slate-200/80' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-[#14294F]">
                <div>
                  <span className={`font-extrabold text-sm block ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
                    Apex 4G Smart Terminal
                  </span>
                  <span className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                    Model: AX-500 Android OS
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#00DF8F]/20 dark:text-[#00DF8F] font-bold">
                  99.98% UPTIME
                </span>
              </div>

              {/* Network Toggle Simulator */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                  ACTIVE NETWORK SWITCH
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#020F2E] border border-slate-200 dark:border-[#14294F]">
                  <button
                    onClick={() => setActiveNetwork('mtn')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeNetwork === 'mtn'
                        ? 'bg-[#F2A93B] text-[#01091C] shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SIM 1: MTN 4G</span>
                  </button>
                  <button
                    onClick={() => setActiveNetwork('airtel')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeNetwork === 'airtel'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SIM 2: Airtel 4G</span>
                  </button>
                </div>
              </div>

              {/* Hardware Spec Strip */}
              <div className="flex flex-col gap-2.5 text-xs">
                <div className={`flex items-center justify-between p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
                }`}>
                  <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Active SIM Connection</span>
                  <span className="font-mono text-emerald-600 dark:text-[#00DF8F] font-bold">
                    {activeNetwork === 'mtn' ? 'MTN 4G LTE (Primary)' : 'Airtel 4G LTE (Failover)'}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
                }`}>
                  <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Settlement Speed</span>
                  <span className="font-mono text-blue-600 dark:text-[#0D95FE] font-bold">Sub-2 Seconds (NIBSS)</span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
                }`}>
                  <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Battery Runtime</span>
                  <span className="font-mono text-amber-600 dark:text-[#F2A93B] font-bold">5200mAh (18+ hours)</span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
                }`}>
                  <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Cash Liquidity</span>
                  <span className="font-mono text-emerald-600 dark:text-[#00DF8F] font-bold">Instant Agent Float</span>
                </div>
              </div>

              <button
                onClick={() => onOpenWaitlist('pos-agent')}
                className="w-full py-3 rounded-2xl bg-[#F2A93B] hover:bg-[#00DF8F] text-[#01091C] font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
              >
                Apply for POS Terminal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIX POS HARDWARE & AGENCY PILLARS */}
      <section className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F2A93B] font-bold">
              TERMINAL SPECIFICATIONS &amp; FLEET
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
              Engineered for zero dropped transactions.
            </h2>
            <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Every detail is optimized for high-volume retail counters, market stands, and agency banking operators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareFeatures.map((feat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-amber-400 shadow-xs'
                    : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#F2A93B]'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: `${feat.accent}20`,
                        color: feat.accent,
                      }}
                    >
                      <span className="material-symbols-outlined text-[28px]">{feat.icon}</span>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${feat.accent}15`,
                        color: feat.accent,
                      }}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
                      {feat.title}
                    </h3>
                    <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                      {feat.subtitle}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMISSION & AGENT EARNINGS STRUCTURE */}
      <section className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
        isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#01091C] border-[#14294F]'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
              TRANSPARENT REVENUE MODEL
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
              Keep more of what you earn.
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Zero hidden target penalties. Transparent flat fees with instant daily settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-3xl border-2 flex flex-col gap-4 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
              <h3 className="font-extrabold text-base">Cash Out / Withdrawals</h3>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-[#00DF8F]">
                Flat 0.5%
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Capped at ₦100 for high amounts. You keep the rest of your agency margin on customer cash withdrawals.
              </p>
            </div>

            <div className={`p-6 rounded-3xl border-2 flex flex-col gap-4 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#0D95FE]/20 text-[#0D95FE] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">send</span>
              </div>
              <h3 className="font-extrabold text-base">Direct Transfers In</h3>
              <div className="text-2xl font-black font-mono text-blue-600 dark:text-[#0D95FE]">
                ₦0.00 Free
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Receive funds from any Nigerian bank account via NUBAN or virtual account with zero incoming charges.
              </p>
            </div>

            <div className={`p-6 rounded-3xl border-2 flex flex-col gap-4 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/20 text-[#F2A93B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">receipt_long</span>
              </div>
              <h3 className="font-extrabold text-base">Bills &amp; Airtime Recharges</h3>
              <div className="text-2xl font-black font-mono text-amber-600 dark:text-[#F2A93B]">
                Up to 3% Back
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Earn instant commission kickbacks credited directly to your terminal wallet on every utility or airtime top-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POS BUSINESS & AGENT GUIDES */}
      <section className="w-full">
        <BlogArticlesCarousel onNavigate={onNavigate} />
      </section>

      {/* 5. POS FAQS */}
      <section className={`w-full px-4 sm:px-6 lg:px-8 py-20 transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#020F2E] border-t border-[#14294F]'
      }`}>
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F2A93B] font-bold">
              AGENT NETWORK
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Frequently Asked Questions About POS
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Clear answers regarding deployment timelines, float requirements, and hardware warranties.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {posFaqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id || faq.question}
                item={faq}
                isOpen={openFaqId === (faq.id || faq.question)}
                onToggle={() =>
                  setOpenFaqId(openFaqId === (faq.id || faq.question) ? null : faq.id || faq.question)
                }
                onOpenWaitlist={onOpenWaitlist}
                onOpenWhatsApp={onOpenWhatsApp}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
