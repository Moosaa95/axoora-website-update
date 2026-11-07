'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCms } from '../context/CmsContext';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch } from '../store';
import { submitLeadThunk } from '../store/slices/waitlistSlice';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: 'personal' | 'business' | 'pos-agent' | 'aggregator';
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = 'pos-agent',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const dispatch = useAppDispatch();
  const { addLead } = useCms();

  const [step, setStep] = useState<1 | 2>(1);
  const [interest, setInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>(defaultInterest);
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [businessOrCity, setBusinessOrCity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setInterest(defaultInterest);
      setStep(1);
      setErrorMsg('');
    }
  }, [isOpen, defaultInterest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappNumber.trim()) {
      setErrorMsg('Please enter your name and WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedRef = `AXR-${interest === 'pos-agent' ? 'POS' : 'APP'}-${randomCode}`;

    dispatch(
      submitLeadThunk({
        full_name: fullName.trim(),
        whatsapp_number: whatsappNumber.trim(),
        email: email.trim() || `${whatsappNumber.replace(/\D/g, '')}@axoora.customer`,
        city: interest === 'personal' ? businessOrCity.trim() || 'Nigeria' : 'Nigeria',
        business_name: interest !== 'personal' ? businessOrCity.trim() || fullName.trim() : '',
        application_ref: generatedRef,
        tracking_number: generatedRef,
        interest,
        consent: true,
        source: 'website_quick_modal',
        notes: `Interest: ${interest} | Detail: ${businessOrCity.trim()}`,
      })
    );

    try {
      addLead({
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        email: email.trim(),
        city: businessOrCity.trim() || 'Nigeria',
        interest,
        status: 'new',
        notes: `Interest: ${interest} | Detail: ${businessOrCity.trim()}`,
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 350);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md transition-colors ${
        isLight ? 'bg-slate-900/60' : 'bg-[#01091C]/85'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`modal-step-${step}`}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className={`w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-2xl border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0A1B3D] border-2 border-[#14294F] text-[#F2F5F9]'
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-20 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                : 'bg-[#14294F] text-[#A8BBD6] hover:text-white'
            }`}
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00DF8F]">
                  PRIORITY ACCESS
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  {interest === 'pos-agent'
                    ? 'Request Smart POS'
                    : interest === 'business'
                    ? 'Axoora Business'
                    : 'Axoora Personal'}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                  Leave your details and our team will reach out on WhatsApp to assist you.
                </p>
              </div>

              {/* 3 Simple Choice Pills */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#020F2E] border border-slate-200 dark:border-[#14294F]">
                {[
                  { id: 'pos-agent' as const, label: 'Smart POS', icon: 'point_of_sale' },
                  { id: 'business' as const, label: 'Business', icon: 'storefront' },
                  { id: 'personal' as const, label: 'Personal', icon: 'smartphone' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInterest(tab.id)}
                    className={`py-1.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      interest === tab.id
                        ? 'bg-[#00DF8F] text-[#003825] shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Al-Hassan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  WhatsApp Number *
                </label>
                <div className="relative flex">
                  <span
                    className={`px-3 py-2.5 rounded-l-xl border-y border-l text-xs font-bold flex items-center gap-1 shrink-0 ${
                      isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-[#040D21] border-[#14294F] text-slate-300'
                    }`}
                  >
                    🇳🇬 +234
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="803 123 4567"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className={`flex-1 px-3.5 py-2.5 rounded-r-xl border text-sm font-mono font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {interest === 'personal' ? 'City' : 'Shop Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={interest === 'personal' ? 'e.g. Abuja' : 'e.g. Al-Hassan Store'}
                    value={businessOrCity}
                    onChange={(e) => setBusinessOrCity(e.target.value)}
                    className={`px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-2xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>Submit Details</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="text-xl font-black">Thank you, {fullName}!</h3>
              <p className={`text-xs max-w-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                We’ve received your details. Our team will contact you on WhatsApp at <strong className="text-slate-900 dark:text-white">{whatsappNumber}</strong> shortly.
              </p>
              <div className="w-full flex flex-col gap-2 pt-2">
                <a
                  href={`https://wa.me/2349012345678?text=${encodeURIComponent(
                    `Hi Axoora! I just submitted my details (${fullName}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Chat with Us on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isLight ? 'bg-slate-100 text-slate-700' : 'bg-[#14294F] text-white'
                  }`}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
