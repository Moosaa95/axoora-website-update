import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { COMPANY_INFO } from '../data/mockData';

import ceoImg from '../assets/team/ceo.jpg';
import ctoImg from '../assets/team/cto.jpg';
import cooImg from '../assets/team/coo.jpg';
import croImg from '../assets/team/cro.jpg';
import shariaImg from '../assets/team/sharia.jpg';
import peopleImg from '../assets/team/people.jpg';

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  division: 'leadership' | 'tech' | 'operations' | 'governance';
  location: string;
  credentials: string;
  image: string;
  initials: string;
  accentColor: string;
  conviction: string;
  bio: string;
  responsibilities: string[];
  tags: string[];
  tenure: string;
}

const LEADERS: LeaderProfile[] = [
  {
    id: 'farouk-sanusi',
    name: 'Farouk Sanusi',
    role: 'Founder & Chief Executive Officer',
    division: 'leadership',
    location: 'Abuja Headquarters',
    credentials: 'Ex-Central Bank Banking Supervision · Payment Switch Architect',
    image: ceoImg,
    initials: 'FS',
    accentColor: '#0D95FE',
    conviction:
      'If a market woman in Dawanau or an apprentice in Maitama cannot trust our transfer on a rainy Friday afternoon, nothing else we build matters.',
    bio:
      'Farouk spent over 14 years architecting resilient clearing infrastructure, core banking integrations, and national financial inclusion frameworks across West Africa. He founded Axoora to dismantle the fragmentation between personal banking, merchant shop tools, and agency terminals, placing interest-free dignity and speed at the center of Nigerian commerce.',
    responsibilities: [
      'Strategic vision and institutional capital allocation',
      'Regulatory compliance and CBN engagement',
      'Architecting ethical, zero-interest financial products',
    ],
    tags: ['Founder', 'CBN Liaison', 'Financial Inclusion', 'Payments Arch'],
    tenure: 'Founder & CEO',
  },
  {
    id: 'dr-ngozi-eze',
    name: 'Dr. Ngozi Eze',
    role: 'Co-Founder & Chief Technology Officer',
    division: 'tech',
    location: 'Abuja & Lagos Engineering Labs',
    credentials: 'PhD Distributed Systems · Ex-Lead Architect, High-Throughput Rails',
    image: ctoImg,
    initials: 'NE',
    accentColor: '#00DF8F',
    conviction:
      'We write systems that remain calm and idempotent even when an MTN mast drops in rural Kaduna during peak 5 PM trading hours.',
    bio:
      'With a doctorate in fault-tolerant distributed networks, Dr. Eze previously spearheaded transaction routing engines handling upwards of 15 million daily settlements. At Axoora, she leads our core ledger development, redundant NIBSS dual-channel switching, and conversational banking natural language engines for WhatsApp.',
    responsibilities: [
      'Core ledger zero-loss idempotency and 2.1s settlement SLA',
      'Dual-active 4G eSIM terminal firmware for the Apex POS fleet',
      'WhatsApp conversational AI NLP in English, Pidgin, and local dialects',
    ],
    tags: ['Co-Founder', 'Distributed Systems', 'NIBSS Core', 'Security'],
    tenure: 'Executive CTO',
  },
  {
    id: 'babatunde-adeleke',
    name: 'Babatunde Adeleke',
    role: 'Chief Operating Officer & Head of Market Operations',
    division: 'operations',
    location: 'Abuja & Northern Commercial Hubs',
    credentials: '16+ Yrs Commercial Banking & Agency Merchant Operations',
    image: cooImg,
    initials: 'BA',
    accentColor: '#F2A93B',
    conviction:
      'When an agent opens their wooden counter at 7:00 AM, their terminal must be alive and their liquidity float confirmed. We never sleep on merchant livelihood.',
    bio:
      'Babatunde built and managed distribution networks reaching over 24,000 retail merchants and POS terminals across Northern and Southwestern Nigeria. He brings ruthless discipline to logistics, merchant hardware swaps within 48 hours, and same-day dispute settlements.',
    responsibilities: [
      'Nationwide POS distribution and aggregator fleet operations',
      'Daily merchant liquidity float and midnight settlement cycles',
      'Field support desks across Kano, Kaduna, Lagos, and Abuja',
    ],
    tags: ['Field Operations', 'Merchant Liquidity', 'POS Fleet', 'Logistics'],
    tenure: 'Chief Operating Officer',
  },
  {
    id: 'aisha-haladu',
    name: 'Aisha Haladu',
    role: 'Chief Risk & Compliance Officer',
    division: 'governance',
    location: 'Abuja Headquarters',
    credentials: 'Chartered Banker (FCIB) · Certified Anti-Money Laundering Specialist (CAMS)',
    image: croImg,
    initials: 'AH',
    accentColor: '#A855F7',
    conviction:
      'We lock the door on user money and customer data before we write a single marketing line. Compliance is not our obstacle; it is our foundation.',
    bio:
      'A seasoned banking supervisor with 17 years across tier-1 Nigerian financial institutions, Aisha guarantees that Axoora operates at the highest echelon of prudential rigor, NDIC deposit safety, and strict customer data sovereignty. She ensures every transaction meets CBN Know-Your-Customer standards.',
    responsibilities: [
      'Regulatory compliance under CBN guidelines and NDIC deposit insurance',
      'Automated real-time AML/CFT transaction surveillance',
      'Data sovereignty and cryptographic customer privacy protection',
    ],
    tags: ['Prudential Risk', 'NDIC Insured', 'AML/CFT', 'Data Privacy'],
    tenure: 'Chief Risk Officer',
  },
  {
    id: 'dr-ibrahim-danbatta',
    name: 'Dr. Ibrahim Danbatta',
    role: 'Director of Islamic Finance & Sharia Governance',
    division: 'governance',
    location: 'Abuja & Kano Advisory Board',
    credentials: 'AAOIFI Certified Islamic Finance Scholar · Non-Interest Regulatory Advisor',
    image: shariaImg,
    initials: 'ID',
    accentColor: '#00DF8F',
    conviction:
      'Inclusion is hollow if it forces hardworking market traders into compounding debt usury. Islamic finance is ethical partnership, not exploitation.',
    bio:
      'Dr. Danbatta holds international certifications in AAOIFI Sharia financial auditing and has served on non-interest banking advisory boards. He conducts rigorous end-to-end audits of all Axoora products—ensuring Save and Earn, working capital financing, and Paycircle escrow remain genuinely interest-free (Riba-free) and backed by tangible trade.',
    responsibilities: [
      'Independent Sharia auditing of profit-sharing formulas (Mudarabah & Murabaha)',
      'Ensuring zero interest or usurious late penalties across all merchant lines',
      'Education and ethical finance advocacy for community traders',
    ],
    tags: ['Sharia Governance', 'AAOIFI Certified', 'Ethical Banking', 'Zero Riba'],
    tenure: 'Director of Sharia Governance',
  },
  {
    id: 'kemi-adelekan',
    name: 'Kemi Adelekan',
    role: 'Head of People & Customer Experience',
    division: 'operations',
    location: 'Abuja Headquarters',
    credentials: '12+ Yrs Human Capital & Multilingual Customer Support Leadership',
    image: peopleImg,
    initials: 'KA',
    accentColor: '#0D95FE',
    conviction:
      'Your problem has a named human on our side. We do not hide behind automated ticket bots or pass you around between departments.',
    bio:
      'Kemi oversees Axoora’s human fabric and frontline support desk. She champions our principle of Named Care, ensuring our WhatsApp and voice support officers speak English, Pidgin, Hausa, Yoruba, and Igbo with warmth, empathy, and immediate resolution authority.',
    responsibilities: [
      '24/7 high-touch WhatsApp banking resolution team management',
      'Multilingual customer onboarding across Hausa, Yoruba, Igbo, and Pidgin',
      'Fostering an inclusive, accountable, and mission-first company culture',
    ],
    tags: ['Customer Dignity', 'Named Care', 'Abuja Culture', 'People Ops'],
    tenure: 'Head of People & CX',
  },
];

