import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenOnboarding: () => void;
  onOpenLogin: () => void;
  onOpenTransfer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenOnboarding,
  onOpenLogin,
  onOpenTransfer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; screen: ScreenType }[] = [
    { label: 'Personal', screen: 'personal' },
    { label: 'Business', screen: 'business-treasury' },
    { label: 'POS Agents', screen: 'pos-agents' },
    { label: 'WhatsApp AI', screen: 'whatsapp-ai' },
    { label: 'Ajo Vaults', screen: 'ajo-vaults' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020F2E]/90 backdrop-blur-xl border-b border-[#14294F]">
      <div className="h-20 w-full px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Rail Indicator */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('personal')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <img
              alt="Axoora Logo"
              className="h-8 w-auto object-contain"
              src={BRAND_LOGO_URL}
              onError={(e) => {
                // styled fallback container if hotlink fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#F2F5F9]">
              Axoora<span className="text-[#0D95FE]">.ai</span>
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-[#0A1B3D] border border-[#14294F]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DF8F]"></span>
            </span>
            <span className="text-[11px] text-[#00DF8F] uppercase tracking-wider font-semibold font-mono">
              CBN PSSP Rail
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#14294F] text-[#F2F5F9]'
                    : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#0A1B3D]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenTransfer}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#14294F] bg-[#0A1B3D] text-xs font-semibold text-[#6FBDFE] hover:bg-[#14294F] transition-all"
            title="Instant NIP Interbank Transfer"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Send Money</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg border border-[#14294F] bg-[#0A1B3D] text-sm font-semibold text-[#F2F5F9] hover:bg-[#14294F] transition-all"
          >
            Login
          </button>

          <button
            onClick={onOpenOnboarding}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-[#0D95FE] text-sm text-[#00325b] font-bold hover:bg-[#00DF8F] hover:text-[#003825] transition-all"
          >
            Get Started Free
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-[#0A1B3D] border border-[#14294F] flex items-center justify-center text-[#F2F5F9]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#020F2E] border-b border-[#14294F] px-4 py-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => {
                  onNavigate(item.screen);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#14294F] text-[#0D95FE]'
                    : 'text-[#A8BBD6] hover:bg-[#0A1B3D] hover:text-[#F2F5F9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#14294F] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTransfer();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#0A1B3D] border border-[#14294F] text-sm font-semibold text-[#0D95FE] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Instant NIP Transfer</span>
            </button>
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg border border-[#14294F] bg-[#0A1B3D] text-sm font-semibold text-[#F2F5F9]"
            >
              Login to Vault
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
