import { useState } from 'react';
import { ScreenType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { LiveChatBubble } from './components/LiveChatBubble';
import { HomeView } from './components/HomeView';
import { PersonalProductView } from './components/PersonalProductView';
import { BusinessProductView } from './components/BusinessProductView';
import { PosProductView } from './components/PosProductView';
import { AboutView } from './components/AboutView';
import { ImpactView } from './components/ImpactView';
import { StoriesView } from './components/StoriesView';
import { JournalView } from './components/JournalView';
import { PressView } from './components/PressView';
import { EventsView } from './components/EventsView';
import { CareersView } from './components/CareersView';
import { HelpView } from './components/HelpView';
import { LegalContactView } from './components/LegalContactView';
import { WaitlistModal } from './components/WaitlistModal';
import { WhatsAppBankingModal } from './components/WhatsAppBankingModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { ReadingProgressBar } from './components/ReadingProgressBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [homeMode, setHomeMode] = useState<'business' | 'personal'>('business');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistInterest, setWaitlistInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>('personal');
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [downloadAppOpen, setDownloadAppOpen] = useState(false);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWaitlist = (interest: 'personal' | 'business' | 'pos-agent' | 'aggregator' = 'personal') => {
    setWaitlistInterest(interest);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020F2E] text-[#F2F5F9] font-sans selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
      {/* Cookie / Privacy Policy Notification Bar */}
      <CookieBanner onNavigate={handleNavigate} />

      {/* Thin Fixed Top Scroll Progress Bar */}
      <ReadingProgressBar currentScreen={currentScreen} />

      {/* Top Header with Brand and Doors */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenWaitlist={handleOpenWaitlist}
        onOpenWhatsApp={() => setWhatsAppOpen(true)}
        onOpenDownloadApp={() => setDownloadAppOpen(true)}
        homeMode={homeMode}
        onHomeModeChange={setHomeMode}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsAppOpen(true)}
            onOpenDownloadApp={() => setDownloadAppOpen(true)}
            homeMode={homeMode}
            onHomeModeChange={setHomeMode}
          />
        )}

        {currentScreen === 'personal' && (
          <PersonalProductView
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsAppOpen(true)}
          />
        )}

        {currentScreen === 'business' && (
          <BusinessProductView
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsAppOpen(true)}
          />
        )}

        {currentScreen === 'pos-agents' && (
          <PosProductView
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsAppOpen(true)}
          />
        )}

        {currentScreen === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenWaitlist={() => handleOpenWaitlist('personal')}
          />
        )}

        {currentScreen === 'impact' && (
          <ImpactView
            onNavigate={handleNavigate}
            onOpenWaitlist={() => handleOpenWaitlist('personal')}
          />
        )}

        {currentScreen === 'stories' && (
          <StoriesView
            onNavigate={handleNavigate}
            onOpenWaitlist={() => handleOpenWaitlist('personal')}
          />
        )}

        {currentScreen === 'journal' && <JournalView />}

        {currentScreen === 'press' && <PressView />}

        {currentScreen === 'events' && <EventsView />}

        {currentScreen === 'careers' && <CareersView />}

        {currentScreen === 'help' && (
          <HelpView
            onOpenWhatsApp={() => setWhatsAppOpen(true)}
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
          />
        )}

        {(currentScreen === 'legal' || currentScreen === 'contact') && (
          <LegalContactView />
        )}
      </main>

      {/* Footer on Every Page */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWaitlist={() => handleOpenWaitlist('personal')}
        onOpenWhatsApp={() => setWhatsAppOpen(true)}
      />

      {/* Modals for Waitlist, WhatsApp Banking & App Download */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultInterest={waitlistInterest}
      />

      <WhatsAppBankingModal
        isOpen={whatsAppOpen}
        onClose={() => setWhatsAppOpen(false)}
        onOpenWaitlist={() => handleOpenWaitlist('personal')}
      />

      <AppDownloadModal
        isOpen={downloadAppOpen}
        onClose={() => setDownloadAppOpen(false)}
        onOpenWaitlist={() => handleOpenWaitlist('personal')}
      />

      {/* Mobile Sticky Quick Doors Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#01091C]/95 backdrop-blur-md border-t border-[#14294F] px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={() => setWhatsAppOpen(true)}
          className="flex-1 py-2 px-3 rounded-full bg-[#00DF8F]/20 border border-[#00DF8F] text-[#00DF8F] font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>Bank on WhatsApp</span>
        </button>

        <button
          onClick={() => handleOpenWaitlist('personal')}
          className="flex-1 py-2 px-3 rounded-full bg-[#0D95FE] text-[#00325b] font-bold text-xs flex items-center justify-center gap-1"
        >
          <span>Join Waitlist</span>
        </button>
      </div>

      {/* Floating Interactive Live Chat Bubble ("Hi, Need any help?") */}
      <LiveChatBubble
        onOpenWaitlist={handleOpenWaitlist}
        onOpenWhatsApp={() => setWhatsAppOpen(true)}
      />
    </div>
  );
}
