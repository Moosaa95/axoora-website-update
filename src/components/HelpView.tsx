import React, { useState } from 'react';
import { COMPANY_INFO, FAQ_LIST } from '../data/mockData';
import { FaqAccordionItem } from './FaqAccordionItem';

export const HelpView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_LIST[0]?.id || null);

  const categories = ['All', 'General', 'Personal & Cards', 'Save and Earn', 'Paycircle', 'Business & POS', 'Security'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? FAQ_LIST
      : FAQ_LIST.filter((f) => f.category === selectedCategory);

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-16 pb-16 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              HELP &amp; RESOLUTION DESK
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F2F5F9]">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-[#A8BBD6] max-w-xl">
            Everything you need to know about our personal accounts, dual-currency cards, Islamic savings, shop accounts, and POS hardware.
          </p>
        </div>
      </section>

      {/* FAQs Container */}
      <section className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0D95FE] text-[#002447]'
                  : 'bg-[#0A1B3D] text-[#A8BBD6] border border-[#14294F] hover:text-[#F2F5F9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3">
          {filteredFaqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id || faq.question}
              item={faq}
              isOpen={openFaqId === (faq.id || faq.question)}
              onToggle={() =>
                setOpenFaqId(
                  openFaqId === (faq.id || faq.question) ? null : faq.id || faq.question
                )
              }
            />
          ))}
        </div>

        {/* Dispute Resolution Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#0A1B3D] border border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#F2F5F9]">
              Need direct help or have a dispute?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8BBD6] max-w-md">
              Our Abuja customer desk responds in minutes. Message us directly on WhatsApp or email our support inbox.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-[#00DF8F] hover:bg-[#34C08D] text-[#003825] font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Support</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.supportEmail}`}
              className="px-5 py-3 rounded-2xl bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] font-bold text-xs sm:text-sm transition-all"
            >
              {COMPANY_INFO.supportEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
