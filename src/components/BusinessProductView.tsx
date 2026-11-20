'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  ChevronRight,
  Download,
  AlertCircle,
  Receipt,
  RotateCcw
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface BusinessProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const BusinessProductView: React.FC<BusinessProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [batchApproved, setBatchApproved] = useState(false);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ─── Hero: BB1 Business Home (Figma 3268:2885) ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-16">
        <div className="bg-[#161c22] text-white rounded-[28px] overflow-hidden p-8 sm:p-14 lg:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Briefcase className="w-4 h-4" />
              <span>Axoora Business Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.05] mb-6">
              Pay Everyone at Once. From One File.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mb-8">
              Upload a list, fix the rows that fail, and send the rest. On the commercial account you already have.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenWaitlist('business')}
                className="bg-blue-600 text-white hover:bg-blue-700 h-[52px] px-7 rounded-[10px] font-bold text-base transition shadow-md cursor-pointer flex items-center gap-2"
              >
                Open Business Account
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="border border-slate-600 text-slate-200 hover:bg-slate-800 h-[52px] px-6 rounded-[10px] font-semibold text-base transition cursor-pointer"
              >
                Talk to Business Desk
              </button>
            </div>
          </div>

          {/* Interactive Batch Payroll Simulator */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl font-['IBM_Plex_Sans',sans-serif]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm text-white">payroll_oct_2026.csv</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800">
                18 Valid Rows
              </span>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="font-bold block text-white">Chidinma Okafor (Staff)</span>
                  <span className="text-slate-400 text-[11px]">0123456789 · GTBank</span>
                </div>
                <span className="font-bold text-emerald-400">₦185,000.00</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="font-bold block text-white">Musa Okonkwo (Engineer)</span>
                  <span className="text-slate-400 text-[11px]">9876543210 · Zenith Bank</span>
                </div>
                <span className="font-bold text-emerald-400">₦220,000.00</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="font-bold block text-white">Ibrahim Balogun (Design)</span>
                  <span className="text-slate-400 text-[11px]">5544332211 · Access Bank</span>
                </div>
                <span className="font-bold text-emerald-400">₦160,000.00</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Batch Payout</span>
                <span className="text-base font-bold text-white">₦565,000.00</span>
              </div>
              <button
                type="button"
                onClick={() => setBatchApproved(!batchApproved)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  batchApproved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {batchApproved ? '✓ Batch Settled' : 'Simulate 1-PIN Approval'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 Operational Pillars ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            One Run, Not Fifty
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#161c22] dark:text-white">
            Built for Fast Financial Operations.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-6">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
              One File, Every Recipient
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Add rows by hand, or upload a CSV against our template. The template downloads directly from your dashboard with example rows.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
              Bad Rows Flagged, Not the Batch
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              Every row is checked before anything sends. An invalid account number is isolated on its own; the rest of the batch goes out without interruption.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-6">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
              One PIN for the Whole Run
            </h3>
            <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
              You authorize the payout batch once, not 50 times. The batch aggregate sum and beneficiary count are clearly stated on your screen.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Single-Recipient Reconciliation Record ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block mb-2">
              After It Runs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Every Recipient Gets Its Own Record.
            </h2>
            <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed mb-6">
              A batch is not one opaque lump. Each row becomes its own distinct transaction slip, reconciled individually, so a failure is immediately visible against the person it belongs to.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Success, pending, or failed status per recipient.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your daily limit counts the batch total, not each row.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>A failed row explicitly confirms whether that person was debited.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700 font-['IBM_Plex_Sans',sans-serif] text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Transaction Record</span>
              <span className="text-emerald-600 font-bold">✓ Completed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recipient</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">CHIDINMA OKAFOR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">₦185,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transfer Fee</span>
              <span className="font-bold text-emerald-600">₦0.00 (Zero Fee)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Reference</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">AXO-7B1M44</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Business CTA ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#161c22] dark:text-white tracking-tight mb-2">
            Payday, in One Go.
          </h3>
          <p className="text-[#4c5866] dark:text-slate-400 text-base">
            Bulk transfers unlock automatically at Tier 3 business verification.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onOpenWaitlist('business')}
            className="bg-[#043e97] text-white hover:bg-blue-800 px-6 py-3.5 rounded-[10px] font-bold text-sm transition shadow-sm cursor-pointer"
          >
            Get Business Access
          </button>
        </div>
      </section>
    </div>
  );
};
