'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BankFeeSavingsCalculatorProps {
  isLight?: boolean;
  onOpenWaitlist?: (type?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const BankFeeSavingsCalculator: React.FC<BankFeeSavingsCalculatorProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [profileType, setProfileType] = useState<'individual' | 'merchant'>('individual');
  const [transfersPerWeek, setTransfersPerWeek] = useState<number>(25);
  const [includeSms, setIncludeSms] = useState<boolean>(true);
  const [includeStampDuty, setIncludeStampDuty] = useState<boolean>(true);

  // Nigerian Banking Fee Math:
  // Transfer fee average: N26.88 to N53.75 depending on amount tier, let's use conservative N35 average
  // SMS alert: N4 per alert (debit + credit) = N8 per transaction
  // Stamp duty: N50 per deposit above N10,000
  const avgTransferFee = profileType === 'individual' ? 35 : 53.75;
  const smsCostPerTxn = includeSms ? 8 : 0;
  const stampDutyPerTxn = includeStampDuty ? (profileType === 'individual' ? 12.5 : 35) : 0;

  const costPerTxn = avgTransferFee + smsCostPerTxn + stampDutyPerTxn;
  const weeklyTransfers = transfersPerWeek;
  const monthlyTransfers = weeklyTransfers * 4.33;
  const monthlyCost = Math.round(monthlyTransfers * costPerTxn);
  const annualCost = monthlyCost * 12;

  // Real human equivalents for Nigeria
  const getHumanImpact = (yearlySavings: number) => {
    if (yearlySavings < 50000) {
      return 'Covers 3 full months of high-speed fiber internet or home electricity units.';
    }
    if (yearlySavings < 150000) {
      return 'Buys 2 full 50kg bags of Mama Gold rice or covers a term of secondary school fees.';
    }
    if (yearlySavings < 300000) {
      return 'Covers full quarterly shop rent in a busy neighborhood market or inventory restocking.';
    }
    return 'Funds a full new store generator, extra staff salary, or 4 new shop display showcases.';
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-[#14294F] bg-[#01091C]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]" />
              <span>Real Human Money</span>
              <span aria-hidden="true" className="text-[#14294F]">·</span>
              <span className="text-[#A8BBD6]">Stop Bleeding On Deductions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
              See what conventional banks deduct from you.
            </h2>
            <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
              N53 transfer fee here, N4 SMS alert there, N50 stamp duty on deposits. Calculate how much you keep when you switch to Axoora.
            </p>
          </div>

          {/* Persona Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#0A1B3D] border border-[#14294F] rounded-lg self-start md:self-auto">
            <button
              onClick={() => {
                setProfileType('individual');
                setTransfersPerWeek(20);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                profileType === 'individual'
                  ? 'bg-[#00DF8F] text-[#003825] shadow-sm'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              Personal Banking
            </button>
            <button
              onClick={() => {
                setProfileType('merchant');
                setTransfersPerWeek(80);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                profileType === 'merchant'
                  ? 'bg-[#0D95FE] text-[#00325b] shadow-sm'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              Shop or Business
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              {/* Slider for transfers */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="transfers-slider" className="text-sm font-semibold text-[#F2F5F9]">
                    {profileType === 'individual' ? 'Transfers you send & receive each week:' : 'Daily shop transfers & customer payments:'}
                  </label>
                  <span className="font-mono text-xl font-bold text-[#00DF8F]">
                    {transfersPerWeek} <span className="text-xs text-[#A8BBD6] font-normal">/ week</span>
                  </span>
                </div>
                <input
                  id="transfers-slider"
                  type="range"
                  min={5}
                  max={profileType === 'individual' ? 100 : 300}
                  step={5}
                  value={transfersPerWeek}
                  onChange={(e) => setTransfersPerWeek(Number(e.target.value))}
                  className="w-full accent-[#00DF8F] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#A8BBD6]">
                  <span>5 / week (Light)</span>
                  <span>{profileType === 'individual' ? '50 / week (Active)' : '150 / week (Busy Counter)'}</span>
                  <span>{profileType === 'individual' ? '100 / week' : '300 / week (Wholesale)'}</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#14294F]">
                <span className="text-xs font-mono text-[#A8BBD6] uppercase tracking-wider">
                  Typical Hidden Bank Deductions Included:
                </span>
                
                <label className="flex items-center justify-between text-xs text-[#F2F5F9] cursor-pointer py-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeSms}
                      onChange={(e) => setIncludeSms(e.target.checked)}
                      className="accent-[#00DF8F] rounded"
                    />
                    <span>SMS Alert Charges (₦4 per credit/debit alert)</span>
                  </div>
                  <span className="text-xs font-mono text-[#00DF8F]">~₦8 / txn</span>
                </label>

                <label className="flex items-center justify-between text-xs text-[#F2F5F9] cursor-pointer py-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeStampDuty}
                      onChange={(e) => setIncludeStampDuty(e.target.checked)}
                      className="accent-[#00DF8F] rounded"
                    />
                    <span>Electronic Money Transfer Levy (₦50 Stamp Duty)</span>
                  </div>
                  <span className="text-xs font-mono text-[#00DF8F]">Applies above ₦10k</span>
                </label>

                <div className="flex items-center justify-between text-xs text-[#A8BBD6] pt-1">
                  <span>Axoora Transfer &amp; Maintenance Fee:</span>
                  <span className="font-bold text-[#00DF8F]">₦0.00 (Zero Hidden Fees)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#020F2E] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed">
              <strong className="text-[#F2F5F9]">Honest Note:</strong> Traditional commercial banks in Nigeria generate over ₦400 Billion annually in electronic transaction fees alone. Axoora believes everyday merchants and hardworking families should keep their own money.
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#041026] border-2 border-[#00DF8F]/50 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold tracking-wider">
                YOUR ANNUAL MONEY SAVED
              </span>

              <div>
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#F2F5F9] tracking-tight">
                  ₦{annualCost.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-[#A8BBD6] block mt-1">
                  (₦{monthlyCost.toLocaleString()} saved every single month)
                </span>
              </div>

              {/* Breakdown comparison row */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#14294F]/80">
                <div>
                  <span className="text-xs text-red-300 block font-mono">Traditional Bank Takes:</span>
                  <span className="text-xl font-bold font-mono text-red-400">
                    -₦{monthlyCost.toLocaleString()} <span className="text-xs font-normal">/mo</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#00DF8F] block font-mono">Axoora Deductions:</span>
                  <span className="text-xl font-bold font-mono text-[#00DF8F]">
                    ₦0.00 <span className="text-xs font-normal">/mo</span>
                  </span>
                </div>
              </div>

              {/* Human reality comparison */}
              <div className="p-4 rounded-xl bg-[#020F2E]/80 border border-[#00DF8F]/40 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#00DF8F] text-[24px] shrink-0 mt-0.5">
                  savings
                </span>
                <div>
                  <span className="text-xs font-bold text-[#F2F5F9] block">What this means in real life:</span>
                  <p className="text-xs text-[#A8BBD6] mt-0.5 leading-relaxed">
                    {getHumanImpact(annualCost)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onOpenWaitlist?.(profileType === 'individual' ? 'personal' : 'business')}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-lg bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-[#00325b] font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span>Keep Your Money · Join Waitlist</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto py-3 px-5 rounded-lg border border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">chat</span>
                <span>Ask on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
