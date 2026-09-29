import React from 'react';
import { motion } from 'framer-motion';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#01091C]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-md bg-[#0A1B3D] border-2 border-[#14294F] rounded-3xl p-6 sm:p-8 text-[#F2F5F9] relative shadow-2xl text-center flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#020F2E] border border-[#14294F] flex items-center justify-center text-[#0D95FE] mb-4">
          <span className="material-symbols-outlined text-[32px]">smartphone</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#020F2E] border border-[#14294F] text-[#00DF8F] font-mono text-xs mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse"></span>
          <span>LAUNCHING TO WAITLIST MEMBERS FIRST</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-[#F2F5F9] mb-2">
          Download the Axoora App
        </h3>

        <p className="text-sm text-[#A8BBD6] leading-relaxed mb-6">
          The iOS and Android mobile applications will be distributed in phased invitations to registered waitlist members before public store release.
        </p>

        {/* Store Badges with Coming Soon */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-white shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.65-2.79 1.41-.58.67-1.1 1.77-.96 2.83 1.12.09 2.15-.51 2.79-1.29z" />
            </svg>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#F2F5F9] block">Apple App Store</span>
              <span className="mt-1 inline-block px-2 py-0.5 rounded-full bg-[#14294F] text-[10px] text-[#00DF8F] font-mono">
                Beta Rolling Out
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col items-center gap-2">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.362-.56-.88-.56-1.48V3.294c0-.6.213-1.118.56-1.48z" fill="#00C1A6"/>
              <path d="M17.378 8.414l-3.585 3.586 3.585 3.586 4.072-2.327c1.16-.663 1.16-1.745 0-2.408l-4.072-2.437z" fill="#FFBA00"/>
              <path d="M3.609 1.814l10.184 10.186 3.585-3.586L6.082.472C5.074-.104 4.095-.145 3.61 1.814z" fill="#2D7DD2"/>
              <path d="M13.793 12L3.61 22.186c.485 1.959 1.464 1.918 2.472 1.342l11.296-7.942-3.585-3.586z" fill="#F24C4C"/>
            </svg>
            <div className="text-center">
              <span className="text-xs font-semibold text-[#F2F5F9] block">Google Play Store</span>
              <span className="mt-1 inline-block px-2 py-0.5 rounded-full bg-[#14294F] text-[10px] text-[#00DF8F] font-mono">
                Beta Rolling Out
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onOpenWaitlist();
          }}
          className="w-full py-3.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer"
        >
          Join Waitlist for Early Access
        </button>
      </motion.div>
    </div>
  );
};
