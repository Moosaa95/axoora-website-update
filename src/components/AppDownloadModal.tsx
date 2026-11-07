'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AppleAppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { useTheme } from '../context/ThemeContext';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  onOpenWaitlist,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-colors ${
        isLight ? 'bg-slate-900/60' : 'bg-[#01091C]/85'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 relative shadow-2xl border flex flex-col gap-5 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0A1B3D] border-2 border-[#14294F] text-[#F2F5F9]'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isLight
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              : 'bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B]'
          }`}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Top Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00A884] dark:text-[#00DF8F] font-mono text-[11px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
            <span>90-SECOND MOBILE &amp; WHATSAPP ONBOARDING</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Open Your Account on Your Phone
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-md ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
            To protect your identity with CBN-compliant 3D facial biometrics and BVN matching, Axoora accounts are opened directly in our <strong>Mobile App</strong> or via <strong>WhatsApp AI</strong> — never on a web browser.
          </p>
        </div>

        {/* Interactive QR Code + Phone Handoff Box */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 text-left ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
          }`}
        >
          <div className="w-24 h-24 rounded-xl bg-white p-2 border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
            <div className="w-full h-full bg-slate-900 rounded-sm p-1.5 grid grid-cols-5 grid-rows-5 gap-0.5">
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
              <div className="bg-[#00DF8F] rounded-xs" />
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-[#0D95FE] rounded-xs col-span-3" />
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs col-span-2 row-span-2" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">qr_code_scanner</span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D95FE]">
                Scan with Phone Camera
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Point your iPhone or Android camera at the QR code to get your personal or business NUBAN in under 90 seconds.
            </p>
          </div>
        </div>

        {/* Direct 1-Tap WhatsApp AI Launch */}
        <a
          href={`https://wa.me/2349012345678?text=${encodeURIComponent(
            'Hi Axoora AI! I want to open an Axoora account and activate zero-fee transfers.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-2xl bg-[#00DF8F] hover:bg-[#00c57d] text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00DF8F]/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px]">chat</span>
          <span>Start Instant Setup on WhatsApp AI</span>
          <span className="material-symbols-outlined text-[17px]">open_in_new</span>
        </a>

        {/* Store Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <AppleAppStoreBadge
            onClick={() => {
              onClose();
              onOpenWaitlist();
            }}
            isLight={isLight}
            className="w-full justify-center py-2.5"
          />
          <GooglePlayBadge
            onClick={() => {
              onClose();
              onOpenWaitlist();
            }}
            isLight={isLight}
            className="w-full justify-center py-2.5"
          />
        </div>

        {/* Merchant POS & Callback Bridge */}
        <div
          className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs ${
            isLight ? 'border-slate-200 text-slate-600' : 'border-[#14294F] text-[#A8BBD6]'
          }`}
        >
          <span>Need an Apex 4G POS or Business Officer?</span>
          <button
            onClick={() => {
              onClose();
              onOpenWaitlist();
            }}
            className="font-extrabold text-[#0D95FE] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Request POS Dispatch</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
