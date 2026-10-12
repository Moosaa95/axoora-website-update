'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface BankFeeSavingsCalculatorProps {
  isLight?: boolean;
  onOpenWaitlist?: (type?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const BankFeeSavingsCalculator: React.FC<BankFeeSavingsCalculatorProps> = ({
  isLight: propIsLight,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

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
    <section
      className={`relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b transition-colors ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-900'
          : 'border-[#14294F] bg-[#01091C] text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
            isLight ? 'border-slate-200' : 'border-[#14294F]'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]" />
              <span className={isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}>REAL HUMAN MONEY</span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-[#14294F]'}>·</span>
              <span className={isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}>Stop Bleeding On Deductions</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              See what conventional banks deduct from you.
            </h2>
            <p
              className={`text-sm sm:text-base max-w-xl ${
                isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
              }`}
            >
              ₦53 transfer fee here, ₦8 SMS alert there, ₦50 stamp duty on deposits. Calculate how much you keep when you switch to Axoora.
            </p>
          </div>

          {/* Persona Toggle */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border self-start md:self-auto ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <button
              onClick={() => {
                setProfileType('individual');
                setTransfersPerWeek(20);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                profileType === 'individual'
                  ? 'bg-[#00DF8F] text-[#003825] shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
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
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                profileType === 'merchant'
                  ? 'bg-[#0D95FE] text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
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
          <div
            className={`lg:col-span-6 rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between gap-6 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <div className="flex flex-col gap-6">
              {/* Slider for transfers */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="transfers-slider"
                    className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}
                  >
                    {profileType === 'individual'
                      ? 'Transfers you send & receive each week:'
                      : 'Daily shop transfers & customer payments:'}
                  </label>
                  <span
                    className={`font-mono font-bold text-lg px-3 py-1 rounded-lg ${
                      isLight
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-[#002447] text-[#0D95FE] border border-[#0D95FE]/30'
                    }`}
                  >
                    {transfersPerWeek} {profileType === 'individual' ? '/ week' : '/ day'}
                  </span>
                </div>
                <input
                  id="transfers-slider"
                  type="range"
                  min="5"
                  max={profileType === 'individual' ? 100 : 300}
                  step="5"
                  value={transfersPerWeek}
                  onChange={(e) => setTransfersPerWeek(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-200 dark:bg-[#002447] appearance-none cursor-pointer accent-[#00DF8F]"
                />
                <div
                  className={`flex justify-between text-[11px] font-mono ${
                    isLight ? 'text-slate-500' : 'text-[#64748B]'
                  }`}
                >
                  <span>5 (Casual)</span>
                  <span>{profileType === 'individual' ? '50 (Active)' : '150 (Busy)'}</span>
                  <span>{profileType === 'individual' ? '100+ (Power)' : '300+ (High Volume)'}</span>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-3 pt-2">
                <span
                  className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                    isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
                  }`}
                >
                  Conventional Bank Charges Applied:
                </span>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    includeSms
                      ? isLight
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-[#002447]/60 border-[#0D95FE]/40'
                      : isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#020F2E] border-[#14294F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeSms}
                      onChange={(e) => setIncludeSms(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#0D95FE]"
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
                        SMS Alert Fees (₦4 per notification)
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        Debit alert + credit alert charged every time
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isLight ? 'text-rose-600' : 'text-rose-400'}`}>
                    +₦8/txn
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    includeStampDuty
                      ? isLight
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-[#002447]/60 border-[#0D95FE]/40'
                      : isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#020F2E] border-[#14294F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeStampDuty}
                      onChange={(e) => setIncludeStampDuty(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#0D95FE]"
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-[#F2F5F9]'}`}>
                        Electronic Money Transfer Levy (Stamp Duty)
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        ₦50 on incoming deposits above ₦10,000
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isLight ? 'text-rose-600' : 'text-rose-400'}`}>
                    +₦50 levy
                  </span>
                </label>
              </div>
            </div>

            {/* Note on Axoora Policy */}
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 text-xs ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-[#00DF8F]/10 border-[#00DF8F]/30 text-[#00DF8F]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">verified</span>
              <span>
                <strong>Axoora Policy:</strong> ₦0.00 transfer fees forever. In-app &amp; WhatsApp instant push alerts replace SMS deductions.
              </span>
            </div>
          </div>

          {/* Results Column */}
          <div
            className={`lg:col-span-6 rounded-3xl border-2 p-6 sm:p-8 flex flex-col justify-between gap-6 ${
              isLight
                ? 'bg-white border-slate-200 shadow-md'
                : 'bg-gradient-to-br from-[#002447] to-[#0A1B3D] border-[#0D95FE]/30'
            }`}
          >
            <div className="flex flex-col gap-6">
              <div>
                <span
                  className={`text-xs font-mono uppercase tracking-wider font-bold ${
                    isLight ? 'text-rose-600' : 'text-rose-400'
                  }`}
                >
                  ANNUAL LOST REVENUE
                </span>
                <h3
                  className={`text-xl font-bold mt-1 ${
                    isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                  }`}
                >
                  What conventional banks take from your pocket:
                </h3>
              </div>

              {/* Big metric */}
              <div
                className={`p-6 rounded-2xl border flex flex-col gap-2 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#020F2E]/70 border-[#14294F]'
                }`}
              >
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
                  }`}
                >
                  Estimated Annual Bank Charges:
                </span>
                <div
                  className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                    isLight ? 'text-rose-600' : 'text-rose-400'
                  }`}
                >
                  ₦{annualCost.toLocaleString()}
                </div>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                  That is approx{' '}
                  <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                    ₦{monthlyCost.toLocaleString()}
                  </strong>{' '}
                  silently subtracted every month.
                </span>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border ${
                    isLight
                      ? 'bg-rose-50/70 border-rose-200 text-slate-800'
                      : 'bg-rose-950/30 border-rose-800/40'
                  }`}
                >
                  <span
                    className={`text-xs block font-mono ${
                      isLight ? 'text-rose-700' : 'text-rose-300'
                    }`}
                  >
                    Old Bank Deductions:
                  </span>
                  <span
                    className={`text-xl font-bold font-mono ${
                      isLight ? 'text-rose-700' : 'text-rose-400'
                    }`}
                  >
                    ₦{monthlyCost.toLocaleString()}{' '}
                    <span className="text-xs font-normal">/mo</span>
                  </span>
                </div>
                <div
                  className={`p-4 rounded-xl border ${
                    isLight
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : 'bg-emerald-950/30 border-emerald-800/40'
                  }`}
                >
                  <span
                    className={`text-xs block font-mono ${
                      isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                    }`}
                  >
                    Axoora Deductions:
                  </span>
                  <span
                    className={`text-xl font-bold font-mono ${
                      isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                    }`}
                  >
                    ₦0.00 <span className="text-xs font-normal">/mo</span>
                  </span>
                </div>
              </div>

              {/* Human reality comparison */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-slate-800'
                    : 'bg-[#020F2E]/80 border-[#00DF8F]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[#00DF8F] text-[24px] shrink-0 mt-0.5">
                  savings
                </span>
                <div>
                  <span
                    className={`text-xs font-bold block ${
                      isLight ? 'text-emerald-900' : 'text-[#F2F5F9]'
                    }`}
                  >
                    What this means in real life:
                  </span>
                  <p
                    className={`text-xs mt-0.5 leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                    }`}
                  >
                    {getHumanImpact(annualCost)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onOpenWaitlist?.(profileType === 'individual' ? 'personal' : 'business')}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
              >
                <span>Keep Your Money · Join Waitlist</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenWhatsApp}
                className={`w-full sm:w-auto py-3 px-5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'border-[#14294F] hover:border-[#00DF8F] text-[#F2F5F9]'
                }`}
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
