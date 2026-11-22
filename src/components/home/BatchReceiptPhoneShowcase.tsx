'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileSpreadsheet,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar, Money } from './shared';

interface TransactionRecord {
  id: string;
  rowLabel: string;
  recipient: string;
  amount: string;
  decimals: string;
  status: 'completed' | 'flagged';
  statusText: string;
  rows: [string, string][];
}

const records: TransactionRecord[] = [
  {
    id: 'rec-1',
    rowLabel: 'Row 1 of 48',
    recipient: 'Ikeja Electric',
    amount: '8,500',
    decimals: '.00',
    status: 'completed',
    statusText: 'Completed',
    rows: [
      ['To', 'Ikeja Electric'],
      ['Meter', '45012338'],
      ['Name', 'ADAEZE N BALOGUN'],
      ['Paid From', 'Axoora Wallet'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Fee', '₦0.00'],
      ['Settlement', 'Instant · 0.4s'],
    ],
  },
  {
    id: 'rec-2',
    rowLabel: 'Row 2 of 48',
    recipient: 'Chidinma Okafor',
    amount: '340,000',
    decimals: '.00',
    status: 'completed',
    statusText: 'Completed',
    rows: [
      ['To', 'Chidinma Okafor'],
      ['Account', 'GTBank · 0148921834'],
      ['Role', 'Senior Designer'],
      ['Paid From', 'Axoora Operating'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Fee', '₦0.00'],
      ['Settlement', 'Instant · 0.5s'],
    ],
  },
  {
    id: 'rec-3',
    rowLabel: 'Row 3 of 48',
    recipient: 'Babatunde Adeleke',
    amount: '45,000',
    decimals: '.00',
    status: 'flagged',
    statusText: 'Flagged · Not Debited',
    rows: [
      ['To', 'Babatunde Adeleke'],
      ['Issue', 'Invalid Account No.'],
      ['Batch Impact', 'Rest of batch sent'],
      ['Wallet', '₦0 deducted'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Resolution', 'Edit row & retry'],
      ['Status', 'Protected by Pre-check'],
    ],
  },
];

export const BatchReceiptPhoneShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-switch across the 3 recipient records every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % records.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const active = records[currentIndex];

  return (
    <div className="relative select-none flex flex-col items-center">
      {/* Mini interactive Row Selector Pill on top of phone */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 mb-2.5 shadow-md z-20">
        {records.map((rec, index) => {
          const isSelected = index === currentIndex;
          return (
            <button
              key={rec.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`relative px-2.5 py-1 rounded-full text-[10.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isSelected
                  ? 'text-white bg-[#0976da] shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {rec.status === 'completed' ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
              <span>{rec.rowLabel}</span>
              {isSelected && (
                <motion.div
                  layoutId="activeReceiptPill"
                  className="absolute inset-0 rounded-full border border-white/35 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Phone Frame */}
      <PhoneFrame width={285} height={392} radius={44} className="shadow-[0_20px_50px_rgba(2,15,46,0.25)]">
        <div className="h-full flex flex-col justify-between px-[13px] pt-0.5 pb-2">
          {/* Status bar */}
          <PhoneStatusBar className="px-[2px]" />

          {/* Top navigation row */}
          <div className="flex items-center justify-between mt-1">
            <div className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#4c5866]">
              <ArrowLeft className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 text-[8.5px] font-bold text-[#0976da] bg-[#eef5fc] px-2 py-0.5 rounded-full">
              <FileSpreadsheet className="w-2.5 h-2.5" />
              <span>payroll_nov.csv</span>
            </div>
            <span className="text-[8px] font-semibold text-[#8492a6] font-mono">{active.rowLabel}</span>
          </div>

          {/* Animated Record Content */}
          <div className="flex-1 relative overflow-hidden mt-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Header: Icon, Amount, and Badge */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                      active.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 ring-4 ring-emerald-50/50'
                        : 'bg-amber-50 text-amber-700 ring-4 ring-amber-50/50'
                    }`}
                  >
                    {active.status === 'completed' ? (
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </div>

                  <div className="mt-1.5 flex items-baseline justify-center">
                    <span className="text-[21px] font-bold text-[#161c22] tracking-tight">₦{active.amount}</span>
                    <span className="text-[14px] text-[#4c5866] font-normal">{active.decimals}</span>
                  </div>

                  {/* Status Pill Badge */}
                  <span
                    className={`mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[7.5px] font-bold ${
                      active.status === 'completed'
                        ? 'bg-[#e3f6ec] text-[#065f41]'
                        : 'bg-[#fef3c7] text-[#92400e]'
                    }`}
                  >
                    {active.status === 'completed' ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                    )}
                    {active.statusText}
                  </span>
                </div>

                {/* Key-Value Breakdown Rows */}
                <div className="mt-2.5 flex flex-col">
                  {active.rows.map(([k, v], i) => (
                    <div
                      key={k}
                      className="h-[25px] flex items-center justify-between border-b border-[#f0f3f6] text-[8px]"
                    >
                      <span className="text-[#6c7a89] font-medium">{k}</span>
                      <span
                        className={`font-semibold ${
                          k === 'Issue'
                            ? 'text-amber-800'
                            : k === 'Settlement'
                            ? 'text-emerald-700'
                            : 'text-[#161c22]'
                        }`}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar tracking the 4.5s switch interval */}
          <div className="pt-2 px-1">
            <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                key={active.id}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className="h-full bg-[#0976da]"
              />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
