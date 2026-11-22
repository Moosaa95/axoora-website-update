'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons } from './home/shared';

interface FeeRow {
  what: string;
  cost: string;
}

const feeData: FeeRow[] = [
  { what: 'Transfer to another Nigerian bank', cost: 'To be confirmed' },
  { what: 'Transfer between Axoora accounts', cost: 'To be confirmed' },
  { what: 'Airtime and data', cost: 'To be confirmed' },
  { what: 'Electricity, TV and water', cost: 'To be confirmed' },
  { what: 'Naira card, to issue', cost: 'To be confirmed' },
  { what: 'Naira card, monthly', cost: 'To be confirmed' },
  { what: 'Dollar card, to issue', cost: 'To be confirmed' },
  { what: 'Dollar card, monthly', cost: 'To be confirmed' },
  { what: 'Savings plan, to open', cost: 'To be confirmed' },
  { what: 'Ajo circle, to run', cost: 'To be confirmed' },
  { what: 'A transfer that fails or is reversed', cost: 'To be confirmed' },
];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 'first',
    question: 'Will I ever be charged without seeing it first?',
    answer:
      'No. Any fee appears on the confirm screen, next to the amount, before you approve the payment.',
  },
  {
    id: 'fails',
    question: 'What happens to the fee if a transfer fails?',
    answer:
      'A failure tells you whether you were charged. If you were, it comes back with the money.',
  },
  {
    id: 'dollar',
    question: 'Is the Dollar card priced in dollars?',
    answer:
      'The card spends from its own dollar balance. How it is priced is still to be confirmed.',
  },
];

export const FeesProductView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  // Keep all FAQs open by default matching Figma Image 10, with toggle capability
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({
    first: true,
    fails: true,
    dollar: true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · What It Costs. (Image 6)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-8">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-12 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block mb-3">
            Fees
          </span>

          <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white! mb-6">
            What It Costs.
          </h1>

          <p className="text-[18px] sm:text-[20px] text-[#d6ebff] font-normal leading-[1.6] max-w-2xl mx-auto">
            One table, in plain words. You see any fee on the confirm screen before you agree to it.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: DISCLAIMER NOTE (Image 7)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-2 pb-8">
        <div className="bg-[#fff8ed] dark:bg-amber-950/30 border border-[#fde4c4] dark:border-amber-800/40 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-[#b45309] dark:text-amber-400 shrink-0" />
          <p className="text-[14.5px] sm:text-[15px] font-medium text-[#78350f] dark:text-amber-200 leading-snug">
            No fee schedule has been set. Every figure below is a placeholder until Finance confirms it.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: EVERYDAY FEES TABLE (Images 8 & 9)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-2 pb-14">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Everyday Fees
        </h2>

        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[24px] p-6 sm:p-10 shadow-xs overflow-hidden">
          {/* Header Row */}
          <div className="flex justify-between items-center pb-4 border-b border-[#161c22]/15 dark:border-slate-700 text-xs uppercase tracking-wider font-bold text-[#161c22] dark:text-white">
            <span>What</span>
            <span>Cost</span>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#edf1f7] dark:divide-slate-800/80">
            {feeData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-4.5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-1 -mx-1 rounded-lg"
              >
                <span className="text-[15px] sm:text-[16px] text-[#161c22] dark:text-slate-200 font-medium">
                  {item.what}
                </span>
                <span className="text-[15px] sm:text-[16px] text-[#161c22] dark:text-white font-bold">
                  {item.cost}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: QUESTIONS ABOUT MONEY (Image 10)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-2 pb-16">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Questions About Money
        </h2>

        <div className="flex flex-col gap-4">
          {faqData.map((faq) => {
            const isOpen = openFaqs[faq.id] ?? false;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-6 sm:p-7 shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                >
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#161c22] dark:text-white group-hover:text-[#0976da] transition">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#8492a6] shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300 mt-3 pt-1">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: CLOSING CTA · No Surprises at the Till (Image 11)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            No Surprises at the Till.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Every fee on the screen, before you agree.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={openDownloadApp ?? (() => {})}
            onWhatsApp={openWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};

