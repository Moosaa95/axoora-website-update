'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';

interface StickyToolsSectionProps {
  isLight?: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
}

interface ToolItem {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  primaryAction: () => void;
  secondaryCta: string;
  secondaryAction: () => void;
  accentColor: string;
  renderVisual: () => React.ReactNode;
}

export const StickyToolsSection: React.FC<StickyToolsSectionProps> = ({
  isLight = false,
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('business-account');
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const tools: ToolItem[] = [
    {
      id: 'business-account',
      tabLabel: 'Business Account',
      eyebrow: 'Business Account',
      title: 'A free bank account to power your business',
      description:
        'Open a free account in your business name in minutes. Access round the clock support, with no hidden fees and complete control over your account. Transfer money across all Nigerian banks with sub-3s settlement.',
      primaryCta: 'Open an account',
      primaryAction: () => onOpenWaitlist('business'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('business'),
      accentColor: '#0D95FE',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Top transfer card with authentic merchant avatar */}
          <div className="p-4 rounded-2xl bg-[#0B1A3A] border border-[#193566] shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/merchants/fatima.jpg"
                alt="Fatima Al-Hassan"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#0D95FE]"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Fatima Al-Hassan</span>
                <span className="text-[10px] text-[#00DF8F] font-mono">Zaynab Couture · NUBAN 9012345678</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#00DF8F]/15 border border-[#00DF8F]/40 text-[#00DF8F] text-[10px] font-bold">
              INSTANT NIP
            </span>
          </div>

          {/* Spending Trend Chart */}
          <div className="p-4 rounded-2xl bg-[#0B1A3A] border border-[#193566] shadow-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Monthly Store Revenue</span>
              <span className="text-xs font-mono font-bold text-[#0D95FE]">₦1,855,000.00</span>
            </div>
            <div className="h-14 flex items-end gap-2 pt-2">
              {[40, 65, 45, 90, 70, 85, 100, 75, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-[#14294F] rounded-t-sm relative group overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-[#0D95FE] to-[#00DF8F] rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#7B9CD2] font-mono">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pos-terminal',
      tabLabel: 'Point of Sale Terminal',
      eyebrow: 'Point of Sale Terminal',
      title: 'POS machine wey no get wahala',
      description:
        'Accept card and transfer payments seamlessly, with a reliable point of sale terminal. Enjoy instant settlement, easy dispute resolution, and instant payments every time with dual-eSIM auto-failover.',
      primaryCta: 'Get a Terminal',
      primaryAction: () => onOpenWaitlist('pos-agent'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('pos-agents'),
      accentColor: '#00DF8F',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Authentic merchant callout */}
          <div className="absolute top-4 left-4 flex items-center gap-2.5 p-2 rounded-2xl bg-[#020F2E]/90 border border-[#14294F] backdrop-blur-md z-10">
            <img
              src="/merchants/emeka.jpg"
              alt="Emeka Chukwu - Computer Village"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00DF8F]"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white">Emeka Chukwu</span>
              <span className="text-[9px] text-[#00DF8F] font-mono">Computer Village, Lagos</span>
            </div>
          </div>

          {/* Apex POS Mockup */}
          <div className="w-56 rounded-3xl bg-[#020B1D] border-2 border-[#00DF8F] p-4 flex flex-col items-center gap-3 shadow-2xl mt-4">
            <div className="w-32 h-1.5 rounded-full bg-slate-700 shadow-inner" />
            <div className="w-full p-3 rounded-2xl bg-[#0A1B3D] border border-[#14294F] text-center flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">
                Axoora Apex Pay
              </span>
              <span className="text-xl font-black font-mono text-white">₦25,000.00</span>
              <span className="text-[9px] text-[#A8BBD6]">MTN 4G + Airtel Active</span>
            </div>
            <div className="w-full grid grid-cols-3 gap-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => (
                <div
                  key={k}
                  className="h-6 rounded bg-[#14294F] text-[10px] font-mono text-white flex items-center justify-center"
                >
                  {k}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Receipt Stamp */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4 p-3 rounded-2xl bg-white text-[#0F172A] shadow-xl border border-slate-200 flex items-center gap-2 z-10"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              ✓
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Transaction Successful</span>
              <span className="text-[10px] text-slate-500 font-mono">0.4% Capped Fee</span>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: 'expense-card',
      tabLabel: 'Expense Card',
      eyebrow: 'Expense Card',
      title: 'A secure card for your business expenses',
      description:
        'Order an expense card to spend and manage your business finance effectively, and get it in 48hrs. Track your business expenses, isolate SaaS subscriptions, and set spending limits for different needs.',
      primaryCta: 'Get a Card',
      primaryAction: () => onOpenWaitlist('business'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('personal'),
      accentColor: '#0D95FE',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Card Mockup */}
          <div className="w-72 h-44 rounded-2xl p-4 bg-gradient-to-br from-[#0D95FE] via-[#05437B] to-[#011B38] border border-white/20 text-white shadow-2xl flex flex-col justify-between relative transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm tracking-wider">Axoora Business</span>
              <span className="material-symbols-outlined text-[20px]">contactless</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-white/70">CARD LIMIT</span>
              <span className="text-lg font-black font-mono">₦1,500,000.00</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span>•••• 8821</span>
              <span>08/29</span>
            </div>
          </div>

          {/* Floating Pill */}
          <div className="absolute bottom-6 right-6 p-3 rounded-2xl bg-[#0B1A3A] border border-[#14294F] text-white shadow-xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center">
              💳
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Payment Confirmed</span>
              <span className="text-[10px] font-mono text-[#00DF8F]">₦2,500 Fuel Expense</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'working-capital',
      tabLabel: 'Working Capital Loans',
      eyebrow: 'Working Capital Loans',
      title: 'Flexible loans that help your business grow',
      description:
        'Access halal working capital loans to help your business grow. Easy request process with business-friendly profit-sharing terms, zero interest (Riba-free), and flexible repayment tenures.',
      primaryCta: 'Check Eligibility',
      primaryAction: () => onOpenWaitlist('business'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('business'),
      accentColor: '#F2A93B',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Authentic merchant callout */}
          <div className="absolute top-4 right-4 flex items-center gap-2.5 p-2 rounded-2xl bg-[#020F2E]/90 border border-[#14294F] backdrop-blur-md z-10">
            <img
              src="/merchants/bilkisu.jpg"
              alt="Hajiya Bilkisu Danladi"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00DF8F]"
            />
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-white">Hajiya Bilkisu</span>
              <span className="text-[9px] text-[#00DF8F] font-mono">Dawanau Market, Kano</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1B3D] border border-[#193566] text-center flex flex-col items-center gap-4 max-w-sm mt-4">
            <span className="text-xs font-mono font-bold text-[#F2A93B] uppercase">
              Halal Working Capital
            </span>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#14294F]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00DF8F]"
                  strokeDasharray="75, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white font-mono">75%</span>
                <span className="text-[9px] font-bold text-[#00DF8F]">HEALTHY</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A8BBD6]">
              <span>Repayment Progress</span>
              <span className="font-bold text-white">· Zero Usury</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'business-savings',
      tabLabel: 'Business Savings',
      eyebrow: 'Business Savings',
      title: 'Save for your dreams',
      description:
        'Whether you dream of expanding inventory, buying a truck, or opening a second shop, you can create a savings plan for your goals and earn halal returns as a reward for disciplined saving.',
      primaryCta: 'Start Saving',
      primaryAction: () => onOpenWaitlist('business'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('business'),
      accentColor: '#00DF8F',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-xs p-5 rounded-3xl bg-[#0A1B3D] border border-[#193566] flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#00DF8F] font-bold">SAVINGS VAULT</span>
              <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">lock</span>
            </div>
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              ₦1,854,097.20
            </span>
            <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] flex items-center justify-between text-xs">
              <span className="text-[#A8BBD6]">Shop Rent Goal</span>
              <span className="font-bold text-[#00DF8F]">₦2,000,000.00</span>
            </div>
            <span className="text-[10px] text-[#7B9CD2] font-mono">
              ✓ On track, keep going!
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'moniebook',
      tabLabel: 'Market POS Software',
      eyebrow: 'Market POS Software',
      title: 'Smart POS software that sorts it all, from sales to stock',
      description:
        'All-in-one business management software for Nigerian retail SMEs. Manage bookkeeping, inventory, POS, payments, and staff cashier roles from one platform — offline-first, mobile-ready.',
      primaryCta: 'Explore Software',
      primaryAction: () => onOpenWaitlist('business'),
      secondaryCta: 'Learn more →',
      secondaryAction: () => onNavigate('business'),
      accentColor: '#0D95FE',
      renderVisual: () => (
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl bg-[#08152F] border-2 border-[#142A58] p-6 shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-sm p-4 rounded-3xl bg-[#0A1B3D] border border-[#193566] flex flex-col gap-2.5 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#14294F]">
              <span className="text-xs font-bold text-white">Wuse Supermarket Hub</span>
              <span className="text-[10px] font-mono text-[#00DF8F]">LIVE TILL #04</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'Basmati Rice (50kg)', qty: '24 bags', price: '₦72,000' },
                { name: 'Vegetable Oil (25L)', qty: '18 cans', price: '₦45,000' },
                { name: 'Refined Sugar', qty: '40 cartons', price: '₦38,000' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-[#020B1D] border border-[#14294F] flex items-center justify-between text-xs"
                >
                  <span className="text-white font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#7B9CD2]">{item.qty}</span>
                    <span className="font-bold text-[#00DF8F] font-mono">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Robust viewport-based scroll spy to update activeTabId as user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = 220; // 220px from top of viewport (below sticky header & nav)
      
      for (const tool of tools) {
        const el = itemsRef.current[tool.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            setActiveTabId(tool.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tools]);

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
    const el = itemsRef.current[id];
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="all-business-tools"
      className="relative w-full bg-[#020F2E] border-b border-[#14294F] text-[#F2F5F9]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center flex flex-col items-center gap-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D95FE]">
          BUILT FOR ENTERPRISE &amp; RETAIL SCALE
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
          All the tools you need to run your business with ease
        </h2>
        <p className="text-base sm:text-lg text-[#A8BBD6] max-w-2xl">
          Everything from registered shop NUBANs to high-uptime POS hardware, expense cards, and stock inventory.
        </p>
      </div>

      {/* THE STICKY SUB-NAV BAR (Pins cleanly below main header while scrolling through the 6 items) */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#020F2E]/95 backdrop-blur-xl border-y border-[#14294F] py-3.5 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {tools.map((tool) => {
            const isActive = activeTabId === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleTabClick(tool.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-[#00284D] font-bold' : 'text-[#A8BBD6] hover:text-white hover:bg-[#14294F]/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStickyToolPill"
                    className="absolute inset-0 rounded-full bg-[#0D95FE] shadow-md shadow-[#0D95FE]/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tool.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THE 6 SEQUENTIAL PRODUCT SUITE ITEMS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-[#14294F]">
        {tools.map((tool) => (
          <div
            key={tool.id}
            id={`tool-${tool.id}`}
            ref={(el) => {
              itemsRef.current[tool.id] = el;
            }}
            className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D95FE]">
                {tool.eyebrow}
              </span>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F2F5F9] tracking-tight leading-tight">
                {tool.title}
              </h3>

              <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed max-w-xl">
                {tool.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={tool.primaryAction}
                  className="px-6 py-3 rounded-full bg-[#0D95FE] text-[#00284D] hover:bg-[#00DF8F] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer shadow-md"
                >
                  {tool.primaryCta}
                </button>

                <button
                  onClick={tool.secondaryAction}
                  className="text-sm font-semibold text-[#00DF8F] hover:underline cursor-pointer flex items-center gap-1"
                >
                  {tool.secondaryCta}
                </button>
              </div>
            </div>

            {/* Right Interactive Mockup / Composition */}
            <div className="lg:col-span-6 flex items-center justify-center">
              {tool.renderVisual()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
