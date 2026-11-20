'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Users,
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Zap,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Eye,
  EyeOff,
  User,
  Briefcase,
  Store,
  Bell,
  RefreshCw,
  Building,
  Check,
  ChevronRight,
  Plane,
  Ticket,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';

export interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  homeMode = 'personal',
  onHomeModeChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Toggle between Personal and Business direction
  const [activeSegment, setActiveSegment] = useState<'personal' | 'business'>(
    homeMode === 'business' ? 'business' : 'personal'
  );

  const handleSegmentChange = (segment: 'personal' | 'business') => {
    setActiveSegment(segment);
    onHomeModeChange?.(segment);
  };

  // State for interactive phone mockup in Personal Hero
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'send' | 'chat' | 'circles' | 'savings'>('home');

  // Business Batch Simulation state
  const [batchApproved, setBatchApproved] = useState(false);

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight
          ? 'bg-[#f7f9fb] text-[#161c22]'
          : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ─── Top Audience Selector Pill ─── */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account Type
          </span>
        </div>

        {/* Clean Pill Toggle matching Figma node 3167:1007 */}
        <div className="bg-[#eef1f5] dark:bg-slate-800 p-1 rounded-full flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => handleSegmentChange('personal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeSegment === 'personal'
                ? 'bg-white dark:bg-slate-900 text-[#161c22] dark:text-white shadow-sm'
                : 'text-[#4c5866] dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal</span>
          </button>
          <button
            type="button"
            onClick={() => handleSegmentChange('business')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeSegment === 'business'
                ? 'bg-white dark:bg-slate-900 text-[#161c22] dark:text-white shadow-sm'
                : 'text-[#4c5866] dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Business</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSegment === 'personal' ? (
          /* ═══════════════════════════════════════════════════════════
             PERSONAL SHOWCASE DIRECTION (Figma A1 · Home)
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {/* ─── Hero Section ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 pb-12">
              <div className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-12 lg:px-16 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                {/* Left Column: Bold Human Copy */}
                <div className="lg:col-span-7 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-center">
                  <h1 className="text-[64px] sm:text-[80px] lg:text-[92px] font-bold leading-[0.92] tracking-[-0.04em] mb-6 select-none">
                    Send.<br />
                    Pay.<br />
                    Save.<br />
                    Spend.
                  </h1>

                  <p className="text-lg sm:text-[20px] text-[#d6ebff] font-normal leading-relaxed max-w-lg mb-8">
                    One account for all of it. In the app or on WhatsApp.
                  </p>

                  {/* Dual Action Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Get the App Button */}
                    <button
                      type="button"
                      onClick={onOpenDownloadApp}
                      className="bg-white text-[#161c22] h-[54px] px-6 rounded-[10px] font-medium text-base flex items-center gap-3.5 hover:bg-slate-100 active:scale-98 transition shadow-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {/* Apple Logo SVG */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.73-7.91-12.1-14.52-6.52-9.87-11.66-21.2-15.42-34-3.75-12.79-5.63-25.04-5.63-36.75 0-15.45 3.79-28.16 11.37-38.12 7.58-9.97 17.06-15.06 28.44-15.28 4.8.12 10.3 1.29 16.51 3.52 6.22 2.23 10.42 3.38 12.61 3.46 1.83 0 6.07-1.15 12.72-3.46 6.64-2.31 12.19-3.43 16.63-3.37 12.98.67 23.36 5.56 31.14 14.67-11.39 6.89-16.96 16.48-16.71 28.77.25 9.77 4.02 17.84 11.31 24.23 7.29 6.39 16.03 10.15 26.22 11.27-2.31 6.88-5.26 14.15-8.86 21.81zM119.22 33.15c0-7.29 2.58-14.18 7.74-20.67 5.16-6.49 11.59-10.74 19.3-12.75.44 1.13.68 2.29.72 3.49.03 1.19.05 2.23.05 3.12 0 7.42-2.73 14.39-8.19 20.91-5.46 6.52-12.12 10.45-19.98 11.78-.22-1.99-.44-3.95-.64-5.88z" />
                        </svg>
                        {/* Google Play Logo SVG */}
                        <svg className="w-4 h-4" viewBox="0 0 512 512">
                          <path fill="#4285F4" d="M48.7 18.2C43.2 24.1 40 33.2 40 44.8v422.4c0 11.6 3.2 20.7 8.7 26.6l1.5 1.5 240.2-240.2v-6.2L50.2 16.7l-1.5 1.5z" />
                          <path fill="#FBBC04" d="M371.4 332.1l-81-81v-6.2l81-81 1.7 1 96.2 54.7c27.5 15.6 27.5 41.2 0 56.8l-96.2 54.7-1.7 1z" />
                          <path fill="#EA4335" d="M373.1 331.1L290.4 248.4 48.7 493.8c9 9.5 23.8 10.7 40.5 1.3l283.9-164z" />
                          <path fill="#34A853" d="M373.1 174.9L89.2 13.9C72.5 4.5 57.7 5.7 48.7 15.2L290.4 260.6l82.7-85.7z" />
                        </svg>
                      </div>
                      <span>Get the app</span>
                    </button>

                    {/* Start on WhatsApp Button */}
                    <button
                      type="button"
                      onClick={onOpenWhatsApp}
                      className="border-[1.5px] border-white text-white h-[54px] px-6 rounded-[10px] font-bold text-base flex items-center gap-2.5 hover:bg-white/10 active:scale-98 transition cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Start on WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Fidelity Phone Showcase */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-[310px] sm:w-[324px] h-[580px] bg-[#161c22] rounded-t-[44px] p-2 pt-2.5 shadow-2xl flex flex-col">
                    <div className="w-full h-full bg-white rounded-t-[36px] overflow-hidden text-[#161c22] flex flex-col font-['IBM_Plex_Sans',sans-serif]">
                      {/* Mobile Status Bar */}
                      <div className="h-9 px-5 flex items-center justify-between text-xs font-semibold text-[#161c22] border-b border-slate-50">
                        <span>9:41</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">●●●●</span>
                          <span className="text-xs">100%</span>
                        </div>
                      </div>

                      {/* Header row with Avatar & Tier */}
                      <div className="px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#043e97] text-white flex items-center justify-center font-bold text-xs">
                            AB
                          </div>
                          <span className="font-semibold text-xs text-[#161c22]">
                            Hi, Adaeze
                          </span>
                          <span className="bg-[#f7f9fb] text-[#5c6877] text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-slate-100">
                            Tier 3
                          </span>
                        </div>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-full bg-[#eef1f5] flex items-center justify-center text-slate-700 hover:bg-slate-200 transition"
                          title="Notifications"
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Balance area */}
                      <div className="px-4 pt-3 pb-2 flex flex-col items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-700">₦</span>
                          <span className="text-2xl font-bold tracking-tight text-[#161c22]">
                            {hideBalance ? '••••••••' : '112,430.00'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setHideBalance(!hideBalance)}
                            className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                          >
                            {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                        <span className="text-[11px] text-[#4c5866]">Available Balance</span>
                      </div>

                      {/* Quick Action Circles */}
                      <div className="px-5 py-3 grid grid-cols-4 gap-2 text-center">
                        <button
                          type="button"
                          onClick={() => onOpenWaitlist('personal')}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#eef1f5] group-hover:bg-blue-50 group-hover:text-[#043e97] flex items-center justify-center transition">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-medium text-[#4c5866]">Send</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenWaitlist('personal')}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#eef1f5] group-hover:bg-blue-50 group-hover:text-[#043e97] flex items-center justify-center transition">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-medium text-[#4c5866]">Add</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenWaitlist('personal')}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#eef1f5] group-hover:bg-blue-50 group-hover:text-[#043e97] flex items-center justify-center transition">
                            <Users className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-medium text-[#4c5866]">Circles</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenWaitlist('personal')}
                          className="flex flex-col items-center gap-1 cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#eef1f5] group-hover:bg-blue-50 group-hover:text-[#043e97] flex items-center justify-center transition">
                            <Zap className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-medium text-[#4c5866]">Bills</span>
                        </button>
                      </div>

                      {/* Recent Activities */}
                      <div className="px-4 py-1.5 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-slate-700">Recent</span>
                          <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">View All</span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold flex items-center justify-center">
                                CO
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-900 leading-tight">Chidinma Okafor</span>
                                <span className="text-[9px] text-slate-500">Received · 14:08</span>
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-[#00875a]">+ ₦25,000.00</span>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#043e97] text-[9px] font-bold flex items-center justify-center">
                                IE
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-900 leading-tight">Ikeja Electric</span>
                                <span className="text-[9px] text-slate-500">Sent · 09:20</span>
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-[#161c22]">− ₦8,500.00</span>
                          </div>
                        </div>

                        {/* Pots Mini-cards preview */}
                        <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between text-[9px] text-slate-500">
                              <span>Cards</span>
                              <CreditCard className="w-3 h-3 text-[#043e97]" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-900">$248.10 USD</span>
                          </div>
                          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between text-[9px] text-slate-500">
                              <span>Ajo Pot</span>
                              <Users className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-900">₦85,000.00</span>
                          </div>
                        </div>
                      </div>

                      {/* Mobile App Bottom Nav Bar */}
                      <div className="h-11 bg-white border-t border-slate-100 px-4 flex items-center justify-around text-slate-400">
                        <button
                          type="button"
                          onClick={() => setActiveTab('home')}
                          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-[#043e97]' : ''}`}
                        >
                          <Building className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-semibold">Home</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('send')}
                          className={`flex flex-col items-center ${activeTab === 'send' ? 'text-[#043e97]' : ''}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-semibold">Send</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('chat')}
                          className={`flex flex-col items-center ${activeTab === 'chat' ? 'text-[#043e97]' : ''}`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-semibold">Chat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('savings')}
                          className={`flex flex-col items-center ${activeTab === 'savings' ? 'text-[#043e97]' : ''}`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-semibold">Savings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 5 Core Feature Showcase Tiles ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tile 1: AI Assistant That Knows Your Account */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0976da] flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-[#161c22] dark:text-white tracking-tight mb-3">
                      An Assistant That Knows Your Account
                    </h3>
                    <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed">
                      “You spent ₦48,200 on airtime and data in August.” Straight answers from your own figures, and nothing moves without you.
                    </p>
                  </div>
                </div>

                {/* Tile 2: Ajo and Pay Circle */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-[#00875a] flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-[#161c22] dark:text-white tracking-tight mb-3">
                      Ajo and Pay Circle
                    </h3>
                    <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed">
                      Save with people you trust. Everyone sees who has paid, who is next, and what the payout will be.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2: Cards & Savings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tile 3: Naira and Dollar Cards */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mb-6">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-[#161c22] dark:text-white tracking-tight mb-3">
                      Naira and Dollar Cards
                    </h3>
                    <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed mb-6">
                      Two cards, two balances. Freeze either one in a tap.
                    </p>
                  </div>

                  {/* Card Previews */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between h-28 shadow-sm">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Naira Card</span>
                        <span>NGN</span>
                      </div>
                      <span className="font-mono text-xs font-semibold">•••• 4417</span>
                    </div>
                    <div className="bg-gradient-to-br from-[#043e97] to-[#0976da] text-white rounded-xl p-4 flex flex-col justify-between h-28 shadow-sm">
                      <div className="flex justify-between items-center text-[10px] text-blue-200">
                        <span>Dollar Card</span>
                        <span>$ USD</span>
                      </div>
                      <span className="font-mono text-xs font-semibold">•••• 9120</span>
                    </div>
                  </div>
                </div>

                {/* Tile 4: Non-Interest Savings */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mb-6">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-[28px] font-bold text-[#161c22] dark:text-white tracking-tight mb-3">
                      Non-Interest Savings
                    </h3>
                    <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed mb-6">
                      An expected profit range, not a promised rate, and a statement that shows which investments funded it.
                    </p>
                  </div>

                  <div className="bg-[#f7f9fb] dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#4c5866] dark:text-slate-400 block">Expected Profit Return</span>
                      <span className="text-lg font-bold text-[#00875a]">11.4% – 14.2% p.a.</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                      100% Halal
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Axoora Mall Wide Feature */}
              <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:shadow-md transition">
                <div className="lg:col-span-7">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center mb-6">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-[32px] font-bold text-[#161c22] dark:text-white tracking-tight mb-4">
                    Axoora Mall
                  </h3>
                  <p className="text-base sm:text-lg text-[#4c5866] dark:text-slate-300 leading-relaxed">
                    Flights, hotels and event tickets, paid from your wallet. If a booking fails after you pay, we tell you whether you were charged and when the refund lands.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-[#f7f9fb] dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                        <Plane className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">Lagos (LOS) → Abuja (ABV)</span>
                        <span className="text-[11px] text-slate-500">Air Peace · Instant Ticket E-Pass</span>
                      </div>
                      <span className="text-xs font-bold text-[#043e97] dark:text-blue-400">₦84,500</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xs">
                      <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">Transcorp Hilton Weekend</span>
                        <span className="text-[11px] text-slate-500">Abuja · Instant Booking</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Reserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Send Money Showcase ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#161c22] dark:text-white mb-3">
                  Send Money the Way You Actually Do.
                </h2>
                <p className="text-lg text-[#4c5866] dark:text-slate-300">
                  Right now, on a schedule, or to a whole list at once.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Now */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-[#0976da] transition">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-[#0976da] mb-4">
                      Now
                    </span>
                    <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                      Instant Transfers
                    </h3>
                    <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
                      To any Nigerian bank, in seconds. Settled over NIBSS instant payment rails with zero delays.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" /> Sent · 14:08
                    </span>
                    <span>₦0 Fee</span>
                  </div>
                </div>

                {/* Later */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-[#0976da] transition">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 mb-4">
                      Later
                    </span>
                    <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                      Scheduled and Recurring
                    </h3>
                    <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
                      Rent on the 1st, every month, without thinking about it. We notify you the morning before.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <Clock className="w-4 h-4" /> 1st of Every Month
                    </span>
                    <span>Automated</span>
                  </div>
                </div>

                {/* Many */}
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-[#0976da] transition">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 mb-4">
                      Many
                    </span>
                    <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                      Bulk Payouts
                    </h3>
                    <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed mb-6">
                      Pay your whole team from one file. One single PIN authorization settles the entire payroll.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-indigo-600">
                      <FileSpreadsheet className="w-4 h-4" /> 18 paid · ₦412,000
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSegmentChange('business')}
                      className="text-[#0976da] hover:underline"
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Security Section ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
              <div className="bg-[#161c22] text-white rounded-[28px] p-8 sm:p-14 lg:p-16 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider">
                    Security
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mb-12 max-w-2xl leading-[1.05]">
                  You Always Know Where Your Money Is.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <h4 className="text-lg font-bold">PIN or fingerprint on every payment</h4>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-8">
                      With the verified recipient name and amount clearly displayed on screen before confirmation.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Lock className="w-5 h-5 text-blue-400 shrink-0" />
                      <h4 className="text-lg font-bold">Your BVN stays private</h4>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-8">
                      Used strictly to confirm your identity with NIBSS, never sold, shared, or displayed.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <h4 className="text-lg font-bold">Clear answers when things fail</h4>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-8">
                      Every interbank failure explicitly states whether your balance was debited or held.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <RefreshCw className="w-5 h-5 text-purple-400 shrink-0" />
                      <h4 className="text-lg font-bold">Stalled transfers get a deadline</h4>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-8">
                      Automatically confirmed settled with the beneficiary bank, or reversed to your wallet in 2 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Closing CTA ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#161c22] dark:text-white tracking-tight mb-2">
                  Open Your Account in About Five Minutes.
                </h3>
                <p className="text-[#4c5866] dark:text-slate-400 text-base">
                  Available on iOS, Android, or immediately on WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenDownloadApp}
                  className="bg-[#161c22] text-white hover:bg-black px-6 py-3.5 rounded-[10px] font-semibold text-sm transition shadow-sm cursor-pointer"
                >
                  Get the app
                </button>
                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="border-[1.5px] border-[#161c22] dark:border-white text-[#161c22] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-3.5 rounded-[10px] font-bold text-sm transition flex items-center gap-2 cursor-pointer"
                >
                  Start on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════════════════
             BUSINESS SUITE DIRECTION (Figma BB1 · Business Home)
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {/* ─── Business Hero ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 pb-12">
              <div className="bg-[#161c22] text-white rounded-[28px] overflow-hidden p-8 sm:p-14 lg:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Axoora Business Suite</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.06] mb-6">
                    Pay Everyone at Once. From One File.
                  </h1>

                  <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mb-8">
                    Upload a list, fix the rows that fail, and send the rest. On the commercial account you already have.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onOpenWaitlist('business')}
                      className="bg-blue-600 text-white hover:bg-blue-700 h-[52px] px-7 rounded-[10px] font-bold text-base transition shadow-md cursor-pointer flex items-center gap-2"
                    >
                      Open Business Account
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={onOpenWhatsApp}
                      className="border border-slate-600 text-slate-200 hover:bg-slate-800 h-[52px] px-6 rounded-[10px] font-semibold text-base transition cursor-pointer"
                    >
                      Talk to Business Desk
                    </button>
                  </div>
                </div>

                {/* Right: Interactive Batch File Simulator */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl font-['IBM_Plex_Sans',sans-serif]">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-sm text-white">payroll_oct_2026.csv</span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800">
                      18 Valid Rows
                    </span>
                  </div>

                  <div className="py-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div>
                        <span className="font-bold block text-white">Chidinma Okafor (Staff)</span>
                        <span className="text-slate-400 text-[11px]">0123456789 · GTBank</span>
                      </div>
                      <span className="font-bold text-emerald-400">₦185,000.00</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div>
                        <span className="font-bold block text-white">Musa Okonkwo (Engineer)</span>
                        <span className="text-slate-400 text-[11px]">9876543210 · Zenith Bank</span>
                      </div>
                      <span className="font-bold text-emerald-400">₦220,000.00</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div>
                        <span className="font-bold block text-white">Ibrahim Balogun (Design)</span>
                        <span className="text-slate-400 text-[11px]">5544332211 · Access Bank</span>
                      </div>
                      <span className="font-bold text-emerald-400">₦160,000.00</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Total Batch Payout</span>
                      <span className="text-base font-bold text-white">₦565,000.00</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBatchApproved(!batchApproved)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        batchApproved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {batchApproved ? '✓ Batch Settled' : 'Simulate 1-PIN Approval'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Business 3 Pillars ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
                  One Run, Not Fifty
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#161c22] dark:text-white">
                  Built for Fast Financial Operations.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-6">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                    One File, Every Recipient
                  </h3>
                  <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
                    Add rows by hand, or upload a CSV against our template. The template downloads directly from your dashboard with example rows.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                    Bad Rows Flagged, Not the Batch
                  </h3>
                  <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
                    Every row is checked before anything sends. An invalid account number is isolated on its own; the rest of the batch goes out without interruption.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-6">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#161c22] dark:text-white mb-2">
                    One PIN for the Whole Run
                  </h3>
                  <p className="text-sm text-[#4c5866] dark:text-slate-400 leading-relaxed">
                    You authorize the payout batch once, not 50 times. The batch aggregate sum and beneficiary count are clearly stated on your screen.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Business CTA ─── */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#161c22] dark:text-white tracking-tight mb-2">
                  Payday, in One Go.
                </h3>
                <p className="text-[#4c5866] dark:text-slate-400 text-base">
                  Bulk transfers unlock automatically at Tier 3 business verification.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenWaitlist('business')}
                  className="bg-[#043e97] text-white hover:bg-blue-800 px-6 py-3.5 rounded-[10px] font-bold text-sm transition shadow-sm cursor-pointer"
                >
                  Get Business Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Institutional Regulatory Assurance Banner ─── */}
      <div className="w-full bg-[#eef1f5] dark:bg-slate-900/80 py-4 px-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs text-[#4c5866] dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Axoora Financial Technologies Limited · axoora.ai. Operations governed under Central Bank of Nigeria (CBN) regulatory guidelines. Customer deposit accounts insured up to statutory thresholds by the NDIC.
        </p>
      </div>
    </div>
  );
};
