'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';

interface AxooraProductSuiteProps {
  isLight?: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
}

type TabKey = 'business-account' | 'pos-terminal' | 'expense-card' | 'working-capital' | 'business-savings' | 'retail-till';

interface TabItem {
  id: TabKey;
  label: string;
  tag: string;
  headline: string;
  description: string;
  primaryCta: string;
  primaryAction: 'waitlist' | 'whatsapp' | 'navigate-business' | 'navigate-pos';
  secondaryCta: string;
  secondaryAction: 'whatsapp' | 'navigate-business' | 'navigate-pos' | 'navigate-personal';
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  personName: string;
  personRole: string;
  personLocation: string;
  floatingPills: {
    icon: string;
    label: string;
    sublabel?: string;
    amount?: string;
    color: string;
    position: string;
  }[];
  compositionType: 'woman-business' | 'pos-terminal-active' | 'expense-cards' | 'man-inventory' | 'savings-piggy' | 'pos-cashier';
}

export const AxooraProductSuite: React.FC<AxooraProductSuiteProps> = ({
  isLight = false,
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('business-account');

  const tabs: TabItem[] = [
    {
      id: 'business-account',
      label: 'Business Account',
      tag: 'Shop Banking & NUBAN',
      headline: 'A dedicated business account built for Nigerian trade',
      description:
        'Open a registered commercial account in your business name in minutes. Get your dedicated 10-digit NUBAN, zero maintenance charges, automated bulk staff payouts, and instant WhatsApp cashier alert notifications.',
      primaryCta: 'Open shop account',
      primaryAction: 'navigate-business',
      secondaryCta: 'Learn more about NUBAN →',
      secondaryAction: 'whatsapp',
      accentColor: '#0D95FE',
      badgeBg: 'bg-[#0D95FE]/15',
      badgeText: 'text-[#0D95FE]',
      personName: 'Hauwa Bello',
      personRole: 'Fashion Retailer & Fabric Wholesaler',
      personLocation: 'Balogun Market, Lagos',
      compositionType: 'woman-business',
      floatingPills: [
        {
          icon: 'payments',
          label: 'Customer Inflow',
          sublabel: 'Dedicated Shop Settlement',
          amount: '₦20,000',
          color: '#00DF8F',
          position: 'bottom-4 left-4 sm:bottom-8 sm:left-6',
        },
        {
          icon: 'trending_up',
          label: 'Monthly Turnover',
          sublabel: '99.8% Sub-3s Clearing',
          amount: '₦550,000.00',
          color: '#0D95FE',
          position: 'top-6 right-4 sm:top-10 sm:right-6',
        },
      ],
    },
    {
      id: 'pos-terminal',
      label: 'Apex POS Terminal',
      tag: 'High-Uptime Hardware',
      headline: 'Reliable card and transfer terminals with zero network drama',
      description:
        'Accept debit cards and instant transfers with ease on the Apex smart Android terminal. MTN and Airtel auto-failover, transparent midnight commission payout, rugged 48-hour street battery, and real human WhatsApp support.',
      primaryCta: 'Request Apex POS terminal',
      primaryAction: 'navigate-pos',
      secondaryCta: 'View agent commission rates →',
      secondaryAction: 'navigate-pos',
      accentColor: '#00DF8F',
      badgeBg: 'bg-[#00DF8F]/15',
      badgeText: 'text-[#00DF8F]',
      personName: 'Sunday Adekunle',
      personRole: 'Super-Agent & Merchant Host',
      personLocation: 'Computer Village, Ikeja',
      compositionType: 'pos-terminal-active',
      floatingPills: [
        {
          icon: 'check_circle',
          label: 'Transaction Settled',
          sublabel: 'NIBSS Verified Instant',
          amount: '₦35,000.00',
          color: '#00DF8F',
          position: 'top-6 right-4 sm:top-8 sm:right-8',
        },
        {
          icon: 'cell_tower',
          label: 'Dual-SIM 4G',
          sublabel: 'MTN + Airtel Auto-Switch',
          amount: '99.98% Uptime',
          color: '#0D95FE',
          position: 'bottom-6 left-4 sm:bottom-10 sm:left-6',
        },
      ],
    },
    {
      id: 'expense-card',
      label: 'Corporate Cards',
      tag: 'Dual-Currency Naira & USD',
      headline: 'A secure card for all your operational expenses',
      description:
        'Order physical and instant virtual expense cards to manage supplier payments, diesel purchases, and overseas inventory. Set customized staff spending limits and lock cards instantly from WhatsApp.',
      primaryCta: 'Get corporate card',
      primaryAction: 'waitlist',
      secondaryCta: 'Explore virtual security →',
      secondaryAction: 'whatsapp',
      accentColor: '#0D95FE',
      badgeBg: 'bg-[#0D95FE]/15',
      badgeText: 'text-[#0D95FE]',
      personName: 'Tunde Bakare',
      personRole: 'Procurement & Logistics Manager',
      personLocation: 'Victoria Island, Lagos',
      compositionType: 'expense-cards',
      floatingPills: [
        {
          icon: 'credit_card',
          label: 'Fleet Fuel Limit',
          sublabel: 'Custom Policy Applied',
          amount: '₦500,000',
          color: '#0D95FE',
          position: 'top-8 right-4 sm:top-12 sm:right-8',
        },
        {
          icon: 'storefront',
          label: 'Supplier Settlement',
          sublabel: 'Zero Hidden Currency Markup',
          amount: '₦1,500,000',
          color: '#00DF8F',
          position: 'bottom-6 right-6 sm:bottom-10 sm:right-10',
        },
      ],
    },
    {
      id: 'working-capital',
      label: 'Stock Financing',
      tag: 'Ethical Asset-Backed Capital',
      headline: 'Flexible inventory financing that helps your business expand',
      description:
        'Access non-interest, asset-backed stock financing to buy bulk inventory before peak seasons without compounding usury or debt traps. 100% Shariah-compliant Murabaha contracts with payment terms matched to your turnover.',
      primaryCta: 'Apply for stock financing',
      primaryAction: 'waitlist',
      secondaryCta: 'How zero-interest works →',
      secondaryAction: 'whatsapp',
      accentColor: '#F2A93B',
      badgeBg: 'bg-[#F2A93B]/15',
      badgeText: 'text-[#F2A93B]',
      personName: 'Alhaji Musa Danbaba',
      personRole: 'Grain Wholesaler (400 Bags Stocked)',
      personLocation: 'Dawanau Market, Kano',
      compositionType: 'man-inventory',
      floatingPills: [
        {
          icon: 'health_and_safety',
          label: 'Turnover Health',
          sublabel: 'Transparent Asset-Backed',
          amount: '75% Healthy',
          color: '#00DF8F',
          position: 'top-8 right-4 sm:top-12 sm:right-8',
        },
        {
          icon: 'inventory_2',
          label: 'Warehouse Stock',
          sublabel: 'Direct Supplier Murabaha',
          amount: '400 Bags Rice',
          color: '#F2A93B',
          position: 'bottom-6 left-4 sm:bottom-8 sm:left-6',
        },
      ],
    },
    {
      id: 'business-savings',
      label: 'Ethical Savings',
      tag: 'Paycircle (Ajo) & Vault',
      headline: 'Put money aside and receive an ethical asset-backed return',
      description:
        'Whether preparing for new shop machinery, leasing a storage facility, or running traditional Ajo thrift pools with business peers, Axoora locks your contributions safely in licensed escrow with zero interest loans.',
      primaryCta: 'Start saving today',
      primaryAction: 'waitlist',
      secondaryCta: 'Explore Paycircle thrift →',
      secondaryAction: 'whatsapp',
      accentColor: '#00DF8F',
      badgeBg: 'bg-[#00DF8F]/15',
      badgeText: 'text-[#00DF8F]',
      personName: 'Chidinma Adeleke',
      personRole: 'Textile Boutique & Thrift Organizer',
      personLocation: 'Balogun Island, Lagos',
      compositionType: 'savings-piggy',
      floatingPills: [
        {
          icon: 'savings',
          label: 'Target Vault Total',
          sublabel: 'Disciplined Growth',
          amount: '₦1,854,097.26',
          color: '#00DF8F',
          position: 'top-8 right-4 sm:top-10 sm:right-8',
        },
        {
          icon: 'group_work',
          label: 'Paycircle (Ajo)',
          sublabel: '10-Member Rotational Escrow',
          amount: '₦100,000 Payout',
          color: '#0D95FE',
          position: 'bottom-6 left-4 sm:bottom-10 sm:left-6',
        },
      ],
    },
    {
      id: 'retail-till',
      label: 'Axoora Counter Register',
      tag: 'Smart Till Software',
      headline: 'Smart counter software that keeps stock, sales, and shifts synced',
      description:
        'Axoora Till is an intuitive retail cashier and management system built for Nigerian retail counters. Monitor clerk sales, track low inventory, issue electronic receipts, and review daily audit logs right from your tablet or smartphone.',
      primaryCta: 'Explore Axoora Till',
      primaryAction: 'navigate-business',
      secondaryCta: 'Watch WhatsApp cashier demo →',
      secondaryAction: 'whatsapp',
      accentColor: '#0D95FE',
      badgeBg: 'bg-[#0D95FE]/15',
      badgeText: 'text-[#0D95FE]',
      personName: 'Amina Yusuf',
      personRole: 'Head Cashier & Store Manager',
      personLocation: 'Wuse 2, Abuja',
      compositionType: 'pos-cashier',
      floatingPills: [
        {
          icon: 'point_of_sale',
          label: 'Daily Till Revenue',
          sublabel: '142 Cashier Receipts',
          amount: '₦432,500.00',
          color: '#00DF8F',
          position: 'top-8 right-4 sm:top-10 sm:right-6',
        },
        {
          icon: 'inventory',
          label: 'Low Stock Auto-Alert',
          sublabel: 'Flour & Cooking Oil',
          amount: 'Restock Sent',
          color: '#F2A93B',
          position: 'bottom-6 left-4 sm:bottom-8 sm:left-6',
        },
      ],
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleAction = (action: string) => {
    switch (action) {
      case 'navigate-business':
        onNavigate('business');
        break;
      case 'navigate-pos':
        onNavigate('pos-agents');
        break;
      case 'navigate-personal':
        onNavigate('personal');
        break;
      case 'whatsapp':
        onOpenWhatsApp();
        break;
      case 'waitlist':
      default:
        onOpenWaitlist('business');
        break;
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white text-[#0F172A] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-14">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D95FE]/10 text-[#006FDB] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D95FE]" />
            Axoora Commercial Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            All the tools you need to run your business with ease
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed">
            From high-uptime card terminals and zero-maintenance shop accounts to ethical stock financing and automated bookkeeping.
          </p>
        </div>

        {/* Horizontal Tab List with rounded pills */}
        <div className="w-full flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#F1F5F9] rounded-full border border-[#E2E8F0] shadow-inner max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#0F172A] font-bold shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="axooraActivePill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm border border-[#E2E8F0]/80"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Box: Left Copy + Right Human Composition */}
        <div className="w-full min-h-[460px] rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Narrative Copy & CTAs */}
              <div className="lg:col-span-6 flex flex-col items-start gap-5">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentTab.badgeBg} ${currentTab.badgeText}`}
                >
                  {currentTab.tag}
                </span>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  {currentTab.headline}
                </h3>

                <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                  {currentTab.description}
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleAction(currentTab.primaryAction)}
                    className="px-6 py-3.5 rounded-full bg-[#0D95FE] text-white hover:bg-[#006FDB] font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                  >
                    <span>{currentTab.primaryCta}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  <button
                    onClick={() => handleAction(currentTab.secondaryAction)}
                    className="text-sm sm:text-base font-bold text-[#0D95FE] hover:text-[#006FDB] hover:underline transition-colors flex items-center gap-1 cursor-pointer py-2"
                  >
                    <span>{currentTab.secondaryCta}</span>
                  </button>
                </div>

                {/* Verified Nigerian Merchant Micro-quote */}
                <div className="pt-4 mt-2 border-t border-[#E2E8F0] w-full flex items-center gap-3 text-xs text-[#64748B]">
                  <div className="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center font-bold text-[#0F172A] text-xs shrink-0">
                    {currentTab.personName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] block">{currentTab.personName}</span>
                    <span>
                      {currentTab.personRole} · {currentTab.personLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Organic Squircle Human & Product Composition with Floating Widgets */}
              <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[420px]">
                {/* Organic Squircle Pod Backdrop */}
                <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[400px] rounded-[60px] bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD]/40 to-[#E2E8F0]/30 transform -rotate-3 transition-transform" />
                <div className="absolute w-[290px] sm:w-[380px] h-[290px] sm:h-[370px] rounded-[50px] bg-white/70 backdrop-blur-sm border border-white shadow-xl transform rotate-2" />

                {/* Human & Product SVG Illustration Centerpiece */}
                <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center">
                  {currentTab.compositionType === 'woman-business' && (
                    <WomanBusinessIllustration />
                  )}
                  {currentTab.compositionType === 'pos-terminal-active' && (
                    <PosTerminalActiveIllustration />
                  )}
                  {currentTab.compositionType === 'expense-cards' && (
                    <ExpenseCardsIllustration />
                  )}
                  {currentTab.compositionType === 'man-inventory' && (
                    <ManInventoryIllustration />
                  )}
                  {currentTab.compositionType === 'savings-piggy' && (
                    <SavingsPiggyIllustration />
                  )}
                  {currentTab.compositionType === 'pos-cashier' && (
                    <PosCashierIllustration />
                  )}
                </div>

                {/* Floating Tactile Glass Widgets */}
                {currentTab.floatingPills.map((pill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.85, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
                    className={`absolute z-20 ${pill.position} p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-xl flex items-center gap-3 select-none`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: pill.color }}
                    >
                      <span className="material-symbols-outlined text-[20px]">{pill.icon}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#64748B] block font-medium">
                        {pill.label}
                      </span>
                      {pill.amount && (
                        <span className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight block">
                          {pill.amount}
                        </span>
                      )}
                      {pill.sublabel && (
                        <span className="text-[10px] text-[#94A3B8] block">{pill.sublabel}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ========================================================================= */
/* HUMAN & PRODUCT BESPOKE SVG COMPOSITIONS */
/* ========================================================================= */

/** 1. Nigerian Businesswoman in Teal / Turquoise Blazer with Phone App */
const WomanBusinessIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <defs>
      <linearGradient id="blazerTeal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0D9488" />
        <stop offset="100%" stopColor="#0F766E" />
      </linearGradient>
      <linearGradient id="skinTone1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#78350F" />
        <stop offset="100%" stopColor="#5B2508" />
      </linearGradient>
      <linearGradient id="goldEarring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0D9488" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background Warm Circle */}
    <circle cx="190" cy="170" r="130" fill="#E0F2FE" opacity="0.6" />

    {/* Shoulders & Teal Blazer */}
    <path
      d="M 90 320 C 100 240 140 220 190 220 C 240 220 280 240 290 320 Z"
      fill="url(#blazerTeal)"
      filter="url(#softGlow)"
    />
    {/* Inner White Blouse Collar */}
    <path d="M 160 220 L 190 270 L 220 220 Z" fill="#FFFFFF" />
    <path d="M 175 220 L 190 255 L 205 220 Z" fill="#E2E8F0" />

    {/* Neck */}
    <rect x="172" y="170" width="36" height="55" rx="8" fill="url(#skinTone1)" />

    {/* Natural Braided Hair Behind */}
    <path
      d="M 115 140 C 115 70 265 70 265 140 C 265 190 245 220 235 220 C 220 215 160 215 145 220 C 135 220 115 190 115 140 Z"
      fill="#1C1917"
    />

    {/* Head */}
    <ellipse cx="190" cy="140" rx="42" ry="50" fill="url(#skinTone1)" />

    {/* Natural Braided Bun / Crown */}
    <ellipse cx="190" cy="85" rx="44" ry="34" fill="#0C0A09" />
    <circle cx="155" cy="95" r="18" fill="#1C1917" />
    <circle cx="225" cy="95" r="18" fill="#1C1917" />
    <circle cx="190" cy="70" r="20" fill="#292524" />

    {/* Gold Loop Earrings */}
    <ellipse cx="146" cy="150" rx="3.5" ry="9" fill="url(#goldEarring)" />
    <ellipse cx="234" cy="150" rx="3.5" ry="9" fill="url(#goldEarring)" />

    {/* Facial Features with Warm Natural Smile */}
    <ellipse cx="174" cy="132" rx="4.5" ry="3.5" fill="#1C1917" />
    <ellipse cx="206" cy="132" rx="4.5" ry="3.5" fill="#1C1917" />
    <circle cx="175" cy="131" r="1.5" fill="#FFFFFF" />
    <circle cx="207" cy="131" r="1.5" fill="#FFFFFF" />
    <path d="M 166 124 Q 175 120 184 125" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 196 125 Q 205 120 214 124" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 188 138 Q 190 148 186 150 Q 190 152 194 150" stroke="#5B2508" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 174 160 Q 190 178 206 160 Z" fill="#991B1B" />
    <path d="M 178 160 Q 190 168 202 160 Z" fill="#FFFFFF" />

    {/* Smartphone Held in Hand */}
    <g transform="translate(230, 180) rotate(-8)">
      <rect width="80" height="135" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
      <rect x="6" y="8" width="68" height="119" rx="10" fill="#020F2E" />
      <rect x="12" y="15" width="30" height="4" rx="2" fill="#00DF8F" />
      <circle cx="62" cy="17" r="3" fill="#0D95FE" />
      <rect x="12" y="26" width="56" height="34" rx="6" fill="#0A1B3D" stroke="#00DF8F" strokeWidth="1" />
      <rect x="16" y="32" width="24" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="16" y="40" width="40" height="6" rx="2" fill="#00DF8F" />
      <rect x="12" y="68" width="56" height="12" rx="4" fill="#14294F" />
      <rect x="12" y="84" width="56" height="12" rx="4" fill="#14294F" />
      <rect x="12" y="100" width="56" height="12" rx="4" fill="#00DF8F" />
      <text x="22" y="109" fill="#003825" fontSize="6" fontWeight="bold" fontFamily="sans-serif">SEND ₦</text>
    </g>
  </svg>
);

/** 2. Apex POS Terminal with Fresh Receipt */
const PosTerminalActiveIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <defs>
      <linearGradient id="posBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="terminalScreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#041B3B" />
        <stop offset="100%" stopColor="#020B1C" />
      </linearGradient>
    </defs>

    <circle cx="190" cy="170" r="130" fill="#CCFBF1" opacity="0.6" />

    {/* Terminal Main Body */}
    <g transform="translate(115, 60)">
      {/* Thermal Paper Receipt Sprouting Out Top */}
      <path
        d="M 25 15 L 25 -30 Q 30 -34 35 -30 Q 40 -34 45 -30 Q 50 -34 55 -30 Q 60 -34 65 -30 Q 70 -34 75 -30 Q 80 -34 85 -30 Q 90 -34 95 -30 Q 100 -34 105 -30 Q 110 -34 115 -30 Q 120 -34 125 -30 L 125 15 Z"
        fill="#FEFCE8"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <line x1="38" y1="-20" x2="112" y2="-20" stroke="#00875A" strokeWidth="2.5" strokeDasharray="2 1" />
      <line x1="42" y1="-12" x2="108" y2="-12" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="45" y1="-4" x2="105" y2="-4" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="48" y1="4" x2="102" y2="4" stroke="#0F172A" strokeWidth="2" />

      {/* Terminal Housing */}
      <rect width="150" height="230" rx="24" fill="url(#posBlue)" stroke="#38BDF8" strokeWidth="3" />
      <rect x="20" y="10" width="110" height="12" rx="4" fill="#0369A1" />
      <rect x="25" y="13" width="100" height="4" rx="2" fill="#0C4A6E" />

      {/* Screen Area */}
      <rect x="18" y="32" width="114" height="105" rx="12" fill="url(#terminalScreen)" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="26" y="42" width="35" height="5" rx="2" fill="#00DF8F" />
      <circle cx="118" cy="44" r="3" fill="#00DF8F" />
      <text x="100" y="46" fill="#00DF8F" fontSize="6" fontFamily="sans-serif">4G</text>

      {/* Success Icon on Screen */}
      <circle cx="75" cy="72" r="16" fill="#00DF8F" />
      <path d="M 68 72 L 73 77 L 82 67" stroke="#003825" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      <text x="75" y="100" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
        ₦35,000.00
      </text>
      <text x="75" y="112" fill="#00DF8F" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
        APPROVED · APEX
      </text>
      <rect x="35" y="120" width="80" height="8" rx="4" fill="#0A224E" />
      <text x="75" y="126" fill="#A8BBD6" fontSize="5" fontFamily="monospace" textAnchor="middle">
        RRN: 00928401923
      </text>

      {/* Keypad */}
      <g transform="translate(24, 146)">
        {[
          [0, 0], [36, 0], [72, 0],
          [0, 16], [36, 16], [72, 16],
          [0, 32], [36, 32], [72, 32],
          [0, 48], [36, 48], [72, 48],
        ].map(([x, y], idx) => (
          <rect
            key={idx}
            x={x}
            y={y}
            width="30"
            height="12"
            rx="4"
            fill={idx === 11 ? '#00DF8F' : idx === 9 ? '#EF4444' : idx === 10 ? '#F59E0B' : '#0369A1'}
          />
        ))}
      </g>

      <rect x="35" y="215" width="80" height="5" rx="2.5" fill="#0C4A6E" />
    </g>
  </svg>
);

/** 3. Dual-Currency Axoora Expense Cards */
const ExpenseCardsIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <defs>
      <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0D95FE" />
        <stop offset="100%" stopColor="#003B73" />
      </linearGradient>
      <linearGradient id="cardGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00DF8F" />
        <stop offset="100%" stopColor="#004D31" />
      </linearGradient>
      <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    <circle cx="190" cy="170" r="130" fill="#E0F2FE" opacity="0.6" />

    {/* Secondary Bottom Card (Emerald Naira Card) */}
    <g transform="translate(60, 110) rotate(-10)">
      <rect width="230" height="142" rx="16" fill="url(#cardGrad2)" stroke="#34D399" strokeWidth="2" />
      <text x="24" y="36" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
        Axoora<tspan fill="#A7F3D0">.biz</tspan>
      </text>
      <text x="175" y="34" fill="#A7F3D0" fontSize="9" fontWeight="bold" fontFamily="monospace">
        EXPENSE
      </text>
      <text x="24" y="92" fill="#FFFFFF" fontSize="12" fontFamily="monospace" letterSpacing="2">
        5061 •••• •••• 9012
      </text>
      <text x="24" y="118" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">
        TEAM FLEET · LAGOS
      </text>
    </g>

    {/* Primary Foreground Card (Royal Blue Expense Card) */}
    <g transform="translate(100, 70) rotate(6)">
      <rect width="230" height="142" rx="16" fill="url(#cardGrad1)" stroke="#60A5FA" strokeWidth="2.5" />
      <text x="24" y="36" fill="#FFFFFF" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
        Axoora<tspan fill="#BAE6FD">.ai</tspan>
      </text>
      <path d="M 185 24 A 12 12 0 0 1 185 40" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 191 20 A 18 18 0 0 1 191 44" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Gold EMV Chip */}
      <rect x="24" y="50" width="34" height="26" rx="6" fill="url(#chipGrad)" stroke="#B45309" strokeWidth="1" />
      <line x1="24" y1="63" x2="58" y2="63" stroke="#78350F" strokeWidth="0.8" />
      <line x1="41" y1="50" x2="41" y2="76" stroke="#78350F" strokeWidth="0.8" />

      <text x="24" y="100" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
        4284 •••• •••• 4018
      </text>
      <div className="flex justify-between">
        <text x="24" y="122" fill="#BAE6FD" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
          SHOP RUNNER CARD
        </text>
        <text x="180" y="122" fill="#FFFFFF" fontSize="9" fontFamily="monospace">
          12/29
        </text>
      </div>
    </g>
  </svg>
);

/** 4. Smiling Nigerian Male Wholesaler with Inventory Clipboard */
const ManInventoryIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <defs>
      <linearGradient id="kaftanBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#172554" />
      </linearGradient>
      <linearGradient id="skinToneMan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6B3410" />
        <stop offset="100%" stopColor="#4A1E04" />
      </linearGradient>
    </defs>

    <circle cx="190" cy="170" r="130" fill="#FEF3C7" opacity="0.6" />

    <path
      d="M 80 320 C 95 235 140 215 190 215 C 240 215 285 235 300 320 Z"
      fill="url(#kaftanBlue)"
    />
    <path d="M 175 215 L 190 280 L 205 215 Z" fill="#FCD34D" opacity="0.9" />
    <circle cx="190" cy="240" r="3" fill="#172554" />
    <circle cx="190" cy="255" r="3" fill="#172554" />
    <circle cx="190" cy="270" r="3" fill="#172554" />

    <rect x="172" y="165" width="36" height="55" rx="8" fill="url(#skinToneMan)" />
    <ellipse cx="190" cy="135" rx="42" ry="48" fill="url(#skinToneMan)" />

    <path
      d="M 148 115 C 148 75 232 75 232 115 Z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="2"
    />
    <path d="M 152 105 Q 190 95 228 105" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />

    <ellipse cx="174" cy="132" rx="4" ry="3" fill="#172554" />
    <ellipse cx="206" cy="132" rx="4" ry="3" fill="#172554" />
    <circle cx="175" cy="131" r="1.5" fill="#FFFFFF" />
    <circle cx="207" cy="131" r="1.5" fill="#FFFFFF" />
    <path d="M 176 153 Q 190 148 204 153" stroke="#172554" strokeWidth="3" strokeLinecap="round" />
    <path d="M 174 158 Q 190 176 206 158 Z" fill="#FFFFFF" />

    <g transform="translate(60, 180) rotate(-6)">
      <rect width="90" height="130" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <rect x="30" y="-8" width="30" height="14" rx="4" fill="#64748B" />
      <circle cx="45" cy="-2" r="3" fill="#CBD5E1" />
      <line x1="16" y1="25" x2="74" y2="25" stroke="#0D95FE" strokeWidth="3" />
      <circle cx="22" cy="45" r="4" fill="#00DF8F" />
      <line x1="32" y1="45" x2="74" y2="45" stroke="#64748B" strokeWidth="2" />
      <circle cx="22" cy="65" r="4" fill="#00DF8F" />
      <line x1="32" y1="65" x2="74" y2="65" stroke="#64748B" strokeWidth="2" />
      <circle cx="22" cy="85" r="4" fill="#00DF8F" />
      <line x1="32" y1="85" x2="74" y2="85" stroke="#64748B" strokeWidth="2" />
      <rect x="16" y="102" width="58" height="14" rx="4" fill="#FEF3C7" />
      <text x="45" y="112" fill="#B45309" fontSize="7" fontWeight="bold" textAnchor="middle">
        400 BAGS CLEARED
      </text>
    </g>
  </svg>
);

/** 5. Ethical Piggy Vault & Target Savings */
const SavingsPiggyIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <circle cx="190" cy="170" r="130" fill="#CCFBF1" opacity="0.6" />

    <g transform="translate(100, 100)">
      <rect x="20" y="40" width="140" height="130" rx="20" fill="#065F46" stroke="#34D399" strokeWidth="3" />
      <rect x="32" y="52" width="116" height="106" rx="14" fill="#022C22" />

      <circle cx="90" cy="105" r="34" fill="#047857" stroke="#6EE7B7" strokeWidth="3" />
      <circle cx="90" cy="105" r="16" fill="#064E3B" stroke="#A7F3D0" strokeWidth="2" />
      <circle cx="90" cy="105" r="6" fill="#FCD34D" />
      <line x1="90" y1="71" x2="90" y2="139" stroke="#6EE7B7" strokeWidth="2" />
      <line x1="56" y1="105" x2="124" y2="105" stroke="#6EE7B7" strokeWidth="2" />

      <g transform="translate(70, -40)">
        <ellipse cx="20" cy="20" rx="18" ry="10" fill="#D97706" />
        <ellipse cx="20" cy="16" rx="18" ry="10" fill="#FCD34D" stroke="#FEF08A" strokeWidth="1.5" />
        <text x="16" y="20" fill="#78350F" fontSize="12" fontWeight="bold">₦</text>
      </g>
      <g transform="translate(120, -10)">
        <ellipse cx="16" cy="16" rx="14" ry="8" fill="#D97706" />
        <ellipse cx="16" cy="13" rx="14" ry="8" fill="#FCD34D" stroke="#FEF08A" strokeWidth="1.5" />
        <text x="13" y="16" fill="#78350F" fontSize="10" fontWeight="bold">₦</text>
      </g>
    </g>
  </svg>
);

/** 6. Axoora Till Smart Tablet POS Register */
const PosCashierIllustration: React.FC = () => (
  <svg viewBox="0 0 380 340" className="w-full h-auto drop-shadow-xl" fill="none">
    <circle cx="190" cy="170" r="130" fill="#E0F2FE" opacity="0.6" />

    <g transform="translate(90, 80)">
      <path d="M 80 180 L 120 180 L 110 130 L 90 130 Z" fill="#64748B" />
      <ellipse cx="100" cy="180" rx="45" ry="12" fill="#334155" />

      <rect width="200" height="135" rx="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
      <rect x="8" y="8" width="184" height="119" rx="10" fill="#F8FAFC" />

      <rect x="14" y="14" width="105" height="107" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
      <rect x="20" y="20" width="30" height="26" rx="4" fill="#E0F2FE" />
      <rect x="54" y="20" width="30" height="26" rx="4" fill="#FEF3C7" />
      <rect x="20" y="50" width="30" height="26" rx="4" fill="#DCFCE7" />
      <rect x="54" y="50" width="30" height="26" rx="4" fill="#F3E8FF" />
      <text x="24" y="90" fill="#0F172A" fontSize="7" fontWeight="bold">GROCERIES (14)</text>

      <rect x="124" y="14" width="62" height="107" rx="6" fill="#0A1B3D" />
      <rect x="130" y="20" width="40" height="4" rx="2" fill="#00DF8F" />
      <line x1="130" y1="32" x2="178" y2="32" stroke="#1E3A6B" strokeWidth="1" />
      <line x1="130" y1="42" x2="178" y2="42" stroke="#1E3A6B" strokeWidth="1" />
      <text x="130" y="65" fill="#A8BBD6" fontSize="5">TOTAL DUE</text>
      <text x="130" y="78" fill="#00DF8F" fontSize="9" fontWeight="bold">₦14,800</text>
      <rect x="130" y="92" width="50" height="18" rx="4" fill="#00DF8F" />
      <text x="155" y="104" fill="#003825" fontSize="7" fontWeight="bold" textAnchor="middle">
        CHARGE
      </text>
    </g>
  </svg>
);
