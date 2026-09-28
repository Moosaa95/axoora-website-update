import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { JournalArticle } from '../types';

export const JournalView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const categories = ['All', 'Engineering', 'Technology', 'Business', 'Guides'];

  const filteredArticles =
    selectedCategory === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Header */}
      <section className="relative px-4 sm:px-8 pt-16 pb-20 border-b border-[#14294F] bg-[#020F2E]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#0D95FE]"></span>
            <span className="font-mono text-xs text-[#0D95FE] uppercase tracking-wider font-semibold">
              AXOORA PUBLICATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            The Axoora Journal
          </h1>

          <p className="text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Thoughtful essays, technical deep-dives, and operational field guides written by our engineers, product leaders, and Islamic finance researchers.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D95FE] text-[#00325b] font-bold'
                    : 'bg-[#0A1B3D] text-[#A8BBD6] hover:text-[#F2F5F9] border border-[#14294F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] hover:border-[#0D95FE] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#00DF8F] uppercase tracking-wider font-semibold">
                    {article.category}
                  </span>
                  <span className="text-[#A8BBD6]">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-[#F2F5F9] group-hover:text-[#0D95FE] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A8BBD6] leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#14294F] text-xs text-[#A8BBD6] mt-6">
                <span>By {article.author}</span>
                <span className="font-mono">{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01091C]/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0A1B3D] border-2 border-[#14294F] rounded-3xl p-6 sm:p-8 text-[#F2F5F9] relative max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col gap-4">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span>{activeArticle.category}</span>
              <span>&bull;</span>
              <span>{activeArticle.date}</span>
              <span>&bull;</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F2F5F9] leading-tight">
              {activeArticle.title}
            </h2>

            <div className="py-2 text-xs text-[#A8BBD6] border-b border-[#14294F]">
              Author: {activeArticle.author}
            </div>

            <div className="text-sm text-[#A8BBD6] leading-relaxed flex flex-col gap-4 pt-2">
              <p className="text-base text-[#F2F5F9] font-medium leading-relaxed">
                {activeArticle.summary}
              </p>
              <p>
                Building financial software in emerging markets requires rethinking orthodox assumptions about connectivity, trust, and regulation. At Axoora, every layer of our stack — from the NIBSS ISO 20022 message parsers to the conversational NLP state machines running on WhatsApp — is designed with offline tolerance and sovereign resilience.
              </p>
              <p>
                We publish these notes because financial engineering in Nigeria deserves documentation that is transparent, rigorous, and grounded in the actual lived realities of our markets.
              </p>
            </div>

            <div className="pt-4 border-t border-[#14294F] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-xs font-semibold text-[#F2F5F9]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
