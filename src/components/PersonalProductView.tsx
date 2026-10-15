'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { FAQ_LIST } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { FaqAccordionItem } from './FaqAccordionItem';
import { RealisticPhoneMockup } from './RealisticPhoneMockup';
import { PersonalHeroShowcase } from './PersonalHeroShowcase';
import { InteractiveAtmCard } from './InteractiveAtmCard';
import { HumanBankingPillars } from './HumanBankingPillars';
import { InteractiveGetStarted } from './InteractiveGetStarted';
import { BlogArticlesCarousel } from './BlogArticlesCarousel';
import { AppleAppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { RegulatoryTrustBar } from './RegulatoryLogos';

interface PersonalProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const PersonalProductView: React.FC<PersonalProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Interactive Personal Fee Savings Calculator State
  const [monthlyTransfers, setMonthlyTransfers] = useState<number>(35);
  const [cardMaintenanceActive] = useState<boolean>(true);

  // Calculations (Legacy bank avg: ₦53.75 per transfer + ₦1,050 annual maintenance + ₦50 SMS alerts)
  const legacyTransferFees = monthlyTransfers * 53.75 * 12;
  const legacyMaintenance = cardMaintenanceActive ? 1200 + (monthlyTransfers * 15 * 12) : 0;
  const totalAnnualLegacyLoss = Math.round(legacyTransferFees + legacyMaintenance);

  // Filter FAQs strictly relevant to Personal Banking
  const personalFaqs = FAQ_LIST.filter(
    (faq) =>
      faq.category === 'Personal & Cards' ||
      faq.category === 'Save and Earn' ||
      faq.category === 'Paycircle'
  ).slice(0, 6);
  const [openFaqId, setOpenFaqId] = useState<string | null>(personalFaqs[0]?.id || null);

  const personalBenefits = [
    {
      icon: 'verified_user',
      title: 'State-of-the-Art Security',
      desc: 'Axoora uses up-to-date cybersecurity technology and 3D biometrics to protect your information and prevent unauthorized access.',
    },
    {
      icon: 'shield',
      title: 'Protection & Peace of Mind',
      desc: 'Your funds are insured by the Nigeria Deposit Insurance Corporation (NDIC) and supervised by the Central Bank of Nigeria.',
    },
    {
      icon: 'trending_up',
      title: 'Simple Limits Upgrade',
      desc: 'Reach for the stars. Effortlessly upgrade your transfer limits and explore new financial possibilities in seconds.',
    },
    {
      icon: 'credit_card',
      title: 'Extra Layer of Security',
      desc: 'Stay safe while shopping online with your virtual card feature. Shop confidently knowing your actual card details are protected.',
    },
    {
      icon: 'bolt',
      title: '99.9% Reliability',
      desc: 'Say goodbye to downtimes using a sovereign banking solution that delivers sub-2s settlements and never goes offline.',
    },
    {
      icon: 'support_agent',
      title: 'Round the Clock Support',
      desc: 'We are always here to talk. Reach our dedicated team whenever you need it via WhatsApp, in-app chat, or phone.',
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
      {/* 1. PERSONAL HERO SECTION (WITH MOBILE PHONE INTERFACE ON HERO) */}
      {/* ========================================================================= */}
      <section
        className={`relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b overflow-hidden transition-colors ${
          isLight
            ? 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white'
            : 'border-[#14294F] bg-gradient-to-b from-[#020F2E] via-[#021844] to-[#020F2E]'
        }`}
      >
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#00DF8F]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#0D95FE]/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Personal Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] text-xs font-mono font-medium text-[#00DF8F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
              <span>0% FEES ON ALL TRANSFERS // ZERO RIBA // DUAL-CURRENCY</span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Get the card <br />
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isLight
                    ? 'from-slate-900 via-emerald-600 to-blue-600'
                    : 'from-[#F2F5F9] via-[#00DF8F] to-[#0D95FE]'
                }`}
              >
                that works.
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg max-w-xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
              }`}
            >
              Brought to you by the sovereign technology that powers Nigeria's most trusted POS infrastructure. Axoora offers you a reliable personal banking experience with zero transfer fees, instant virtual cards, and non-interest Save &amp; Earn.
            </p>

            {/* Primary Mobile App Store & Google Play Store Download Action (Elevated, Prominent, Clickable) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 w-full">
              <AppleAppStoreBadge
                onClick={onOpenDownloadApp || (() => onOpenWaitlist('personal'))}
                isLight={isLight}
                className="px-5 py-3 rounded-2xl text-sm shadow-md hover:shadow-xl hover:scale-102 transition-all"
              />
              <GooglePlayBadge
                onClick={onOpenDownloadApp || (() => onOpenWaitlist('personal'))}
                isLight={isLight}
                className="px-5 py-3 rounded-2xl text-sm shadow-md hover:shadow-xl hover:scale-102 transition-all"
              />
            </div>

            {/* Official CBN & NDIC Regulatory Logos & Trust Badge Bar */}
            <div className="w-full pt-3 flex justify-center lg:justify-start">
              <RegulatoryTrustBar
                isLight={isLight}
                onInspect={() => {
                  if (onOpenDownloadApp) {
                    onOpenDownloadApp();
                  } else if (onOpenWaitlist) {
                    onOpenWaitlist('personal');
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column: Combined Phone + Floating Card Hero Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <PersonalHeroShowcase
              isLight={isLight}
              onOpenWaitlist={onOpenWaitlist}
              onOpenWhatsApp={onOpenWhatsApp}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DEDICATED SPOTLIGHT: "INSTANT DEBIT CARDS THAT ALWAYS WORK" */}
      {/* (CREATIVE & SUITABLE PLACE FOR THE 3D MOUSE-SPUN ATM CARD - MATCHES VIDEO AT 00:59) */}
      {/* ========================================================================= */}
      <section
        id="instant-debit-card"
        className={`relative w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-b overflow-hidden transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#01091C] border-[#14294F] text-[#F2F5F9]'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Card Feature Description & Value Proposition */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-100 dark:bg-[#00DF8F]/15 border border-emerald-300 dark:border-[#00DF8F]/30 text-xs font-mono font-bold text-emerald-800 dark:text-[#00DF8F]">
              <span className="material-symbols-outlined text-[15px]">credit_card</span>
              <span>INSTANT DEBIT CARD</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Instant Debit cards that always work
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              If transfers aren't your jam, we get it. Request a physical or virtual debit card and have it delivered to your doorstep within 48 hours. Activate it in minutes, and start using it right away.
            </p>

            {/* Feature Bullets */}
            <div className="w-full flex flex-col gap-3 pt-2 text-left">
              {[
                {
                  icon: 'lock_reset',
                  title: '1-Tap Freeze Protection',
                  desc: 'Misplaced your card? Freeze and unfreeze instantly inside the app without calling support.',
                },
                {
                  icon: 'currency_exchange',
                  title: 'Zero FX Markups',
                  desc: 'Shop globally on Amazon, AliExpress, and Netflix using our virtual Dollar card at authentic interbank rates.',
                },
                {
                  icon: 'local_shipping',
                  title: '48-Hour Doorstep Delivery',
                  desc: 'Get your physical debit card delivered to your home or office across all 36 Nigerian states.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#0A1B3D]/70 border-[#14294F]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-tight">{item.title}</span>
                    <span className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs for Requesting the Card */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => onOpenWaitlist('personal')}
                className="px-7 py-3.5 rounded-2xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-[#00DF8F]/25 transition-all cursor-pointer"
              >
                <span>Request a Debit Card</span>
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
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: THE 3D MOUSE-SPUN ATM CARD IN ITS FULL GLORY */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <InteractiveAtmCard isLight={isLight} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR CORE PERSONAL PILLARS: MONIEPOINT-STYLE INTERACTIVE SHOWCASE */}
      {/* ========================================================================= */}
      <HumanBankingPillars
        isLight={isLight}
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* ========================================================================= */}
      {/* 4. ZERO-FEE SAVINGS CALCULATOR */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
          isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#01091C] border-[#14294F]'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
              ZERO-FEE SAVINGS CALCULATOR
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              How much are legacy banks charging you?
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Adjust your monthly transfer frequency to calculate your exact annual cash savings on Axoora.
            </p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl flex flex-col gap-6 ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <label className="text-sm font-bold block">
                  Monthly Bank Transfers:{' '}
                  <span className="text-[#00DF8F] font-mono text-base">
                    {monthlyTransfers} transfers/mo
                  </span>
                </label>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                  Estimated transfers for family, bills, food, and daily needs
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={monthlyTransfers}
                onChange={(e) => setMonthlyTransfers(Number(e.target.value))}
                className="w-full sm:w-64 accent-[#00DF8F] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-[#14294F]">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-[#14294F]/40 border border-rose-200 dark:border-rose-900/30">
                <span className="text-xs font-mono text-rose-700 dark:text-rose-400 block font-semibold">
                  Legacy Bank Deductions
                </span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1">
                  ₦{totalAnnualLegacyLoss.toLocaleString()} / yr
                </div>
                <span className="text-[11px] text-slate-500 dark:text-[#A8BBD6]">
                  ₦53.75 fees + maintenance + SMS alerts
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#00DF8F]/10 border border-emerald-200 dark:border-[#00DF8F]/30">
                <span className="text-xs font-mono text-emerald-800 dark:text-[#00DF8F] block font-semibold">
                  You Keep with Axoora
                </span>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-[#00DF8F] mt-1">
                  ₦{totalAnnualLegacyLoss.toLocaleString()} Saved
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-[#00DF8F] font-mono">
                  ₦0.00 transfer fees. 100% in your pocket.
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => onOpenWaitlist('personal')}
                className="px-8 py-3.5 rounded-2xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm transition-all cursor-pointer shadow-md"
              >
                Start Saving With Axoora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OTHER BENEFITS (MORE REASONS TO BANK WITH AXOORA) */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-b transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              OTHER BENEFITS
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              More Reasons to Bank with Axoora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalBenefits.map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl border-2 flex flex-col gap-3 transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                    : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#00DF8F]'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <h4 className="font-bold text-base">{item.title}</h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW TO GET STARTED (SHARED WITH BUSINESS) */}
      {/* ========================================================================= */}
      <InteractiveGetStarted
        onOpenWaitlist={onOpenWaitlist}
        onOpenWhatsApp={onOpenWhatsApp}
        onOpenDownloadApp={onOpenDownloadApp || (() => {})}
      />

      {/* ========================================================================= */}
      {/* 7. BLOGS & ARTICLES CAROUSEL */}
      {/* ========================================================================= */}
      <BlogArticlesCarousel onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 8. PERSONAL FAQS SECTION */}
      {/* ========================================================================= */}
      <section
        className={`w-full px-4 sm:px-6 lg:px-8 py-20 border-t transition-colors ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
        }`}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00DF8F] font-bold">
              CONSUMER HELP &amp; FAQS
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Clear, transparent answers about personal debit cards, Save &amp; Earn, and WhatsApp banking.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {personalFaqs.map((faq) => (
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

          {/* Bottom Personal CTA Box (Matches Video at 01:21) */}
          <div
            className={`mt-6 p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isLight
                ? 'bg-white border-emerald-200 shadow-md'
                : 'bg-[#0A1B3D] border-[#00DF8F]/40'
            }`}
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="text-xl font-black">Experience banking that works</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                Get your physical or virtual debit card and start enjoying 0% transfer fees today.
              </p>
            </div>
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3 rounded-2xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Bank on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
