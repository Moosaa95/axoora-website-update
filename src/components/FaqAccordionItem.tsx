import React, { useState } from 'react';
import { FaqItem, ScreenType } from '../types';

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  searchQuery?: string;
  onOpenWhatsApp?: () => void;
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist?: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
}

export const getCategoryMeta = (category: string) => {
  switch (category) {
    case 'Security':
      return {
        icon: 'verified_user',
        badgeBg: 'bg-emerald-950/60',
        badgeText: 'text-[#00DF8F]',
        badgeBorder: 'border-[#00DF8F]/30',
        accentBorder: 'border-l-[#00DF8F]',
      };
    case 'Personal & Cards':
      return {
        icon: 'credit_card',
        badgeBg: 'bg-blue-950/60',
        badgeText: 'text-[#0D95FE]',
        badgeBorder: 'border-[#0D95FE]/30',
        accentBorder: 'border-l-[#0D95FE]',
      };
    case 'Save and Earn':
      return {
        icon: 'savings',
        badgeBg: 'bg-teal-950/60',
        badgeText: 'text-[#34C08D]',
        badgeBorder: 'border-[#34C08D]/30',
        accentBorder: 'border-l-[#34C08D]',
      };
    case 'Paycircle':
      return {
        icon: 'diversity_3',
        badgeBg: 'bg-purple-950/60',
        badgeText: 'text-purple-300',
        badgeBorder: 'border-purple-500/30',
        accentBorder: 'border-l-purple-400',
      };
    case 'Business & POS':
      return {
        icon: 'point_of_sale',
        badgeBg: 'bg-amber-950/60',
        badgeText: 'text-[#F2A93B]',
        badgeBorder: 'border-[#F2A93B]/30',
        accentBorder: 'border-l-[#F2A93B]',
      };
    case 'General':
    default:
      return {
        icon: 'info',
        badgeBg: 'bg-[#14294F]/70',
        badgeText: 'text-[#A8BBD6]',
        badgeBorder: 'border-[#14294F]',
        accentBorder: 'border-l-[#0D95FE]',
      };
  }
};

// Helper to highlight matching search query text
const HighlightText: React.FC<{ text: string; query?: string }> = ({ text, query }) => {
  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark
            key={i}
            className="bg-[#0D95FE]/30 text-[#00DF8F] font-semibold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  searchQuery,
  onOpenWhatsApp,
  onNavigate,
  onOpenWaitlist,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const meta = getCategoryMeta(item.category);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Q: ${item.question}\nA: ${item.answer}\nSource: Axoora Help Centre (https://wa.me/2349110002966)`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleFeedback = (e: React.MouseEvent, type: 'yes' | 'no') => {
    e.stopPropagation();
    setFeedback(type);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.actionLink) return;

    if (item.actionLink.action === 'whatsapp' && onOpenWhatsApp) {
      onOpenWhatsApp();
    } else if (item.actionLink.action === 'waitlist' && onOpenWaitlist) {
      onOpenWaitlist(item.actionLink.interest || 'personal');
    } else if (item.actionLink.action === 'navigate' && item.actionLink.screen && onNavigate) {
      onNavigate(item.actionLink.screen);
    } else if (item.actionLink.action === 'email') {
      window.location.href = 'mailto:support@axoora.ai?subject=Inquiry from Axoora Help Centre';
    }
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-200 border-2 overflow-hidden ${
        isOpen
          ? `bg-[#0A1B3D] border-[#0D95FE]/50 shadow-lg shadow-[#020F2E]/60 border-l-4 ${meta.accentBorder}`
          : 'bg-[#0A1B3D]/70 hover:bg-[#0A1B3D] border-[#14294F] hover:border-[#1E3A6B]'
      }`}
    >
      {/* Header Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D95FE] transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Category Chip */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border shrink-0 w-fit ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
          >
            <span className="material-symbols-outlined text-[13px]">{meta.icon}</span>
            <span>{item.category}</span>
          </span>

          {/* Question Text */}
          <h3
            className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
              isOpen ? 'text-[#F2F5F9]' : 'text-[#F2F5F9]/90 hover:text-[#F2F5F9]'
            }`}
          >
            <HighlightText text={item.question} query={searchQuery} />
          </h3>
        </div>

        {/* Animated Chevron Indicator */}
        <div
          className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-[#0D95FE] text-[#00325b] rotate-180 shadow-sm'
              : 'bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
          }`}
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-[20px]">expand_more</span>
        </div>
      </button>

      {/* Accordion Content with CSS Grid transition for zero-jank animation */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#14294F]/80">
            {/* Answer Body */}
            <div className="pt-3 text-sm sm:text-[15px] text-[#A8BBD6] leading-relaxed">
              <HighlightText text={item.answer} query={searchQuery} />
            </div>

            {/* Tags if available */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-[#14294F]/40">
                <span className="text-[11px] font-mono text-[#A8BBD6]/60 uppercase tracking-wider mr-1">
                  Tags:
                </span>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#01091C]/70 text-[#A8BBD6] border border-[#14294F]/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Utility Bar: Action CTA, Was This Helpful, and Copy */}
            <div className="mt-5 pt-4 border-t border-[#14294F]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Optional Contextual Action Link */}
              {item.actionLink ? (
                <button
                  type="button"
                  onClick={handleActionClick}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14294F] hover:bg-[#0D95FE] text-[#F2F5F9] hover:text-[#00325b] font-semibold transition-all cursor-pointer shadow-sm group"
                >
                  <span>{item.actionLink.label}</span>
                  <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-0.5">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <div />
              )}

              {/* Helpful & Copy Actions */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Was this helpful feedback */}
                <div className="flex items-center gap-1.5 bg-[#01091C]/60 px-2.5 py-1 rounded-full border border-[#14294F]/60">
                  {feedback ? (
                    <span className="text-[11px] text-[#00DF8F] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Thank you!
                    </span>
                  ) : (
                    <>
                      <span className="text-[11px] text-[#A8BBD6]/70 mr-1">Helpful?</span>
                      <button
                        type="button"
                        onClick={(e) => handleFeedback(e, 'yes')}
                        title="Yes, this was helpful"
                        className="p-1 rounded text-[#A8BBD6] hover:text-[#00DF8F] hover:bg-[#14294F] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleFeedback(e, 'no')}
                        title="No, needs improvement"
                        className="p-1 rounded text-[#A8BBD6] hover:text-[#FF6A6A] hover:bg-[#14294F] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">thumb_down</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Copy Answer Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy answer to clipboard"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#01091C]/60 hover:bg-[#14294F] border border-[#14294F]/60 text-[#A8BBD6] hover:text-[#F2F5F9] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span className="text-[11px] font-medium">
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
