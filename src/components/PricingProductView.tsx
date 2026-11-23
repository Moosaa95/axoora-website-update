'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Receipt, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons } from './home/shared';

interface TransferFeeRow {
  what: string;
  cost: string;
}

const bulkTransferFees: TransferFeeRow[] = [
  { what: 'Per recipient in a batch', cost: 'To be confirmed' },
  { what: 'A batch that is cancelled before sending', cost: 'To be confirmed' },
  { what: 'A row that fails and is reversed', cost: 'To be confirmed' },
  { what: 'Monthly minimum, if any', cost: 'To be confirmed' },
  { what: 'Manual entry versus CSV upload', cost: 'To be confirmed' },
];

export const PricingProductView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Pricing · What a Run Costs.
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 text-white text-center shadow-[0_20px_50px_rgba(2,15,46,0.1)]"
        >
          <span className="text-[13px] font-bold leading-[17px] tracking-[0.04em] text-[#d6ebff] uppercase block">
            Pricing
          </span>

          <h1 className="mt-4 text-[42px] sm:text-[54px] lg:text-[64px] leading-[1.05] tracking-[-0.04em] font-bold text-white!">
            What a Run Costs.
          </h1>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-[1.6] text-[#d6ebff] max-w-[620px] mx-auto">
            Bulk transfers are priced per recipient, not per batch. The figures are not set yet.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Bulk Transfers Table
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-[#161c22] dark:text-[#f2f5f9] mb-6">
            Bulk Transfers
          </h2>

          <div
            className={`rounded-[24px] p-6 sm:p-10 border transition-colors ${
              isLight
                ? 'bg-white border-[#edf1f7] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                : 'bg-[#071739] border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Header row */}
            <div className="flex justify-between items-center pb-4 border-b border-[#161c22] dark:border-slate-700 text-[13px] font-bold text-[#161c22] dark:text-[#f2f5f9]">
              <span>What</span>
              <span>Cost</span>
            </div>

            {/* List rows */}
            <div className="divide-y divide-[#edf1f7] dark:divide-slate-800/80">
              {bulkTransferFees.map((row, i) => (
                <div
                  key={i}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[15px]"
                >
                  <span className="text-[#343e4a] dark:text-slate-300 font-normal">
                    {row.what}
                  </span>
                  <span className="font-bold text-[#161c22] dark:text-white shrink-0 sm:text-right">
                    {row.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: What We Will Not Do (3 Cards)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-[#161c22] dark:text-[#f2f5f9] mb-6">
            What We Will Not Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-[24px] p-7 sm:p-8 border flex flex-col justify-start transition-colors ${
                isLight
                  ? 'bg-white border-[#edf1f7] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                  : 'bg-[#071739] border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#043e97]/10 dark:bg-[#0976da]/20 flex items-center justify-center text-[#043e97] dark:text-[#53a8f5]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold text-[#161c22] dark:text-white leading-[1.3]">
                No Charge You Cannot See
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Any fee shows on the batch summary, next to the total, before you approve it.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-[24px] p-7 sm:p-8 border flex flex-col justify-start transition-colors ${
                isLight
                  ? 'bg-white border-[#edf1f7] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                  : 'bg-[#071739] border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#043e97]/10 dark:bg-[#0976da]/20 flex items-center justify-center text-[#043e97] dark:text-[#53a8f5]">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold text-[#161c22] dark:text-white leading-[1.3]">
                Priced per Recipient
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                A batch is many transactions, so it is priced as many. One row, one fee.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-[24px] p-7 sm:p-8 border flex flex-col justify-start transition-colors ${
                isLight
                  ? 'bg-white border-[#edf1f7] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                  : 'bg-[#071739] border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#043e97]/10 dark:bg-[#0976da]/20 flex items-center justify-center text-[#043e97] dark:text-[#53a8f5]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold text-[#161c22] dark:text-white leading-[1.3]">
                A Reversed Row
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                If a row fails and comes back, what happens to its fee is still to be decided.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: Numbers to Come. Closing CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 py-16 sm:py-20 text-center text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)]"
        >
          <h2 className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold tracking-[-0.03em] text-white!">
            Numbers to Come.
          </h2>

          <p className="mt-4 text-[17px] sm:text-[19px] text-[#d6ebff] max-w-[500px] mx-auto">
            The structure is set. The figures are not.
          </p>

          <div className="mt-8 flex justify-center">
            <StoreButtons
              tone="onBlueAlt"
              onApp={openDownloadApp ?? (() => {})}
              onWhatsApp={openWhatsApp}
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};
