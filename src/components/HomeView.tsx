'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';
import { HeroDeviceShowcase } from './HeroDeviceShowcase';
import { PersonalHeroShowcase } from './PersonalHeroShowcase';
import { FaqAccordionItem } from './FaqAccordionItem';
import { SecurityTrustRow } from './SecurityTrustRow';
import { MerchantMarquee } from './MerchantMarquee';
import { AxooraProductSuite } from './AxooraProductSuite';
import { StickyToolsSection } from './StickyToolsSection';
import { LiveTransferReceiptSimulator } from './LiveTransferReceiptSimulator';
import { CustomerTestimonialCarousel } from './CustomerTestimonialCarousel';
import { InteractiveGetStarted } from './InteractiveGetStarted';
import { WhatsMoreSection } from './WhatsMoreSection';

export type ProductSegment = 'personal' | 'business' | 'pos';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  homeMode: controlledMode,
  onHomeModeChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Three-product interactive switcher: 'personal' | 'business' | 'pos'
  const [activeProduct, setActiveProduct] = useState<ProductSegment>(
    controlledMode === 'personal' ? 'personal' : 'business'
  );

  const handleProductSwitch = (prod: ProductSegment) => {
    setActiveProduct(prod);
    if (prod === 'personal' || prod === 'business') {
      onHomeModeChange?.(prod);
    }
  };

  // Interactive Card state for Personal Segment
  const [personalCardCurrency, setPersonalCardCurrency] = useState<'naira' | 'usd'>('naira');
  const [cardRevealed, setCardRevealed] = useState(false);

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_LIST[0]?.id || null);

  const { hero } = useCms();

  // Filter FAQs strictly for the 3 core products
  const coreProductFaqs = FAQ_LIST.filter(
    (faq) =>
      faq.category === 'Personal & Cards' ||
      faq.category === 'Business & POS' ||
      faq.category === 'Save and Earn' ||
      faq.category === 'General'
  ).slice(0, 6);

  return (
    <div
      className={`w-full font-sans transition-colors duration-200 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-[#0D95FE]/20 selection:text-slate-900'
          : 'bg-[#020F2E] text-[#F2F5F9] selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]'
      }`}
    >
      {/* Live Announcement Ticker Banner if Active in CMS */}
      {hero?.announcementActive && hero.announcementTicker && (
        <div
          className={`w-full border-b py-2.5 px-4 text-center ${
            isLight
              ? 'bg-blue-50 border-blue-200 text-slate-900'
              : 'bg-gradient-to-r from-[#002447] via-[#0A1B3D] to-[#002447] border-[#0D95FE]/40 text-[#F2F5F9]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-ping shrink-0" />
            <span className="font-semibold">{hero.announcementTicker}</span>
            <button
              onClick={() => onOpenWaitlist('business')}
              className={`underline ml-2 font-bold cursor-pointer ${
                isLight ? 'text-blue-600 hover:text-blue-800' : 'text-[#00DF8F] hover:text-white'
              }`}
            >
              Get Early Access →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: "Banking, in a chat" WITH 3-PRODUCT INTERACTIVE SWITCHER */}
      {/* ========================================================================= */}
      <section
        className={`relative w-full px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden border-b transition-colors ${
          isLight
            ? 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white'
            : 'border-[#14294F] bg-gradient-to-b from-[#020F2E] via-[#021844] to-[#020F2E]'
        }`}
      >
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#0D95FE]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00DF8F]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
          {/* THREE-PRODUCT INTERACTIVE SWITCHER PILL BAR */}
          <div className="flex items-center justify-center">
            <div
              className={`inline-flex items-center p-1.5 rounded-2xl border shadow-lg max-w-full overflow-x-auto ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0A1B3D] border-[#14294F]'
              }`}
            >
              <button
                onClick={() => handleProductSwitch('personal')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeProduct === 'personal'
                    ? 'bg-[#00DF8F] text-[#003825] shadow-md shadow-[#00DF8F]/25'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Axoora Personal</span>
              </button>

              <button
                onClick={() => handleProductSwitch('business')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeProduct === 'business'
                    ? 'bg-[#0D95FE] text-white shadow-md shadow-[#0D95FE]/25'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">storefront</span>
                <span>Axoora Business</span>
              </button>

              <button
                onClick={() => handleProductSwitch('pos')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeProduct === 'pos'
                    ? 'bg-[#F2A93B] text-[#01091C] shadow-md shadow-[#F2A93B]/25'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>POS Terminals</span>
              </button>
            </div>
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition Focused on Active Segment */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
              <AnimatePresence mode="wait">
                {activeProduct === 'personal' && (
                  <motion.div
                    key="personal-hero"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center lg:items-start gap-5 w-full"
                  >
                    <div
                      className={`inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-xs font-mono font-medium ${
                        isLight
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-[#0A1B3D] border border-[#14294F] text-[#00DF8F]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                      <span>AXOORA PERSONAL // 0% TRANSFER FEES // DUAL-CURRENCY</span>
                    </div>

                    <h1
                      className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] ${
                        isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                      }`}
                    >
                      Banking, in a chat.
                    </h1>

                    <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      Zero transfer fees to any bank in Nigeria, dual-currency virtual cards that never decline, non-interest Save &amp; Earn vaults, and conversational chat banking in WhatsApp.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full">
                      <button
                        onClick={() => onOpenWaitlist('personal')}
                        className="px-6 py-3.5 rounded-2xl bg-[#00DF8F] text-[#003825] hover:bg-[#0D95FE] hover:text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-[#00DF8F]/25 transition-all cursor-pointer active:scale-98"
                      >
                        <span>Get Personal Card</span>
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
                        <span>Bank on WhatsApp</span>
                      </button>
                    </div>

                    {/* Core Product Feature Highlights */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-xs font-mono">
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-emerald-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#00DF8F]'
                        }`}
                      >
                        ✓ ₦0.00 Transfer Fees
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-blue-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#0D95FE]'
                        }`}
                      >
                        ✓ Virtual USD &amp; Naira Cards
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-amber-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2A93B]'
                        }`}
                      >
                        ✓ Halal Save &amp; Earn
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeProduct === 'business' && (
                  <motion.div
                    key="business-hero"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center lg:items-start gap-5 w-full"
                  >
                    <div
                      className={`inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-xs font-mono font-medium ${
                        isLight
                          ? 'bg-blue-50 border border-blue-200 text-blue-800'
                          : 'bg-[#0A1B3D] border border-[#14294F] text-[#0D95FE]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0D95FE] animate-pulse" />
                      <span>AXOORA BUSINESS // DEDICATED SHOP NUBAN // SUB-2S SETTLEMENT</span>
                    </div>

                    <h1
                      className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] ${
                        isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                      }`}
                    >
                      Banking, in a chat.
                    </h1>

                    <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      The standard commercial account for your shop. Instant POS settlement directly to your NUBAN, multi-user staff expense cards, automated invoicing, and non-interest stock float.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full">
                      <button
                        onClick={() => onOpenWaitlist('business')}
                        className="px-6 py-3.5 rounded-2xl bg-[#0D95FE] text-white hover:bg-[#00DF8F] hover:text-[#003825] font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-[#0D95FE]/25 transition-all cursor-pointer active:scale-98"
                      >
                        <span>Open a Business Account</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById('all-business-tools');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-5 py-3.5 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                          isLight
                            ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                            : 'bg-[#0A1B3D] hover:bg-[#14294F] text-[#F2F5F9] border-[#14294F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">dashboard</span>
                        <span>Explore Business Tools</span>
                      </button>
                    </div>

                    {/* Core Product Feature Highlights */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-xs font-mono">
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-blue-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#0D95FE]'
                        }`}
                      >
                        ✓ Dedicated Shop NUBAN
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-emerald-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#00DF8F]'
                        }`}
                      >
                        ✓ Sub-2s Direct Settlement
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-amber-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2A93B]'
                        }`}
                      >
                        ✓ Multi-User Expense Cards
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeProduct === 'pos' && (
                  <motion.div
                    key="pos-hero"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center lg:items-start gap-5 w-full"
                  >
                    <div
                      className={`inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-xs font-mono font-medium ${
                        isLight
                          ? 'bg-amber-50 border border-amber-200 text-amber-800'
                          : 'bg-[#0A1B3D] border border-[#14294F] text-[#F2A93B]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F2A93B] animate-pulse" />
                      <span>AXOORA POS // APEX 4G HARDWARE // DUAL-SIM FAILOVER</span>
                    </div>

                    <h1
                      className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] ${
                        isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                      }`}
                    >
                      Banking, in a chat.
                    </h1>

                    <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      Apex 4G Android POS terminals engineered for zero dropped transactions. Dual-SIM auto-failover (MTN + Airtel), sub-2s NIBSS settlement, and instant agent cash float.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full">
                      <button
                        onClick={() => onOpenWaitlist('pos-agent')}
                        className="px-6 py-3.5 rounded-2xl bg-[#F2A93B] text-[#01091C] hover:bg-[#00DF8F] font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-[#F2A93B]/25 transition-all cursor-pointer active:scale-98"
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

                    {/* Core Product Feature Highlights */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-xs font-mono">
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-amber-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2A93B]'
                        }`}
                      >
                        ✓ Dual-SIM MTN + Airtel 4G
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-emerald-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#00DF8F]'
                        }`}
                      >
                        ✓ Instant Agent Float
                      </span>
                      <span
                        className={`px-3 py-1 rounded-lg border font-semibold ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-blue-700'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#0D95FE]'
                        }`}
                      >
                        ✓ Sub-2s Settlement Rail
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Interactive Device Showcase Synchronized to Active Product */}
            <div className="lg:col-span-6 flex justify-center">
              {activeProduct === 'personal' ? (
                <PersonalHeroShowcase
                  isLight={isLight}
                  onOpenWaitlist={onOpenWaitlist}
                  onOpenWhatsApp={onOpenWhatsApp}
                />
              ) : (
                <HeroDeviceShowcase
                  isLight={isLight}
                  onOpenWaitlist={onOpenWaitlist}
                  onOpenWhatsApp={onOpenWhatsApp}
                  onOpenDownloadApp={onOpenDownloadApp}
                  defaultMode={activeProduct === 'pos' ? 'pos' : 'duo'}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL SECURITY, TRUST & REGULATORY BADGES */}
      <SecurityTrustRow isLight={isLight} />

      {/* COMMERCIAL HUBS SOCIAL PROOF MARQUEE */}
      <MerchantMarquee isLight={isLight} />

      {/* ========================================================================= */}
      {/* 2. AXOORA COMMERCIAL & PRODUCT ECOSYSTEM */}
      {/* ========================================================================= */}
      <AxooraProductSuite
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE ALL-IN-ONE BUSINESS TOOLS SUITE */}
      {/* ========================================================================= */}
      <StickyToolsSection
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 4. LIVE NIBSS TRANSFER RECEIPT SIMULATOR */}
      {/* ========================================================================= */}
      <LiveTransferReceiptSimulator
        isLight={isLight}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 5. VERIFIED CUSTOMER & MERCHANT TESTIMONIALS CAROUSEL */}
      {/* ========================================================================= */}
      <CustomerTestimonialCarousel
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 6. WHAT'S MORE SECTION */}
      {/* ========================================================================= */}
      <WhatsMoreSection
        onNavigate={onNavigate}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 7. HOW TO GET STARTED (INTERACTIVE 4-STEP PINNED EXPERIENCE) */}
      {/* ========================================================================= */}
      <InteractiveGetStarted
        isLight={isLight}
        onOpenWaitlist={onOpenWaitlist}
        onOpenDownloadApp={onOpenDownloadApp}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              PRODUCT CLARITY
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Clear answers regarding our three core products: Personal, Business, and POS Hardware.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {coreProductFaqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id || faq.question}
                item={faq}
                isOpen={openFaqId === (faq.id || faq.question)}
                onToggle={() =>
                  setOpenFaqId(
                    openFaqId === (faq.id || faq.question) ? null : faq.id || faq.question
                  )
                }
                onNavigate={onNavigate}
                onOpenWaitlist={onOpenWaitlist}
                onOpenWhatsApp={onOpenWhatsApp}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('help')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D95FE] hover:underline cursor-pointer"
            >
              <span>View all questions and help topics</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
