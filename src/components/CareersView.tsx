import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const CareersView: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'eng-01',
      title: 'Senior Mobile & Fullstack Engineer',
      location: 'Abuja (Cappador Mall) / Hybrid',
      team: 'Core Platform',
      description:
        'Help build resilient payment handshakes and WhatsApp AI conversational banking tools. You should care deeply about offline resilience, low-latency NIP clearing, and clear, readable TypeScript.',
    },
    {
      id: 'ops-02',
      title: 'Agent Network Operations Specialist',
      location: 'Abuja & Northern Commercial Corridors',
      team: 'Agency Banking',
      description:
        'Support field POS agents and aggregators. Responsible for rapid terminal deployment, dispute investigation within 60 seconds, and ensuring agents have liquidity float when their shops open.',
    },
    {
      id: 'cx-03',
      title: 'Customer Experience Lead (WhatsApp Banking Desk)',
      location: 'Abuja (Maitama)',
      team: 'Customer Support',
      description:
        'Lead our high-touch banking support across WhatsApp and phone channels. Fluent in English, Pidgin, and Hausa or Yoruba. At Axoora, your problem has a name — you will never pass customers around.',
    },
  ];

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              JOIN OUR HOUSE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            Careers at Axoora
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Anyone who is serious and decent should be able to see themselves here. We invite people in, we take different backgrounds as a strength, and we keep our eyes on leaving things better than we found them.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#F2F5F9]">Open Positions</h2>
            <span className="text-xs font-mono text-[#00DF8F]">{roles.length} Active Openings</span>
          </div>

          <div className="flex flex-col gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2 max-w-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0D95FE]">
                    <span>{role.team}</span>
                    <span>&bull;</span>
                    <span>{role.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">{role.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${COMPANY_INFO.careersEmail}?subject=Application for ${encodeURIComponent(role.title)}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0D95FE] text-[#00325b] hover:bg-[#00DF8F] hover:text-[#003825] font-bold text-xs text-center transition-all"
                  >
                    Apply by Email
                  </a>
                  <a
                    href={`https://wa.me/2349110002966?text=Hello%20Axoora%20Team%2C%20I%20am%20applying%20for%20the%20role%20of%20${encodeURIComponent(role.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-xs font-semibold text-[#00DF8F] text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speculative Letter Note as per brief */}
        <div className="p-8 rounded-3xl bg-[#01091C] border-2 border-[#14294F] flex flex-col gap-3">
          <h3 className="text-lg font-bold text-[#F2F5F9]">Don't see your seat listed today?</h3>
          <p className="text-sm text-[#A8BBD6] leading-relaxed">
            If you are serious, decent, and care about solving real financial friction for Nigerian people and shops, we still want to hear from you. Send a letter explaining what you build and what you care about to{' '}
            <a href={`mailto:${COMPANY_INFO.careersEmail}`} className="text-[#0D95FE] underline font-medium">
              {COMPANY_INFO.careersEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};
