import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistSubmission } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappNumber.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name, WhatsApp number, and email.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please confirm that Axoora may contact you when we are live.');
      return;
    }

    const submission: WaitlistSubmission = {
      fullName,
      whatsappNumber,
      email,
      city,
      interest,
      consent,
    };

    // Store in localStorage as demonstration of persisted submission
    try {
      const existing = JSON.parse(localStorage.getItem('axoora_waitlist') || '[]');
      existing.push({ ...submission, submittedAt: new Date().toISOString() });
      localStorage.setItem('axoora_waitlist', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    setErrorMsg('');
    setIsSubmitted(true);
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
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-lg bg-[#0A1B3D] border-2 border-[#14294F] rounded-3xl p-6 sm:p-8 text-[#F2F5F9] relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
              <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
                Official Waitlist
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2F5F9] mb-2">
              Get notified when we are live
            </h3>
            <p className="text-sm text-[#A8BBD6] leading-relaxed mb-6">
              Be among the first to experience Axoora AI on WhatsApp, manage your business with clean Islamic-compliant tools, or deploy high-uptime POS terminals.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A8BBD6] mb-1.5">
                  Full Name <span className="text-[#0D95FE]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Bello or Ibrahim Danladi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A8BBD6] mb-1.5">
                    WhatsApp Number <span className="text-[#0D95FE]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A8BBD6] mb-1.5">
                    Email Address <span className="text-[#0D95FE]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A8BBD6] mb-1.5">
                  City / State <span className="text-[#A8BBD6]/60 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abuja, Kano, Lagos, Port Harcourt"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40 text-sm focus:outline-none focus:border-[#0D95FE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A8BBD6] mb-2">
                  Which part do you care about most?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'personal', label: 'Axoora AI (Personal)' },
                    { id: 'business', label: 'Axoora Business (Shop)' },
                    { id: 'pos-agent', label: 'POS Terminal / Agent' },
                    { id: 'aggregator', label: 'Aggregator Network' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setInterest(opt.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                        interest === opt.id
                          ? 'bg-[#14294F] border-[#0D95FE] text-[#F2F5F9]'
                          : 'bg-[#020F2E]/60 border-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#14294F] bg-[#020F2E] text-[#0D95FE] focus:ring-0"
                  />
                  <span className="text-xs text-[#A8BBD6] leading-relaxed">
                    I agree that Axoora may contact me by WhatsApp or email when service is live.
                  </span>
                </label>
              </div>

              {/* Safety notice as per brief */}
              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex items-center gap-2.5 text-xs text-[#A8BBD6]">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified_user</span>
                <span>
                  This is not account opening. We will never ask for your BVN, NIN, or password on this website.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer mt-2"
              >
                Notify Me When We Are Live
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#00DF8F]/20 border-2 border-[#00DF8F] flex items-center justify-center text-[#00DF8F]">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>

            <h3 className="text-2xl font-bold text-[#F2F5F9]">
              Thank you, {fullName.split(' ')[0]}.
            </h3>

            <p className="text-sm text-[#A8BBD6] max-w-md leading-relaxed">
              We have noted your interest in <span className="text-[#F2F5F9] font-medium">{interest === 'personal' ? 'Axoora AI Personal Banking' : interest === 'business' ? 'Axoora Business' : interest === 'pos-agent' ? 'POS & Agent Banking' : 'Aggregator Networks'}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed max-w-md">
              We will send a welcome note to <span className="text-[#0D95FE] font-mono">{whatsappNumber}</span> and your email as our initial rollout commences. In the meantime, you can explore our stories and values.
            </div>

            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] font-semibold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
