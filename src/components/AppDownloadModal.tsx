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
          <div className="p-3 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-[#F2F5F9]">Apple App Store</span>
            <span className="px-2 py-0.5 rounded-full bg-[#14294F] text-[10px] text-[#A8BBD6] font-mono">
              Coming Soon
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-[#F2F5F9]">Google Play Store</span>
            <span className="px-2 py-0.5 rounded-full bg-[#14294F] text-[10px] text-[#A8BBD6] font-mono">
              Coming Soon
            </span>
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
