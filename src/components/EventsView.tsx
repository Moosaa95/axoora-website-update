import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const EventsView: React.FC = () => {
  const events = [
    {
      name: 'Abuja Merchant Financial Roundtable',
      date: 'October 15, 2026',
      city: 'Abuja (Maitama)',
      role: 'Host & Organizer',
      why: 'Convening 150 local shop owners and market trade associations to discuss non-interest float management and digital Ajo integration.',
      status: 'Upcoming',
    },
    {
      name: 'Nigeria Fintech & Inclusive Banking Summit',
      date: 'November 8, 2026',
      city: 'Lagos',
      role: 'Keynote Panelist',
      why: 'Sharing our field learnings on deploying dual-eSIM POS terminals and offline-tolerant banking rails across northern commercial centers.',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              COMMUNITY GATHERINGS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            Events &amp; Summits
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Where we meet traders, partners, and engineers in person across Nigeria.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-full bg-[#020F2E] border border-[#14294F] text-[#00DF8F]">
                  {ev.city} &bull; {ev.date}
                </span>
                <span className="text-[#0D95FE] font-semibold">{ev.role}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#F2F5F9]">{ev.name}</h3>

              <p className="text-sm text-[#A8BBD6] leading-relaxed">{ev.why}</p>

              <div className="pt-2 text-xs text-[#A8BBD6]/80 italic">
                Photographs and event proceedings will be published here following the gathering.
              </div>
            </div>
          ))}
        </div>

        {/* RSVP or Invite Note */}
        <div className="p-6 rounded-3xl bg-[#01091C] border border-[#14294F] text-center text-xs text-[#A8BBD6]">
          Would you like to invite Axoora to speak at your trade conference or host a local merchant workshop in your state? Write to us at{' '}
          <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-[#0D95FE] underline">
            {COMPANY_INFO.supportEmail}
          </a>
          .
        </div>
      </section>
    </div>
  );
};
