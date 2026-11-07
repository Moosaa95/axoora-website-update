'use client';

import React from 'react';
import { ScreenType } from '../types';
import { useCms } from '../context/CmsContext';

interface StoriesViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  onNavigate,
  onOpenWaitlist,
}) => {
  const { merchants } = useCms();

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
            Real people. Written permission. Photographs we took across Nigerian markets.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 max-w-6xl mx-auto flex flex-col items-center gap-12">
        {merchants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {merchants.map((merchant) => (
              <div
                key={merchant.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#071942] border border-[#14294F] hover:border-[#0D95FE]/50 transition-all flex flex-col justify-between gap-6 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={merchant.image || '/merchants/bilkisu.jpg'}
                      alt={merchant.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 shrink-0"
                      style={{ borderColor: merchant.accentColor || '#00DF8F' }}
                    />
                    <div>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-1 border border-current/25"
                        style={{ color: merchant.accentColor || '#00DF8F' }}
                      >
                        {merchant.badge}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{merchant.name}</h3>
                      <p className="text-xs text-[#A8BBD6]">
                        {merchant.role} · {merchant.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-[#A8BBD6] block">
                      {merchant.statLabel}
                    </span>
                    <span
                      className="text-lg sm:text-xl font-black font-mono"
                      style={{ color: merchant.accentColor || '#00DF8F' }}
                    >
                      {merchant.statValue}
                    </span>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-[#F2F5F9] leading-relaxed italic">
                  "{merchant.quote}"
                </blockquote>

                <div className="pt-4 border-t border-[#14294F] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00DF8F] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                    Verified Axoora Partner
                  </span>
                  <button
                    onClick={onOpenWaitlist}
                    className="text-xs font-bold text-[#0D95FE] hover:text-[#00DF8F] transition-colors cursor-pointer"
                  >
                    Open Similar Account →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4 text-left max-w-3xl">
            <h3 className="text-xl font-bold text-[#F2F5F9] text-center">
              Stories will appear here as early cohorts roll out
            </h3>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenWaitlist}
            className="px-7 py-3 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-sm transition-all cursor-pointer"
          >
            Join the Waitlist to Be in the First Cohort
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 rounded-full bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] hover:bg-[#14294F] text-sm font-semibold transition-colors cursor-pointer"
          >
            Read Our Origin Story
          </button>
        </div>
      </section>
    </div>
  );
};
