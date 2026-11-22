'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  X,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Store,
  Phone,
  Wifi,
  Zap,
  Tv,
  Droplet,
  GraduationCap,
  Copy,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { StoreButtons, PhoneFrame, PhoneStatusBar, CheckBullet } from './home/shared';
import { WhatsAppHeroPhone } from './home/WhatsAppHeroPhone';
import { AppHeroPhone } from './home/AppHeroPhone';

interface PersonalProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
  onOpenCommandDrawer?: () => void;
  personalHeroNav?: string;
}

export const PersonalProductView: React.FC<PersonalProductViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Two States, Cross-Fading (A2 Hero: "on WhatsApp." <-> "in the App.")
  const [heroState, setHeroState] = useState<'whatsapp' | 'app'>('whatsapp');

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroState((prev) => (prev === 'whatsapp' ? 'app' : 'whatsapp'));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO HEADER · A2 Hero Rotating Headline (Two States, Cross-Fading)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Headline holds still, phrase swaps on a timer */}
          <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide">
                Send and Pay
              </span>
              {/* <div className="w-5 h-5 rounded-full bg-[#f25a38] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                A
              </div> */}
            </div>

            <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white! flex flex-wrap items-baseline gap-x-3.5 sm:gap-x-4">
              <span>Bank</span>
              <span className="relative inline-block overflow-hidden py-1">
                <AnimatePresence mode="wait">
                  {heroState === 'whatsapp' ? (
                    <motion.span
                      key="whatsapp-text"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="text-[#92c5ff] inline-block cursor-pointer"
                      onClick={() => setHeroState('app')}
                    >
                      on WhatsApp.
                    </motion.span>
                  ) : (
                    <motion.span
                      key="app-text"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="text-white inline-block cursor-pointer"
                      onClick={() => setHeroState('whatsapp')}
                    >
                      in the App.
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
              The same account either way. Same limits, same PIN.
            </p>

            <StoreButtons
              tone="onBlue"
              onApp={onOpenDownloadApp ?? (() => {})}
              onWhatsApp={onOpenWhatsApp}
            />
          </div>

          {/* Right Column: Phone Screen Swaps with the phrase */}
          <div className="lg:col-span-5 flex items-end justify-center self-end">
            <div className="w-full flex justify-center">
              <AnimatePresence mode="wait">
                {heroState === 'whatsapp' ? (
                  <motion.div
                    key="phone-whatsapp"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <WhatsAppHeroPhone />
                  </motion.div>
                ) : (
                  <motion.div
                    key="phone-app"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <AppHeroPhone />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Two Ways to Make a Transfer (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-8">
          Two Ways to Make a Transfer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: In the app */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-xs min-h-[250px]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf5ff] dark:bg-blue-950/60 text-[#0976da] dark:text-blue-400 text-xs font-semibold mb-5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>In the app</span>
              </div>
              <h3 className="text-[26px] font-bold text-[#161c22] dark:text-white mb-3">
                The Full Flow
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Beneficiaries, schedules and every receipt in one place. Send now, or set it to repeat.
              </p>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f0f7f3] dark:bg-emerald-950/40 text-[#0f6b45] dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 fill-[#0f6b45] text-[#f0f7f3] dark:text-emerald-950" />
                <span>Sent · 14:08</span>
              </div>
            </div>
          </div>

          {/* Card 2: On WhatsApp */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-xs min-h-[250px]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf5ff] dark:bg-blue-950/60 text-[#0976da] dark:text-blue-400 text-xs font-semibold mb-5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>On WhatsApp</span>
              </div>
              <h3 className="text-[26px] font-bold text-[#161c22] dark:text-white mb-3">
                Just Say It
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Describe the transfer in your own words. You still confirm with your PIN.
              </p>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ebf5ff] dark:bg-blue-950/40 text-[#0976da] dark:text-blue-400 text-xs font-semibold">
                <Phone className="w-3.5 h-3.5 rotate-[15deg]" />
                <span>Reply to confirm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: Bank health · Know a Bank Is Down (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              Bank health
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08] mb-4">
              Know a Bank Is Down Before You Send.
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#4c5866] dark:text-slate-300 max-w-xl mb-7">
              Nigerian banks go down. When the receiving bank is having problems you see it where you pick it, not after your money has left.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              {[
                'A bank with problems is flagged where you choose it',
                'If one fails anyway, you are told whether you were debited',
                'A stalled transfer gets a deadline it must resolve by',
              ].map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[15px] font-medium text-[#161c22] dark:text-white">
                  <CheckBullet />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Phone displaying GTBank Bank-Down Failure State */}
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-8 flex items-center justify-center">
            <PhoneFrame width={300} height={530} className="shadow-[0_20px_45px_rgba(2,15,46,0.2)]">
              <div className="h-full flex flex-col justify-between p-4 bg-white text-[#161c22] select-none text-xs">
                <PhoneStatusBar />

                <div>
                  <div className="flex justify-end pt-0.5">
                    <X className="w-4 h-4 text-[#8492a6] cursor-pointer" />
                  </div>

                  {/* Red Circle with X */}
                  <div className="w-12 h-12 rounded-full bg-[#bd2735] text-white flex items-center justify-center mx-auto mt-2 shadow-xs">
                    <X className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  {/* Failure Headings */}
                  <div className="text-center mt-3">
                    <h4 className="text-[14.5px] font-bold text-[#161c22]">
                      GTBank Could Not Take It
                    </h4>
                    <p className="text-[10px] text-[#6c7a89] mt-1 max-w-[210px] mx-auto leading-relaxed">
                      They are not taking transfers right now. This is on their side.
                    </p>
                    <span className="text-[11px] font-bold text-[#0f6b45] block mt-2">
                      You were not debited.
                    </span>
                  </div>

                  {/* Details Table */}
                  <div className="mt-4 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] divide-y divide-[#edf1f7] text-[10.5px]">
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6c7a89]">Amount</span>
                      <span className="font-bold text-[#161c22]">₦ 25,000.00</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6c7a89]">To</span>
                      <span className="font-semibold text-[#161c22]">Chidinma Okafor</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-[#6c7a89]">Your Balance</span>
                      <span className="font-semibold text-[#161c22]">₦ 112,430.00</span>
                    </div>
                    <div className="py-1.5 flex justify-between items-center">
                      <span className="text-[#6c7a89]">Reference</span>
                      <div className="flex items-center gap-1 font-mono text-[9.5px] text-[#161c22]">
                        <span>AXO-8F2K19</span>
                        <Copy className="w-3 h-3 text-[#8492a6] cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* What You Can Do */}
                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#dde3ea]">
                    <span className="text-[10px] font-bold text-[#161c22] block mb-0.5">
                      What You Can Do
                    </span>
                    <p className="text-[9px] text-[#6c7a89]">
                      • Try again in a few minutes. Outages are usually short.
                    </p>
                  </div>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>

        {/* Scope Note Banner */}
        <div className="mt-8 bg-[#fffbeb] dark:bg-amber-950/30 border border-[#fef3c7] dark:border-amber-900/50 rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-[#78350f] dark:text-amber-200 font-medium leading-relaxed">
            <strong className="font-bold">Scope note:</strong> the PRD specifies a bank-down failure state, and the same &ldquo;show it greyed with a reason&rdquo; pattern for billers, but nothing proactive for banks. Seeing a bank&rsquo;s health before you send is a new feature and has no mobile screen yet.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: Bills, in Seconds (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Bills, in Seconds.
        </h2>

        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          {/* Top Blue Banner: Axoora Mall */}
          <div className="bg-[#0976da] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white text-[#0976da] flex items-center justify-center shrink-0 shadow-xs">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-white leading-snug">
                  Axoora Mall
                </h3>
                <p className="text-sm text-white/90">
                  Flights, hotels and event tickets, paid from the same wallet.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate?.('personal')}
              className="px-5 py-2.5 rounded-full bg-white text-[#0976da] font-bold text-xs sm:text-sm hover:bg-slate-50 transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
              <span>Explore Mall</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom 6 Category Icons */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 pt-2">
            {[
              { label: 'Airtime', Icon: Phone },
              { label: 'Data', Icon: Wifi },
              { label: 'Power', Icon: Zap },
              { label: 'TV', Icon: Tv },
              { label: 'Water', Icon: Droplet },
              { label: 'School Fees', Icon: GraduationCap },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] dark:bg-slate-800 text-[#0976da] dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-xs font-semibold text-[#161c22] dark:text-slate-200">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: Closing CTA · Send Your First One Today (Image 5)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Send Your First One Today.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Your phone number and BVN are all you need to start.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={onOpenDownloadApp ?? (() => {})}
            onWhatsApp={onOpenWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};
