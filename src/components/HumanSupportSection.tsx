'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HumanSupportSectionProps {
  isLight?: boolean;
  onOpenWhatsApp?: () => void;
}

export const HumanSupportSection: React.FC<HumanSupportSectionProps> = ({
  isLight = false,
  onOpenWhatsApp,
}) => {
  const [selectedHub, setSelectedHub] = useState<number>(0);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const supportHubs = [
    {
      city: 'Lagos Mainland',
      district: 'Computer Village, Ikeja',
      address: 'Shop 18, Pepple Street, Beside Slot Hub',
      repName: 'Tunde & Blessing',
      languages: 'English, Yoruba, Pidgin',
      hours: 'Mon–Sat: 7:30 AM – 8:00 PM WAT',
      specialty: 'POS Terminal Swap & Hardware Support',
    },
    {
      city: 'Lagos Island',
      district: 'Balogun Market',
      address: 'Line 3, Wholesale Textile Corridor',
      repName: 'Chidinma & Emeka',
      languages: 'English, Igbo, Yoruba, Pidgin',
      hours: 'Mon–Sat: 8:00 AM – 6:30 PM WAT',
      specialty: 'Paycircle (Ajo) & Shop NUBAN Support',
    },
    {
      city: 'Kano State',
      district: 'Dawanau Grain Market',
      address: 'Central Market Office, Block 14',
      repName: 'Musa & Haruna',
      languages: 'Hausa, English, Pidgin',
      hours: 'Mon–Sat: 7:00 AM – 7:00 PM WAT',
      specialty: 'Large Bulk Settlement & Merchant Verification',
    },
    {
      city: 'Abuja FCT',
      district: 'Wuse Zone 4',
      address: 'Commercial Avenue, Suite 9',
      repName: 'Fatima & Dr. Garba',
      languages: 'English, Hausa, Pidgin',
      hours: 'Mon–Sat: 8:00 AM – 7:00 PM WAT',
      specialty: 'Corporate Payouts & Pharmacy Accounts',
    },
  ];

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText('+234 1 888 2966');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const activeHub = supportHubs[selectedHub];

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-[#14294F] bg-[#020F2E]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]" />
              <span>Real People. Zero Runaround.</span>
              <span aria-hidden="true" className="text-[#14294F]">·</span>
              <span className="text-[#A8BBD6]">Lagos · Kano · Abuja · Port Harcourt</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
              When money hangs, talk to an actual human.
            </h2>
            <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
              No endless chatbot loops, no automated ticket numbers that take 7 working days to resolve. Connect with our dedicated merchant desks in under 3 minutes.
            </p>
          </div>

          {/* Quick Direct Phone Call Button */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleCopyPhone}
              className="px-4 py-2 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:border-[#00DF8F] text-xs font-mono text-[#F2F5F9] transition-colors cursor-pointer flex items-center gap-2"
              title="Click to copy direct helpline"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">call</span>
              <span>+234 1 888 AXOORA</span>
              <span className="text-[10px] text-[#00DF8F]">{copiedPhone ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* 3 Human Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00DF8F]/15 border border-[#00DF8F]/40 flex items-center justify-center text-[#00DF8F]">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">2.8 Minute Resolution</h3>
            <p className="text-xs text-[#A8BBD6] leading-relaxed">
              If a customer transfer is unconfirmed at your store counter, our support team can pull the NIBSS session ID in real-time to confirm debit or reversal on the spot.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D95FE]/15 border border-[#0D95FE]/40 flex items-center justify-center text-[#0D95FE]">
              <span className="material-symbols-outlined text-[20px]">translate</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">Your Language, Your Tone</h3>
            <p className="text-xs text-[#A8BBD6] leading-relaxed">
              Speak or send WhatsApp voice notes in English, Pidgin, Hausa, Yoruba, or Igbo. Our local reps understand market terminologies and business realities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/15 border border-[#F2A93B]/40 flex items-center justify-center text-[#F2A93B]">
              <span className="material-symbols-outlined text-[20px]">store</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">Walk-in Market Desks</h3>
            <p className="text-xs text-[#A8BBD6] leading-relaxed">
              Physical field agents stationed right inside Computer Village, Balogun Market, and Dawanau. If your POS paper rolls run out or hardware fails, we replace it on the spot.
            </p>
          </div>
        </div>

        {/* Walk-in Market Desks Interactive Selector */}
        <div className="rounded-2xl bg-[#0A1B3D] border border-[#14294F] p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold tracking-wider">
                PHYSICAL MERCHANT HUBS
              </span>
              <h3 className="text-xl font-bold text-[#F2F5F9] mt-0.5">
                Drop in or call our market desk team
              </h3>
            </div>

            {/* Hub tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-[#020F2E] border border-[#14294F] rounded-lg">
              {supportHubs.map((hub, idx) => (
                <button
                  key={hub.city}
                  onClick={() => setSelectedHub(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedHub === idx
                      ? 'bg-[#14294F] text-[#F2F5F9] font-semibold'
                      : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                  }`}
                >
                  {hub.city}
                </button>
              ))}
            </div>
          </div>

          {/* Active Hub Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-xl bg-[#020F2E] border border-[#14294F] items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00DF8F]">pin_drop</span>
                <span className="font-bold text-base text-[#F2F5F9]">{activeHub.district}</span>
                <span className="text-xs text-[#A8BBD6]">· {activeHub.city}</span>
              </div>
              <p className="text-xs text-[#A8BBD6]">{activeHub.address}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Local Field Leads:</span>
                  <span className="text-[#F2F5F9] font-medium">{activeHub.repName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Operating Hours:</span>
                  <span className="text-[#00DF8F] font-mono">{activeHub.hours}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Languages:</span>
                  <span className="text-[#A8BBD6]">{activeHub.languages}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[11px]">Specialty:</span>
                  <span className="text-[#0D95FE]">{activeHub.specialty}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-2.5 px-4 rounded-lg bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-[#00325b] font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Chat with {activeHub.district.split(',')[0]} Desk</span>
              </button>

              <button
                onClick={handleCopyPhone}
                className="w-full py-2.5 px-4 rounded-lg border border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9] text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">phone_in_talk</span>
                <span>Call Dispatch Line</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
