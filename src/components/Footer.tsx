import React from 'react';
import { ScreenType } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { AxooraLogo } from './AxooraLogo';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#01091C] border-t border-[#14294F] mt-auto">
      {/* Axoora High-Impact Commercial Growth Banner */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-gradient-to-r from-[#0052CC] via-[#0D95FE] to-[#00DF8F] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Enjoy a business solution designed to help you grow.
            </h3>
            <p className="text-sm sm:text-base text-blue-100 font-medium">
              Join thousands of Nigerian shopkeepers, traders, and agents who experience smooth, easy daily banking.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenWaitlist()}
              className="px-7 py-3.5 rounded-full bg-white text-[#003B73] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-98"
            >
              <span>Open an account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3.5 rounded-full bg-blue-950/40 hover:bg-blue-950/60 border border-white/40 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat with us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Banner on Top of Footer as required in the brief */}
      <div className="w-full border-b border-[#14294F] bg-[#020F2E]/70 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F] shrink-0"></span>
            <p className="text-xs sm:text-sm font-medium text-[#F2F5F9]">
              {COMPANY_INFO.trustLine}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="text-xs font-semibold text-[#00DF8F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              <span>Bank with Axoora AI on WhatsApp</span>
            </button>
            <span className="text-[#14294F]">|</span>
            <button
              onClick={onOpenWaitlist}
              className="text-xs font-semibold text-[#0D95FE] hover:underline cursor-pointer"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center">
              <AxooraLogo size="lg" />
            </div>

            <p className="text-sm text-[#A8BBD6] leading-relaxed max-w-sm">
              AXOORA Financial Technologies Limited. Building finance that is affordable, sustainable, and free of interest for Nigerian individuals, shops, and agents.
            </p>

            <div className="flex items-start gap-2 text-xs text-[#A8BBD6] pt-1">
              <span className="material-symbols-outlined text-[#0D95FE] text-[18px] shrink-0">
                location_on
              </span>
              <span>Office: {COMPANY_INFO.office}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#00DF8F]">
                CBN LICENSED
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#A8BBD6]">
                NDIC INSURED
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[10px] text-[#0D95FE]">
                NDPR CERTIFIED
              </span>
            </div>
          </div>

          {/* Column 2: The Three Products */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
              Products
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm text-[#A8BBD6]">
              <button
                onClick={() => handleNav('personal')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Axoora AI — for the person
              </button>
              <button
                onClick={() => handleNav('business')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Axoora Business — for the shop
              </button>
              <button
                onClick={() => handleNav('pos-agents')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                POS &amp; Aggregator — for agents
              </button>
              <button
                onClick={onOpenWhatsApp}
                className="text-left text-[#00DF8F] hover:underline transition-colors flex items-center gap-1.5 pt-1"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>Bank on WhatsApp</span>
              </button>
            </nav>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
              Company
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm text-[#A8BBD6]">
              <button
                onClick={() => handleNav('about')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => handleNav('impact')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Impact
              </button>
              <button
                onClick={() => handleNav('stories')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Stories
              </button>
              <button
                onClick={() => handleNav('journal')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Journal
              </button>
              <button
                onClick={() => handleNav('press')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Press
              </button>
              <button
                onClick={() => handleNav('events')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Events
              </button>
              <button
                onClick={() => handleNav('careers')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Careers
              </button>
            </nav>
          </div>

          {/* Column 4: Help & Governance */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#F2F5F9] tracking-wider uppercase font-mono">
              Help &amp; Legal
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm text-[#A8BBD6]">
              <button
                onClick={() => handleNav('help')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Help Centre &amp; FAQs
              </button>
              <button
                onClick={() => handleNav('legal')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Privacy &amp; Terms
              </button>
              <button
                onClick={() => handleNav('legal')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                How to Complain
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="text-left hover:text-[#F2F5F9] transition-colors"
              >
                Contact Us
              </button>
              <div className="pt-2 text-xs text-[#A8BBD6]/70 leading-relaxed">
                Security notice: Axoora will never ask for your PIN or password on this site or over the phone.
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Refined Low-Opacity Monochrome Institutional Trust Bar */}
      <div className="w-full border-t border-[#14294F]/50 bg-[#01091C]/70 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Regulatory context caption in quiet typography */}
            <div className="flex items-center gap-2 text-[11px] text-[#A8BBD6]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]/70" />
              <span>Institutional Regulatory Governance &amp; Statutory Deposit Safeguards</span>
            </div>

            {/* Subtle, Low-Opacity Monochrome Badges that Appear on Hover */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              
              {/* CBN Licensed Official Badge */}
              <div
                className="group opacity-35 hover:opacity-100 transition-all duration-300 px-3.5 py-2 rounded-xl bg-[#05112A]/40 hover:bg-[#0A1B3D] border border-[#14294F]/40 hover:border-[#0D95FE]/50 flex items-center gap-2.5 cursor-pointer shadow-sm"
                title="Licensed by the Central Bank of Nigeria"
              >
                {/* Official-looking CBN Seal Icon */}
                <svg
                  className="w-5 h-5 text-[#A8BBD6] group-hover:text-[#F2F5F9] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" strokeDasharray="1 1" />
                  <circle cx="12" cy="12" r="8" />
                  <path d="M4 10h16M4 14h16M12 4v16" strokeWidth="0.8" opacity="0.4" />
                  <path d="M8 8h8M8 16h8" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.2" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8BBD6] group-hover:text-white transition-colors leading-none">
                    CBN LICENSED
                  </span>
                  <span className="text-[9px] text-[#A8BBD6]/70 group-hover:text-[#0D95FE] transition-colors mt-0.5">
                    Central Bank of Nigeria
                  </span>
                </div>
              </div>

              {/* NDIC Insured Official Badge */}
              <div
                className="group opacity-35 hover:opacity-100 transition-all duration-300 px-3.5 py-2 rounded-xl bg-[#05112A]/40 hover:bg-[#0A1B3D] border border-[#14294F]/40 hover:border-[#00DF8F]/50 flex items-center gap-2.5 cursor-pointer shadow-sm"
                title="Eligible deposits insured by the Nigeria Deposit Insurance Corporation"
              >
                {/* Official-looking NDIC Shield Icon */}
                <svg
                  className="w-5 h-5 text-[#A8BBD6] group-hover:text-[#F2F5F9] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L4 5v6.5c0 5 3.5 9.7 8 10.5 4.5-.8 8-5.5 8-10.5V5l-8-3z" />
                  <path d="M9 12l2 2 4-4" strokeWidth="2" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8BBD6] group-hover:text-white transition-colors leading-none">
                    NDIC INSURED
                  </span>
                  <span className="text-[9px] text-[#A8BBD6]/70 group-hover:text-[#00DF8F] transition-colors mt-0.5">
                    Deposit Insurance Corp.
                  </span>
                </div>
              </div>

              {/* PCI-DSS Level 1 Compliant */}
              <div
                className="group opacity-35 hover:opacity-100 transition-all duration-300 px-3.5 py-2 rounded-xl bg-[#05112A]/40 hover:bg-[#0A1B3D] border border-[#14294F]/40 hover:border-slate-400 flex items-center gap-2.5 cursor-pointer shadow-sm"
                title="Payment Card Industry Data Security Standard Level 1"
              >
                <svg
                  className="w-5 h-5 text-[#A8BBD6] group-hover:text-[#F2F5F9] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8BBD6] group-hover:text-white transition-colors leading-none">
                    PCI-DSS COMPLIANT
                  </span>
                  <span className="text-[9px] text-[#A8BBD6]/70 group-hover:text-slate-300 transition-colors mt-0.5">
                    Level 1 Security Rail
                  </span>
                </div>
              </div>

              {/* NIBSS Direct Switching */}
              <div
                className="group opacity-35 hover:opacity-100 transition-all duration-300 px-3.5 py-2 rounded-xl bg-[#05112A]/40 hover:bg-[#0A1B3D] border border-[#14294F]/40 hover:border-[#0D95FE]/50 flex items-center gap-2.5 cursor-pointer shadow-sm"
                title="Nigeria Inter-Bank Settlement System Real-Time Rail"
              >
                <svg
                  className="w-5 h-5 text-[#A8BBD6] group-hover:text-[#F2F5F9] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A8BBD6] group-hover:text-white transition-colors leading-none">
                    NIBSS SETTLEMENT
                  </span>
                  <span className="text-[9px] text-[#A8BBD6]/70 group-hover:text-[#0D95FE] transition-colors mt-0.5">
                    Sub-3s Central Switch
                  </span>
                </div>
              </div>

            </div>
          </div>

          <p className="text-[11px] text-[#A8BBD6]/70 leading-relaxed max-w-4xl">
            AXOORA Financial Technologies Limited. Banking and payment clearing services are administered in custodial partnership with licensed deposit money banks regulated by the Central Bank of Nigeria. Eligible deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to statutory maximums.
          </p>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="w-full border-t border-[#14294F] bg-[#000511]">
        <div className="w-full px-4 sm:px-8 py-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#A8BBD6]/80">
          <p>© 2026 AXOORA Financial Technologies Limited. All rights reserved. Axoora is a registered trademark in Nigeria.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('legal')} className="hover:text-[#F2F5F9]">Privacy</button>
            <button onClick={() => handleNav('legal')} className="hover:text-[#F2F5F9]">Terms</button>
            <button onClick={() => handleNav('legal')} className="hover:text-[#F2F5F9]">Cookies</button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#F2F5F9]">Abuja Office</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
