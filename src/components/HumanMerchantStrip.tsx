'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HumanMerchantStripProps {
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent') => void;
}

export const HumanMerchantStrip: React.FC<HumanMerchantStripProps> = ({ onOpenWaitlist }) => {
  const merchants = [
    {
      id: 'bilkisu',
      name: 'Hajiya Bilkisu Danladi',
      role: 'Wholesale Grain Merchant',
      location: 'Dawanau Market, Kano',
      image: '/merchants/bilkisu.jpg',
      quote:
        'We dispatch 40 tonnes of grains across Northern Nigeria weekly. Axoora gave us halal zero-interest inventory capital and sub-second supplier settlements.',
      statLabel: 'Weekly Turnover',
      statValue: '₦18.4M+',
      accentColor: '#00DF8F',
      badge: 'Halal Capital Merchant',
    },
    {
      id: 'emeka',
      name: 'Emeka Chukwu',
      role: 'Electronics & Gadgets Distributor',
      location: 'Computer Village, Ikeja, Lagos',
      image: '/merchants/emeka.jpg',
      quote:
        'Network downtime on Saturdays used to cost us dozens of angry customers. Our 8 Apex POS terminals switch automatically between MTN and Airtel with zero glitches.',
      statLabel: 'Terminal Uptime',
      statValue: '99.98%',
      accentColor: '#0D95FE',
      badge: 'Apex POS Fleet',
    },
    {
      id: 'fatima',
      name: 'Fatima Al-Hassan',
      role: 'Founder, Zaynab Couture',
      location: 'Wuse II, Abuja',
      image: '/merchants/fatima.jpg',
      quote:
        'Banking on WhatsApp is a game-changer. I check balances, generate invoice links, and pay textile suppliers in Kano while on the go. Zero monthly fees.',
      statLabel: 'Transfer Fees Saved',
      statValue: '₦0 Fees',
      accentColor: '#F2A93B',
      badge: 'WhatsApp AI Banking',
    },
    {
      id: 'tunde',
      name: 'Tunde Bakare',
      role: 'Supermarket Operations Manager',
      location: 'Lekki Phase 1, Lagos',
      image: '/merchants/tunde.jpg',
      quote:
        'Each checkout desk has its own dedicated shop NUBAN. Cashiers balance their shift in 2 minutes without disputes or manual paper receipts.',
      statLabel: 'Shift Audit Speed',
      statValue: '2 Mins',
      accentColor: '#00DF8F',
      badge: 'Multi-Till NUBANs',
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#031338] border-b border-[#14294F] text-[#F2F5F9] overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#0D95FE]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#00DF8F]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]/80">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00DF8F]">
              THE PEOPLE BEHIND NIGERIA'S DAILY ECONOMY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight leading-tight">
              Made for the street, the shop, and the market stall.
            </h2>
            <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed">
              Real business owners, traders, and everyday shoppers who rely on Axoora's high-uptime terminals and ethical finance every single day.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex -space-x-2.5 overflow-hidden">
              {merchants.map((m) => (
                <img
                  key={m.id}
                  src={m.image}
                  alt={m.name}
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-[#020F2E] object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">120,000+ Merchants</span>
              <span className="text-[11px] text-[#00DF8F] font-mono">Verified across 36 states</span>
            </div>
          </div>
        </div>

        {/* 4 Authentic Merchant Photo Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchants.map((merchant, idx) => (
            <motion.div
              key={merchant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-3xl bg-[#071942] border border-[#14294F] hover:border-[#0D95FE]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#0D95FE]/10"
            >
              {/* Photo Banner with Authentic Human Portrait */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A1B3D]">
                <img
                  src={merchant.image}
                  alt={merchant.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071942] via-transparent to-black/20" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-[#020F2E]/85 border border-[#14294F]"
                    style={{ color: merchant.accentColor }}
                  >
                    {merchant.badge}
                  </span>
                </div>

                {/* Stat Callout Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#020F2E]/90 border border-[#14294F] backdrop-blur-md flex flex-col items-end">
                  <span className="text-[9px] text-[#A8BBD6] uppercase font-mono">{merchant.statLabel}</span>
                  <span className="text-xs font-black text-white font-mono" style={{ color: merchant.accentColor }}>
                    {merchant.statValue}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-2.5">
                  <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed italic">
                    "{merchant.quote}"
                  </p>
                </div>

                {/* Merchant Bio Footer */}
                <div className="pt-3 border-t border-[#14294F]/80 flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white group-hover:text-[#0D95FE] transition-colors">
                      {merchant.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                  </div>
                  <span className="text-xs text-[#00DF8F] font-medium">{merchant.role}</span>
                  <span className="text-[11px] text-[#7B9CD2] font-mono mt-0.5">{merchant.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Human Trust Action Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0A1B3D] via-[#0E2856] to-[#0A1B3D] border border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center font-bold text-xl shrink-0">
              🤝
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Join 120,000+ businesses powering their shops with Axoora
              </h4>
              <p className="text-xs sm:text-sm text-[#A8BBD6]">
                Get a dedicated shop NUBAN, 0% interest stock financing, or your Apex POS terminal in 48 hours.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenWaitlist('business')}
            className="px-6 py-3 rounded-full bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-[#00284D] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shrink-0 whitespace-nowrap"
          >
            Start in 2 Minutes
          </button>
        </div>

      </div>
    </section>
  );
};
