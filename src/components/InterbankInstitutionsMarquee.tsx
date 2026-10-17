'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export interface SupportedInstitution {
  id: string;
  name: string;
  shortName: string;
  code: string;
  category: 'commercial' | 'fintech' | 'halal' | 'switch';
  categoryLabel: string;
  brandColor: string;
  badgeTextColor?: string;
  settlementLatency: string;
  routeHealth: string;
  popularAccountPrefix?: string;
  description: string;
}

export const SUPPORTED_INSTITUTIONS: SupportedInstitution[] = [
  // 1. TIER-1 & COMMERCIAL BANKS (20)
  {
    id: 'gtb',
    name: 'Guaranty Trust Bank',
    shortName: 'GTBank',
    code: '058',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#E03C00',
    settlementLatency: '0.6s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '012 •••• •••',
    description: 'Direct NIBSS clearing with instant recipient account name lookup and zero transaction charges.',
  },
  {
    id: 'access',
    name: 'Access Bank Nigeria',
    shortName: 'Access',
    code: '044',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#FF6200',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '003 •••• •••',
    description: 'Seamless interbank transfers to all Access and former Diamond Bank accounts nationwide.',
  },
  {
    id: 'zenith',
    name: 'Zenith Bank Plc',
    shortName: 'Zenith',
    code: '057',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#C41230',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '101 •••• •••',
    description: 'Real-time settlement for retail, corporate, and high-volume commercial accounts.',
  },
  {
    id: 'firstbank',
    name: 'First Bank of Nigeria',
    shortName: 'FirstBank',
    code: '011',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#002B49',
    badgeTextColor: '#F2A93B',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '308 •••• •••',
    description: 'Full compatibility with Nigeria\'s oldest commercial banking network across all 36 states.',
  },
  {
    id: 'uba',
    name: 'United Bank for Africa',
    shortName: 'UBA',
    code: '033',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#CF0000',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '204 •••• •••',
    description: 'Instant transfers across UBA retail and diaspora accounts with instant receipt delivery.',
  },
  {
    id: 'providus',
    name: 'Providus Bank',
    shortName: 'Providus',
    code: '101',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#D97706',
    settlementLatency: '0.5s Direct',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '901 •••• •••',
    description: 'Direct core-banking integration enabling sub-second clearing for Axoora dedicated NUBANs.',
  },
  {
    id: 'stanbic',
    name: 'Stanbic IBTC Bank',
    shortName: 'Stanbic IBTC',
    code: '221',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#0033A0',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '001 •••• •••',
    description: 'Direct interbank rails to Standard Bank Group accounts, mutual funds, and pensions.',
  },
  {
    id: 'fidelity',
    name: 'Fidelity Bank Nigeria',
    shortName: 'Fidelity',
    code: '070',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#002D62',
    badgeTextColor: '#00DF8F',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '401 •••• •••',
    description: 'Instant settlement for SME and personal accounts with zero intermediary charges.',
  },
  {
    id: 'fcmb',
    name: 'First City Monument Bank',
    shortName: 'FCMB',
    code: '214',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#5C068C',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '028 •••• •••',
    description: 'Sub-second NIBSS instant rails for retail customers and corporate payroll accounts.',
  },
  {
    id: 'sterling',
    name: 'Sterling Bank Nigeria',
    shortName: 'Sterling',
    code: '232',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#CE1126',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '006 •••• •••',
    description: 'Direct digital clearing with Sterling and The Alternative Bank non-interest partitions.',
  },
  {
    id: 'wema',
    name: 'Wema Bank / ALAT',
    shortName: 'Wema / ALAT',
    code: '035',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#800080',
    settlementLatency: '0.6s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '021 •••• •••',
    description: 'Direct high-speed API connectivity to Wema Bank branches and digital ALAT accounts.',
  },
  {
    id: 'union',
    name: 'Union Bank of Nigeria',
    shortName: 'Union Bank',
    code: '032',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#00A3E0',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '004 •••• •••',
    description: 'Centennial commercial clearing supporting retail, agro, and cooperative bank accounts.',
  },
  {
    id: 'polaris',
    name: 'Polaris Bank',
    shortName: 'Polaris',
    code: '076',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#4A0E4E',
    settlementLatency: '0.9s NIP',
    routeHealth: '99.6% Route Health',
    popularAccountPrefix: '115 •••• •••',
    description: 'Commercial retail and agency banking clearing across northern and southern corridors.',
  },
  {
    id: 'keystone',
    name: 'Keystone Bank',
    shortName: 'Keystone',
    code: '082',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#0C2340',
    badgeTextColor: '#53BDEB',
    settlementLatency: '0.9s NIP',
    routeHealth: '99.6% Route Health',
    popularAccountPrefix: '100 •••• •••',
    description: 'Reliable interbank routing with instant name verification before fund disbursement.',
  },
  {
    id: 'unity',
    name: 'Unity Bank Nigeria',
    shortName: 'Unity Bank',
    code: '215',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#F58220',
    settlementLatency: '0.9s NIP',
    routeHealth: '99.5% Route Health',
    popularAccountPrefix: '002 •••• •••',
    description: 'Agro-allied and rural commerce banking integration with zero hidden deductions.',
  },
  {
    id: 'titantrust',
    name: 'Titan Trust Bank',
    shortName: 'Titan Trust',
    code: '102',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#1A2B4C',
    badgeTextColor: '#F59E0B',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '000 •••• •••',
    description: 'Wholesale and multinational corporate banking clearance with instant confirmation.',
  },
  {
    id: 'premiumtrust',
    name: 'PremiumTrust Bank',
    shortName: 'PremiumTrust',
    code: '105',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#005C42',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '003 •••• •••',
    description: 'Modern commercial banking rails with 24/7 automated interbank NIP reconciliation.',
  },
  {
    id: 'signature',
    name: 'Signature Bank',
    shortName: 'Signature',
    code: '106',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#081D3C',
    badgeTextColor: '#00DF8F',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '001 •••• •••',
    description: 'Commercial private banking network clearing with 256-bit encrypted validation.',
  },
  {
    id: 'optimus',
    name: 'Optimus Bank',
    shortName: 'Optimus',
    code: '107',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#1E1B4B',
    badgeTextColor: '#0D95FE',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '002 •••• •••',
    description: 'Digital-first commercial bank connected directly to national instant payment switches.',
  },
  {
    id: 'suntrust',
    name: 'SunTrust Bank',
    shortName: 'SunTrust',
    code: '100',
    category: 'commercial',
    categoryLabel: 'Commercial Bank',
    brandColor: '#0F766E',
    settlementLatency: '0.9s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '000 •••• •••',
    description: 'Regional and commercial SME settlement accounts with automated credit notifications.',
  },

  // 2. LEADING FINTECHS & NEOBANKS (14)
  {
    id: 'kuda',
    name: 'Kuda Microfinance Bank',
    shortName: 'Kuda Bank',
    code: '50211',
    category: 'fintech',
    categoryLabel: 'Digital Neobank',
    brandColor: '#40196D',
    settlementLatency: '0.5s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '209 •••• •••',
    description: 'Immediate credit delivery to Kuda Bank accounts with zero interbank transfer fees.',
  },
  {
    id: 'moniepoint',
    name: 'Moniepoint MFB',
    shortName: 'Moniepoint',
    code: '50515',
    category: 'fintech',
    categoryLabel: 'Fintech / MFB',
    brandColor: '#0033FF',
    settlementLatency: '0.5s Instant',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '550 •••• •••',
    description: 'Direct high-frequency interbank routing to Moniepoint business and merchant POS wallets.',
  },
  {
    id: 'opay',
    name: 'OPay Digital Services',
    shortName: 'OPay',
    code: '999992',
    category: 'fintech',
    categoryLabel: 'Fintech / MFB',
    brandColor: '#10B981',
    settlementLatency: '0.6s Instant',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '803 •••• •••',
    description: 'Instant settlement by phone number or account number with zero transfer charges.',
  },
  {
    id: 'palmpay',
    name: 'PalmPay Nigeria',
    shortName: 'PalmPay',
    code: '999991',
    category: 'fintech',
    categoryLabel: 'Fintech / MFB',
    brandColor: '#6366F1',
    settlementLatency: '0.6s Instant',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '902 •••• •••',
    description: 'Fast NIP clearing directly into PalmPay consumer and agent wallets nationwide.',
  },
  {
    id: 'fairmoney',
    name: 'FairMoney Microfinance Bank',
    shortName: 'FairMoney',
    code: '51318',
    category: 'fintech',
    categoryLabel: 'Digital Neobank',
    brandColor: '#0D9488',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '102 •••• •••',
    description: 'Automated digital bank rails for personal accounts, loan repayments, and savings.',
  },
  {
    id: 'carbon',
    name: 'Carbon (One Finance)',
    shortName: 'Carbon',
    code: '565',
    category: 'fintech',
    categoryLabel: 'Digital Neobank',
    brandColor: '#18181B',
    badgeTextColor: '#00DF8F',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '100 •••• •••',
    description: 'Pioneer digital bank accounts with real-time biometric NIBSS verification.',
  },
  {
    id: 'dot',
    name: 'Dot Microfinance Bank',
    shortName: 'Dot MFB',
    code: '50163',
    category: 'fintech',
    categoryLabel: 'Agency & Digital',
    brandColor: '#EF4444',
    settlementLatency: '0.6s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '101 •••• •••',
    description: 'Instant agency banking and personal clearing rails across northern and southern trading hubs.',
  },
  {
    id: 'piggyvest',
    name: 'Pocket App by Piggyvest',
    shortName: 'Pocket / Piggyvest',
    code: '51310',
    category: 'fintech',
    categoryLabel: 'Social Fintech',
    brandColor: '#3B82F6',
    settlementLatency: '0.7s Instant',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '018 •••• •••',
    description: 'Seamless funding for Piggyvest automated savings targets, Safelock, and Pocket social shops.',
  },
  {
    id: 'cowrywise',
    name: 'Cowrywise Financial',
    shortName: 'Cowrywise',
    code: '50823',
    category: 'fintech',
    categoryLabel: 'Wealth & Stash',
    brandColor: '#06B6D4',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '015 •••• •••',
    description: 'Direct settlement to automated mutual fund stash accounts and Halal halal wealth pools.',
  },
  {
    id: 'rubies',
    name: 'Rubies Bank',
    shortName: 'Rubies',
    code: '125',
    category: 'fintech',
    categoryLabel: 'Digital MFB',
    brandColor: '#DC2626',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.7% Route Health',
    popularAccountPrefix: '001 •••• •••',
    description: 'API-driven customizable account numbers with instant webhook payment notifications.',
  },
  {
    id: 'vbank',
    name: 'VBank (VFD Microfinance)',
    shortName: 'VBank',
    code: '566',
    category: 'fintech',
    categoryLabel: 'Digital Neobank',
    brandColor: '#BE123C',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '100 •••• •••',
    description: 'Streamlined digital banking clearing with automated receipt generation and spend tagging.',
  },
  {
    id: 'gomoney',
    name: 'Gomoney (Sterling Rail)',
    shortName: 'Gomoney',
    code: '100022',
    category: 'fintech',
    categoryLabel: 'Social Neobank',
    brandColor: '#D946EF',
    settlementLatency: '0.7s Instant',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '014 •••• •••',
    description: 'Group split bills and social transfers cleared with zero transaction surcharges.',
  },
  {
    id: 'eyowo',
    name: 'Eyowo Digital Bank',
    shortName: 'Eyowo',
    code: '50126',
    category: 'fintech',
    categoryLabel: 'Digital Neobank',
    brandColor: '#F97316',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.6% Route Health',
    popularAccountPrefix: '080 •••• •••',
    description: 'Phone number-based interbank transfers with immediate SMS & push notification alerts.',
  },
  {
    id: 'paga',
    name: 'Paga Mobile Money',
    shortName: 'Paga',
    code: '100002',
    category: 'fintech',
    categoryLabel: 'Mobile Money',
    brandColor: '#EA580C',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '100 •••• •••',
    description: 'Pioneer Nigerian mobile wallet clearing for agents, merchants, and remittances.',
  },

  // 3. ETHICAL & NON-INTEREST BANKS (4)
  {
    id: 'jaiz',
    name: 'Jaiz Bank Plc',
    shortName: 'Jaiz Bank',
    code: '301',
    category: 'halal',
    categoryLabel: 'Non-Interest Bank',
    brandColor: '#008752',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '000 •••• •••',
    description: 'Direct clearing with Nigeria\'s pioneer Islamic commercial bank. 100% Riba-free partnership.',
  },
  {
    id: 'tajbank',
    name: 'TAJBank Limited',
    shortName: 'TAJBank',
    code: '302',
    category: 'halal',
    categoryLabel: 'Non-Interest Bank',
    brandColor: '#7A1315',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '000 •••• •••',
    description: 'High-speed non-interest banking clearing with dedicated business and personal accounts.',
  },
  {
    id: 'lotus',
    name: 'Lotus Bank Limited',
    shortName: 'Lotus Bank',
    code: '303',
    category: 'halal',
    categoryLabel: 'Non-Interest Bank',
    brandColor: '#0D6E53',
    settlementLatency: '0.7s NIP',
    routeHealth: '99.9% Route Health',
    popularAccountPrefix: '100 •••• •••',
    description: 'Ethical commercial bank rails partnering directly with real agriculture and tangible commerce.',
  },
  {
    id: 'alternativebank',
    name: 'The Alternative Bank',
    shortName: 'Alternative Bank',
    code: '304',
    category: 'halal',
    categoryLabel: 'Non-Interest Bank',
    brandColor: '#5B21B6',
    settlementLatency: '0.8s NIP',
    routeHealth: '99.8% Route Health',
    popularAccountPrefix: '001 •••• •••',
    description: 'Modern Shari\'ah-compliant commercial clearing with zero debt interest or usury.',
  },

  // 4. NATIONAL SWITCHES & CLEARING RAILS (4)
  {
    id: 'nibss',
    name: 'NIBSS Instant Payment (NIP)',
    shortName: 'NIBSS (NIP Rail)',
    code: 'NIBSS',
    category: 'switch',
    categoryLabel: 'National Clearing',
    brandColor: '#003865',
    badgeTextColor: '#00DF8F',
    settlementLatency: '0.8s Average',
    routeHealth: '99.98% System Uptime',
    popularAccountPrefix: 'Direct Central Switch',
    description: 'Nigeria Inter-Bank Settlement System central electronic payment switch powering 24/7 instant transfers.',
  },
  {
    id: 'interswitch',
    name: 'Interswitch / Verve Switch',
    shortName: 'Interswitch',
    code: 'ISW',
    category: 'switch',
    categoryLabel: 'National Switch',
    brandColor: '#E11D48',
    settlementLatency: '0.7s Real-Time',
    routeHealth: '99.95% Network Health',
    popularAccountPrefix: 'Verve & Interbank',
    description: 'Africa\'s pioneer digital transaction switch processing card, POS, and interbank NIP routing.',
  },
  {
    id: 'remita',
    name: 'Remita (SystemSpecs Rail)',
    shortName: 'Remita',
    code: 'RMT',
    category: 'switch',
    categoryLabel: 'Treasury & TSA Rail',
    brandColor: '#F97316',
    settlementLatency: 'Instant Clearing',
    routeHealth: '99.9% Uptime',
    popularAccountPrefix: 'Federal & Commercial',
    description: 'Direct federal TSA and corporate multi-bank payment clearing infrastructure.',
  },
  {
    id: 'paystack',
    name: 'Paystack & Flutterwave Rails',
    shortName: 'Paystack / Flw',
    code: 'SWITCH',
    category: 'switch',
    categoryLabel: 'Fintech Rail',
    brandColor: '#00C3F9',
    badgeTextColor: '#020F2E',
    settlementLatency: 'Sub-2s Webhook',
    routeHealth: '99.99% Cloud Health',
    popularAccountPrefix: 'Multi-Rail Routing',
    description: 'Intelligent multi-route payment gateways ensuring zero failover and automated re-routing.',
  },
];

