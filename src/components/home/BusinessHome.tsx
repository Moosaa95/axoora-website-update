'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReceiptText,
  AlertTriangle,
  Fingerprint,
  Briefcase,
  SendHorizontal,
} from 'lucide-react';
import {
  StoreButtons,
  Card,
  SectionHeading,
  Eyebrow,
  SectionWrap,
  CheckBullet,
} from './shared';
import { BatchReceiptPhoneShowcase } from './BatchReceiptPhoneShowcase';
import { BusinessOverviewPhone } from './BusinessOverviewPhone';
import { PayoutsPhone } from './PayoutsPhone';

export type BusinessHeroVariant = 'business' | 'payouts' | 'pricing';

interface BusinessHomeProps {
  onOpenDownloadApp: () => void;
  onOpenWhatsApp: () => void;
  heroMode?: BusinessHeroVariant;
  onHeroModeChange?: (mode: BusinessHeroVariant) => void;
}

/** Figma "Direction A · Business" home (BB1). Shared by the Home toggle and the /business screen. */
export const BusinessHome: React.FC<BusinessHomeProps> = ({
  onOpenDownloadApp,
  onOpenWhatsApp,
  heroMode,
  onHeroModeChange,
}) => {
  const [internalHero, setInternalHero] = useState<BusinessHeroVariant>('business');
  const activeHero = heroMode ?? internalHero;

  const handleHeroSwitch = (mode: BusinessHeroVariant) => {
    setInternalHero(mode);
    onHeroModeChange?.(mode);
  };

  const isPayoutsOrPricing = activeHero === 'payouts' || activeHero === 'pricing';
  const kicker = activeHero === 'pricing' ? 'Pricing' : isPayoutsOrPricing ? 'Payouts' : 'Business';
  const title = isPayoutsOrPricing
    ? 'Two Ways In. One Run Out.'
    : 'Pay Everyone at Once. From One File.';
  const subtitle = isPayoutsOrPricing
    ? 'Type the rows yourself, or bring a CSV. Either way the batch is checked before it moves.'
    : 'Upload a list, fix the rows that fail, and send the rest. On the account you already have.';

  return (
    <>
      {/* ─── Hero Section with Dynamic Switching between Business & Payouts/Pricing ─── */}
      <SectionWrap className="pt-2 lg:px-6">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 lg:px-16 pt-12 sm:pt-14 lg:pt-0 text-white grid grid-cols-1 lg:grid-cols-[minmax(0,557px)_1fr] gap-10 lg:min-h-[580px] shadow-[0_20px_50px_rgba(2,15,46,0.1)]">
          {/* Left Column: Copy & Store Buttons */}
          <div className="flex flex-col justify-center lg:pt-[52px] lg:pb-[48px]">
            {/* Pill Selector for Switching Hero States */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/25 backdrop-blur-md border border-white/20 w-fit mb-5 shadow-sm">
              <button
                type="button"
                onClick={() => handleHeroSwitch('business')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  !isPayoutsOrPricing
                    ? 'bg-white text-[#043e97] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Business Account</span>
              </button>
              <button
                type="button"
                onClick={() => handleHeroSwitch('payouts')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  isPayoutsOrPricing
                    ? 'bg-white text-[#043e97] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <SendHorizontal className="w-3.5 h-3.5" />
                <span>Payouts & Pricing</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHero}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <span className="text-[13px] font-bold leading-[17px] tracking-[0.04em] text-[#d6ebff] block">
                  {kicker}
                </span>

                <h1 className="mt-[20px] text-[44px] sm:text-[56px] lg:text-[62px] leading-[1.04] tracking-[-0.04em] font-bold text-white!">
                  {title}
                </h1>

                <p className="mt-5 text-[18px] leading-[1.6] text-[#d6ebff] max-w-[540px]">
                  {subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <StoreButtons
              tone="onBlueAlt"
              onApp={onOpenDownloadApp}
              onWhatsApp={onOpenWhatsApp}
              className="mt-[30px]"
            />
          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <div className="flex items-end justify-center pt-4 lg:pt-[50px] lg:ml-3">
            <AnimatePresence mode="wait">
              {isPayoutsOrPricing ? (
                <motion.div
                  key="payouts-phone"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <PayoutsPhone />
                </motion.div>
              ) : (
                <motion.div
                  key="business-phone"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <BusinessOverviewPhone />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SectionWrap>

      {/* ─── One Run, Not Fifty ─── */}
      <SectionWrap className="pt-16 lg:pt-[100px]">
        <SectionHeading>One Run, Not Fifty</SectionHeading>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              Icon: ReceiptText,
              title: 'One File, Every Recipient',
              body: 'Add rows by hand, or upload a CSV against our template. The template downloads from the upload screen, with example rows.',
            },
            {
              Icon: AlertTriangle,
              title: 'Bad Rows Are Flagged, Not the Batch',
              body: 'Every row is checked before anything sends. An invalid row is marked on its own; the rest of the run still goes.',
            },
            {
              Icon: Fingerprint,
              title: 'One PIN for the Whole Run',
              body: 'You approve the batch once, not once per recipient. The total is on screen when you do.',
            },
          ].map(({ Icon, title, body }) => (
            <Card key={title} className="p-[33px] flex flex-col gap-4 min-h-[252px]">
              <Icon className="w-6 h-6 text-[#0976da]" strokeWidth={1.5} />
              <h3 className="text-[22px] leading-[26px] font-medium text-[#161c22] dark:text-white">
                {title}
              </h3>
              <p className="text-[16px] leading-[26px] text-[#4c5866] dark:text-slate-300">
                {body}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrap>

      {/* ─── After it runs ─── */}
      <SectionWrap className="pt-16 lg:pt-[112px]">
        <div className="grid grid-cols-1 lg:grid-cols-[560px_1fr] gap-12 lg:gap-[56px] items-center">
          <div className="bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-6 sm:p-8 lg:p-10 flex items-center justify-center min-h-[580px] shadow-xs">
            <BatchReceiptPhoneShowcase />
          </div>

          <div>
            <Eyebrow>After it runs</Eyebrow>
            <SectionHeading className="mt-3 max-w-[500px]">
              Every Recipient Gets Its Own Record.
            </SectionHeading>
            <p className="mt-5 text-[17px] leading-[28px] text-[#4c5866] dark:text-slate-300 max-w-[500px]">
              A batch is not one opaque result. Each row becomes its own transaction, reconciled on its own, so a failure is visible against the person it belongs to.
            </p>
            <ul className="mt-5 flex flex-col gap-[10px]">
              {[
                'Success, pending or failed, per recipient',
                'Your daily limit counts the batch total, not each row',
                'A failed row says whether that person was paid',
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-[14px] text-[16px] leading-[26px] text-[#161c22] dark:text-white"
                >
                  <CheckBullet />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrap>

      {/* ─── Closing band ─── */}
      <SectionWrap className="pt-16 lg:pt-[112px] pb-[100px] lg:px-6">
        <div className="bg-[#043e97] rounded-[28px] px-6 py-16 lg:py-20 flex flex-col items-center text-center text-white shadow-lg">
          <h2 className="text-[40px] sm:text-[50px] leading-[1.06] tracking-[-0.04em] font-bold text-white!">
            Payday, in One Go.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.6] text-[#d6ebff]">
            Bulk transfers unlock at Tier 3.
          </p>
          <StoreButtons
            tone="onBlueAlt"
            onApp={onOpenDownloadApp}
            onWhatsApp={onOpenWhatsApp}
            className="mt-[22px] justify-center"
          />
        </div>
      </SectionWrap>
    </>
  );
};
