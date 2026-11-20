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
      className={`w-full border-t transition-colors font-['DM_Sans',sans-serif] ${
        isLight
          ? 'bg-[#f7f9fb] border-[#dde3ea] text-[#161c22]'
          : 'bg-[#020F2E] border-slate-800 text-[#F2F5F9]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-16 pb-12 flex flex-col gap-11">
        {/* 4 Navigation Columns matching Figma node 3216:693 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-14 w-full text-left">
          {/* Column 1: Products */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-sm tracking-tight text-[#161c22] dark:text-white">
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
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Savings
              </button>
              <button
                type="button"
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Ajo
              </button>
              <button
                type="button"
                onClick={() => handleNav('personal')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Axoora Mall
              </button>
            </div>
          </div>

          {/* Column 2: Using Axoora */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-sm tracking-tight text-[#161c22] dark:text-white">
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
                onClick={() => handleNav('help')}
                className="text-left hover:text-blue-600 dark:hover:text-white transition cursor-pointer"
              >
                Fees
              </button>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-bold text-sm tracking-tight text-[#161c22] dark:text-white">
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
            <h4 className="font-bold text-sm tracking-tight text-[#161c22] dark:text-white">
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

        {/* Legal & Compliance Meta line matching Figma node 3216:718 */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#4c5866] dark:text-slate-400">
          <p>Axoora Financial Technologies Limited · axoora.ai</p>
          <p className="text-xs text-slate-500">
            Regulated payment rails. Customer deposits eligible for statutory NDIC insurance.
          </p>
        </div>

        {/* Logo Lockup */}
        <div className="pt-2">
          <AxooraLogo size="sm" theme="auto" />
        </div>
      </div>
    </footer>
  );
};
