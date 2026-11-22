'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Fingerprint,
  Lock,
  Snowflake,
  Clock,
  X,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  Calendar,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons, PhoneFrame, PhoneStatusBar, CheckBullet } from './home/shared';

export const SecurityView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  // Interactive copy state for reference code
  const [copied, setCopied] = useState(false);

  // Interactive scheduled payment state
  const [scheduledStatus, setScheduledStatus] = useState<'scheduled' | 'cancelled'>('scheduled');

  const handleCopyRef = () => {
    navigator.clipboard?.writeText('AXO-8F2K19');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · You Always Know Where Your Money Is. (Image 1)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Column: Copy & Store Buttons */}
          <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
            <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block">
              Security
            </span>

            <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
              You Always Know Where Your Money Is.
            </h1>

            <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
              Every payment is approved by you. Every failure says whether you were charged.
            </p>

            <StoreButtons
              tone="onBlue"
              onApp={openDownloadApp ?? (() => {})}
              onWhatsApp={openWhatsApp}
            />
          </div>

          {/* Right Column: Phone Mockup showing GTBank Failure Screen */}
          <div className="lg:col-span-5 flex items-end justify-center self-end">
            <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
              <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans relative overflow-hidden">
                <PhoneStatusBar />

                <div className="flex-1 flex flex-col justify-between pt-1">
                  <div>
                    {/* Top right close button */}
                    <div className="flex justify-end pt-0.5">
                      <X className="w-4 h-4 text-[#8492a6] cursor-pointer" />
                    </div>

                    {/* Red Circle with X Icon */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full bg-[#bd2735] text-white flex items-center justify-center mx-auto mt-2 shadow-xs"
                    >
                      <X className="w-6 h-6 stroke-[2.5]" />
                    </motion.div>

                    {/* Failure Headings */}
                    <div className="text-center mt-3">
                      <h4 className="text-[15px] font-bold text-[#161c22]">
                        GTBank Could Not Take It
                      </h4>
                      <p className="text-[10.5px] text-[#6c7a89] mt-1 max-w-[220px] mx-auto leading-relaxed">
                        They are not taking transfers right now. This is on their side.
                      </p>
                      <span className="text-[11.5px] font-bold text-[#0f6b45] block mt-2">
                        You were not debited.
                      </span>
                    </div>

                    {/* Key-Value Breakdown Table */}
                    <div className="mt-4 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7] divide-y divide-[#edf1f7] text-[10.5px]">
                      <div className="py-2 flex justify-between">
                        <span className="text-[#6c7a89]">Amount</span>
                        <span className="font-bold text-[#161c22]">₦ 25,000.00</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#6c7a89]">To</span>
                        <span className="font-semibold text-[#161c22]">Chidinma Okafor</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#6c7a89]">Your Balance</span>
                        <span className="font-semibold text-[#161c22]">₦ 112,430.00</span>
                      </div>
                      <div className="py-2 flex justify-between items-center">
                        <span className="text-[#6c7a89]">Reference</span>
                        <button
                          type="button"
                          onClick={handleCopyRef}
                          className="flex items-center gap-1 font-mono text-[9.5px] text-[#161c22] hover:text-[#0976da] transition cursor-pointer"
                        >
                          <span>AXO-8F2K19</span>
                          {copied ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-[#8492a6]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* What You Can Do Guidance */}
                    <div className="mt-3.5 p-3 rounded-xl bg-white border border-[#dde3ea]">
                      <span className="text-[10px] font-bold text-[#161c22] block mb-1">
                        What You Can Do
                      </span>
                      <ul className="text-[9.5px] text-[#6c7a89] space-y-1 leading-relaxed">
                        <li>• Try again in a few minutes. Outages are usually short.</li>
                        <li>• Send to a different account, if she has one elsewhere.</li>
                        <li>• Let us tell you when GTBank is back, and send it then.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <span className="text-[9px] text-[#8492a6]">
                      Protected by Axoora Instant Reversal Engine
                    </span>
                  </div>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: BUILT SO NOTHING HAPPENS BY SURPRISE · 4 Cards (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-8">
          Built so Nothing Happens by Surprise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: PIN or Fingerprint */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Fingerprint className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                PIN or Fingerprint
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Required for every payment, with the amount and the recipient on screen.
              </p>
            </div>
          </div>

          {/* Card 2: Your BVN Stays Private */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Lock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Your BVN Stays Private
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Used to confirm who you are. Never shared.
              </p>
            </div>
          </div>

          {/* Card 3: Freeze a Card in a Tap */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Snowflake className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Freeze a Card in a Tap
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                Naira or Dollar, the moment something looks wrong.
              </p>
            </div>
          </div>

          {/* Card 4: No Silent Limbo */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 flex flex-col justify-between shadow-xs min-h-[220px] hover:shadow-md transition">
            <div>
              <Clock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                No Silent Limbo
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4c5866] dark:text-slate-300">
                A stalled transfer gets a deadline. It settles, or it comes back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: NO SILENT LIMBO · Nothing Sits in Limbo Without a Date (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 items-center">
          {/* Left Column: Copy & Bullets */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              No Silent Limbo
            </span>
            <h2 className="text-[36px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08] mb-4">
              Nothing Sits in Limbo Without a Date.
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#4c5866] dark:text-slate-300 max-w-xl mb-7">
              When a transfer stalls at the other bank it gets a deadline. By then it has settled or it is reversed, and either way you are told which.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              {[
                'A deadline on the screen, not a shrug',
                'Reversed straight back to your wallet',
                'You can see it in Activity the whole time',
              ].map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 text-[15px] font-medium text-[#161c22] dark:text-white"
                >
                  <CheckBullet />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Phone Mockup showing Scheduled Pending Transfer */}
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-10 flex items-center justify-center">
            <PhoneFrame width={310} height={540} className="shadow-[0_20px_45px_rgba(2,15,46,0.2)]">
              <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans">
                <PhoneStatusBar />

                <div>
                  {/* Top Bar with X */}
                  <div className="flex justify-end pt-0.5">
                    <X className="w-4 h-4 text-[#8492a6] cursor-pointer" />
                  </div>

                  {/* Green Circle Check Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#065f41] text-white flex items-center justify-center mx-auto mt-2 shadow-xs">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <div className="text-center mt-3">
                    <h4 className="text-[15px] font-bold text-[#161c22]">Scheduled</h4>
                    <p className="text-[10px] text-[#6c7a89] mt-0.5">
                      First Payment Tuesday 23 September
                    </p>
                  </div>

                  {/* Scheduled Pending Card */}
                  <div className="mt-5 bg-[#f7f9fb] rounded-xl p-3 border border-[#edf1f7]">
                    <div className="flex justify-between items-center text-[10px] pb-2 border-b border-[#edf1f7]">
                      <span className="font-bold text-[#161c22]">Pending</span>
                      <span className="text-[#0976da] font-semibold cursor-pointer">View All</span>
                    </div>

                    <div className="pt-2.5 flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-[#161c22]">
                            Chidinma Okafor
                          </div>
                          <div className="text-[8.5px] text-[#6c7a89]">
                            Monthly on the 23rd · 12 payments
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-[11.5px] text-[#161c22]">₦ 25,000.00</span>
                    </div>

                    {/* Action buttons: Edit & Cancel */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-[#edf1f7]">
                      <button
                        type="button"
                        className="py-1.5 rounded-lg border border-[#dde3ea] bg-white text-[9.5px] font-bold text-[#161c22] hover:bg-slate-50 transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setScheduledStatus((prev) =>
                            prev === 'scheduled' ? 'cancelled' : 'scheduled'
                          )
                        }
                        className="py-1.5 rounded-lg border border-[#fee2e2] bg-white text-[9.5px] font-bold text-[#b91c1c] hover:bg-red-50 transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>✕ Cancel</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[9px] text-[#8492a6] mt-3 leading-relaxed px-1">
                    Each payment is held a day before it goes. Edit or cancel until it starts.
                  </p>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[9px] text-[#8492a6]">
                    Automated Resolution Engine · Instant Auto-Reversal
                  </span>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: LICENCE · What We Are Not Claiming Yet (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-12">
        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[24px] p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              Licence
            </span>
            <h3 className="text-[28px] sm:text-[34px] font-bold text-[#161c22] dark:text-white tracking-tight">
              What We Are Not Claiming Yet.
            </h3>
          </div>

          <div className="border border-dashed border-[#b0c4de] dark:border-slate-700 rounded-2xl p-6 bg-[#f7f9fb] dark:bg-slate-800/40">
            <p className="text-[13.5px] leading-relaxed text-[#4c5866] dark:text-slate-300 font-medium">
              Licence and deposit-protection statement to be supplied. No regulator or insurer is named until confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: Closing CTA · Money You Can Watch (Image 5)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Money You Can Watch.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Your phone number and BVN are all you need to start.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={openDownloadApp ?? (() => {})}
            onWhatsApp={openWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};
