import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';

export const LegalContactView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'privacy' | 'terms' | 'complaints' | 'cookies'>('contact');

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-16 pb-16 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#0D95FE]"></span>
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              GOVERNANCE &amp; OFFICES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F2F5F9]">
            Legal, Governance &amp; Contact
          </h1>

          <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
            AXOORA Financial Technologies Limited. Regulated financial institution in the Federal Republic of Nigeria.
          </p>

          {/* Tab switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'contact', label: 'Office & Contact' },
              { id: 'complaints', label: 'How to Complain' },
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms of Use' },
              { id: 'cookies', label: 'Cookie Policy' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0D95FE] text-[#00325b] font-bold'
                    : 'bg-[#0A1B3D] text-[#A8BBD6] hover:text-[#F2F5F9] border border-[#14294F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto">
        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="flex flex-col gap-8">
            <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-[#F2F5F9]">Contact Us</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#00DF8F] uppercase">Physical Headquarters</span>
                  <span className="font-semibold text-[#F2F5F9]">{COMPANY_INFO.name}</span>
                  <span className="text-[#A8BBD6]">Cappador Mall, Maitama, Abuja, Nigeria</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#0D95FE] uppercase">Official WhatsApp</span>
                  <span className="font-semibold text-[#F2F5F9]">{COMPANY_INFO.whatsappNumber}</span>
                  <span className="text-[#A8BBD6]">Bank with Axoora AI or chat with human agents</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#A8BBD6] uppercase">Customer Support</span>
                  <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-[#0D95FE] underline">
                    {COMPANY_INFO.supportEmail}
                  </a>
                  <span className="text-xs text-[#A8BBD6]">Assistance, account queries, and dispute logging</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-[#A8BBD6] uppercase">Press &amp; Media</span>
                  <a href={`mailto:${COMPANY_INFO.pressEmail}`} className="text-[#0D95FE] underline">
                    {COMPANY_INFO.pressEmail}
                  </a>
                  <span className="text-xs text-[#A8BBD6]">Editorial inquiries, brand marks, and press releases</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#020F2E] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed">
              <strong>Regulatory Status:</strong> AXOORA Financial Technologies Limited is licensed by the Central Bank of Nigeria (CBN). Eligible customer deposit balances are insured by the Nigeria Deposit Insurance Corporation (NDIC).
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6 text-sm text-[#A8BBD6] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#F2F5F9]">How to Complain</h2>
            <p>
              At Axoora, your problem has a name on our side. We do not pass you around between departments. If you experience an issue with a transfer, a card authorization, Save and Earn, or a POS terminal, we have a clear, enforceable complaints procedure:
            </p>

            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                <span className="font-bold text-[#F2F5F9] block mb-1">Step 1: Direct Support Notice</span>
                <p>
                  Contact our WhatsApp banking desk or email <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-[#0D95FE] underline">{COMPANY_INFO.supportEmail}</a> with your transaction reference. You will receive an immediate ticket acknowledgement with the name of the officer assigned.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                <span className="font-bold text-[#F2F5F9] block mb-1">Step 2: Investigation &amp; Resolution</span>
                <p>
                  POS terminal disputes and failed interbank transfers (NIP) are investigated in coordination with NIBSS and settlement partners. Resolution timeline: within 24 to 48 business hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                <span className="font-bold text-[#F2F5F9] block mb-1">Step 3: Regulatory Escalation</span>
                <p>
                  If you are unsatisfied with our resolution, you hold the legal right to escalate the matter to the Consumer Protection Department of the Central Bank of Nigeria (CBN).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6 text-sm text-[#A8BBD6] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#F2F5F9]">Privacy Policy</h2>
            <p>
              AXOORA Financial Technologies Limited respects your personal and commercial privacy. We operate in strict compliance with the Nigeria Data Protection Act (NDPA) and hold a valid Data Protection Certificate.
            </p>
            <p>
              We collect information you provide (such as your name, phone number, and transaction instructions) solely to deliver regulated banking, verify authorization, and prevent money laundering. We never sell your data to advertisers or third-party marketers.
            </p>
            <p>
              All WhatsApp banking interactions are encrypted in transit via Transport Layer Security (TLS 1.3) and protected by end-to-end authentication protocols.
            </p>
          </div>
        )}

        {/* Terms Tab */}
        {activeTab === 'terms' && (
          <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6 text-sm text-[#A8BBD6] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#F2F5F9]">Terms of Service</h2>
            <p>
              By accessing this website, joining our waitlist, or interacting with Axoora AI on WhatsApp, you agree to these Terms of Service.
            </p>
            <p>
              <strong>Not Product Usage in Browser:</strong> This website is an informational presentation of Axoora. You do not open accounts or execute binding monetary transfers directly in web browser sessions.
            </p>
            <p>
              <strong>Islamic-Compliant Financing:</strong> Any financing extended to business accounts is subject to Shariah non-interest review, rigorous creditworthiness verification, and is not guaranteed or automatic.
            </p>
          </div>
        )}

        {/* Cookies Tab */}
        {activeTab === 'cookies' && (
          <div className="p-8 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col gap-6 text-sm text-[#A8BBD6] leading-relaxed">
            <h2 className="text-2xl font-bold text-[#F2F5F9]">Cookie Policy</h2>
            <p>
              We use minimal, strictly necessary cookies to ensure our website functions correctly, remembers your navigation preferences, and secures forms. We do not use intrusive cross-site tracking cookies.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
