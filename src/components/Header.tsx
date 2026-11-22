'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';
import { AxooraLogo } from './AxooraLogo';
import { useTheme } from '../context/ThemeContext';
import { PersonalNavHeroType } from '../context/NavigationContext';
import { User, Briefcase, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
  homeMode?: 'business' | 'personal';
  onHomeModeChange?: (mode: 'business' | 'personal') => void;
  personalHeroNav?: PersonalNavHeroType;
  onPersonalHeroNavChange?: (hero: PersonalNavHeroType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  homeMode = 'personal',
  onHomeModeChange,
  personalHeroNav = 'send',
  onPersonalHeroNavChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBusiness = homeMode === 'business' || currentScreen === 'business';

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroNav = (nav: PersonalNavHeroType) => {
    onPersonalHeroNavChange?.(nav);
    if (isBusiness) {
      onHomeModeChange?.('personal');
    }
    if (currentScreen !== 'home' && currentScreen !== 'personal') {
      onNavigate('home');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMode = (mode: 'personal' | 'business') => {
    onHomeModeChange?.(mode);
    if (mode === 'business') {
      onNavigate('business');
    } else {
      onNavigate('personal');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? isLight
            ? 'bg-[#f7f9fb]/95 backdrop-blur-md border-b border-[#dde3ea] shadow-xs'
            : 'bg-[#020F2E]/95 backdrop-blur-md border-b border-slate-800 shadow-xs'
          : isLight
          ? 'bg-[#f7f9fb] border-b border-transparent'
          : 'bg-[#020F2E] border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] h-[80px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between font-['DM_Sans',sans-serif]">
        {/* Left: Brand Lockup Logo */}
        <div className="flex items-center gap-10">
          <button
            onClick={() => handleNav('home')}
            className="cursor-pointer focus:outline-none flex items-center shrink-0"
            aria-label="Axoora Home"
          >
            {isLight ? (
              <img src="/brand/lockup-light.svg" alt="Axoora" width={132} height={33} className="h-[33.206px] w-[132px] block" />
            ) : (
              <AxooraLogo size="md" theme="auto" />
            )}
          </button>

          {/* Desktop Navigation Links matching Figma node 3216:645 */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-normal text-[#343e4a] dark:text-slate-300">
            {!isBusiness ? (
              <>
                <button
                  type="button"
                  onClick={() => handleHeroNav('send')}
                  className={`transition cursor-pointer relative py-1 ${
                    !isBusiness && personalHeroNav === 'send'
                      ? 'font-bold text-[#0976da] dark:text-[#53a8f5]'
                      : 'hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroNav('cards')}
                  className={`transition cursor-pointer relative py-1 ${
                    !isBusiness && personalHeroNav === 'cards'
                      ? 'font-bold text-[#0976da] dark:text-[#53a8f5]'
                      : 'hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroNav('savings')}
                  className={`transition cursor-pointer relative py-1 ${
                    !isBusiness && personalHeroNav === 'savings'
                      ? 'font-bold text-[#0976da] dark:text-[#53a8f5]'
                      : 'hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  Savings
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroNav('ajo')}
                  className={`transition cursor-pointer relative py-1 ${
                    !isBusiness && personalHeroNav === 'ajo'
                      ? 'font-bold text-[#0976da] dark:text-[#53a8f5]'
                      : 'hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  Ajo
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroNav('mall')}
                  className={`transition cursor-pointer relative py-1 ${
                    !isBusiness && personalHeroNav === 'mall'
                      ? 'font-bold text-[#0976da] dark:text-[#53a8f5]'
                      : 'hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  Mall
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('help')}
                  className="hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
                >
                  Help
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('business')}
                  className="hover:text-blue-600 dark:hover:text-white transition cursor-pointer font-medium"
                >
                  Payouts
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('business')}
                  className="hover:text-blue-600 dark:hover:text-white transition cursor-pointer font-medium"
                >
                  Pricing
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('help')}
                  className="hover:text-blue-600 dark:hover:text-white transition cursor-pointer font-medium"
                >
                  Help
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Right: Audience Toggle matching Figma node 3167:1007 */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-[#eef1f5] dark:bg-slate-800 p-1 rounded-full items-center shadow-inner">
            <button
              type="button"
              onClick={() => handleToggleMode('personal')}
              className={`flex items-center gap-2 h-10 px-[18px] rounded-full text-base transition-all cursor-pointer ${
                !isBusiness
                  ? 'bg-white dark:bg-slate-900 font-bold text-[#161c22] dark:text-white shadow-sm'
                  : 'font-medium text-[#4c5866] dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode('business')}
              className={`flex items-center gap-2 h-10 px-[18px] rounded-full text-base transition-all cursor-pointer ${
                isBusiness
                  ? 'bg-white dark:bg-slate-900 font-bold text-[#161c22] dark:text-white shadow-sm'
                  : 'font-medium text-[#4c5866] dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Business</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f7f9fb] dark:bg-[#020F2E] border-b border-[#dde3ea] dark:border-slate-800 px-6 py-6 font-['DM_Sans',sans-serif]"
          >
            {/* Mobile Mode Switcher */}
            <div className="flex bg-[#eef1f5] dark:bg-slate-800 p-1 rounded-full items-center mb-6">
              <button
                type="button"
                onClick={() => handleToggleMode('personal')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                  !isBusiness
                    ? 'bg-white dark:bg-slate-900 text-[#161c22] dark:text-white shadow-sm'
                    : 'text-[#4c5866] dark:text-slate-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Personal</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleMode('business')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                  isBusiness
                    ? 'bg-white dark:bg-slate-900 text-[#161c22] dark:text-white shadow-sm'
                    : 'text-[#4c5866] dark:text-slate-400'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Business</span>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-4 text-base font-medium text-[#161c22] dark:text-white mb-6">
              {!isBusiness ? (
                <>
                  <button onClick={() => handleHeroNav('send')} className={`text-left py-1 ${personalHeroNav === 'send' ? 'text-[#0976da] font-bold' : 'hover:text-blue-600'}`}>Send (Bank on WhatsApp)</button>
                  <button onClick={() => handleHeroNav('cards')} className={`text-left py-1 ${personalHeroNav === 'cards' ? 'text-[#0976da] font-bold' : 'hover:text-blue-600'}`}>Cards (Naira & USD)</button>
                  <button onClick={() => handleHeroNav('savings')} className={`text-left py-1 ${personalHeroNav === 'savings' ? 'text-[#0976da] font-bold' : 'hover:text-blue-600'}`}>Savings (Non-Interest)</button>
                  <button onClick={() => handleHeroNav('ajo')} className={`text-left py-1 ${personalHeroNav === 'ajo' ? 'text-[#0976da] font-bold' : 'hover:text-blue-600'}`}>Ajo & Pay Circles</button>
                  <button onClick={() => handleHeroNav('mall')} className={`text-left py-1 ${personalHeroNav === 'mall' ? 'text-[#0976da] font-bold' : 'hover:text-blue-600'}`}>Axoora Mall</button>
                  <button onClick={() => handleNav('help')} className="text-left py-1 hover:text-blue-600">Help & Support</button>
                  <button onClick={() => handleNav('about')} className="text-left py-1 hover:text-blue-600">About Us</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleNav('business')} className="text-left py-1 hover:text-blue-600">Bulk Payouts</button>
                  <button onClick={() => handleNav('business')} className="text-left py-1 hover:text-blue-600">Commercial Pricing</button>
                  <button onClick={() => handleNav('help')} className="text-left py-1 hover:text-blue-600">Business Help Desk</button>
                  <button onClick={() => handleNav('about')} className="text-left py-1 hover:text-blue-600">About Axoora</button>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadApp?.();
                }}
                className="w-full py-3 bg-[#161c22] dark:bg-white text-white dark:text-[#161c22] rounded-xl font-bold text-center text-sm"
              >
                Get Mobile App
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-3 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-center text-sm"
              >
                Start on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
