import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const SecurityView: React.FC = () => {
  const [cardFrozen, setCardFrozen] = useState(false);

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] w-fit">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              SECURITY &amp; COMPLIANCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F2F5F9]">
            How your money and chat are protected.
          </h1>
          <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed">
            Licensed by the Central Bank of Nigeria. Deposits insured by NDIC. NDPR compliant data encryption.
          </p>
        </div>

        {/* 1. What We Never Ask */}
        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <span className="text-xs font-mono uppercase text-[#00DF8F] font-bold">
            The Golden Rule
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">What Axoora will never ask</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            Axoora will never ask for your PIN, account password, or one-time security code (OTP) in chat, on this website, or over a phone call. If anyone claims to be an Axoora agent asking for your PIN or OTP to "upgrade your account" or "fix a transfer", it is a scam.
          </p>
          <div className="p-4 rounded-xl bg-[#020F2E] border border-[#14294F] text-xs text-[#00DF8F] font-mono">
            Report suspicious messages immediately to {COMPANY_INFO.supportEmail}
          </div>
        </div>

        {/* 2. How a Chat Payment is Confirmed */}
        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <span className="text-xs font-mono uppercase text-[#0D95FE] font-bold">
            Transaction Safeguards
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">How a chat payment is confirmed</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            Every transfer or bill payment in Axoora AI undergoes a mandatory two-step verification before funds move:
          </p>
          <ol className="list-decimal list-inside text-sm sm:text-base text-[#A8BBD6] flex flex-col gap-2.5">
            <li>
              <strong className="text-[#F2F5F9]">Name &amp; account check:</strong> The AI verifies the beneficiary’s verified NUBAN name against Central Bank records.
            </li>
            <li>
              <strong className="text-[#F2F5F9]">Explicit confirmation tap:</strong> The AI presents the exact recipient, amount, and fee. Money only leaves after you tap the confirm button.
            </li>
          </ol>
        </div>

        {/* 3. Instant Card Freeze Simulation */}
        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <span className="text-xs font-mono uppercase text-[#F2A93B] font-bold">
            Instant Controls
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">Lost card? Freeze in one tap</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            If you misplace your physical or virtual debit card, you can lock it immediately from chat or settings without waiting on a bank queue.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setCardFrozen(!cardFrozen)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                cardFrozen
                  ? 'bg-[#00DF8F] text-[#003825]'
                  : 'bg-[#FF6A6A] hover:bg-[#FF8585] text-white'
              }`}
            >
              {cardFrozen ? 'Unfreeze Card' : 'Freeze Card Now'}
            </button>
            <span className="text-xs sm:text-sm font-mono text-[#A8BBD6]">
              Card status: <strong className={cardFrozen ? 'text-[#FF6A6A]' : 'text-[#00DF8F]'}>{cardFrozen ? 'LOCKED / FROZEN' : 'ACTIVE & READY'}</strong>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
