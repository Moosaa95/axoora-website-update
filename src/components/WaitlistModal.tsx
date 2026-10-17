'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistSubmission } from '../types';
import { useCms } from '../context/CmsContext';
import { useTheme } from '../context/ThemeContext';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: 'personal' | 'business' | 'pos-agent' | 'aggregator';
}

const BUSINESS_CATEGORIES = [
  { id: 'retail', label: 'Retail & Supermarket', icon: 'storefront', example: 'provisions, boutique, electronics' },
  { id: 'food', label: 'Food & Hospitality', icon: 'restaurant', example: 'restaurants, cafes, bakeries, catering' },
  { id: 'services', label: 'Professional & Tech', icon: 'laptop_mac', example: 'consulting, design, agencies, clinics' },
  { id: 'logistics', label: 'Logistics & Wholesale', icon: 'local_shipping', example: 'FMCG distribution, transport, imports' },
  { id: 'trades', label: 'Artisan & Trades', icon: 'handyman', example: 'tailoring, carpentry, repairs, salons' },
  { id: 'merchant', label: 'General Commerce', icon: 'shopping_bag', example: 'market stalls, sole traders, merchants' },
];

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = 'business',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Multi-step state: 1 (Email & intent) -> 2 (Details & Business categorization) -> 3 (Confirmation & QR)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [interest, setInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>(defaultInterest);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [businessCategory, setBusinessCategory] = useState<string>('retail');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [consent, setConsent] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { addLead } = useCms();

  // Reset to initial when opened
  React.useEffect(() => {
    if (isOpen) {
      setInterest(defaultInterest);
      setStep(1);
      setErrorMsg('');
    }
  }, [isOpen, defaultInterest]);

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address to get started.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappNumber.trim()) {
      setErrorMsg('Please provide your name and WhatsApp number.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept data consent to complete your application.');
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
        fullName: businessName ? `${fullName} (${businessName})` : fullName,
        whatsappNumber,
        email,
        city: city.trim() || 'Nigeria',
        interest,
        status: 'new',
        notes: `Category: ${businessCategory} | Product: ${interest}`,
      });
    } catch {
      // fallback
    }

    try {
      const existing = JSON.parse(localStorage.getItem('axoora_waitlist') || '[]');
      existing.push({
        ...submission,
        businessName,
        businessCategory,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('axoora_waitlist', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setErrorMsg('');
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setEmail('');
    setFullName('');
    setWhatsappNumber('');
    setBusinessName('');
    setCity('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md transition-colors ${
        isLight ? 'bg-slate-900/60' : 'bg-[#01091C]/85'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`modal-step-${step}`}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-xl rounded-3xl p-6 sm:p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto border transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0A1B3D] border-2 border-[#14294F] text-[#F2F5F9]'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-20 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                : 'bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B]'
            }`}
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Top Progress indicator (Steps 1 & 2) */}
          {step !== 3 && (
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= 1 ? 'bg-[#0D95FE]' : isLight ? 'bg-slate-200' : 'bg-white/10'
                }`}
              />
              <div
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= 2 ? 'bg-[#00DF8F]' : isLight ? 'bg-slate-200' : 'bg-white/10'
                }`}
              />
              <span
                className={`text-[11px] font-mono font-bold uppercase tracking-wider ml-1 ${
                  isLight ? 'text-slate-500' : 'text-[#7B9CD2]'
                }`}
              >
                Step {step} of 2
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 1: ZERO-FRICTION EMAIL FIRST (MONZO-STYLE STREAMLINED ENTRY) */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div
                  className={`inline-flex items-center gap-2 py-1 px-3 rounded-full border w-fit ${
                    isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-[#020F2E] border-[#14294F]'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                  <span
                    className={`text-xs font-mono font-medium uppercase tracking-wider ${
                      isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                    }`}
                  >
                    FREE ACCOUNT · ZERO PAPERWORK
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
                    isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                  }`}
                >
                  Apply for an Axoora account
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  Takes about 2 minutes from your browser. Dedicated NUBAN account in your name, instant 0% fee transfers, and WhatsApp AI banking.
                </p>
              </div>

              {/* Account Intent Selector Pills */}
              <div className="flex flex-col gap-1.5">
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-[#A8BBD6]'
                  }`}
                >
                  Account Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInterest('business')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      interest === 'business'
                        ? 'bg-[#0D95FE]/15 border-[#0D95FE] text-[#0D95FE] font-bold shadow-sm'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#020F2E] border-[#14294F] text-[#A8BBD6] hover:bg-[#14294F]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">storefront</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold">Business Banking</span>
                      <span className="text-[10px] opacity-75">Shop &amp; CAC Accounts</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterest('personal')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      interest === 'personal'
                        ? 'bg-[#00DF8F]/15 border-[#00DF8F] text-[#00A884] font-bold shadow-sm'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#020F2E] border-[#14294F] text-[#A8BBD6] hover:bg-[#14294F]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold">Personal Banking</span>
                      <span className="text-[10px] opacity-75">Cards, Save &amp; Earn</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Single High-Clarity Email Form */}
              <form onSubmit={handleStep1Continue} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="emailInput"
                    className={`block text-xs font-mono font-semibold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-[#A8BBD6]'
                    }`}
                  >
                    Enter your email address to get started *
                  </label>
                  <input
                    id="emailInput"
                    type="email"
                    required
                    autoFocus
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:border-[#0D95FE] transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white shadow-xs'
                        : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9] placeholder-[#A8BBD6]/40'
                    }`}
                  />
                  <p
                    className={`text-[11px] mt-1.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    We’ll send your priority onboarding link here. Zero spam.
                  </p>
                </div>

                {/* Continue CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm transition-all shadow-lg shadow-[#0D95FE]/25 cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>Continue</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                {/* Monzo-Style Social Proof Banner */}
                <div
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-[#020F2E] border-[#14294F] text-[#A8BBD6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00DF8F] shrink-0">
                    verified_user
                  </span>
                  <span>
                    Join <strong>14,000+ businesses and individuals</strong> banking with Axoora in Nigeria.
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: HUMAN BUSINESS CLASSIFICATION & CONTACT INFO */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-xl sm:text-2xl font-black tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                    }`}
                  >
                    {interest === 'business'
                      ? 'What kind of business do you run?'
                      : 'Tell us a bit about you'}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 ${
                      isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                    }`}
                  >
                    {interest === 'business'
                      ? 'Choose the option that best fits your enterprise'
                      : 'To personalize your dual-currency cards and WhatsApp access'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4">
                {/* Business Categories Grid (Monzo-inspired) */}
                {interest === 'business' && (
                  <div className="grid grid-cols-2 gap-2">
                    {BUSINESS_CATEGORIES.map((cat) => {
                      const isSelected = businessCategory === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setBusinessCategory(cat.id)}
                          className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0D95FE]/15 border-[#0D95FE] text-slate-900 shadow-sm'
                              : isLight
                              ? 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                              : 'bg-[#020F2E] border-[#14294F] hover:border-[#1E3A6B] text-[#A8BBD6]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                isSelected ? 'text-[#0D95FE]' : 'text-slate-400'
                              }`}
                            >
                              {cat.icon}
                            </span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#0D95FE] bg-[#0D95FE]'
                                  : 'border-slate-400'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold mt-1.5 leading-tight ${
                              isSelected
                                ? isLight
                                  ? 'text-slate-900 font-extrabold'
                                  : 'text-white'
                                : ''
                            }`}
                          >
                            {cat.label}
                          </span>
                          <span className="text-[9.5px] opacity-70 truncate mt-0.5">
                            {cat.example}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      className={`block text-xs font-mono font-semibold uppercase tracking-wider mb-1 ${
                        isLight ? 'text-slate-700' : 'text-[#A8BBD6]'
                      }`}
                    >
                      {interest === 'business' ? 'Contact Person Name *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adaeze Bello"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#0D95FE] ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-mono font-semibold uppercase tracking-wider mb-1 ${
                        isLight ? 'text-slate-700' : 'text-[#A8BBD6]'
                      }`}
                    >
                      {interest === 'business' ? 'Business / Trade Name' : 'City / State'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        interest === 'business'
                          ? 'e.g. Bello Logistics Ltd'
                          : 'e.g. Abuja (FCT)'
                      }
                      value={interest === 'business' ? businessName : city}
                      onChange={(e) =>
                        interest === 'business'
                          ? setBusinessName(e.target.value)
                          : setCity(e.target.value)
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#0D95FE] ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>
                </div>

                {/* WhatsApp Phone Number */}
                <div>
                  <label
                    className={`block text-xs font-mono font-semibold uppercase tracking-wider mb-1 ${
                      isLight ? 'text-slate-700' : 'text-[#A8BBD6]'
                    }`}
                  >
                    WhatsApp Number (for instant AI banking &amp; invite) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      🇳🇬 +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="803 123 4567"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full pl-20 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#0D95FE] font-mono ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                          : 'bg-[#020F2E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-[#0D95FE] cursor-pointer"
                  />
                  <label
                    htmlFor="consentCheckbox"
                    className={`text-[11px] leading-snug cursor-pointer ${
                      isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                    }`}
                  >
                    I agree to receive account notifications and setup instructions from Axoora. NDPR certified. Axoora will never ask for your PIN or OTP.
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-[#020F2E] hover:bg-[#14294F] border-[#14294F] text-[#A8BBD6]'
                    }`}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#00DF8F] hover:bg-[#00c57d] text-[#003825] font-extrabold text-sm transition-all shadow-md shadow-[#00DF8F]/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Application</span>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: INSTANT ONBOARDING CONFIRMATION & APP/QR CODE HANDOFF (MONZO STYLE) */}
          {/* ========================================================================= */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-16 h-16 rounded-3xl bg-[#00DF8F]/20 border border-[#00DF8F]/40 text-[#00DF8F] flex items-center justify-center text-3xl shadow-lg">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>

              <div className="flex flex-col gap-1.5 max-w-md">
                <h3
                  className={`text-2xl sm:text-3xl font-black ${
                    isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                  }`}
                >
                  Application Received!
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                  }`}
                >
                  Welcome aboard, <strong className="text-[#0D95FE]">{fullName}</strong>. We've reserved your priority spot and sent a magic setup link to <strong className={isLight ? 'text-slate-800' : 'text-white'}>{email}</strong>.
                </p>
              </div>

              {/* Monzo-Style Desktop QR Code & Mobile App Handoff Box */}
              <div
                className={`w-full p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 text-left shadow-sm ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#020F2E] border-[#14294F]'
                }`}
              >
                {/* Visual QR Code Box */}
                <div className="w-24 h-24 rounded-xl bg-white p-2 border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <div className="w-full h-full bg-slate-900 rounded-sm p-1 grid grid-cols-4 grid-rows-4 gap-0.5">
                    <div className="bg-white rounded-xs col-span-2 row-span-2" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-white rounded-xs col-span-2 row-span-2" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-white rounded-xs" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Open with your phone
                  </span>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
                    }`}
                  >
                    Scan this QR code with your camera to open the app directly on your phone or check your email for the magic link.
                  </p>
                </div>
              </div>

              {/* 1-Tap WhatsApp AI Test Drive Button */}
              <a
                href={`https://wa.me/2349012345678?text=${encodeURIComponent(
                  `Hi Axoora AI! I just applied for an account (${email}). Can I test out sending money with zero fees?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#00A884] hover:bg-[#008F6F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00A884]/25 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Test Drive Axoora AI on WhatsApp Now</span>
              </a>

              <button
                onClick={handleReset}
                className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isLight
                    ? 'text-slate-500 hover:text-slate-900'
                    : 'text-[#A8BBD6] hover:text-white'
                }`}
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
