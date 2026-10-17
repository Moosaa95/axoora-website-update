'use client';

import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

import { AxooraLogo } from './AxooraLogo';

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
            Official news, press coverage, and brand assets of AXOORA FINANCIAL TECHNOLOGIES LTD.
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

        {/* Official Brand Identity Assets & Palette */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-[#0C91FA] uppercase font-bold tracking-wider">
                BRAND ASSETS // AXOORA FINANCIAL TECHNOLOGIES LTD
              </span>
              <h3 className="text-2xl font-black text-[#F2F5F9]">
                Brand Identity Guidelines
              </h3>
            </div>
            <a
              href="/axoora-logo.svg"
              download="axoora-logo.svg"
              className="px-4 py-2 rounded-xl bg-[#0C91FA] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Official SVG Logo</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Preview */}
            <div className="p-6 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col items-center justify-center gap-3">
              <AxooraLogo size="lg" theme="dark" />
              <p className="text-[11px] text-[#A8BBD6] text-center max-w-xs mt-2">
                Customized lowercase wordmark with linked &lsquo;oo&rsquo; emblem representing controlled movement and stability.
              </p>
            </div>

            {/* Typography */}
            <div className="p-6 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#0C91FA] font-bold">Brand Typography</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-white text-sm">Satoshi</span>
                    <span className="text-[#A8BBD6]">Primary Display &amp; Sans</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-white text-sm">Manrope</span>
                    <span className="text-[#A8BBD6]">Secondary (Reg, Med, SmBld)</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#A8BBD6] leading-relaxed">
                Sans Serif typography maintains modernism, minimalism, and timeless clarity.
              </p>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs font-mono font-bold uppercase text-[#A8BBD6]">Official Brand Color Palette</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2">
                <div className="w-full h-8 rounded-lg bg-[#0C91FA]" />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Axoora Blue</span>
                  <span className="font-mono text-[#A8BBD6]">#0C91FA</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2">
                <div className="w-full h-8 rounded-lg bg-[#020F2E] border border-white/20" />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Midnight Navy</span>
                  <span className="font-mono text-[#A8BBD6]">#020F2E</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2">
                <div className="w-full h-8 rounded-lg bg-[#0D95FE]" />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Electric Accent</span>
                  <span className="font-mono text-[#A8BBD6]">#0D95FE</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2">
                <div className="w-full h-8 rounded-lg bg-[#075FBE]" />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Deep Navy Blue</span>
                  <span className="font-mono text-[#A8BBD6]">#075FBE</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2 col-span-2 sm:col-span-1">
                <div className="w-full h-8 rounded-lg bg-[#C8E8F7]" />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Soft Ice Blue</span>
                  <span className="font-mono text-[#A8BBD6]">#C8E8F7</span>
                </div>
              </div>
            </div>
          </div>
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
