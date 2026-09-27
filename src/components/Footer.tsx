import React from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenOnboarding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOnboarding }) => {
  return (
    <footer className="w-full bg-[#01091C] border-t border-[#14294F] mt-auto">
      <div className="w-full px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tight text-[#F2F5F9]">
                Axoora<span className="text-[#0D95FE]">.ai</span>
              </span>
            </div>
            <p className="text-sm text-[#A8BBD6] leading-relaxed max-w-sm">
              Sovereign enterprise payments infrastructure, AI-orchestrated liquidity, and regulated digital settlement rails for emerging market economies.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[11px] text-[#A8BBD6]">
                CBN LICENSED PSSP
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[11px] text-[#A8BBD6]">
                NDIC INSURED VAULTS
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[11px] text-[#00DF8F]">
                PCI-DSS LEVEL 1
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0A1B3D] border border-[#14294F] font-mono text-[11px] text-[#0D95FE]">
                ISO 27001 SECURE
              </span>
            </div>
            <p className="text-xs text-[#A8BBD6]/80 pt-2 leading-normal">
              © 2026 Axoora Technologies Ltd. All rights reserved. Operating under CBN PSSP regulatory supervision. Deposit liabilities custody backed by primary NDIC insured tier-1 settlement banking partners.
            </p>
          </div>

          {/* Column 2: Products */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-[#F2F5F9] tracking-wider uppercase">
              Products
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-[#A8BBD6]">
              <button
                onClick={() => onNavigate('personal')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                Personal Banking
              </button>
              <button
                onClick={() => onNavigate('business-treasury')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                Business Treasury
              </button>
              <button
                onClick={() => onNavigate('pos-agents')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                POS Terminals
              </button>
              <button
                onClick={() => onNavigate('ajo-vaults')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                Ajo Vaults
              </button>
              <button
                onClick={() => onNavigate('whatsapp-ai')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                WhatsApp AI Banking
              </button>
            </nav>
          </div>

          {/* Column 3: Developers & Rails */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-[#F2F5F9] tracking-wider uppercase">
              Developers &amp; Rails
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-[#A8BBD6]">
              <button
                onClick={() => onNavigate('business-treasury')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                Real-Time Settlement Rails
              </button>
              <button
                onClick={() => onNavigate('whatsapp-ai')}
                className="text-left hover:text-[#0D95FE] transition-colors"
              >
                RAG Natural Language API
              </button>
              <span className="text-left text-[#A8BBD6]/70">
                NIBSS ISO 20022 Protocols
              </span>
              <span className="text-left text-[#A8BBD6]/70">
                Encrypted HSM Webhooks
              </span>
              <button
                onClick={onOpenOnboarding}
                className="text-left text-[#00DF8F] hover:underline transition-colors"
              >
                Spawn Sandbox Virtual Account
              </button>
            </nav>
          </div>

          {/* Column 4: Governance & Legal */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-[#F2F5F9] tracking-wider uppercase">
              Governance &amp; Compliance
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[#A8BBD6]">
              <div className="flex items-center gap-1.5 text-xs text-[#00DF8F]">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Central Bank of Nigeria (CBN) License: PSSP-2024/9912</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#0D95FE]">
                <span className="material-symbols-outlined text-[15px]">account_balance</span>
                <span>NDIC Deposit Insurance Certificate: ₦5,000,000 per depositor</span>
              </div>
              <span className="text-xs text-[#A8BBD6]/70">
                Anti-Money Laundering (AML/CFT) Directives Compliance
              </span>
              <span className="text-xs text-[#A8BBD6]/70">
                Nigeria Data Protection Regulation (NDPR) Audited
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-[#14294F] bg-[#01091C]">
        <div className="w-full px-4 sm:px-8 py-3.5 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#A8BBD6]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">location_on</span>
            <span>Plot 1044 Constitution Avenue, Maitama District, Abuja FCT, Nigeria</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00DF8F] inline-block animate-pulse"></span>
              <span>NIBSS Instant Payment (NIP): 99.98% OK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00DF8F] inline-block"></span>
              <span>Settlement Engine: Operational (0.84s)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
