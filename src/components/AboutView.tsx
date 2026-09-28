import React from 'react';
import { ScreenType } from '../types';
import { VALUES_LIST, COMPANY_INFO } from '../data/mockData';
import { OurPeopleSection } from './OurPeopleSection';

interface AboutViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenWaitlist,
}) => {
  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header / Story Hero */}
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              OUR ORIGIN // ABUJA, NIGERIA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            We built one house for the person, the shop, and the agent.
          </h1>

          <p className="text-lg sm:text-xl text-[#A8BBD6] leading-relaxed max-w-3xl">
            We began in Abuja because too much of daily life still fights the tools that should carry it.
          </p>
        </div>
      </section>

      {/* The Story & Narrative */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-12 text-[#A8BBD6] leading-relaxed text-base sm:text-lg">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F9] tracking-tight">
            Why Axoora exists
          </h2>
          <p>
            In markets, residential streets, and rural outposts across Nigeria, honest commerce happens at immense speed. Yet the tools available to ordinary people and small traders have often been divided: one app for personal transfers, a separate difficult banking portal for a shop, and an estranged network for POS operators.
          </p>
          <p>
            At Axoora, we believe inclusion does not stop at opening an account or checking a balance. True inclusion means providing ethical, interest-free finance that respects faith and values, alongside the dignified lifestyle experiences — a booking, a meal, an international software payment — that modern life requires.
          </p>
          <p>
            We operate out of Cappador Mall in Maitama, Abuja. From our capital city, we build with both warmth and seriousness for the whole federation.
          </p>
        </div>

        {/* The Six Values (Strictly the six from Section 5 of the brief) */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              OUR SIX VALUES
            </span>
            <h3 className="text-3xl font-extrabold text-[#F2F5F9] tracking-tight">
              The principles that govern our house
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES_LIST.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#F2F5F9]">{val.title}</span>
                  <span className="text-[10px] font-mono text-[#00DF8F] px-2 py-0.5 rounded-full bg-[#020F2E] border border-[#14294F]">
                    {val.tag}
                  </span>
                </div>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          {/* Vision */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#020F2E] border-2 border-[#00DF8F]/50 flex flex-col gap-2">
            <span className="font-mono text-xs text-[#00DF8F] uppercase font-bold tracking-wider">
              OUR VISION
            </span>
            <h4 className="text-2xl font-extrabold text-[#F2F5F9]">
              Make a mark, and leave the world better than we met it.
            </h4>
            <p className="text-sm text-[#A8BBD6] leading-relaxed">
              Every system we write, every terminal we dispatch, and every loan structure we reject in favor of halal profit-sharing is guided by this quiet imperative.
            </p>
          </div>
        </div>

        {/* Culture Statement */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-[#F2F5F9]">
            Our Culture
          </h3>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            We want Axoora to feel welcoming, diverse, innovative, and driven by our vision. Anyone who is serious and decent should be able to see themselves here. We are not a closed room. We are not cold. We are not trendy for its own sake.
          </p>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            We invite people in, we take different backgrounds as a strength, we look for a better way, and we keep our eyes on leaving things better than we found them.
          </p>
        </div>
      </section>

      {/* Our People & Leadership Team Section */}
      <OurPeopleSection onNavigate={onNavigate} onOpenWaitlist={onOpenWaitlist} />

      {/* Close Section: Waitlist or Careers */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        <div className="p-8 rounded-3xl cta-gradient-banner bg-gradient-to-r from-[#0A1B3D] via-[#020F2E] to-[#0A1B3D] border-2 border-[#0D95FE]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold text-[#F2F5F9]">Be part of our journey</h4>
            <p className="text-sm text-[#A8BBD6]">Join the waitlist to be notified when we are live, or explore career opportunities.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWaitlist}
              className="px-6 py-3 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-xs sm:text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer whitespace-nowrap"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => {
                onNavigate('careers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-full bg-[#14294F] text-[#F2F5F9] hover:bg-[#1E3A6B] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
            >
              View Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
