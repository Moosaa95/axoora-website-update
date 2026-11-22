'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Clock, Fingerprint } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons } from './home/shared';
import { ScreenType } from '../types';

interface AboutViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Money Should Be Simple. Especially Here. (Image 5)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-8">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-12 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block mb-3">
            About
          </span>

          <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white! mb-6 max-w-4xl">
            Money Should Be Simple. Especially Here.
          </h1>

          <p className="text-[18px] sm:text-[20px] text-[#d6ebff] font-normal leading-[1.6] max-w-2xl mx-auto mb-9">
            Axoora is a Nigerian wallet built on one rule: you should never have to guess what your money is doing.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={openDownloadApp ?? (() => {})}
            onWhatsApp={openWhatsApp}
            className="justify-center"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: WHY WE BUILT IT (Image 6)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <h2 className="text-[38px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08]">
              Why We Built It
            </h2>
          </div>

          {/* Right Column: Three Paragraphs */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-[17px] sm:text-[18px] leading-[1.75] text-[#4c5866] dark:text-slate-300 font-normal">
            <p>
              Most people here do not lose money to fraud. They lose it to not knowing. A transfer that sits in limbo for three days. A debit with no explanation. A balance that does not match the one in your head.
            </p>
            <p>
              So we started from the awkward end. Every failure says whether you were charged. Every stalled transfer gets a deadline it must resolve by. Every payment is approved by you, with the amount and the recipient on screen.
            </p>
            <p>
              The rest of it, sending and paying and saving and Ajo, is the part everybody builds. The difference is whether you can trust what it tells you.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: WHAT WE HOLD TO · 3 Cards (Image 7)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          What We Hold To
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Say If You Were Charged */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <CheckCircle2 className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Say If You Were Charged
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Every failure answers the only question that matters.
              </p>
            </div>
          </div>

          {/* Card 2: No Silent Limbo */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <Clock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                No Silent Limbo
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                A payment that stalls gets a date it resolves by.
              </p>
            </div>
          </div>

          {/* Card 3: Nothing Without You */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <Fingerprint className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Nothing Without You
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Your PIN or your fingerprint, on every payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: ACTUAL TEAM PHOTO IN LAGOS (Image 8)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-14">
        <div className="relative w-full rounded-[28px] overflow-hidden shadow-xs border border-[#dde3ea] dark:border-slate-800 bg-[#eef2f6] dark:bg-slate-800 group">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px]">
            <Image
              src="/images/team-lagos.jpg"
              alt="Photo · the team in Lagos"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
            {/* Subtle Gradient & Caption Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <span className="bg-white/95 backdrop-blur-md text-[#161c22] text-[13px] sm:text-[14px] font-bold px-4 py-2 rounded-full shadow-md tracking-wide">
                Photo · the team in Lagos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: CLOSING CTA · Come and See. (Image 9)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Come and See.
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
