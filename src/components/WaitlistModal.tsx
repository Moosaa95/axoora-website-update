import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistSubmission } from '../types';
import { useCms } from '../context/CmsContext';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: 'personal' | 'business' | 'pos-agent' | 'aggregator';
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = 'personal',
}) => {
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>(defaultInterest);
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { addLead } = useCms();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappNumber.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name, WhatsApp number, and email.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept data consent to proceed.');
      return;
    }

    const submission: WaitlistSubmission = {
      fullName,
      whatsappNumber,
      email,
      city: city.trim() || undefined,
      interest,
      consent,
    };

    try {
      addLead({
        fullName,
        whatsappNumber,
        email,
        city: city.trim() || 'Nigeria',
        interest,
        status: 'new',
        notes: `Submitted for ${interest}`,
      });
    } catch {
      // fallback
    }

    try {
      const existing = JSON.parse(localStorage.getItem('axoora_waitlist') || '[]');
      existing.push({ ...submission, submittedAt: new Date().toISOString() });
      localStorage.setItem('axoora_waitlist', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setWhatsappNumber('');
    setEmail('');
    setCity('');
    setConsent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#01091C]/80 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-lg bg-[#0A1B3D] border-2 border-[#14294F] rounded-3xl p-6 sm:p-8 text-[#F2F5F9] relative shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {!isSubmitted ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#020F2E] border border-[#14294F] w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                  <span className="text-xs font-mono font-medium text-[#00DF8F] uppercase tracking-wider">
                    PRIORITY ONBOARDING ACCESS
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#F2F5F9] tracking-tight">
                  Join Axoora
                </h3>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Be the first to access dual-currency cards, WhatsApp banking, merchant accounts, and zero-drop 4G POS terminals.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-[#FF6A6A]/10 border border-[#FF6A6A]/30 text-[#FF6A6A] text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#A8BBD6] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adaeze Okonkwo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#A8BBD6] mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#A8BBD6] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="adaeze@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#A8BBD6] mb-1.5">
                      Primary Product Interest
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] text-sm focus:outline-none focus:border-[#0D95FE] transition-colors cursor-pointer"
                    >
                      <option value="personal">Axoora Personal (Cards, Save &amp; Earn)</option>
                      <option value="business">Axoora Business (Shop Account &amp; Ops)</option>
                      <option value="pos-agent">POS Terminals (Apex 4G Agent hardware)</option>
                      <option value="aggregator">POS Aggregator (Fleet management)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#A8BBD6] mb-1.5">
                      City / State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abuja (FCT)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#0D95FE] cursor-pointer"
                  />
                  <label htmlFor="consentCheckbox" className="text-xs text-[#A8BBD6] cursor-pointer leading-normal">
                    I agree to be contacted by Axoora for account onboarding. NDPR certified. Axoora will never ask for your PIN or OTP.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-[#002447] hover:text-[#003825] font-extrabold text-sm transition-all shadow-lg shadow-[#0D95FE]/20 cursor-pointer mt-1"
                >
                  Confirm Priority Access
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-16 h-16 rounded-2xl bg-[#00DF8F]/20 border border-[#00DF8F]/40 text-[#00DF8F] flex items-center justify-center font-bold text-2xl">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-black text-[#F2F5F9]">You're on the Priority List</h3>
                <p className="text-sm text-[#A8BBD6] leading-relaxed max-w-sm">
                  Thank you, <span className="text-[#00DF8F] font-semibold">{fullName}</span>. Our Abuja team will dispatch your invite link and account onboarding instructions via WhatsApp.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-2xl bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] text-sm font-bold transition-all cursor-pointer mt-2"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
