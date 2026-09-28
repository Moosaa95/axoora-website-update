import React from 'react';
import { ScreenType } from '../types';

interface StoriesViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  onNavigate,
  onOpenWaitlist,
}) => {
  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              COMMUNITY CASE STUDIES
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            Stories from our people
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Real people. Written permission. Photographs we took.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-20 h-20 rounded-full bg-[#0A1B3D] border-2 border-[#14294F] flex items-center justify-center text-[#0D95FE]">
          <span className="material-symbols-outlined text-[36px]">auto_stories</span>
        </div>

        <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4 text-left">
          <h3 className="text-xl font-bold text-[#F2F5F9] text-center">
            Stories will appear here as early cohorts roll out
          </h3>
          <p className="text-sm text-[#A8BBD6] leading-relaxed">
            At Axoora, we do not invent fictional personas or stock-photo testimonials. Every case study we publish will document how things were before, what the person or business used on Axoora, and what measurably changed in their daily livelihood.
          </p>
          <p className="text-sm text-[#A8BBD6] leading-relaxed">
            Our initial community cohorts in Maitama, Wuse, Balogun, and Kano are currently preparing their first operational cycles. We will publish their verified stories and photographs here.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenWaitlist}
            className="px-7 py-3 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer"
          >
            Join the Waitlist to Be in the First Cohort
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 rounded-full bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] hover:bg-[#14294F] text-sm font-semibold transition-colors"
          >
            Read Our Origin Story
          </button>
        </div>
      </section>
    </div>
  );
};
