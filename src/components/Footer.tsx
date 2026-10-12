import React from 'react';
import { ScreenType } from '../types';
import { AxooraLogo } from './AxooraLogo';
import { useTheme } from '../context/ThemeContext';
import { AppleAppStoreBadge, GooglePlayBadge } from './StoreBadges';

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
      className={`w-full border-t transition-colors ${
        isLight
          ? 'bg-slate-900 text-white border-slate-800'
          : 'bg-[#010817] text-[#F2F5F9] border-[#14294F]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Regulatory Statement */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <AxooraLogo size="lg" theme="dark" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400">
                  Microfinance Bank
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Axoora Microfinance Bank Limited is authorised and regulated by the Central Bank of Nigeria to offer banking services. Deposits are insured by the Nigerian Deposit Insurance Corporation (NDIC).
            </p>

            {/* App Store Buttons (Official Authentic Badges) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <AppleAppStoreBadge
                onClick={onOpenWaitlist}
                isLight={false}
                className="!py-2 !px-3"
              />
              <GooglePlayBadge
                onClick={onOpenWaitlist}
                isLight={false}
                className="!py-2 !px-3"
              />
            </div>

            <div className="text-xs text-slate-400 pt-3 space-y-1">
              <p className="font-semibold text-slate-300">Plot 7A, Block 4, Admiralty Road,</p>
              <p>Lekki Phase 1, Lagos State, Nigeria.</p>
              <p className="pt-1 font-mono text-blue-400">+234 201 888 9990</p>
              <p className="font-mono text-slate-400">support@axoora.com</p>
            </div>
          </div>

          {/* Column 2: For Business */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">For Business</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button onClick={() => handleNav('business')} className="text-left hover:text-white transition-colors cursor-pointer">
                Business Account
              </button>
              <button onClick={() => handleNav('business')} className="text-left hover:text-white transition-colors cursor-pointer">
                Point of Sale Terminal
              </button>
              <button onClick={() => handleNav('business')} className="text-left hover:text-white transition-colors cursor-pointer">
                Stock Float
              </button>
              <button onClick={() => handleNav('business')} className="text-left hover:text-white transition-colors cursor-pointer">
                Expense Card
              </button>
              <button onClick={() => handleNav('business')} className="text-left hover:text-white transition-colors cursor-pointer">
                Axoora Book
              </button>
            </div>
          </div>

          {/* Column 3: For Personal */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">For Personal</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button onClick={() => handleNav('personal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Instant Debit Card
              </button>
              <button onClick={() => handleNav('personal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Personal Account
              </button>
              <button onClick={() => handleNav('personal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Payment
              </button>
              <button onClick={() => handleNav('personal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Personal Banking
              </button>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button onClick={() => handleNav('about')} className="text-left hover:text-white transition-colors cursor-pointer">
                About Us
              </button>
              <button onClick={() => handleNav('impact')} className="text-left hover:text-white transition-colors cursor-pointer">
                Culture
              </button>
              <button onClick={() => handleNav('careers')} className="text-left hover:text-white transition-colors cursor-pointer">
                Join Our Team
              </button>
              <button onClick={() => handleNav('journal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Press &amp; Media
              </button>
              <button onClick={() => handleNav('contact')} className="text-left hover:text-white transition-colors cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>

          {/* Column 5: Resources */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Resources</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button onClick={() => handleNav('journal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Blog
              </button>
              <button onClick={() => handleNav('help')} className="text-left hover:text-white transition-colors cursor-pointer">
                Help Centre
              </button>
              <button onClick={() => handleNav('legal')} className="text-left hover:text-white transition-colors cursor-pointer">
                Whistleblower Policy
              </button>
              <button onClick={() => handleNav('legal')} className="text-left hover:text-white transition-colors cursor-pointer">
                IMS Policy
              </button>
              <button onClick={() => handleNav('security')} className="text-left hover:text-white transition-colors cursor-pointer">
                Security Trust Center
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Axoora Microfinance Bank. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('legal')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('legal')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Cookie Policy
            </button>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold">
              <span>🇳🇬</span>
              <span>Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
