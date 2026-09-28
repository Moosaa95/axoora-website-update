import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const PressView: React.FC = () => {
  const pressItems = [
    {
      publication: 'BusinessDay Nigeria',
      title: 'How Axoora is bridging informal commerce with regulated Islamic banking rails',
      date: 'September 2026',
      link: 'https://businessday.ng',
    },
    {
      publication: 'TechCabal',
      title: 'Beyond the super app: Axoora brings personal banking directly to WhatsApp',
      date: 'August 2026',
      link: 'https://techcabal.com',
    },
    {
      publication: 'Daily Trust',
      title: 'Abuja-based fintech Axoora receives Central Bank approval for inclusive payments',
      date: 'July 2026',
      link: 'https://dailytrust.com',
    },
  ];

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#0D95FE]"></span>
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              PRESS &amp; MEDIA ROOM
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            In the news
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Articles and coverage written about Axoora across national and continental business publications.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          {pressItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] hover:border-[#0D95FE] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono text-[#00DF8F] font-semibold">
                  {item.publication} &bull; {item.date}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#F2F5F9] group-hover:text-[#0D95FE] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#0D95FE] group-hover:translate-x-1 transition-transform shrink-0">
                <span>Read on {item.publication}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </div>
            </a>
          ))}
        </div>

        {/* Media Inquiries Card */}
        <div className="p-8 rounded-3xl bg-[#01091C] border-2 border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold text-[#F2F5F9]">Media &amp; Press Inquiries</h4>
            <p className="text-xs sm:text-sm text-[#A8BBD6]">
              For interviews, official commentary, or high-resolution brand asset requests.
            </p>
          </div>
          <a
            href={`mailto:${COMPANY_INFO.pressEmail}`}
            className="px-6 py-3 rounded-full bg-[#14294F] hover:bg-[#0D95FE] hover:text-[#00325b] text-xs sm:text-sm font-semibold text-[#F2F5F9] transition-all whitespace-nowrap"
          >
            Email {COMPANY_INFO.pressEmail}
          </a>
        </div>
      </section>
    </div>
  );
};
