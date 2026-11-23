'use client';

import React from 'react';
import {
  ReceiptText,
  AlertTriangle,
  Fingerprint,
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

export type BusinessHeroVariant = 'business' | 'pricing' | 'payouts';

interface BusinessHomeProps {
  onOpenDownloadApp: () => void;
  onOpenWhatsApp: () => void;
}

/** Figma "Direction A · Business" home (BB1). Shared by the Home toggle and the /business screen. */
export const BusinessHome: React.FC<BusinessHomeProps> = ({
  onOpenDownloadApp,
  onOpenWhatsApp,
}) => {
  return (
    <>
      {/* ─── Hero Section: Strictly Business ─── */}
      <SectionWrap className="pt-2 lg:px-6">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 lg:px-16 pt-12 sm:pt-14 lg:pt-0 text-white grid grid-cols-1 lg:grid-cols-[minmax(0,557px)_1fr] gap-10 lg:min-h-[580px] shadow-[0_20px_50px_rgba(2,15,46,0.1)]">
          {/* Left Column: Copy & Store Buttons */}
          <div className="flex flex-col justify-center lg:pt-[52px] lg:pb-[48px]">
            <span className="text-[13px] font-bold leading-[17px] tracking-[0.04em] text-[#d6ebff] block">
              Business
            </span>

            <h1 className="mt-[20px] text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.04] tracking-[-0.04em] font-bold text-white!">
              Pay Everyone at Once. From One File.
            </h1>

            <p className="mt-5 text-[18px] leading-[1.6] text-[#d6ebff] max-w-[540px]">
              Upload a list, fix the rows that fail, and send the rest. On the account you already have.
            </p>

            <StoreButtons
              tone="onBlueAlt"
              onApp={onOpenDownloadApp}
              onWhatsApp={onOpenWhatsApp}
              className="mt-[30px]"
            />
          </div>

          {/* Right Column: Business Account Cashflow Mockup */}
          <div className="flex items-end justify-center pt-4 lg:pt-[50px] lg:ml-3">
            <BusinessOverviewPhone />
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
