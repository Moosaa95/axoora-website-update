'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface InterbankInstitutionsMarqueeProps {
  isLight?: boolean;
  onOpenWhatsApp?: () => void;
}

const TRUSTED_INSTITUTIONS = [
  { name: 'Access Bank', label: 'Commercial Bank' },
  { name: 'Zenith Bank', label: 'Commercial Bank' },
  { name: 'GTBank (Guaranty Trust)', label: 'Commercial Bank' },
  { name: 'FirstBank of Nigeria', label: 'Commercial Bank' },
  { name: 'United Bank for Africa (UBA)', label: 'Commercial Bank' },
  { name: 'Stanbic IBTC', label: 'Commercial Bank' },
  { name: 'Kuda Bank', label: 'Digital Bank' },
  { name: 'OPay', label: 'Payment Service' },
  { name: 'Moniepoint MFB', label: 'Microfinance Bank' },
  { name: 'Wema Bank / ALAT', label: 'Commercial Bank' },
  { name: 'Fidelity Bank', label: 'Commercial Bank' },
  { name: 'FCMB', label: 'Commercial Bank' },
  { name: 'Sterling Bank', label: 'Commercial Bank' },
  { name: 'NIBSS (NIP Rails)', label: 'National Switch' },
  { name: 'Interswitch', label: 'Payment Gateway' },
  { name: 'Verve', label: 'Card Scheme' },
  { name: 'Mastercard', label: 'Global Network' },
  { name: 'Visa', label: 'Global Network' },
];

export const InterbankInstitutionsMarquee: React.FC<InterbankInstitutionsMarqueeProps> = ({
  isLight: propIsLight,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

  // Double array for seamless infinite marquee loop
  const marqueeList = [...TRUSTED_INSTITUTIONS, ...TRUSTED_INSTITUTIONS];

  return (
    <section
      className={`relative w-full py-12 sm:py-16 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-slate-50/70 border-slate-200 text-slate-900'
          : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-4 mb-8">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-50 dark:bg-[#0A1B3D] border border-emerald-200 dark:border-[#14294F] text-xs font-mono font-bold text-emerald-800 dark:text-[#00DF8F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
          <span>NIBSS DIRECT SWITCH · 99.9% SETTLEMENT SUCCESS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Seamless transfers to any bank in Nigeria
        </h2>

        <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
          Directly integrated with the Nigerian Inter-Bank Settlement System (NIBSS). Receive instant customer card swipes and transfers from all commercial banks and mobile wallets.
        </p>

        {/* 3 Crisp Value Metrics (Moniepoint style) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">bolt</span>
            <span className="font-bold">Sub-2s Direct Credit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">payments</span>
            <span className="font-bold">₦0.00 Unlimited Transfers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">verified</span>
            <span className="font-bold">All 40+ Banks Supported</span>
          </div>
        </div>
      </div>

      {/* Smooth, Elegant Infinite Brand Marquee (No server ping times or clunky tiles) */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="flex items-center gap-3 animate-marquee whitespace-nowrap will-change-transform py-2">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all shrink-0 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 shadow-xs'
                  : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9]'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-[#00DF8F]" />
              <span className="text-xs font-extrabold tracking-tight">{item.name}</span>
              <span className="text-[10px] font-mono text-slate-400 opacity-80">· {item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
