'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useCms,
  AdminMerchantItem,
  AdminProductItem,
} from '../context/CmsContext';
import { AxooraLogo } from './AxooraLogo';
import { WaitlistDataTable } from './WaitlistDataTable';
import { TeamManagementTab } from './TeamManagementTab';
import { LiveChatAdminTab } from './LiveChatAdminTab';
import { FaqManagementTab } from './FaqManagementTab';
import { WysiwygArticleEditor } from './WysiwygArticleEditor';
import { ConfirmModal } from './ConfirmModal';
import { AdminCardsSkeleton } from './AdminSkeleton';
import { teamAuth, contentApi, type LoginResponse } from '../lib/teamApi';
import { JournalArticle } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutThunk } from '../store/slices/authSlice';
import {
  fetchBackendArticlesThunk,
  fetchBackendCmsThunk,
} from '../store/slices/contentSlice';
import { fetchBackendLeadsThunk } from '../store/slices/waitlistSlice';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

export type AdminTab =
  | 'overview'
  | 'hero'
  | 'get-started'
  | 'merchants'
  | 'products'
  | 'journal'
  | 'leads'
  | 'chat'
  | 'team'
  | 'faqs';

const PRESET_MERCHANT_PHOTOS = [
  { label: 'Fatima (Abuja)', url: '/merchants/fatima.jpg' },
  { label: 'Emeka (Lagos)', url: '/merchants/emeka.jpg' },
  { label: 'Bilkisu (Kano)', url: '/merchants/bilkisu.jpg' },
  { label: 'Tunde (Lekki)', url: '/merchants/tunde.jpg' },
  { label: 'Amina (Ikeja)', url: '/merchants/shopper.jpg' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const {
    hero,
    updateHero,
    steps,
    updateStep,
    resetSteps,
    merchants,
    addMerchant,
    updateMerchant,
    deleteMerchant,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    leads,
    updateLeadStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetAllCmsData,
  } = useCms();

  const [activeTab, setActiveTabState] = useState<AdminTab>(() => {
    if (typeof window !== 'undefined') {
      const urlTab = new URLSearchParams(window.location.search).get('tab') as AdminTab | null;
      const validTabs: AdminTab[] = [
        'overview',
        'hero',
        'get-started',
        'merchants',
        'products',
        'journal',
        'leads',
        'chat',
        'team',
        'faqs',
      ];
      if (urlTab && validTabs.includes(urlTab)) return urlTab;
      const savedTab = localStorage.getItem('axoora_admin_active_tab') as AdminTab | null;
      if (savedTab && validTabs.includes(savedTab)) return savedTab;
    }
    return 'overview';
  });

  const setActiveTab = (tab: AdminTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('axoora_admin_active_tab', tab);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.replaceState(null, '', url.toString());
      } catch {}
    }
  };
  const [isSyncing, setIsSyncing] = useState(false);
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.auth.user);
  const contentLoading = useAppSelector((state) => state.content.loading);
  const [sessionUser, setSessionUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    if (!reduxUser) {
      teamAuth.me().then(setSessionUser).catch(() => setSessionUser(null));
    }
  }, [reduxUser]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Confirm Modal State (replaces all browser window.confirm / alert)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: 'danger' | 'primary' | 'warning';
    isAlertOnly?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Hero draft state for smooth editing + instant live sync
  const [heroDraft, setHeroDraft] = useState(hero);
  useEffect(() => {
    setHeroDraft(hero);
  }, [hero]);

  // 4-Step Get Started state
  const [selectedStepNum, setSelectedStepNum] = useState<number>(1);
  const selectedStep = steps.find((s) => s.num === selectedStepNum) || steps[0];

  // Merchant Modal state
  const [editingMerchant, setEditingMerchant] = useState<AdminMerchantItem | null>(null);
  const [isNewMerchant, setIsNewMerchant] = useState(false);

  // Product Modal state
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Article Modal state
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<string>('all');
  const [articleSearch, setArticleSearch] = useState<string>('');
  const [isSavingArticle, setIsSavingArticle] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    await Promise.allSettled([
      dispatch(fetchBackendCmsThunk()),
      dispatch(fetchBackendLeadsThunk()),
    ]);
    setIsSyncing(false);
    showToast('Synced latest content & leads with backend API');
  };

  const handleSaveHero = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateHero(heroDraft);
    showToast('Hero & Announcement banner published to live website!');
  };

  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: string;
    badge: string | null;
    reflectsOn: string;
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'space_dashboard',
      badge: null,
      reflectsOn: 'All live metrics & quick actions',
    },
    {
      id: 'hero',
      label: 'Hero & Banner',
      icon: 'campaign',
      badge: hero.announcementActive ? 'Live' : 'Off',
      reflectsOn: 'Home (/), Business (/business) & Personal (/personal)',
    },
    {
      id: 'get-started',
      label: '4-Step Onboarding',
      icon: 'route',
      badge: '4 Steps',
      reflectsOn: 'Interactive phone walkthrough on Home, Business & Personal',
    },
    {
      id: 'merchants',
      label: 'Merchant Stories',
      icon: 'storefront',
      badge: `${merchants.length}`,
      reflectsOn: 'Home, Business testimonials & Stories (/stories)',
    },
    {
      id: 'products',
      label: 'Products & Fees',
      icon: 'point_of_sale',
      badge: `${products.length}`,
      reflectsOn: 'Homepage Product Suite & Fee Schedule',
    },
    {
      id: 'journal',
      label: 'Articles & Press',
      icon: 'article',
      badge: `${articles.length}`,
      reflectsOn: 'Journal (/journal), Press (/press) & Blog Carousels',
    },
    {
      id: 'leads',
      label: 'Waitlist & Leads',
      icon: 'contacts',
      badge: `${leads.length}`,
      reflectsOn: 'Apply (/apply), Waitlist Modal & Track (/track)',
    },
    {
      id: 'faqs',
      label: 'FAQs & Help',
      icon: 'help_center',
      badge: `${faqs.length}`,
      reflectsOn: 'Help Desk (/help), Product Page Accordions & WhatsApp FAQs',
    },
    {
      id: 'chat',
      label: 'Live Chat Desk',
      icon: 'support_agent',
      badge: 'Live',
      reflectsOn: 'Floating AI Concierge & Human Escalation Widget',
    },
    {
      id: 'team',
      label: 'Team & Access',
      icon: 'manage_accounts',
      badge: 'RBAC',
      reflectsOn: 'Admin Console roles & staff permissions',
    },
  ];

  const activeNavMeta = navItems.find((n) => n.id === activeTab) || navItems[0];

  return (
    <div className="min-h-screen bg-[#020B1D] text-[#F2F5F9] flex flex-col font-sans selection:bg-[#0D95FE]/30">
      {/* Smooth Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 right-5 z-[90] bg-[#07193E] border border-[#00DF8F]/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#020B1D]/95 backdrop-blur-md border-b border-[#14294F] px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <AxooraLogo />
          <div className="h-4 w-px bg-[#14294F] hidden sm:block" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00DF8F] bg-[#00DF8F]/10 px-2.5 py-1 rounded-full border border-[#00DF8F]/25 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
            <span>Live Admin</span>
          </span>
          <span className="hidden lg:inline text-xs text-[#7B9CD2] truncate">
            {activeNavMeta.reflectsOn}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="px-3 py-1.5 rounded-xl bg-[#071635] hover:bg-[#0D214F] border border-[#14294F] text-xs font-semibold text-[#A8BBD6] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Sync with Django Backend"
          >
            <span
              className={`material-symbols-outlined text-[16px] text-[#0D95FE] ${
                isSyncing ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span className="hidden sm:inline">{isSyncing ? 'Syncing…' : 'Sync API'}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setConfirmModal({
                isOpen: true,
                title: 'Reset All CMS Customizations?',
                message:
                  'This will restore Hero copy, 4-Step Onboarding, Merchant Stories, Products, and Articles back to their default state.',
                confirmLabel: 'Reset to Defaults',
                variant: 'warning',
                onConfirm: () => {
                  resetAllCmsData();
                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                  showToast('All website content restored to factory defaults!');
                },
              })
            }
            className="px-3 py-1.5 text-xs font-semibold text-[#A8BBD6] hover:text-amber-400 border border-[#14294F] hover:border-amber-400/40 rounded-xl transition-colors cursor-pointer hidden md:inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onExitAdmin}
            className="px-4 py-2 bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-bold text-xs rounded-xl shadow-lg shadow-[#0D95FE]/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>View Live Site</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Navigation Bar */}
      <div className="lg:hidden bg-[#030E26] border-b border-[#14294F] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#0D95FE] text-white shadow-sm'
                  : 'text-[#A8BBD6] hover:bg-[#0A1B3D] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-[#030E26] border-r border-[#14294F] flex-col justify-between shrink-0">
          <nav className="p-3 flex flex-col gap-1">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0D95FE] text-white font-bold shadow-md shadow-[#0D95FE]/20'
                      : 'text-[#A8BBD6] hover:bg-[#0A1B3D] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-[#0A1B3D] text-[#7B9CD2] border border-[#14294F]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Signed-in Admin Card */}
          {(() => {
            const profile = reduxUser || sessionUser?.user;
            const displayName = profile?.full_name || 'Super Admin';
            const roleName = profile?.role?.name || 'Administrator';
            const initials =
              displayName
                .split(' ')
                .map((p: string) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase() || 'SA';
            return (
              <div className="p-3 m-3 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] flex items-center justify-center font-bold text-xs text-[#00284D] shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">{displayName}</span>
                    <span className="text-[10px] text-[#00DF8F] font-mono truncate">{roleName}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await dispatch(logoutThunk())
                      .unwrap()
                      .catch(() => {});
                    window.location.href = '/admin/login';
                  }}
                  className="w-full py-1.5 rounded-xl text-[11px] font-semibold text-[#7B9CD2] hover:text-red-400 border border-[#14294F] hover:border-red-400/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            );
          })()}
        </aside>

        {/* Active Section Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#020B1D]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              className="max-w-6xl mx-auto"
            >
              {/* ========================================================= */}
              {/* 1. OVERVIEW */}
              {/* ========================================================= */}
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        SIMPLE WEBSITE CONTROL CENTER
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        What would you like to update today?
                      </h1>
                    </div>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        tab: 'hero' as AdminTab,
                        icon: 'campaign',
                        title: 'Hero & Top Banner',
                        desc: 'Edit headlines, subheadlines, CTAs, and the top announcement bar across Home, Business & Personal.',
                        stat: hero.announcementActive ? 'Banner Active' : 'Banner Hidden',
                        color: '#0D95FE',
                      },
                      {
                        tab: 'get-started' as AdminTab,
                        icon: 'route',
                        title: '4-Step Onboarding',
                        desc: 'Customize the 4 interactive phone onboarding steps and customer quotes.',
                        stat: '4 Interactive Steps',
                        color: '#00DF8F',
                      },
                      {
                        tab: 'merchants' as AdminTab,
                        icon: 'storefront',
                        title: 'Merchant Stories',
                        desc: 'Add or edit verified Nigerian merchant stories shown on Home, Business & /stories.',
                        stat: `${merchants.length} Stories Live`,
                        color: '#F2A93B',
                      },
                      {
                        tab: 'products' as AdminTab,
                        icon: 'point_of_sale',
                        title: 'Products & POS Fees',
                        desc: 'Manage Personal, Business, Apex POS, and Halal Capital cards & pricing.',
                        stat: `${products.length} Products`,
                        color: '#0D95FE',
                      },
                      {
                        tab: 'journal' as AdminTab,
                        icon: 'article',
                        title: 'Articles & Press',
                        desc: 'Publish engineering notes, press releases, and guides to /journal and /press.',
                        stat: `${articles.length} Published`,
                        color: '#00DF8F',
                      },
                      {
                        tab: 'leads' as AdminTab,
                        icon: 'contacts',
                        title: 'Waitlist & POS Leads',
                        desc: 'Review applications from /apply, update approval status, and export CSV.',
                        stat: `${leads.length} Total Leads`,
                        color: '#A78BFA',
                      },
                      {
                        tab: 'faqs' as AdminTab,
                        icon: 'help_center',
                        title: 'Resolution Desk FAQs',
                        desc: 'Edit questions & answers for website accordion drawers across all products.',
                        stat: `${faqs.length} FAQs Live`,
                        color: '#38BDF8',
                      },
                    ].map((card) => (
                      <button
                        key={card.tab}
                        type="button"
                        onClick={() => setActiveTab(card.tab)}
                        className="p-5 rounded-2xl bg-[#05112A] hover:bg-[#081A3E] border border-[#14294F] hover:border-[#0D95FE]/60 text-left flex flex-col justify-between gap-4 transition-all cursor-pointer group shadow-lg"
                      >
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center justify-between">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${card.color}20`, color: card.color }}
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {card.icon}
                              </span>
                            </div>
                            <span
                              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/10"
                              style={{ color: card.color }}
                            >
                              {card.stat}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#0D95FE] transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-xs text-[#A8BBD6] leading-relaxed">{card.desc}</p>
                        </div>

                        <div className="text-xs font-bold text-[#0D95FE] flex items-center gap-1">
                          <span>Manage {card.title}</span>
                          <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Recent Waitlist Applications Preview */}
                  <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white">Recent Onboarding Leads</h3>
                        <p className="text-xs text-[#7B9CD2]">
                          Synced with /apply, Waitlist Modal, and /track
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] hover:bg-[#14294F] text-xs font-bold text-[#0D95FE] cursor-pointer transition-colors"
                      >
                        Open Full Table →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#14294F] text-[#7B9CD2] font-mono uppercase text-[10px]">
                            <th className="py-2 px-3">Applicant</th>
                            <th className="py-2 px-3">WhatsApp</th>
                            <th className="py-2 px-3">Interest</th>
                            <th className="py-2 px-3">Location</th>
                            <th className="py-2 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#14294F]/50">
                          {leads.slice(0, 5).map((lead) => (
                            <tr key={lead.id} className="hover:bg-[#0A1B3D]/40">
                              <td className="py-2.5 px-3 font-semibold text-white">
                                {lead.fullName}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-[#A8BBD6]">
                                {lead.whatsappNumber}
                              </td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded bg-[#0D95FE]/15 text-[#0D95FE] font-mono text-[10px] uppercase font-bold">
                                  {lead.interest}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-[#A8BBD6]">{lead.city || '—'}</td>
                              <td className="py-2.5 px-3">
                                <select
                                  value={lead.status}
                                  onChange={(e) => {
                                    updateLeadStatus(lead.id, e.target.value as any);
                                    showToast(
                                      `Updated ${lead.fullName} status to ${e.target.value}`
                                    );
                                  }}
                                  className="px-2 py-1 rounded-lg bg-[#020B1D] border border-[#14294F] text-xs text-white font-semibold cursor-pointer"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="approved">Approved</option>
                                  <option value="dispatched">Dispatched</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 2. HERO & ANNOUNCEMENTS */}
              {/* ========================================================= */}
              {activeTab === 'hero' && (
                <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        REFLECTS ON HOME (/), BUSINESS (/BUSINESS) &amp; PERSONAL (/PERSONAL)
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        Hero Headlines &amp; Announcement Bar
                      </h1>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-[#00DF8F]/20 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Save &amp; Publish Hero</span>
                      </button>
                    </div>
                  </div>

                  {/* Top Announcement Ticker Card */}
                  <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Top Announcement Bar (Sitewide Header &amp; Home)
                        </h3>
                        <p className="text-xs text-[#7B9CD2]">
                          Toggle visibility and edit the announcement message shown at the top of the site.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !heroDraft.announcementActive;
                          setHeroDraft({ ...heroDraft, announcementActive: next });
                          updateHero({ announcementActive: next });
                          showToast(next ? 'Announcement banner enabled!' : 'Announcement banner hidden.');
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          heroDraft.announcementActive
                            ? 'bg-[#00DF8F] text-[#003825]'
                            : 'bg-[#14294F] text-[#7B9CD2]'
                        }`}
                      >
                        {heroDraft.announcementActive ? '● Active on Site' : '○ Hidden'}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={heroDraft.announcementTicker}
                      onChange={(e) => {
                        setHeroDraft({ ...heroDraft, announcementTicker: e.target.value });
                        updateHero({ announcementTicker: e.target.value });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-sm text-white focus:border-[#0D95FE] outline-none"
                      placeholder="Announcement text..."
                    />
                  </div>

                  {/* Business & Personal Hero Headlines */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                          BUSINESS &amp; POS HERO (/ &amp; /business)
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#A8BBD6]">
                          Main Headline
                        </label>
                        <input
                          type="text"
                          value={heroDraft.headlineBusiness}
                          onChange={(e) => {
                            setHeroDraft({ ...heroDraft, headlineBusiness: e.target.value });
                            updateHero({ headlineBusiness: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-sm font-bold text-white focus:border-[#0D95FE] outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#A8BBD6]">
                          Subheadline Description
                        </label>
                        <textarea
                          rows={3}
                          value={heroDraft.subheadlineBusiness}
                          onChange={(e) => {
                            setHeroDraft({ ...heroDraft, subheadlineBusiness: e.target.value });
                            updateHero({ subheadlineBusiness: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed focus:border-[#0D95FE] outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                          PERSONAL &amp; WHATSAPP HERO (/ &amp; /personal)
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#A8BBD6]">
                          Main Headline
                        </label>
                        <input
                          type="text"
                          value={heroDraft.headlinePersonal}
                          onChange={(e) => {
                            setHeroDraft({ ...heroDraft, headlinePersonal: e.target.value });
                            updateHero({ headlinePersonal: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-sm font-bold text-white focus:border-[#00DF8F] outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#A8BBD6]">
                          Subheadline Description
                        </label>
                        <textarea
                          rows={3}
                          value={heroDraft.subheadlinePersonal}
                          onChange={(e) => {
                            setHeroDraft({ ...heroDraft, subheadlinePersonal: e.target.value });
                            updateHero({ subheadlinePersonal: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed focus:border-[#00DF8F] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons & Trust Line */}
                  <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#A8BBD6]">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={heroDraft.ctaTextPrimary}
                        onChange={(e) => {
                          setHeroDraft({ ...heroDraft, ctaTextPrimary: e.target.value });
                          updateHero({ ctaTextPrimary: e.target.value });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white font-bold focus:border-[#0D95FE] outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#A8BBD6]">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={heroDraft.ctaTextSecondary}
                        onChange={(e) => {
                          setHeroDraft({ ...heroDraft, ctaTextSecondary: e.target.value });
                          updateHero({ ctaTextSecondary: e.target.value });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white font-bold focus:border-[#0D95FE] outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#A8BBD6]">
                        Regulatory Trust Badge Line
                      </label>
                      <input
                        type="text"
                        value={heroDraft.trustLine}
                        onChange={(e) => {
                          setHeroDraft({ ...heroDraft, trustLine: e.target.value });
                          updateHero({ trustLine: e.target.value });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#00DF8F] font-mono focus:border-[#0D95FE] outline-none"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* ========================================================= */}
              {/* 3. 4-STEP ONBOARDING */}
              {/* ========================================================= */}
              {activeTab === 'get-started' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        REFLECTS ON INTERACTIVE PHONE WALKTHROUGH (HOME, BUSINESS &amp; PERSONAL)
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        4-Step Onboarding Walkthrough
                      </h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmModal({
                            isOpen: true,
                            title: 'Reset 4-Step Onboarding?',
                            message:
                              'Restore all 4 onboarding steps and customer quotes back to the original defaults?',
                            confirmLabel: 'Reset 4 Steps',
                            variant: 'warning',
                            onConfirm: () => {
                              resetSteps();
                              setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                              showToast('4-Step Onboarding reset to defaults!');
                            },
                          })
                        }
                        className="px-3.5 py-2 rounded-xl bg-[#05112A] border border-[#14294F] hover:border-amber-400/50 text-xs font-semibold text-[#A8BBD6] hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        Reset Steps
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`Step 0${selectedStep.num} saved & live!`)}
                        className="px-4 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs cursor-pointer shadow-lg"
                      >
                        Save Step 0{selectedStep.num}
                      </button>
                    </div>
                  </div>

                  {/* Step Selector Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {steps.map((s) => {
                      const active = s.num === selectedStepNum;
                      return (
                        <button
                          key={s.num}
                          type="button"
                          onClick={() => setSelectedStepNum(s.num)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-lg'
                              : 'bg-[#05112A] border-[#14294F] hover:border-[#0D95FE]/40'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold block">
                            STEP 0{s.num}
                          </span>
                          <span className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                            {s.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedStep && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#A8BBD6]">Step Tagline</label>
                            <input
                              type="text"
                              value={selectedStep.tag}
                              onChange={(e) =>
                                updateStep(selectedStep.num, { tag: e.target.value })
                              }
                              className="px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#0D95FE] font-mono"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#A8BBD6]">Customer Photo</label>
                            <select
                              value={selectedStep.user.photo}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, photo: e.target.value },
                                })
                              }
                              className="px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                            >
                              {PRESET_MERCHANT_PHOTOS.map((p) => (
                                <option key={p.url} value={p.url}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-[#A8BBD6]">Step Headline</label>
                          <input
                            type="text"
                            value={selectedStep.title}
                            onChange={(e) =>
                              updateStep(selectedStep.num, { title: e.target.value })
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-sm font-bold text-white"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-[#A8BBD6]">Step Description</label>
                          <textarea
                            rows={3}
                            value={selectedStep.desc}
                            onChange={(e) =>
                              updateStep(selectedStep.num, { desc: e.target.value })
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#A8BBD6] leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#14294F]">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#A8BBD6]">Customer Name</label>
                            <input
                              type="text"
                              value={selectedStep.user.name}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, name: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#A8BBD6]">Role / Business</label>
                            <input
                              type="text"
                              value={selectedStep.user.role}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, role: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-[#A8BBD6]">Location</label>
                            <input
                              type="text"
                              value={selectedStep.user.location}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, location: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-[#A8BBD6]">Customer Quote</label>
                          <input
                            type="text"
                            value={selectedStep.user.comment}
                            onChange={(e) =>
                              updateStep(selectedStep.num, {
                                user: { ...selectedStep.user, comment: e.target.value },
                              })
                            }
                            className="px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#00DF8F]"
                          />
                        </div>
                      </div>

                      {/* Live Preview Card */}
                      <div className="lg:col-span-5 p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col justify-between gap-4">
                        <span className="text-[10px] font-mono text-[#00DF8F] uppercase font-bold">
                          LIVE CARD PREVIEW
                        </span>
                        <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#0D95FE] flex flex-col gap-3">
                          <span className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">
                            {selectedStep.tag}
                          </span>
                          <h4 className="text-base font-bold text-white">{selectedStep.title}</h4>
                          <p className="text-xs text-[#A8BBD6] leading-relaxed">
                            {selectedStep.desc}
                          </p>
                          <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] flex items-center gap-2.5">
                            <img
                              src={selectedStep.user.photo}
                              alt={selectedStep.user.name}
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white truncate">
                                {selectedStep.user.name}{' '}
                                <span className="text-[#00DF8F] font-mono text-[10px]">
                                  ({selectedStep.user.location})
                                </span>
                              </div>
                              <div className="text-[11px] text-[#A8BBD6] italic truncate">
                                "{selectedStep.user.comment}"
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#7B9CD2]">
                          Changes reflect immediately on the sticky 4-step section across the site.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* 4. STREET MERCHANTS & STORIES */}
              {/* ========================================================= */}
              {activeTab === 'merchants' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        REFLECTS ON HOME, BUSINESS TESTIMONIALS &amp; /STORIES
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        Street Merchants &amp; Case Studies ({merchants.length})
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewMerchant(true);
                        setEditingMerchant({
                          id: `merch-${Date.now()}`,
                          name: '',
                          role: '',
                          location: 'Lagos',
                          image: '/merchants/bilkisu.jpg',
                          quote: '',
                          statLabel: 'Weekly Volume',
                          statValue: '₦5.0M+',
                          accentColor: '#00DF8F',
                          badge: 'Verified Merchant',
                          featured: true,
                        });
                      }}
                      className="px-4 py-2.5 bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Add Merchant Story</span>
                    </button>
                  </div>

                  {isSyncing || contentLoading ? (
                    <AdminCardsSkeleton count={4} />
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {merchants.map((m) => (
                      <div
                        key={m.id}
                        className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] hover:border-[#0D95FE]/50 flex flex-col justify-between gap-4 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-[#14294F] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5"
                                style={{ color: m.accentColor }}
                              >
                                {m.badge}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#00DF8F]">
                                {m.statLabel}: {m.statValue}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white mt-1">{m.name}</h3>
                            <p className="text-xs text-[#7B9CD2]">
                              {m.role} · {m.location}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#A8BBD6] italic leading-relaxed">
                          "{m.quote}"
                        </p>

                        <div className="pt-3 border-t border-[#14294F] flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsNewMerchant(false);
                              setEditingMerchant(m);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] hover:bg-[#0D95FE] text-xs font-bold text-white cursor-pointer transition-colors"
                          >
                            Edit Story
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmModal({
                                isOpen: true,
                                title: `Delete ${m.name}?`,
                                message: `Remove "${m.name}" from the website merchant stories? This will immediately update Home, Business, and /stories.`,
                                confirmLabel: 'Delete Merchant',
                                variant: 'danger',
                                onConfirm: () => {
                                  deleteMerchant(m.id);
                                  setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                                  showToast(`Deleted merchant story: ${m.name}`);
                                },
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* 5. PRODUCTS & POS FEES */}
              {/* ========================================================= */}
              {activeTab === 'products' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        REFLECTS ON HOMEPAGE PRODUCT SUITE &amp; FEE SCHEDULE
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        Products &amp; POS Catalog ({products.length})
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewProduct(true);
                        setEditingProduct({
                          id: `prod-${Date.now()}`,
                          name: '',
                          category: 'business',
                          headline: '',
                          feeStructure: '₦0 Maintenance Fee',
                          status: 'active',
                          highlight: '',
                          description: '',
                        });
                      }}
                      className="px-4 py-2.5 bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Add Product</span>
                    </button>
                  </div>

                  {isSyncing || contentLoading ? (
                    <AdminCardsSkeleton count={4} />
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] hover:border-[#0D95FE]/50 flex flex-col justify-between gap-4 transition-all"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded bg-[#0D95FE]/15 text-[#0D95FE] text-[10px] font-mono uppercase font-bold">
                              {prod.category}
                            </span>
                            <select
                              value={prod.status}
                              onChange={(e) => {
                                updateProduct(prod.id, { status: e.target.value as any });
                                showToast(`Updated ${prod.name} status to ${e.target.value}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#020B1D] border border-[#14294F] text-[11px] font-mono font-bold text-[#00DF8F] cursor-pointer"
                            >
                              <option value="active">● Active (Live)</option>
                              <option value="beta">◐ Pilot / Beta</option>
                              <option value="coming-soon">○ Coming Soon</option>
                            </select>
                          </div>

                          <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                          <p className="text-xs font-semibold text-[#0D95FE]">{prod.headline}</p>
                          <p className="text-xs text-[#A8BBD6] leading-relaxed">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#14294F] flex items-center justify-between gap-2">
                          <div className="text-xs font-mono text-[#00DF8F] truncate">
                            {prod.feeStructure}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setIsNewProduct(false);
                                setEditingProduct(prod);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] hover:bg-[#0D95FE] text-xs font-bold text-white cursor-pointer transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmModal({
                                  isOpen: true,
                                  title: `Delete "${prod.name}"?`,
                                  message: `Are you sure you want to delete "${prod.name}" from the product catalog?`,
                                  confirmLabel: 'Delete Product',
                                  variant: 'danger',
                                  onConfirm: () => {
                                    deleteProduct(prod.id);
                                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                                    showToast(`Deleted product: ${prod.name}`);
                                  },
                                })
                              }
                              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* 6. ARTICLES & GUIDES */}
              {/* ========================================================= */}
              {activeTab === 'journal' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14294F]">
                    <div>
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        REFLECTS ON /JOURNAL, /PRESS &amp; BLOG CAROUSELS
                      </span>
                      <h1 className="text-2xl font-black text-white mt-0.5">
                        Articles, Press &amp; Guides ({articles.length})
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewArticle(true);
                        setEditingArticle({
                          id: '',
                          title: '',
                          category: 'Engineering',
                          summary: '',
                          content: '',
                          readTime: '4 min read',
                          date: new Date().toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          }),
                          author: 'Axoora Editorial Board',
                        });
                      }}
                      className="px-4 py-2.5 bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">post_add</span>
                      <span>Publish New Article</span>
                    </button>
                  </div>

                  {/* Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        'all',
                        'Engineering',
                        'Product',
                        'Compliance',
                        'Non-Interest Finance',
                        'Company News',
                        'Merchant Stories',
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setArticleCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            articleCategoryFilter === cat
                              ? 'bg-[#0D95FE] text-white font-bold'
                              : 'bg-[#05112A] text-[#A8BBD6] border border-[#14294F] hover:text-white'
                          }`}
                        >
                          {cat === 'all' ? 'All Categories' : cat}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      placeholder="Search articles..."
                      className="px-3.5 py-2 rounded-xl bg-[#05112A] border border-[#14294F] text-xs text-white outline-none focus:border-[#0D95FE]"
                    />
                  </div>

                  {/* Articles List */}
                  {isSyncing || contentLoading ? (
                    <AdminCardsSkeleton count={4} />
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => {
                        const matchesCat =
                          articleCategoryFilter === 'all' || a.category === articleCategoryFilter;
                        const matchesQuery =
                          !articleSearch.trim() ||
                          a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                          a.summary.toLowerCase().includes(articleSearch.toLowerCase());
                        return matchesCat && matchesQuery;
                      })
                      .map((art) => (
                        <div
                          key={art.id}
                          className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] hover:border-[#0D95FE]/50 flex flex-col justify-between gap-4 transition-all"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="px-2.5 py-0.5 rounded bg-[#0D95FE]/15 text-[#0D95FE] font-bold">
                                {art.category}
                              </span>
                              <span className="text-[#7B9CD2]">
                                {art.date} · {art.readTime}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white leading-snug">
                              {art.title}
                            </h3>
                            <p className="text-xs text-[#A8BBD6] line-clamp-2 leading-relaxed">
                              {art.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#14294F] flex items-center justify-between">
                            <span className="text-[11px] text-[#7B9CD2] truncate">
                              {art.author || 'Axoora Editorial Board'}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsNewArticle(false);
                                  setEditingArticle(art);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] hover:bg-[#0D95FE] text-xs font-bold text-white cursor-pointer transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirmModal({
                                    isOpen: true,
                                    title: 'Delete Article?',
                                    message: `Permanently delete "${art.title}" from Journal, Press, and Blog Carousels?`,
                                    confirmLabel: 'Delete Article',
                                    variant: 'danger',
                                    onConfirm: async () => {
                                      setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                                      const slugOrId = (art as any).slug || art.id;
                                      deleteArticle(art.id);
                                      await contentApi.deleteArticle(slugOrId).catch(() => {});
                                      showToast(`Deleted article: "${art.title}"`);
                                    },
                                  })
                                }
                                className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 cursor-pointer transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* 7. WAITLIST & LEADS */}
              {/* ========================================================= */}
              {activeTab === 'leads' && <WaitlistDataTable onShowToast={showToast} />}

              {/* ========================================================= */}
              {/* 8. LIVE CHAT & AI ESCALATION DESK */}
              {/* ========================================================= */}
              {activeTab === 'chat' && <LiveChatAdminTab onShowToast={showToast} />}

              {/* ========================================================= */}
              {/* 9. TEAM & ACCESS */}
              {/* ========================================================= */}
              {activeTab === 'team' && <TeamManagementTab onShowToast={showToast} />}

              {/* ========================================================= */}
              {/* 10. FAQS & RESOLUTION DESK */}
              {/* ========================================================= */}
              {activeTab === 'faqs' && (
                <FaqManagementTab
                  faqs={faqs}
                  onAddFaq={addFaq}
                  onUpdateFaq={updateFaq}
                  onDeleteFaq={deleteFaq}
                  showToast={showToast}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: EDIT / ADD MERCHANT STORY */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingMerchant && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditingMerchant(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#05112A] border border-[#1E3A6B] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                <h3 className="text-base font-bold text-white">
                  {isNewMerchant ? 'Add Merchant Story' : `Edit ${editingMerchant.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingMerchant(null)}
                  className="text-[#7B9CD2] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Merchant Full Name *</label>
                  <input
                    type="text"
                    value={editingMerchant.name}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, name: e.target.value })
                    }
                    placeholder="e.g. Alhaji Musa Danbaba"
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Business / Role *</label>
                  <input
                    type="text"
                    value={editingMerchant.role}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, role: e.target.value })
                    }
                    placeholder="e.g. Wholesale Grain Merchant"
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Market &amp; City</label>
                  <input
                    type="text"
                    value={editingMerchant.location}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, location: e.target.value })
                    }
                    placeholder="e.g. Dawanau Market, Kano"
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Portrait Photo</label>
                  <select
                    value={editingMerchant.image}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, image: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  >
                    {PRESET_MERCHANT_PHOTOS.map((p) => (
                      <option key={p.url} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Badge Label</label>
                  <input
                    type="text"
                    value={editingMerchant.badge}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, badge: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#A8BBD6]">Metric Label</label>
                    <input
                      type="text"
                      value={editingMerchant.statLabel}
                      onChange={(e) =>
                        setEditingMerchant({ ...editingMerchant, statLabel: e.target.value })
                      }
                      className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#A8BBD6]">Metric Value</label>
                    <input
                      type="text"
                      value={editingMerchant.statValue}
                      onChange={(e) =>
                        setEditingMerchant({ ...editingMerchant, statValue: e.target.value })
                      }
                      className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#00DF8F] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Direct Merchant Quote *</label>
                <textarea
                  rows={3}
                  value={editingMerchant.quote}
                  onChange={(e) =>
                    setEditingMerchant({ ...editingMerchant, quote: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#14294F]">
                <button
                  type="button"
                  onClick={() => setEditingMerchant(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A8BBD6] hover:bg-[#0A1B3D] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingMerchant.name.trim() || !editingMerchant.quote.trim()) {
                      setConfirmModal({
                        isOpen: true,
                        title: 'Missing Merchant Info',
                        message: 'Please provide both the merchant name and their quote.',
                        variant: 'warning',
                        isAlertOnly: true,
                        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
                      });
                      return;
                    }
                    if (isNewMerchant) {
                      addMerchant(editingMerchant);
                      showToast(`Added merchant story: ${editingMerchant.name}`);
                    } else {
                      updateMerchant(editingMerchant.id, editingMerchant);
                      showToast(`Updated merchant story: ${editingMerchant.name}`);
                    }
                    setEditingMerchant(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs cursor-pointer shadow-lg"
                >
                  {isNewMerchant ? 'Publish Story' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: EDIT / ADD PRODUCT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditingProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#05112A] border border-[#1E3A6B] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                <h3 className="text-base font-bold text-white">
                  {isNewProduct ? 'Add New Product' : `Edit ${editingProduct.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="text-[#7B9CD2] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Product Name *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as AdminProductItem['category'],
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  >
                    <option value="personal">Personal</option>
                    <option value="business">Business</option>
                    <option value="pos">POS Hardware</option>
                    <option value="capital">Halal Capital</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Fee Structure</label>
                  <input
                    type="text"
                    value={editingProduct.feeStructure}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, feeStructure: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#00DF8F] font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Availability Status</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        status: e.target.value as AdminProductItem['status'],
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  >
                    <option value="active">Active (Live)</option>
                    <option value="beta">Pilot / Beta</option>
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">One-Line Headline *</label>
                <input
                  type="text"
                  value={editingProduct.headline}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, headline: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Key Highlight Badge</label>
                <input
                  type="text"
                  value={editingProduct.highlight}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, highlight: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#14294F]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A8BBD6] hover:bg-[#0A1B3D] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingProduct.name.trim() || !editingProduct.headline.trim()) {
                      setConfirmModal({
                        isOpen: true,
                        title: 'Missing Product Info',
                        message: 'Please provide both a product name and headline.',
                        variant: 'warning',
                        isAlertOnly: true,
                        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
                      });
                      return;
                    }
                    if (isNewProduct) {
                      addProduct(editingProduct);
                      showToast(`Added product: ${editingProduct.name}`);
                    } else {
                      updateProduct(editingProduct.id, editingProduct);
                      showToast(`Updated product: ${editingProduct.name}`);
                    }
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs cursor-pointer shadow-lg"
                >
                  {isNewProduct ? 'Add Product' : 'Save Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: EDIT / PUBLISH ARTICLE */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditingArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#05112A] border border-[#1E3A6B] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                <h3 className="text-base font-bold text-white">
                  {isNewArticle ? 'Publish New Article / Press Release' : 'Edit Article'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="text-[#7B9CD2] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Article Headline *</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  placeholder="e.g. How Axoora Achieves Sub-2s NIBSS Failover"
                  className="px-3.5 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] text-sm font-bold text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Category</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Non-Interest Finance">Non-Interest Finance</option>
                    <option value="Company News">Company News</option>
                    <option value="Merchant Stories">Merchant Stories</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, author: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#A8BBD6]">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, readTime: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Executive Summary *</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, summary: e.target.value })
                  }
                  className="px-3.5 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#A8BBD6] flex items-center justify-between">
                  <span>Full Article Body (What You See Is What You Get)</span>
                  <span className="text-[11px] text-[#00DF8F] font-mono">Toolbar &bull; Live Preview &bull; Split View</span>
                </label>
                <WysiwygArticleEditor
                  content={editingArticle.content || ''}
                  onChange={(val) => setEditingArticle({ ...editingArticle, content: val })}
                  title={editingArticle.title}
                  category={editingArticle.category}
                  author={editingArticle.author}
                  readTime={editingArticle.readTime}
                  date={editingArticle.date}
                  summary={editingArticle.summary}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#14294F]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A8BBD6] hover:bg-[#0A1B3D] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingArticle}
                  onClick={async () => {
                    if (!editingArticle.title.trim() || !editingArticle.summary.trim()) {
                      setConfirmModal({
                        isOpen: true,
                        title: 'Missing Article Fields',
                        message: 'Please provide both a headline and an executive summary.',
                        variant: 'warning',
                        isAlertOnly: true,
                        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
                      });
                      return;
                    }
                    setIsSavingArticle(true);
                    const apiPayload = {
                      title: editingArticle.title.trim(),
                      category: editingArticle.category,
                      summary: editingArticle.summary.trim(),
                      content: editingArticle.content || '',
                      author: editingArticle.author || 'Axoora Editorial Board',
                      read_time: editingArticle.readTime || '4 min read',
                      published_date: editingArticle.date || 'Oct 2026',
                      is_published: true,
                    };

                    try {
                      if (isNewArticle) {
                        const res = await contentApi.createArticle(apiPayload);
                        const created = res?.data;
                        addArticle({
                          ...editingArticle,
                          id: created?.id || `art-${Date.now()}`,
                          slug: created?.slug,
                        } as any);
                        showToast(`Published article: "${editingArticle.title}"`);
                      } else {
                        const slugOrId = (editingArticle as any).slug || editingArticle.id;
                        const res = await contentApi.updateArticle(slugOrId, apiPayload);
                        const updated = res?.data;
                        updateArticle(editingArticle.id, {
                          ...editingArticle,
                          ...(updated?.slug ? { slug: updated.slug } : {}),
                        } as any);
                        showToast(`Updated article: "${editingArticle.title}"`);
                      }
                    } catch {
                      if (isNewArticle) {
                        addArticle({ ...editingArticle, id: `art-${Date.now()}` });
                      } else {
                        updateArticle(editingArticle.id, editingArticle);
                      }
                      showToast(`Saved article: "${editingArticle.title}"`);
                    } finally {
                      setIsSavingArticle(false);
                      setEditingArticle(null);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSavingArticle
                    ? 'Saving…'
                    : isNewArticle
                    ? 'Publish Article'
                    : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation / Alert Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        variant={confirmModal.variant}
        isAlertOnly={confirmModal.isAlertOnly}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
