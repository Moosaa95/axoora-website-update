'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';
import { useAppDispatch } from '../store';
import { submitLeadThunk } from '../store/slices/waitlistSlice';

interface ApplyOnboardingViewProps {
  initialInterest?: 'business' | 'pos-agent' | 'personal' | 'aggregator';
  onBack: () => void;
  onOpenWhatsApp?: () => void;
}

export const ApplyOnboardingView: React.FC<ApplyOnboardingViewProps> = ({
  initialInterest = 'pos-agent',
  onBack,
  onOpenWhatsApp,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const { addLead } = useCms();
  const dispatch = useAppDispatch();

  const [interest, setInterest] = useState<'pos-agent' | 'business' | 'personal'>(
    initialInterest === 'personal'
      ? 'personal'
      : initialInterest === 'business'
      ? 'business'
      : 'pos-agent'
  );

  // Simple essentials only
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessOrCity, setBusinessOrCity] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and WhatsApp number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingRef = `AXR-${interest === 'pos-agent' ? 'POS' : 'APP'}-${randomSuffix}`;

    dispatch(
      submitLeadThunk({
        full_name: fullName.trim(),
        whatsapp_number: phone.trim(),
        email: email.trim() || `${phone.replace(/\D/g, '')}@axoora.customer`,
        city: interest === 'personal' ? businessOrCity.trim() || 'Nigeria' : 'Nigeria',
        business_name: interest !== 'personal' ? businessOrCity.trim() || fullName.trim() : '',
        interest,
        consent: true,
        source: 'simple_interest_form',
        tracking_number: trackingRef,
        application_ref: trackingRef,
        notes: `Interest: ${interest} | Detail: ${businessOrCity.trim()}`,
      })
    );

    try {
      addLead({
        fullName: fullName.trim(),
        whatsappNumber: phone.trim(),
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
      setSubmitted(true);
    }, 400);
  };

  const getHeading = () => {
    if (interest === 'pos-agent') return 'Request an Axoora Smart POS';
    if (interest === 'business') return 'Get Started with Axoora Business';
    return 'Get the Axoora Personal App';
  };

  const getSubheading = () => {
    if (interest === 'pos-agent') {
      return 'Leave your details below. Our team will reach out on WhatsApp to set up your terminal and arrange delivery.';
    }
    if (interest === 'business') {
      return 'Leave your details and our team will get in touch on WhatsApp to set up your business account and tools.';
    }
    return 'Leave your details and we will send you the app download link and early access invite.';
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* Top Header */}
      <header
        className={`w-full border-b backdrop-blur-md sticky top-0 z-40 transition-colors ${
          isLight ? 'bg-white/90 border-slate-200' : 'bg-[#020F2E]/90 border-[#14294F]'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`p-2 px-3.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                : 'bg-[#0A1B3D] border-[#14294F] hover:bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] flex items-center justify-center text-white font-black text-base shadow-md shadow-[#0D95FE]/20">
              A
            </div>
            <span className="font-extrabold text-base tracking-tight">Axoora</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenWhatsApp && (
              <button
                onClick={onOpenWhatsApp}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isLight
                    ? 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    : 'border-[#14294F] hover:bg-[#0A1B3D] text-[#A8BBD6]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">chat</span>
                <span>WhatsApp</span>
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

      {/* Main Single Centered Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="simple-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className={`w-full rounded-3xl p-6 sm:p-8 border shadow-xl ${
                  isLight
                    ? 'bg-white border-slate-200'
                    : 'bg-[#0A1B3D] border-[#14294F]'
                }`}
              >
                {/* Interest Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#020F2E] border border-slate-200 dark:border-[#14294F] mb-6">
                  <button
                    type="button"
                    onClick={() => setInterest('pos-agent')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      interest === 'pos-agent'
                        ? 'bg-[#00DF8F] text-[#003825] shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
                    <span>Smart POS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterest('business')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      interest === 'business'
                        ? 'bg-[#0D95FE] text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">storefront</span>
                    <span>Business</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterest('personal')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      interest === 'personal'
                        ? 'bg-[#F2A93B] text-[#01091C] shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">smartphone</span>
                    <span>Personal</span>
                  </button>
                </div>

                {/* Form Header */}
                <div className="flex flex-col gap-1.5 mb-6 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {getHeading()}
                  </h1>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                    {getSubheading()}
                  </p>
                </div>

                {/* The 4-Field Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Al-Hassan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#06132E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      WhatsApp Number *
                    </label>
                    <div className="relative flex">
                      <span
                        className={`px-3.5 py-3 rounded-l-xl border-y border-l text-xs font-bold flex items-center gap-1 shrink-0 ${
                          isLight
                            ? 'bg-slate-100 border-slate-300 text-slate-700'
                            : 'bg-[#040D21] border-[#14294F] text-slate-300'
                        }`}
                      >
                        🇳🇬 +234
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="803 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`flex-1 px-4 py-3 rounded-r-xl border text-sm font-mono font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            : 'bg-[#06132E] border-[#14294F] text-[#F2F5F9]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="fatima@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#06132E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>

                  {/* Business Name or City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {interest === 'personal' ? 'Your City / State' : 'Shop / Business Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        interest === 'personal'
                          ? 'e.g. Abuja (FCT) or Lagos'
                          : 'e.g. Al-Hassan Luxury Fabrics, Wuse 2'
                      }
                      value={businessOrCity}
                      onChange={(e) => setBusinessOrCity(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0D95FE] ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#06132E] border-[#14294F] text-[#F2F5F9]'
                      }`}
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-2xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00DF8F]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#003825]/30 border-t-[#003825] rounded-full animate-spin" />
                        <span>Sending details...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {interest === 'pos-agent'
                            ? 'Request Smart POS'
                            : interest === 'business'
                            ? 'Get Started with Business'
                            : 'Get App Invite Link'}
                        </span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400 pt-1">
                    🔒 Zero spam. We will only contact you regarding your request.
                  </p>
                </form>
              </motion.div>
            ) : (
              /* Simple Success Card */
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-full rounded-3xl p-8 border text-center shadow-xl flex flex-col items-center gap-5 ${
                  isLight
                    ? 'bg-white border-slate-200'
                    : 'bg-[#0A1B3D] border-[#14294F]'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00DF8F]/20 border border-[#00DF8F]/40 text-[#00DF8F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Thank you, {fullName}!
                  </h2>
                  <p className={`text-sm leading-relaxed max-w-sm ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                    We’ve received your details. Our team will reach out to you on WhatsApp at <strong className="text-slate-900 dark:text-white">{phone}</strong> shortly.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2.5 pt-2">
                  <a
                    href={`https://wa.me/2349012345678?text=${encodeURIComponent(
                      `Hi Axoora! I just submitted my details (${fullName}, ${phone}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00DF8F] hover:bg-[#00c57d] text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Chat with Us on WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={onBack}
                    className={`w-full py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-[#14294F] hover:bg-[#1E3A6B] border-[#1E3A6B] text-white'
                    }`}
                  >
                    Return to Website
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
