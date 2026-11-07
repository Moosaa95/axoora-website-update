'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { AppleAppStoreBadge, GooglePlayBadge } from './StoreBadges';

interface HowItWorksStepsProps {
  isLight?: boolean;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenDownloadApp: () => void;
}

export const HowItWorksSteps: React.FC<HowItWorksStepsProps> = ({
  isLight: propIsLight,
  onOpenWaitlist,
  onOpenDownloadApp,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const steps = [
    {
      step: '1',
      title: 'Fill in your details and verify your phone number',
      desc: 'Provide your name and business phone number, and verify with a quick WhatsApp or SMS OTP in 30 seconds.',
      badge: 'PHONE & WHATSAPP OTP',
      mockupHeading: 'Step 1: Mobile Verification',
      mockupSub: 'Instant OTP over WhatsApp',
      mockupContent: {
        field1Label: 'Phone Number',
        field1Value: '+234 803 ••• 4920',
        field2Label: 'WhatsApp OTP Code',
        field2Value: '4 8 2 9 1 0  (Verified)',
        status: 'Identity Pre-check Passed',
      },
    },
    {
      step: '2',
      title: 'Get verified with your BVN and KYC details',
      desc: 'Enter your BVN and basic ID to unlock your dedicated 10-digit NUBAN account instantly with zero paperwork.',
      badge: 'INSTANT BVN CHECK',
      mockupHeading: 'Step 2: NIBSS KYC Verification',
      mockupSub: 'Zero Paperwork · Sub-60s',
      mockupContent: {
        field1Label: 'BVN Status',
        field1Value: '2214 •••• 891 (Matched)',
        field2Label: 'Dedicated NUBAN',
        field2Value: '0124893921 (Active)',
        status: 'CBN Tier 3 Limit Unlocked',
      },
    },
    {
      step: '3',
      title: 'Fund your account or receive your POS terminal',
      desc: 'Receive immediate customer card/transfer payments, with zero hidden maintenance deductions or stamp duties.',
      badge: 'INSTANT SETTLEMENT',
      mockupHeading: 'Step 3: Account & Hardware Ready',
      mockupSub: 'Dual-SIM Apex POS or App',
      mockupContent: {
        field1Label: 'Apex 4G POS',
        field1Value: 'Dispatched to Balogun Market',
        field2Label: 'Available Balance',
        field2Value: '₦50,000.00 (Ready)',
        status: 'Sub-2s NIBSS Inflow Active',
      },
    },
    {
      step: '4',
      title: 'Access your account dashboard and expense card',
      desc: 'Log in to your web portal or WhatsApp banking channel to track revenue, disburse salaries, and manage cards.',
      badge: 'BANK IN APP OR CHAT',
      mockupHeading: 'Step 4: Transact Freely',
      mockupSub: 'WhatsApp Bot + Virtual Cards',
      mockupContent: {
        field1Label: 'WhatsApp Banking',
        field1Value: 'Type "Hi" to send money',
        field2Label: 'Virtual Dollar Card',
        field2Value: '5399 •••• 4182 (Active)',
        status: '₦0 Transfer Fees Guaranteed',
      },
    },
  ];

  const currentStep = steps[activeStepIdx];

  return (
    <section
      className={`relative w-full py-20 border-b transition-colors overflow-hidden ${
        isLight
          ? 'bg-white text-slate-900 border-slate-200'
          : 'bg-[#020F2E] text-[#F2F5F9] border-[#14294F]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#0D95FE]">
            FAST ONBOARDING
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
            }`}
          >
            How to Get Started
          </h2>
          <p className={`text-base sm:text-lg ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
            Your journey with Axoora starts here! Just follow these easy steps to activate your account.
          </p>
        </div>

        {/* Centerpiece Phone Mockup previewing registration */}
        <div className="flex justify-center">
          <div
            className={`w-full max-w-sm sm:max-w-md p-5 rounded-3xl border-2 shadow-xl flex flex-col items-center gap-4 transition-all ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <div className="w-full flex items-center justify-between px-2 text-xs font-mono">
              <span className="font-bold text-[#0D95FE]">AXOORA ONBOARDING</span>
              <span className="text-[#00DF8F] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                NIBSS READY
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIdx}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`w-full p-5 rounded-2xl border shadow-sm flex flex-col gap-3 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#020F2E] border-[#14294F]'
                }`}
              >
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-[#14294F]">
                  <div className="w-9 h-9 rounded-full bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center font-bold text-sm">
                    {currentStep.step}
                  </div>
                  <div>
                    <span className={`text-xs font-extrabold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {currentStep.mockupHeading}
                    </span>
                    <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-[#A8BBD6]'}`}>
                      {currentStep.mockupSub}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#071738] border-[#14294F]'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>
                      {currentStep.mockupContent.field1Label}
                    </span>
                    <span className="font-mono font-bold">{currentStep.mockupContent.field1Value}</span>
                  </div>

                  <div
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#071738] border-[#14294F]'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}>
                      {currentStep.mockupContent.field2Label}
                    </span>
                    <span className="text-[#00DF8F] font-bold flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      {currentStep.mockupContent.field2Value}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#00DF8F]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    {currentStep.mockupContent.status}
                  </span>
                </div>

                <button
                  onClick={() => onOpenWaitlist('business')}
                  className="w-full py-3 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs transition-all cursor-pointer mt-1 shadow-md active:scale-98"
                >
                  Start Onboarding Now →
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-start gap-3 relative ${
                  isActive
                    ? isLight
                      ? 'bg-white border-[#0D95FE] shadow-md ring-2 ring-[#0D95FE]/20'
                      : 'bg-[#0A1B3D] border-[#0D95FE] shadow-md ring-2 ring-[#0D95FE]/30'
                    : isLight
                    ? 'bg-slate-50 hover:bg-white border-slate-200'
                    : 'bg-[#0A1B3D]/60 hover:bg-[#0A1B3D] border-[#14294F]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                      isActive ? 'bg-[#0D95FE] text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white'
                    }`}
                  >
                    {item.step}
                  </div>
                  <span
                    className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-[#0D95FE]/15 text-[#0D95FE] border-[#0D95FE]/30'
                        : isLight
                        ? 'bg-slate-200 text-slate-600 border-slate-300'
                        : 'bg-[#14294F] text-[#A8BBD6] border-[#1E3A6B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4
                  className={`text-base font-bold leading-snug transition-colors ${
                    isActive
                      ? isLight
                        ? 'text-[#0D95FE]'
                        : 'text-[#0D95FE]'
                      : isLight
                      ? 'text-slate-900'
                      : 'text-[#F2F5F9]'
                  }`}
                >
                  {item.title}
                </h4>

                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                  {item.desc}
                </p>

                <div className="mt-auto pt-2 flex items-center gap-1 text-[11px] font-bold text-[#0D95FE]">
                  <span>{isActive ? 'Active Preview' : 'Click to preview'}</span>
                  <span className="material-symbols-outlined text-[14px]">
                    {isActive ? 'check' : 'arrow_forward'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* App Store and Google Play Download Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <AppleAppStoreBadge
            onClick={onOpenDownloadApp}
            isLight={isLight}
          />
          <GooglePlayBadge
            onClick={onOpenDownloadApp}
            isLight={isLight}
          />
        </div>
      </div>
    </section>
  );
};