interface InterbankInstitutionsMarqueeProps {
  isLight?: boolean;
  onOpenWhatsApp?: () => void;
  onSelectInstitution?: (institution: SupportedInstitution) => void;
}

export const InterbankInstitutionsMarquee: React.FC<InterbankInstitutionsMarqueeProps> = ({
  isLight: propIsLight,
  onOpenWhatsApp,
  onSelectInstitution,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

  const [activeCategory, setActiveCategory] = useState<
    'all' | 'commercial' | 'fintech' | 'halal' | 'switch'
  >('all');
  const [selectedInstitution, setSelectedInstitution] = useState<SupportedInstitution | null>(null);
  const [copiedBankCode, setCopiedBankCode] = useState<string | null>(null);

  // Split institutions for dual-row dynamic marquee
  const filteredInstitutions =
    activeCategory === 'all'
      ? SUPPORTED_INSTITUTIONS
      : SUPPORTED_INSTITUTIONS.filter((item) => item.category === activeCategory);

  const halfIndex = Math.ceil(filteredInstitutions.length / 2);
  const row1Items = filteredInstitutions.slice(0, halfIndex);
  const row2Items = filteredInstitutions.slice(halfIndex);

  // Duplicate for seamless 100% infinite loops across any monitor width
  const loopRow1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const loopRow2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const handleCardClick = (inst: SupportedInstitution) => {
    setSelectedInstitution(inst);
    if (onSelectInstitution) {
      onSelectInstitution(inst);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedInstitution(null);
      }
    };
    if (selectedInstitution) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInstitution]);

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedBankCode(code);
    setTimeout(() => setCopiedBankCode(null), 2000);
  };

  return (
    <section
      className={`relative w-full pt-16 pb-16 sm:pt-20 sm:pb-20 border-b overflow-hidden transition-colors ${
        isLight
          ? 'bg-[#F8FAFC] border-slate-200 text-slate-900'
          : 'bg-[#030D22] border-[#14294F] text-[#F2F5F9]'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-[#00DF8F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-[#0D95FE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 mb-8 relative z-10">
        {/* Top Header Badge & Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#14294F]/80">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
              <span className={isLight ? 'text-emerald-700 font-extrabold' : 'text-[#00DF8F]'}>
                INTERBANK NIP CLEARING RAILS
              </span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-[#14294F]'}>
                ·
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-[#8EA2C6]'}>
                Central Bank of Nigeria (CBN) Direct Switch
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
              }`}
            >
              Direct Settlement with 40+ Nigerian Banks &amp; Fintechs
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Send and receive funds instantly with zero transfer fees. Axoora integrates directly into NIBSS Instant Payment (NIP) rails, guaranteeing <strong className={isLight ? 'text-emerald-700 font-extrabold' : 'text-[#00DF8F]'}>99.9% first-attempt success</strong> and sub-second settlement across every licensed institution.
            </p>
          </div>

          {/* Quick KPI Stat Counter */}
          <div className="flex items-center gap-4 shrink-0 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0A1B3D] border border-slate-200 dark:border-[#14294F] shadow-sm">
            <div className="flex flex-col">
              <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}`}>
                40+
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-[#8EA2C6] uppercase">
                Institutions
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-[#14294F]" />
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#0D95FE] tracking-tight">
                0.8s
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-[#8EA2C6] uppercase">
                Avg Settlement
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-[#14294F]" />
            <div className="flex flex-col">
              <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                ₦0
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-[#8EA2C6] uppercase">
                Transfer Fee
              </span>
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All 40+ Institutions', count: SUPPORTED_INSTITUTIONS.length },
            { id: 'commercial', label: 'Commercial Banks', count: 20 },
            { id: 'fintech', label: 'Fintech & Neobanks', count: 14 },
            { id: 'halal', label: 'Non-Interest / Ethical', count: 4 },
            { id: 'switch', label: 'Payment Switches', count: 4 },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#00DF8F] text-[#003825] shadow-md shadow-[#00DF8F]/20 scale-102 font-extrabold'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-[#0A1B3D] hover:bg-[#11244C] text-[#8EA2C6] hover:text-white border border-[#14294F]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-[#003825]/20 text-[#003825]'
                      : isLight
                      ? 'bg-slate-200 text-slate-600'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DUAL-ROW INFINITE MARQUEE TRACKS */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden flex flex-col gap-3 sm:gap-4 select-none">
        {/* Left & Right gradient edge fades */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 z-20 pointer-events-none bg-gradient-to-r ${
            isLight
              ? 'from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent'
              : 'from-[#030D22] via-[#030D22]/85 to-transparent'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-52 z-20 pointer-events-none bg-gradient-to-l ${
            isLight
              ? 'from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent'
              : 'from-[#030D22] via-[#030D22]/85 to-transparent'
          }`}
        />

        {/* --------------------------------------------------------------------- */}
        {/* TRACK 1: SCROLLS LEFT (COMMERCIAL & TIER-1 FOCUS) */}
        {/* --------------------------------------------------------------------- */}
        <div className="animate-marquee-track py-1.5 flex items-center gap-3 sm:gap-4">
          {loopRow1.map((inst, idx) => (
            <InstitutionMarqueeCard
              key={`r1-${inst.id}-${idx}`}
              institution={inst}
              isLight={isLight}
              onClick={() => handleCardClick(inst)}
            />
          ))}
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* TRACK 2: SCROLLS RIGHT (NEOBANKS, HALAL & SWITCHES FOCUS) */}
        {/* --------------------------------------------------------------------- */}
        <div className="animate-marquee-track-reverse py-1.5 flex items-center gap-3 sm:gap-4">
          {loopRow2.map((inst, idx) => (
            <InstitutionMarqueeCard
              key={`r2-${inst.id}-${idx}`}
              institution={inst}
              isLight={isLight}
              onClick={() => handleCardClick(inst)}
            />
          ))}
        </div>
      </div>

      {/* Subtle Bottom Instruction */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-[#8EA2C6]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">touch_app</span>
          <span>Click on any institution card to verify real-time NIP route status &amp; bank sort code.</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00DF8F]" />
            99.9% NIP Rail Health
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0D95FE]" />
            CBN PSSP Verified
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE INSTITUTION DETAIL INSPECTION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedInstitution && (
          <div
            onClick={() => setSelectedInstitution(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className={`w-full max-w-lg rounded-3xl border-2 p-6 sm:p-7 shadow-2xl relative flex flex-col gap-5 cursor-default ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
                  : 'bg-[#0A1B3D] border-[#152E5E] text-[#F2F5F9] shadow-black/80'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedInstitution(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#14294F] text-slate-500 dark:text-[#A8BBD6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>

              {/* Institution Header Badge */}
              <div className="flex items-center gap-3.5">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shrink-0"
                  style={{
                    backgroundColor: selectedInstitution.brandColor,
                    color: selectedInstitution.badgeTextColor || '#FFFFFF',
                  }}
                >
                  {selectedInstitution.code}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: `${selectedInstitution.brandColor}20`,
                        color: selectedInstitution.brandColor,
                      }}
                    >
                      {selectedInstitution.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-[#00DF8F] flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                      {selectedInstitution.routeHealth}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight truncate mt-0.5">
                    {selectedInstitution.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
                {selectedInstitution.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#030D22] border border-slate-200 dark:border-[#14294F]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-[#7B9CD2] block">
                    CBN Sort / NIP Code
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-mono font-extrabold text-[#0D95FE]">
                      {selectedInstitution.code}
                    </span>
                    <button
                      onClick={(e) => handleCopyCode(selectedInstitution.code, e)}
                      className="text-[10px] font-mono text-slate-400 hover:text-[#00DF8F] cursor-pointer"
                      title="Copy Bank Code"
                    >
                      {copiedBankCode === selectedInstitution.code ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-[#7B9CD2] block">
                    NIP Settlement Speed
                  </span>
                  <span className={`text-sm font-mono font-extrabold ${isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}`}>
                    {selectedInstitution.settlementLatency}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-[#7B9CD2] block">
                    Transfer Fee on Axoora
                  </span>
                  <span className={`text-sm font-mono font-extrabold ${isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}`}>
                    ₦0.00 (Zero Fee)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-[#7B9CD2] block">
                    Account Format
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {selectedInstitution.popularAccountPrefix || '10-Digit NUBAN'}
                  </span>
                </div>
              </div>

              {/* Sample WhatsApp Command Box */}
              <div className={`p-3.5 rounded-2xl border flex flex-col gap-1.5 ${
                isLight
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : 'bg-[#00A884]/10 border-[#00A884]/30'
              }`}>
                <div className={`flex items-center justify-between text-[11px] font-bold ${
                  isLight ? 'text-emerald-800' : 'text-[#00DF8F]'
                }`}>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    Try this command on WhatsApp:
                  </span>
                  <span className="text-[10px] font-mono">0.8s NIP Auto-Lookup</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-xs text-emerald-300 shadow-inner">
                  &ldquo;Axoora transfer ₦20,000 to Babatunde at {selectedInstitution.shortName}&rdquo;
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <a
                  href={`https://wa.me/2349110002966?text=${encodeURIComponent(
                    `Hi Axoora, I want to transfer money to ${selectedInstitution.shortName}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 rounded-xl bg-[#00A884] hover:bg-[#008F6F] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-102 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Test Transfer on WhatsApp ➔</span>
                </a>
                <button
                  onClick={() => setSelectedInstitution(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#14294F] hover:bg-slate-200 dark:hover:bg-[#1C3B72] text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// =============================================================================
// SUB-COMPONENT: SINGLE INSTITUTION MARQUEE CARD
// =============================================================================
interface InstitutionMarqueeCardProps {
  institution: SupportedInstitution;
  isLight: boolean;
  onClick: () => void;
}

const InstitutionMarqueeCard: React.FC<InstitutionMarqueeCardProps> = ({
  institution,
  isLight,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3 shrink-0 w-[240px] sm:w-[265px] select-none group cursor-pointer ${
        isLight
          ? 'bg-white border-slate-200 hover:border-emerald-500/60 hover:shadow-lg hover:-translate-y-1'
          : 'bg-[#08152F] border-[#14294F] hover:border-[#00DF8F]/70 hover:bg-[#0B1E42] hover:shadow-lg hover:shadow-[#00DF8F]/10 hover:-translate-y-1'
      }`}
    >
      {/* Brand Icon / Code Badge */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-xs tracking-wider shadow-sm shrink-0 group-hover:scale-108 transition-transform"
        style={{
          backgroundColor: institution.brandColor,
          color: institution.badgeTextColor || '#FFFFFF',
        }}
      >
        {institution.code}
      </div>

      {/* Names & Metadata */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <span
            className={`font-bold text-xs sm:text-sm tracking-tight truncate transition-colors leading-tight ${
              isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-[#F2F5F9] group-hover:text-[#00DF8F]'
            }`}
          >
            {institution.shortName}
          </span>
          <span className={`text-[9px] font-mono font-bold shrink-0 ${isLight ? 'text-emerald-700' : 'text-[#00DF8F]'}`}>
            {institution.settlementLatency.split(' ')[0]}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1 mt-1">
          <span className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-[#8EA2C6]'}`}>
            {institution.categoryLabel}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 opacity-80 group-hover:animate-ping" />
        </div>
      </div>
    </div>
  );
};
