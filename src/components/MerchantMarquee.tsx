'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface MerchantMarqueeProps {
  isLight?: boolean;
}

interface MarketHubPartner {
  name: string;
  category: string;
  badge: string;
  color: string;
}

export const MerchantMarquee: React.FC<MerchantMarqueeProps> = ({ isLight: propIsLight }) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

  const hubs: MarketHubPartner[] = [
    { name: 'Dawanau Grain Exchange', category: 'Agro-Commodities Hub', badge: 'DWN', color: '#B45309' },
    { name: 'Balogun Traders Guild', category: 'Textiles & Fashion', badge: 'BLG', color: '#7C3AED' },
    { name: 'Computer Village Tech', category: 'Hardware & Mobile Ops', badge: 'CVT', color: '#006491' },
    { name: 'Wuse Commercial Market', category: 'Retail & Daily Grocery', badge: 'WUS', color: '#059669' },
    { name: 'Alaba Merchants Union', category: 'Electronics & Logistics', badge: 'ALB', color: '#E11D48' },
    { name: 'Kano Kurmi Guild', category: 'Artisans & Wholesale', badge: 'KRM', color: '#D97706' },
    { name: 'Onitsha Main Market', category: 'Import & FMCG Trading', badge: 'OMM', color: '#2563EB' },
    { name: 'Maitama Business Mall', category: 'Corporate & Hospitality', badge: 'MTM', color: '#0F766E' },
  ];

  return (
    <section
      className={`relative w-full pt-14 pb-12 sm:pt-16 sm:pb-14 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#01091C] border-[#14294F] text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Top Header: "Commercial Hubs that Count on Us" */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
            isLight ? 'border-slate-100' : 'border-[#14294F]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]" />
              <span className={isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}>PROVEN MARKET FOOTPRINT</span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-[#14294F]'}>·</span>
              <span className={isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}>Nationwide Trading Rails</span>
            </div>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Major Commercial Hubs that Trust Axoora
            </h3>
            <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Powering over{' '}
              <span className="font-bold text-[#0D95FE]">180,000+</span> wholesale traders, retail shopkeepers, and POS agents across Nigeria.
            </p>
          </div>

          <div className="flex items-baseline gap-2 self-start md:self-auto">
            <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0D95FE] via-[#00DF8F] to-[#0A2540] dark:to-[#00DF8F] tracking-tighter tabular-nums">
              36
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
              }`}
            >
              States Covered<br />&amp; Abuja FCT
            </span>
          </div>
        </div>

        {/* Commercial Hubs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {hubs.map((hub, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer group ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-[#0D95FE]/50 hover:bg-white hover:shadow-md'
                  : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#0D95FE]/60 hover:bg-[#0E2452]'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs tracking-wider shadow-sm group-hover:scale-105 transition-transform"
                style={{ backgroundColor: hub.color }}
              >
                {hub.badge}
              </div>
              <span
                className={`font-bold text-xs sm:text-sm tracking-tight group-hover:text-[#0D95FE] transition-colors leading-snug ${
                  isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                }`}
              >
                {hub.name}
              </span>
              <span
                className={`text-[10px] line-clamp-1 ${
                  isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
                }`}
              >
                {hub.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
