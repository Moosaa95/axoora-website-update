import React, { useState } from 'react';
import { ScreenType, BankAccount } from '../types';
import { ScrollytellingSection } from './ScrollytellingSection';
import { Card3DShowcaseSection } from './Card3DShowcaseSection';

interface PersonalViewProps {
  account: BankAccount;
  onNavigate: (screen: ScreenType) => void;
  onOpenOnboarding: () => void;
  onOpenTransfer: () => void;
}

export const PersonalView: React.FC<PersonalViewProps> = ({
  account,
  onNavigate,
  onOpenOnboarding,
  onOpenTransfer,
}) => {
  // Showcase Tab state: 'cashflow' | 'agent'
  const [showcaseTab, setShowcaseTab] = useState<'cashflow' | 'agent'>('cashflow');

  // WhatsApp simulation states
  const [authStatus, setAuthStatus] = useState<'idle' | 'verifying' | 'settled'>('idle');

  // Commission calculator state
  const [agentVolume, setAgentVolume] = useState(1500000);

  // Copy feedback state
  const [copiedNuban, setCopiedNuban] = useState(false);

  const handleSimulateAuth = () => {
    setAuthStatus('verifying');
    setTimeout(() => {
      setAuthStatus('settled');
    }, 900);
  };

  const handleCopyNuban = (nuban: string) => {
    navigator.clipboard?.writeText?.(nuban);
    setCopiedNuban(true);
    setTimeout(() => setCopiedNuban(false), 2000);
  };

  // Agent monthly calculation
  const calculatedAgentCommission = Math.round(agentVolume * 0.0041 * 30);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full px-4 sm:px-8 py-12 lg:py-20 border-b border-[#14294F] overflow-hidden">
        {/* Subtle geometric ambient grid backdrop */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0D95FE_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Telemetry Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00DF8F]"></span>
              </span>
              <span className="font-mono text-xs text-[#F2F5F9]">
                Live across Nigeria <span className="text-[#A8BBD6]">•</span> ₦4.2B+ Daily Settlement{' '}
                <span className="text-[#A8BBD6]">•</span>{' '}
                <span className="text-[#00DF8F] font-semibold">CBN Licensed PSSP</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F2F5F9] tracking-tight leading-[1.08]">
              Money, simplified <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D95FE] via-[#00DF8F] to-teal-300">
                for the street.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl leading-relaxed">
              The AI financial ecosystem for individuals, shops, and agents. Enterprise-grade rails
              engineered for instant NIBSS settlement, automated Ajo rotational credit, and
              frictionless WhatsApp daily commerce.
            </p>

            {/* Action Button Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenOnboarding}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm sm:text-base hover:bg-[#00DF8F] hover:text-[#003825] transition-all shadow-lg shadow-[#0D95FE]/20"
              >
                <span>Get Started Free</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate('pos-agents')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A1B3D]/80 hover:bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] font-medium text-sm sm:text-base transition-all"
              >
                <span>Explore POS Terminal</span>
                <span className="material-symbols-outlined text-[18px] text-[#A8BBD6]">
                  arrow_outward
                </span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-4 border-t border-[#14294F] flex flex-wrap items-center gap-y-2 gap-x-6">
              <div className="flex items-center gap-1.5 text-[#A8BBD6] text-xs font-medium">
                <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">
                  verified_user
                </span>
                <span>CBN Licensed PSSP</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A8BBD6] text-xs font-medium">
                <span className="material-symbols-outlined text-[#0D95FE] text-[18px]">
                  account_balance
                </span>
                <span>NDIC Insured Custodian Reserves</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A8BBD6] text-xs font-medium">
                <span className="material-symbols-outlined text-[#F2A93B] text-[18px]">lock</span>
                <span>PCI-DSS Level 1 Validated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pixel Device Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] p-3.5 bg-[#01091C] border border-[#00DF8F]/30 relative shadow-2xl">
              {/* Outer subtle metallic bevel simulation */}
              <div className="rounded-[36px] bg-[#01091C] border border-[#14294F] overflow-hidden flex flex-col relative text-[#F2F5F9]">
                {/* Android Camera Punch Hole & Status Bar */}
                <div className="px-6 pt-3 pb-2 flex items-center justify-between text-[#A8BBD6] font-mono text-[11px]">
                  <span className="font-semibold text-[#F2F5F9]">09:41</span>
                  {/* Camera Punch Hole */}
                  <div className="w-3.5 h-3.5 rounded-full bg-[#01091C] border border-[#14294F]"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">
                      signal_cellular_alt
                    </span>
                    <span className="material-symbols-outlined text-[14px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>

                {/* In-App Header */}
                <div className="px-5 py-3 flex items-center justify-between border-b border-[#14294F]/50 bg-[#0A1B3D]/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0A1B3D] flex items-center justify-center border border-[#14294F]">
                      <span className="font-bold text-xs text-[#00DF8F]">A●</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F2F5F9] leading-tight">
                        Axoora Street Vault
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]"></span>
                        <span className="text-[10px] text-[#00DF8F]">Tier 3 Verified</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenOnboarding()}
                    className="w-8 h-8 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#A8BBD6] hover:text-[#F2F5F9]"
                  >
                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                  </button>
                </div>

                {/* Scrollable Inside Mockup Frame */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Balance Card */}
                  <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#A8BBD6] uppercase tracking-wider">
                        Total Liquid Balance
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F] text-[#00DF8F] font-mono text-[11px]">
                        +14.2% this mo
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono text-[#F2F5F9] tabular-nums">
                        ₦{account.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#14294F]/40 font-mono text-[11px] text-[#A8BBD6]">
                      <span>Wema Inst. Rail: {account.accountNumber}</span>
                      <span className="text-[#0D95FE] font-medium">Auto-Sweep</span>
                    </div>
                  </div>

                  {/* Quick Action Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <button
                      onClick={onOpenTransfer}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#0D95FE] group-hover:bg-[#14294F] transition-all">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                      </div>
                      <span className="text-xs text-[#F2F5F9]">Send</span>
                    </button>

                    <button
                      onClick={() => onNavigate('ajo-vaults')}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#00DF8F] group-hover:bg-[#14294F] transition-all">
                        <span className="material-symbols-outlined text-[20px]">savings</span>
                      </div>
                      <span className="text-xs text-[#F2F5F9]">Ajo Save</span>
                    </button>

                    <button
                      onClick={() => onNavigate('pos-agents')}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#F2A93B] group-hover:bg-[#14294F] transition-all">
                        <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                      </div>
                      <span className="text-xs text-[#F2F5F9]">Terminal</span>
                    </button>

                    <button
                      onClick={() => {
                        const el = document.getElementById('card-3d-showcase');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#6FBDFE] group-hover:bg-[#14294F] transition-all">
                        <span className="material-symbols-outlined text-[20px]">credit_card</span>
                      </div>
                      <span className="text-xs text-[#F2F5F9]">Cards</span>
                    </button>
                  </div>

                  {/* Live Push Notification Toast */}
                  <div className="p-3 rounded-xl bg-[#14294F] border-2 border-[#00DF8F] flex items-start gap-2.5 animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F] shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">south_west</span>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-[#F2F5F9] font-semibold truncate">
                          Chidinma Okafor
                        </span>
                        <span className="font-mono text-[#00DF8F] font-bold text-[12px]">
                          +₦25,000.00
                        </span>
                      </div>
                      <p className="text-xs text-[#A8BBD6] truncate">Ajo Vault • Instant NIP 0.89s</p>
                    </div>
                  </div>

                  {/* Recent Activity Item */}
                  <div className="p-3 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#273454] flex items-center justify-center text-[#A8BBD6] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] text-[#F2F5F9] truncate font-medium">
                          Balogun Wholesale Market
                        </span>
                        <span className="text-xs text-[#A8BBD6]">Direct Supplier POS</span>
                      </div>
                    </div>
                    <span className="font-mono text-[13px] text-[#F2F5F9] font-semibold shrink-0">
                      -₦142,500.00
                    </span>
                  </div>
                </div>

                {/* Home indicator bar */}
                <div className="w-28 h-1 bg-[#14294F] rounded-full mx-auto my-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE SCROLLYTELLING SECTION (OW0.APP INSPIRED - 300VH STAGE) */}
      <ScrollytellingSection
        onOpenTransfer={onOpenTransfer}
        onOpenOnboarding={onOpenOnboarding}
        onNavigateToWhatsApp={() => onNavigate('whatsapp-ai')}
      />

      {/* ENHANCEMENT 2: HORIZONTAL & STACKED CARD-STACKING ONBOARDING FLOW */}
      <section className="w-full px-4 sm:px-8 py-12 lg:py-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <span className="font-mono text-xs text-[#00DF8F] tracking-widest uppercase font-semibold">
                ZERO PAPERWORK • 90-SECOND SOVEREIGN CLEARANCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F5F9]">
                4 Steps to Sovereign Commerce
              </h2>
              <p className="text-base text-[#A8BBD6]">
                Experience frictionless onboarding engineered for high-volume traders, independent
                shops, and smart agents across Nigeria.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="px-3 py-1 rounded-full bg-[#0A1B3D] border border-[#14294F] text-xs font-mono text-[#0D95FE] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0D95FE] animate-pulse"></span> Tier 3 KYC
                Automated
              </span>
            </div>
          </div>

          {/* Stacked Cards Container */}
          <div className="relative flex flex-col gap-6">
            {/* STACK CARD 1 */}
            <div className="rounded-2xl bg-[#0A1B3D] border-2 border-[#0D95FE]/40 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all hover:border-[#0D95FE]">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0D95FE]/20 border border-[#0D95FE] flex items-center justify-center text-[#0D95FE] font-mono font-bold text-lg">
                    01
                  </span>
                  <span className="font-mono text-xs text-[#0D95FE] tracking-wider uppercase font-semibold">
                    STEP 1: INITIATION
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">
                  Scan QR or Say "Hi" on WhatsApp
                </h3>
                <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
                  No downloads required. No App Store account friction. Simply scan the QR code or
                  message Axoora’s Meta Verified Business WhatsApp line to instantly spawn your
                  private, sovereign financial vault session.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#00DF8F] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">bolt</span> 1.2s Session
                    Handshake
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#A8BBD6]">
                    End-to-End Meta Cloud TLS 1.3
                  </span>
                </div>
              </div>

              {/* Micro Mockup 1 */}
              <div className="w-full lg:w-96 rounded-xl bg-[#01091C] border border-[#14294F] p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#14294F] pb-2">
                  <span className="font-mono text-xs text-[#F2F5F9] font-semibold">
                    SESSION_START_QR
                  </span>
                  <span className="font-mono text-[11px] text-[#00DF8F]">ACTIVE</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#14294F] border-2 border-[#0D95FE] rounded-lg flex items-center justify-center text-[#0D95FE] shrink-0">
                    <span className="material-symbols-outlined text-[44px]">qr_code_2</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-[#F2F5F9] font-bold">wa.me/+234800AXOORA</span>
                    <span className="text-[#A8BBD6]">
                      Send keyword <span className="text-[#00DF8F] font-mono">"START"</span> to spawn
                      zero-fee merchant sub-wallet.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STACK CARD 2 */}
            <div className="rounded-2xl bg-[#0A1B3D] border-2 border-[#00DF8F]/40 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all hover:border-[#00DF8F]">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#00DF8F]/20 border border-[#00DF8F] flex items-center justify-center text-[#00DF8F] font-mono font-bold text-lg">
                    02
                  </span>
                  <span className="font-mono text-xs text-[#00DF8F] tracking-wider uppercase font-semibold">
                    STEP 2: AUTONOMOUS KYC
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">
                  Verify in 90 Seconds via NIBSS
                </h3>
                <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
                  Input your BVN or NIN directly into the secure chat prompt. Our automated identity
                  bridge validates biometric hashes with the Central Bank database in real time,
                  unlocking full Tier 3 limits with zero branch visits.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#00DF8F] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>{' '}
                    Tier 3 Uncapped Limit
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#A8BBD6]">
                    Zero Physical Document Uploads
                  </span>
                </div>
              </div>

              {/* Micro Mockup 2 */}
              <div className="w-full lg:w-96 rounded-xl bg-[#01091C] border border-[#14294F] p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#14294F] pb-2">
                  <span className="font-mono text-xs text-[#00DF8F] font-semibold">
                    CBN_NIBSS_PIPELINE
                  </span>
                  <span className="font-mono text-[11px] text-[#0D95FE]">MATCH: 100%</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between bg-[#0A1B3D] p-2 rounded border border-[#14294F]">
                    <span className="text-[#A8BBD6]">BVN Identity:</span>
                    <span className="text-[#00DF8F] font-bold">2219•••••92 [VALID]</span>
                  </div>
                  <div className="flex justify-between bg-[#0A1B3D] p-2 rounded border border-[#14294F]">
                    <span className="text-[#A8BBD6]">NIN Match:</span>
                    <span className="text-[#00DF8F] font-bold">4810•••••11 [PASS]</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00DF8F] text-[11px] pt-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>{' '}
                    Instant Tier-3 CBN Clearance Granted
                  </div>
                </div>
              </div>
            </div>

            {/* STACK CARD 3 */}
            <div className="rounded-2xl bg-[#0A1B3D] border-2 border-[#F2A93B]/40 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all hover:border-[#F2A93B]">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#F2A93B]/20 border border-[#F2A93B] flex items-center justify-center text-[#F2A93B] font-mono font-bold text-lg">
                    03
                  </span>
                  <span className="font-mono text-xs text-[#F2A93B] tracking-wider uppercase font-semibold">
                    STEP 3: INSTANT NUBAN ASSIGNMENT
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">
                  Fund via Dedicated Commercial NUBAN
                </h3>
                <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
                  You receive a permanent 10-digit virtual bank account number linked to Wema,
                  Zenith, or Access Bank. Inflows settle with zero lag into your daily yield vault
                  paying 15.5% APY compounding every midnight.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#F2A93B] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">account_balance</span>{' '}
                    Triple-Bank Redundancy
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#A8BBD6]">
                    Sub-second Auto Sweep
                  </span>
                </div>
              </div>

              {/* Micro Mockup 3 */}
              <div className="w-full lg:w-96 rounded-xl bg-[#01091C] border border-[#14294F] p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#14294F] pb-2">
                  <span className="font-mono text-xs text-[#F2A93B] font-semibold">
                    NUBAN_DIRECT_DISBURSE
                  </span>
                  <span className="font-mono text-[11px] text-[#00DF8F]">ACTIVE 24/7</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-1.5">
                  <span className="text-[#A8BBD6] uppercase text-[10px]">
                    Permanent Assigned NUBAN
                  </span>
                  <div className="font-mono text-lg font-bold text-[#F2F5F9] flex items-center justify-between">
                    <span>{account.accountNumber}</span>
                    <button
                      onClick={() => handleCopyNuban(account.accountNumber)}
                      className="p-1 rounded hover:bg-[#14294F] text-[#0D95FE] transition-colors"
                      title="Copy NUBAN"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedNuban ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-between text-xs text-[#A8BBD6] pt-1 border-t border-[#14294F]/50">
                    <span>Partner: Wema Bank Plc</span>
                    <span className="text-[#00DF8F] font-medium">15.5% APY Daily Sweep</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STACK CARD 4 */}
            <div className="rounded-2xl bg-[#0A1B3D] border-2 border-[#0D95FE] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#0D95FE]/20 border border-[#0D95FE] flex items-center justify-center text-[#0D95FE] font-mono font-bold text-lg">
                    04
                  </span>
                  <span className="font-mono text-xs text-[#0D95FE] tracking-wider uppercase font-semibold">
                    STEP 4: SOVEREIGN TRANSACTING
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">
                  Transact via Natural Street Voice
                </h3>
                <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
                  You're ready. Disburse funds to suppliers, initiate rotational Ajo draws, reload
                  airtime, and dispute POS glitches directly using everyday Nigerian expressions.
                  Zero manual forms, forever.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onOpenOnboarding}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all"
                  >
                    <span>Spawn Account Now</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <span className="px-3 py-1 rounded-lg bg-[#14294F] border border-[#14294F] font-mono text-xs text-[#00DF8F]">
                    99.98% NIP Clearing SLA
                  </span>
                </div>
              </div>

              {/* Micro Mockup 4 */}
              <div className="w-full lg:w-96 rounded-xl bg-[#01091C] border-2 border-[#00DF8F] p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#14294F] pb-2">
                  <span className="font-mono text-xs text-[#00DF8F] font-semibold">
                    VOICE_EXECUTION_STAMP
                  </span>
                  <span className="font-mono text-[11px] text-[#00DF8F]">COMPLETE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F]">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#F2F5F9]">₦50,000 Transferred</span>
                    <span className="text-xs text-[#A8BBD6]">
                      To: Yaba Wholesale Float • Ref: 0x89A...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHATSAPP AI & RAG INTERACTION STRIP */}
      <section className="w-full px-4 sm:px-8 py-12 lg:py-20 border-b border-[#14294F] bg-[#01091C]/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col gap-1 max-w-3xl">
            <span className="font-mono text-xs text-[#00DF8F] tracking-widest uppercase font-semibold">
              CONVERSATIONAL COMMERCE ENGINE // ZERO-APP BANKING
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F5F9]">
              Transact at the speed of conversation.
            </h2>
            <p className="text-base text-[#A8BBD6]">
              Turn natural voice notes and WhatsApp chats into legally binding, instant interbank
              transactions with sovereign AI guardrails.
            </p>
          </div>

          {/* Side-by-Side Interactive Split Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT CARD: Simulated WhatsApp Interface */}
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex flex-col gap-4">
                {/* Simulated Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base text-[#F2F5F9] font-semibold">
                          Axoora AI Copilot
                        </span>
                        <span className="material-symbols-outlined text-[#00a884] text-[16px]">
                          check_circle
                        </span>
                      </div>
                      <span className="text-xs text-[#00a884]">
                        Official Verified Business • Online (0.89s response)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#A8BBD6]">
                    <span className="material-symbols-outlined text-[20px]">videocam</span>
                    <span className="material-symbols-outlined text-[20px]">call</span>
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </div>
                </div>

                {/* Chat Stream */}
                <div className="flex flex-col gap-3 py-2">
                  {/* Chat Bubble 1: User */}
                  <div className="self-end max-w-[85%] bg-[#005c4b] text-white rounded-2xl rounded-tr-none px-4 py-2.5 flex flex-col gap-1">
                    <p className="text-sm">Send ₦5,000 to Chidinma for fuel</p>
                    <div className="self-end flex items-center gap-1 text-[11px] text-teal-200">
                      <span>14:32</span>
                      <span className="material-symbols-outlined text-[14px]">done_all</span>
                    </div>
                  </div>

                  {/* Chat Bubble 2: Axoora AI Assistant */}
                  <div className="self-start max-w-[95%] bg-[#14294F] text-[#F2F5F9] rounded-2xl rounded-tl-none p-4 border border-[#14294F] flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0D95FE]/20 text-[#0D95FE] font-mono text-xs">
                        INTENT PARSED
                      </span>
                      <span className="text-xs text-[#A8BBD6]">DISBURSE_NIP_TRANSFER</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Payment intent parsed:{' '}
                      <strong className="text-[#F2F5F9]">₦5,000.00</strong> to{' '}
                      <strong className="text-[#F2F5F9]">Chidinma Okafor</strong> (Access Bank •
                      0128941029).
                    </p>

                    {/* Embedded Transaction Card inside Bubble */}
                    <div className="p-3.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2.5">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[#A8BBD6] block">Recipient</span>
                          <span className="font-semibold text-[#F2F5F9]">Chidinma Okafor</span>
                        </div>
                        <div>
                          <span className="text-[#A8BBD6] block">Destination Bank</span>
                          <span className="font-semibold text-[#F2F5F9]">Access Bank Plc</span>
                        </div>
                        <div>
                          <span className="text-[#A8BBD6] block">Disbursement Amount</span>
                          <span className="font-mono text-[#00DF8F] font-bold text-sm">
                            ₦5,000.00
                          </span>
                        </div>
                        <div>
                          <span className="text-[#A8BBD6] block">Memo / Tag</span>
                          <span className="text-[#F2F5F9]">Fuel / Transport</span>
                        </div>
                      </div>

                      {/* Biometric Authorization Action */}
                      <button
                        onClick={handleSimulateAuth}
                        disabled={authStatus === 'settled'}
                        className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          authStatus === 'settled'
                            ? 'bg-[#0D95FE] text-[#00325b]'
                            : authStatus === 'verifying'
                            ? 'bg-[#00DF8F]/70 text-[#003825]'
                            : 'bg-[#00DF8F] hover:bg-emerald-400 text-[#003825]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {authStatus === 'settled'
                            ? 'check_circle'
                            : authStatus === 'verifying'
                            ? 'hourglass_empty'
                            : 'fingerprint'}
                        </span>
                        <span>
                          {authStatus === 'settled'
                            ? '✓ Transfer Settled: NIP-TX-84910'
                            : authStatus === 'verifying'
                            ? 'Verifying Biometrics...'
                            : 'Authorize with Touch ID / PIN [Tap to Approve]'}
                        </span>
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-[#A8BBD6] font-mono pt-1">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]"></span> Instant
                          NIP Handshake Ready
                        </span>
                        <span>Token: HSM-256</span>
                      </div>
                    </div>
                    <span className="self-end text-[11px] text-[#A8BBD6]">14:32</span>
                  </div>
                </div>
              </div>

              {/* Bottom Mock Input Field */}
              <div className="pt-3 border-t border-[#14294F] flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Type a command or send a Pidgin/Yorùbá voice note..."
                  onClick={() => onNavigate('whatsapp-ai')}
                  className="flex-1 bg-[#01091C] border border-[#14294F] rounded-xl px-3.5 py-2 text-[#A8BBD6] text-xs cursor-pointer focus:outline-none"
                />
                <button
                  onClick={() => onNavigate('whatsapp-ai')}
                  className="w-10 h-10 rounded-xl bg-[#00DF8F] flex items-center justify-center text-[#003825] hover:brightness-110 transition-all"
                  title="Open Full WhatsApp AI Lab"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
              </div>
            </div>

            {/* RIGHT CARD: Sovereign Tech Stack & Live Telemetry */}
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00DF8F] animate-pulse"></span>
                    <h3 className="text-base sm:text-lg text-[#F2F5F9] font-semibold">
                      Core AI &amp; Ledger Security Telemetry
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#14294F] border border-[#14294F] text-[#00DF8F]">
                    LATENCY 0.84s
                  </span>
                </div>

                {/* Tech Badges & Descriptions */}
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#0D95FE] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">memory</span>{' '}
                        LangChain RAG Active
                      </span>
                      <span className="font-mono text-[11px] text-[#00DF8F]">
                        4,096-token session
                      </span>
                    </div>
                    <p className="text-xs text-[#A8BBD6]">
                      Isolated conversational session memory with zero cross-tenant prompt leakage,
                      persisting context across voice and text chats.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#00DF8F] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">translate</span>{' '}
                        Fine-tuned Multilingual Model
                      </span>
                      <span className="font-mono text-[11px] text-[#A8BBD6]">
                        Fine-tuned Engine
                      </span>
                    </div>
                    <p className="text-xs text-[#A8BBD6]">
                      Financial intent extraction across Nigerian Pidgin, Yorùbá, Hausa, and Igbo
                      with over 99.4% intent resolution accuracy.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#F2A93B] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">verified</span>{' '}
                        Regex &amp; SQL Guardrails Passed
                      </span>
                      <span className="font-mono text-[11px] text-[#00DF8F]">0 Injections</span>
                    </div>
                    <p className="text-xs text-[#A8BBD6]">
                      Zero-injection sanitization pipeline with deterministic double-entry accounting
                      ledger verification before authorization.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#F2F5F9] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">lock</span>{' '}
                        Encrypted WhatsApp Cloud API Session
                      </span>
                      <span className="font-mono text-[11px] text-[#0D95FE]">TLS 1.3 FIDO2</span>
                    </div>
                    <p className="text-xs text-[#A8BBD6]">
                      Direct webhook cluster connected to Meta Enterprise infrastructure with
                      hardware-level rotational key signing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Code / JSON Preview Box */}
              <div className="rounded-xl bg-[#01091C] border border-[#14294F] p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#A8BBD6] mb-2 pb-1 border-b border-[#14294F]">
                  <span>DISPATCH_LOG_STDOUT</span>
                  <span className="text-[#00DF8F]">READY</span>
                </div>
                <pre className="text-[#F2F5F9] leading-snug overflow-x-auto">
                  <code>{`{
  "status": "${authStatus === 'settled' ? 'AUTHORIZED' : 'PENDING_APPROVAL'}",
  "intent": "DISBURSE_NIP",
  "amount": 5000.00,
  "recipient": "Chidinma Okafor",
  "clearing_latency": "0.84s",
  "ledger_hash": "0x7f4e...a92b"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE THREE CORE PILLARS (MONIEPOINT AUTHORITY GRID) */}
      <section className="w-full px-4 sm:px-8 py-12 lg:py-20 border-b border-[#14294F]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col gap-1 text-left max-w-3xl">
            <span className="font-mono text-xs text-[#0D95FE] tracking-widest uppercase font-semibold">
              SOVEREIGN RAILS • BUILT FOR THE ECOSYSTEM
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F5F9]">
              Three Pillars. Zero Friction.
            </h2>
            <p className="text-base text-[#A8BBD6]">
              Built for the hustle of the market, backed by institutional banking grade security and
              central bank compliant settlement.
            </p>
          </div>

          {/* 3-Column Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Personal */}
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 sm:p-8 hover:border-[#00DF8F]/50 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00DF8F]/10 border border-[#00DF8F] flex items-center justify-center text-[#00DF8F]">
                  <span className="material-symbols-outlined text-[24px]">
                    account_balance_wallet
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#00DF8F]">RETAIL &amp; COMMUNAL VAULTS</span>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">Personal Banking</h3>
                </div>
                <div className="py-3 px-4 rounded-xl bg-[#14294F] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Daily Vault Yield</span>
                  <span className="text-xl font-bold font-mono text-[#00DF8F]">15.5% APY</span>
                </div>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Automated communal Ajo rotational pools, zero-failure virtual USD/NGN cards, and
                  daily yield on idle savings paid out every midnight.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ajo-vaults')}
                className="inline-flex items-center gap-2 text-[#0D95FE] font-semibold text-sm group-hover:gap-3 transition-all text-left"
              >
                <span>Explore Ajo Vaults</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 2: Business */}
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 sm:p-8 hover:border-[#0D95FE]/50 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0D95FE]/10 border border-[#0D95FE] flex items-center justify-center text-[#0D95FE]">
                  <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#0D95FE]">ENTERPRISE LIQUIDITY</span>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">Business Treasury</h3>
                </div>
                <div className="py-3 px-4 rounded-xl bg-[#14294F] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Supplier Payout Window</span>
                  <span className="text-xl font-bold font-mono text-[#0D95FE]">0.00s</span>
                </div>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Dedicated merchant NUBANs, automated sub-wallets, multi-branch float management, and
                  integrated instant bulk supplier disbursement without transfer fees.
                </p>
              </div>
              <button
                onClick={() => onNavigate('business-treasury')}
                className="inline-flex items-center gap-2 text-[#0D95FE] font-semibold text-sm group-hover:gap-3 transition-all text-left"
              >
                <span>Explore Business Treasury</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Pillar 3: POS Agents */}
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 sm:p-8 hover:border-[#F2A93B]/50 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F2A93B]/10 border border-[#F2A93B] flex items-center justify-center text-[#F2A93B]">
                  <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#F2A93B]">AGENCY BANKING NETWORK</span>
                  <h3 className="text-xl font-bold text-[#F2F5F9]">POS Agent Network</h3>
                </div>
                <div className="py-3 px-4 rounded-xl bg-[#14294F] border border-[#14294F] flex items-baseline justify-between">
                  <span className="text-xs text-[#A8BBD6]">Dual-Network Uptime</span>
                  <span className="text-xl font-bold font-mono text-[#F2A93B]">99.98%</span>
                </div>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Hardened 4G Android 13 terminals with dual-eSIM fallback, instant dispute resolution
                  within 60 seconds, and market-leading agent commission structures.
                </p>
              </div>
              <button
                onClick={() => onNavigate('pos-agents')}
                className="inline-flex items-center gap-2 text-[#0D95FE] font-semibold text-sm group-hover:gap-3 transition-all text-left"
              >
                <span>Explore POS Terminals</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ELITE INTERACTIVE 3D PRODUCT SHOWCASE (REVOLUT.COM INSPIRED) */}
      <Card3DShowcaseSection
        account={account}
        onOpenTransfer={onOpenTransfer}
        onOpenOnboarding={onOpenOnboarding}
      />

      {/* SECTION 4: INTERACTIVE ENGINE SHOWCASE */}
      <section
        id="engine-showcase-section"
        className="w-full px-4 sm:px-8 py-12 lg:py-20 border-b border-[#14294F] bg-[#01091C]/30"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Section Header & Switcher Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <span className="font-mono text-xs text-[#00DF8F] tracking-widest uppercase font-semibold">
                PROGRAMMABLE CONTROLS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F5F9]">
                Merchant Infrastructure &amp; Velocity
              </h2>
              <p className="text-base text-[#A8BBD6]">
                Interactive controls powering over 140,000 businesses and merchants across Nigeria.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center p-1 rounded-xl bg-[#0A1B3D] border border-[#14294F] self-start md:self-auto overflow-x-auto">
              <button
                onClick={() => setShowcaseTab('cashflow')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  showcaseTab === 'cashflow'
                    ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                Merchant Cashflow
              </button>
              <button
                onClick={() => setShowcaseTab('agent')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  showcaseTab === 'agent'
                    ? 'bg-[#14294F] text-[#F2F5F9] border border-[#00DF8F]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
              >
                Agent Commission Calculator
              </button>
            </div>
          </div>

          {/* TAB 1: Merchant Cashflow */}
          {showcaseTab === 'cashflow' && (
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 lg:p-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#14294F] border border-[#14294F]">
                  <span className="text-xs text-[#A8BBD6]">Today's Inflow</span>
                  <div className="text-xl font-bold font-mono text-[#00DF8F] mt-1">
                    ₦3,892,100.00
                  </div>
                  <span className="font-mono text-[11px] text-[#00DF8F]">+18.4% vs yesterday</span>
                </div>
                <div className="p-4 rounded-xl bg-[#14294F] border border-[#14294F]">
                  <span className="text-xs text-[#A8BBD6]">Settled Batches</span>
                  <div className="text-xl font-bold font-mono text-[#F2F5F9] mt-1">1,482 Txs</div>
                  <span className="font-mono text-[11px] text-[#0D95FE]">Instant NIP Sweep</span>
                </div>
                <div className="p-4 rounded-xl bg-[#14294F] border border-[#14294F]">
                  <span className="text-xs text-[#A8BBD6]">Dispute Ratio</span>
                  <div className="text-xl font-bold font-mono text-[#F2F5F9] mt-1">0.002%</div>
                  <span className="font-mono text-[11px] text-[#00DF8F]">Zero Chargebacks</span>
                </div>
                <div className="p-4 rounded-xl bg-[#14294F] border border-[#14294F]">
                  <span className="text-xs text-[#A8BBD6]">Active POS Hardware</span>
                  <div className="text-xl font-bold font-mono text-[#F2A93B] mt-1">24 Active</div>
                  <span className="font-mono text-[11px] text-[#F2A93B]">All Terminals Online</span>
                </div>
              </div>

              {/* Interactive SVG Chart Bar Visualizer */}
              <div className="p-6 rounded-xl bg-[#14294F] border border-[#14294F] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#F2F5F9]">
                    24-Hour Settlement Velocity (Hourly Batches)
                  </h4>
                  <span className="font-mono text-xs text-[#00DF8F]">REAL-TIME TELEMETRY</span>
                </div>

                <div className="h-44 w-full flex items-end justify-between gap-1.5 pt-4">
                  {[
                    { h: '30%', label: '01:00 - ₦80k' },
                    { h: '15%', label: '03:00 - ₦40k' },
                    { h: '10%', label: '05:00 - ₦25k' },
                    { h: '45%', label: '07:00 - ₦180k' },
                    { h: '70%', label: '09:00 - ₦450k' },
                    { h: '95%', label: '11:00 - ₦890k' },
                    { h: '100%', label: '13:00 - ₦920k' },
                    { h: '80%', label: '15:00 - ₦650k' },
                    { h: '65%', label: '17:00 - ₦510k' },
                    { h: '50%', label: '19:00 - ₦320k' },
                    { h: '35%', label: '21:00 - ₦190k' },
                    { h: '20%', label: '23:00 - ₦90k' },
                  ].map((bar, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-[#0D95FE]/30 hover:bg-[#00DF8F] rounded-t transition-all cursor-pointer relative group"
                      style={{ height: bar.h }}
                      title={bar.label}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#01091C] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#F2F5F9] whitespace-nowrap hidden group-hover:block border border-[#14294F] z-10">
                        {bar.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[11px] font-mono text-[#A8BBD6] pt-2 border-t border-[#14294F]">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00 (Peak Inflow)</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Agent Commission Calculator */}
          {showcaseTab === 'agent' && (
            <div className="bg-[#0A1B3D] rounded-2xl border border-[#14294F] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-bold text-[#F2F5F9]">
                  Agent Float &amp; Commission Estimator
                </h4>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  Estimate your daily earnings using Axoora's flat-capped commission structure. 100%
                  instant settlement into your merchant interest vault.
                </p>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#F2F5F9] flex justify-between font-semibold">
                    <span>Daily Terminal Volume (₦)</span>
                    <span className="font-mono text-[#00DF8F] font-bold">
                      ₦{agentVolume.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={agentVolume}
                    onChange={(e) => setAgentVolume(Number(e.target.value))}
                    className="w-full accent-[#0D95FE] bg-[#14294F] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#A8BBD6] font-mono">
                    <span>₦100k (Starter)</span>
                    <span>₦5.0M (Market Hub)</span>
                    <span>₦10.0M+ (Enterprise)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#14294F] border-2 border-[#00DF8F] flex flex-col gap-4 text-center">
                <span className="text-xs text-[#A8BBD6] uppercase tracking-wider">
                  Estimated Monthly Agent Net Yield
                </span>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-[#00DF8F]">
                  ₦{calculatedAgentCommission.toLocaleString()}.00
                </span>
                <span className="font-mono text-xs text-[#A8BBD6]">
                  + Instant 15.5% daily interest on overnight terminal float balance
                </span>
                <button
                  onClick={() => onNavigate('pos-agents')}
                  className="mt-2 py-2 px-4 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-xs hover:brightness-110 transition-all"
                >
                  Order POS Terminal
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: PRE-FOOTER CONVERSION BANNER */}
      <section className="w-full px-4 sm:px-8 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0A1B3D] to-[#01091C] border border-[#14294F] p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          {/* Decorative radial ambient blur strictly inside container */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0D95FE]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14294F] border border-[#00DF8F] text-[#00DF8F] font-mono text-xs font-semibold tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            ZERO SETUP FEE • INSTANT 90-SECOND ACTIVATION
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F2F5F9] max-w-2xl leading-tight">
            Ready to deploy institutional-grade infrastructure?
          </h2>

          {/* Subtext */}
          <p className="text-base text-[#A8BBD6] max-w-xl leading-relaxed">
            Open an account in under 90 seconds. No paperwork, no physical bank queues. Instant
            CBN-compliant Tier 3 verification.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D95FE] hover:bg-[#0B7FD6] text-[#00325b] font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#0D95FE]/20"
            >
              <span>Create Your Account Now</span>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </button>

            <button
              onClick={() => onNavigate('whatsapp-ai')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A1B3D] hover:bg-[#14294F] border border-[#14294F] text-[#F2F5F9] font-medium text-sm sm:text-base transition-all"
            >
              <span className="material-symbols-outlined text-[#00DF8F] text-[20px]">chat</span>
              <span>Launch on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
