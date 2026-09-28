'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';

interface PosProductViewProps {
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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const PosProductView: React.FC<PosProductViewProps> = ({
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'agent' | 'aggregator'>('terminal');

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-12 pb-16 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl pointer-events-none" />

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
            <span className="h-2 w-2 rounded-full bg-[#F2A93B]"></span>
            <span className="font-mono text-xs text-[#F2A93B] uppercase tracking-wider font-semibold">
              Product 03 // Agency Banking &amp; Hardware
            </span>
          </motion.div>

          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight"
          >
            POS and Aggregator — for agents and networks
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg text-[#A8BBD6] max-w-2xl leading-relaxed"
          >
            Reliable dual-network hardware, simple onboarding for individual agents, and robust tools for enterprise aggregators managing regional agent clusters.
          </motion.p>

          {/* Three Separate Conversation Tab Switcher */}
          <motion.div
            variants={itemFadeUp}
            className="mt-4 p-1.5 rounded-full bg-[#0A1B3D] border-2 border-[#14294F] flex flex-wrap items-center justify-center gap-2 relative"
          >
            {[
              { id: 'terminal', label: '1. Want a Terminal' },
              { id: 'agent', label: '2. Become an Agent' },
              { id: 'aggregator', label: '3. For Aggregators' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    isActive ? 'text-[#000]' : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePosTab"
                      className="absolute inset-0 rounded-full bg-[#F2A93B]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Main Tab Content */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto min-h-[460px]">
        <AnimatePresence mode="wait">
          {/* TAB 1: Want a Terminal */}
          {activeTab === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs text-[#F2A93B] uppercase tracking-wider font-bold">
                    HARDWARE EXCELLENCE
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
                    Engineered for Nigerian market realities.
                  </h2>
                  <p className="text-sm text-[#A8BBD6] leading-relaxed">
                    Terminal failure means lost customers. Axoora terminals are built with dual-eSIM failover that switches seamlessly between MTN, Airtel, Glo, and 9mobile, coupled with heavy-duty batteries capable of running throughout power outages.
                  </p>

                  <div className="flex flex-col gap-2.5 pt-2 text-xs text-[#F2F5F9]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">sim_card</span>
                      <span>Dual-SIM active redundancy across top Nigerian carriers.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">battery_charging_full</span>
                      <span>Long-life lithium battery (up to 72 hours active standby).</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">print</span>
                      <span>High-speed thermal receipt printer with drop-in roll loading.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">sync_alt</span>
                      <span>Instant NIP settlement to your Axoora Business account.</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4 text-center items-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#020F2E] border border-[#14294F] flex items-center justify-center text-[#F2A93B]">
                    <span className="material-symbols-outlined text-[40px]">point_of_sale</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">Request an Axoora Terminal</h3>
                  <p className="text-xs text-[#A8BBD6] leading-relaxed">
                    Deploy a terminal at your shop counter, kiosk, or pharmacy. Reaching us on WhatsApp is the fastest way to request hardware.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                    <button
                      onClick={onOpenWhatsApp}
                      className="flex-1 py-3 rounded-full bg-[#00DF8F] text-[#003825] font-bold text-xs hover:bg-[#0D95FE] hover:text-[#00325b] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Request on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => onOpenWaitlist('pos-agent')}
                      className="flex-1 py-3 rounded-full bg-[#14294F] text-[#F2F5F9] font-bold text-xs hover:bg-[#1E3A6B] transition-colors cursor-pointer"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Become an Agent */}
          {activeTab === 'agent' && (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-5">
                <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-bold">
                  AGENT ONBOARDING PATH
                </span>
                <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
                  Become an Axoora Banking Agent
                </h2>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Bring banking services to your neighborhood, campus, or rural cluster. As an Axoora agent, you provide deposits, withdrawals, bill payments, and Paycircle facilitation for your community.
                </p>

                {/* Requirement Cards */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
                >
                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                    <span className="text-xs font-bold text-[#F2F5F9] block mb-1">1. Verified Identity</span>
                    <p className="text-xs text-[#A8BBD6]">Government-issued ID and passport photograph for CBN agent compliance.</p>
                  </motion.div>
                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                    <span className="text-xs font-bold text-[#F2F5F9] block mb-1">2. Physical Location</span>
                    <p className="text-xs text-[#A8BBD6]">A verifiable storefront, kiosk, or dedicated counter space in your locality.</p>
                  </motion.div>
                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                    <span className="text-xs font-bold text-[#F2F5F9] block mb-1">3. Operating Float</span>
                    <p className="text-xs text-[#A8BBD6]">Initial working capital to service cash-in and cash-out requests safely.</p>
                  </motion.div>
                </motion.div>

                {/* Honest Earnings Policy (Brief adherence) */}
                <div className="p-4 rounded-2xl bg-[#020F2E] border border-amber-500/30 text-xs text-[#A8BBD6] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-amber-400 text-[18px] shrink-0">info</span>
                  <span>
                    <strong>Transparent Commission Policy:</strong> We do not make speculative earnings promises on our website. Your commission schedule is agreed in writing during onboarding based on your volume and tier.
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onOpenWhatsApp}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#00DF8F] text-[#003825] font-bold text-xs sm:text-sm hover:bg-[#0D95FE] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Apply via Agent WhatsApp Desk</span>
                  </button>
                  <button
                    onClick={() => onOpenWaitlist('pos-agent')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#14294F] text-[#F2F5F9] font-semibold text-xs sm:text-sm hover:bg-[#1E3A6B] transition-colors cursor-pointer"
                  >
                    Join Agent Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: For Aggregators */}
          {activeTab === 'aggregator' && (
            <motion.div
              key="aggregator"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-5">
                <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-bold">
                  ENTERPRISE AGGREGATOR INFRASTRUCTURE
                </span>
                <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
                  Run and scale your agent network
                </h2>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  For established business leaders and financial cooperatives managing fleets of 10 to 500+ agents. Axoora provides centralized liquidity float management, pooled commissions, terminal health monitoring, and dedicated relationship managers.
                </p>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                >
                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#F2F5F9]">Centralized Fleet Management</span>
                    <p className="text-xs text-[#A8BBD6]">Monitor live transaction volume, battery status, and dispute rates across all assigned field terminals.</p>
                  </motion.div>

                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#F2F5F9]">Dynamic Float Allocation</span>
                    <p className="text-xs text-[#A8BBD6]">Distribute liquidity between high-velocity agents and weekend market hubs instantly with automated sweep rules.</p>
                  </motion.div>

                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#F2F5F9]">Tiered Override Commissions</span>
                    <p className="text-xs text-[#A8BBD6]">Receive transparent aggregator overrides credited in real time into your primary corporate account.</p>
                  </motion.div>

                  <motion.div variants={cardVariant} className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-[#F2F5F9]">Dedicated Key Account Manager</span>
                    <p className="text-xs text-[#A8BBD6]">Direct line to our Abuja headquarters operations room for dispute escalations and hardware swaps.</p>
                  </motion.div>
                </motion.div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onOpenWhatsApp}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-xs sm:text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Connect with Aggregator Desk (WhatsApp)</span>
                  </button>
                  <button
                    onClick={() => onOpenWaitlist('aggregator')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#14294F] text-[#F2F5F9] font-semibold text-xs sm:text-sm hover:bg-[#1E3A6B] transition-colors cursor-pointer"
                  >
                    Register Aggregator Interest
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
