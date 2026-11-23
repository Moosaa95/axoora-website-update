'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Megaphone,
  Smartphone,
  Store,
  Layers,
  FileText,
  Users,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  RotateCcw,
  ExternalLink,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Plus,
  Building2,
  CreditCard,
  PiggyBank,
  Send,
  Lock,
  Compass,
  X,
  Wallet,
  Tag,
  Percent,
  Info,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import {
  useCms,
  AdminMerchantItem,
  AdminProductItem,
  PageHeroItem,
  AdminHeroConfig,
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

export const PAGE_HERO_TABS = [
  { id: 'personal', label: 'Personal Banking', route: '/personal', tag: 'Personal', icon: Smartphone },
  { id: 'business', label: 'Commercial Business', route: '/business', tag: 'Business', icon: Building2 },
  { id: 'payouts', label: 'Bulk Batch Payouts', route: '/payouts', tag: 'Business', icon: Send },
  { id: 'cards', label: 'Cards & Virtual FX', route: '/cards', tag: 'Cards', icon: CreditCard },
  { id: 'savings', label: 'Savings & Ajo', route: '/savings', tag: 'Savings', icon: Wallet },
  { id: 'pricing', label: 'Pricing Table', route: '/pricing', tag: 'Pricing', icon: Tag },
  { id: 'security', label: 'Security & Trust', route: '/security', tag: 'Security', icon: ShieldCheck },
  { id: 'fees', label: 'Fee Schedule', route: '/fees', tag: 'Fees', icon: Percent },
  { id: 'help', label: 'Help & Knowledge', route: '/help', tag: 'Help', icon: HelpCircle },
  { id: 'about', label: 'About & Mission', route: '/about', tag: 'About', icon: Info },
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
  const [selectedHeroPage, setSelectedHeroPage] = useState<string>('personal');
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
    icon: React.ComponentType<{ className?: string }>;
    badge: string | null;
    reflectsOn: string;
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
      reflectsOn: 'Commercial metrics & website control',
    },
    {
      id: 'hero',
      label: 'Hero & Announcements',
      icon: Megaphone,
      badge: hero.announcementActive ? 'Live' : 'Off',
      reflectsOn: 'Business (/business), Payouts (/payouts) & Personal',
    },
    {
      id: 'get-started',
      label: '4-Step Onboarding',
      icon: Smartphone,
      badge: '4 Steps',
      reflectsOn: 'Interactive phone walkthrough on Home, Business & Personal',
    },
    {
      id: 'merchants',
      label: 'Merchant Stories',
      icon: Store,
      badge: `${merchants.length}`,
      reflectsOn: 'Home, Business testimonials & Stories (/stories)',
    },
    {
      id: 'products',
      label: 'Products & Pricing',
      icon: Layers,
      badge: `${products.length}`,
      reflectsOn: 'Cards, Savings, Payouts & Fee Schedule',
    },
    {
      id: 'journal',
      label: 'Articles & Press',
      icon: FileText,
      badge: `${articles.length}`,
      reflectsOn: 'Journal (/journal), Press (/press) & Blog Carousels',
    },
    {
      id: 'leads',
      label: 'Waitlist & Leads',
      icon: Users,
      badge: `${leads.length}`,
      reflectsOn: 'Apply (/apply), Waitlist Modal & Track (/track)',
    },
    {
      id: 'faqs',
      label: 'FAQs & Help Desk',
      icon: HelpCircle,
      badge: `${faqs.length}`,
      reflectsOn: 'Help Desk (/help), Resolution Desk & WhatsApp FAQs',
    },
    {
      id: 'chat',
      label: 'Live Chat Desk',
      icon: MessageSquare,
      badge: 'Live',
      reflectsOn: 'AI Concierge & Human Escalation Widget',
    },
    {
      id: 'team',
      label: 'Team & RBAC',
      icon: ShieldCheck,
      badge: 'RBAC',
      reflectsOn: 'Admin Console roles & staff permissions',
    },
  ];

  const activeNavMeta = navItems.find((n) => n.id === activeTab) || navItems[0];

  return (
    <div className="min-h-screen bg-[#020F2E] text-[#F2F5F9] flex flex-col font-['DM_Sans',sans-serif] selection:bg-[#043e97]/40">
      {/* Smooth Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 right-5 z-[90] bg-[#071739] border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#020F2E]/95 backdrop-blur-md border-b border-[#0e214d] px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <AxooraLogo size="sm" theme="dark" />
          <div className="h-4 w-px bg-[#162C5B] hidden sm:block" />
          <span className="text-[11px] font-bold text-[#53a8f5] bg-[#043e97]/25 px-2.5 py-1 rounded-full border border-[#043e97]/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Console</span>
          </span>
          <span className="hidden lg:inline text-xs text-slate-300 truncate">
            {activeNavMeta.reflectsOn}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="px-3 py-1.5 rounded-xl bg-[#071739] hover:bg-[#0c2356] border border-[#1E3A70] text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Sync with Django Backend"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#53a8f5] ${
                isSyncing ? 'animate-spin' : ''
              }`}
            />
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
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 border border-[#1E3A70] hover:border-amber-400/40 rounded-xl transition-colors cursor-pointer hidden md:inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onExitAdmin}
            className="px-4 py-2 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Navigation Bar */}
      <div className="lg:hidden bg-[#020F2E] border-b border-[#0e214d] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#043e97] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-[#071739] hover:text-white'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-[#020F2E] border-r border-[#0e214d] flex-col justify-between shrink-0">
          <nav className="p-3 flex flex-col gap-1">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#043e97] text-white font-bold shadow-md shadow-[#043e97]/25'
                      : 'text-slate-300 hover:bg-[#071739] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-[#071739] text-slate-300 border border-[#1E3A70]'
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
              <div className="p-3 m-3 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#043e97] to-[#0976da] flex items-center justify-center font-bold text-xs text-white shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">{displayName}</span>
                    <span className="text-[10px] text-emerald-400 font-medium truncate">{roleName}</span>
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
                  className="w-full py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-red-400 border border-[#1E3A70] hover:border-red-400/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            );
          })()}
        </aside>

        {/* Active Section Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#020F2E]">
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
                <div className="flex flex-col gap-8">
                  {/* Header Title Block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0e214d]">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                        Platform Administration &amp; Live Surfaces
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                        Axoora Operating Dashboard
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                        Monitor commercial accounts, bulk NIBSS payouts, card issuance, savings profit-shares, and support funnels.
                      </p>
                    </div>
                  </div>

                  {/* ─── LIVE WEBSITE SURFACES MATRIX (New feature) ─── */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Live Website Surfaces &amp; Public Endpoints
                      </span>
                      <span className="text-[11px] text-[#53a8f5] font-medium">
                        9 Live Routes Available
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        {
                          title: 'Business Account',
                          path: '/business',
                          eyebrow: 'Commercial Account',
                          desc: 'Real-time balance & scheduled cashflow timeline',
                          icon: Building2,
                          color: '#043e97',
                        },
                        {
                          title: 'Bulk Payouts',
                          path: '/payouts',
                          eyebrow: 'Two Ways In',
                          desc: 'Row-by-row NIBSS batch engine & CSV uploader',
                          icon: Send,
                          color: '#0976da',
                        },
                        {
                          title: 'Cards Engine',
                          path: '/cards',
                          eyebrow: 'Naira & Dollar',
                          desc: 'Physical & virtual cards with separate balances',
                          icon: CreditCard,
                          color: '#0f6b45',
                        },
                        {
                          title: 'Savings & Ajo',
                          path: '/savings',
                          eyebrow: 'Non-Interest',
                          desc: 'Fixed 12mo profit shares, Flexible & Ajo circles',
                          icon: PiggyBank,
                          color: '#b45309',
                        },
                        {
                          title: 'Pricing & Runs',
                          path: '/pricing',
                          eyebrow: 'Fee Transparency',
                          desc: 'What a run costs & per-recipient fee schedules',
                          icon: Layers,
                          color: '#043e97',
                        },
                        {
                          title: 'Security & Trust',
                          path: '/security',
                          eyebrow: 'CBN & NDIC',
                          desc: 'Transaction approval rules & deposit safety',
                          icon: ShieldCheck,
                          color: '#0976da',
                        },
                        {
                          title: 'Help Desk',
                          path: '/help',
                          eyebrow: 'Need a Hand?',
                          desc: 'Searchable resolution center & WhatsApp desk',
                          icon: HelpCircle,
                          color: '#0f6b45',
                        },
                        {
                          title: 'Company & Team',
                          path: '/about',
                          eyebrow: 'Built in Lagos',
                          desc: 'Executive team, headquarters, and mission',
                          icon: Compass,
                          color: '#b45309',
                        },
                      ].map((surface) => {
                        const SurfaceIcon = surface.icon;
                        return (
                          <a
                            key={surface.path}
                            href={surface.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-2xl bg-[#071739] hover:bg-[#0c2356] border border-[#1E3A70] hover:border-[#0976da]/60 transition-all flex flex-col justify-between group shadow-sm"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#53a8f5]">
                                  {surface.eyebrow}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
                              </div>
                              <h4 className="text-[14px] font-bold text-white group-hover:text-[#53a8f5] transition-colors flex items-center gap-1.5">
                                <SurfaceIcon className="w-4 h-4 text-[#53a8f5]" />
                                {surface.title}
                              </h4>
                              <p className="mt-1 text-[11.5px] text-slate-300 leading-relaxed">
                                {surface.desc}
                              </p>
                            </div>
                            <span className="mt-3 text-[10.5px] font-mono text-[#6c7a89]">
                              {surface.path}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* ─── OPERATIONAL KPI SUMMARY CARDS ─── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: 'Waitlist & Leads',
                        value: `${leads.length}`,
                        subtext: 'Applications submitted via /apply & modals',
                        badge: 'Active Funnel',
                        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                      },
                      {
                        title: 'Payouts Batch Engine',
                        value: 'NIBSS Ready',
                        subtext: '18 recipient demo batch template live',
                        badge: 'Connected',
                        badgeColor: 'text-[#53a8f5] bg-[#043e97]/20 border-[#043e97]/30',
                      },
                      {
                        title: 'Product Catalog',
                        value: `${products.length}`,
                        subtext: 'Configured pricing, cards & POS tiers',
                        badge: 'Published',
                        badgeColor: 'text-[#53a8f5] bg-[#043e97]/20 border-[#043e97]/30',
                      },
                      {
                        title: 'Knowledge Base',
                        value: `${articles.length + faqs.length}`,
                        subtext: `${articles.length} articles · ${faqs.length} FAQ answers`,
                        badge: 'Synchronized',
                        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                      },
                    ].map((kpi, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] shadow-sm flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-300">{kpi.title}</span>
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${kpi.badgeColor}`}
                          >
                            {kpi.badge}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-tight">
                          {kpi.value}
                        </div>
                        <p className="mt-1 text-[11px] text-slate-300">{kpi.subtext}</p>
                      </div>
                    ))}
                  </div>

                  {/* ─── QUICK ACTION MODULES ─── */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                      Content &amp; Configuration Modules
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          tab: 'hero' as AdminTab,
                          icon: Megaphone,
                          title: 'Hero & Announcements',
                          desc: 'Edit headlines, subheads, and the top announcement bar across Home, Business & Personal.',
                          stat: hero.announcementActive ? 'Banner Active' : 'Banner Hidden',
                          color: '#0976da',
                        },
                        {
                          tab: 'get-started' as AdminTab,
                          icon: Smartphone,
                          title: '4-Step Onboarding',
                          desc: 'Customize the 4 interactive phone onboarding steps and verified customer quotes.',
                          stat: '4 Interactive Steps',
                          color: '#0f6b45',
                        },
                        {
                          tab: 'merchants' as AdminTab,
                          icon: Store,
                          title: 'Merchant Stories',
                          desc: 'Add or edit verified Nigerian merchant stories shown on Home, Business & /stories.',
                          stat: `${merchants.length} Stories Live`,
                          color: '#b45309',
                        },
                        {
                          tab: 'products' as AdminTab,
                          icon: Layers,
                          title: 'Products & Pricing',
                          desc: 'Manage Personal, Business, Apex POS, and Halal Capital cards & fee structures.',
                          stat: `${products.length} Products`,
                          color: '#0976da',
                        },
                        {
                          tab: 'journal' as AdminTab,
                          icon: FileText,
                          title: 'Articles & Press',
                          desc: 'Publish engineering notes, press releases, and guides to /journal and /press.',
                          stat: `${articles.length} Published`,
                          color: '#0f6b45',
                        },
                        {
                          tab: 'leads' as AdminTab,
                          icon: Users,
                          title: 'Waitlist & Leads',
                          desc: 'Review applications from /apply, update approval status, and export CSV.',
                          stat: `${leads.length} Total Leads`,
                          color: '#a855f7',
                        },
                        {
                          tab: 'faqs' as AdminTab,
                          icon: HelpCircle,
                          title: 'Resolution Desk FAQs',
                          desc: 'Edit questions & answers for website accordion drawers across all products.',
                          stat: `${faqs.length} FAQs Live`,
                          color: '#0976da',
                        },
                      ].map((card) => {
                        const CardIcon = card.icon;
                        return (
                          <button
                            key={card.tab}
                            type="button"
                            onClick={() => setActiveTab(card.tab)}
                            className="p-5 rounded-2xl bg-[#071739] hover:bg-[#0c2356] border border-[#1E3A70] hover:border-[#0976da]/60 text-left flex flex-col justify-between gap-4 transition-all cursor-pointer group shadow-sm"
                          >
                            <div className="flex flex-col gap-2.5">
                              <div className="flex items-center justify-between">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#043e97]/20 text-[#53a8f5]"
                                >
                                  <CardIcon className="w-5 h-5" />
                                </div>
                                <span
                                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 text-[#53a8f5]"
                                >
                                  {card.stat}
                                </span>
                              </div>
                              <h3 className="text-base font-bold text-white group-hover:text-[#53a8f5] transition-colors">
                                {card.title}
                              </h3>
                              <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                            </div>

                            <div className="text-xs font-bold text-[#53a8f5] flex items-center gap-1.5">
                              <span>Configure Module</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ─── RECENT WAITLIST ONBOARDING LEADS PREVIEW ─── */}
                  <div className="p-6 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[15px] font-bold text-white">Recent Customer Applications</h3>
                        <p className="text-xs text-slate-300">
                          Synced in real-time with /apply, Waitlist Modal, and customer database
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('leads')}
                        className="px-3 py-1.5 rounded-xl bg-[#043e97]/20 hover:bg-[#043e97]/40 text-xs font-bold text-[#53a8f5] cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <span>Open Full Table</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#1E3A70] text-slate-300 uppercase text-[10.5px] font-bold">
                            <th className="py-2.5 px-3">Applicant</th>
                            <th className="py-2.5 px-3">WhatsApp</th>
                            <th className="py-2.5 px-3">Interest</th>
                            <th className="py-2.5 px-3">Location</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#162C5B]/60">
                          {leads.slice(0, 5).map((lead) => (
                            <tr key={lead.id} className="hover:bg-[#0c2356]/40 transition-colors">
                              <td className="py-3 px-3 font-semibold text-white">
                                {lead.fullName}
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-300">
                                {lead.whatsappNumber}
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full bg-[#043e97]/20 text-[#53a8f5] text-[10px] uppercase font-bold border border-[#043e97]/30">
                                  {lead.interest}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-300">{lead.city || '—'}</td>
                              <td className="py-3 px-3">
                                <select
                                  value={lead.status}
                                  onChange={(e) => {
                                    updateLeadStatus(lead.id, e.target.value as any);
                                    showToast(
                                      `Updated ${lead.fullName} status to ${e.target.value}`
                                    );
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#020F2E] border border-[#1E3A70] text-xs text-white font-semibold cursor-pointer focus:outline-none focus:border-[#0976da]"
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
              {activeTab === 'hero' && (() => {
                const activeHeroMeta = PAGE_HERO_TABS.find((t) => t.id === selectedHeroPage) || PAGE_HERO_TABS[0];
                const currentPageHero = (heroDraft.pageHeroes && heroDraft.pageHeroes[selectedHeroPage]) || {
                  tag: activeHeroMeta.tag,
                  headline: selectedHeroPage === 'business' ? heroDraft.headlineBusiness : selectedHeroPage === 'personal' ? heroDraft.headlinePersonal : '',
                  subheadline: selectedHeroPage === 'business' ? heroDraft.subheadlineBusiness : selectedHeroPage === 'personal' ? heroDraft.subheadlinePersonal : '',
                  cta_primary: heroDraft.ctaTextPrimary || 'Get the app',
                  cta_secondary: heroDraft.ctaTextSecondary || 'Start on WhatsApp',
                  route: activeHeroMeta.route,
                };

                const updateCurrentPageHero = (patch: Partial<PageHeroItem>) => {
                  const updatedPage: PageHeroItem = {
                    ...currentPageHero,
                    ...patch,
                  };
                  const updatedPageHeroes = {
                    ...(heroDraft.pageHeroes || {}),
                    [selectedHeroPage]: updatedPage,
                  };
                  const updatedDraft: AdminHeroConfig = {
                    ...heroDraft,
                    pageHeroes: updatedPageHeroes,
                    ...(selectedHeroPage === 'business' && patch.headline ? { headlineBusiness: patch.headline } : {}),
                    ...(selectedHeroPage === 'business' && patch.subheadline ? { subheadlineBusiness: patch.subheadline } : {}),
                    ...(selectedHeroPage === 'personal' && patch.headline ? { headlinePersonal: patch.headline } : {}),
                    ...(selectedHeroPage === 'personal' && patch.subheadline ? { subheadlinePersonal: patch.subheadline } : {}),
                  };
                  setHeroDraft(updatedDraft);
                  updateHero(updatedDraft);
                };

                return (
                  <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3A70]">
                      <div>
                        <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                          Multi-Page Website Heroes &amp; Announcements
                        </span>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
                          Page Heroes Studio
                        </h1>
                        <p className="text-xs text-slate-300 mt-1">
                          Configure live hero headlines, badges, descriptions, and action buttons for every navigation bar page.
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Publish All Hero Updates</span>
                        </button>
                      </div>
                    </div>

                    {/* Top Sitewide Announcement Ticker Card */}
                    <div className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Megaphone className="w-4 h-4 text-[#53a8f5]" />
                            <span>Top Sitewide Announcement Banner</span>
                          </h3>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Broadcast message pinned at the very top of all website pages.
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
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-[#020F2E] text-slate-400 border border-[#1E3A70]'
                          }`}
                        >
                          {heroDraft.announcementActive ? '● Active Sitewide' : '○ Hidden'}
                        </button>
                      </div>

                      <input
                        type="text"
                        value={heroDraft.announcementTicker}
                        onChange={(e) => {
                          setHeroDraft({ ...heroDraft, announcementTicker: e.target.value });
                          updateHero({ announcementTicker: e.target.value });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-sm text-white font-medium focus:border-[#53a8f5] outline-none transition-colors"
                        placeholder="e.g. ⚡ CBN Approved Dual-SIM Apex POS Batch 2 Now Dispatching Nationwide. Instant Settlement Enabled."
                      />
                    </div>

                    {/* Navbar Pages Selection Pills */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        Select Website Page to Edit Hero:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#020F2E] p-2 rounded-2xl border border-[#1E3A70]">
                        {PAGE_HERO_TABS.map((tab) => {
                          const IconComp = tab.icon;
                          const isSelected = selectedHeroPage === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setSelectedHeroPage(tab.id)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#043e97] text-white shadow-md border border-[#53a8f5]/40'
                                  : 'text-slate-300 hover:text-white hover:bg-[#071739] border border-transparent'
                              }`}
                            >
                              <IconComp className="w-3.5 h-3.5 shrink-0 text-[#93c5fd]" />
                              <span className="truncate">{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hero Editor & WYSIWYG Live Mockup Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Inputs */}
                      <div className="lg:col-span-7 p-6 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#1E3A70]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            <h3 className="text-sm font-bold text-white">
                              {activeHeroMeta.label} Hero Settings
                            </h3>
                          </div>
                          <a
                            href={activeHeroMeta.route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#53a8f5] hover:text-white flex items-center gap-1 font-semibold hover:underline"
                          >
                            <span>Open {activeHeroMeta.route}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Tag/Category Pill */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-200">
                            Category Pill / Badge Text
                          </label>
                          <input
                            type="text"
                            value={currentPageHero.tag}
                            onChange={(e) => updateCurrentPageHero({ tag: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-sm text-white font-semibold focus:border-[#53a8f5] outline-none transition-colors"
                            placeholder="e.g. Business, Personal, Cards, Security..."
                          />
                        </div>

                        {/* Main Headline */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-200">
                            Main Headline
                          </label>
                          <input
                            type="text"
                            value={currentPageHero.headline}
                            onChange={(e) => updateCurrentPageHero({ headline: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-sm text-white font-bold focus:border-[#53a8f5] outline-none transition-colors"
                            placeholder="Page headline..."
                          />
                        </div>

                        {/* Subheadline */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-200">
                            Subheadline Description
                          </label>
                          <textarea
                            rows={3}
                            value={currentPageHero.subheadline}
                            onChange={(e) => updateCurrentPageHero({ subheadline: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-slate-200 leading-relaxed focus:border-[#53a8f5] outline-none transition-colors resize-none"
                            placeholder="Subheadline copy..."
                          />
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-200">
                              Primary CTA Button Text
                            </label>
                            <input
                              type="text"
                              value={currentPageHero.cta_primary || 'Get the app'}
                              onChange={(e) => updateCurrentPageHero({ cta_primary: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white font-semibold focus:border-[#53a8f5] outline-none transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-200">
                              Secondary CTA Button Text
                            </label>
                            <input
                              type="text"
                              value={currentPageHero.cta_secondary || 'Start on WhatsApp'}
                              onChange={(e) => updateCurrentPageHero({ cta_secondary: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white font-semibold focus:border-[#53a8f5] outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: WYSIWYG Real-time Preview */}
                      <div className="lg:col-span-5 p-6 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#1E3A70] mb-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#53a8f5] uppercase tracking-wider">
                              <Eye className="w-4 h-4" />
                              <span>Live Website Mockup Render</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-300">
                              {activeHeroMeta.route}
                            </span>
                          </div>

                          {/* Hero Render Preview Card */}
                          <div className="w-full rounded-2xl bg-[#043e97] p-6 text-white shadow-xl relative overflow-hidden flex flex-col gap-4">
                            <div className="w-fit px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                              {currentPageHero.tag || activeHeroMeta.tag}
                            </div>
                            <div>
                              <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white">
                                {currentPageHero.headline || 'Your Headline Here'}
                              </h2>
                              <p className="mt-2 text-xs text-blue-100 leading-relaxed font-normal">
                                {currentPageHero.subheadline || 'Subheadline description appears here on the website.'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 pt-2 flex-wrap">
                              <div className="px-3 py-1.5 rounded-xl bg-white text-[#043e97] text-xs font-bold shadow-sm flex items-center gap-1">
                                <span>{currentPageHero.cta_primary || 'Get the app'}</span>
                              </div>
                              <div className="px-3 py-1.5 rounded-xl border border-white/40 text-white text-xs font-bold flex items-center gap-1">
                                <span>{currentPageHero.cta_secondary || 'Start on WhatsApp'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] flex items-center justify-between text-xs text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Synchronized with Backend API</span>
                          </span>
                          <span className="font-mono text-[10.5px] text-[#53a8f5]">JSONField Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Regulatory Trust Line */}
                    <div className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-200">
                        Sitewide Regulatory Trust Badge Line
                      </label>
                      <input
                        type="text"
                        value={heroDraft.trustLine}
                        onChange={(e) => {
                          setHeroDraft({ ...heroDraft, trustLine: e.target.value });
                          updateHero({ trustLine: e.target.value });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-[#93c5fd] font-semibold focus:border-[#53a8f5] outline-none transition-colors"
                      />
                    </div>
                  </form>
                );
              })()}

              {/* ========================================================= */}
              {/* 3. 4-STEP ONBOARDING */}
              {/* ========================================================= */}
              {activeTab === 'get-started' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3A70]">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                        Reflects on Interactive Walkthrough (Home, Business &amp; Personal)
                      </span>
                      <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
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
                        className="px-3.5 py-2 rounded-xl bg-[#071739] border border-[#1E3A70] hover:border-amber-400/50 text-xs font-semibold text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        Reset Steps
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`Step 0${selectedStep.num} saved & live!`)}
                        className="px-4 py-2 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs cursor-pointer shadow-md transition-all"
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
                              ? 'bg-[#043e97] border-[#0976da] shadow-lg shadow-[#043e97]/20 text-white'
                              : 'bg-[#071739] border-[#1E3A70] hover:border-[#043e97]/40'
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-bold block ${active ? 'text-white/80' : 'text-[#53a8f5]'}`}>
                            Step 0{s.num}
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
                      <div className="lg:col-span-7 p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-slate-300">Step Tagline</label>
                            <input
                              type="text"
                              value={selectedStep.tag}
                              onChange={(e) =>
                                updateStep(selectedStep.num, { tag: e.target.value })
                              }
                              className="px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-[#53a8f5]"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-slate-300">Customer Photo</label>
                            <select
                              value={selectedStep.user.photo}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, photo: e.target.value },
                                })
                              }
                              className="px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white"
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
                          <label className="text-xs text-slate-300">Step Headline</label>
                          <input
                            type="text"
                            value={selectedStep.title}
                            onChange={(e) =>
                              updateStep(selectedStep.num, { title: e.target.value })
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-sm font-bold text-white"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-300">Step Description</label>
                          <textarea
                            rows={3}
                            value={selectedStep.desc}
                            onChange={(e) =>
                              updateStep(selectedStep.num, { desc: e.target.value })
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-[#d1d5db] leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1E3A70]">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-slate-300">Customer Name</label>
                            <input
                              type="text"
                              value={selectedStep.user.name}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, name: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-slate-300">Role / Business</label>
                            <input
                              type="text"
                              value={selectedStep.user.role}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, role: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-slate-300">Location</label>
                            <input
                              type="text"
                              value={selectedStep.user.location}
                              onChange={(e) =>
                                updateStep(selectedStep.num, {
                                  user: { ...selectedStep.user, location: e.target.value },
                                })
                              }
                              className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-300">Customer Quote</label>
                          <input
                            type="text"
                            value={selectedStep.user.comment}
                            onChange={(e) =>
                              updateStep(selectedStep.num, {
                                user: { ...selectedStep.user, comment: e.target.value },
                              })
                            }
                            className="px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-[#53a8f5]"
                          />
                        </div>
                      </div>

                      {/* Live Preview Card */}
                      <div className="lg:col-span-5 p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col justify-between gap-4">
                        <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase">
                          Live Card Preview
                        </span>
                        <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#043e97] flex flex-col gap-3">
                          <span className="text-[10px] font-bold tracking-wider text-[#53a8f5] uppercase">
                            {selectedStep.tag}
                          </span>
                          <h4 className="text-base font-bold text-white">{selectedStep.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {selectedStep.desc}
                          </p>
                          <div className="p-2.5 rounded-xl bg-[#071739] border border-[#1E3A70] flex items-center gap-2.5">
                            <img
                              src={selectedStep.user.photo}
                              alt={selectedStep.user.name}
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white truncate">
                                {selectedStep.user.name}{' '}
                                <span className="text-emerald-400 text-[10px] font-medium">
                                  ({selectedStep.user.location})
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-300 italic truncate">
                                "{selectedStep.user.comment}"
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-300">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3A70]">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                        Reflects on Home, Business Testimonials &amp; /stories
                      </span>
                      <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
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
                          accentColor: '#10B981',
                          badge: 'Verified Merchant',
                          featured: true,
                        });
                      }}
                      className="px-4 py-2.5 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" />
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
                        className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] hover:border-[#043e97] flex flex-col justify-between gap-4 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-[#1E3A70] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/5"
                                style={{ color: m.accentColor }}
                              >
                                {m.badge}
                              </span>
                              <span className="text-xs font-semibold text-emerald-400">
                                {m.statLabel}: {m.statValue}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white mt-1">{m.name}</h3>
                            <p className="text-xs text-slate-300">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3A70]">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                        Reflects on Product Suite (/cards, /savings, /business, /payouts) &amp; Fee Schedule
                      </span>
                      <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
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
                      className="px-4 py-2.5 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" />
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
                        className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] hover:border-[#043e97] flex flex-col justify-between gap-4 transition-all"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded bg-[#043e97]/20 text-[#53a8f5] text-[10px] font-bold uppercase tracking-wider">
                              {prod.category}
                            </span>
                            <select
                              value={prod.status}
                              onChange={(e) => {
                                updateProduct(prod.id, { status: e.target.value as any });
                                showToast(`Updated ${prod.name} status to ${e.target.value}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#020F2E] border border-[#1E3A70] text-[11px] font-semibold text-emerald-400 cursor-pointer"
                            >
                              <option value="active">● Active (Live)</option>
                              <option value="beta">◐ Pilot / Beta</option>
                              <option value="coming-soon">○ Coming Soon</option>
                            </select>
                          </div>

                          <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                          <p className="text-xs font-semibold text-[#53a8f5]">{prod.headline}</p>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#1E3A70] flex items-center justify-between gap-2">
                          <div className="text-xs font-semibold text-emerald-400 truncate">
                            {prod.feeStructure}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setIsNewProduct(false);
                                setEditingProduct(prod);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-xs font-bold text-white cursor-pointer transition-colors"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E3A70]">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-[#53a8f5] uppercase block">
                        Reflects on /journal, /press &amp; Blog Carousels
                      </span>
                      <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
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
                      className="px-4 py-2.5 bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" />
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
                              ? 'bg-[#043e97] text-white font-bold shadow-sm'
                              : 'bg-[#071739] text-slate-300 border border-[#1E3A70] hover:text-white'
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
                      className="px-3.5 py-2 rounded-xl bg-[#071739] border border-[#1E3A70] text-xs text-white outline-none focus:border-[#0976da]"
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
                          className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] hover:border-[#043e97] flex flex-col justify-between gap-4 transition-all"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="px-2.5 py-0.5 rounded bg-[#043e97]/20 text-[#53a8f5] font-bold">
                                {art.category}
                              </span>
                              <span className="text-slate-300">
                                {art.date} · {art.readTime}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white leading-snug">
                              {art.title}
                            </h3>
                            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                              {art.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#1E3A70] flex items-center justify-between">
                            <span className="text-[11px] text-slate-300 truncate">
                              {art.author || 'Axoora Editorial Board'}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsNewArticle(false);
                                  setEditingArticle(art);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-xs font-bold text-white cursor-pointer transition-colors"
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
              className="w-full max-w-lg rounded-2xl bg-[#071739] border border-[#1E3A70] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1E3A70]">
                <h3 className="text-base font-bold text-white">
                  {isNewMerchant ? 'Add Merchant Story' : `Edit ${editingMerchant.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingMerchant(null)}
                  className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Merchant Full Name *</label>
                  <input
                    type="text"
                    value={editingMerchant.name}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, name: e.target.value })
                    }
                    placeholder="e.g. Alhaji Musa Danbaba"
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Business / Role *</label>
                  <input
                    type="text"
                    value={editingMerchant.role}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, role: e.target.value })
                    }
                    placeholder="e.g. Wholesale Grain Merchant"
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Market &amp; City</label>
                  <input
                    type="text"
                    value={editingMerchant.location}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, location: e.target.value })
                    }
                    placeholder="e.g. Dawanau Market, Kano"
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Portrait Photo</label>
                  <select
                    value={editingMerchant.image}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, image: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  >
                    {PRESET_MERCHANT_PHOTOS.map((p) => (
                      <option key={p.url} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Badge Label</label>
                  <input
                    type="text"
                    value={editingMerchant.badge}
                    onChange={(e) =>
                      setEditingMerchant({ ...editingMerchant, badge: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300">Metric Label</label>
                    <input
                      type="text"
                      value={editingMerchant.statLabel}
                      onChange={(e) =>
                        setEditingMerchant({ ...editingMerchant, statLabel: e.target.value })
                      }
                      className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-300">Metric Value</label>
                    <input
                      type="text"
                      value={editingMerchant.statValue}
                      onChange={(e) =>
                        setEditingMerchant({ ...editingMerchant, statValue: e.target.value })
                      }
                      className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-emerald-400 font-semibold focus:border-[#0976da] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">Direct Merchant Quote *</label>
                <textarea
                  rows={3}
                  value={editingMerchant.quote}
                  onChange={(e) =>
                    setEditingMerchant({ ...editingMerchant, quote: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white leading-relaxed focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1E3A70]">
                <button
                  type="button"
                  onClick={() => setEditingMerchant(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-[#162C5B] transition-colors cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs cursor-pointer shadow-md transition-all"
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
              className="w-full max-w-lg rounded-2xl bg-[#071739] border border-[#1E3A70] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1E3A70]">
                <h3 className="text-base font-bold text-white">
                  {isNewProduct ? 'Add New Product' : `Edit ${editingProduct.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Product Name *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as AdminProductItem['category'],
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  >
                    <option value="personal">Personal (/personal, /cards, /savings)</option>
                    <option value="business">Commercial Business (/business)</option>
                    <option value="pos">Bulk Clearing &amp; Payouts (/payouts)</option>
                    <option value="capital">Apex POS Hardware</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Fee Structure</label>
                  <input
                    type="text"
                    value={editingProduct.feeStructure}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, feeStructure: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-emerald-400 font-semibold focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Availability Status</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        status: e.target.value as AdminProductItem['status'],
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  >
                    <option value="active">Active (Live)</option>
                    <option value="beta">Pilot / Beta</option>
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">One-Line Headline *</label>
                <input
                  type="text"
                  value={editingProduct.headline}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, headline: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">Key Highlight Badge</label>
                <input
                  type="text"
                  value={editingProduct.highlight}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, highlight: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white leading-relaxed focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1E3A70]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-[#162C5B] transition-colors cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs cursor-pointer shadow-md transition-all"
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
              className="w-full max-w-4xl rounded-2xl bg-[#071739] border border-[#1E3A70] p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1E3A70]">
                <h3 className="text-base font-bold text-white">
                  {isNewArticle ? 'Publish New Article / Press Release' : 'Edit Article'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#162C5B] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">Article Headline *</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  placeholder="e.g. How Axoora Achieves Sub-2s NIBSS Failover"
                  className="px-3.5 py-2.5 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-sm font-bold text-white focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Category</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
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
                  <label className="text-xs text-slate-300">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, author: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, readTime: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white focus:border-[#0976da] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">Executive Summary *</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, summary: e.target.value })
                  }
                  className="px-3.5 py-2 rounded-xl bg-[#020F2E] border border-[#1E3A70] text-xs text-white leading-relaxed focus:border-[#0976da] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-300 flex items-center justify-between">
                  <span>Full Article Body (What You See Is What You Get)</span>
                  <span className="text-[11px] text-[#53a8f5] font-medium">Toolbar &bull; Live Preview &bull; Split View</span>
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

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1E3A70]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-[#162C5B] transition-colors cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs cursor-pointer shadow-md transition-all disabled:opacity-50"
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
