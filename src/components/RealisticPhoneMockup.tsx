'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealisticPhoneMockupProps {
  isLight?: boolean;
  onOpenWaitlist?: (interest?: 'personal') => void;
  onOpenWhatsApp?: () => void;
}

export const RealisticPhoneMockup: React.FC<RealisticPhoneMockupProps> = ({
  isLight = false,
  onOpenWaitlist,
}) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [phoneBalance, setPhoneBalance] = useState<number>(112430.0);
  const [copiedType, setCopiedType] = useState<'account' | 'id' | null>(null);
  const [aiVoiceActive, setAiVoiceActive] = useState<boolean>(false);
  const [showInflowAlert, setShowInflowAlert] = useState<boolean>(false);

  const handleCopy = (type: 'account' | 'id', text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSimulateInflow = () => {
    setShowInflowAlert(true);
    setPhoneBalance((prev) => prev + 25000);
    setTimeout(() => {
      setShowInflowAlert(false);
    }, 4500);
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center select-none py-2">
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#00DF8F]/20 to-[#0D95FE]/25 rounded-full blur-[70px] pointer-events-none" />

      {/* Floating Badges Around the Phone */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className={`absolute -left-6 sm:-left-10 top-20 z-40 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-xl flex items-center gap-2 hidden xs:flex ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-[#020F2E]/95 border-[#00DF8F]/40 text-[#F2F5F9]'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-ping" />
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-black text-[#00DF8F]">Sub-2s NIBSS</span>
          <span className="text-[9px] opacity-75">Instant settlement</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className={`absolute -right-6 sm:-right-8 bottom-32 z-40 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-xl flex items-center gap-2 hidden xs:flex ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-[#020F2E]/95 border-[#0D95FE]/40 text-[#F2F5F9]'
        }`}
      >
        <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">verified</span>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-black text-[#0D95FE]">Zero Transfer Fees</span>
          <span className="text-[9px] opacity-75">No hidden charges</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* THE REALISTIC SMARTPHONE (EXACT MATCH TO USER-LOVED PREVIOUS VERSION) */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[305px] sm:w-[330px] rounded-[52px] p-[5px] shadow-[0_35px_80px_-15px_rgba(0,0,0,0.65)] select-none transition-transform hover:-translate-y-1 duration-300"
        style={{
          background:
            'linear-gradient(135deg, #DEAA79 0%, #C38A56 25%, #8B592A 50%, #C38A56 75%, #ECC093 100%)',
        }}
      >
        {/* Side Hardware Buttons (Bronze/Gold Metallic Chamfer) */}
        <div className="absolute -right-[3px] top-[140px] w-[3px] h-[36px] bg-[#9D6837] rounded-r-sm" />
        <div className="absolute -right-[3px] top-[188px] w-[3px] h-[48px] bg-[#9D6837] rounded-r-sm" />
        <div className="absolute -left-[3px] top-[150px] w-[3px] h-[30px] bg-[#9D6837] rounded-l-sm" />

        {/* Thin inner black rim bezel */}
        <div className="w-full h-full rounded-[47px] p-[6px] bg-[#000000]">
          {/* The Actual Display Screen - Zero Scroll: Everything fits perfectly inside */}
          <div className="dark-hardware preserve-dark w-full h-[620px] sm:h-[645px] rounded-[41px] bg-[#020B1D] text-[#F2F5F9] font-sans overflow-hidden relative flex flex-col justify-between p-3 shadow-inner">
            {/* TOP STATUS BAR */}
            <div className="w-full pt-0.5 pb-1 flex items-center justify-between text-xs px-2 z-20 shrink-0">
              <span className="font-bold text-[12px] tracking-tight text-white font-sans">
                9:41
              </span>

              {/* Punch-hole camera (Centered) */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700/80 flex items-center justify-center relative shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a1a36]" />
              </div>

              {/* Cellular signal dots */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* USER PROFILE HEADER ROW */}
            <div className="flex items-center justify-between pt-0.5 shrink-0">
              {/* Avatar and user info */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#0D47A1] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#1976D2]/40">
                  AB
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white leading-tight">
                    Adaeze
                  </span>
                  <span className="text-[10px] text-[#8EA2C6] leading-tight mt-0.5">
                    Tier 3 · no daily cap
                  </span>
                </div>
              </div>

              {/* Wallet & Bell Actions */}
              <div className="flex items-center gap-1.5">
                <div className="px-2.5 py-1 rounded-full bg-[#0E1D3B] border border-[#1B3564] flex items-center gap-1.5 text-white">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#7B9CD2]">
                      grid_view
                    </span>
                    <span className="text-[11px] font-semibold">Wallet</span>
                  </div>
                  <span className="text-[#1B3564]">|</span>
                  <span className="material-symbols-outlined text-[13px] text-[#7B9CD2]">
                    chat_bubble
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#0E1D3B] border border-[#1B3564] flex items-center justify-center text-[#7B9CD2] hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px]">
                    notifications
                  </span>
                </div>
              </div>
            </div>

            {/* AVAILABLE BALANCE ROW */}
            <div className="flex flex-col gap-0.5 pt-1.5 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#7B9CD2] font-semibold uppercase">
                  <span>AVAILABLE</span>
                  <span className="h-[1px] w-20 bg-[#1A325E]" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBalance(!showBalance);
                  }}
                  className="text-[#7B9CD2] hover:text-white transition-colors cursor-pointer"
                  title={showBalance ? 'Hide balance' : 'Show balance'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showBalance ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>

              {/* Big Naira Currency & Amount */}
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight">
                  ₦{showBalance
                    ? phoneBalance.toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : '••••••••••'}
                </span>
              </div>

              <p className="text-[10px] text-[#7B9CD2] leading-tight">
                No daily cap · ₦{phoneBalance.toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                available now
              </p>
            </div>

            {/* ACCOUNT NUMBER & AXOORA ID QUICK CARDS */}
            <div className="grid grid-cols-12 gap-1.5 pt-1 shrink-0">
              {/* Account Number Card */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy('account', '9012345678');
                }}
                className="col-span-5 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
              >
                <span className="text-[8px] font-mono uppercase text-[#7B9CD2] tracking-wider">
                  ACCOUNT
                </span>
                <div className="flex items-center justify-between text-[11px] font-bold text-white mt-0.5">
                  <span>9012345678</span>
                  <span className="material-symbols-outlined text-[12px] text-[#7B9CD2]">
                    {copiedType === 'account' ? 'check' : 'content_copy'}
                  </span>
                </div>
              </div>

              {/* Axoora ID Card */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy('id', '@adaeze');
                }}
                className="col-span-5 px-2 py-1.5 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex flex-col justify-between hover:border-[#0D95FE] transition-colors cursor-pointer"
              >
                <span className="text-[8px] font-mono uppercase text-[#7B9CD2] tracking-wider">
                  AXOORA ID
                </span>
                <div className="flex items-center justify-between text-[11px] font-bold text-white mt-0.5">
                  <span>@adaeze</span>
                  <span className="material-symbols-outlined text-[12px] text-[#7B9CD2]">
                    {copiedType === 'id' ? 'check' : 'content_copy'}
                  </span>
                </div>
              </div>

              {/* Share Button */}
              <div
                onClick={handleSimulateInflow}
                className="col-span-2 rounded-xl bg-[#0B1A3A] border border-[#152D5E] flex items-center justify-center text-[#7B9CD2] hover:text-[#00DF8F] transition-colors cursor-pointer"
                title="Simulate Inflow Alert"
              >
                <span className="material-symbols-outlined text-[16px]">
                  bolt
                </span>
              </div>
            </div>

            {/* AI SEARCH & INTENT BAR */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setAiVoiceActive(!aiVoiceActive);
              }}
              className="w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-[#0C244E] to-[#0A1D3F] border border-[#1B3A6C] flex items-center justify-between shadow-sm cursor-pointer hover:border-[#0D95FE] transition-colors shrink-0"
            >
              <div className="flex items-center gap-2 text-[11px]">
                {/* Axoora Cyan Triangle Logo */}
                <div className="w-4 h-4 rounded-md bg-[#0D95FE] flex items-center justify-center text-white text-[9px] font-black">
                  ▲
                </div>
                <span className="text-[#A8BBD6]">
                  Ask Axoora — <span className="text-white font-medium">"send 5k to Musa"</span>
                </span>
              </div>
              <span className="material-symbols-outlined text-[15px] text-[#7B9CD2]">
                mic
              </span>
            </div>

            {/* 4 QUICK ACTION BUTTONS */}
            <div className="grid grid-cols-4 gap-2 text-center pt-0.5 shrink-0">
              {/* Send */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWaitlist?.('personal');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0D95FE] text-[#00284D] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">
                    north_east
                  </span>
                </div>
                <span className="text-[11px] font-bold text-white">Send</span>
              </button>

              {/* Bills & more */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWaitlist?.('personal');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                    bolt
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#A8BBD6]">Bills & more</span>
              </button>

              {/* Add money */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWaitlist?.('personal');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                    south_west
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#A8BBD6]">Add money</span>
              </button>

              {/* Mall */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWaitlist?.('personal');
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0E1D3B] border border-[#1A335E] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[19px] text-[#A8BBD6]">
                    storefront
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#A8BBD6]">Mall</span>
              </button>
            </div>

            {/* SCHEDULED PAYMENTS / DUE TOMORROW BANNER */}
            <div className="p-2 rounded-xl bg-[#07142E] border border-[#142A58] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-dashed border-[#F2A93B] text-[#F2A93B] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white">
                    Due tomorrow · 2 payments
                  </span>
                  <span className="text-[9px] text-[#7B9CD2]">
                    Chidinma Okafor and DStv
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-[#F2A93B] font-bold text-[11px]">
                <span>– ₦34,900.00</span>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* BOTTOM SHEET: PAY CIRCLE, SAVINGS & RECENT */}
            <div className="rounded-2xl bg-[#08152F] border border-[#142A58] p-2 flex flex-col gap-1.5 shrink-0">
              {/* TWO BENTO CARDS: PAY CIRCLE & SAVINGS */}
              <div className="grid grid-cols-2 gap-1.5">
                {/* Pay Circle Card */}
                <div className="p-2 rounded-xl bg-[#0B1A3A] border border-[#152B56] flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[16px] text-[#7B9CD2]">
                      groups
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#00DF8F]/20 text-[#00DF8F] text-[8px] font-bold flex items-center gap-0.5">
                      ↓ Payout
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] text-white">Pay Circle</span>
                    <span className="text-[9px] text-[#7B9CD2]">2 circles · due Friday</span>
                  </div>
                  <span className="font-bold font-mono text-[11px] text-white">
                    ₦ 10,000.00
                  </span>
                </div>

                {/* Savings Card */}
                <div className="p-2 rounded-xl bg-[#0B1A3A] border border-[#152B56] flex flex-col justify-between gap-1">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[16px] text-[#7B9CD2]">
                      inventory_2
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] text-white">Savings</span>
                    <span className="text-[9px] text-[#7B9CD2]">2 plans · non-interest</span>
                  </div>
                  <span className="font-bold font-mono text-[11px] text-white">
                    ₦ 85,000.00
                  </span>
                </div>
              </div>

              {/* Dashed Separator */}
              <div className="w-full border-t border-dashed border-[#1B3564]" />

              {/* RECENT TRANSACTIONS ROW */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white">Recent</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWaitlist?.('personal');
                    }}
                    className="text-[9px] font-bold text-[#0D95FE] tracking-wider uppercase hover:underline cursor-pointer"
                  >
                    SEE ALL
                  </button>
                </div>

                {/* Transaction Item: Chidinma Okafor Received */}
                <div className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#0A1A38] border border-[#142A58] flex items-center justify-center text-[#00DF8F]">
                      <span className="material-symbols-outlined text-[13px]">
                        south_west
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white leading-tight">
                        Chidinma Okafor
                      </span>
                      <span className="text-[9px] text-[#7B9CD2] leading-tight">
                        Received · 14:08
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold font-mono text-[#00DF8F]">
                    + ₦25,000.00
                  </span>
                </div>
              </div>
            </div>

            {/* HOME INDICATOR BAR */}
            <div className="w-full flex items-center justify-center pt-0.5 shrink-0">
              <div className="w-24 h-1 rounded-full bg-white/40" />
            </div>

            {/* Instant Inflow Toast */}
            <AnimatePresence>
              {showInflowAlert && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="absolute inset-x-3 bottom-12 z-30 p-2.5 rounded-2xl bg-gradient-to-r from-[#00DF8F] to-[#0D95FE] text-[#003825] shadow-2xl flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">
                    check_circle
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold">₦25,000.00 Inflow Added</span>
                      <span className="text-[8px] font-mono font-black bg-black/15 px-1 rounded">
                        SETTLED
                      </span>
                    </div>
                    <p className="text-[9px] opacity-90 truncate">
                      Instant settlement to your sovereign account
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