interface OurPeopleSectionProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: () => void;
}

export const OurPeopleSection: React.FC<OurPeopleSectionProps> = ({
  onNavigate,
  onOpenWaitlist,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'leadership' | 'tech' | 'operations' | 'governance'>('all');
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);

  const filteredLeaders = LEADERS.filter((leader) => {
    if (activeTab === 'all') return true;
    return leader.division === activeTab;
  });

  return (
    <section className="relative w-full pt-16 pb-20 border-t border-[#14294F] bg-[#020F2E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">
                OUR PEOPLE // THE LEADERSHIP TEAM
              </span>
              <span aria-hidden="true" className="text-[#14294F]">·</span>
              <span className="text-[#A8BBD6]">Maitama, Abuja HQ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
              The humans steering the house.
            </h2>

            <p className="text-base sm:text-lg text-[#A8BBD6] max-w-2xl leading-relaxed">
              We are not faceless algorithms or an offshore shell. We are Nigerian bankers, distributed systems engineers, and community operators building with warmth and accountability for the street.
            </p>
          </div>

          {/* Division Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0A1B3D] border border-[#14294F] rounded-xl self-start md:self-auto">
            {[
              { id: 'all', label: 'All Stewards' },
              { id: 'leadership', label: 'Executive' },
              { id: 'tech', label: 'Engineering' },
              { id: 'operations', label: 'Field Ops' },
              { id: 'governance', label: 'Risk & Sharia' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#14294F] text-[#F2F5F9] font-bold shadow-sm border border-[#0D95FE]/30'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#14294F]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leadership Grid with Engaging Hover-Effect Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredLeaders.map((leader) => (
            <motion.div
              key={leader.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] hover:border-[#0D95FE]/80 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#0D95FE]/10"
            >
              {/* Photo Area with Natural Human Photographic Aesthetic */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#020F2E]">
                <img
                  src={leader.image}
                  alt={`${leader.name} - ${leader.role}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />

                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] via-[#0A1B3D]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Location & Tenure Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-[#020F2E]/90 backdrop-blur-md border border-[#14294F] text-[#00DF8F] font-semibold flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
                    {leader.location}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#020F2E]/90 backdrop-blur-md border border-[#14294F] text-[#F2F5F9] font-medium">
                    {leader.tenure}
                  </span>
                </div>

                {/* Hover Conviction Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="p-3 rounded-2xl bg-[#020F2E]/95 backdrop-blur-md border border-[#0D95FE]/40 shadow-xl">
                    <p className="text-xs text-[#F2F5F9] italic font-medium line-clamp-2 leading-relaxed">
                      "{leader.conviction}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#F2F5F9] group-hover:text-[#0D95FE] transition-colors tracking-tight">
                      {leader.name}
                    </h3>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border"
                      style={{
                        backgroundColor: '#020F2E',
                        borderColor: leader.accentColor,
                        color: leader.accentColor,
                      }}
                      title={leader.name}
                    >
                      {leader.initials}
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#00DF8F] uppercase tracking-wider font-mono">
                    {leader.role}
                  </p>

                  <p className="text-xs text-[#A8BBD6] font-mono leading-tight">
                    {leader.credentials}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed mt-2 line-clamp-3">
                    {leader.bio}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-4 border-t border-[#14294F] flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {leader.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#020F2E] border border-[#14294F] text-[#A8BBD6]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="w-full mt-1 py-2 px-3 rounded-xl bg-[#020F2E] hover:bg-[#14294F] text-xs font-semibold text-[#F2F5F9] hover:text-[#00DF8F] border border-[#14294F] hover:border-[#00DF8F]/40 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Read Executive Statement & Bio</span>
                    <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Human Touch Assurance Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0A1B3D] via-[#041436] to-[#0A1B3D] border-2 border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00DF8F]/10 border border-[#00DF8F]/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#00DF8F] text-[28px]">
                verified_user
              </span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base sm:text-lg font-bold text-[#F2F5F9]">
                Our Leadership is Personally Bound by Named Care
              </h4>
              <p className="text-xs sm:text-sm text-[#A8BBD6]">
                You can reach our executive desk at Cappador Mall, Maitama, or contact leadership directly via official verified channels.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${COMPANY_INFO.supportEmail}?subject=Direct Inquiry for Axoora Leadership`}
              className="px-5 py-2.5 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-xs font-semibold text-[#F2F5F9] transition-colors whitespace-nowrap"
            >
              Email Leadership
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#0D95FE] text-[#00325b] hover:bg-[#00DF8F] hover:text-[#003825] font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Deep-Dive Executive Profile Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] shadow-2xl p-6 sm:p-8 text-[#F2F5F9] flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#020F2E] border border-[#14294F] hover:border-[#0D95FE] flex items-center justify-center text-[#A8BBD6] hover:text-[#F2F5F9] transition-colors cursor-pointer"
                title="Close dialog"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pr-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#14294F] shrink-0 bg-[#020F2E]">
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00DF8F] uppercase tracking-wider font-semibold">
                      {selectedLeader.location}
                    </span>
                    <span className="text-xs text-[#14294F]">·</span>
                    <span className="text-xs text-[#A8BBD6] font-mono">
                      {selectedLeader.tenure}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F9] tracking-tight">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#0D95FE]">
                    {selectedLeader.role}
                  </p>
                  <p className="text-xs font-mono text-[#A8BBD6]">
                    {selectedLeader.credentials}
                  </p>
                </div>
              </div>

              {/* Personal Guiding Conviction */}
              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-[#00DF8F] uppercase tracking-wider font-bold">
                  CORE CONVICTION & ENTERPRISE PROMISE
                </span>
                <p className="text-sm sm:text-base text-[#F2F5F9] italic leading-relaxed">
                  "{selectedLeader.conviction}"
                </p>
              </div>

              {/* Full Bio */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8BBD6]">
                  Biography & Professional Record
                </h4>
                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

              {/* Core Responsibilities */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8BBD6]">
                  Primary Executive Mandates
                </h4>
                <ul className="space-y-2">
                  {selectedLeader.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-[#F2F5F9] flex items-start gap-2.5"
                    >
                      <span className="material-symbols-outlined text-[#00DF8F] text-[18px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#14294F] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {selectedLeader.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#020F2E] border border-[#14294F] text-[#A8BBD6]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}?subject=Regarding ${encodeURIComponent(selectedLeader.name)} - ${encodeURIComponent(selectedLeader.role)}`}
                    className="px-4 py-2 rounded-xl bg-[#020F2E] hover:bg-[#14294F] text-xs font-semibold text-[#F2F5F9] border border-[#14294F] transition-colors"
                  >
                    Contact Office
                  </a>
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="px-5 py-2 rounded-xl bg-[#0D95FE] text-[#00325b] hover:bg-[#00DF8F] hover:text-[#003825] text-xs font-bold transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
