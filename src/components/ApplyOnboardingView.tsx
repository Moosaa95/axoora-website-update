'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

interface ApplyOnboardingViewProps {
  initialInterest?: 'business' | 'pos-agent' | 'personal' | 'aggregator';
  onBack: () => void;
  onOpenWhatsApp?: () => void;
}

export const ApplyOnboardingView: React.FC<ApplyOnboardingViewProps> = ({
  initialInterest = 'business',
  onBack,
  onOpenWhatsApp,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const { addLead } = useCms();

  // Step state: 1 = Email & Profile, 2 = Magic Link Verification, 3 = Business & POS Details, 4 = Success
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [accountType, setAccountType] = useState<'business' | 'pos-agent' | 'personal'>(
    initialInterest === 'pos-agent' ? 'pos-agent' : initialInterest === 'personal' ? 'personal' : 'business'
  );

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Step 2: Verification Code
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  // Step 3: Business & POS Details
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<'ltd' | 'bn' | 'unregistered'>('bn');
  const [cacNumber, setCacNumber] = useState('');
  const [sector, setSector] = useState('Retail & Fashion');
  const [posModel, setPosModel] = useState<'apex-pro' | 'apex-pocket'>('apex-pro');
  const [terminalCount, setTerminalCount] = useState<number>(1);
  const [stateName, setStateName] = useState('Abuja FCT');
  const [cityName, setCityName] = useState('Wuse 2');
  const [streetAddress, setStreetAddress] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);

  // Success Step Data
  const [applicationRef, setApplicationRef] = useState('AXR-APP-8921-ABJ');
  const [trackingNumber, setTrackingNumber] = useState('AXR-POS-8921-ABJ');
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Countdown timer for email resend
  useEffect(() => {
    if (currentStep === 2 && resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, resendCountdown]);

  // Handle Step 1 Submit
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!fullName.trim()) {
      setEmailError('Please enter your full name.');
      return;
    }
    setEmailError('');
    setIsEmailSubmitting(true);

    // Simulate magic link sending
    setTimeout(() => {
      setIsEmailSubmitting(false);
      setCurrentStep(2);
      setResendCountdown(30);
    }, 700);
  };

  // Handle Code Change in Step 2
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-advance focus
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Quick Demo Auto-fill & Continue
  const handleAutofillCode = () => {
    setVerificationCode(['8', '2', '9', '1', '4', '0']);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep(3);
    }, 600);
  };

  const handleVerifyStep2 = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep(3);
    }, 600);
  };

  const handleResendEmail = () => {
    if (resendCountdown > 0) return;
    setResendCountdown(45);
    setResendSent(true);
    setTimeout(() => setResendSent(false), 3000);
  };

  // Handle Step 3 Submit
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinishing(true);

    const statePrefix = (stateName || 'LAG').slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedRef = `AXR-APP-${randomSuffix}-${statePrefix}`;
    const generatedTrk = `AXR-POS-${Math.floor(1000 + Math.random() * 9000)}-${statePrefix}`;
    setApplicationRef(generatedRef);
    setTrackingNumber(generatedTrk);

    // Save lead to CMS and localStorage
    try {
      addLead({
        fullName,
        whatsappNumber: phone || '+2348000000000',
        email,
        city: `${cityName}, ${stateName}`,
        interest: accountType === 'pos-agent' ? 'pos-agent' : accountType === 'personal' ? 'personal' : 'business',
        status: 'new',
        notes: `Application Ref: ${generatedRef}, Business: ${businessName || fullName}, CAC: ${cacNumber || 'N/A'}, POS: ${accountType === 'pos-agent' || accountType === 'business' ? `${terminalCount}x ${posModel}` : 'None'}`,
      });

      const existing = JSON.parse(localStorage.getItem('axoora_waitlist') || '[]');
      existing.push({
        fullName,
        email,
        phone,
        businessName,
        accountType,
        applicationRef: generatedRef,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('axoora_waitlist', JSON.stringify(existing));
    } catch {
      // Ignore fallback
    }

    setTimeout(() => {
      setIsFinishing(false);
      setCurrentStep(4);
    }, 800);
  };

  const copyToClipboard = (text: string, type: 'ref' | 'tracking') => {
    navigator.clipboard?.writeText(text);
    if (type === 'ref') {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } else {
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* Monzo-Style Clean Application Header */}
      <header
        className={`w-full border-b backdrop-blur-md sticky top-0 z-40 transition-colors ${
          isLight ? 'bg-white/90 border-slate-200' : 'bg-[#020F2E]/90 border-[#14294F]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Back */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  : 'bg-[#0A1B3D] border-[#14294F] hover:bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
              title="Return to website"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">Back to website</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#0D95FE]/20">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                  Axoora <span className="text-[#0D95FE]">Business</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Official Application
                </span>
              </div>
            </div>
          </div>

          {/* Right Header: Theme Toggle & Support */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenWhatsApp && (
              <button
                onClick={onOpenWhatsApp}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isLight
                    ? 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    : 'border-[#14294F] hover:bg-[#0A1B3D] text-[#A8BBD6]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">support_agent</span>
                <span>Need help?</span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#0A1B3D] border-[#14294F] text-slate-300 hover:text-white'
              }`}
              title="Toggle theme"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isLight ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Column Monzo-Style Application Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: The Interactive Application Flow */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Step Progress Tracker */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
                <span className="font-semibold text-[#0D95FE]">
                  Step {currentStep} of 4: {
                    currentStep === 1
                      ? 'Email & Account'
                      : currentStep === 2
                      ? 'Email Verification'
                      : currentStep === 3
                      ? 'Business & POS Setup'
                      : 'Account Activated'
                  }
                </span>
                <span className="font-mono">{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#14294F]'}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0D95FE] to-[#00DF8F]"
                  initial={{ width: '25%' }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* STEP 1: Email & Account Type (Monzo First Screen) */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D95FE]/10 border border-[#0D95FE]/20 text-[#0D95FE] text-xs font-bold mb-3">
                      <span className="material-symbols-outlined text-[15px]">verified_user</span>
                      <span>Instant Digital Onboarding</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                      {accountType === 'pos-agent'
                        ? 'Request your Axoora Smart POS'
                        : 'Apply for an Axoora Business Account'}
                    </h1>
                    <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      Join 45,000+ businesses across Nigeria. Get your dedicated commercial NUBAN, 0% halal stock float, and fast 4G POS terminal.
                    </p>
                  </div>

                  {/* Account Choice Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Select What You Need:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAccountType('business')}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          accountType === 'business'
                            ? 'border-[#0D95FE] bg-[#0D95FE]/10 ring-2 ring-[#0D95FE]/30'
                            : isLight
                            ? 'border-slate-200 bg-white hover:border-slate-300'
                            : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="material-symbols-outlined text-[#0D95FE] text-[22px]">storefront</span>
                          {accountType === 'business' && (
                            <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">check_circle</span>
                          )}
                        </div>
                        <div className="font-extrabold text-sm">Business Account</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Account &amp; cash float</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType('pos-agent')}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          accountType === 'pos-agent'
                            ? 'border-[#00DF8F] bg-[#00DF8F]/10 ring-2 ring-[#00DF8F]/30'
                            : isLight
                            ? 'border-slate-200 bg-white hover:border-slate-300'
                            : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="material-symbols-outlined text-[#00DF8F] text-[22px]">point_of_sale</span>
                          {accountType === 'pos-agent' && (
                            <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">check_circle</span>
                          )}
                        </div>
                        <div className="font-extrabold text-sm">Smart 4G POS</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Dual-SIM Apex Terminal</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType('personal')}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          accountType === 'personal'
                            ? 'border-[#F2A93B] bg-[#F2A93B]/10 ring-2 ring-[#F2A93B]/30'
                            : isLight
                            ? 'border-slate-200 bg-white hover:border-slate-300'
                            : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="material-symbols-outlined text-[#F2A93B] text-[22px]">person</span>
                          {accountType === 'personal' && (
                            <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">check_circle</span>
                          )}
                        </div>
                        <div className="font-extrabold text-sm">Personal Banking</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Zero fees & virtual card</div>
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleStep1Submit} className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Fatima Al-Hassan or Emeka Chukwu"
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                        }`}
                      />
                    </div>

                    {/* Email Input (Monzo Highlighted Element) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>{accountType === 'personal' ? 'Email Address' : 'Business Email Address'}</span>
                        <span className="text-[11px] font-normal text-slate-400 lowercase">We'll send your magic login link</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                          mail
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="fatima@alhassanfabrics.ng"
                          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                              : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        WhatsApp / Mobile Number
                      </label>
                      <div className="relative flex">
                        <div
                          className={`px-3.5 py-3.5 rounded-l-xl border-y border-l text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                            isLight
                              ? 'bg-slate-100 border-slate-300 text-slate-700'
                              : 'bg-[#081532] border-[#14294F] text-slate-300'
                          }`}
                        >
                          <span>🇳🇬</span>
                          <span>+234</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="803 123 4567"
                          className={`flex-1 px-4 py-3.5 rounded-r-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                              : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                          }`}
                        />
                      </div>
                    </div>

                    {emailError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        <span>{emailError}</span>
                      </div>
                    )}

                    {/* Bank-Grade Security Assurance Note (Monzo Style) */}
                    <div
                      className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#0A1B3D]/60 border-[#14294F] text-[#A8BBD6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#00DF8F] text-[20px] shrink-0">lock</span>
                      <p className="text-xs leading-relaxed">
                        Bank-grade 256-bit encryption. Your details are secured and cross-verified via CBN-licensed NIBSS rails.
                      </p>
                    </div>

                    {/* Submit CTA with Loading State */}
                    <button
                      type="submit"
                      disabled={isEmailSubmitting}
                      className="w-full mt-2 py-4 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D95FE]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isEmailSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending magic verification link...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400 pt-1">
                      By continuing, you agree to Axoora's Terms of Service and NDIC Data Protection Guarantee.
                    </p>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Follow These Steps / Magic Link Verification (Exact Monzo Video Screen) */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  {/* Top Notification Icon */}
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0D95FE]/20 to-[#00DF8F]/20 border border-[#0D95FE]/30 flex items-center justify-center text-[#0D95FE]">
                      <span className="material-symbols-outlined text-[32px] animate-bounce">mark_email_read</span>
                    </div>

                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                        Follow these steps to continue
                      </h1>
                      <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                        We sent a magic sign-in link to <span className="font-bold text-slate-900 dark:text-white underline">{email}</span>.
                      </p>
                    </div>
                  </div>

                  {/* Monzo Numbered Steps Card */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border flex flex-col gap-5 ${
                      isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0A1B3D] border-[#14294F]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#0D95FE]/20 text-[#0D95FE] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Open your email inbox</span>
                        <span className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                          Check on this computer or open the email on your phone.
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#14294F]" />

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#0D95FE]/20 text-[#0D95FE] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Tap the secure link from Axoora</span>
                        <span className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                          The link expires in 15 minutes and requires no passwords.
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-200 dark:bg-[#14294F]" />

                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Confirm business details & dispatch POS</span>
                        <span className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                          Provide CAC/RC number (if available) and select your doorstep delivery address.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email Providers Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-[#14294F] hover:bg-[#1E3A6B] border-[#1E3A6B] text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-red-400">mail</span>
                      <span>Open Gmail</span>
                    </a>

                    <a
                      href="https://outlook.live.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-[#14294F] hover:bg-[#1E3A6B] border-[#1E3A6B] text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">mail</span>
                      <span>Open Outlook</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={resendCountdown > 0}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        resendCountdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                        isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-[#0A1B3D] hover:bg-[#14294F] border-[#14294F] text-[#A8BBD6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      <span>
                        {resendCountdown > 0 ? `Resend email in ${resendCountdown}s` : 'Resend email'}
                      </span>
                    </button>
                  </div>

                  {resendSent && (
                    <div className="p-3 rounded-xl bg-[#00DF8F]/10 border border-[#00DF8F]/30 text-[#00DF8F] text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>A fresh verification link has been dispatched to your inbox!</span>
                    </div>
                  )}

                  {/* Browser Interactive Code Simulation (Ensures seamless preview experience without leaving tab) */}
                  <div
                    className={`mt-2 p-5 rounded-2xl border flex flex-col gap-3.5 ${
                      isLight ? 'bg-sky-50/60 border-sky-100' : 'bg-[#06173B] border-[#0D95FE]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">verified</span>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D95FE]">
                          Instant Preview Verification
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAutofillCode}
                        className="text-[11px] font-bold text-[#0D95FE] hover:underline cursor-pointer"
                      >
                        Autofill Demo Code & Continue
                      </button>
                    </div>

                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      Enter the 6-digit confirmation code below or click the autofill shortcut above to test the full flow:
                    </p>

                    <div className="flex items-center justify-between gap-2 max-w-sm">
                      {verificationCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`digit-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeChange(idx, e.target.value)}
                          className={`w-11 h-12 text-center text-lg font-mono font-black rounded-xl border outline-none transition-all ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE] focus:ring-2 focus:ring-[#0D95FE]/20'
                              : 'bg-[#0A1B3D] border-[#14294F] text-white focus:border-[#0D95FE] focus:ring-2 focus:ring-[#0D95FE]/30'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleVerifyStep2}
                        disabled={isVerifying}
                        className="flex-1 py-3 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#0D95FE]/20"
                      >
                        {isVerifying ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm & Continue to Setup</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white px-2 py-3"
                      >
                        Edit email
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Business Details & POS Hardware Setup */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F]/20 text-[#00DF8F] text-xs font-bold mb-3">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Email Verified · Step 3 of 4</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      Tell us about your business
                    </h1>
                    <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                      Your business account application and merchant profile will be reviewed under these details.
                    </p>
                  </div>

                  <form onSubmit={handleStep3Submit} className="flex flex-col gap-5">
                    {/* Business Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Trading / Shop Name
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Al-Hassan Luxury Fabrics & Haute Couture"
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                        }`}
                      />
                    </div>

                    {/* CAC Structure */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Business Registration Status
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setBusinessType('bn')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            businessType === 'bn'
                              ? 'border-[#0D95FE] bg-[#0D95FE]/10 text-[#0D95FE]'
                              : isLight
                              ? 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                              : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B] text-[#A8BBD6]'
                          }`}
                        >
                          Registered BN (Enterprise)
                        </button>

                        <button
                          type="button"
                          onClick={() => setBusinessType('ltd')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            businessType === 'ltd'
                              ? 'border-[#0D95FE] bg-[#0D95FE]/10 text-[#0D95FE]'
                              : isLight
                              ? 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                              : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B] text-[#A8BBD6]'
                          }`}
                        >
                          Limited Liability (LTD / RC)
                        </button>

                        <button
                          type="button"
                          onClick={() => setBusinessType('unregistered')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            businessType === 'unregistered'
                              ? 'border-[#0D95FE] bg-[#0D95FE]/10 text-[#0D95FE]'
                              : isLight
                              ? 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                              : 'border-[#14294F] bg-[#0A1B3D] hover:border-[#1E3A6B] text-[#A8BBD6]'
                          }`}
                        >
                          Starter / No CAC yet
                        </button>
                      </div>
                    </div>

                    {/* CAC Number (If registered) */}
                    {businessType !== 'unregistered' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>CAC Registration Number (RC / BN)</span>
                          <span className="text-[11px] text-[#00DF8F]">Instant CAC registry verification</span>
                        </label>
                        <input
                          type="text"
                          value={cacNumber}
                          onChange={(e) => setCacNumber(e.target.value)}
                          placeholder="RC-1948201 or BN-3829104"
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                              : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                          }`}
                        />
                      </div>
                    )}

                    {/* Business Sector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Primary Business Industry
                      </label>
                      <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-[#0D95FE]'
                            : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] focus:border-[#0D95FE]'
                        }`}
                      >
                        <option value="Retail & Fashion">Fashion, Textiles & Apparel</option>
                        <option value="Supermarkets & Groceries">Supermarkets & Provision Stores</option>
                        <option value="Restaurants & Food">Restaurants, Lounges & Bakeries</option>
                        <option value="Pharmacy & Health">Pharmacy, Clinics & Healthcare</option>
                        <option value="Electronics & Tech">Electronics, Phones & Hardware</option>
                        <option value="Automotive & Spare Parts">Automotive & Spare Parts</option>
                        <option value="Wholesale & Distribution">Wholesale & FMCG Distribution</option>
                        <option value="Professional Services">Professional & Digital Services</option>
                      </select>
                    </div>

                    {/* POS Hardware Configuration (If POS mode or business requested) */}
                    {(accountType === 'pos-agent' || accountType === 'business') && (
                      <div
                        className={`p-5 rounded-2xl border flex flex-col gap-4 mt-2 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A1B3D]/80 border-[#14294F]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">
                              point_of_sale
                            </span>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                              Axoora Smart POS Dispatch Setup
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-[#00DF8F] px-2 py-0.5 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F]/20">
                            48hr Free Courier Delivery
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPosModel('apex-pro')}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              posModel === 'apex-pro'
                                ? 'border-[#00DF8F] bg-[#00DF8F]/10 ring-2 ring-[#00DF8F]/30'
                                : isLight
                                ? 'border-slate-200 bg-white hover:border-slate-300'
                                : 'border-[#14294F] bg-[#081532] hover:border-[#1E3A6B]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-extrabold text-sm">Axoora Apex Pro 4G</span>
                              <span className="text-[10px] font-bold text-[#00DF8F]">Popular</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Dual-SIM auto failover, built-in high speed thermal printer, 5000mAh battery.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPosModel('apex-pocket')}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              posModel === 'apex-pocket'
                                ? 'border-[#00DF8F] bg-[#00DF8F]/10 ring-2 ring-[#00DF8F]/30'
                                : isLight
                                ? 'border-slate-200 bg-white hover:border-slate-300'
                                : 'border-[#14294F] bg-[#081532] hover:border-[#1E3A6B]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-extrabold text-sm">Axoora Apex Pocket</span>
                              <span className="text-[10px] font-bold text-[#0D95FE]">Compact</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Ultra-lightweight mobile POS for delivery dispatchers and outdoor stalls.
                            </p>
                          </button>
                        </div>

                        {/* Terminal Count */}
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-400">
                            Quantity of Terminals Needed:
                          </label>
                          <div className="flex items-center gap-3">
                            {[1, 2, 3, 5].map((count) => (
                              <button
                                key={count}
                                type="button"
                                onClick={() => setTerminalCount(count)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  terminalCount === count
                                    ? 'bg-[#00DF8F] text-[#003825]'
                                    : isLight
                                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    : 'bg-[#14294F] text-slate-300 hover:bg-[#1E3A6B]'
                                }`}
                              >
                                {count}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase">State</label>
                            <select
                              value={stateName}
                              onChange={(e) => setStateName(e.target.value)}
                              className={`px-3 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                                isLight ? 'bg-white border-slate-300' : 'bg-[#081532] border-[#14294F] text-white'
                              }`}
                            >
                              <option value="Abuja FCT">Abuja FCT</option>
                              <option value="Lagos">Lagos State</option>
                              <option value="Kano">Kano State</option>
                              <option value="Rivers">Rivers (Port Harcourt)</option>
                              <option value="Oyo">Oyo (Ibadan)</option>
                              <option value="Kaduna">Kaduna State</option>
                              <option value="Enugu">Enugu State</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase">City / Area</label>
                            <input
                              type="text"
                              value={cityName}
                              onChange={(e) => setCityName(e.target.value)}
                              placeholder="e.g. Wuse 2 or Ikeja"
                              className={`px-3 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                                isLight ? 'bg-white border-slate-300' : 'bg-[#081532] border-[#14294F] text-white'
                              }`}
                            />
                          </div>

                          <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase">
                              Physical Store Address for Courier Dispatch
                            </label>
                            <input
                              type="text"
                              required
                              value={streetAddress}
                              onChange={(e) => setStreetAddress(e.target.value)}
                              placeholder="e.g. Suite 42, Cappador Mall, Aminu Kano Crescent"
                              className={`px-3 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                                isLight ? 'bg-white border-slate-300' : 'bg-[#081532] border-[#14294F] text-white'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isFinishing}
                      className="w-full mt-2 py-4 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D95FE]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isFinishing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting application for KYC review...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application for Review</span>
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Application Submitted & Review Status */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#00DF8F] to-[#0D95FE] flex items-center justify-center text-[#003825] shadow-xl shadow-[#00DF8F]/20">
                      <span className="material-symbols-outlined text-[36px] font-black">mark_email_read</span>
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                        Application Successfully Submitted!
                      </h1>
                      <p className={`mt-1.5 text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                        Thank you, <span className="font-bold text-slate-900 dark:text-white">{fullName}</span>. Your application for <span className="font-bold text-[#0D95FE]">{businessName || 'your business'}</span> has been received and logged for compliance review.
                      </p>
                    </div>
                  </div>

                  {/* Application Reference & Verification Status Card */}
                  <div
                    className={`p-6 rounded-3xl border-2 relative overflow-hidden ${
                      isLight
                        ? 'bg-gradient-to-br from-white to-slate-50 border-[#0D95FE]/30 shadow-xl'
                        : 'bg-gradient-to-br from-[#0A1B3D] to-[#081532] border-[#0D95FE]/40 shadow-2xl'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                          Under KYC Review · 24hr Target
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-[#00DF8F] text-[11px] font-mono font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">shield</span>
                        <span>CBN Supervised</span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-4">
                      <div>
                        <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Application Reference ID</div>
                        <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                          {applicationRef}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(applicationRef, 'ref')}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto ${
                          copiedRef
                            ? 'bg-[#00DF8F] text-[#003825] border-[#00DF8F]'
                            : isLight
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                            : 'bg-[#14294F] hover:bg-[#1E3A6B] border-[#1E3A6B] text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedRef ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedRef ? 'Copied Ref!' : 'Copy Reference ID'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-[#14294F] text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Trading Name</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                          {businessName || fullName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Service Applied For</span>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {accountType === 'pos-agent' ? 'POS Agent Merchant' : accountType === 'personal' ? 'Personal Account' : 'Business Account'}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-slate-400 text-[11px] block">Verification Speed</span>
                        <span className="font-bold text-emerald-600 dark:text-[#00DF8F] block">
                          Usually within 24 hours
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clear What Happens Next Timeline */}
                  <div
                    className={`p-5 rounded-2xl border flex flex-col gap-3.5 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A1B3D] border-[#14294F]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0D95FE] text-[20px]">
                        fact_check
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                        What Happens Next
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-[#0D95FE] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">KYC &amp; CAC Document Review:</span>{' '}
                          <span className="text-slate-500 dark:text-slate-400">
                            Our compliance desk validates your identity, business details, and CAC filing against regulatory databases.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-[#00DF8F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">Official Account Number Allocation:</span>{' '}
                          <span className="text-slate-500 dark:text-slate-400">
                            Upon verification approval, your official business NUBAN is assigned and sent straight to {email} and via SMS.
                          </span>
                        </div>
                      </div>

                      {(accountType === 'pos-agent' || accountType === 'business') && (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            3
                          </div>
                          <div className="text-xs">
                            <span className="font-bold text-slate-900 dark:text-white">Smart POS Terminal Configuration &amp; Courier:</span>{' '}
                            <span className="text-slate-500 dark:text-slate-400">
                              Your {terminalCount}x {posModel === 'apex-pro' ? 'Apex Pro 4G' : 'Apex Pocket'} terminal is provisioned to your merchant profile and dispatched for delivery.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hardware Courier Request Summary (if POS was requested) */}
                  {(accountType === 'pos-agent' || accountType === 'business') && (
                    <div
                      className={`p-5 rounded-2xl border flex flex-col gap-3 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A1B3D] border-[#14294F]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">
                            local_shipping
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            Terminal Delivery Request Logged
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-amber-500">
                          Pending KYC Approval
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Your requested {terminalCount}x {posModel === 'apex-pro' ? 'Apex Pro 4G' : 'Apex Pocket'} terminal order will be dispatched to{' '}
                        <span className="text-slate-700 dark:text-slate-200 font-medium">
                          {streetAddress || 'your shop address'}, {cityName}, {stateName}
                        </span>{' '}
                        immediately after compliance clearance.
                      </div>
                    </div>
                  )}

                  {/* Final Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onBack}
                      className="w-full sm:flex-1 py-4 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D95FE]/20 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">home</span>
                      <span>Return to Website</span>
                    </button>

                    {onOpenWhatsApp && (
                      <button
                        type="button"
                        onClick={onOpenWhatsApp}
                        className={`w-full sm:w-auto px-6 py-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isLight
                            ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                            : 'bg-[#0A1B3D] hover:bg-[#14294F] border-[#14294F] text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">chat</span>
                        <span>Track Application on WhatsApp</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: The Inspiring Fintech Value Proposition (Monzo Inspired) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div
              className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
                isLight
                  ? 'bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-xl'
                  : 'bg-gradient-to-b from-[#0A1B3D] to-[#04112E] border-[#14294F] shadow-2xl'
              }`}
            >
              {/* Subtle ambient gradient mesh */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D95FE]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00DF8F]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-6">
                
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F]/20 text-[#00DF8F] text-xs font-bold w-fit">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span>WHY BUSINESSES CHOOSE AXOORA</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                    Designed for real shop floors across Nigeria
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                    Every feature is built around the realities of Nigerian commerce: network failover, sub-second settlement, and non-interest stock float.
                  </p>
                </div>

                {/* Key Benefits with Clean Icons */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px]">timer</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Sub-2s NIBSS Settlement
                      </h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        Customer transfers and card swipes reflect in your till instantly. No waiting till midnight or next morning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px]">sim_card</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Dual-SIM 4G POS Auto-Failover
                      </h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        If MTN drops in your market, the terminal auto-switches to Airtel in 300ms. Never lose a customer payment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/15 text-[#F2A93B] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        0% Halal Stock Float
                      </h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        Restock inventory up to ₦5,000,000 with zero interest or compounding fees. Pure profit-and-loss sharing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Multi-Store Expense Cards
                      </h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                        Give debit cards to your store managers with custom daily limits and automatic receipt matching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Real-time Settlement Ticker Animation */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#00DF8F]/10 border-[#00DF8F]/25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-ping" />
                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        + ₦48,500.00 Received
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-300">
                        NIBSS Instant Transfer · 1.2s settlement
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">check_circle</span>
                </div>

                {/* Merchant Testimonial Quote */}
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-[#061533] border-[#14294F]'
                  }`}
                >
                  <img
                    src="/merchants/fatima.jpg"
                    alt="Fatima Al-Hassan"
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#00DF8F]/40 shrink-0"
                  />
                  <div className="flex flex-col">
                    <p className="text-xs italic leading-relaxed text-slate-700 dark:text-[#A8BBD6]">
                      "We replaced 3 failing bank POS terminals in our Wuse 2 boutique. Axoora money hits our till before the customer even bags their clothes."
                    </p>
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white mt-1.5">
                      Fatima Al-Hassan — Founder, Al-Hassan Luxury Fabrics
                    </span>
                  </div>
                </div>

                {/* Regulatory Trust Badge */}
                <div className="pt-2 border-t border-slate-200 dark:border-[#14294F] flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00DF8F] text-[16px]">verified</span>
                    <span>CBN Licensed MFB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#0D95FE] text-[16px]">shield</span>
                    <span>NDIC Insured</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-purple-400 text-[16px]">lock</span>
                    <span>PCI-DSS Level 1</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
