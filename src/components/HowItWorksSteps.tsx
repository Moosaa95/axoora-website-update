'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HowItWorksStepsProps {
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenDownloadApp: () => void;
}

export const HowItWorksSteps: React.FC<HowItWorksStepsProps> = ({
  onOpenWaitlist,
  onOpenDownloadApp,
}) => {
  const steps = [
    {
      step: '1',
      title: 'Fill in your details and verify your phone number',
      desc: 'Provide your name and business phone number, and verify with a quick WhatsApp or SMS OTP in 30 seconds.',
    },
    {
      step: '2',
      title: 'Get verified with your BVN and KYC details',
      desc: 'Enter your BVN and basic ID to unlock your dedicated 10-digit NUBAN account instantly with zero paperwork.',
    },
    {
      step: '3',
      title: 'Fund your account or receive your POS terminal',
      desc: 'Receive immediate customer card/transfer payments, with zero hidden maintenance deductions or stamp duties.',
    },
    {
      step: '4',
      title: 'Access your account dashboard and expense card',
      desc: 'Log in to your web portal or WhatsApp banking channel to track revenue, disburse salaries, and manage cards.',
    },
  ];

  return (
    <section className="relative w-full py-20 bg-white text-[#0F172A] border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#0D95FE]">
            FAST ONBOARDING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            How to Get Started
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            Your journey with Axoora starts here! Just follow these easy steps.
          </p>
        </div>

        {/* Centerpiece Phone Mockup previewing registration */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm p-4 rounded-3xl bg-[#F8FAFC] border-2 border-[#E2E8F0] shadow-lg flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between px-2 text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#0D95FE]">AXOORA ONBOARDING</span>
              <span className="text-[#00DF8F]">NIBSS READY</span>
            </div>

            <div className="w-full p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0D95FE]/10 text-[#0D95FE] flex items-center justify-center font-bold text-xs">
                  ₦
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">Create Business NUBAN</span>
                  <span className="text-[10px] text-[#64748B]">Instant Verification</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Phone Number</span>
                  <span className="font-mono font-bold text-[#0F172A]">+234 803 ••• 4920</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">BVN / KYC Status</span>
                  <span className="text-[#00875A] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Instant Verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenWaitlist('business')}
                className="w-full py-2.5 rounded-xl bg-[#0D95FE] text-white font-bold text-xs hover:bg-[#006FDB] transition-colors cursor-pointer mt-1"
              >
                Complete Onboarding
              </button>
            </div>
          </div>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start gap-3 relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0D95FE] text-white flex items-center justify-center font-bold text-base shadow-md">
                  {item.step}
                </div>
                <div className="h-0.5 flex-1 bg-[#E2E8F0] hidden lg:block" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* App Store and Google Play Download Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenDownloadApp}
            className="px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 transition-all flex items-center gap-3 cursor-pointer shadow-md hover:scale-[1.02]"
          >
            <svg className="w-6 h-6 text-white shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.65-2.79 1.41-.58.67-1.1 1.77-.96 2.83 1.12.09 2.15-.51 2.79-1.29z" />
            </svg>
            <div className="text-left">
              <span className="text-[10px] text-neutral-400 block leading-tight">Download on the</span>
              <span className="text-sm font-bold block leading-tight text-white">Apple App Store</span>
            </div>
          </button>

          <button
            onClick={onOpenDownloadApp}
            className="px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-neutral-900 border border-neutral-700 transition-all flex items-center gap-3 cursor-pointer shadow-md hover:scale-[1.02]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.362-.56-.88-.56-1.48V3.294c0-.6.213-1.118.56-1.48z" fill="#00C1A6"/>
              <path d="M17.378 8.414l-3.585 3.586 3.585 3.586 4.072-2.327c1.16-.663 1.16-1.745 0-2.408l-4.072-2.437z" fill="#FFBA00"/>
              <path d="M3.609 1.814l10.184 10.186 3.585-3.586L6.082.472C5.074-.104 4.095-.145 3.61 1.814z" fill="#2D7DD2"/>
              <path d="M13.793 12L3.61 22.186c.485 1.959 1.464 1.918 2.472 1.342l11.296-7.942-3.585-3.586z" fill="#F24C4C"/>
            </svg>
            <div className="text-left">
              <span className="text-[10px] text-neutral-400 block leading-tight">Get it on</span>
              <span className="text-sm font-bold block leading-tight text-white">Google Play Store</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
