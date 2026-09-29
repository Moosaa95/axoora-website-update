'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { COMPANY_INFO, FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { HeroDeviceShowcase } from './HeroDeviceShowcase';
import { SecurityTrustRow } from './SecurityTrustRow';
import { MerchantMarquee } from './MerchantMarquee';
import { HumanMerchantStrip } from './HumanMerchantStrip';
import { StickyToolsSection } from './StickyToolsSection';
import { CustomerTestimonialCarousel } from './CustomerTestimonialCarousel';
import { InteractiveGetStarted } from './InteractiveGetStarted';
import { BlogArticlesCarousel } from './BlogArticlesCarousel';
import { FaqAccordionItem } from './FaqAccordionItem';

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

  // Toggle between Business and Personal Home experience
  const [localMode, setLocalMode] = useState<'business' | 'personal'>('business');
  const activeMode = controlledMode || localMode;

  const handleModeToggle = (mode: 'business' | 'personal') => {
    setLocalMode(mode);
    onHomeModeChange?.(mode);
  };

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_LIST[0]?.id || null);

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH BUSINESS / PERSONAL TRANSITION */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0D95FE]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#00DF8F]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
          {/* Top Segmented Mode Selector Switch */}
          <div className="self-center sm:self-start flex items-center p-1 rounded-full bg-[#05112A] border border-[#14294F] shadow-inner">
            <button
              onClick={() => handleModeToggle('business')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMode === 'business'
                  ? 'bg-[#0D95FE] text-[#00284D] shadow-md shadow-[#0D95FE]/20'
                  : 'text-[#A8BBD6] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span>Business</span>
            </button>
            <button
              onClick={() => handleModeToggle('personal')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMode === 'personal'
                  ? 'bg-[#00DF8F] text-[#003825] shadow-md shadow-[#00DF8F]/20'
                  : 'text-[#A8BBD6] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">person</span>
              <span>Personal</span>
            </button>
          </div>

          {/* Hero Content with Smooth Transition between Business and Personal */}
          <AnimatePresence mode="wait">
            {activeMode === 'business' ? (
              <motion.div
                key="hero-business"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
              >
                {/* Left Column: Business Copy */}
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                  {/* Sovereign pill */}
                  <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-xs font-mono font-medium text-[#00DF8F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                    <span>AFRICA'S FASTEST GROWING FINANCIAL PLATFORM // 3 YEARS IN A ROW</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-[1.08] [text-wrap:balance]">
                    Simple solutions to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F5F9] via-[#00DF8F] to-[#0D95FE]">
                      power your business
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl leading-relaxed">
                    Collect card and transfer payments, access ethical 0% interest halal working capital, and manage operations with sub-second NIBSS settlements.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 w-full">
                    <button
                      onClick={() => onOpenWaitlist('business')}
                      className="px-7 py-3.5 rounded-full bg-[#0D95FE] text-[#00284D] font-bold text-sm sm:text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-98"
                    >
                      <span>Open an Account</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => onOpenWaitlist('pos-agent')}
                      className="px-6 py-3.5 rounded-full border border-[#14294F] bg-[#0A1B3D] hover:border-[#00DF8F] text-[#F2F5F9] hover:text-[#00DF8F] font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#00DF8F]">point_of_sale</span>
                      <span>Get Apex POS</span>
                    </button>

                    <button
                      onClick={onOpenWhatsApp}
                      className="px-5 py-3.5 rounded-full text-xs font-semibold text-[#A8BBD6] hover:text-[#00DF8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">chat</span>
                      <span>Talk on WhatsApp</span>
                    </button>
                  </div>

                  {/* Regulatory line */}
                  <div className="pt-2 text-xs text-[#A8BBD6] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                    <span>Licensed by Central Bank of Nigeria · Eligible deposits insured by NDIC</span>
                  </div>

                  {/* Human Merchant Social Proof Avatars */}
                  <div className="pt-1 flex items-center gap-3">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <img
                        src="/merchants/bilkisu.jpg"
                        alt="Hajiya Bilkisu - Kano"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/merchants/emeka.jpg"
                        alt="Emeka Chukwu - Lagos"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/merchants/fatima.jpg"
                        alt="Fatima Al-Hassan - Abuja"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/merchants/tunde.jpg"
                        alt="Tunde Bakare - Lekki"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#F2F5F9]">
                        <span className="text-[#F2A93B]">★★★★★</span>
                        <span className="text-[#00DF8F]">4.9 / 5</span>
                      </div>
                      <span className="text-[11px] text-[#A8BBD6]">Trusted by 120,000+ Nigerian merchants</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Business Visual Hero Showcase with Hardware Ecosystem */}
                <div className="lg:col-span-6 flex justify-center w-full">
                  <HeroDeviceShowcase
                    isLight={isLight}
                    defaultMode="duo"
                    onOpenWaitlist={onOpenWaitlist}
                    onOpenWhatsApp={onOpenWhatsApp}
                    onOpenDownloadApp={onOpenDownloadApp}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hero-personal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
              >
                {/* Left Column: Personal Copy */}
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                  {/* Sovereign pill */}
                  <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-xs font-mono font-medium text-[#00DF8F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                    <span>CONSUMER BANKING // ₦0 TRANSFER FEES</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-[1.08] [text-wrap:balance]">
                    Get the card <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F5F9] via-[#00DF8F] to-[#0D95FE]">
                      that works.
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl leading-relaxed">
                    Brought to you by the technology that powers Nigeria's most trusted merchants. Axoora offers you a reliable personal banking experience with instant NIBSS settlement and zero account maintenance fees.
                  </p>

                  {/* App Store Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <button
                      onClick={onOpenDownloadApp}
                      className="px-5 py-2.5 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                    >
                      <svg className="w-6 h-6 text-white shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.65-2.79 1.41-.58.67-1.1 1.77-.96 2.83 1.12.09 2.15-.51 2.79-1.29z" />
                      </svg>
                      <div className="text-left leading-tight">
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Download on the</span>
                        <span className="block text-sm font-bold text-white tracking-tight">App Store</span>
                      </div>
                    </button>

                    <button
                      onClick={onOpenDownloadApp}
                      className="px-5 py-2.5 rounded-2xl bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500 font-bold text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                    >
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.362-.56-.88-.56-1.48V3.294c0-.6.213-1.118.56-1.48z" fill="#00C1A6"/>
                        <path d="M17.378 8.414l-3.585 3.586 3.585 3.586 4.072-2.327c1.16-.663 1.16-1.745 0-2.408l-4.072-2.437z" fill="#FFBA00"/>
                        <path d="M3.609 1.814l10.184 10.186 3.585-3.586L6.082.472C5.074-.104 4.095-.145 3.61 1.814z" fill="#2D7DD2"/>
                        <path d="M13.793 12L3.61 22.186c.485 1.959 1.464 1.918 2.472 1.342l11.296-7.942-3.585-3.586z" fill="#F24C4C"/>
                      </svg>
                      <div className="text-left leading-tight">
                        <span className="block text-[10px] uppercase font-mono text-neutral-400">Get it on</span>
                        <span className="block text-sm font-bold text-white tracking-tight">Google Play</span>
                      </div>
                    </button>

                    <button
                      onClick={() => onOpenWaitlist('personal')}
                      className="px-5 py-3 rounded-full bg-[#0D95FE] text-[#00284D] font-bold text-xs sm:text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer shadow-md"
                    >
                      Open Personal Account
                    </button>
                  </div>

                  {/* Regulatory line */}
                  <div className="pt-2 text-xs text-[#A8BBD6] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                    <span>Licensed by Central Bank of Nigeria · Eligible deposits insured by NDIC</span>
                  </div>

                  {/* Human Personal Shopper Social Proof Avatars */}
                  <div className="pt-1 flex items-center gap-3">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <img
                        src="/merchants/shopper.jpg"
                        alt="Amina - Lagos User"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/merchants/emeka.jpg"
                        alt="Emeka - Ikeja User"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/merchants/fatima.jpg"
                        alt="Fatima - Abuja User"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                      <img
                        src="/team/coo.jpg"
                        alt="Tariq - Daily User"
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#020F2E] object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#F2F5F9]">
                        <span className="text-[#F2A93B]">★★★★★</span>
                        <span className="text-[#00DF8F]">4.9 / 5</span>
                      </div>
                      <span className="text-[11px] text-[#A8BBD6]">Loved by 250,000+ personal account holders</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Smartphone Showcase */}
                <div className="lg:col-span-6 flex justify-center w-full">
                  <HeroDeviceShowcase
                    isLight={isLight}
                    defaultMode="phone"
                    onOpenWaitlist={onOpenWaitlist}
                    onOpenWhatsApp={onOpenWhatsApp}
                    onOpenDownloadApp={onOpenDownloadApp}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECURITY & LICENSING TRUST ROW */}
      {/* ========================================================================= */}
      <SecurityTrustRow isLight={isLight} />

      {/* ========================================================================= */}
      {/* 3. BUSINESSES THAT COUNT ON US (MARQUEE SOCIAL PROOF) */}
      {/* ========================================================================= */}
      <MerchantMarquee isLight={isLight} />

      {/* ========================================================================= */}
      {/* 3B. THE PEOPLE BEHIND NIGERIA'S DAILY ECONOMY (AUTHENTIC HUMAN SHOWCASE) */}
      {/* ========================================================================= */}
      <HumanMerchantStrip onOpenWaitlist={onOpenWaitlist} />

      {/* ========================================================================= */}
      {/* 4. "ALL THE TOOLS YOU NEED TO RUN YOUR BUSINESS WITH EASE" (STICKY SUB-NAV) */}
      {/* Standout feature: Navigation pins to top while scrolling through the 6 items, */}
      {/* automatically highlights active tab, and unpins cleanly when finished! */}
      {/* ========================================================================= */}
      <StickyToolsSection
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 5. "DON'T JUST TAKE OUR WORD FOR IT" (TESTIMONIALS & VIDEO FOOTAGE) */}
      {/* ========================================================================= */}
      <CustomerTestimonialCarousel
        isLight={isLight}
        onNavigate={onNavigate}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 6. "HOW TO GET STARTED" (DYNAMIC 4-STEP ONBOARDING PREVIEW) */}
      {/* High-quality grid layout with relatable Nigerian merchants & hardware */}
      {/* ========================================================================= */}
      <InteractiveGetStarted
        onOpenWaitlist={onOpenWaitlist}
        onOpenDownloadApp={onOpenDownloadApp}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 7. "BLOGS & ARTICLES" (INTERACTIVE NEWS & TIPS CAROUSEL) */}
      {/* ========================================================================= */}
      <BlogArticlesCarousel onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (CLEAN, ACCORDION-STYLE) */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 bg-[#020F2E] border-b border-[#14294F] text-[#F2F5F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F5F9] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#A8BBD6]">
              Clear, transparent answers about our licenses, accounts, terminals, and safety.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_LIST.slice(0, 6).map((item, idx) => {
              const itemId = item.id || `faq-${idx}`;
              return (
                <FaqAccordionItem
                  key={itemId}
                  item={item}
                  isOpen={openFaqId === itemId}
                  onToggle={() => setOpenFaqId(openFaqId === itemId ? null : itemId)}
                  onNavigate={onNavigate}
                  onOpenWaitlist={onOpenWaitlist}
                  onOpenWhatsApp={onOpenWhatsApp}
                />
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('help')}
              className="text-sm font-semibold text-[#0D95FE] hover:underline cursor-pointer"
            >
              Have more questions? Visit our Help &amp; FAQs Centre →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PRE-FOOTER CTA BANNER: "Experience banking that works" */}
      {/* ========================================================================= */}
      <section className="relative w-full py-20 bg-gradient-to-b from-[#020F2E] via-[#05163D] to-[#020F2E] border-b border-[#14294F] text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Experience banking that works
          </h2>
          <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl">
            Join thousands of Nigerian merchants, shops, and individuals banking with speed, dignity, and zero debt interest.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenWaitlist('business')}
              className="px-8 py-3.5 rounded-full bg-[#0D95FE] text-[#00284D] font-bold text-sm sm:text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Open an Account
            </button>
            <button
              onClick={onOpenDownloadApp}
              className="px-8 py-3.5 rounded-full bg-[#14294F] text-white hover:bg-[#1E3A6B] font-semibold text-sm sm:text-base border border-[#14294F] transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
