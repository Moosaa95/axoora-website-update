'use client';

import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { WaitlistModal } from './WaitlistModal';
import { WhatsAppBankingModal } from './WhatsAppBankingModal';
import { AppDownloadModal } from './AppDownloadModal';
import { LiveChatBubble } from './LiveChatBubble';
import { ReadingProgressBar } from './ReadingProgressBar';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentScreen,
    navigate,
    openWaitlist,
    openWhatsApp,
    closeWhatsApp,
    isWhatsAppOpen,
    openDownloadApp,
    closeDownloadApp,
    isDownloadAppOpen,
    waitlistInterest,
    homeMode,
    setHomeMode,
  } = useNavigation();

  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const isMinimalLayout = currentScreen === 'admin' || currentScreen === 'apply';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans w-full max-w-full transition-colors duration-200 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-[#0D95FE]/20 selection:text-slate-900'
          : 'bg-[#020F2E] text-[#F2F5F9] selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]'
      }`}
    >
      {/* Reading Progress Indicator */}
      {!isMinimalLayout && <ReadingProgressBar currentScreen={currentScreen} />}

      {/* Cookie Consent Banner */}
      {!isMinimalLayout && <CookieBanner />}

      {/* Top Header Navigation */}
      {!isMinimalLayout && (
        <Header
          currentScreen={currentScreen}
          onNavigate={navigate}
          onOpenWaitlist={openWaitlist}
          onOpenWhatsApp={openWhatsApp}
          onOpenDownloadApp={openDownloadApp}
          homeMode={homeMode}
          onHomeModeChange={setHomeMode}
        />
      )}

      {/* Main Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer on Every Page */}
      {!isMinimalLayout && (
        <Footer
          onNavigate={navigate}
          onOpenWaitlist={() => openWaitlist('personal')}
          onOpenWhatsApp={openWhatsApp}
        />
      )}

      {/* Interactive Priority Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        defaultInterest={waitlistInterest}
      />

      {/* WhatsApp Conversational Banking Demo Modal */}
      <WhatsAppBankingModal
        isOpen={isWhatsAppOpen}
        onClose={closeWhatsApp}
        onOpenWaitlist={() => {
          closeWhatsApp();
          openWaitlist('personal');
        }}
      />

      {/* Mobile App Download Modal */}
      <AppDownloadModal
        isOpen={isDownloadAppOpen}
        onClose={closeDownloadApp}
        onOpenWaitlist={() => {
          closeDownloadApp();
          openWaitlist('personal');
        }}
      />

      {/* Live Priority Chat Floating Widget */}
      {!isMinimalLayout && (
        <LiveChatBubble
          onOpenWaitlist={openWaitlist}
          onOpenWhatsApp={openWhatsApp}
        />
      )}
    </div>
  );
};
