'use client';

import React, { useState } from 'react';
import {
  Search,
  ArrowUpRight,
  CreditCard,
  Lock,
  Users,
  ShieldCheck,
  UserCheck,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';

export const HelpView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const topics = [
    {
      title: 'Getting Started',
      desc: 'Opening an account, your BVN, and your tier.',
      icon: UserCheck,
    },
    {
      title: 'Sending Money',
      desc: 'Transfers, schedules, bulk payouts and failures.',
      icon: ArrowUpRight,
    },
    {
      title: 'Cards',
      desc: 'Naira, Dollar, freezing, and replacing a lost card.',
      icon: CreditCard,
    },
    {
      title: 'Savings and Ajo',
      desc: 'Plans, profit, circles and payouts.',
      icon: Users,
    },
    {
      title: 'Security',
      desc: 'Your PIN, your BVN, devices and sign-in.',
      icon: ShieldCheck,
    },
    {
      title: 'Account and Limits',
      desc: 'Statements, beneficiaries and tier limits.',
      icon: Lock,
    },
  ];

  const faqs = [
    {
      q: 'My transfer is still pending. What now?',
      a: 'A stalled transfer gets an automatic deadline. It either settles with the beneficiary bank by that exact deadline, or it is automatically reversed back into your wallet balance.',
    },
    {
      q: 'The name on the account did not match. Can I still send?',
      a: 'You will clearly see the verified name returned by NIBSS before entering your PIN. If it is not who you intended to pay, cancel before confirming.',
    },
    {
      q: 'How do I raise my limit?',
      a: 'Your tier sets your limits. Upgrading from Tier 1 to Tier 3 requires verifying your BVN, proof of address, and ID in the app, unlocking unlimited daily transfers and multi-currency dollar cards.',
    },
    {
      q: 'Someone sent money and it did not arrive.',
      a: 'If a transfer would push you past your tier cap, it is turned back at the sender bank before settling, so it never leaves them in limbo.',
    },
  ];

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
      {/* ─── Hero / Search Section matching Figma 3227:2395 ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-16">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            Help & Resolution
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Need a Hand?
          </h1>
          <p className="text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed mb-8">
            Search for the thing you are stuck on, or start a chat in the app.
          </p>

          {/* Search Bar matching Figma input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics, transfers, cards, or limits..."
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* ─── Browse by Topic ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:border-blue-500 hover:shadow-sm transition cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5">
                  {t.title}
                </h3>
                <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Asked Most Often ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Asked Most Often</h2>
        <div className="space-y-4 max-w-3xl">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-6 shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm sm:text-base text-[#4c5866] dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Still Stuck? ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-xs">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Still Stuck?</h2>
          <p className="text-sm text-[#4c5866] dark:text-slate-400 mb-8">
            Connect with a live human support specialist immediately.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5">
                  Chat in the App
                </h3>
                <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
                  Open Axoora and tap the chat button. It is the fastest route to a verified person.
                </p>
              </div>
              <button
                type="button"
                onClick={openDownloadApp}
                className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
              >
                Open App Chat
              </button>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5">
                  Report a Problem
                </h3>
                <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
                  Raise an institutional dispute on any payment directly from the transaction slip itself.
                </p>
              </div>
              <button
                type="button"
                onClick={openWhatsApp}
                className="w-full py-2.5 bg-[#043e97] text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition"
              >
                Talk on WhatsApp Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2">
            We Would Rather You Asked.
          </h3>
          <p className="text-base text-[#4c5866] dark:text-slate-400">
            Chat lives in the app, on every single screen.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openDownloadApp}
            className="bg-[#161c22] text-white hover:bg-black px-6 py-3 rounded-xl font-bold text-sm transition"
          >
            Get the app
          </button>
          <button
            type="button"
            onClick={openWhatsApp}
            className="border border-[#161c22] dark:border-white text-[#161c22] dark:text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Start on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};
