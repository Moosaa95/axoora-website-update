import { useState } from 'react';
import { ScreenType } from './types';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomeView } from './components/HomeView';
import { PersonalProductView } from './components/PersonalProductView';
import { BusinessProductView } from './components/BusinessProductView';
import { PosProductView } from './components/PosProductView';
import { SecurityView } from './components/SecurityView';
import { GovernanceView } from './components/GovernanceView';
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
import { LiveChatBubble } from './components/LiveChatBubble';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplyOnboardingView } from './components/ApplyOnboardingView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('business');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistInterest, setWaitlistInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>('business');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [homeMode, setHomeMode] = useState<'business' | 'personal'>('business');

  const handleNavigate = (screen: ScreenType) => {
    // There is no home page - site defaults straight to business
    const targetScreen = screen === 'home' ? 'business' : screen;
    setCurrentScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWaitlist = (interest: 'personal' | 'business' | 'pos-agent' | 'aggregator' = 'business') => {
    setWaitlistInterest(interest);
    // Instead of a modal popup, navigate directly to the Monzo-style application flow
    setCurrentScreen('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromApply = () => {
    if (waitlistInterest === 'pos-agent') {
      setCurrentScreen('pos-agents');
    } else if (waitlistInterest === 'personal') {
      setCurrentScreen('personal');
    } else {
      setCurrentScreen('business');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans w-full max-w-full transition-colors duration-200 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-[#0D95FE]/20 selection:text-slate-900'
          : 'bg-[#020F2E] text-[#F2F5F9] selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]'
      }`}
    >
      {/* Reading Progress Indicator */}
      {currentScreen !== 'admin' && currentScreen !== 'apply' && (
        <ReadingProgressBar currentScreen={currentScreen} />
      )}

      {/* Cookie Consent Banner */}
      {currentScreen !== 'admin' && currentScreen !== 'apply' && <CookieBanner />}

      {/* Top Header Navigation */}
      {currentScreen !== 'admin' && currentScreen !== 'apply' && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onOpenWaitlist={handleOpenWaitlist}
          onOpenWhatsApp={() => setWhatsappModalOpen(true)}
          onOpenDownloadApp={() => setDownloadModalOpen(true)}
          homeMode={homeMode}
          onHomeModeChange={setHomeMode}
        />
      )}

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsappModalOpen(true)}
            onOpenDownloadApp={() => setDownloadModalOpen(true)}
            homeMode={homeMode}
            onHomeModeChange={setHomeMode}
          />
        )}

        {currentScreen === 'personal' && (
          <PersonalProductView
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsappModalOpen(true)}
            onOpenDownloadApp={() => setDownloadModalOpen(true)}
          />
        )}

        {currentScreen === 'business' && (
          <BusinessProductView
            onNavigate={handleNavigate}
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsappModalOpen(true)}
          />
        )}

        {currentScreen === 'pos-agents' && (
          <PosProductView
            onOpenWaitlist={handleOpenWaitlist}
            onOpenWhatsApp={() => setWhatsappModalOpen(true)}
          />
        )}

        {currentScreen === 'security' && <SecurityView />}

        {currentScreen === 'governance' && <GovernanceView />}

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

        {currentScreen === 'help' && <HelpView />}

        {currentScreen === 'legal' && <LegalContactView />}

        {currentScreen === 'contact' && <LegalContactView />}

        {currentScreen === 'admin' && (
          <AdminDashboard onExitAdmin={() => handleNavigate('home')} />
        )}

        {currentScreen === 'apply' && (
          <ApplyOnboardingView
            initialInterest={waitlistInterest}
            onBack={handleBackFromApply}
            onOpenWhatsApp={() => setWhatsappModalOpen(true)}
          />
        )}
      </main>

      {/* Footer on Every Page */}
      {currentScreen !== 'admin' && currentScreen !== 'apply' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenWaitlist={() => handleOpenWaitlist('personal')}
          onOpenWhatsApp={() => setWhatsappModalOpen(true)}
        />
      )}

      {/* Interactive Priority Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultInterest={waitlistInterest}
      />

      {/* WhatsApp Conversational Banking Demo Modal */}
      <WhatsAppBankingModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        onOpenWaitlist={() => {
          setWhatsappModalOpen(false);
          handleOpenWaitlist('personal');
        }}
      />

      {/* Mobile App Download Modal */}
      <AppDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onOpenWaitlist={() => {
          setDownloadModalOpen(false);
          handleOpenWaitlist('personal');
        }}
      />

      {/* Live Priority Chat Floating Widget */}
      {currentScreen !== 'admin' && currentScreen !== 'apply' && (
        <LiveChatBubble
          onOpenWaitlist={handleOpenWaitlist}
          onOpenWhatsApp={() => setWhatsappModalOpen(true)}
        />
      )}
    </div>
  );
}
