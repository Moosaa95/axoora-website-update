'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'warning';
  isAlertOnly?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isAlertOnly = false,
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  const iconMap = {
    danger: { Icon: AlertCircle, bg: 'bg-red-500/15 border-red-500/30', text: 'text-red-400' },
    warning: { Icon: AlertTriangle, bg: 'bg-amber-500/15 border-amber-500/30', text: 'text-amber-400' },
    primary: { Icon: Info, bg: 'bg-[#043e97]/25 border-[#043e97]/40', text: 'text-[#53a8f5]' },
  };

  const buttonClassMap = {
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    warning: 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md',
    primary: 'bg-[#043e97] hover:bg-[#0976da] text-white shadow-md',
  };

  const badge = iconMap[variant];
  const BadgeIcon = badge.Icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm font-['DM_Sans',sans-serif]"
          onClick={() => {
            if (!isLoading) onCancel();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            className="w-full max-w-md rounded-2xl bg-[#071739] border border-[#162C5B] shadow-2xl overflow-hidden text-white"
          >
            <div className="p-6 flex items-start gap-4">
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${badge.bg} ${badge.text}`}
              >
                <BadgeIcon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 id="confirm-modal-title" className="text-base font-bold text-white leading-snug">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8492a6] mt-1.5 leading-relaxed">{message}</p>
              </div>

              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-4 bg-[#020F2E] border-t border-[#0e214d] flex items-center justify-end gap-3">
              {!isAlertOnly && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {cancelLabel}
                </button>
              )}
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 ${buttonClassMap[variant]}`}
              >
                {isLoading && (
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                <span>{isAlertOnly ? 'Got it' : confirmLabel}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
