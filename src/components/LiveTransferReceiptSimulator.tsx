'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LiveTransferReceiptSimulatorProps {
  isLight?: boolean;
  onOpenWaitlist?: (type?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const LiveTransferReceiptSimulator: React.FC<LiveTransferReceiptSimulatorProps> = ({
  isLight: propIsLight,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

  const [amount, setAmount] = useState<number>(15000);
  const [bank, setBank] = useState<string>('Kuda Microfinance Bank');
  const [accountNumber, setAccountNumber] = useState<string>('2019482019');
  const [recipientName, setRecipientName] = useState<string>('Amina Bello');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [receiptSession, setReceiptSession] = useState<{
    sessionRef: string;
    rrn: string;
    time: string;
  } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);

  const bankOptions = [
    { name: 'Kuda Microfinance Bank', code: '090267' },
    { name: 'OPay Digital Services', code: '090405' },
    { name: 'Guaranty Trust Bank (GTB)', code: '058' },
    { name: 'Zenith Bank PLC', code: '057' },
    { name: 'First Bank of Nigeria', code: '011' },
    { name: 'Access Bank PLC', code: '044' },
  ];

  const handleSimulateTransfer = () => {
    setIsProcessing(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const now = new Date();
      setReceiptSession({
        sessionRef: `NIBSS-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        rrn: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        time: now.toLocaleTimeString('en-GB') + ' WAT',
      });
    }, 1800);
  };

  const handleCopyReceipt = () => {
    if (!receiptSession) return;
    const text = `AXOORA TRANSFER RECEIPT\nAmount: ₦${amount.toLocaleString()}\nBeneficiary: ${recipientName}\nBank: ${bank}\nAccount: ${accountNumber}\nStatus: APPROVED (₦0 Fee)\nNIBSS Session: ${receiptSession.sessionRef}\nTime: ${receiptSession.time}`;
    navigator.clipboard?.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <section
      className={`relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'border-[#14294F] bg-[#020F2E] text-[#F2F5F9]'
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
              <span className={isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}>INTERACTIVE SIMULATOR</span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-[#14294F]'}>·</span>
              <span className={isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}>Test A Real ₦0 Fee Transfer</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Feel how fast money moves.
            </h2>
            <p
              className={`text-sm sm:text-base max-w-xl ${
                isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
              }`}
            >
              Type an amount, pick any Nigerian bank, and watch how Axoora routes through CBN partner settlement in under 2 seconds.
            </p>
          </div>

          <div
            className={`text-xs font-mono self-start md:self-auto flex items-center gap-2 ${
              isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse" />
            <span>NIBSS Instant Payment (NIP) Rail Live</span>
          </div>
        </div>

        {/* Transfer Console & Thermal Receipt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Console: User Inputs & Transfer Trigger */}
          <div
            className={`lg:col-span-6 rounded-3xl border-2 p-6 sm:p-8 flex flex-col gap-6 ${
              isLight
                ? 'bg-slate-50 border-slate-200 shadow-sm'
                : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isLight ? 'border-slate-200' : 'border-[#14294F]'
              }`}
            >
              <span
                className={`text-xs font-mono font-bold uppercase ${
                  isLight ? 'text-slate-800' : 'text-[#F2F5F9]'
                }`}
              >
                Send Money (Instant Transfer)
              </span>
              <span className="text-xs font-mono text-[#00DF8F] font-bold">
                Transfer Fee: ₦0.00
              </span>
            </div>

            {/* Quick Amount Chips */}
            <div className="flex flex-col gap-2">
              <label
                className={`text-xs font-mono ${
                  isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                }`}
              >
                Select or Enter Amount:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5000, 15000, 50000, 100000].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setAmount(val);
                      setIsSuccess(false);
                    }}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      amount === val
                        ? 'bg-[#00DF8F] text-[#003825] shadow-xs'
                        : isLight
                        ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                        : 'bg-[#020F2E] text-[#A8BBD6] border border-[#14294F] hover:text-[#F2F5F9]'
                    }`}
                  >
                    ₦{val.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-[#00DF8F] text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setIsSuccess(false);
                  }}
                  className={`w-full pl-8 pr-4 py-2.5 rounded-xl font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#00DF8F] ${
                    isLight
                      ? 'bg-white border border-slate-300 text-slate-900'
                      : 'bg-[#020F2E] border border-[#14294F] text-[#F2F5F9]'
                  }`}
                />
              </div>
            </div>

            {/* Recipient Bank Selector */}
            <div className="flex flex-col gap-2">
              <label
                className={`text-xs font-mono ${
                  isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                }`}
              >
                Destination Bank:
              </label>
              <select
                value={bank}
                onChange={(e) => {
                  setBank(e.target.value);
                  setIsSuccess(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00DF8F] cursor-pointer ${
                  isLight
                    ? 'bg-white border border-slate-300 text-slate-900'
                    : 'bg-[#020F2E] border border-[#14294F] text-[#F2F5F9]'
                }`}
              >
                {bankOptions.map((b) => (
                  <option
                    key={b.name}
                    value={b.name}
                    className={isLight ? 'bg-white text-slate-900' : 'bg-[#020F2E] text-[#F2F5F9]'}
                  >
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label
                  className={`text-xs font-mono ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  10-Digit NUBAN:
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  maxLength={10}
                  className={`w-full px-3 py-2 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#00DF8F] ${
                    isLight
                      ? 'bg-white border border-slate-300 text-slate-900'
                      : 'bg-[#020F2E] border border-[#14294F] text-[#F2F5F9]'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className={`text-xs font-mono ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  Verified Recipient Name:
                </label>
                <div
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-[#020F2E] border border-[#14294F] text-[#00DF8F]'
                  }`}
                >
                  <span>{recipientName}</span>
                  <span className="material-symbols-outlined text-[15px] text-[#00DF8F]">check_circle</span>
                </div>
              </div>
            </div>

            {/* Fee Comparison Notice */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-600'
                  : 'bg-[#020F2E] border border-[#14294F] text-[#A8BBD6]'
              }`}
            >
              <span>Conventional Bank Charge:</span>
              <span className="text-red-500 line-through font-bold">₦53.75</span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSimulateTransfer}
              disabled={isProcessing}
              className={`w-full py-3.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 ${
                isProcessing
                  ? 'bg-[#14294F] text-[#A8BBD6] cursor-wait'
                  : 'bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                  <span>Settling with NIBSS in 1.8s...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Send ₦{amount.toLocaleString()} Now (₦0 Fee)</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Physical Thermal Receipt (Real Human Street Touch) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {isSuccess && receiptSession ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                className="w-full max-w-md bg-[#FDFBF7] text-[#1E293B] font-mono rounded-none shadow-2xl p-6 sm:p-8 relative border-t-8 border-dashed border-[#CBD5E1] border-b-8"
              >
                {/* Receipt Header */}
                <div className="text-center pb-4 border-b-2 border-dashed border-slate-300">
                  <span className="text-xs font-bold text-slate-500 tracking-widest block">
                    NIBSS INSTANT TRANSFER
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                    AXOORA FINANCIAL
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Licensed by Central Bank of Nigeria · NDIC Insured
                  </p>
                  <div className="mt-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded border border-emerald-300">
                    ✓ TRANSFER SUCCESSFUL · CUSTOMER RECEIPT
                  </div>
                </div>

                {/* Receipt Line Items */}
                <div className="py-4 text-xs flex flex-col gap-2 border-b-2 border-dashed border-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">AMOUNT SENT:</span>
                    <span className="font-extrabold text-base text-slate-900">
                      ₦{amount.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">TRANSFER FEE:</span>
                    <span className="font-bold text-emerald-700">₦0.00 (WAIVED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">BENEFICIARY:</span>
                    <span className="font-bold text-slate-900">{recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DESTINATION BANK:</span>
                    <span className="font-medium text-slate-700">{bank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ACCOUNT NUMBER:</span>
                    <span className="font-mono text-slate-700">{accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SESSION ID:</span>
                    <span className="font-mono text-[10px] text-slate-600">
                      {receiptSession.sessionRef}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DATE &amp; TIME:</span>
                    <span className="font-mono text-[11px] text-slate-600">
                      {receiptSession.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">STATUS:</span>
                    <span className="font-bold text-emerald-700">SETTLED IN 1.8 SECONDS</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleCopyReceipt}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>{copiedReceipt ? 'Receipt Copied!' : 'Copy Receipt'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setAmount(amount === 15000 ? 50000 : 15000);
                    }}
                    className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-sans text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Test Another Transfer
                  </button>
                </div>
              </motion.div>
            ) : (
              <div
                className={`w-full max-w-md p-8 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center gap-4 min-h-[380px] ${
                  isLight
                    ? 'bg-slate-50 border-slate-300'
                    : 'bg-[#0A1B3D] border-[#14294F]'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[#00DF8F] ${
                    isLight
                      ? 'bg-white border border-slate-200 shadow-sm'
                      : 'bg-[#020F2E] border border-[#14294F]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[32px]">receipt_long</span>
                </div>
                <h4
                  className={`text-lg font-bold ${
                    isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                  }`}
                >
                  Instant Receipt Slip Preview
                </h4>
                <p
                  className={`text-xs max-w-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  Hit <strong className="text-emerald-600 dark:text-[#00DF8F]">"Send Now"</strong> on the left to simulate a live NIBSS transfer and print your official thermal paper transaction receipt.
                </p>
                <span className="text-[11px] font-mono text-[#0D95FE] font-bold">
                  Zero Transfer Fees · CBN Insured Escrow
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
