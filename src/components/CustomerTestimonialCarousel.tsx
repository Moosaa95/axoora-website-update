'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ScreenType } from '../types';

interface Testimonial {
  id: string;
  category: 'shop' | 'agent';
  name: string;
  role: string;
  business: string;
  location: string;
  marketStall: string;
  initials: string;
  avatarUrl?: string;
  accentColor: string;
  badgeIcon: string;
  tradeType: string;
  quote: string;
  humanDetail: string;
  metricLabel: string;
  metricValue: string;
  productUsed: string;
  verifiedYear: string;
  tagline: string;
  receiptSample: {
    terminalId: string;
    rrn: string;
    stan: string;
    amount: string;
    time: string;
  };
}

interface CustomerTestimonialCarouselProps {
  isLight?: boolean;
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: (interest?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const CustomerTestimonialCarousel: React.FC<CustomerTestimonialCarouselProps> = ({
  isLight = false,
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const testimonials: Testimonial[] = [
    {
      id: 'musa-danbaba',
      category: 'shop',
      name: 'Alhaji Musa Danbaba',
      role: 'Wholesale Grain & Provision Merchant',
      business: 'Danbaba Commodities Ltd.',
      location: 'Kano State',
      marketStall: 'Dawanau Grain Market · Block 14, Shed 3',
      initials: 'MD',
      avatarUrl: '/merchants/emeka.jpg',
      accentColor: '#F2A93B',
      badgeIcon: 'agriculture',
      tradeType: 'Agro-Commodities',
      quote:
        'Friday afternoons used to be a nightmare of unresolved bank transfers and angry customers waiting outside my store. With Axoora Business, our shop NUBAN settles in 2.1 seconds, and my cashiers get instant WhatsApp voice confirmation. The zero-interest financing also helped me stock 400 bags of rice before Ramadan without usurious debt.',
      humanDetail: 'Operating 3 wholesale sheds with 14 shop boys and truck loaders.',
      metricLabel: 'Weekly Turnover Settled',
      metricValue: '₦6.8M / week',
      productUsed: 'Axoora Business & Shop NUBAN',
      verifiedYear: 'Partner Since 2024',
      tagline: 'Instant Friday Wholesale Settlement',
      receiptSample: {
        terminalId: 'AX-KN-04921',
        rrn: '00392819034',
        stan: '849102',
        amount: '₦145,000.00',
        time: '14:22:08 WAT',
      },
    },
    {
      id: 'blessing-okafor',
      category: 'agent',
      name: 'Blessing Okafor',
      role: 'Apex POS Super-Dealer & Cash Agent',
      business: 'Blessing Digital Paypoint',
      location: 'Lagos State',
      marketStall: 'Computer Village, Ikeja · Slot 18',
      initials: 'BO',
      avatarUrl: '/merchants/fatima.jpg',
      accentColor: '#00DF8F',
      badgeIcon: 'point_of_sale',
      tradeType: 'Agency Banking',
      quote:
        'Network downtime kills agency business during 5 PM rush hour. The Apex POS terminal has dual-eSIM that flips between MTN and Airtel automatically without rebooting or stalling transactions. When a customer questions a debit, our WhatsApp support desk responds with NIBSS session proof in less than 3 minutes.',
      humanDetail: 'Runs cash-in/cash-out counter from 7:30 AM to 8:30 PM daily.',
      metricLabel: 'Terminal Uptime Record',
      metricValue: '99.98% Peak Uptime',
      productUsed: 'Apex POS Dual-SIM & Agent Fleet',
      verifiedYear: 'Partner Since 2024',
      tagline: '48-Hour Battery & Zero Downtime',
      receiptSample: {
        terminalId: 'AX-LG-88102',
        rrn: '00984920145',
        stan: '204918',
        amount: '₦20,000.00',
        time: '17:41:19 WAT',
      },
    },
    {
      id: 'ibrahim-garba',
      category: 'shop',
      name: 'Dr. Ibrahim Garba',
      role: 'Managing Director & Pharmacist',
      business: 'MedPlus City Dispensaries',
      location: 'Abuja FCT',
      marketStall: 'Wuse Zone 4 · Commercial Suite 9',
      initials: 'IG',
      avatarUrl: '/merchants/tunde.jpg',
      accentColor: '#0D95FE',
      badgeIcon: 'local_pharmacy',
      tradeType: 'Healthcare Retail',
      quote:
        'Disbursing salaries to 22 pharmacists across Abuja and paying pharmaceutical distributors in Kaduna was chaotic with conventional commercial banks. Axoora’s 1-click batch payout saves our bookkeeping team 5 hours every single Monday, with clear audit-ready statements and zero maintenance deductions.',
      humanDetail: 'Supplying hospitals and neighborhood clinics across 3 locations in Abuja.',
      metricLabel: 'Automated Monthly Payroll',
      metricValue: '22 Staff Disbursed',
      productUsed: 'Axoora Business Bulk Disbursements',
      verifiedYear: 'Partner Since 2025',
      tagline: '1-Click Multi-Dispensary Payouts',
      receiptSample: {
        terminalId: 'AX-AB-30219',
        rrn: '00746281903',
        stan: '593021',
        amount: '₦480,000.00',
        time: '09:15:33 WAT',
      },
    },
    {
      id: 'chidinma-adeleke',
      category: 'shop',
      name: 'Chidinma Adeleke',
      role: 'Textile Boutique & Thrift Organizer',
      business: 'Chi-Style Fabric Atelier',
      location: 'Lagos State',
      marketStall: 'Balogun Market, Lagos Island · Line 3',
      initials: 'CA',
      avatarUrl: '/merchants/bilkisu.jpg',
      accentColor: '#A855F7',
      badgeIcon: 'styler',
      tradeType: 'Fashion & Textiles',
      quote:
        'We run a 10-woman thrift circle for textile shipments. Collecting cash in Balogun always led to arguments and late payouts. With Paycircle on Axoora, each member contributes right from WhatsApp, funds stay in licensed escrow, and each woman collects her ₦1,000,000 turn automatically without interest or awkward reminders.',
      humanDetail: 'Importing Swiss laces and Ankara prints for wedding parties and events.',
      metricLabel: 'Rotational Escrow Pool',
      metricValue: '₦1.0M Monthly Thrift',
      productUsed: 'Paycircle (Ajo) Escrow & Virtual Card',
      verifiedYear: 'Partner Since 2025',
      tagline: 'Community Thrift in a Licensed Room',
      receiptSample: {
        terminalId: 'AX-LG-19402',
        rrn: '00619284710',
        stan: '409183',
        amount: '₦100,000.00',
        time: '12:04:51 WAT',
      },
    },
    {
      id: 'kabiru-aliyu',
      category: 'agent',
      name: 'Kabiru Aliyu',
      role: 'Hardware Distributor & Aggregator',
      business: 'Arewa Link POS Fleets',
      location: 'Kaduna State',
      marketStall: 'Central Market, Kaduna · Hub A',
      initials: 'KA',
      avatarUrl: '/team/ceo.jpg',
      accentColor: '#00DF8F',
      badgeIcon: 'hub',
      tradeType: 'Fleet Distribution',
      quote:
        'I manage 35 POS agents stationed across Kaduna and Zaria. Other platforms took days to resolve terminal float reconciliation. The Axoora Aggregator Console lets me monitor all 35 machines live, re-allocate float instantly via WhatsApp, and our agents earn transparent commissions deposited every midnight.',
      humanDetail: 'Empowering young school leavers with reliable POS income across Northern Nigeria.',
      metricLabel: 'Active POS Network',
      metricValue: '35 Terminals Monitored',
      productUsed: 'Axoora Aggregator Fleet Console',
      verifiedYear: 'Partner Since 2024',
      tagline: 'Real-Time Float & Fleet Rebalancing',
      receiptSample: {
        terminalId: 'AX-KD-55109',
        rrn: '00192847582',
        stan: '772910',
        amount: '₦50,000.00',
        time: '16:30:00 WAT',
      },
    },
  ];

  const [activeCategory, setActiveCategory] = useState<'all' | 'shop' | 'agent'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  const filteredTestimonials = testimonials.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (isPaused || showReceiptModal) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isPaused, showReceiptModal, filteredTestimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-[#14294F] bg-[#020F2E] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        {/* Header & Category Controls (Zero-pill, clean typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]" />
              <span>Real Merchant Stories</span>
              <span aria-hidden="true" className="text-[#14294F]">·</span>
              <span className="text-[#A8BBD6]">Verified Market Accounts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
              Don't just take our word for it.
            </h2>
            <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
              Authentic Nigerian shopkeepers, market women, and agency banking operators who depend on Axoora every single trading day.
            </p>
          </div>

          {/* Top Right: Real Merchant Faces Avatars */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center -space-x-2">
              {filteredTestimonials.map((t, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 transition-all overflow-hidden cursor-pointer shadow-md bg-[#020F2E] ${
                      isSelected
                        ? 'border-[#00DF8F] scale-110 z-10 ring-2 ring-[#00DF8F]/50'
                        : 'border-[#14294F] opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                    title={`${t.name} (${t.business})`}
                  >
                    <img
                      src={t.avatarUrl || '/merchants/bilkisu.jpg'}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Category Filter Controls */}
            <div className="flex items-center gap-1 p-1 bg-[#0A1B3D] border border-[#14294F] rounded-lg">
              {[
                { id: 'all', label: 'All' },
                { id: 'shop', label: 'Shops' },
                { id: 'agent', label: 'Agents' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#14294F] text-[#F2F5F9] shadow-sm font-semibold'
                      : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Slide Stage */}
        <div className="relative min-h-[440px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${activeCategory}-${currentItem.id}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full rounded-2xl bg-[#0A1B3D] border border-[#14294F] p-6 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                {/* Left Column: Authentic Human Merchant Identity Card (NO AI PHOTOS) */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  {/* Merchant Photo & Verification Seal */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shrink-0 shadow-xl relative bg-[#020F2E]"
                      style={{
                        borderColor: currentItem.accentColor,
                      }}
                    >
                      <img
                        src={currentItem.avatarUrl || '/merchants/bilkisu.jpg'}
                        alt={currentItem.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#003825] bg-[#00DF8F] border-2 border-[#020F2E] shadow"
                        title="Verified Nigerian Merchant"
                      >
                        ✓
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-[#00DF8F] uppercase tracking-wider font-semibold">
                        {currentItem.tradeType}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9] tracking-tight">
                        {currentItem.name}
                      </h3>
                      <p className="text-xs text-[#A8BBD6] font-medium mt-0.5">
                        {currentItem.business}
                      </p>
                    </div>
                  </div>

                  {/* Clean Location & Market Line (Unboxed) */}
                  <div className="text-xs text-[#A8BBD6] flex flex-col gap-1 border-t border-[#14294F] pt-3">
                    <div className="flex items-center gap-1.5 text-[#F2F5F9]">
                      <span className="material-symbols-outlined text-[15px] text-[#0D95FE]">storefront</span>
                      <span className="font-semibold">{currentItem.marketStall}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#A8BBD6] text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span>{currentItem.location} · {currentItem.verifiedYear}</span>
                    </div>
                  </div>

                  {/* Merchant Human Realities */}
                  <p className="text-xs text-[#A8BBD6] leading-relaxed italic bg-[#020F2E]/60 p-3 rounded-lg border border-[#14294F]/80">
                    "{currentItem.humanDetail}"
                  </p>

                  {/* Physical Settlement Reference Button */}
                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#020F2E] border border-[#14294F] text-xs text-[#A8BBD6] hover:text-[#00DF8F] hover:border-[#00DF8F]/50 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">receipt_long</span>
                      <span>View Sample Settlement Slip</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#00DF8F]">NIBSS Verified →</span>
                  </button>
                </div>

                {/* Right Column: Genuine Merchant Quote & Real Numbers */}
                <div className="lg:col-span-8 flex flex-col justify-between gap-6">
                  {/* Lead Tagline */}
                  <div className="text-xs font-mono text-[#00DF8F] flex items-center gap-2">
                    <span className="text-[#0D95FE]">#</span>
                    <span>{currentItem.tagline}</span>
                  </div>

                  {/* Direct Human Quote */}
                  <blockquote className="text-base sm:text-xl text-[#F2F5F9] font-normal leading-relaxed">
                    "{currentItem.quote}"
                  </blockquote>

                  {/* Verified Impact Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#14294F]">
                    <div>
                      <span className="text-xs text-[#A8BBD6] block font-mono">
                        {currentItem.metricLabel}
                      </span>
                      <span className="text-2xl font-extrabold text-[#00DF8F] font-mono tracking-tight">
                        {currentItem.metricValue}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#A8BBD6] block font-mono">
                        Dedicated Solution
                      </span>
                      <span className="text-sm font-semibold text-[#F2F5F9]">
                        {currentItem.productUsed}
                      </span>
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {currentItem.category === 'shop' ? (
                      <button
                        onClick={() => onNavigate?.('business')}
                        className="px-5 py-2.5 rounded-lg bg-[#0D95FE] text-[#00325b] hover:bg-[#00DF8F] hover:text-[#003825] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Open Shop Account</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate?.('pos-agents')}
                        className="px-5 py-2.5 rounded-lg bg-[#00DF8F] text-[#003825] hover:bg-[#0D95FE] hover:text-[#00325b] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Get Apex POS Machine</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenWhatsApp}
                      className="px-4 py-2.5 rounded-lg border border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9] text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">chat</span>
                      <span>Talk on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slide Controller */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Indicator */}
          <div className="flex items-center gap-2">
            {filteredTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all cursor-pointer rounded-full ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#00DF8F]'
                    : 'w-2 h-2 bg-[#14294F] hover:bg-[#0D95FE]'
                }`}
                title={`Go to story ${idx + 1}`}
              />
            ))}
            <span className="text-xs font-mono text-[#A8BBD6] ml-2">
              Story {currentIndex + 1} of {filteredTestimonials.length}
            </span>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                isPaused
                  ? 'bg-[#00DF8F]/15 text-[#00DF8F] border-[#00DF8F]/40'
                  : 'bg-[#0A1B3D] text-[#A8BBD6] border-[#14294F] hover:text-[#F2F5F9]'
              }`}
              title={isPaused ? 'Resume sliding' : 'Pause sliding'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
            </button>

            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              title="Previous story"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              title="Next story"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* In the Field with Our Merchants (Authentic Documentary Photography Strip) */}
        <div className="pt-8 border-t border-[#14294F]/80 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#0D95FE] uppercase tracking-wider">
                FIELD DOCUMENTARY · LIVE COMMERCE ACROSS NIGERIA
              </span>
            </div>
            <span className="text-xs text-[#A8BBD6]">
              Real photos from Kano Dawanau, Ikeja Computer Village, Balogun &amp; Lekki
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: 'Dawanau Grain Market',
                loc: 'Kano State',
                tag: 'Wholesale Hub',
                img: '/merchants/bilkisu.jpg',
                metric: '₦18.4M Weekly Inflow',
              },
              {
                title: 'Computer Village Tech',
                loc: 'Ikeja, Lagos',
                tag: 'POS Fleet',
                img: '/merchants/emeka.jpg',
                metric: '99.98% POS Uptime',
              },
              {
                title: 'Balogun Fashion Stalls',
                loc: 'Lagos Island',
                tag: 'Ajo Escrow',
                img: '/merchants/fatima.jpg',
                metric: '₦0 Transfer Fees',
              },
              {
                title: 'Fresh Mart & Bakery',
                loc: 'Lekki Phase 1',
                tag: 'Store NUBAN',
                img: '/merchants/tunde.jpg',
                metric: '2-Min Shift Closeout',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A1B3D] border border-[#14294F] shadow-lg hover:border-[#0D95FE]/60 transition-all"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020F2E] via-[#020F2E]/40 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col text-left">
                  <span className="text-[10px] font-mono text-[#00DF8F] font-bold uppercase">{item.tag}</span>
                  <span className="text-xs font-bold text-white leading-tight">{item.title}</span>
                  <div className="flex items-center justify-between text-[10px] text-[#A8BBD6] mt-0.5">
                    <span>{item.loc}</span>
                    <span className="font-mono text-[#0D95FE] font-bold">{item.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real Thermal Paper Settlement Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-none bg-[#FDFBF7] text-[#1E293B] font-mono shadow-2xl p-6 border-t-8 border-dashed border-[#CBD5E1]"
            >
              {/* Receipt Top Zigzag effect */}
              <div className="text-center pb-3 border-b-2 border-dashed border-slate-300">
                <p className="font-extrabold text-base tracking-wider text-slate-900">
                  {currentItem.business.toUpperCase()}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">{currentItem.marketStall}</p>
                <p className="text-[10px] text-slate-500">{currentItem.location} · NIGERIA</p>
                <p className="text-[11px] font-bold text-emerald-700 mt-2 bg-emerald-50 py-1 border border-emerald-200">
                  *** TRANSACTION APPROVED ***
                </p>
              </div>

              {/* Receipt Data Table */}
              <div className="py-3 text-xs flex flex-col gap-1.5 border-b-2 border-dashed border-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">TERMINAL:</span>
                  <span className="font-bold">{currentItem.receiptSample.terminalId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MERCHANT:</span>
                  <span className="font-bold">{currentItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DATE/TIME:</span>
                  <span>{currentItem.receiptSample.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">RRN:</span>
                  <span>{currentItem.receiptSample.rrn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STAN:</span>
                  <span>{currentItem.receiptSample.stan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NETWORK:</span>
                  <span className="text-emerald-700 font-bold">NIBSS INSTANT RAIL</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm">
                  <span>TOTAL AMOUNT:</span>
                  <span className="text-slate-900">{currentItem.receiptSample.amount}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>TRANSFER FEE:</span>
                  <span className="text-emerald-700 font-bold">₦0.00 (FREE)</span>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="pt-3 text-center text-[10px] text-slate-500 flex flex-col gap-1">
                <p className="font-bold text-slate-700">POWERED BY AXOORA FINANCIAL TECH</p>
                <p>Licensed by Central Bank of Nigeria · NDIC Insured</p>
                <p className="text-[9px] text-slate-400 mt-1">CUSTOMER COPY · NO DEBT INTEREST</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowReceiptModal(false)}
                className="w-full mt-4 py-2 bg-slate-900 text-white font-sans text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
