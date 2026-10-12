import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { AxooraLogo } from './AxooraLogo';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
}

interface ProductItem {
  id: ScreenType;
  title: string;
  badge?: string;
  badgeColor?: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  highlights: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  homeMode = 'business',
  onHomeModeChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'products' | 'company' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'products' | 'company') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setActiveMenu(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productsList: ProductItem[] = [
    {
      id: 'personal',
      title: 'Axoora Personal',
      badge: 'Zero Transfer Fees',
      badgeColor: '#00DF8F',
      tagline: 'Consumer Banking & Lifestyle',
      description: 'Dual-currency debit card that never declines, Halal Save & Earn, Paycircle Ajo thrift, and conversational WhatsApp banking.',
      icon: 'account_balance_wallet',
      accent: isLight ? '#00875A' : '#00DF8F',
      highlights: ['Virtual Dollar & Naira Cards', '0% Riba Savings Vault', 'WhatsApp Assistant'],
    },
    {
      id: 'business',
      title: 'Axoora Business',
      badge: 'Dedicated NUBAN',
      badgeColor: '#0D95FE',
      tagline: 'Merchant Accounts & Expense Ops',
      description: 'Dedicated commercial NUBAN for your shop, multi-user expense cards, automated invoice reconciliations, and zero-interest stock float.',
      icon: 'storefront',
      accent: isLight ? '#006FDB' : '#0D95FE',
      highlights: ['Instant Sub-2s Settlement', 'Multi-Store Expense Cards', 'Inventory Trade Rails'],
    },
    {
      id: 'pos-agents',
      title: 'Axoora POS Terminals',
      badge: 'Hardware & Agency',
      badgeColor: '#F2A93B',
      tagline: 'Apex Dual-SIM 4G Terminals & Float',
      description: 'Rugged Android POS terminals with 99.98% uptime, instant agent cash float, multi-operator SIM failover, and sub-agent fleet portal.',
      icon: 'point_of_sale',
      accent: isLight ? '#B45309' : '#F2A93B',
      highlights: ['Dual-SIM MTN/Airtel 4G', 'Sub-2s NIBSS Settlement', '48hr Doorstep Dispatch'],
    },
  ];

  const companyNav = [
    {
      screen: 'about' as ScreenType,
      label: 'About Us',
      desc: 'Our thesis, leadership, and Abuja headquarters',
      icon: 'corporate_fare',
    },
    {
      screen: 'impact' as ScreenType,
      label: 'Impact & Inclusion',
      desc: 'Sustainable, non-interest financial inclusion across 36 states',
      icon: 'eco',
    },
    {
      screen: 'stories' as ScreenType,
      label: 'Customer Stories',
      desc: 'Real voices of traders, students, and agents',
      icon: 'forum',
    },
    {
      screen: 'journal' as ScreenType,
      label: 'Engineering Journal',
      desc: 'Idempotent NIBSS rails, offline POS buffer, zero-interest ledger',
      icon: 'article',
    },
    {
      screen: 'careers' as ScreenType,
      label: 'Careers',
      desc: 'Join our team at Cappador Mall, Maitama, Abuja',
      icon: 'work',
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isLight
          ? isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-900'
            : 'bg-white border-b border-slate-200 text-slate-900'
          : isScrolled
          ? 'bg-[#020F2E]/95 backdrop-blur-md border-b border-[#14294F] shadow-xl text-[#F2F5F9]'
          : 'bg-[#020F2E] border-b border-[#14294F]/80 text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Business / Personal Segmented Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => handleNav('business')}
            className="cursor-pointer focus:outline-none flex items-center shrink-0"
            aria-label="Axoora Business"
          >
            <div className="sm:hidden">
              <AxooraLogo size="sm" theme="auto" />
            </div>
            <div className="hidden sm:block">
              <AxooraLogo size="md" theme="auto" />
            </div>
          </button>

          {/* Primary Business / Personal Segmented Switcher right next to logo */}
          <div
            className={`flex items-center p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border transition-colors ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0A1B3D] border-[#14294F]'
            }`}
          >
            <button
              onClick={() => handleNav('business')}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                currentScreen === 'business'
                  ? 'bg-[#0D95FE] text-white shadow-md shadow-[#0D95FE]/25'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">storefront</span>
              <span>Business</span>
            </button>

            <button
              onClick={() => handleNav('personal')}
              className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                currentScreen === 'personal'
                  ? 'bg-[#00DF8F] text-[#003825] shadow-md shadow-[#00DF8F]/25'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">person</span>
              <span>Personal</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">
          {/* Products Megamenu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNav('personal')}
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                ['personal', 'business', 'pos-agents'].includes(currentScreen)
                  ? isLight
                    ? 'text-[#0D95FE] bg-blue-50 font-bold'
                    : 'text-[#0D95FE] bg-[#0A1B3D]'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#0A1B3D]/60'
              }`}
            >
              <span>Products</span>
              <span className="material-symbols-outlined text-[16px] xl:text-[18px]">
                {activeMenu === 'products' ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Products Megamenu Flyout */}
            <AnimatePresence>
              {activeMenu === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 mt-2 w-[540px] rounded-3xl border-2 shadow-2xl p-4 flex flex-col gap-2 z-50 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
                      : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] shadow-black/60'
                  }`}
                >
                  <div
                    className={`px-3 pt-2 pb-1 border-b flex items-center justify-between text-xs font-mono ${
                      isLight ? 'border-slate-200 text-slate-500' : 'border-[#14294F]/80 text-[#A8BBD6]'
                    }`}
                  >
                    <span>FINANCIAL SOLUTIONS &amp; HARDWARE</span>
                    <span className={isLight ? 'text-emerald-600 font-bold' : 'text-[#00DF8F]'}>
                      3 Channels
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    {productsList.map((product) => {
                      const isActive = currentScreen === product.id;
                      return (
                        <button
                          key={product.id}
                          onClick={() => handleNav(product.id)}
                          className={`w-full p-3.5 rounded-2xl text-left flex items-start gap-4 transition-all cursor-pointer ${
                            isActive
                              ? isLight
                                ? 'bg-blue-50/80 border border-blue-300'
                                : 'bg-[#14294F] border border-[#0D95FE]/40'
                              : isLight
                              ? 'hover:bg-slate-50 border border-transparent'
                              : 'hover:bg-[#14294F]/60 border border-transparent'
                          }`}
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              backgroundColor: `${product.accent}20`,
                              color: product.accent,
                            }}
                          >
                            <span className="material-symbols-outlined text-[24px]">
                              {product.icon}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-extrabold text-sm ${
                                  isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                                }`}
                              >
                                {product.title}
                              </span>
                              {product.badge && (
                                <span
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                                  style={{
                                    backgroundColor: `${product.badgeColor}25`,
                                    color: product.badgeColor,
                                  }}
                                >
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-0.5 line-clamp-1 ${
                                isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                              }`}
                            >
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {product.highlights.map((h, i) => (
                                <span
                                  key={i}
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                                    isLight
                                      ? 'bg-slate-100 text-slate-700'
                                      : 'bg-[#020F2E] text-[#A8BBD6]'
                                  }`}
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Company Megamenu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNav('about')}
              className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                ['about', 'impact', 'stories', 'journal', 'careers'].includes(currentScreen)
                  ? isLight
                    ? 'text-[#0D95FE] bg-blue-50 font-bold'
                    : 'text-[#0D95FE] bg-[#0A1B3D]'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#0A1B3D]/60'
              }`}
            >
              <span>Company</span>
              <span className="material-symbols-outlined text-[16px] xl:text-[18px]">
                {activeMenu === 'company' ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Company Megamenu Flyout */}
            <AnimatePresence>
              {activeMenu === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 mt-2 w-[340px] rounded-3xl border-2 shadow-2xl p-3 flex flex-col gap-1 z-50 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
                      : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] shadow-black/60'
                  }`}
                >
                  {companyNav.map((item) => (
                    <button
                      key={item.screen}
                      onClick={() => handleNav(item.screen)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                        currentScreen === item.screen
                          ? isLight
                            ? 'bg-blue-50 text-[#0D95FE]'
                            : 'bg-[#14294F] text-[#F2F5F9]'
                          : isLight
                          ? 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                          : 'hover:bg-[#14294F]/60 text-[#A8BBD6] hover:text-[#F2F5F9]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[#0D95FE] text-[20px] mt-0.5">
                        {item.icon}
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`font-bold text-xs sm:text-sm ${
                            isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`text-[11px] line-clamp-1 ${
                            isLight ? 'text-slate-500' : 'text-[#A8BBD6]'
                          }`}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Help Link */}
          <button
            onClick={() => handleNav('help')}
            className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              currentScreen === 'help'
                ? isLight
                  ? 'text-[#0D95FE] bg-blue-50 font-bold'
                  : 'text-[#0D95FE] bg-[#0A1B3D]'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#0A1B3D]/60'
            }`}
          >
            Help &amp; FAQs
          </button>

          {/* Legal & Governance */}
          <button
            onClick={() => handleNav('legal')}
            className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
              ['legal', 'contact', 'security', 'governance'].includes(currentScreen)
                ? isLight
                  ? 'text-[#0D95FE] bg-blue-50 font-bold'
                  : 'text-[#0D95FE] bg-[#0A1B3D]'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#0A1B3D]/60'
            }`}
          >
            Legal
          </button>
        </nav>

        {/* Right Action Elements */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-[#0A1B3D] hover:bg-[#14294F] border-[#14294F] text-[#F2F5F9]'
            }`}
            aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[19px]">
              {isLight ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* WhatsApp Instant Banking Quick Trigger (Shown on wide desktop where there is plenty of room) */}
          <button
            onClick={onOpenWhatsApp}
            className={`hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold text-xs transition-all cursor-pointer shrink-0 ${
              isLight
                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-[#00DF8F]/15 hover:bg-[#00DF8F]/25 border-[#00DF8F]/30 text-[#00DF8F]'
            }`}
            title="Chat directly with Axoora AI on WhatsApp"
          >
            <span className="material-symbols-outlined text-[17px]">chat</span>
            <span>WhatsApp Banking</span>
          </button>

          {/* Primary CTA: Open Account (Hidden on small mobile < sm to keep navbar clean and responsive, prominently available in mobile menu) */}
          <button
            onClick={() => onOpenWaitlist(currentScreen === 'pos-agents' ? 'pos-agent' : 'business')}
            className="hidden sm:inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-[#0D95FE]/25 cursor-pointer active:scale-98 whitespace-nowrap shrink-0"
          >
            Open an account
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 sm:p-2.5 rounded-xl border cursor-pointer shrink-0 flex items-center justify-center transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9] hover:bg-[#14294F]'
            }`}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 py-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-xl'
              : 'bg-[#0A1B3D] border-[#14294F] text-[#F2F5F9]'
          }`}
        >
          {/* Primary Business vs Personal Selector for Mobile */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#020F2E] border border-slate-200 dark:border-[#14294F]">
            <button
              onClick={() => handleNav('business')}
              className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                currentScreen === 'business'
                  ? 'bg-[#0D95FE] text-white shadow-md'
                  : 'text-slate-600 dark:text-[#A8BBD6]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Business</span>
            </button>
            <button
              onClick={() => handleNav('personal')}
              className={`py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                currentScreen === 'personal'
                  ? 'bg-[#00DF8F] text-[#003825] shadow-md'
                  : 'text-slate-600 dark:text-[#A8BBD6]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>Personal</span>
            </button>
          </div>

          {/* Quick Theme Switcher Row in Mobile Drawer */}
          <div
            className={`flex items-center justify-between p-3 rounded-2xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020F2E]/70 border-[#14294F]'
            }`}
          >
            <span className="text-xs font-semibold">Theme</span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isLight
                  ? 'bg-white border border-slate-300 text-slate-800 shadow-xs'
                  : 'bg-[#14294F] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isLight ? 'dark_mode' : 'light_mode'}
              </span>
              <span>{isLight ? 'Switch to Dark' : 'Switch to Light'}</span>
            </button>
          </div>

          {/* Products Section */}
          <div className="flex flex-col gap-2">
            <span
              className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                isLight ? 'text-blue-600' : 'text-[#0D95FE]'
              }`}
            >
              Products &amp; Hardware
            </span>
            {productsList.map((product) => {
              const isActive = currentScreen === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => handleNav(product.id)}
                  className={`w-full p-3 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isActive
                      ? isLight
                        ? 'bg-blue-50 border border-blue-300'
                        : 'bg-[#14294F] border border-[#0D95FE]'
                      : isLight
                      ? 'bg-slate-50 border border-slate-200'
                      : 'bg-[#020F2E]/70 border border-[#14294F]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[#00DF8F] text-[22px] mt-0.5">
                    {product.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold text-sm ${
                          isLight ? 'text-slate-900' : 'text-[#F2F5F9]'
                        }`}
                      >
                        {product.title}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00DF8F]/20 text-[#00DF8F]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        isLight ? 'text-slate-600' : 'text-[#A8BBD6]'
                      }`}
                    >
                      {product.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Company Links */}
          <div
            className={`flex flex-col gap-2 pt-2 border-t ${
              isLight ? 'border-slate-200' : 'border-[#14294F]'
            }`}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                isLight ? 'text-blue-600' : 'text-[#0D95FE]'
              }`}
            >
              Company
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {companyNav.map((c) => (
                <button
                  key={c.screen}
                  onClick={() => handleNav(c.screen)}
                  className={`p-2.5 rounded-lg text-left font-medium border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      : 'bg-[#020F2E]/70 border-[#14294F] text-[#F2F5F9]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex flex-col gap-2 pt-2 border-t ${
              isLight ? 'border-slate-200' : 'border-[#14294F]'
            }`}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full py-3 rounded-xl bg-[#00DF8F] text-[#003825] font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Open WhatsApp Banking</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist(currentScreen === 'pos-agents' ? 'pos-agent' : 'business');
              }}
              className="w-full py-3 rounded-xl bg-[#0D95FE] text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Open an account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
