'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface WhatsAppBankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
  onOpenCommandDrawer?: () => void;
}

const QUICK_STARTS = [
  { label: 'Check account balance', prompt: 'Hi Axoora AI! Can you check my account balance?' },
  { label: '0% fee transfer', prompt: 'Hi Axoora AI! I want to make a transfer with zero fees.' },
  { label: 'Request Smart POS', prompt: 'Hi Axoora! I want to request a Smart POS terminal for my shop.' },
  { label: 'Save & Earn vault', prompt: 'Hi Axoora AI! Tell me about non-interest Save & Earn.' },
];

export const WhatsAppBankingModal: React.FC<WhatsAppBankingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedPrompt, setSelectedPrompt] = useState(QUICK_STARTS[0].prompt);

  if (!isOpen) return null;

  const phoneDigits = (COMPANY_INFO.whatsappNumber || '+2349110002966').replace(/\D/g, '');
  const activeWhatsAppUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(selectedPrompt)}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-colors ${
        isLight ? 'bg-slate-900/60' : 'bg-[#01091C]/85'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2 }}
        className={`w-full max-w-md rounded-3xl p-6 sm:p-7 relative shadow-2xl border flex flex-col items-center text-center gap-5 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0A1B3D] border-2 border-[#14294F] text-[#F2F5F9]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isLight
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              : 'bg-[#14294F] text-[#A8BBD6] hover:text-white'
          }`}
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* WhatsApp Brand Lockup */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00A884] dark:text-[#00DF8F] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[30px]">chat</span>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Bank on WhatsApp
            </h3>
            <p className={`text-xs mt-1 max-w-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Send money, check balances, and manage your account in a natural WhatsApp chat.
            </p>
          </div>
        </div>

        {/* Desktop QR Scan / Mobile Bridge */}
        <div
          className={`w-full p-4 rounded-2xl border flex items-center gap-3.5 text-left ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
          }`}
        >
          <div className="w-20 h-20 rounded-xl bg-white p-1.5 border border-slate-200 shrink-0 flex items-center justify-center shadow-xs">
            <div className="w-full h-full bg-slate-900 rounded-xs p-1 grid grid-cols-4 grid-rows-4 gap-0.5">
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
              <div className="bg-[#00DF8F] rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-[#00DF8F] rounded-xs col-span-2" />
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
              <div className="bg-white rounded-xs" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-extrabold flex items-center gap-1.5 text-[#00A884] dark:text-[#00DF8F]">
              <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
              Scan or Tap to Chat
            </span>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Scan with your phone camera to chat instantly, or select a prompt below to launch WhatsApp.
            </p>
          </div>
        </div>

        {/* Creative Interactive Quick Starters */}
        <div className="w-full flex flex-col gap-1.5 text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Tap a message to start:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_STARTS.map((qs) => {
              const active = selectedPrompt === qs.prompt;
              return (
                <button
                  key={qs.label}
                  type="button"
                  onClick={() => setSelectedPrompt(qs.prompt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#00DF8F]/15 border-[#00DF8F] text-[#00A884] dark:text-[#00DF8F] shadow-xs'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200/70 border-slate-200 text-slate-700'
                      : 'bg-[#020F2E] hover:bg-[#14294F] border-[#14294F] text-[#A8BBD6]'
                  }`}
                >
                  {qs.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary 1-Tap Action Button */}
        <div className="w-full flex flex-col gap-2 pt-1">
          <a
            href={activeWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-[#00DF8F] hover:bg-[#00c57d] text-[#003825] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00DF8F]/25 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">chat</span>
            <span>Open in WhatsApp</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>

          <p className="text-[11px] text-slate-400">
            Official verified WhatsApp: <span className="font-mono">{COMPANY_INFO.whatsappNumber}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
