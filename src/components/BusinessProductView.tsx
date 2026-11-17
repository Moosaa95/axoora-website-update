'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';
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
  const { hero, faqs } = useCms();

  // Business-only FAQs
  const sourceFaqs = faqs && faqs.length > 0 ? faqs : FAQ_LIST;
  const businessFaqs = sourceFaqs.filter(
    (faq) => faq.category === 'Business & POS'
  ).slice(0, 8);
  const [openFaqId, setOpenFaqId] = useState<string | null>(businessFaqs[0]?.id || null);

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
              <span>{hero.trustLine || 'Central Bank of Nigeria Supervised · NDIC Insured'}</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {hero.headlineBusiness || 'The smart operating system for Nigerian businesses'}
            </h1>

            <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              {hero.subheadlineBusiness || 'Flagship 4G POS terminals, instant sub-second till settlements, and 0% interest halal stock float designed for real shop floors across Nigeria.'}
            </p>

            {/* Distinct, Honest Dual CTAs: POS Dispatch Configurator vs Mobile/WhatsApp Account Handoff */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1 w-full">
              <button
                onClick={() => onOpenWaitlist('pos-agent')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D95FE]/25 transition-all cursor-pointer active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>
                  {hero.ctaTextPrimary &&
                  hero.ctaTextPrimary !== 'Open Account & Request POS' &&
                  hero.ctaTextPrimary !== 'Apply for Business Account'
                    ? hero.ctaTextPrimary
                    : 'Request Smart POS & Setup'}
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => (onOpenDownloadApp ? onOpenDownloadApp() : onOpenWhatsApp())}
                className={`w-full sm:w-auto px-6 py-4 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-[#0A1B3D] hover:bg-[#14294F] text-[#F2F5F9] border-[#14294F]'
                }`}
              >
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">smartphone</span>
                <span>Open on App / WhatsApp</span>
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
      {/* 2. BUSINESSES THAT COUNT ON US (MERCHANT MARQUEE) */}
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
      {/* 7. SMART BUSINESS POTS (AUTOMATED CASHFLOW RESERVES) */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b transition-colors ${
          isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#01091C] border-[#14294F]'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Smart Pots Card */}
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
                <span>AUTOMATED CASHFLOW POTS</span>
              </div>
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Never worry about rent, tax, or restock again.
              </h2>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Axoora automatically splits a percentage of every incoming customer payment into dedicated reserve pots — earning ethical profit share until you need to spend it.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <span className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check_circle</span>
                  Auto Rent Allocation
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check_circle</span>
                  VAT &amp; Tax Reserves
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">check_circle</span>
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

          {/* Quick Hardware Dispatch Banner */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
              isLight
                ? 'bg-blue-50/70 border-blue-200'
                : 'bg-gradient-to-r from-[#0C244E] to-[#0A1A38] border-[#1B3A6C]'
            }`}
          >
            <div className="flex flex-col gap-1.5 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#0D95FE] uppercase">
                48-HOUR DISPATCH · DOORSTEP DELIVERY
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Get an Axoora Smart POS for your shop
              </h3>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Request your terminal in 60 seconds. Fast settlement, dual SIM connectivity, and dedicated local support.
              </p>
            </div>

            <button
              onClick={() => onOpenWaitlist('pos-agent')}
              className="px-7 py-3.5 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs transition-all whitespace-nowrap shadow-lg shadow-[#0D95FE]/25 cursor-pointer flex items-center gap-2"
            >
              <span>Request POS Terminal</span>
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
              Book Business Setup &amp; POS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
