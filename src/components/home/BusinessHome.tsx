'use client';

import React from 'react';
import { EyeOff, Search, ReceiptText, AlertTriangle, Fingerprint, ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { StoreButtons, PhoneFrame, PhoneStatusBar, Money, Card, SectionHeading, Eyebrow, SectionWrap, CheckBullet } from './shared';
import { PhoneGroup, PhoneTx } from './phoneParts';

/** Figma "Direction A · Business" home (BB1). Shared by the Home toggle and the /business screen. */
export const BusinessHome: React.FC<{ onOpenDownloadApp: () => void; onOpenWhatsApp: () => void }> = ({
  onOpenDownloadApp,
  onOpenWhatsApp,
}) => (
  <>
    {/* ─── Hero ─── */}
    <SectionWrap className="pt-2 lg:px-6">
      <div className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 lg:px-16 pt-14 lg:pt-0 text-white grid grid-cols-1 lg:grid-cols-[minmax(0,557px)_1fr] gap-10 lg:min-h-[560px]">
        <div className="flex flex-col justify-center lg:pt-[52px] lg:pb-[48px]">
          <span className="text-[13px] font-bold leading-[17px] tracking-[0.04em] text-[#d6ebff]">Business</span>
          <h1 className="mt-[26px] text-[44px] sm:text-[56px] leading-[1.06] tracking-[-0.04em] font-bold text-white!">
            Pay Everyone at Once. From One File.
          </h1>
          <p className="mt-6 text-[18px] leading-[1.6] text-[#d6ebff] max-w-[540px]">
            Upload a list, fix the rows that fail, and send the rest. On the account you already have.
          </p>
          <StoreButtons tone="onBlueAlt" onApp={onOpenDownloadApp} onWhatsApp={onOpenWhatsApp} className="mt-[26px]" />
        </div>

        <div className="flex items-end justify-center pt-4 lg:pt-[120px] lg:ml-3">
          <PhoneFrame width={300} height={440} radius={44}>
            <div className="px-[11px]">
              <PhoneStatusBar className="px-[8px]" />
              <div className="mt-[10px] px-[1px]">
                <div className="flex items-center gap-2">
                  <Money amount="112,430" big={24} small={17} />
                  <EyeOff className="w-[14px] h-[14px] text-[#4c5866]" />
                </div>
                <div className="mt-[2px] text-[9px] leading-[13px] text-[#4c5866]">Current Balance</div>
              </div>
              <div className="mt-[14px] w-[230px] h-[34px] rounded-[4px] border border-[#dde3ea] flex items-center gap-2 px-3 text-[9px] text-[#4c5866]">
                <Search className="w-[10px] h-[10px]" /> Search
              </div>

              <PhoneGroup label="Tomorrow" total="− ₦34,900" totalClass="text-[#8a4b00]" className="mt-[18px]">
                <PhoneTx initials="CO" name="Chidinma Okafor" sub="Scheduled · 08:00" amount="− ₦29,400" tone="debitPending" />
                <PhoneTx logo="DStv" name="DStv" sub="Subscription · 08:00" amount="− ₦5,500" tone="debitPending" />
              </PhoneGroup>
              <PhoneGroup label="Today" total="+ ₦25,000" totalClass="text-[#065f41]" className="mt-[16px]">
                <PhoneTx initials="CO" name="Chidinma Okafor" sub="14:08" amount="+ ₦25,000" tone="credit" />
              </PhoneGroup>
              <PhoneGroup label="Yesterday" total="− ₦10,500" totalClass="text-[#161c22]" className="mt-[16px]">
                <PhoneTx initials="IE" name="Ikeja Electric" sub="09:20" amount="− ₦10,500" tone="debit" />
              </PhoneGroup>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </SectionWrap>

    {/* ─── One Run, Not Fifty ─── */}
    <SectionWrap className="pt-16 lg:pt-[100px]">
      <SectionHeading>One Run, Not Fifty</SectionHeading>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { Icon: ReceiptText, title: 'One File, Every Recipient', body: 'Add rows by hand, or upload a CSV against our template. The template downloads from the upload screen, with example rows.' },
          { Icon: AlertTriangle, title: 'Bad Rows Are Flagged, Not the Batch', body: 'Every row is checked before anything sends. An invalid row is marked on its own; the rest of the run still goes.' },
          { Icon: Fingerprint, title: 'One PIN for the Whole Run', body: 'You approve the batch once, not once per recipient. The total is on screen when you do.' },
        ].map(({ Icon, title, body }) => (
          <Card key={title} className="p-[33px] flex flex-col gap-4 min-h-[252px]">
            <Icon className="w-6 h-6 text-[#0976da]" strokeWidth={1.5} />
            <h3 className="text-[22px] leading-[26px] font-medium text-[#161c22] dark:text-white">{title}</h3>
            <p className="text-[16px] leading-[26px] text-[#4c5866] dark:text-slate-300">{body}</p>
          </Card>
        ))}
      </div>
    </SectionWrap>

    {/* ─── After it runs ─── */}
    <SectionWrap className="pt-16 lg:pt-[112px]">
      <div className="grid grid-cols-1 lg:grid-cols-[596px_1fr] gap-12 lg:gap-[56px] items-center">
        <div className="bg-[#ebf5ff] rounded-[20px] h-[430px] overflow-hidden flex items-end justify-center">
          <div className="self-end mb-0 mt-[48px]">
            <PhoneFrame width={280} height={382} radius={44}>
              <div className="px-[13px]">
                <PhoneStatusBar className="px-[2px]" />
                <ArrowLeft className="w-[11px] h-[11px] mt-[4px]" />
                <div className="flex flex-col items-center">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#eef1f5] flex items-center justify-center">
                    <ArrowUpRight className="w-[12px] h-[12px]" />
                  </div>
                  <Money amount="8,500" big={22} small={16} className="mt-2" />
                  <span className="mt-2 inline-flex items-center gap-1 px-[7px] h-[15px] rounded-full bg-[#e3f6ec] text-[7px] font-semibold text-[#065f41]">
                    <Check className="w-[7px] h-[7px]" strokeWidth={3} /> Completed
                  </span>
                </div>
                <div className="mt-[18px]">
                  {[
                    ['To', 'Ikeja Electric'],
                    ['Meter', '45012338'],
                    ['Name', 'ADAEZE N BALOGUN'],
                    ['Paid From', 'Axoora Wallet'],
                    ['Date', '11 Sept 2026, 09:20'],
                    ['Fee', '₦0.00'],
                    ['Balance After', '₦103,930.00'],
                  ].map(([k, v]) => (
                    <div key={k} className="h-[32px] flex items-center justify-between border-b border-[#eef1f5] text-[8px]">
                      <span className="text-[#4c5866]">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>

        <div>
          <Eyebrow>After it runs</Eyebrow>
          <SectionHeading className="mt-3 max-w-[500px]">Every Recipient Gets Its Own Record.</SectionHeading>
          <p className="mt-5 text-[17px] leading-[28px] text-[#4c5866] dark:text-slate-300 max-w-[500px]">
            A batch is not one opaque result. Each row becomes its own transaction, reconciled on its own, so a failure is visible against the person it belongs to.
          </p>
          <ul className="mt-5 flex flex-col gap-[10px]">
            {[
              'Success, pending or failed, per recipient',
              'Your daily limit counts the batch total, not each row',
              'A failed row says whether that person was paid',
            ].map((t) => (
              <li key={t} className="flex items-center gap-[14px] text-[16px] leading-[26px] text-[#161c22] dark:text-white">
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
      <div className="bg-[#043e97] rounded-[28px] px-6 py-16 lg:py-20 flex flex-col items-center text-center text-white">
        <h2 className="text-[40px] sm:text-[50px] leading-[1.06] tracking-[-0.04em] font-bold text-white!">Payday, in One Go.</h2>
        <p className="mt-5 text-[18px] leading-[1.6] text-[#d6ebff]">Bulk transfers unlock at Tier 3.</p>
        <StoreButtons tone="onBlueAlt" onApp={onOpenDownloadApp} onWhatsApp={onOpenWhatsApp} className="mt-[22px] justify-center" />
      </div>
    </SectionWrap>
  </>
);
