'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Users,
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Zap,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Eye,
  EyeOff,
  User,
  Briefcase,
  Store,
  Bell,
  MessageCircle,
  RefreshCw,
  Building,
  Check,
  ChevronRight,
  Plane,
  Ticket,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { StoreButtons, PhoneFrame, PhoneStatusBar, Money, Card, SectionHeading, SectionWrap } from './home/shared';
import { BusinessHome } from './home/BusinessHome';
import { PersonalPhoneShowcase } from './home/PersonalPhoneShowcase';
import { AnimatedCardsTile } from './home/AnimatedCardsTile';
import { PersonalNavHero, PersonalNavHeroType } from './home/PersonalNavHero';

export interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
  personalHeroNav?: PersonalNavHeroType;
  onPersonalHeroNavChange?: (hero: PersonalNavHeroType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  homeMode = 'personal',
  onHomeModeChange,
  personalHeroNav = 'send',
  onPersonalHeroNavChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Toggle between Personal and Business direction
  const [activeSegment, setActiveSegment] = useState<'personal' | 'business'>(
    homeMode === 'business' ? 'business' : 'personal'
  );

  const handleSegmentChange = (segment: 'personal' | 'business') => {
    setActiveSegment(segment);
    onHomeModeChange?.(segment);
  };

  // State for interactive phone mockup in Personal Hero
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'send' | 'chat' | 'circles' | 'savings'>('home');

  // Business Batch Simulation state
  const [batchApproved, setBatchApproved] = useState(false);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight
          ? 'bg-[#f7f9fb] text-[#161c22]'
          : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      <AnimatePresence mode="wait">
        {activeSegment === 'personal' ? (
          /* ═══════════════════════════════════════════════════════════
             PERSONAL SHOWCASE DIRECTION (Figma A1 · Home)
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {/* ─── Hero Section (Dynamic across Send / Cards / Savings / Ajo / Mall) ─── */}
            <PersonalNavHero
              activeNav={personalHeroNav}
              onOpenWhatsApp={onOpenWhatsApp}
              onOpenDownloadApp={onOpenDownloadApp}
            />

            {/* ─── Feature Tiles (Figma A1 · Tiles) ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 lg:pt-[120px] pb-12 lg:px-16 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { Icon: Sparkles, title: 'An Assistant That Knows Your Account', body: '“You spent ₦48,200 on airtime and data in August.” Straight answers from your own figures, and nothing moves without you.' },
                  { Icon: Users, title: 'Ajo and Pay Circle', body: 'Save with people you trust. Everyone sees who has paid, who is next, and what the payout will be.' },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-10 flex flex-col gap-4 min-h-[258px]">
                    <Icon className="w-7 h-7 text-[#0976da]" strokeWidth={1.5} />
                    <h3 className="text-[30px] leading-[1.08] tracking-[-0.66px] font-bold text-[#161c22] dark:text-white">{title}</h3>
                    <p className="text-[16px] leading-[1.6] text-[#4c5866] dark:text-slate-300">{body}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedCardsTile />

                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-10 flex flex-col gap-4 min-h-[258px]">
                  <Lock className="w-7 h-7 text-[#0976da]" strokeWidth={1.5} />
                  <h3 className="text-[30px] leading-[1.08] tracking-[-0.66px] font-bold text-[#161c22] dark:text-white">Non-Interest Savings</h3>
                  <p className="text-[16px] leading-[1.6] text-[#4c5866] dark:text-slate-300">An expected profit range, not a promised rate, and a statement that shows which investments funded it.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-[623px_1fr] min-h-[280px]">
                <div className="p-12 flex flex-col gap-4">
                  <Store className="w-7 h-7 text-[#0976da]" strokeWidth={1.5} />
                  <h3 className="text-[34px] leading-[1.06] tracking-[-0.85px] font-bold text-[#161c22] dark:text-white">Axoora Mall</h3>
                  <p className="text-[16px] leading-[1.6] text-[#4c5866] dark:text-slate-300">Flights, hotels and event tickets, paid from your wallet. If a booking fails after you pay, we tell you whether you were charged and when the refund lands.</p>
                </div>
                <div
                  className="flex items-center justify-center text-center bg-[#f7f9fb] dark:bg-slate-800 min-h-[160px]"
                  style={{ backgroundImage: 'repeating-linear-gradient(135deg, #eef1f5 0 10px, transparent 10px 20px)' }}
                >
                  <span className="text-[13px] font-bold leading-[1.6] text-[#343e4a] max-w-[165px]">Photo · a family arriving at a hotel in Abuja</span>
                </div>
              </div>
            </div>

            {/* ─── Send Money ─── */}
            <SectionWrap className="pt-16 lg:pt-[120px] pb-12">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <SectionHeading size={52} className="max-w-[624px] leading-[53px]!">
                  Send Money the Way You Actually Do.
                </SectionHeading>
                <p className="text-[16px] leading-[27px] text-[#4c5866] dark:text-slate-300 lg:max-w-[408px] lg:text-right">
                  Right now, on a schedule, or to a whole list at once.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: 'Now', title: 'Instant Transfers', body: 'To any Nigerian bank, in seconds.',
                    foot: (
                      <div className="h-[42px] rounded-[10px] bg-[#f0f7f3] flex items-center gap-[10px] px-[14px] text-[14px] font-medium text-[#161c22]">
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#0f6b45]" fill="currentColor" stroke="#f0f7f3" /> Sent · 14:08
                      </div>
                    ),
                  },
                  {
                    label: 'Later', title: 'Scheduled and Recurring', body: 'Rent on the 1st, every month, without thinking about it.',
                    foot: (
                      <div className="h-[42px] rounded-[10px] bg-[#ebf5ff] flex items-center gap-[10px] px-[14px] text-[14px] font-medium text-[#161c22]">
                        <RefreshCw className="w-[18px] h-[18px] text-[#0976da]" /> Every Month on the 1st
                      </div>
                    ),
                  },
                  {
                    label: 'Many', title: 'Bulk Payouts', body: 'Pay your whole team from one file.',
                    foot: (
                      <button
                        type="button"
                        onClick={() => handleSegmentChange('business')}
                        className="h-[46px] w-full rounded-[10px] bg-[#0976da] hover:bg-[#043e97] transition text-white text-[14px] font-medium cursor-pointer"
                      >
                        18 paid · ₦412,000
                      </button>
                    ),
                  },
                ].map(({ label, title, body, foot }) => (
                  <Card key={label} className="p-[33px] min-h-[252px]">
                    <span className="block text-[13px] leading-[17px] font-bold text-[#0976da]">{label}</span>
                    <h3 className="mt-[18px] text-[20px] leading-[29px] font-medium text-[#161c22] dark:text-white">{title}</h3>
                    <p className="mt-[10px] text-[14px] leading-[24px] text-[#4c5866] dark:text-slate-400">{body}</p>
                    <div className="mt-6">{foot}</div>
                  </Card>
                ))}
              </div>
            </SectionWrap>

            {/* ─── Security ─── */}
            <SectionWrap className="pt-8 lg:pt-[120px] pb-12 lg:px-6">
              <div className="bg-[#161c22] text-white rounded-[28px] px-8 lg:px-16 py-12 lg:py-[72px] grid grid-cols-1 lg:grid-cols-[431px_1fr] gap-12 lg:gap-14">
                <div>
                  <span className="text-[13px] leading-[17px] font-bold tracking-[0.02em] text-[#53a8f5]">Security</span>
                  <h2 className="mt-3.5 text-[40px] leading-[42px] tracking-[-0.04em] font-bold text-white!">You Always Know Where Your Money Is.</h2>
                </div>
                <div className="flex flex-col gap-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-8">
                    {[
                      ['PIN or fingerprint on every payment', 'With the amount and recipient on screen.'],
                      ['Your BVN stays private', 'Used to confirm who you are, never shared.'],
                      ['Clear answers when things fail', 'Every failure says whether you were debited.'],
                      ['Stalled transfers get a deadline', 'Settled, or reversed to your wallet.'],
                    ].map(([t, d]) => (
                      <div key={t}>
                        <h4 className="text-[16px] leading-[21px] font-medium text-white!">{t}</h4>
                        <p className="mt-1.5 text-[14px] leading-[23px] text-[#a8bbd6]">{d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-[1.5px] border-dashed border-[#4c5866] rounded-[10px] px-4 py-3.5">
                    <p className="text-[13px] font-bold leading-[21px] text-[#a8bbd6]">
                      Licence and deposit-protection statement to be supplied. No regulator or insurer is named until confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </SectionWrap>

            {/* ─── Closing CTA ─── */}
            <SectionWrap className="py-16 lg:py-[120px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <h2 className="text-[44px] lg:text-[56px] leading-[1.07] tracking-[-0.04em] font-bold text-[#161c22]! dark:text-white! max-w-[600px]">
                Open Your Account in About Five Minutes.
              </h2>
              <StoreButtons tone="onLight" onApp={onOpenDownloadApp} onWhatsApp={onOpenWhatsApp} />
            </SectionWrap>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════════════════
             BUSINESS SUITE DIRECTION (Figma BB1 · Business Home)
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <BusinessHome onOpenDownloadApp={onOpenDownloadApp} onOpenWhatsApp={onOpenWhatsApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
