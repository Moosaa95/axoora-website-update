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
  onOpenDownloadApp: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
}

interface ProductItem {
  id: ScreenType;
  title: string;
  badge?: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
}

interface QuickSearchItem {
  title: string;
  category: 'Products' | 'Company' | 'Actions';
  screen?: ScreenType;
  action?: () => void;
  description: string;
  icon: string;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'products' | 'company' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Detect scroll state for dynamic glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for Quick Jump (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus search input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  const handleMenuEnter = (menu: 'products' | 'company') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = theme === 'light';

  const productsList: ProductItem[] = [
    {
      id: 'personal',
      title: 'Axoora AI (Personal)',
      tagline: 'Consumer Banking & Lifestyle',
      description: 'Dual-currency debit card, Halal Save & Earn, Paycircle thrift, and conversational WhatsApp banking.',
      icon: 'account_balance_wallet',
      accent: isLight ? '#00875A' : '#00DF8F',
    },
    {
      id: 'business',
      title: 'Axoora Business',
      tagline: 'Merchant Accounts & Expense Ops',
      description: 'Standard accounts for your shop, multi-user corporate cards, instant POS settlement, and non-interest stock financing.',
      icon: 'storefront',
      accent: isLight ? '#006FDB' : '#0D95FE',
    },
    {
      id: 'pos-agents',
      title: 'POS & Aggregator',
      tagline: 'Terminals & Cash Float Rails',
      description: '4G dual-SIM Android terminals with 99.8% uptime, instant agent float, and sub-agent fleet portal.',
      icon: 'point_of_sale',
      accent: isLight ? '#B45309' : '#F2A93B',
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
      desc: 'Architectural briefs and payment switch design',
      icon: 'article',
    },
    {
      screen: 'careers' as ScreenType,
      label: 'Careers',
      desc: 'Open engineering, product, and operations roles in Maitama',
      icon: 'work',
    },
    {
      screen: 'help' as ScreenType,
      label: 'Help & Security',
      desc: '24/7 priority support, FAQs, and NDIC deposit safety',
      icon: 'help',
    },
  ];

  // Search catalogue for Quick Jump
  const searchItems: QuickSearchItem[] = [
    {
      title: 'Axoora AI — Personal Banking',
      category: 'Products',
      screen: 'personal',
      description: 'Dual-currency cards, halal savings, Paycircle ajo, WhatsApp banking',
      icon: 'account_balance_wallet',
    },
    {
      title: 'Axoora Business — For the Shop',
      category: 'Products',
      screen: 'business',
      description: 'Corporate cards, inventory financing, instant invoices',
      icon: 'storefront',
    },
    {
      title: 'POS & Aggregator Fleet',
      category: 'Products',
      screen: 'pos-agents',
      description: 'Smart Android terminals, sub-agent management, 2-sec settlement',
      icon: 'point_of_sale',
    },
    {
      title: 'Impact & Sustainable Finance',
      category: 'Company',
      screen: 'impact',
      description: 'Our non-interest financial inclusion model and 36-state coverage',
      icon: 'eco',
    },
    {
      title: 'About Axoora',
      category: 'Company',
      screen: 'about',
      description: 'Founding thesis, Abuja headquarters, CBN licensing credentials',
      icon: 'corporate_fare',
    },
    {
      title: 'Customer Stories',
      category: 'Company',
      screen: 'stories',
      description: 'Real testimonials from northern traders, students, and merchants',
      icon: 'forum',
    },
    {
      title: 'Engineering Journal',
      category: 'Company',
      screen: 'journal',
      description: 'Idempotent NIBSS payment rails, offline settlement, zero-interest ledger',
      icon: 'article',
    },
    {
      title: 'Help Centre & FAQs',
      category: 'Company',
      screen: 'help',
      description: 'Common questions, dispute resolutions, and safety guidelines',
      icon: 'help',
    },
    {
      title: 'Press & Media Announcements',
      category: 'Company',
      screen: 'press',
      description: 'Official press releases and coverage',
      icon: 'campaign',
    },
    {
      title: 'Careers at Axoora',
      category: 'Company',
      screen: 'careers',
      description: 'Join our team in Maitama, Abuja or work remotely',
      icon: 'work',
    },
    {
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'Actions',
      action: () => {
        setSearchOpen(false);
        toggleTheme();
      },
      description: theme === 'dark' ? 'Switch to clean, bright light appearance' : 'Switch to institutional deep navy appearance',
      icon: theme === 'dark' ? 'light_mode' : 'dark_mode',
    },
    {
      title: 'Bank on WhatsApp',
      category: 'Actions',
      action: () => {
        setSearchOpen(false);
        onOpenWhatsApp();
      },
      description: 'Start banking instantly via verified WhatsApp bot',
      icon: 'chat',
    },
    {
      title: 'Join Early Access Waitlist',
      category: 'Actions',
      action: () => {
        setSearchOpen(false);
        onOpenWaitlist();
      },
      description: 'Secure priority invitation for card issuance and accounts',
      icon: 'how_to_reg',
    },
    {
      title: 'Download Axoora Mobile App',
      category: 'Actions',
      action: () => {
        setSearchOpen(false);
        onOpenDownloadApp();
      },
      description: 'Available for iOS and Android devices',
      icon: 'download',
    },
  ];

  const filteredSearchItems = searchQuery.trim()
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchItems;

  const isProductActive = ['personal', 'business', 'pos-agents'].includes(currentScreen);
  const isCompanyActive = ['about', 'impact', 'stories', 'journal', 'careers', 'press', 'events', 'help'].includes(
    currentScreen
  );

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#020F2E]/92 backdrop-blur-2xl border-b border-[#14294F]/90 shadow-xl shadow-black/20'
            : 'bg-[#020F2E]/75 backdrop-blur-xl border-b border-[#14294F]/60'
        }`}
      >
        <div
          className={`w-full px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D95FE] rounded-lg group cursor-pointer"
              aria-label="Axoora Home"
            >
              <AxooraLogo size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* Home link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-[#F2F5F9] ${
                currentScreen === 'home' ? 'text-[#F2F5F9] font-semibold' : 'text-[#A8BBD6]'
              }`}
            >
              Home
              {currentScreen === 'home' && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0D95FE] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Products Megamenu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('products')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
                aria-expanded={activeMenu === 'products'}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg flex items-center gap-1.5 hover:text-[#F2F5F9] ${
                  isProductActive ? 'text-[#F2F5F9] font-semibold' : 'text-[#A8BBD6]'
                }`}
              >
                <span>Products</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    activeMenu === 'products' ? 'rotate-180 text-[#0D95FE]' : ''
                  }`}
                >
                  keyboard_arrow_down
                </span>
                {isProductActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0D95FE] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              {/* Products Megamenu Flyout */}
              <AnimatePresence>
                {activeMenu === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#0A1B3D]/95 backdrop-blur-2xl border border-[#14294F] rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="px-3 pt-1 pb-2 border-b border-[#14294F]/80 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8BBD6]/80 font-semibold">
                          Financial Solutions &amp; Channels
                        </span>
                        <span className="text-[11px] text-[#00DF8F] font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]"></span>
                          Zero-Interest Architecture
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {productsList.map((product) => {
                          const isActive = currentScreen === product.id;
                          return (
                            <button
                              key={product.id}
                              onClick={() => handleNavClick(product.id)}
                              className={`group text-left p-3 rounded-xl transition-all flex items-start gap-3.5 cursor-pointer border ${
                                isActive
                                  ? 'bg-[#14294F]/70 border-[#0D95FE]/40'
                                  : 'hover:bg-[#14294F]/40 border-transparent hover:border-[#14294F]'
                              }`}
                            >
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                                style={{
                                  backgroundColor: `${product.accent}18`,
                                  color: product.accent,
                                  border: `1px solid ${product.accent}30`,
                                }}
                              >
                                <span className="material-symbols-outlined text-[20px]">
                                  {product.icon}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-semibold text-sm text-[#F2F5F9] group-hover:text-white flex items-center gap-1.5">
                                    {product.title}
                                  </span>
                                  <span className="material-symbols-outlined text-[16px] text-[#A8BBD6] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                                    arrow_forward
                                  </span>
                                </div>
                                <p className="text-xs text-[#A8BBD6] leading-relaxed mt-0.5">
                                  {product.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* WhatsApp Banking Quick Door inside Products */}
                      <div className="mt-1 pt-3 border-t border-[#14294F]/80 flex items-center justify-between px-3 py-2 bg-[#020F2E]/60 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]/30">
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#F2F5F9]">
                              Bank with Axoora AI on WhatsApp
                            </span>
                            <span className="text-[11px] text-[#A8BBD6] block">
                              Transfers, balance &amp; bills without app installation
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveMenu(null);
                            onOpenWhatsApp();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#00DF8F]/15 hover:bg-[#00DF8F] text-[#00DF8F] hover:text-[#003825] text-xs font-semibold transition-all cursor-pointer border border-[#00DF8F]/30"
                        >
                          Launch Chat
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Impact direct link */}
            <button
              onClick={() => handleNavClick('impact')}
              className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-[#F2F5F9] ${
                currentScreen === 'impact' ? 'text-[#F2F5F9] font-semibold' : 'text-[#A8BBD6]'
              }`}
            >
              Impact
              {currentScreen === 'impact' && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0D95FE] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Company Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('company')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === 'company' ? null : 'company')}
                aria-expanded={activeMenu === 'company'}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg flex items-center gap-1.5 hover:text-[#F2F5F9] ${
                  isCompanyActive ? 'text-[#F2F5F9] font-semibold' : 'text-[#A8BBD6]'
                }`}
              >
                <span>Company</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    activeMenu === 'company' ? 'rotate-180 text-[#0D95FE]' : ''
                  }`}
                >
                  keyboard_arrow_down
                </span>
                {isCompanyActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0D95FE] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              {/* Company Dropdown Flyout */}
              <AnimatePresence>
                {activeMenu === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[460px] bg-[#0A1B3D]/95 backdrop-blur-2xl border border-[#14294F] rounded-2xl shadow-2xl p-4 z-50"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="px-3 pt-1 pb-2 border-b border-[#14294F]/80 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8BBD6]/80 font-semibold">
                          About Axoora &amp; Community
                        </span>
                        <span className="text-[11px] text-[#A8BBD6] font-mono">
                          Maitama, Abuja
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {companyNav.map((item) => {
                          const isActive = currentScreen === item.screen;
                          return (
                            <button
                              key={item.screen}
                              onClick={() => handleNavClick(item.screen)}
                              className={`text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer border ${
                                isActive
                                  ? 'bg-[#14294F]/70 border-[#0D95FE]/40'
                                  : 'hover:bg-[#14294F]/40 border-transparent hover:border-[#14294F]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[18px] text-[#0D95FE] shrink-0 mt-0.5">
                                {item.icon}
                              </span>
                              <div>
                                <span className="font-semibold text-xs text-[#F2F5F9] block">
                                  {item.label}
                                </span>
                                <span className="text-[11px] text-[#A8BBD6] leading-tight block line-clamp-1 mt-0.5">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Doors & Quick Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Jump / Search Trigger (⌘K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#14294F] bg-[#0A1B3D]/70 text-xs text-[#A8BBD6] hover:text-[#F2F5F9] hover:border-[#0D95FE]/50 transition-all cursor-pointer"
              title="Search and jump to any page (⌘K)"
              aria-label="Quick search navigation"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span className="hidden xl:inline text-[#A8BBD6]">Quick jump</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#14294F] text-[#A8BBD6] border border-[#14294F]">
                ⌘K
              </kbd>
            </button>

            {/* Light / Dark Mode Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#14294F] bg-[#0A1B3D]/70 text-[#A8BBD6] hover:text-[#F2F5F9] hover:border-[#0D95FE]/50 transition-all cursor-pointer relative"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-[19px] text-[#0D95FE]"
              >
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </motion.span>
            </button>

            {/* Bank with Axoora AI on WhatsApp */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#00DF8F]/40 bg-[#00DF8F]/10 text-xs font-semibold text-[#00DF8F] hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer shadow-sm shadow-[#00DF8F]/10"
              title="Bank with Axoora AI on WhatsApp"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span className="hidden lg:inline">Bank on WhatsApp</span>
              <span className="lg:hidden">WhatsApp</span>
            </button>

            {/* Primary CTA: Join Waitlist */}
            <button
              onClick={() => onOpenWaitlist()}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0D95FE] text-xs sm:text-sm text-[#002242] font-bold hover:bg-[#00DF8F] hover:text-[#003825] transition-all cursor-pointer shadow-md shadow-[#0D95FE]/20 hover:shadow-[#00DF8F]/30 active:scale-95"
            >
              Join Waitlist
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#F2F5F9] hover:bg-[#14294F] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden border-t border-[#14294F] bg-[#020F2E] px-4 py-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                {/* Search Bar for Mobile */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#A8BBD6]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search products, FAQs, company..."
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    readOnly
                    className="w-full bg-[#0A1B3D] border border-[#14294F] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#F2F5F9] cursor-pointer"
                  />
                </div>

                {/* Primary Products Section */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8BBD6] font-semibold">
                      Products &amp; Accounts
                    </span>
                    <span className="text-[10px] text-[#00DF8F] font-mono">0% Interest</span>
                  </div>

                  <button
                    onClick={() => handleNavClick('home')}
                    className={`text-left p-3 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                      currentScreen === 'home'
                        ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]/50'
                        : 'bg-[#0A1B3D]/70 text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#0D95FE]">
                      home
                    </span>
                    <span className="text-sm font-semibold text-[#F2F5F9]">Home Overview</span>
                  </button>

                  {productsList.map((product) => {
                    const isActive = currentScreen === product.id;
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleNavClick(product.id)}
                        className={`text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]/50'
                            : 'bg-[#0A1B3D]/70 text-[#A8BBD6] hover:text-[#F2F5F9]'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${product.accent}20`,
                            color: product.accent,
                          }}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {product.icon}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[#F2F5F9] block">
                            {product.title}
                          </span>
                          <span className="text-[11px] text-[#A8BBD6] block mt-0.5 line-clamp-1">
                            {product.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Company & Inclusion Links */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#14294F]/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8BBD6] font-semibold mb-1">
                    Company &amp; Community
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {companyNav.map((item) => (
                      <button
                        key={item.screen}
                        onClick={() => handleNavClick(item.screen)}
                        className={`text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                          currentScreen === item.screen
                            ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]/40'
                            : 'bg-[#0A1B3D]/50 text-[#A8BBD6] hover:text-[#F2F5F9]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#0D95FE]">
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons for Mobile */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-[#14294F]/80">
                  {/* Theme Switcher Row in Mobile Drawer */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#0A1B3D] border border-[#14294F]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#14294F] flex items-center justify-center text-[#0D95FE]">
                        <span className="material-symbols-outlined text-[18px]">
                          {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#F2F5F9] block">
                          Appearance
                        </span>
                        <span className="text-[11px] text-[#A8BBD6]">
                          {theme === 'dark' ? 'Dark Mode (Deep Navy)' : 'Light Mode (Clean Slate)'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14294F] border border-[#1E3A6B] text-xs font-semibold text-[#F2F5F9] hover:border-[#0D95FE]/50 transition-all cursor-pointer"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#0D95FE]">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                      </span>
                      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenWhatsApp();
                    }}
                    className="w-full py-3 rounded-xl bg-[#00DF8F]/15 border border-[#00DF8F] text-xs font-bold text-[#00DF8F] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Bank with Axoora AI on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenDownloadApp();
                      }}
                      className="py-2.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] text-xs font-semibold text-[#A8BBD6] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Get App</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenWaitlist();
                      }}
                      className="py-2.5 rounded-xl bg-[#0D95FE] text-xs font-bold text-[#002242] flex items-center justify-center cursor-pointer shadow-md shadow-[#0D95FE]/20"
                    >
                      Join Waitlist
                    </button>
                  </div>

                  {/* Institutional Regulatory Footnote */}
                  <div className="pt-2 text-center text-[11px] font-mono text-[#A8BBD6]/70">
                    AXOORA · CBN Licensed · NDIC Insured Deposits
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Jump / Search Modal (⌘K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl bg-[#0A1B3D] border border-[#14294F] rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#14294F] bg-[#020F2E]/60">
                <span className="material-symbols-outlined text-[20px] text-[#0D95FE]">search</span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Jump to a product, feature, or page... (e.g. cards, POS, impact)"
                  className="flex-1 bg-transparent text-sm text-[#F2F5F9] placeholder-[#A8BBD6]/60 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#A8BBD6] hover:text-white cursor-pointer px-1"
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#14294F] text-[#A8BBD6] border border-[#14294F]">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Results List */}
              <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-1">
                {filteredSearchItems.length === 0 ? (
                  <div className="py-12 text-center text-[#A8BBD6] text-xs">
                    No results found for &ldquo;{searchQuery}&rdquo;. Try &ldquo;card&rdquo;, &ldquo;POS&rdquo;, or &ldquo;impact&rdquo;.
                  </div>
                ) : (
                  filteredSearchItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.screen) {
                          handleNavClick(item.screen);
                        }
                      }}
                      className="group text-left p-3 rounded-xl hover:bg-[#14294F]/60 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#14294F] text-[#0D95FE] group-hover:bg-[#0D95FE] group-hover:text-[#002242] flex items-center justify-center shrink-0 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            {item.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-xs text-[#F2F5F9] group-hover:text-white block truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#A8BBD6] truncate block mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-[#A8BBD6]/70 uppercase">
                          {item.category}
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-[#A8BBD6] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                          arrow_forward
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-2.5 bg-[#020F2E]/80 border-t border-[#14294F] flex items-center justify-between text-[11px] text-[#A8BBD6]/80 font-mono">
                <span>Axoora Navigation</span>
                <span>Select to navigate</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
