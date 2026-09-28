'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';

interface BlogArticle {
  id: string;
  category: 'Business Tips' | 'Product Updates' | 'Security Tips' | 'Islamic Finance';
  title: string;
  author: string;
  authorRole: string;
  authorPhoto?: string;
  thumbnailPhoto?: string;
  date: string;
  readTime: string;
  summary: string;
  badgeColor: string;
  icon: string;
  takeaways: string[];
  content: string[];
}

interface BlogArticlesCarouselProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const BlogArticlesCarousel: React.FC<BlogArticlesCarouselProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const articles: BlogArticle[] = [
    {
      id: '1',
      category: 'Business Tips',
      title: '7 Profitable Home-based Businesses for Beginners in Nigeria (2026)',
      author: 'Chidinma Nwanye',
      authorRole: 'Head of Merchant Growth',
      authorPhoto: '/team/cro.jpg',
      thumbnailPhoto: '/merchants/fatima.jpg',
      date: 'May 11, 2026',
      readTime: '5 min read',
      summary: 'Explore sustainable retail and wholesale supply setups that can be started from home with low capital and registered shop NUBANs.',
      badgeColor: '#0D95FE',
      icon: 'storefront',
      takeaways: [
        'How to register a dedicated business NUBAN without physical branch visits',
        'Low-cost wholesale inventory sourcing in major hubs (Kano, Onitsha, Lagos)',
        'Managing cash-flow reconciliation with zero transfer fees',
      ],
      content: [
        'Starting a home-based business in Nigeria no longer requires massive upfront capital. Modern digital banking infrastructure allows solo entrepreneurs to collect card payments, automate invoices, and dispatch goods directly from home.',
        'By utilizing sub-3s NIBSS instant settlement rails, merchants retain full liquidity to reinvest in daily inventory restocking without waiting 24 to 48 hours for clearing.',
      ],
    },
    {
      id: '2',
      category: 'Product Updates',
      title: "Forgot Your Mobile Banking Password? Here's How to Reset It Instantly",
      author: 'Tariq Al-Mansoor',
      authorRole: 'Core Ledger Engineer',
      authorPhoto: '/team/coo.jpg',
      thumbnailPhoto: '/merchants/emeka.jpg',
      date: 'May 04, 2026',
      readTime: '4 min read',
      summary: 'Quick guide to self-service PIN recovery with face ID verification without visiting a physical branch or waiting on hold.',
      badgeColor: '#00DF8F',
      icon: 'lock_reset',
      takeaways: [
        'Biometric liveness verification replaces paper affidavit requests',
        'Automated 6-digit WhatsApp OTP verification ensures high delivery rate',
        'Zero security risk of SIM-swap bypass via device hardware binding',
      ],
      content: [
        'Account recovery delays cost Nigerian traders valuable sales every hour. Our updated biometric security stack pairs 3D face liveness detection with CBN BVN records to restore access securely in under two minutes.',
      ],
    },
    {
      id: '3',
      category: 'Security Tips',
      title: 'Stop Leaving Your Bank Account Vulnerable: Digital Login Security Best Practices',
      author: 'Amina Bello',
      authorRole: 'Chief Risk & Compliance Officer',
      authorPhoto: '/team/cto.jpg',
      thumbnailPhoto: '/merchants/shopper.jpg',
      date: 'April 26, 2026',
      readTime: '6 min read',
      summary: 'How rolling CVV numbers, SIM-swap alerts, and biometric locks shield your business revenue from modern social engineering attacks.',
      badgeColor: '#F2A93B',
      icon: 'security',
      takeaways: [
        'Why dynamic rolling CVVs on virtual cards block unauthorized international re-billing',
        'Detecting spoofed WhatsApp banking handles with verified green badges',
        'Setting daily payment thresholds to safeguard business working capital',
      ],
      content: [
        'Modern financial crime thrives on social engineering rather than core encryption breaches. Axoora enforces hardware-level cryptographic key attestation on every transaction so even if a SIM card is cloned, your account remains secure.',
      ],
    },
    {
      id: '4',
      category: 'Business Tips',
      title: 'What are the Best Mobile Banking Apps for Bill Payments in Nigeria?',
      author: 'Chidinma Nwanye',
      authorRole: 'Head of Merchant Growth',
      authorPhoto: '/team/cro.jpg',
      thumbnailPhoto: '/merchants/tunde.jpg',
      date: 'April 02, 2026',
      readTime: '5 min read',
      summary: 'Comparing uptime records, electricity token generation speeds, and zero-fee corporate batch payouts across Nigerian switches.',
      badgeColor: '#0D95FE',
      icon: 'receipt_long',
      takeaways: [
        'Instant Disco electricity token generation without pending status loops',
        'Automating monthly shop rent and staff salaries in a single bulk batch',
        'Reconciling utility expenses with downloadable VAT-compliant invoices',
      ],
      content: [
        'Utility downtime is one of the most frustrating experiences for Nigerian businesses. We evaluated settlement latencies across power distribution companies (AEDC, EKEDC, IBEDC) and show how direct API gateways guarantee 99.98% token delivery.',
      ],
    },
    {
      id: '5',
      category: 'Islamic Finance',
      title: 'Why Non-Interest Working Capital Protects Traders from Debt Cycles',
      author: 'Dr. Ibrahim Danbatta',
      authorRole: 'Head of Ethical Banking',
      authorPhoto: '/team/sharia.jpg',
      thumbnailPhoto: '/merchants/bilkisu.jpg',
      date: 'March 28, 2026',
      readTime: '7 min read',
      summary: 'How halal profit-sharing (Mudarabah) aligns financial health with merchant prosperity, eliminating usurious compounding debt.',
      badgeColor: '#00DF8F',
      icon: 'handshake',
      takeaways: [
        'Zero compounding interest (Riba) guarantees peace of mind during low seasons',
        'Asset-backed Murabaha financing for inventory expansion',
        'AAOIFI-certified governance audited by independent Sharia advisory council',
      ],
      content: [
        'Conventional merchant loans charge aggressive compound interest that drains small businesses during seasonal slumps. Halal non-interest financing shares in the enterprise risk, ensuring lenders succeed only when the business flourishes.',
      ],
    },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentArticles = articles.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="relative w-full py-20 bg-[#020F2E] border-b border-[#14294F] text-[#F2F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F2F5F9] tracking-tight">
              Blogs &amp; Articles
            </h2>
            <p className="text-base text-[#A8BBD6]">
              Discover the roadmap to financial success! Stay updated with the latest tips, security updates, and merchant trends on our blog.
            </p>
          </div>

          <button
            onClick={() => onNavigate?.('journal')}
            className="px-5 py-2.5 rounded-full bg-[#0A1B3D] border border-[#14294F] hover:border-[#0D95FE] text-xs sm:text-sm font-semibold text-[#0D95FE] hover:text-white transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <span>Discover more stories</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Carousel Slider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedArticle(article)}
              className="p-6 rounded-3xl bg-[#0A1B3D] border border-[#14294F] hover:border-[#0D95FE]/60 transition-all cursor-pointer flex flex-col justify-between gap-6 shadow-xl group hover:shadow-2xl hover:shadow-[#0D95FE]/10"
            >
              {/* Card Visual Header Banner with Real Photography */}
              <div className="relative aspect-[16/9] w-full rounded-2xl bg-[#020F2E] border border-[#14294F] overflow-hidden group-hover:scale-[1.02] transition-transform">
                {article.thumbnailPhoto ? (
                  <>
                    <img
                      src={article.thumbnailPhoto}
                      alt={article.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] via-transparent to-black/20" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${article.badgeColor}20` }}
                    >
                      <span
                        className="material-symbols-outlined text-[32px]"
                        style={{ color: article.badgeColor }}
                      >
                        {article.icon}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs text-[#7B9CD2] font-mono">
                <span className="text-[#0D95FE] font-bold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
              </div>

              {/* Card Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#0D95FE] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed line-clamp-2">
                  {article.summary}
                </p>
              </div>

              {/* Author Footer with Real Author Photo & Read affordance */}
              <div className="pt-4 border-t border-[#14294F] flex items-center justify-between text-xs text-[#7B9CD2]">
                <div className="flex items-center gap-2.5">
                  {article.authorPhoto && (
                    <img
                      src={article.authorPhoto}
                      alt={article.author}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0D95FE]/50 shrink-0"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">By {article.author}</span>
                    <span className="text-[11px] text-[#A8BBD6]">{article.authorRole}</span>
                  </div>
                </div>
                <span className="text-[#00DF8F] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  <span>Read</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Controller: Pagination Dots & Arrows */}
        <div className="flex items-center justify-between pt-2">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`transition-all cursor-pointer rounded-full ${
                  currentPage === idx ? 'w-6 h-2 bg-[#0D95FE]' : 'w-2 h-2 bg-[#14294F]'
                }`}
                title={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev & Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] hover:border-[#0D95FE] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Previous articles"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#0A1B3D] border border-[#14294F] hover:border-[#0D95FE] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Next articles"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK READ MODAL DIALOG */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] p-6 sm:p-8 shadow-2xl text-[#F2F5F9] flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#14294F]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0D95FE]">
                    <span className="font-bold">{selectedArticle.category}</span>
                    <span>·</span>
                    <span>{selectedArticle.readTime}</span>
                    <span>·</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-[#A8BBD6]">
                    By {selectedArticle.author} · {selectedArticle.authorRole}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Key Takeaways Card */}
              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-2.5">
                <span className="text-xs font-mono font-bold text-[#00DF8F] uppercase">
                  Key Takeaways for Merchants &amp; Individuals
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#A8BBD6]">
                  {selectedArticle.takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#00DF8F] font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Body Prose */}
              <div className="space-y-3.5 text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#14294F] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onNavigate?.('journal');
                  }}
                  className="text-xs text-[#0D95FE] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Read complete series in Journal</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00284D] hover:text-[#003825] font-bold text-xs transition-colors cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
