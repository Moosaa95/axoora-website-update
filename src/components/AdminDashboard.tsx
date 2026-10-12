'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCms, AdminStepItem, AdminMerchantItem, AdminLeadItem, AdminProductItem } from '../context/CmsContext';
import { AxooraLogo } from './AxooraLogo';
import { WaitlistDataTable } from './WaitlistDataTable';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

type AdminTab = 'overview' | 'hero' | 'get-started' | 'merchants' | 'products' | 'leads' | 'journal' | 'settings';

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
    leads,
    updateLeadStatus,
    deleteLead,
    products,
    updateProduct,
    resetAllCmsData,
  } = useCms();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Editing state for merchant drawer
  const [editingMerchant, setEditingMerchant] = useState<AdminMerchantItem | null>(null);
  const [isNewMerchant, setIsNewMerchant] = useState(false);

  // Editing state for 4-Step Get Started
  const [selectedStepNum, setSelectedStepNum] = useState<number>(1);

  // Leads filter
  const [leadCategoryFilter, setLeadCategoryFilter] = useState<string>('all');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const selectedStep = steps.find((s) => s.num === selectedStepNum) || steps[0];

  const filteredLeads = leads.filter((l) => {
    const matchesCat = leadCategoryFilter === 'all' || l.interest === leadCategoryFilter;
    const matchesSearch =
      searchFilter === '' ||
      l.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.whatsappNumber.includes(searchFilter) ||
      (l.city && l.city.toLowerCase().includes(searchFilter.toLowerCase())) ||
      l.email.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const exportLeadsCsv = () => {
    const headers = ['ID', 'Full Name', 'WhatsApp', 'Email', 'City', 'Interest', 'Status', 'Date Submitted'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName}"`,
      `"${l.whatsappNumber}"`,
      `"${l.email}"`,
      `"${l.city || ''}"`,
      `"${l.interest}"`,
      `"${l.status}"`,
      `"${l.submittedAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Axoora_Waitlist_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported waitlist leads to CSV file!');
  };

  return (
    <div className="min-h-screen bg-[#020B1D] text-[#F2F5F9] flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#0A1B3D] border border-[#00DF8F] text-[#F2F5F9] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#020B1D]/90 backdrop-blur-md border-b border-[#14294F] px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <AxooraLogo />
            <div className="h-4 w-px bg-[#14294F]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D95FE] bg-[#0D95FE]/10 px-2 py-0.5 rounded-full border border-[#0D95FE]/30">
              CMS Console v2.4
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#7B9CD2]">
            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
            <span>Store: <b>Live In-Memory &amp; LocalStorage</b></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all CMS changes back to pristine factory mock data?')) {
                resetAllCmsData();
                showToast('All CMS data reset to default!');
              }
            }}
            className="px-3 py-1.5 text-xs text-[#A8BBD6] hover:text-[#EF4444] border border-[#14294F] hover:border-[#EF4444]/40 rounded-xl transition-all cursor-pointer hidden sm:block"
          >
            Reset Factory Data
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-1.5 bg-[#0D95FE] hover:bg-[#0C84E4] text-[#001E3D] font-bold text-xs rounded-xl shadow-lg shadow-[#0D95FE]/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Public Site</span>
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-[#030E26] border-r border-[#14294F] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#14294F]/80">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#7B9CD2] block mb-1">
              FINTECH CONTENT SUITE
            </span>
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span>Axoora Core Platform</span>
              <span className="px-1.5 py-0.5 rounded bg-[#00DF8F]/20 text-[#00DF8F] text-[10px] font-mono">
                ONLINE
              </span>
            </div>
          </div>

          <nav className="p-3 flex flex-col gap-1 flex-1 overflow-y-auto">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: 'dashboard', badge: null },
              { id: 'hero', label: 'Hero & Announcements', icon: 'campaign', badge: 'Live' },
              { id: 'get-started', label: '4-Step Onboarding', icon: 'route', badge: 'Interactive' },
              { id: 'merchants', label: 'Street Merchants', icon: 'storefront', badge: `${merchants.length}` },
              { id: 'products', label: 'Products & POS', icon: 'point_of_sale', badge: `${products.length}` },
              { id: 'leads', label: 'Waitlist & Inquiries', icon: 'contacts', badge: `${leads.length}` },
              { id: 'journal', label: 'Articles & Guides', icon: 'article', badge: `${articles.length}` },
              { id: 'settings', label: 'Compliance & Keys', icon: 'shield', badge: 'CBN' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0D95FE] text-[#002447] shadow-md shadow-[#0D95FE]/20 font-bold'
                      : 'text-[#A8BBD6] hover:bg-[#0A1B3D] hover:text-[#F2F5F9]'
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
                          ? 'bg-[#002447]/20 text-[#002447] font-bold'
                          : 'bg-[#14294F] text-[#7B9CD2]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Admin User Card */}
          <div className="p-3 m-3 rounded-2xl bg-[#05112A] border border-[#14294F] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] flex items-center justify-center font-bold text-xs text-[#00284D]">
              MO
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">Moosa Abdullahi</span>
              <span className="text-[10px] text-[#00DF8F] font-mono">Super Administrator</span>
            </div>
          </div>
        </aside>

        {/* Right Active Workspace Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#020B1D]">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW METRICS */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14294F] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                    SYSTEM DASHBOARD // 2026 ROADMAP
                  </span>
                  <h1 className="text-2xl font-black text-white tracking-tight">Fintech Operations Center</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="px-3.5 py-2 bg-[#05112A] hover:bg-[#0A1B3D] border border-[#14294F] text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">download</span>
                    <span>Review Waitlist ({leads.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hero')}
                    className="px-3.5 py-2 bg-[#0D95FE] text-[#00284D] font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all hover:bg-[#0C84E4]"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>Edit Live Hero</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#7B9CD2]">
                    <span>App Waitlist Leads</span>
                    <span className="material-symbols-outlined text-[18px] text-[#0D95FE]">group</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">{leads.length}</div>
                  <div className="text-[11px] text-[#00DF8F] flex items-center gap-1 font-mono">
                    <span>↑ +18 today</span>
                    <span className="text-[#7B9CD2]">across 6 states</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#7B9CD2]">
                    <span>Apex POS Inquiries</span>
                    <span className="material-symbols-outlined text-[18px] text-[#00DF8F]">point_of_sale</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {leads.filter((l) => l.interest === 'pos-agent' || l.interest === 'aggregator').length}
                  </div>
                  <div className="text-[11px] text-[#0D95FE] flex items-center gap-1 font-mono">
                    <span>⚡ Batch 2 Open</span>
                    <span className="text-[#7B9CD2]">Dual-SIM</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#7B9CD2]">
                    <span>Merchant Stories</span>
                    <span className="material-symbols-outlined text-[18px] text-[#F2A93B]">storefront</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">{merchants.length}</div>
                  <div className="text-[11px] text-[#F2A93B] flex items-center gap-1 font-mono">
                    <span>✓ Kano • Lagos • Abuja</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#7B9CD2]">
                    <span>Journal Articles</span>
                    <span className="material-symbols-outlined text-[18px] text-[#A8BBD6]">menu_book</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">{articles.length}</div>
                  <div className="text-[11px] text-[#00DF8F] flex items-center gap-1 font-mono">
                    <span>Published &amp; Indexed</span>
                  </div>
                </div>
              </div>

              {/* Live Ticker Alert Status */}
              <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D95FE]/10 border border-[#0D95FE]/30 flex items-center justify-center text-[#0D95FE] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">campaign</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#7B9CD2] uppercase font-bold block">
                      CURRENT EMERGENCY / TOP TICKER
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {hero.announcementActive ? hero.announcementTicker : '(Ticker currently hidden on public website)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      updateHero({ announcementActive: !hero.announcementActive });
                      showToast(hero.announcementActive ? 'Ticker deactivated!' : 'Ticker activated!');
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
                      hero.announcementActive
                        ? 'bg-[#00DF8F]/20 text-[#00DF8F] border-[#00DF8F]/40'
                        : 'bg-[#14294F] text-[#7B9CD2] border-transparent'
                    }`}
                  >
                    {hero.announcementActive ? '● Ticker Active' : '○ Ticker Hidden'}
                  </button>
                  <button
                    onClick={() => setActiveTab('hero')}
                    className="px-3 py-1.5 bg-[#0A1B3D] text-[#A8BBD6] hover:text-white border border-[#14294F] text-xs rounded-xl cursor-pointer"
                  >
                    Edit Message
                  </button>
                </div>
              </div>

              {/* Quick Jump Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 4-Step Onboarding Quick Card */}
                <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                        FEATURED ON HOMEPAGE
                      </span>
                      <span className="text-xs text-[#7B9CD2]">4 Connected Steps</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Interactive Get Started Flow</h3>
                    <p className="text-xs text-[#A8BBD6] leading-relaxed">
                      Controls the sticky scroll container on the homepage: step descriptions, verification timelines, and merchant testimonials.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {steps.map((st) => (
                      <div
                        key={st.num}
                        onClick={() => {
                          setSelectedStepNum(st.num);
                          setActiveTab('get-started');
                        }}
                        className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] hover:border-[#0D95FE]/60 flex items-center justify-between text-xs cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#0D95FE] font-bold">0{st.num}.</span>
                          <span className="font-semibold text-white truncate max-w-[200px]">{st.title}</span>
                        </div>
                        <span className="text-[10px] text-[#7B9CD2] font-mono">{st.user.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('get-started')}
                    className="w-full py-2 bg-[#0A1B3D] hover:bg-[#0D95FE]/20 text-[#0D95FE] border border-[#0D95FE]/30 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Configure Steps &amp; Phone Mockups →
                  </button>
                </div>

                {/* Recent Leads Feed */}
                <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                        LATEST REGISTRATIONS
                      </span>
                      <button
                        onClick={exportLeadsCsv}
                        className="text-[11px] text-[#00DF8F] hover:underline cursor-pointer flex items-center gap-1 font-mono"
                      >
                        <span>Export CSV</span>
                        <span className="material-symbols-outlined text-[14px]">file_download</span>
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Waitlist &amp; Device Leads</h3>
                    <p className="text-xs text-[#A8BBD6] leading-relaxed">
                      Real-time submissions from users and merchants wanting to open personal accounts, business NUBANs, or agent POS hardware.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {leads.slice(0, 4).map((ld) => (
                      <div
                        key={ld.id}
                        className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] flex items-center justify-between text-xs"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{ld.fullName}</span>
                          <span className="text-[10px] text-[#7B9CD2] font-mono">
                            {ld.whatsappNumber} • {ld.city || 'Nigeria'}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                            ld.status === 'dispatched'
                              ? 'bg-[#00DF8F]/20 text-[#00DF8F]'
                              : ld.status === 'approved'
                              ? 'bg-[#0D95FE]/20 text-[#0D95FE]'
                              : 'bg-[#14294F] text-[#A8BBD6]'
                          }`}
                        >
                          {ld.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('leads')}
                    className="w-full py-2 bg-[#0A1B3D] hover:bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/30 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    View All {leads.length} Leads &amp; Manage Hardware →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: HERO & ANNOUNCEMENT TICKER */}
          {/* ========================================================= */}
          {activeTab === 'hero' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div className="border-b border-[#14294F] pb-4">
                <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                  HOMEPAGE COPY CONTROL
                </span>
                <h1 className="text-2xl font-black text-white">Hero &amp; Announcements</h1>
                <p className="text-xs text-[#A8BBD6] mt-1">
                  Edit the primary headlines and real-time news ticker that greets users on the homepage.
                </p>
              </div>

              {/* Ticker Management Card */}
              <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Top Notice / Urgent Ticker</h3>
                    <p className="text-xs text-[#7B9CD2]">Shown on the very top of the homepage</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hero.announcementActive}
                      onChange={(e) => updateHero({ announcementActive: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#0D95FE]"
                    />
                    <span className="text-xs font-mono text-[#00DF8F]">Enable Live Ticker</span>
                  </label>
                </div>

                <input
                  type="text"
                  value={hero.announcementTicker}
                  onChange={(e) => updateHero({ announcementTicker: e.target.value })}
                  placeholder="e.g. ⚡ CBN Approved Dual-SIM Apex POS Batch 2 Now Dispatching..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs font-medium outline-none"
                />
              </div>

              {/* Dual Mode Hero Headlines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Mode Copy */}
                <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
                    <span className="material-symbols-outlined text-[16px]">store</span>
                    <span className="font-bold uppercase">Business Mode (Shop Door)</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Hero Headline</label>
                    <input
                      type="text"
                      value={hero.headlineBusiness}
                      onChange={(e) => updateHero({ headlineBusiness: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] focus:border-[#00DF8F] text-white text-xs outline-none font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Subheadline Paragraph</label>
                    <textarea
                      rows={3}
                      value={hero.subheadlineBusiness}
                      onChange={(e) => updateHero({ subheadlineBusiness: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] focus:border-[#00DF8F] text-white text-xs outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Personal Mode Copy */}
                <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0D95FE]">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span className="font-bold uppercase">Personal Mode (Individual Door)</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Hero Headline</label>
                    <input
                      type="text"
                      value={hero.headlinePersonal}
                      onChange={(e) => updateHero({ headlinePersonal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs outline-none font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Subheadline Paragraph</label>
                    <textarea
                      rows={3}
                      value={hero.subheadlinePersonal}
                      onChange={(e) => updateHero({ subheadlinePersonal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* CTAs and Disclosures */}
              <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white">Call to Action Labels &amp; Trust Footnote</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2]">Primary Button Text</label>
                    <input
                      type="text"
                      value={hero.ctaTextPrimary}
                      onChange={(e) => updateHero({ ctaTextPrimary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2]">Secondary Button Text</label>
                    <input
                      type="text"
                      value={hero.ctaTextSecondary}
                      onChange={(e) => updateHero({ ctaTextSecondary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#7B9CD2]">CBN Trust Line / Compliance Sentence</label>
                  <textarea
                    rows={2}
                    value={hero.trustLine}
                    onChange={(e) => updateHero({ trustLine: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    showToast('Hero settings saved successfully!');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#00DF8F] hover:bg-[#00c77f] text-[#003825] font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                >
                  Save &amp; Apply Live Changes
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: 4-STEP ONBOARDING GET-STARTED MANAGER */}
          {/* ========================================================= */}
          {activeTab === 'get-started' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#14294F] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                    STICKY VIEWPORT SCROLL EXPERIENCE
                  </span>
                  <h1 className="text-2xl font-black text-white">4-Step Onboarding Flow</h1>
                </div>
                <button
                  onClick={() => {
                    resetSteps();
                    showToast('Reset all 4 steps to original defaults!');
                  }}
                  className="px-3 py-1.5 text-xs text-[#A8BBD6] hover:text-[#EF4444] border border-[#14294F] rounded-xl cursor-pointer"
                >
                  Reset Steps Default
                </button>
              </div>

              {/* Step Tab Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {steps.map((s) => {
                  const isSelected = selectedStepNum === s.num;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setSelectedStepNum(s.num)}
                      className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-lg shadow-[#0D95FE]/10'
                          : 'bg-[#05112A] border-[#14294F] hover:border-[#7B9CD2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#0D95FE]">0{s.num}.</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: s.accent || '#0D95FE' }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white truncate">{s.tag}</span>
                      <span className="text-[10px] text-[#7B9CD2] truncate">{s.user.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Detailed Editor */}
              <div className="p-6 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#0D95FE] text-[#00284D] font-mono text-xs font-bold">
                      Step 0{selectedStep.num}
                    </span>
                    <span>Configuration Panel</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7B9CD2]">Accent Color:</span>
                    <input
                      type="color"
                      value={selectedStep.accent}
                      onChange={(e) => updateStep(selectedStep.num, { accent: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Step Sub-Tag</label>
                    <input
                      type="text"
                      value={selectedStep.tag}
                      onChange={(e) => updateStep(selectedStep.num, { tag: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2] font-semibold">Step Title</label>
                    <input
                      type="text"
                      value={selectedStep.title}
                      onChange={(e) => updateStep(selectedStep.num, { title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#7B9CD2] font-semibold">Full Description Text</label>
                  <textarea
                    rows={3}
                    value={selectedStep.desc}
                    onChange={(e) => updateStep(selectedStep.num, { desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none leading-relaxed"
                  />
                </div>

                {/* Testimonial Grounding Box */}
                <div className="p-4 rounded-xl bg-[#020B1D] border border-[#14294F] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                      Grounding Real Merchant Testimonial
                    </span>
                    <span className="text-[10px] text-[#7B9CD2]">Shown below step card</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-[#7B9CD2]">Person Name</label>
                      <input
                        type="text"
                        value={selectedStep.user.name}
                        onChange={(e) =>
                          updateStep(selectedStep.num, {
                            user: { ...selectedStep.user, name: e.target.value },
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-[#05112A] border border-[#14294F] text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-[#7B9CD2]">Location / City</label>
                      <input
                        type="text"
                        value={selectedStep.user.location}
                        onChange={(e) =>
                          updateStep(selectedStep.num, {
                            user: { ...selectedStep.user, location: e.target.value },
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-[#05112A] border border-[#14294F] text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-[#7B9CD2]">Merchant Photo URL</label>
                      <input
                        type="text"
                        value={selectedStep.user.photo}
                        onChange={(e) =>
                          updateStep(selectedStep.num, {
                            user: { ...selectedStep.user, photo: e.target.value },
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-[#05112A] border border-[#14294F] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#7B9CD2]">Customer Quote</label>
                    <input
                      type="text"
                      value={selectedStep.user.comment}
                      onChange={(e) =>
                        updateStep(selectedStep.num, {
                          user: { ...selectedStep.user, comment: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#05112A] border border-[#14294F] text-xs text-white italic"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => showToast(`Step 0${selectedStep.num} changes synced!`)}
                    className="px-5 py-2 rounded-xl bg-[#0D95FE] text-[#002447] font-bold text-xs cursor-pointer hover:bg-[#0C84E4]"
                  >
                    Save Step 0{selectedStep.num}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: STREET MERCHANTS */}
          {/* ========================================================= */}
          {activeTab === 'merchants' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14294F] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                    HUMAN GROUNDING PROFILES
                  </span>
                  <h1 className="text-2xl font-black text-white">Street Merchants &amp; Stories</h1>
                </div>
                <button
                  onClick={() => {
                    const newId = `merchant-${Date.now()}`;
                    setEditingMerchant({
                      id: newId,
                      name: 'New Trader Name',
                      role: 'Grain & Provisions Merchant',
                      location: 'Kurmi Market, Kano',
                      image: '/merchants/bilkisu.jpg',
                      quote: 'Axoora helped our business scale without debt.',
                      statLabel: 'Weekly Inflow',
                      statValue: '₦5.2M',
                      accentColor: '#00DF8F',
                      badge: 'New Verified Trader',
                      featured: true,
                    });
                    setIsNewMerchant(true);
                  }}
                  className="px-4 py-2 bg-[#00DF8F] text-[#003825] font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg hover:bg-[#00c77f]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add New Merchant</span>
                </button>
              </div>

              {/* Merchant Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {merchants.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col justify-between gap-3 relative"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#0D95FE]/40 shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-white truncate">{m.name}</h4>
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${m.accentColor}25`, color: m.accentColor }}
                          >
                            {m.badge}
                          </span>
                        </div>
                        <span className="text-xs text-[#0D95FE] font-medium">{m.role}</span>
                        <span className="text-[11px] text-[#7B9CD2]">{m.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#A8BBD6] italic bg-[#020B1D] p-3 rounded-xl border border-[#14294F]/60">
                      "{m.quote}"
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-[#14294F]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#7B9CD2] uppercase font-mono">{m.statLabel}:</span>
                        <span className="text-xs font-bold text-white font-mono">{m.statValue}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingMerchant(m);
                            setIsNewMerchant(false);
                          }}
                          className="px-2.5 py-1 bg-[#0A1B3D] hover:bg-[#0D95FE]/20 text-[#0D95FE] text-xs rounded-lg cursor-pointer transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete merchant ${m.name}?`)) {
                              deleteMerchant(m.id);
                              showToast('Merchant deleted');
                            }
                          }}
                          className="px-2 py-1 text-[#EF4444] hover:bg-[#EF4444]/20 text-xs rounded-lg cursor-pointer transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editing Modal / Drawer */}
              {editingMerchant && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#05112A] border border-[#14294F] rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#14294F] pb-3">
                      <h3 className="font-extrabold text-white text-base">
                        {isNewMerchant ? 'Add New Merchant' : 'Edit Merchant Profile'}
                      </h3>
                      <button
                        onClick={() => setEditingMerchant(null)}
                        className="text-[#7B9CD2] hover:text-white cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Full Name</label>
                        <input
                          type="text"
                          value={editingMerchant.name}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, name: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Role / Business</label>
                        <input
                          type="text"
                          value={editingMerchant.role}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, role: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Location / Market</label>
                        <input
                          type="text"
                          value={editingMerchant.location}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, location: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Image Path / URL</label>
                        <input
                          type="text"
                          value={editingMerchant.image}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, image: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-[#7B9CD2]">Customer Quote</label>
                      <textarea
                        rows={2}
                        value={editingMerchant.quote}
                        onChange={(e) => setEditingMerchant({ ...editingMerchant, quote: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Stat Label</label>
                        <input
                          type="text"
                          value={editingMerchant.statLabel}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, statLabel: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Stat Value</label>
                        <input
                          type="text"
                          value={editingMerchant.statValue}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, statValue: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#7B9CD2]">Badge Tag</label>
                        <input
                          type="text"
                          value={editingMerchant.badge}
                          onChange={(e) => setEditingMerchant({ ...editingMerchant, badge: e.target.value })}
                          className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-[#14294F]">
                      <button
                        onClick={() => setEditingMerchant(null)}
                        className="px-4 py-2 rounded-xl text-xs text-[#A8BBD6] hover:bg-[#0A1B3D] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (isNewMerchant) {
                            addMerchant(editingMerchant);
                            showToast('Added new merchant to public view!');
                          } else {
                            updateMerchant(editingMerchant.id, editingMerchant);
                            showToast('Updated merchant profile!');
                          }
                          setEditingMerchant(null);
                        }}
                        className="px-5 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-xs cursor-pointer"
                      >
                        Save Merchant
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: PRODUCTS & POS TERMINALS */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div className="border-b border-[#14294F] pb-4">
                <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                  CATALOG &amp; HARDWARE TARIFFS
                </span>
                <h1 className="text-2xl font-black text-white">Financial Products &amp; Terminals</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#0D95FE] font-bold">
                          {p.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/20 text-[#00DF8F] text-[10px] font-mono">
                          {p.status}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-white">{p.name}</h3>
                      <p className="text-xs text-[#00DF8F] font-semibold">{p.headline}</p>
                    </div>

                    <p className="text-xs text-[#A8BBD6] leading-relaxed">{p.description}</p>

                    <div className="p-2.5 rounded-xl bg-[#020B1D] border border-[#14294F] flex flex-col gap-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7B9CD2]">Fee Structure:</span>
                        <span className="font-mono text-white font-bold">{p.feeStructure}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7B9CD2]">Highlight:</span>
                        <span className="font-mono text-[#0D95FE]">{p.highlight}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: WAITLIST LEADS & DEVICE REQUESTS (DATA TABLE) */}
          {/* ========================================================= */}
          {activeTab === 'leads' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              <WaitlistDataTable onShowToast={showToast} />
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: ARTICLES & GUIDES */}
          {/* ========================================================= */}
          {activeTab === 'journal' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14294F] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#0D95FE] uppercase font-bold">
                    KNOWLEDGE BASE &amp; PRESS
                  </span>
                  <h1 className="text-2xl font-black text-white">Journal Articles &amp; Fintech Guides</h1>
                </div>
                <button
                  onClick={() => {
                    const newArticle = {
                      id: `art-${Date.now()}`,
                      category: 'Guides' as const,
                      title: 'How to choose between dual-SIM Apex POS and mobile softPOS',
                      summary: 'A complete merchant guide comparing hardware reliability and multi-network failover in bustling Nigerian markets.',
                      readTime: '5 min read',
                      date: 'October 2026',
                      author: 'Axoora Research',
                    };
                    addArticle(newArticle);
                    showToast('New article published to Journal!');
                  }}
                  className="px-4 py-2 bg-[#0D95FE] text-[#002447] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg hover:bg-[#0C84E4]"
                >
                  <span className="material-symbols-outlined text-[16px]">post_add</span>
                  <span>Publish New Article</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {articles.map((art) => (
                  <div key={art.id} className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#0D95FE]/20 text-[#0D95FE] text-[10px] font-mono uppercase font-bold">
                          {art.category}
                        </span>
                        <span className="text-[11px] text-[#7B9CD2] font-mono">{art.readTime} • {art.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{art.title}</h4>
                      <p className="text-xs text-[#A8BBD6] line-clamp-1">{art.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const updated = prompt('Edit article title:', art.title);
                          if (updated) {
                            updateArticle(art.id, { title: updated });
                            showToast('Article title updated!');
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] text-xs text-[#0D95FE] border border-[#14294F] cursor-pointer"
                      >
                        Quick Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete article: ${art.title}?`)) {
                            deleteArticle(art.id);
                            showToast('Article removed');
                          }
                        }}
                        className="p-1.5 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/20 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: SETTINGS & COMPLIANCE */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              <div className="border-b border-[#14294F] pb-4">
                <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold">
                  REGULATORY &amp; HOTLINE CREDENTIALS
                </span>
                <h1 className="text-2xl font-black text-white">Compliance, Support &amp; Security</h1>
              </div>

              <div className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified_user</span>
                  <span>Central Bank of Nigeria &amp; NDIC Disclosures</span>
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#7B9CD2]">Official Licensed Name</label>
                  <input
                    type="text"
                    disabled
                    value="AXOORA Financial Technologies Limited"
                    className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#A8BBD6]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2]">Official WhatsApp Bot Hotline</label>
                    <input
                      type="text"
                      disabled
                      value="+234 911 000 2966"
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-[#00DF8F] font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#7B9CD2]">Maitama Headquarters</label>
                    <input
                      type="text"
                      disabled
                      value="Cappador Mall, Maitama, Abuja, Nigeria"
                      className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#05112A] border border-[#EF4444]/30 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-[#EF4444] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span>Database State Diagnostics</span>
                </h3>
                <p className="text-xs text-[#A8BBD6] leading-relaxed">
                  All edits to the hero, onboarding flow, street merchant cards, products, and articles are stored instantly in browser LocalStorage. You can reset to clean factory defaults anytime.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all CMS customizations back to original code defaults?')) {
                        resetAllCmsData();
                        showToast('All CMS records cleared and restored to default!');
                      }
                    }}
                    className="px-4 py-2 bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-[#EF4444] border border-[#EF4444]/50 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Clear All CMS Storage &amp; Restore Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
