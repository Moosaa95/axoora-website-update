import React from 'react';
import { ScreenType } from '../types';

interface ImpactViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  onNavigate,
  onOpenWaitlist,
}) => {
  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              OUR COMMITMENT // THE REAL ECONOMY
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            The informal economy is not a problem to be corrected; it is much of the real economy.
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Speaking with respect about the markets, rural shops, and thrift circles that power Nigeria every single day.
          </p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-12 text-[#A8BBD6]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#020F2E] text-[#00DF8F] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">diversity_3</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">Ajo in a licensed room</h3>
            <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
              Traditional thrift circles built on generational trust should not suffer from fraud or lack of records. Paycircle brings Ajo into a licensed, secure room where rules are clear and funds are safeguarded.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#020F2E] text-[#0D95FE] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">store</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">A proper shop account</h3>
            <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
              Traders should not mix personal domestic chores with commercial inventory. We give every shop a verified business account, clean statements, and interest-free trade financing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#020F2E] text-[#F2A93B] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <h3 className="text-lg font-bold text-[#F2F5F9]">A terminal for the village</h3>
            <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
              Rural communities should not have to travel miles of difficult roads to withdraw cash or pay school fees. We equip reliable local agents with dual-network terminals that keep running.
            </p>
          </div>
        </div>

        {/* Note on honest reporting */}
        <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">verified</span>
            <h4 className="text-lg font-bold text-[#F2F5F9]">Our Policy on Metrics and Data</h4>
          </div>
          <p className="text-sm text-[#A8BBD6] leading-relaxed">
            We do not publish invented percentages or speculative claims. As our cohorts rollout across Abuja and beyond, we will publish audited, verified impact figures — detailing real merchant hours saved, rural cashpoint coverage, and interest-free funds disbursed.
          </p>
        </div>

        {/* Action */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenWaitlist}
            className="px-8 py-3.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer"
          >
            Join the Waitlist
          </button>
        </div>
      </section>
    </div>
  );
};
