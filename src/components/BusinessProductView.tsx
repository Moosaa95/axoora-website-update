'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ScreenType } from '../types';

interface BusinessProductViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const BusinessProductView: React.FC<BusinessProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-12 pb-16 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0D95FE]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto flex flex-col items-center text-center gap-5 relative z-10"
        >
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]"
          >
            <span className="h-2 w-2 rounded-full bg-[#0D95FE]"></span>
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              Product 02 // For the Shop
            </span>
          </motion.div>

          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight"
          >
            Axoora Business — for the shop
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg text-[#A8BBD6] max-w-2xl leading-relaxed"
          >
            A standard Nigerian business account built to give your counter dignity and clarity. Receive payments in your company name, disburse to suppliers, and access interest-free commercial financing.
          </motion.p>

          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => onOpenWaitlist('business')}
              className="px-7 py-3 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-sm sm:text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer"
            >
              Join Business Waitlist
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3 rounded-full bg-[#0A1B3D] border border-[#0D95FE] text-[#0D95FE] hover:bg-[#0D95FE] hover:text-[#00325b] font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Speak to Business Desk</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Sections */}
      <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto flex flex-col gap-16">
        {/* Core Capabilities */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={itemFadeUp} className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-bold">
              THE STANDARD BUSINESS ACCOUNT
            </span>
            <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
              Account in your business name.
            </h2>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              Operate with the professionalism your enterprise deserves. Receive customer payments directly into a dedicated NUBAN registered to your business, pay suppliers and staff cleanly, and access instant, exportable statements for tax and audit compliance.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {[
                'Account in registered corporate or enterprise name.',
                'Direct transfers settlement via CBN NIBSS rails.',
                'Disburse to suppliers and payroll with batch payments.',
                'Pay electricity, taxes, and commercial utility bills.',
                'Transparent transaction history with real-time audit trails.',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#F2F5F9]">
                  <span className="material-symbols-outlined text-[#0D95FE] text-[16px]">check</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Business Card Showcase */}
          <motion.div
            variants={cardVariant}
            className="p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#0D95FE]">CORPORATE EXPENSE CARD</span>
              <span className="text-[10px] font-mono text-[#00DF8F]">BUSINESS RAIL</span>
            </div>

            {/* Visual Business Card */}
            <motion.div
              whileHover={{ y: -4, rotateY: 3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full aspect-[1.586] rounded-2xl p-5 bg-gradient-to-br from-[#082846] via-[#03152B] to-[#010A14] border-2 border-[#0D95FE]/50 flex flex-col justify-between shadow-xl cursor-pointer luxury-debit-card select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-[#F2F5F9]">Axoora Business</span>
                <span className="text-[10px] font-mono text-[#0D95FE] px-2 py-0.5 rounded-full bg-[#14294F]">
                  CORPORATE
                </span>
              </div>

              <div className="my-auto font-mono text-sm sm:text-base font-bold text-[#F2F5F9] tracking-wider">
                5061 •••• •••• 8291
              </div>

              <div className="flex items-end justify-between font-mono text-xs">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-[#A8BBD6] block">
                    Enterprise
                  </span>
                  <span className="font-bold text-[#F2F5F9]">BALOGUN TRADING ENTERPRISE</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] uppercase tracking-wider text-[#A8BBD6] block">
                    Type
                  </span>
                  <span className="font-bold text-[#0D95FE]">DUAL NGN/USD</span>
                </div>
              </div>
            </motion.div>

            <p className="text-xs text-[#A8BBD6] leading-relaxed">
              Equip your procurement managers and field drivers with segregated corporate cards featuring customizable merchant category restrictions and real-time spending caps.
            </p>
          </motion.div>
        </motion.div>

        {/* Islamic-Compliant Business Financing (Strict adherence to brief) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-5"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-bold">
              ETHICAL CAPITAL // NO INTEREST &bull; NO RIBA
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F9]">
            Business financing built on Islamic principles
          </h3>

          <p className="text-sm text-[#A8BBD6] leading-relaxed max-w-3xl">
            After your business account has been actively used, you may apply for commercial financing structured under Islamic principles (such as cost-plus Murabaha inventory funding and shared-risk partnership). There is <strong>no interest</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2 max-w-2xl text-xs text-[#F2F5F9]">
            <div className="font-bold text-[#F2F5F9] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">verified</span>
              <span>Responsible Underwriting Standard:</span>
            </div>
            <p className="text-[#A8BBD6] leading-relaxed">
              Approval is based on real business activity and verified turnover. Approval is not automatic and not guaranteed. Axoora does not participate in instant cash, payday schemes, or unverified lending.
            </p>
          </div>
        </motion.div>

        {/* POS Hardware Callout Banner (Brief rule: "If they need a POS machine, send them to the POS page. Do not copy the whole terminal story onto the business page.") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-3xl bg-[#01091C] border-2 border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#F2A93B] shrink-0">
              <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F2F5F9]">Need a POS terminal on your counter?</h4>
              <p className="text-xs text-[#A8BBD6] mt-0.5">
                We provide dedicated, dual-network Android terminals for shop checkouts and agency desks.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('pos-agents')}
            className="px-5 py-2.5 rounded-full bg-[#14294F] hover:bg-[#F2A93B] text-[#F2F5F9] hover:text-[#000] font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            <span>Visit POS &amp; Aggregator Page</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </motion.div>
      </section>
    </div>
  );
};
