'use client';

import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const GovernanceView: React.FC = () => {
  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F] w-fit">
            <span className="h-2 w-2 rounded-full bg-[#0D95FE]"></span>
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              REGULATORY COMPLIANCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F2F5F9]">
            Regulatory Status &amp; Governance
          </h1>
          <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed">
            Operating under stringent Nigerian financial regulatory frameworks.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#F2F5F9]">Central Bank of Nigeria (CBN)</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            AXOORA Financial Technologies Limited operates under the regulatory supervision of the Central Bank of Nigeria as a licensed microfinance bank. We adhere to statutory prudential guidelines and capital reserve requirements.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#F2F5F9]">NDIC Deposit Insurance</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            All eligible customer deposits held with Axoora are covered by the Nigeria Deposit Insurance Corporation (NDIC) up to the statutory maximum limit.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#F2F5F9]">Abuja Headquarters</h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            Physical operations and compliance desk are located at {COMPANY_INFO.office}. Registered with the Corporate Affairs Commission.
          </p>
        </div>
      </section>
    </div>
  );
};
