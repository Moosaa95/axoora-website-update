'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  CornerDownRight,
  X,
} from 'lucide-react';
import { FaqItem } from '../types';

interface FaqManagementTabProps {
  faqs: FaqItem[];
  onAddFaq: (faq: FaqItem) => void;
  onUpdateFaq: (id: string, patch: Partial<FaqItem>) => void;
  onDeleteFaq: (id: string) => void;
  showToast: (msg: string) => void;
}

const FAQ_CATEGORIES = [
  'All',
  'General',
  'Business & Payouts',
  'Personal & Cards',
  'Savings & Ajo',
  'Security & Compliance',
  'POS & Terminals',
];

export const FaqManagementTab: React.FC<FaqManagementTabProps> = ({
  faqs,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Edit / Create Modal state
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Delete Confirm modal
  const [faqToDelete, setFaqToDelete] = useState<FaqItem | null>(null);

  // Filtered FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchCategory =
      selectedCategory === 'All' ||
      faq.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      !searchQuery.trim() ||
      faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeCount = faqs.filter((f) => f.isActive !== false).length;

  const handleOpenAddModal = () => {
    setIsNewFaq(true);
    setEditingFaq({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      category: selectedCategory !== 'All' ? (selectedCategory as any) : 'General',
      order: faqs.length + 1,
      isActive: true,
    });
  };

  const handleOpenEditModal = (faq: FaqItem) => {
    setIsNewFaq(false);
    setEditingFaq({ ...faq });
  };

  const handleSaveFaq = async () => {
    if (!editingFaq) return;
    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      alert('Please provide both an FAQ question and an answer.');
      return;
    }

    setIsSaving(true);
    try {
      if (isNewFaq) {
        onAddFaq({
          ...editingFaq,
          question: editingFaq.question.trim(),
          answer: editingFaq.answer.trim(),
        });
        showToast('Created new FAQ item successfully');
      } else {
        const id = editingFaq.id || editingFaq.question;
        onUpdateFaq(id, {
          question: editingFaq.question.trim(),
          answer: editingFaq.answer.trim(),
          category: editingFaq.category,
          order: editingFaq.order,
          isActive: editingFaq.isActive,
        });
        showToast('Updated FAQ item successfully');
      }
      setEditingFaq(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!faqToDelete) return;
    const id = faqToDelete.id || faqToDelete.question;
    onDeleteFaq(id);
    showToast(`Deleted FAQ: "${faqToDelete.question.substring(0, 30)}..."`);
    setFaqToDelete(null);
  };

  const handleToggleActive = (faq: FaqItem) => {
    const id = faq.id || faq.question;
    const nextState = faq.isActive === false ? true : false;
    onUpdateFaq(id, { isActive: nextState });
    showToast(nextState ? 'FAQ set to Active' : 'FAQ hidden from website');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Stats Banner */}
      <div className="bg-[#071739] border border-[#162C5B] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#043e97]/20 text-[#53a8f5] flex items-center justify-center border border-[#162C5B]">
              <HelpCircle className="w-4 h-4 text-[#53a8f5]" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Resolution Desk &amp; Website FAQs</h2>
          </div>
          <p className="text-xs text-[#8492a6]">
            Configure questions, answers, and categories that populate customer accordion drawers across Business, Personal, POS and Help desk.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#020F2E] px-3 py-1.5 rounded-xl border border-[#162C5B] text-xs">
            <span className="text-[#8492a6]">Active:</span>
            <span className="text-emerald-400 font-bold">{activeCount} / {faqs.length}</span>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#043e97] text-white font-bold shadow-sm'
                    : 'bg-[#071739] text-[#8492a6] hover:text-white border border-[#162C5B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8492a6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by keywords..."
            className="w-full pl-9 pr-3 py-2 bg-[#071739] border border-[#162C5B] rounded-xl text-xs text-white placeholder-[#8492a6] focus:outline-none focus:border-[#0976da]"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#071739] border border-[#162C5B] flex flex-col items-center gap-3">
            <HelpCircle className="w-10 h-10 text-[#8492a6]/40" />
            <p className="text-sm font-bold text-white">No FAQ items match your filter</p>
            <p className="text-xs text-[#8492a6]">Click &quot;Add New FAQ&quot; or switch category.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const faqId = faq.id || `faq-item-${index}`;
            const isExpanded = expandedFaqId === faqId;
            const isActive = faq.isActive !== false;

            return (
              <div
                key={faqId}
                className={`bg-[#071739] border rounded-2xl transition-colors ${
                  isActive ? 'border-[#162C5B]' : 'border-[#162C5B]/40 opacity-70'
                }`}
              >
                {/* FAQ Header Row */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    <span className="text-[11px] text-[#8492a6] px-2 py-0.5 rounded bg-[#020F2E] border border-[#162C5B] shrink-0 font-medium">
                      #{faq.order || index + 1}
                    </span>

                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#043e97]/20 border border-[#162C5B] text-[#53a8f5]">
                          {faq.category}
                        </span>

                        {!isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 border border-amber-500/30 text-amber-400">
                            Hidden / Inactive
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setExpandedFaqId(isExpanded ? null : faqId)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#020F2E] hover:bg-[#162C5B] text-xs text-[#8492a6] hover:text-white border border-[#162C5B] cursor-pointer flex items-center gap-1 transition-colors"
                      title={isExpanded ? 'Collapse answer preview' : 'Expand answer preview'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden md:inline">{isExpanded ? 'Hide' : 'Preview'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(faq)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                      title={isActive ? 'Click to hide from website' : 'Click to make active on website'}
                    >
                      {isActive ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden md:inline">{isActive ? 'Active' : 'Hidden'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(faq)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#043e97]/20 hover:bg-[#043e97]/40 text-xs font-semibold text-[#53a8f5] border border-[#162C5B] cursor-pointer flex items-center gap-1 transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFaqToDelete(faq)}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 border border-red-500/30 cursor-pointer flex items-center gap-1 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Collapsible Answer Preview */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#162C5B] px-4 py-3 bg-[#020F2E]/60 rounded-b-2xl overflow-hidden"
                    >
                      <div className="flex items-start gap-2">
                        <CornerDownRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-[#CAD5E8] leading-relaxed whitespace-pre-line flex-1">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT FAQ */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingFaq && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditingFaq(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl bg-[#071739] border border-[#162C5B] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#162C5B]">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#53a8f5]" />
                  <h3 className="text-base font-bold text-white">
                    {isNewFaq ? 'Create New FAQ Item' : 'Edit FAQ Item'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="text-[#8492a6] hover:text-white p-1 rounded-lg hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Question */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#8492a6]">Question *</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  placeholder="e.g. How fast do money transfers settle across Nigerian banks?"
                  className="px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#162C5B] text-sm font-semibold text-white focus:outline-none focus:border-[#0976da]"
                />
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#8492a6]">Category</label>
                  <select
                    value={editingFaq.category}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, category: e.target.value as any })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#162C5B] text-xs text-white focus:border-[#0976da]"
                  >
                    <option value="General">General</option>
                    <option value="Business & Payouts">Business & Payouts</option>
                    <option value="Personal & Cards">Personal & Cards</option>
                    <option value="Savings & Ajo">Savings & Ajo</option>
                    <option value="Security & Compliance">Security & Compliance</option>
                    <option value="POS & Terminals">POS & Terminals</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#8492a6]">Display Priority (Order Weight)</label>
                  <input
                    type="number"
                    value={editingFaq.order ?? 0}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, order: parseInt(e.target.value, 10) || 0 })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#162C5B] text-xs text-white focus:border-[#0976da]"
                  />
                </div>
              </div>

              {/* Answer */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#8492a6]">Answer Content *</label>
                <textarea
                  rows={4}
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  placeholder="Clear, authoritative explanation written for Nigerian business and consumer customers..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#162C5B] text-xs text-white leading-relaxed focus:outline-none focus:border-[#0976da]"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faq-active-check"
                  checked={editingFaq.isActive !== false}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, isActive: e.target.checked })
                  }
                  className="rounded border-[#162C5B] text-[#043e97] focus:ring-[#043e97] cursor-pointer"
                />
                <label htmlFor="faq-active-check" className="text-xs text-white cursor-pointer select-none">
                  Published and actively displayed on website accordions
                </label>
              </div>

              {/* Live Accordion Preview inside modal */}
              {editingFaq.question && (
                <div className="p-3 rounded-xl bg-[#020F2E] border border-[#162C5B] flex flex-col gap-1.5 mt-1">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
                    WYSIWYG Accordion Preview
                  </div>
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{editingFaq.question}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#53a8f5]" />
                  </div>
                  {editingFaq.answer && (
                    <div className="text-[11px] text-[#CAD5E8] leading-relaxed pt-1 border-t border-[#162C5B]/60">
                      {editingFaq.answer}
                    </div>
                  )}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#162C5B]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8492a6] hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveFaq}
                  className="px-4 py-2 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl shadow cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isSaving ? 'Saving...' : isNewFaq ? 'Create FAQ' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {faqToDelete && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setFaqToDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-[#071739] border border-[#162C5B] p-6 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-white">Delete FAQ Item?</h3>
                  <p className="text-xs text-[#8492a6] mt-0.5">
                    This will permanently remove this question from all website accordions.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#162C5B] text-xs font-semibold text-white">
                &quot;{faqToDelete.question}&quot;
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#162C5B]">
                <button
                  type="button"
                  onClick={() => setFaqToDelete(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8492a6] hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-colors"
                >
                  Delete FAQ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

