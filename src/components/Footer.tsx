'use client';

import React from 'react';
import { ScreenType } from '../types';
import { AxooraLogo } from './AxooraLogo';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWaitlist: () => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`w-full transition-colors font-['DM_Sans',sans-serif] ${
        isLight
          ? 'bg-[#f7f9fb] text-[#161c22]'
          : 'bg-[#020F2E] border-slate-800 text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-[60px] pb-12 flex flex-col gap-11">
        {/* 4 Navigation Columns matching Figma node 3216:693 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-14 w-full text-left">
          {/* Column 1: Products */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-[15px] leading-[22px] text-[#161c22] dark:text-white">
              Products
            </h4>
            <div className="flex flex-col gap-3 text-[15px] text-[#4c5866] dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Current Account
              </button>
              <button
                type="button"
                onClick={() => handleNav('cards')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => handleNav('savings')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Savings &amp; Ajo
              </button>
              <button
                type="button"
                onClick={() => handleNav('business')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Axoora Business
              </button>
              <button
                type="button"
                onClick={() => handleNav('pricing')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Pricing &amp; Payouts
              </button>
            </div>
          </div>

          {/* Column 2: Using Axoora */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-[15px] leading-[22px] text-[#161c22] dark:text-white">
              Using Axoora
            </h4>
            <div className="flex flex-col gap-3 text-[15px] text-[#4c5866] dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Getting Started
              </button>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Refer a Friend
              </button>
              <button
                type="button"
                onClick={() => handleNav('security')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Security
              </button>
              <button
                type="button"
                onClick={() => handleNav('fees')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Fees
              </button>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-[15px] leading-[22px] text-[#161c22] dark:text-white">
              Company
            </h4>
            <div className="flex flex-col gap-3 text-[15px] text-[#4c5866] dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleNav('about')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => handleNav('careers')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Careers
              </button>
              <button
                type="button"
                onClick={() => handleNav('press')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Press
              </button>
            </div>
          </div>

          {/* Column 4: Help */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-[15px] leading-[22px] text-[#161c22] dark:text-white">
              Help
            </h4>
            <div className="flex flex-col gap-3 text-[15px] text-[#4c5866] dark:text-slate-400">
              <button
                type="button"
                onClick={() => handleNav('help')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Support
              </button>
              <button
                type="button"
                onClick={() => handleNav('help')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Status
              </button>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleNav('help')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Complaints
              </button>
            </div>
          </div>
        </div>

        {/* Legal meta line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[15px] leading-[22px] text-[#4c5866] dark:text-slate-400">
          <p>Axoora Financial Technologies Limited · axoora.ai</p>
          <p>Licence and deposit-protection statement to be supplied.</p>
        </div>

        {/* Logo Lockup */}
        <div>
          {isLight ? (
            <img src="/brand/lockup-light.svg" alt="Axoora" width={96} height={24} className="h-[24.15px] w-[96px] block" />
          ) : (
            <AxooraLogo size="sm" theme="auto" />
          )}
        </div>
      </div>
    </footer>
  );
};
