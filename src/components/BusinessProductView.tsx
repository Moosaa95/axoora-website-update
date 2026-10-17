'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { FaqAccordionItem } from './FaqAccordionItem';
import { BusinessHeroShowcase } from './BusinessHeroShowcase';
import { MerchantMarquee } from './MerchantMarquee';
import { StickyToolsSection } from './StickyToolsSection';
import { CustomerTestimonialCarousel } from './CustomerTestimonialCarousel';
import { InteractiveGetStarted } from './InteractiveGetStarted';
import { BlogArticlesCarousel } from './BlogArticlesCarousel';
import { CompactRegulatoryTrust } from './RegulatoryLogos';

interface BusinessProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const BusinessProductView: React.FC<BusinessProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Interactive Invoice Demo State
  const [customerName, setCustomerName] = useState('Alhaji Kabir & Sons');
  const [invoiceAmount, setInvoiceAmount] = useState('450,000');
  const [invoiceItem, setInvoiceItem] = useState('50 Cartons Vegetable Oil');
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  // Business-only FAQs
  const businessFaqs = FAQ_LIST.filter(
    (faq) => faq.category === 'Business & POS'
  ).slice(0, 6);
  const [openFaqId, setOpenFaqId] = useState<string | null>(businessFaqs[0]?.id || null);

  const businessPillars = [
    {
      icon: 'account_balance',
      title: 'Dedicated Commercial NUBAN',
      subtitle: 'CAC & Enterprise Ready',
      desc: 'Open a compliant bank account in your enterprise name. Generate verified bank letters, handle multi-director signatory authorizations, and export clean audit statements in one tap.',
      accent: '#0D95FE',
      tag: 'Zero Monthly Maintenance',
    },
    {
      icon: 'bolt',
      title: 'Instant Sub-2s Settlement',
      subtitle: 'Real-Time Working Capital',
      desc: 'Eliminate end-of-day anxiety and pending settlement buffers. Every customer card swipe on your POS and instant transfer hits your shop available balance in under two seconds.',
      accent: '#00DF8F',
      tag: 'NIBSS Direct Connected',
    },
    {
      icon: 'credit_card',
      title: 'Multi-User Staff Expense Cards',
      subtitle: 'Store & Driver Controls',
      desc: 'Issue physical and virtual Visa cards to store managers, cashiers, and dispatch riders. Lock categories to Fuel & Stock only, set automated daily ceilings, and freeze instantly.',
      accent: '#F2A93B',
      tag: 'Prevent Embezzlement',
    },
    {
      icon: 'inventory_2',
      title: 'Non-Interest Stock Float',
      subtitle: 'Halal Inventory Financing',
      desc: '0% Riba, transparent Murabaha stock financing. We fund your bulk restock directly with vetted FMCG manufacturers and grain suppliers, giving you breathing room to sell.',
      accent: '#34C08D',
      tag: '100% Shariah Compliant',
    },
  ];

  return (
    <div
      className={`w-full font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-[#0D95FE]/20 selection:text-slate-900'
          : 'bg-[#020F2E] text-[#F2F5F9] selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. BUSINESS HERO SECTION (SHOWING THE DIFFERENT THINGS AXOORA DOES) */}
      {/* ========================================================================= */}
      <section
        className={`relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b overflow-hidden transition-colors ${
          isLight
            ? 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white'
            : 'border-[#14294F] bg-[#020F2E]'
        }`}
      >
        {/* Subtle Blueprint Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: isLight
              ? 'linear-gradient(to right, rgba(13, 149, 254, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(13, 149, 254, 0.08) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(20, 41, 79, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 41, 79, 0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#0D95FE]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00DF8F]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Business Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#0A1B3D]/80 border border-[#14294F] text-xs font-medium text-slate-300">
              <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">verified</span>
              <span>Central Bank of Nigeria Supervised · NDIC Insured</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              The smart operating system for Nigerian businesses
            </h1>

            <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Flagship 4G POS terminals, instant sub-second till settlements, and 0% interest halal stock float designed for real shop floors across Nigeria.
            </p>

            {/* Clean Moniepoint-Style Single Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <button
                onClick={() => onOpenWaitlist('business')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D95FE]/25 transition-all cursor-pointer active:scale-98"
              >
                <span>Apply for Business Account</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onOpenWaitlist('pos-agent')}
                className={`w-full sm:w-auto px-6 py-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-[#0A1B3D] hover:bg-[#14294F] text-[#F2F5F9] border-[#14294F]'
                }`}
              >
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">point_of_sale</span>
                <span>Apply for Smart POS</span>
              </button>
            </div>

            {/* Kuda-Style Compact Regulatory Trust Lockup */}
            <div className="w-full pt-3 flex justify-center lg:justify-start">
              <CompactRegulatoryTrust
                isLight={isLight}
                onInspect={() => onOpenWaitlist('business')}
              />
            </div>
          </div>

          {/* Right Column: Hero Visual showing POS + Business App Interface */}
          <div className="lg:col-span-6 flex justify-center">
            <BusinessHeroShowcase
              isLight={isLight}
              onOpenWaitlist={onOpenWaitlist}
              onOpenWhatsApp={onOpenWhatsApp}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REGULATORY & SWITCH SPEED TICKER STRIP */}
      {/* ========================================================================= */}
      <div
        className={`w-full py-2.5 px-4 sm:px-6 lg:px-8 border-b transition-colors ${
          isLight
            ? 'bg-slate-50/90 border-slate-200 text-slate-700'
            : 'bg-[#01091C]/90 border-[#14294F] text-[#A8BBD6]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
            <span className={isLight ? 'text-slate-900 font-semibold' : 'text-[#F2F5F9] font-semibold'}>
              CENTRAL BANK OF NIGERIA SUPERVISED
            </span>
            <span className="opacity-40">|</span>
            <span>Eligible Deposits Insured by NDIC</span>
          </div>

          <div className="flex items-center gap-4 hidden sm:flex">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-[#00DF8F]">
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span>Sub-2s NIBSS Rails</span>
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-[#0D95FE]">
              <span className="material-symbols-outlined text-[15px]">security</span>
              <span>PCI-DSS Level 1</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BUSINESSES THAT COUNT ON US (MERCHANT MARQUEE) */}
      {/* ========================================================================= */}
      <MerchantMarquee isLight={isLight} />

      {/* ========================================================================= */}
      {/* 4. THE STICKY BAR: BUILT FOR ENTERPRISE & RETAIL SCALE (ON BUSINESS ALONE) */}
      {/* ========================================================================= */}
      <StickyToolsSection
        isLight={isLight}
        onNavigate={onNavigate || (() => {})}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 5. CUSTOMER TESTIMONIALS: "DON'T JUST TAKE OUR WORD FOR IT" */}
      {/* ========================================================================= */}
      <CustomerTestimonialCarousel
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 6. FOUR CORE BUSINESS PILLARS */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              OPERATIONAL RAIL FOR ENTERPRISES
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Built for how Nigerian shops actually run.
            </h2>
            <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Engineered to eliminate theft, remove manual receipt headaches, and keep your inventory shelves full.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessPillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-slate-50/70 border-slate-200 hover:border-blue-300 shadow-xs'
                    : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#0D95FE]'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: `${pillar.accent}20`,
                        color: pillar.accent,
                      }}
                    >
                      <span className="material-symbols-outlined text-[28px]">{pillar.icon}</span>
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${pillar.accent}15`,
                        color: pillar.accent,
                      }}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
                      {pillar.title}
                    </h3>
                    <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                      {pillar.subtitle}
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. MONZO-INSPIRED HUMAN BANKING: MORE TIME FOR BUSINESS, LESS ON BANKING */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
          isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#01091C] border-[#14294F]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
              THE AXOORA DIFFERENCE
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              More time for your business. Less time on banking.
            </h2>
            <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Traditional banks treat Nigerian shops like a risk to manage. We built an operating system designed around the daily realities of your counter, warehouse, and cashflow.
            </p>
          </div>

          {/* Comparison Grid: Old Bank Headaches vs Axoora Human Banking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Old Nigerian Banking Way */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between gap-6 ${
                isLight
                  ? 'bg-white border-red-200/80 shadow-xs'
                  : 'bg-[#0A162B] border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">history_toggle_off</span>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Old Nigerian Commercial Banks
                  </h3>
                  <span className="text-xs text-red-500 font-mono">Friction, delay &amp; hidden charges</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                {[
                  {
                    title: 'Delayed End-of-Day Settlements',
                    desc: 'Your POS collections sit in an unverified clearing pool until 11:59 PM or the next day, freezing your cashflow when you need to restock fast.',
                  },
                  {
                    title: '₦53.75 Fee on Every Single Supplier Payment',
                    desc: 'Transfer charges and stamp duties quietly eat up hundreds of thousands of Naira from your net operating margins every quarter.',
                  },
                  {
                    title: 'Cashier Card Sharing & Embezzlement Risk',
                    desc: 'Giving store cashiers or dispatch drivers your personal debit card or ATM PIN because standard banks don’t offer restricted sub-cards.',
                  },
                  {
                    title: 'Annual Shop Rent Scramble',
                    desc: 'No automated budgeting: all revenue gets commingled in one general balance until annual shop lease or FIRS tax notices hit unexpectedly.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 text-[18px] shrink-0 mt-0.5">
                      close
                    </span>
                    <div>
                      <strong className={`block font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                        {item.title}
                      </strong>
                      <span className={isLight ? 'text-slate-600' : 'text-[#8EA2C6]'}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Axoora Way */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border-2 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden ${
                isLight
                  ? 'bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/40 border-emerald-300'
                  : 'bg-gradient-to-br from-[#0A2338] via-[#081B34] to-[#041326] border-[#00DF8F]/50 shadow-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">verified</span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      The Axoora Business Way
                    </h3>
                    <span className="text-xs text-emerald-600 dark:text-[#00DF8F] font-mono font-bold">
                      Zero fees, instant settlement &amp; total peace of mind
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00A884] dark:text-[#00DF8F] text-[10px] font-mono font-bold uppercase">
                  RECOMMENDED
                </span>
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                {[
                  {
                    title: 'Sub-2s Direct NIBSS Rails Settlement',
                    desc: 'Every card swipe on your Apex POS lands in your available balance in 0.8 seconds. Your money is ready to spend before the customer leaves your counter.',
                  },
                  {
                    title: '₦0.00 Unlimited Transfer Fees Forever',
                    desc: 'Pay wholesalers, suppliers, and staff with zero transfer deduction. Keep 100% of your earned margins where they belong.',
                  },
                  {
                    title: 'Staff Expense Cards with Category Locks',
                    desc: 'Issue cards to drivers and cashiers locked strictly to "Fuel" or "Stock Restock" with instant daily spend limits and 1-tap freezing.',
                  },
                  {
                    title: 'Smart Tax & Shop Rent Reserve Pots',
                    desc: 'Automatically route 10% of every incoming credit to your Rent Pot and 7.5% to your Tax Pot. Never get caught off guard again.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00DF8F] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <strong className={`block font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {item.title}
                      </strong>
                      <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MONZO-STYLE FEATURE: SMART TAX & RENT POTS */}
          <div
            className={`p-6 sm:p-10 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-8 ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <div className="flex flex-col gap-3 max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#F2A93B] text-xs font-mono font-bold w-fit">
                <span className="material-symbols-outlined text-[15px]">savings</span>
                <span>MONZO-INSPIRED SMART POTS</span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Stay one step ahead of shop rent, tax and stock.
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Running out of operating cash when annual rent or supplier bills arrive is the #1 reason Nigerian retail shops fail. With Axoora Smart Pots, a set percentage of every incoming payment is automatically moved into dedicated locked reserves that earn ethical profit sharing.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className={`text-xs font-semibold flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check</span>
                  Automated Rent Allocation
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check</span>
                  VAT &amp; Withholding Tax Pots
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check</span>
                  0% Riba Ethical Yield
                </span>
              </div>
            </div>

            {/* Visual Interactive Pot Representation */}
            <div className="w-full lg:w-96 flex flex-col gap-2.5">
              {[
                { name: 'Shop Annual Rent Pot', amount: '₦ 2,450,000.00', pct: '70% Funded', color: '#0D95FE' },
                { name: 'FIRS & State Tax Pot', amount: '₦ 380,400.00', pct: 'Auto 7.5% per sale', color: '#00DF8F' },
                { name: 'Supplier Restock Float', amount: '₦ 1,820,000.00', pct: 'Ready for FMCG pickup', color: '#F2A93B' },
              ].map((pot, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#061224] border-[#132A52]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: pot.color }}
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {pot.name}
                      </span>
                      <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {pot.pct}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#00DF8F]">
                    {pot.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* MONZO-STYLE 2-MINUTE ELIGIBILITY CHECK BANNER */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
              isLight
                ? 'bg-blue-50/70 border-blue-200'
                : 'bg-gradient-to-r from-[#0C244E] to-[#0A1A38] border-[#1B3A6C]'
            }`}
          >
            <div className="flex flex-col gap-1.5 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#0D95FE] uppercase">
                ZERO OBLIGATION · INSTANT CONFIRMATION
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Check your eligibility in 2 minutes
              </h3>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Whether you are CAC-registered or a sole merchant operating on a market floor, see what you qualify for with zero impact on your credit history.
              </p>
            </div>

            <button
              onClick={() => onOpenWaitlist('business')}
              className="px-7 py-3.5 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs transition-all whitespace-nowrap shadow-lg shadow-[#0D95FE]/25 cursor-pointer flex items-center gap-2"
            >
              <span>Check Eligibility Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 8. HOW TO GET STARTED (SHARED WITH PERSONAL - AS REQUESTED) */}
      {/* ========================================================================= */}
      <InteractiveGetStarted
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
        onOpenDownloadApp={onOpenDownloadApp || (() => {})}
      />

      {/* ========================================================================= */}
      {/* 9. BLOGS & ARTICLES CAROUSEL */}
      {/* ========================================================================= */}
      <BlogArticlesCarousel onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 10. COMMERCIAL FAQS (STRICTLY BUSINESS & POS) */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-t transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              COMMERCIAL INQUIRIES
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Everything you need to know about applying for a shop account, staff cards, and settlements.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {businessFaqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id || faq.question}
                item={faq}
                isOpen={openFaqId === (faq.id || faq.question)}
                onToggle={() =>
                  setOpenFaqId(openFaqId === (faq.id || faq.question) ? null : faq.id || faq.question)
                }
                onNavigate={onNavigate}
                onOpenWaitlist={onOpenWaitlist}
                onOpenWhatsApp={onOpenWhatsApp}
              />
            ))}
          </div>

          {/* Bottom Business CTA Box (Matches Video Banner at 00:37) */}
          <div
            className={`mt-6 p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isLight
                ? 'bg-white border-blue-200 shadow-md'
                : 'bg-[#0A1B3D] border-[#0D95FE]/40'
            }`}
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="text-xl font-black">Enjoy a business solution designed to help you grow.</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Join wholesale merchants and retailers running on Axoora Business today.
              </p>
            </div>
            <button
              onClick={() => onOpenWaitlist('business')}
              className="px-6 py-3 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap shadow-md"
            >
              Apply for Business Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
