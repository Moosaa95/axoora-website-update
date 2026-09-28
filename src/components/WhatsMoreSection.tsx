'use client';

import React from 'react';
import { ScreenType } from '../types';

interface WhatsMoreSectionProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWhatsApp: () => void;
}

export const WhatsMoreSection: React.FC<WhatsMoreSectionProps> = ({
  onNavigate,
  onOpenWhatsApp,
}) => {
  const cards = [
    {
      title: 'Manage Multiple Businesses',
      desc: 'Easily handle multiple business entities, branch counters, and merchant accounts in one unified console.',
      icon: 'storefront',
      accent: '#0D95FE',
      action: () => onNavigate('business'),
    },
    {
      title: 'Business Performance',
      desc: 'Keep your finger on the pulse of your business with real-time settlement alerts, daily cashflow, and VAT statements.',
      icon: 'insights',
      accent: '#00DF8F',
      action: () => onNavigate('business'),
    },
    {
      title: 'Easy Help with Real Humans',
      desc: 'Quick and accessible support whenever you need it via WhatsApp voice note, direct phone, or physical market hubs.',
      icon: 'support_agent',
      accent: '#F2A93B',
      action: onOpenWhatsApp,
    },
  ];

  return (
    <section className="relative w-full py-16 bg-[#F8FAFC] text-[#0F172A] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#0D95FE]">
              BEYOND TRANSACTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">
              What's more?
            </h3>
          </div>
          <p className="text-sm text-[#64748B] max-w-md">
            Explore more ways to take your business to the next level with dedicated tools crafted for Nigerian commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={card.action}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#0D95FE]/50 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 cursor-pointer group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform"
                style={{ backgroundColor: card.accent }}
              >
                <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#0D95FE] transition-colors">
                {card.title}
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {card.desc}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#0D95FE] group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
