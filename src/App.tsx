import { useState } from 'react';
import { ScreenType, BankAccount, Transaction } from './types';
import { INITIAL_ACCOUNT, INITIAL_TRANSACTIONS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { BusinessTreasuryView } from './components/BusinessTreasuryView';
import { PosAgentsView } from './components/PosAgentsView';
import { WhatsAppAiView } from './components/WhatsAppAiView';
import { AjoVaultsView } from './components/AjoVaultsView';
import { QuickTransferModal } from './components/QuickTransferModal';
import { OnboardingModal } from './components/OnboardingModal';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('personal');
  const [account, setAccount] = useState<BankAccount>(INITIAL_ACCOUNT);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Modals state
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccessTransfer = (newTx: Transaction, amount: number) => {
    setTransactions((prev) => [newTx, ...prev]);
    setAccount((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020F2E] text-[#F2F5F9] font-sans">
      {/* If Personal screen: render full self-contained LandingPage component */}
      {currentScreen === 'personal' ? (
        <LandingPage
          account={account}
          onNavigate={handleNavigate}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenTransfer={() => setIsTransferOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
      ) : (
        <>
          {/* Fixed Header for Sub-Screens */}
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenTransfer={() => setIsTransferOpen(true)}
          />

          {/* Sub-Screen Views */}
          <main className="flex-1 w-full pt-20">
            {currentScreen === 'business-treasury' && (
              <BusinessTreasuryView
                account={account}
                transactions={transactions}
                onOpenTransfer={() => setIsTransferOpen(true)}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
              />
            )}

            {currentScreen === 'pos-agents' && (
              <PosAgentsView onOpenOnboarding={() => setIsOnboardingOpen(true)} />
            )}

            {currentScreen === 'whatsapp-ai' && (
              <WhatsAppAiView
                account={account}
                onOpenTransfer={() => setIsTransferOpen(true)}
              />
            )}

            {currentScreen === 'ajo-vaults' && (
              <AjoVaultsView
                account={account}
                onOpenTransfer={() => setIsTransferOpen(true)}
              />
            )}
          </main>

          {/* Footer for Sub-Screens */}
          <Footer
            onNavigate={handleNavigate}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        </>
      )}

      {/* Modals (Available Across All Screens) */}
      <QuickTransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        account={account}
        onSuccessTransfer={handleSuccessTransfer}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccessLogin={() => {
          alert('Logged into Axoora Street Vault with WebAuthn Biometrics!');
        }}
      />
    </div>
  );
}
