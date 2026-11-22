'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MoreHorizontal,
  AlertTriangle,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

interface TransactionRecord {
  id: string;
  recipient: string;
  amount: string;
  status: 'completed' | 'flagged';
  statusText: string;
  rows: [string, string][];
}

const records: TransactionRecord[] = [
  {
    id: 'rec-1',
    recipient: 'Ikeja Electric',
    amount: '8,500.00',
    status: 'completed',
    statusText: 'Completed',
    rows: [
      ['To', 'Ikeja Electric'],
      ['Meter', '45012338'],
      ['Name', 'ADAEZE N BALOGUN'],
      ['Paid From', 'Axoora Wallet'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Fee', '₦0.00'],
      ['Balance After', '₦103,930.00'],
    ],
  },
  {
    id: 'rec-2',
    recipient: 'Chidinma Okafor',
    amount: '340,000.00',
    status: 'completed',
    statusText: 'Completed',
    rows: [
      ['To', 'Chidinma Okafor'],
      ['Account', 'GTBank · 0148921834'],
      ['Name', 'CHIDINMA OKAFOR'],
      ['Paid From', 'Axoora Operating'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Fee', '₦0.00'],
      ['Balance After', '₦620,000.00'],
    ],
  },
  {
    id: 'rec-3',
    recipient: 'Babatunde Adeleke',
    amount: '45,000.00',
    status: 'flagged',
    statusText: 'Failed · Not Debited',
    rows: [
      ['To', 'Babatunde Adeleke'],
      ['Account', 'Access · 0029184821'],
      ['Issue', 'Account Number Unreachable'],
      ['Paid From', 'Axoora Operating'],
      ['Date', '11 Sept 2026, 09:20'],
      ['Fee', '₦0.00'],
      ['Balance After', '₦620,000.00 (Untouched)'],
    ],
  },
];

export const BatchReceiptPhoneShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth automatic cycling between records every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % records.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const active = records[currentIndex];

  return (
    <div className="relative select-none flex items-center justify-center">
      {/* Phone Frame matching Image 1 */}
      <PhoneFrame
        width={310}
        height={540}
        radius={48}
        className="shadow-[0_25px_60px_rgba(2,15,46,0.22)]"
      >
        <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans">
          {/* Top Status Bar: 9:41 & Cellular/Battery dots */}
          <PhoneStatusBar />

          {/* Top Navigation Row: Back Arrow on left, Horizontal 4 dots on right */}
          <div className="flex items-center justify-between pt-1 pb-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + records.length) % records.length)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#161c22] hover:bg-slate-100 transition cursor-pointer"
              aria-label="Previous record"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % records.length)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#161c22] hover:bg-slate-100 transition cursor-pointer"
              aria-label="Next record"
            >
              <MoreHorizontal className="w-4 h-4 text-[#161c22]" />
            </button>
          </div>

          {/* Animated Receipt Content */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Circular badge with ↗ */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-xs ${
                      active.status === 'completed'
                        ? 'bg-[#f1f3f5] text-[#161c22]'
                        : 'bg-[#fef2f2] text-[#dc2626]'
                    }`}
                  >
                    {active.status === 'completed' ? (
                      <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                    )}
                  </div>

                  {/* Centered Amount */}
                  <div className="text-center mt-3">
                    <span className="text-[30px] font-bold text-[#161c22] tracking-tight block">
                      ₦{active.amount}
                    </span>

                    {/* Status Pill Badge: ✓ Completed */}
                    <div className="mt-2 flex justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                          active.status === 'completed'
                            ? 'bg-[#e6f4ea] text-[#137333]'
                            : 'bg-[#fee2e2] text-[#991b1b]'
                        }`}
                      >
                        {active.status === 'completed' ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        )}
                        <span>{active.statusText}</span>
                      </span>
                    </div>
                  </div>

                  {/* Detail Key-Value Rows */}
                  <div className="mt-6 border-t border-[#edf1f7] divide-y divide-[#edf1f7] text-[11px]">
                    {active.rows.map(([key, value]) => (
                      <div
                        key={key}
                        className="py-2.5 flex items-center justify-between"
                      >
                        <span className="text-[#6c7a89] font-normal">{key}</span>
                        <span
                          className={`font-semibold tracking-tight ${
                            key === 'Issue'
                              ? 'text-red-600'
                              : 'text-[#161c22]'
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle switch indicator dots at bottom of receipt */}
                <div className="flex items-center justify-center gap-1.5 pt-3 pb-1">
                  {records.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === i
                          ? 'w-5 bg-[#0976da]'
                          : 'w-1.5 bg-[#d0d7de] hover:bg-[#a8b3cf]'
                      }`}
                      aria-label={`Go to record ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
