import React, { useState, useMemo } from 'react';
import { FAQ_LIST, COMPANY_INFO } from '../data/mockData';
import { FaqAccordionItem, getCategoryMeta } from './FaqAccordionItem';
import { ScreenType } from '../types';

interface HelpViewProps {
  onOpenWhatsApp: () => void;
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
}

type FaqCategory = 'All' | 'General' | 'Security' | 'Personal & Cards' | 'Save and Earn' | 'Paycircle' | 'Business & POS';

const CATEGORY_ORDER: FaqCategory[] = [
  'All',
  'General',
  'Security',
  'Personal & Cards',
  'Save and Earn',
  'Paycircle',
  'Business & POS',
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  General: 'Licensing, regulatory backing, account basics, and WhatsApp AI services.',
  Security: 'PIN and credential protection, fraud prevention, and card freezing.',
  'Personal & Cards': 'Virtual Dollar & Naira cards, limits, and Axoora reward points.',
  'Save and Earn': 'Non-interest Islamic wealth accumulation based on trade principles.',
  Paycircle: 'Group thrift (Ajo/Esusu) digitized with licensed escrow guarantees.',
  'Business & POS': 'Ethical working capital, Apex POS terminals, and agent infrastructure.',
};

export const HelpView: React.FC<HelpViewProps> = ({
  onOpenWhatsApp,
  onNavigate,
  onOpenWaitlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('All');
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');
  const [singleOpenMode, setSingleOpenMode] = useState<boolean>(false);
  
  // Set of open item IDs (or indexes)
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['faq-what-is-axoora']));

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: FAQ_LIST.length };
    FAQ_LIST.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter FAQs based on category & search
  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answer.toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inTags = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;

      return inQuestion || inAnswer || inCategory || inTags;
    });
  }, [selectedCategory, searchQuery]);

  // When search query changes, automatically expand matching items so user sees answers immediately
  React.useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const matchingIds = new Set(filteredFaqs.map((f) => f.id || f.question));
      setOpenIds(matchingIds);
    }
  }, [searchQuery, filteredFaqs]);

  // Group filtered FAQs by category for "grouped" view
  const groupedFaqs = useMemo(() => {
    const groups: Record<string, typeof filteredFaqs> = {};
    filteredFaqs.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredFaqs]);

  // Toggle item accordion
  const handleToggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (singleOpenMode) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  // Expand all currently filtered items
  const handleExpandAll = () => {
    const allFilteredIds = new Set(filteredFaqs.map((f) => f.id || f.question));
    setOpenIds(allFilteredIds);
  };

  // Collapse all
  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  // Expand/collapse a specific category group
  const handleToggleCategoryGroup = (catName: string) => {
    const itemsInCat = filteredFaqs.filter((f) => f.category === catName);
    const catIds = itemsInCat.map((f) => f.id || f.question);
    const allOpen = catIds.every((id) => openIds.has(id));

    setOpenIds((prev) => {
      const next = new Set(prev);
      if (allOpen) {
        catIds.forEach((id) => next.delete(id));
      } else {
        catIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const quickSearches = [
    'Virtual Dollar Card',
    'Save and Earn',
    'POS Terminal',
    'PIN Security',
    'Paycircle',
    'WhatsApp Banking',
  ];

  const allAreExpanded = filteredFaqs.length > 0 && filteredFaqs.every((f) => openIds.has(f.id || f.question));

  return (
    <div className="w-full bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-8 pt-16 pb-16 border-b border-[#14294F] bg-[#020F2E] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0D95FE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse"></span>
            <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
              AXOORA KNOWLEDGE & SUPPORT
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F5F9] leading-tight">
            How can we help you?
          </h1>

          <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed max-w-2xl">
            Clear walkthroughs, operational answers, and direct escalation lines. Browse organized topics below or search for specific questions.
          </p>

          {/* Interactive Search Box */}
          <div className="w-full max-w-2xl relative mt-3">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#0D95FE] text-[22px]">
              search
            </span>
            <input
              type="text"
              aria-label="Search FAQs"
              placeholder="Search topics (e.g. Save and Earn, Virtual Dollar Card, Paycircle, POS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-full bg-[#0A1B3D] border-2 border-[#14294F] focus:border-[#0D95FE] text-[#F2F5F9] placeholder-[#A8BBD6]/50 text-sm sm:text-base focus:outline-none transition-all shadow-inner shadow-[#01091C]/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl text-xs">
            <span className="text-[#A8BBD6]/70 font-mono text-[11px] uppercase tracking-wider">
              Popular searches:
            </span>
            {quickSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setSearchQuery(term);
                  setSelectedCategory('All');
                }}
                className="px-3 py-1 rounded-full bg-[#0A1B3D] hover:bg-[#14294F] text-[#A8BBD6] hover:text-[#0D95FE] border border-[#14294F] transition-all cursor-pointer text-xs"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Security Warning Callout */}
      <section className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/40 flex items-start gap-3.5 text-xs sm:text-sm text-[#F2F5F9] shadow-md shadow-amber-950/20">
          <span className="material-symbols-outlined text-amber-400 text-[26px] shrink-0 mt-0.5">
            security
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-amber-300 uppercase tracking-wider font-mono text-[11px] sm:text-xs">
              Crucial Customer Security Notice
            </span>
            <p className="text-amber-100/90 leading-relaxed text-xs sm:text-sm">
              Axoora will <strong>NEVER</strong> ask for your PIN, OTP, BVN, or account password on this website, and our team will <strong>NEVER call you</strong> to ask for your PIN. If anyone contacts you requesting credentials, do not comply. Report immediately to{' '}
              <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="underline font-semibold text-amber-200 hover:text-white">
                {COMPANY_INFO.supportEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Controls Bar: Filters, View Mode & Bulk Expanders */}
      <section className="px-4 sm:px-8 max-w-4xl mx-auto pt-2 pb-4">
        {/* Category Filters with Dynamic Count Badges */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_ORDER.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0D95FE] text-[#00325b] shadow-sm font-bold'
                      : 'bg-[#0A1B3D] text-[#A8BBD6] hover:text-[#F2F5F9] border border-[#14294F] hover:border-[#1E3A6B]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-[#00325b]/20 text-[#00325b] font-bold'
                        : 'bg-[#14294F] text-[#A8BBD6]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Second Row: View Mode Toggle & Expand/Collapse All Buttons */}
        <div className="p-3 rounded-2xl bg-[#0A1B3D]/80 border border-[#14294F] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Results Count & Active Filter Indicator */}
          <div className="flex items-center gap-2 text-[#A8BBD6]">
            <span className="font-mono text-xs font-semibold text-[#F2F5F9]">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
            </span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#14294F] text-[#A8BBD6] text-[11px]">
                in {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-white"
                  title="Remove category filter"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0D95FE]/20 text-[#6FBDFE] text-[11px]">
                matching "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-white"
                  title="Clear search query"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
              </span>
            )}
          </div>

          {/* Right: Interactive Display & Bulk Accordion Actions */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {/* View Mode Switcher: Grouped vs Flat List */}
            <div className="flex items-center bg-[#01091C] p-0.5 rounded-lg border border-[#14294F]">
              <button
                type="button"
                onClick={() => setViewMode('grouped')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-[#14294F] text-[#F2F5F9] shadow-xs'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
                title="Group FAQs under category headings"
              >
                <span className="material-symbols-outlined text-[14px]">view_agenda</span>
                <span>Grouped</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#14294F] text-[#F2F5F9] shadow-xs'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                }`}
                title="View all FAQs as a clean single list"
              >
                <span className="material-symbols-outlined text-[14px]">list</span>
                <span>Compact List</span>
              </button>
            </div>

            {/* Single-Open Accordion Toggle */}
            <button
              type="button"
              onClick={() => setSingleOpenMode(!singleOpenMode)}
              className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                singleOpenMode
                  ? 'bg-[#00DF8F]/20 border-[#00DF8F]/40 text-[#00DF8F] font-semibold'
                  : 'bg-[#01091C] border-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
              title="When enabled, opening a question closes all others"
            >
              <span className="material-symbols-outlined text-[14px]">
                {singleOpenMode ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
              <span>1-at-a-time</span>
            </button>

            {/* Expand / Collapse All Toggle */}
            <button
              type="button"
              onClick={allAreExpanded ? handleCollapseAll : handleExpandAll}
              className="px-3 py-1 rounded-lg bg-[#01091C] hover:bg-[#14294F] border border-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {allAreExpanded ? 'unfold_less' : 'unfold_more'}
              </span>
              <span>{allAreExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List / Groups */}
      <section className="px-4 sm:px-8 py-6 max-w-4xl mx-auto min-h-[350px]">
        {filteredFaqs.length === 0 ? (
          /* Empty State */
          <div className="p-12 rounded-3xl bg-[#0A1B3D]/50 border-2 border-dashed border-[#14294F] text-center flex flex-col items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#14294F] flex items-center justify-center text-[#A8BBD6]">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F2F5F9]">No questions matched your search</h3>
              <p className="text-xs sm:text-sm text-[#A8BBD6] mt-1 max-w-md">
                We couldn't find an answer for "{searchQuery}". Try a different keyword, or ask our team directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-xs font-semibold text-[#F2F5F9] transition-colors"
              >
                Clear Search & Filters
              </button>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="px-4 py-2 rounded-full bg-[#00DF8F] text-[#003825] hover:bg-[#0D95FE] hover:text-[#00325b] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Ask Axoora AI on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grouped' && selectedCategory === 'All' ? (
          /* Grouped by Category Mode */
          <div className="flex flex-col gap-10">
            {CATEGORY_ORDER.filter((cat) => cat !== 'All' && groupedFaqs[cat]?.length).map(
              (categoryName) => {
                const items = groupedFaqs[categoryName] || [];
                const meta = getCategoryMeta(categoryName);
                const categoryIds = items.map((f) => f.id || f.question);
                const isAllCategoryOpen = categoryIds.every((id) => openIds.has(id));

                return (
                  <div key={categoryName} className="flex flex-col gap-3">
                    {/* Category Header Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#01091C]/80 border border-[#14294F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl flex items-center justify-center border ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {meta.icon}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base sm:text-lg font-bold text-[#F2F5F9]">
                              {categoryName}
                            </h2>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#14294F] text-[#A8BBD6] border border-[#14294F]">
                              {items.length} {items.length === 1 ? 'topic' : 'topics'}
                            </span>
                          </div>
                          <p className="text-xs text-[#A8BBD6] mt-0.5">
                            {CATEGORY_DESCRIPTIONS[categoryName] || ''}
                          </p>
                        </div>
                      </div>

                      {/* Category Bulk Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleCategoryGroup(categoryName)}
                        className="text-xs text-[#0D95FE] hover:text-[#6FBDFE] font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isAllCategoryOpen ? 'unfold_less' : 'unfold_more'}
                        </span>
                        <span>{isAllCategoryOpen ? 'Collapse Group' : 'Expand Group'}</span>
                      </button>
                    </div>

                    {/* Accordions for this category */}
                    <div className="flex flex-col gap-2.5">
                      {items.map((item) => {
                        const itemId = item.id || item.question;
                        const isOpen = openIds.has(itemId);
                        return (
                          <FaqAccordionItem
                            key={itemId}
                            item={item}
                            isOpen={isOpen}
                            onToggle={() => handleToggleItem(itemId)}
                            searchQuery={searchQuery}
                            onOpenWhatsApp={onOpenWhatsApp}
                            onNavigate={onNavigate}
                            onOpenWaitlist={onOpenWaitlist}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          /* Flat / Compact List Mode (or when a single category is selected) */
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((item) => {
              const itemId = item.id || item.question;
              const isOpen = openIds.has(itemId);
              return (
                <FaqAccordionItem
                  key={itemId}
                  item={item}
                  isOpen={isOpen}
                  onToggle={() => handleToggleItem(itemId)}
                  searchQuery={searchQuery}
                  onOpenWhatsApp={onOpenWhatsApp}
                  onNavigate={onNavigate}
                  onOpenWaitlist={onOpenWaitlist}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Still Stuck? Direct Support Channels */}
      <section className="px-4 sm:px-8 pt-4 pb-20 max-w-4xl mx-auto">
        <div className="p-8 rounded-3xl bg-[#01091C] border-2 border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#14294F] text-[#00DF8F] font-mono text-[11px] mb-2 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]"></span>
              LIVE NIGERIAN SUPPORT
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#F2F5F9]">Still have questions?</h4>
            <p className="text-xs sm:text-sm text-[#A8BBD6] mt-1.5 max-w-lg leading-relaxed">
              Reach our human support team directly on WhatsApp or by email. Your problem will have a real person's name on our side — no bot loops.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#00DF8F] text-[#003825] font-bold text-xs sm:text-sm hover:bg-[#0D95FE] hover:text-[#00325b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Banking Desk</span>
            </button>
            <a
              href={`mailto:${COMPANY_INFO.supportEmail}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-xs sm:text-sm font-semibold text-[#F2F5F9] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
