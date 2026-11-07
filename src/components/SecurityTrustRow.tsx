'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityTrustRowProps {
  isLight?: boolean;
}

export const SecurityTrustRow: React.FC<SecurityTrustRowProps> = ({ isLight = false }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cbn' | 'ndic' | 'pcidss' | 'nibss'>('cbn');
  const [testDeposit, setTestDeposit] = useState<number>(500000);

  const trustBadges = [
    {
      id: 'cbn' as const,
      badge: 'OFFICIAL LICENSING',
      title: 'Licensed by CBN',
      subtitle: 'Central Bank of Nigeria Partner',
      headline: 'Partner Banking & Settlement Under CBN Framework',
      desc: 'All customer accounts, payment settlement rails, and custodial reserves are maintained with CBN-licensed partner commercial banks and microfinance institutions.',
      icon: 'account_balance',
      accentColor: '#00DF8F',
      statusText: 'Active Partner License',
      statLabel: '100% Segregated',
      statSub: 'In Custodial Bank Trust',
      textColor: isLight ? 'text-emerald-800' : 'text-[#00DF8F]',
      borderColor: isLight ? 'border-emerald-300' : 'border-[#00DF8F]/40',
      bgColor: isLight ? 'bg-emerald-50' : 'bg-[#00DF8F]/10',
      tagColor: isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-[#00DF8F]/15 text-[#00DF8F] border-[#00DF8F]/30',
    },
    {
      id: 'ndic' as const,
      badge: 'DEPOSIT PROTECTION',
      title: 'NDIC Insured',
      subtitle: 'Nigeria Deposit Insurance Corp.',
      headline: 'Statutory Deposit Protection & Vault Isolation',
      desc: 'Funds held in custodial trust for Axoora users are covered by the NDIC deposit insurance scheme up to maximum regulatory statutory thresholds.',
      icon: 'verified_user',
      accentColor: '#0D95FE',
      statusText: 'Statutory Coverage',
      statLabel: '₦5,000,000+',
      statSub: 'Insured per Depositor',
      textColor: isLight ? 'text-blue-800' : 'text-[#0D95FE]',
      borderColor: isLight ? 'border-blue-300' : 'border-[#0D95FE]/40',
      bgColor: isLight ? 'bg-blue-50' : 'bg-[#0D95FE]/10',
      tagColor: isLight ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-[#0D95FE]/15 text-[#0D95FE] border-[#0D95FE]/30',
    },
    {
      id: 'pcidss' as const,
      badge: 'SECURITY STANDARD',
      title: 'PCI-DSS Level 1',
      subtitle: 'Global Card Industry Standard',
      headline: 'Bank-Grade AES-256 Tokenization & Vaults',
      desc: 'Certified to the highest international security standard. All card data, tokenized virtual cards, and POS pins are protected with hardware security modules (HSM).',
      icon: 'lock',
      accentColor: '#F2A93B',
      statusText: 'Highest Global Level',
      statLabel: '256-Bit HSM',
      statSub: 'Hardware Encrypted',
      textColor: isLight ? 'text-amber-800' : 'text-[#F2A93B]',
      borderColor: isLight ? 'border-amber-300' : 'border-[#F2A93B]/40',
      bgColor: isLight ? 'bg-amber-50' : 'bg-[#F2A93B]/10',
      tagColor: isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30',
    },
    {
      id: 'nibss' as const,
      badge: 'INSTANT CLEARING',
      title: 'NIBSS Clearing Rail',
      subtitle: 'Nigeria Inter-Bank Settlement System',
      headline: 'Direct Switch for Sub-2s Card & NUBAN Transfers',
      desc: 'Direct core connection with NIBSS ensures card payments and inter-bank transfers clear in real time with automated failover and zero hung balances.',
      icon: 'bolt',
      accentColor: '#00DF8F',
      statusText: 'Direct Rail Active',
      statLabel: '1.48s Average',
      statSub: 'Settlement Latency',
      textColor: isLight ? 'text-emerald-800' : 'text-[#00DF8F]',
      borderColor: isLight ? 'border-emerald-300' : 'border-[#00DF8F]/40',
      bgColor: isLight ? 'bg-emerald-50' : 'bg-[#00DF8F]/10',
      tagColor: isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-[#00DF8F]/15 text-[#00DF8F] border-[#00DF8F]/30',
    },
  ];

  const currentBadge = trustBadges.find((b) => b.id === activeTab) || trustBadges[0];

  return (
    <section
      className={`relative w-full border-b px-4 sm:px-6 lg:px-8 py-10 select-none transition-colors overflow-hidden ${
        isLight
          ? 'border-slate-200 bg-slate-50/90 text-slate-900'
          : 'border-[#14294F] bg-[#01091C] text-[#F2F5F9]'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D95FE]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00DF8F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Top Header & Live Status Pill */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#14294F]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00DF8F]"></span>
              </span>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00DF8F]">
                REGULATORY VAULT &amp; INSTITUTIONAL COMPLIANCE
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Your money is shielded by Nigerian law and bank-grade standards
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setActiveModal('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer shadow-sm ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-[#0A1B3D] hover:bg-[#14294F] text-[#F2F5F9] border-[#14294F]'
              }`}
            >
              <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">verified</span>
              <span>View Full Regulatory Disclosures</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Badge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map((badge) => {
            const isSelected = activeTab === badge.id;
            return (
              <motion.div
                key={badge.id}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveTab(badge.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? isLight
                      ? 'bg-white border-[#0D95FE] shadow-lg ring-2 ring-[#0D95FE]/20'
                      : 'bg-[#0A1B3D] border-[#0D95FE] shadow-lg shadow-[#0D95FE]/10 ring-2 ring-[#0D95FE]/30'
                    : isLight
                    ? 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    : 'bg-[#0A1B3D]/70 hover:bg-[#0A1B3D] border-[#14294F] hover:border-[#1E3A6B]'
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00DF8F] via-[#0D95FE] to-[#F2A93B]" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform ${badge.bgColor} ${badge.textColor}`}
                      style={{ color: badge.accentColor }}
                    >
                      <span className="material-symbols-outlined text-[24px]">{badge.icon}</span>
                    </div>

                    <span
                      className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge.tagColor}`}
                    >
                      {badge.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-black tracking-tight transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {badge.title}
                  </h3>
                  <p className={`text-xs font-mono font-medium mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                    {badge.subtitle}
                  </p>

                  <p
                    className={`text-xs mt-2.5 leading-relaxed line-clamp-2 ${
                      isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                    }`}
                  >
                    {badge.desc}
                  </p>
                </div>

                {/* Key Stat & Status */}
                <div
                  className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${
                    isLight ? 'border-slate-100' : 'border-[#14294F]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm" style={{ color: badge.accentColor }}>
                      {badge.statLabel}
                    </span>
                    <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                      {badge.statSub}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-[11px]" style={{ color: badge.accentColor }}>
                    <span>{isSelected ? 'Inspecting' : 'Tap to Inspect'}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {isSelected ? 'expand_more' : 'chevron_right'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Interactive Inspector Panel (Creatively Engages the User) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBadge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all ${
              isLight
                ? 'bg-white border-slate-200 shadow-md'
                : 'bg-[#081738] border-[#14294F] shadow-xl'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details on Selected License */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentBadge.tagColor}`}
                  >
                    Verified: {currentBadge.statusText}
                  </span>
                  <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                    Registration: ABUJA, NIGERIA · RC: 1948201
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {currentBadge.headline}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                  {currentBadge.desc}
                </p>

                {/* Specific Proof Points depending on Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {currentBadge.id === 'cbn' && (
                    <>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">Custody Bank</span>
                        <span className="text-xs font-bold">Providus &amp; Zenith</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">Audit Cycle</span>
                        <span className="text-xs font-bold">Quarterly Statutory</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">Partner License</span>
                        <span className="text-xs font-bold">Commercial &amp; PSSP</span>
                      </div>
                    </>
                  )}

                  {currentBadge.id === 'ndic' && (
                    <>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#0D95FE] block font-bold">Coverage Cap</span>
                        <span className="text-xs font-bold">₦5,000,000 / Account</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#0D95FE] block font-bold">Surplus Funds</span>
                        <span className="text-xs font-bold">100% Segregated</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#0D95FE] block font-bold">Claim Guarantee</span>
                        <span className="text-xs font-bold">Federal Statutory</span>
                      </div>
                    </>
                  )}

                  {currentBadge.id === 'pcidss' && (
                    <>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#F2A93B] block font-bold">Tokenization</span>
                        <span className="text-xs font-bold">Dynamic Rolling CVV</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#F2A93B] block font-bold">Data Storage</span>
                        <span className="text-xs font-bold">Zero Card Raw PAN</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#F2A93B] block font-bold">Encryption Pipe</span>
                        <span className="text-xs font-bold">TLS 1.3 + HSM</span>
                      </div>
                    </>
                  )}

                  {currentBadge.id === 'nibss' && (
                    <>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#00DF8F] block font-bold'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">NIP Switch Speed</span>
                        <span className="text-xs font-bold">&lt; 2.0s Instant</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">Settlement Window</span>
                        <span className="text-xs font-bold">Real-Time Direct</span>
                      </div>
                      <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                        <span className="text-[10px] font-mono uppercase text-[#00DF8F] block font-bold">Switch Redundancy</span>
                        <span className="text-xs font-bold">Dual-Rail Active</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Creative Interactive Simulation / Protection Calculator Widget */}
              <div className="lg:col-span-5">
                <div
                  className={`p-6 rounded-2xl border-2 flex flex-col gap-4 ${
                    isLight ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-[#020F2E] border-[#14294F]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#0D95FE]">
                      🛡️ Deposit Protection Simulator
                    </span>
                    <span className="text-[10px] font-mono text-[#00DF8F] px-2 py-0.5 rounded-full bg-[#00DF8F]/15">
                      LIVE CHECK
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-[#A8BBD6]'}`}>
                      Test Your Account Balance:
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-mono">₦</span>
                      <input
                        type="range"
                        min="50000"
                        max="10000000"
                        step="50000"
                        value={testDeposit}
                        onChange={(e) => setTestDeposit(Number(e.target.value))}
                        className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0D95FE]"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-base font-extrabold text-[#0D95FE]">
                        ₦{testDeposit.toLocaleString()}
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        Max test: ₦10M
                      </span>
                    </div>
                  </div>

                  {/* Protection Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-[#14294F] text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>NDIC Statutory Insurance:</span>
                      <span className="font-bold text-[#00DF8F]">
                        ₦{Math.min(testDeposit, 5000000).toLocaleString()} (100% Covered)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Custodial Segregated Trust:</span>
                      <span className="font-bold text-[#0D95FE]">
                        ₦{testDeposit.toLocaleString()} (Guaranteed)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>Capital Risk Exposure:</span>
                      <span className="font-extrabold text-[#00DF8F]">
                        ₦0.00 (Zero Exposure)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal('overview')}
                    className="w-full py-2.5 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs transition-all cursor-pointer shadow-sm mt-1"
                  >
                    View Official Regulatory Certification
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Regulatory Details Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-2xl rounded-3xl border-2 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9]'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#14294F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]">
                    <span className="material-symbols-outlined text-[22px]">policy</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      Regulatory Architecture &amp; Licensing Framework
                    </h3>
                    <p className="text-xs text-[#00DF8F] font-mono">
                      Institutional Protection for Axoora Clients
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-[#14294F] hover:bg-[#1E3A6B] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                  <h4 className="font-bold text-[#00DF8F] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    Licensed by the Central Bank of Nigeria (CBN)
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#F2F5F9]'}`}>
                    Axoora Financial Technologies Limited operates in full compliance with Nigerian banking regulations. All customer accounts, payment settlement rails, and custodial reserves are maintained with CBN-licensed partner commercial banks and licensed microfinance banking institutions.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                  <h4 className="font-bold text-[#0D95FE] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    Nigeria Deposit Insurance Corporation (NDIC) Insured
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#F2F5F9]'}`}>
                    Funds held in custodial trust for Axoora users are covered by the NDIC deposit insurance framework up to the maximum regulatory thresholds applicable to designated custodial deposit institutions in Nigeria.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                  <h4 className="font-bold text-[#F2A93B] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Payment Card Industry Data Security Standard (PCI-DSS) Level 1
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#F2F5F9]'}`}>
                    All debit card tokenization, rolling CVV issuance, and POS transaction communications comply with PCI-DSS Level 1 specifications, utilizing hardware security modules (HSM) and TLS 1.3 cryptographic transport.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'}`}>
                  <h4 className="font-bold text-[#00DF8F] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    Zero-Interest (No Riba) Islamic Shariah Governance
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#F2F5F9]'}`}>
                    Our Save and Earn product and Paycircle rotational thrift pools are strictly governed by Islamic financial ethics. Axoora never lends customer savings out for interest or charges usurious penalties.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-[#14294F] flex items-center justify-between text-xs">
                <span className={`font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                  ABUJA, NIGERIA · RC: 1948201
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-bold transition-all cursor-pointer"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
