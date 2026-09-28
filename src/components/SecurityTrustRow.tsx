import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityTrustRowProps {
  isLight?: boolean;
}

export const SecurityTrustRow: React.FC<SecurityTrustRowProps> = ({ isLight = false }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const trustBadges = [
    {
      id: 'cbn',
      badge: 'REGULATORY COMPLIANCE',
      title: 'Licensed by CBN',
      subtitle: 'Central Bank of Nigeria',
      desc: 'Banking services, clearing, and custodial funds administered in strict compliance with Central Bank of Nigeria partner banking guidelines.',
      icon: 'account_balance',
      accentColor: '#00DF8F',
      textColor: isLight ? 'text-[#00875A]' : 'text-[#00DF8F]',
      borderColor: isLight ? 'border-[#00875A]/30' : 'border-[#00DF8F]/40',
      bgColor: isLight ? 'bg-[#E6F8F0]' : 'bg-[#00DF8F]/10',
    },
    {
      id: 'ndic',
      badge: 'DEPOSIT PROTECTION',
      title: 'NDIC Insured',
      subtitle: 'Deposit Insurance Corp.',
      desc: 'Every customer account is protected and insured by the Nigeria Deposit Insurance Corporation (NDIC) up to statutory regulatory limits.',
      icon: 'verified_user',
      accentColor: '#0D95FE',
      textColor: isLight ? 'text-[#006FDB]' : 'text-[#0D95FE]',
      borderColor: isLight ? 'border-[#006FDB]/30' : 'border-[#0D95FE]/40',
      bgColor: isLight ? 'bg-[#EBF5FF]' : 'bg-[#0D95FE]/10',
    },
    {
      id: 'pcidss',
      badge: 'PAYMENT INTEGRITY',
      title: 'PCI-DSS Level 1',
      subtitle: 'Global Security Standard',
      desc: 'Certified to the highest international security standard for processing, storing, and transmitting payment card data with end-to-end tokenization.',
      icon: 'lock',
      accentColor: '#F2A93B',
      textColor: isLight ? 'text-[#B45309]' : 'text-[#F2A93B]',
      borderColor: isLight ? 'border-[#B45309]/30' : 'border-[#F2A93B]/40',
      bgColor: isLight ? 'bg-[#FEF3C7]' : 'bg-[#F2A93B]/10',
    },
    {
      id: 'nibss',
      badge: 'INSTANT SETTLEMENT',
      title: 'NIBSS Clearing Rail',
      subtitle: 'Central Bank Switching',
      desc: 'Direct integration with Nigeria Inter-Bank Settlement System for sub-3-second instant payments and real-time transaction reconciliation.',
      icon: 'bolt',
      accentColor: '#00DF8F',
      textColor: isLight ? 'text-[#00875A]' : 'text-[#00DF8F]',
      borderColor: isLight ? 'border-[#00875A]/30' : 'border-[#00DF8F]/40',
      bgColor: isLight ? 'bg-[#E6F8F0]' : 'bg-[#00DF8F]/10',
    },
  ];

  return (
    <section className="relative w-full border-b border-[#14294F] bg-[#01091C] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Section Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#14294F]/80">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00DF8F]"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#F2F5F9] uppercase tracking-wider">
                Institutional Security &amp; Licensing
              </span>
              <span className="text-[#14294F] hidden sm:inline">·</span>
              <span className="text-xs text-[#A8BBD6] hidden sm:inline">
                Enterprise-grade assurance for individuals, shops, and POS fleets
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveModal('overview')}
            className="self-start sm:self-auto text-xs font-semibold text-[#0D95FE] hover:text-[#00DF8F] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Regulatory Disclosures</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

        {/* 4 Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModal(badge.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-[#E2E8F0] hover:border-[#00875A] shadow-sm hover:shadow-md'
                  : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#0D95FE] hover:bg-[#0E2452]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${badge.bgColor} ${badge.textColor}`}>
                    <span className="material-symbols-outlined text-[22px]">{badge.icon}</span>
                  </div>
                  <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.borderColor} ${badge.textColor} ${badge.bgColor}`}>
                    {badge.badge}
                  </span>
                </div>

                <h3 className={`text-base font-extrabold tracking-tight transition-colors ${
                  isLight ? 'text-[#0F172A] group-hover:text-[#00875A]' : 'text-[#F2F5F9] group-hover:text-[#00DF8F]'
                }`}>
                  {badge.title}
                </h3>
                <p className="text-[11px] font-mono text-[#A8BBD6] font-medium mt-0.5">
                  {badge.subtitle}
                </p>

                <p className="text-xs text-[#A8BBD6] mt-2 leading-relaxed line-clamp-2">
                  {badge.desc}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-[#14294F]/60 flex items-center justify-between text-[11px] font-mono">
                <span className={`font-semibold ${badge.textColor}`}>VERIFIED PARTNER</span>
                <span className="text-[#A8BBD6] group-hover:translate-x-1 transition-transform">
                  Details →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Human Risk & Compliance Leadership Bar (High-Trust Assurance) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071738] border border-[#14294F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              <img
                src="/team/cro.jpg"
                alt="Amina Bello - Chief Risk & Compliance Officer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0D95FE]"
              />
              <img
                src="/team/sharia.jpg"
                alt="Dr. Ibrahim Danbatta - Head of Sharia Compliance"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00DF8F]"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Supervised by Accredited Nigerian Compliance Officers</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
              </div>
              <span className="text-[11px] text-[#A8BBD6]">
                Led by Amina Bello (CAMS/Risk) &amp; Dr. Ibrahim Danbatta (AAOIFI Ethical Advisory). Every kobo segregated in NDIC-insured custodial partner vaults.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs text-[#00DF8F] font-bold">100% REGULATORY AUDIT PASS</span>
          </div>
        </div>
      </div>

      {/* Regulatory Details Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01091C]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#14294F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]">
                    <span className="material-symbols-outlined text-[22px]">policy</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F2F5F9]">
                      Regulatory Architecture &amp; Licensing Framework
                    </h3>
                    <p className="text-xs text-[#00DF8F] font-mono">
                      Institutional Protection for Axoora Clients
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-9 h-9 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#A8BBD6] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <h4 className="font-bold text-[#00DF8F] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    Licensed by the Central Bank of Nigeria (CBN)
                  </h4>
                  <p className="text-xs text-[#F2F5F9] leading-relaxed">
                    Axoora Financial Technologies Limited operates in full compliance with Nigerian banking regulations. All customer accounts, payment settlement rails, and custodial reserves are maintained with CBN-licensed partner commercial banks and licensed microfinance banking institutions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <h4 className="font-bold text-[#0D95FE] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    Nigeria Deposit Insurance Corporation (NDIC) Insured
                  </h4>
                  <p className="text-xs text-[#F2F5F9] leading-relaxed">
                    Funds held in custodial trust for Axoora users are covered by the NDIC deposit insurance framework up to the maximum regulatory thresholds applicable to designated custodial deposit institutions in Nigeria.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <h4 className="font-bold text-[#F2A93B] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Payment Card Industry Data Security Standard (PCI-DSS) Level 1
                  </h4>
                  <p className="text-xs text-[#F2F5F9] leading-relaxed">
                    All debit card tokenization, rolling CVV issuance, and POS transaction communications comply with PCI-DSS Level 1 specifications, utilizing hardware security modules (HSM) and TLS 1.3 cryptographic transport.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <h4 className="font-bold text-[#00DF8F] text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    Zero-Interest (No Riba) Islamic Shariah Governance
                  </h4>
                  <p className="text-xs text-[#F2F5F9] leading-relaxed">
                    Our Save and Earn product and Paycircle rotational thrift pools are strictly governed by Islamic financial ethics. Axoora never lends customer savings out for interest or charges usurious penalties.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#14294F] flex items-center justify-between text-xs">
                <span className="text-[#A8BBD6] font-mono text-[11px]">
                  ABUJA, NIGERIA · RC: 1948201
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold transition-all cursor-pointer"
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
