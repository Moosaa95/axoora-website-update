'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Lock,
  FileText,
  ChevronDown,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons } from './home/shared';

interface TopicItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

const topics: TopicItem[] = [
  {
    icon: User,
    title: 'Getting Started',
    desc: 'Opening an account, your BVN, and your tier.',
  },
  {
    icon: ArrowUpRight,
    title: 'Sending Money',
    desc: 'Transfers, schedules, bulk payouts and failures.',
  },
  {
    icon: CreditCard,
    title: 'Cards',
    desc: 'Naira, Dollar, freezing, and replacing a lost card.',
  },
  {
    icon: PiggyBank,
    title: 'Savings and Ajo',
    desc: 'Plans, profit, circles and payouts.',
  },
  {
    icon: Lock,
    title: 'Security',
    desc: 'Your PIN, your BVN, devices and sign-in.',
  },
  {
    icon: FileText,
    title: 'Account and Limits',
    desc: 'Statements, beneficiaries and tier limits.',
  },
];

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: 'pending',
    q: 'My transfer is still pending. What now?',
    a: 'A stalled transfer gets a deadline. It settles by then, or it is reversed to your wallet.',
  },
  {
    id: 'name-match',
    q: 'The name on the account did not match. Can I still send?',
    a: 'You will see the name the bank returned. If it is not who you meant, stop and check before you approve.',
  },
  {
    id: 'raise-limit',
    q: 'How do I raise my limit?',
    a: 'Your tier sets your limit. Account in the app shows your tier and what the next one gives you.',
  },
  {
    id: 'not-arrive',
    q: 'Someone sent money and it did not arrive.',
    a: 'If it would push you past your tier cap it is turned back at the sender, so it never lands.',
  },
];

export const HelpView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({
    pending: true,
    'name-match': true,
    'raise-limit': true,
    'not-arrive': true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Need a Hand? (Image 1)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-8">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-12 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide block mb-3">
            Help
          </span>

          <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white! mb-6">
            Need a Hand?
          </h1>

          <p className="text-[18px] sm:text-[20px] text-[#d6ebff] font-normal leading-[1.6] max-w-2xl mx-auto mb-9">
            Search for the thing you are stuck on, or start a chat in the app.
          </p>

          {/* Search Pill Input */}
          <div className="w-full max-w-xl relative">
            <Search className="w-5 h-5 text-[#8492a6] absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help"
              className="w-full bg-white text-[#161c22] placeholder:text-[#8492a6] text-[15px] sm:text-[16px] pl-13 pr-6 py-4 rounded-full shadow-[0_8px_30px_rgba(2,15,46,0.12)] border border-transparent focus:border-[#0D95FE] focus:outline-none transition"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: BROWSE BY TOPIC (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Browse by Topic
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-7 shadow-xs hover:shadow-md transition flex flex-col justify-between min-h-[170px]"
              >
                <div>
                  <Icon className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
                  <h3 className="text-[20px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                    {topic.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: ASKED MOST OFTEN (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-14">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Asked Most Often
        </h2>

        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqs[faq.id] ?? false;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-6 sm:p-7 shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                >
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#161c22] dark:text-white group-hover:text-[#0976da] transition">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#8492a6] shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300 mt-3 pt-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: STILL STUCK? & CTA (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-20">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-6">
          Still Stuck?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Card 1: Chat in the App */}
          <div
            onClick={openDownloadApp}
            className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <MessageCircle className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[20px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Chat in the App
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Open Axoora and tap the chat button. It is the fastest route to a person.
              </p>
            </div>
          </div>

          {/* Card 2: Report a Problem */}
          <div
            onClick={openWhatsApp}
            className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <HelpCircle className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[20px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Report a Problem
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Raise a dispute on any payment from the transaction itself.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Blue CTA Banner */}
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            We Would Rather You Asked.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            Chat lives in the app, on every screen.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={openDownloadApp ?? (() => {})}
            onWhatsApp={openWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};
