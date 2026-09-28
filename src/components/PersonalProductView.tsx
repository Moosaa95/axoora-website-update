'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface PersonalProductViewProps {
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

export const PersonalProductView: React.FC<PersonalProductViewProps> = ({
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-12 pb-16 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00DF8F]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto flex flex-col items-center text-center gap-5 relative z-10"
        >
          <motion.div
            variants={itemFadeUp}
            className={`inline-flex items-center gap-2 py-1 px-3.5 rounded-full border ${
              isLight
                ? 'bg-white border-[#E2E8F0] shadow-sm'
                : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isLight ? 'bg-[#00875A]' : 'bg-[#00DF8F]'}`}></span>
            <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>
              Product 01 // For the Person
            </span>
          </motion.div>

          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight"
          >
            Axoora AI — for the person
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg text-[#A8BBD6] max-w-2xl leading-relaxed"
          >
            Personal banking with helpful intelligence in the background. Send money, pay bills, hold dual-currency virtual cards, save with zero interest, and enjoy everyday lifestyle experiences.
          </motion.p>

          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => onOpenWaitlist('personal')}
              className="px-7 py-3 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-sm sm:text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer"
            >
              Join the Personal Waitlist
            </button>
            <button
              onClick={onOpenWhatsApp}
              className={`px-6 py-3 rounded-full border font-semibold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'bg-white border-[#00875A] text-[#00875A] hover:bg-[#00875A] hover:text-white shadow-sm'
                  : 'bg-[#0A1B3D] border-[#00DF8F] text-[#00DF8F] hover:bg-[#00DF8F] hover:text-[#003825]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Bank with Axoora AI on WhatsApp</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Feature Pillars matching the Brief exactly */}
      <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto flex flex-col gap-16">
        {/* 1. Transfers & Dual Virtual Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={itemFadeUp} className="flex flex-col gap-4">
            <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>
              TRANSFERS &amp; VIRTUAL CARDS
            </span>
            <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
              Send money, pay bills, and hold dual-currency cards.
            </h2>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              Experience instant transfers across Nigerian banks without hidden fees. Pay utility bills and buy airtime and data bundles directly from your account or through WhatsApp AI.
            </p>
            <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2">
              <span className="text-xs font-bold text-[#F2F5F9] flex items-center gap-1.5">
                <span className={`material-symbols-outlined text-[18px] ${isLight ? 'text-[#006FDB]' : 'text-[#0D95FE]'}`}>credit_card</span>
                Virtual Naira Card &amp; Virtual Dollar Card
              </span>
              <p className="text-xs text-[#A8BBD6] leading-relaxed">
                The virtual Dollar card is for paying for things priced in dollars from Nigeria (such as software tools, hosting, and international checkouts). <strong>It is not a United States bank account</strong>, but a dedicated payment tool with dynamic rolling CVV protection.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono ${isLight ? 'text-[#006FDB]' : 'text-[#0D95FE]'}`}>CARD SECURITY SPECIFICATION</span>
              <span className={`text-[10px] font-mono ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>ACTIVE</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#A8BBD6]">Naira Card (NGN):</span>
                <span className="text-[#F2F5F9]">Domestic checkouts &amp; POS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8BBD6]">Dollar Card (USD):</span>
                <span className="text-[#F2F5F9]">International online subscriptions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8BBD6]">CVV Refresh:</span>
                <span className={`${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>Dynamic rolling every 60 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8BBD6]">Freeze &amp; Limits:</span>
                <span className="text-[#F2F5F9]">Instant in-app / WhatsApp toggle</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. Save and Earn (Islamic-Compliant) & Paycircle (Ajo) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-[#14294F]"
        >
          <motion.div
            variants={cardVariant}
            className="order-2 md:order-1 p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>SAVINGS ARCHITECTURE</span>
              <span className="text-[10px] font-mono text-[#A8BBD6]">ETHICAL &bull; ISLAMIC</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                <h4 className="text-xs font-bold text-[#F2F5F9] mb-1">Save and Earn</h4>
                <p className="text-xs text-[#A8BBD6] leading-relaxed">
                  Putting money aside and receiving a return that is strictly Islamic-compliant — no interest, no riba. Built on real trade and asset backing.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                <h4 className="text-xs font-bold text-[#F2F5F9] mb-1">Paycircle (Ajo Inside the App)</h4>
                <p className="text-xs text-[#A8BBD6] leading-relaxed">
                  A trusted group contributes on a set schedule and each member takes a turn. Paycircle is not a loan — it is communal thrift with smart escrow protection.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemFadeUp} className="order-1 md:order-2 flex flex-col gap-4">
            <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>
              ETHICAL SAVINGS &amp; THRIFT
            </span>
            <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
              Save and Earn &amp; Paycircle.
            </h2>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              We believe financial growth should never force you to compromise your principles or participate in exploitative debt cycles.
            </p>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              With <strong>Save and Earn</strong>, you set funds aside knowing that every return is halal, asset-backed, and free of riba. With <strong>Paycircle</strong>, your traditional Ajo circle gains transparency, automated reminders, and licensed escrow custody so no member is stranded.
            </p>
          </motion.div>
        </motion.div>

        {/* 3. Axoora Points & Lifestyle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-[#14294F]"
        >
          <motion.div variants={itemFadeUp} className="flex flex-col gap-4">
            <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isLight ? 'text-[#006FDB]' : 'text-[#0D95FE]'}`}>
              REWARDS &amp; LIFESTYLE
            </span>
            <h2 className="text-3xl font-extrabold text-[#F2F5F9]">
              Axoora Points &amp; Lifestyle experiences.
            </h2>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              <strong>Axoora Points</strong> are earned as you spend, refer, and transact. Points are a thank-you for using the house. They are not interest and they are not Save and Earn. Until we publish redemption catalogs, you simply earn them on every qualifying activity.
            </p>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              <strong>Lifestyle services:</strong> Inclusion does not stop at a balance. Book eSIM data bundles, domestic flights, hotels, table reservations, and food deliveries directly from your wallet balance.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#A8BBD6] italic">
              <span className={`material-symbols-outlined text-[16px] ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>info</span>
              <span>We book these things from your wallet. We do not pretend to own hotels or airlines.</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariant}
            className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3"
          >
            <span className={`text-xs font-mono uppercase ${isLight ? 'text-[#006FDB]' : 'text-[#0D95FE]'}`}>LIFESTYLE CATALOGUE (LAUNCH ROADMAP)</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'eSIM Travel Data', status: 'At Launch' },
                { name: 'Domestic Flight Booking', status: 'Coming Soon' },
                { name: 'Hotel Reservations', status: 'Coming Soon' },
                { name: 'Food Ordering', status: 'Coming Soon' },
                { name: 'Event Ticketing', status: 'Coming Soon' },
                { name: 'Utility & Telco Data', status: 'At Launch' },
              ].map((item) => (
                <div key={item.name} className="p-2.5 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col justify-between">
                  <span className="font-medium text-[#F2F5F9]">{item.name}</span>
                  <span className={`text-[10px] font-mono mt-1 ${item.status === 'At Launch' ? (isLight ? 'text-[#00875A]' : 'text-[#00DF8F]') : 'text-[#A8BBD6]'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 4. What AI Actually Means at Axoora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[22px] ${isLight ? 'text-[#00875A]' : 'text-[#00DF8F]'}`}>smart_toy</span>
            <h3 className="text-xl font-bold text-[#F2F5F9]">
              What "AI" means at Axoora
            </h3>
          </div>
          <p className="text-sm text-[#A8BBD6] leading-relaxed">
            When our website speaks about AI, it means a helpful assistant in the app and on WhatsApp — providing friendly payment reminders, managing savings pots, answering straightforward banking queries, and carrying out the banking steps you ask for.
          </p>
          <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] text-xs text-[#F2F5F9] font-medium leading-relaxed">
            <strong>Clear Boundary:</strong> Axoora AI does not invest for you and it does not approve financing on its own. All transactions require your explicit confirmation.
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 rounded-3xl cta-gradient-banner bg-gradient-to-r from-[#0A1B3D] via-[#020F2E] to-[#0A1B3D] border-2 border-[#00DF8F]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-[#F2F5F9]">Ready to experience Axoora AI?</h3>
            <p className="text-sm text-[#A8BBD6]">Join the waitlist to receive access during our phased rollout.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenWaitlist('personal')}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                isLight
                  ? 'bg-[#00875A] text-white hover:bg-[#006FDB]'
                  : 'bg-[#00DF8F] text-[#003825] hover:bg-[#0D95FE] hover:text-[#00325b]'
              }`}
            >
              Join the Waitlist
            </button>
            <button
              onClick={onOpenWhatsApp}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                isLight
                  ? 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] border border-[#CBD5E1]'
                  : 'bg-[#14294F] text-[#F2F5F9] hover:bg-[#1E3A6B]'
              }`}
            >
              WhatsApp Banking
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
