'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ScreenType } from '../types';

export const SCREEN_ROUTES: Record<ScreenType, string> = {
  home: '/',
  business: '/business',
  personal: '/personal',
  'pos-agents': '/pos-agents',
  security: '/security',
  governance: '/governance',
  about: '/about',
  impact: '/impact',
  stories: '/stories',
  journal: '/journal',
  press: '/press',
  events: '/events',
  careers: '/careers',
  help: '/help',
  legal: '/legal',
  contact: '/contact',
  admin: '/admin',
  apply: '/apply',
};

interface NavigationContextType {
  currentScreen: ScreenType;
  navigate: (screen: ScreenType) => void;
  openWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  openWhatsApp: () => void;
  closeWhatsApp: () => void;
  isWhatsAppOpen: boolean;
  openDownloadApp: () => void;
  closeDownloadApp: () => void;
  isDownloadAppOpen: boolean;
  waitlistInterest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  setWaitlistInterest: (interest: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  homeMode: 'business' | 'personal';
  setHomeMode: (mode: 'business' | 'personal') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [waitlistInterest, setWaitlistInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>('business');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [homeMode, setHomeMode] = useState<'business' | 'personal'>('business');

  const currentScreen: ScreenType = useMemo(() => {
    if (!pathname || pathname === '/') return 'business';
    const clean = pathname.replace(/^\//, '').split('/')[0];
    if (clean === 'pos-agents') return 'pos-agents';
    const validScreens: ScreenType[] = [
      'home', 'personal', 'business', 'pos-agents', 'security',
      'governance', 'about', 'impact', 'stories', 'journal',
      'press', 'events', 'careers', 'help', 'legal', 'contact', 'admin', 'apply'
    ];
    if (validScreens.includes(clean as ScreenType)) {
      return clean as ScreenType;
    }
    return 'business';
  }, [pathname]);

  const navigate = (screen: ScreenType) => {
    const route = SCREEN_ROUTES[screen] || '/business';
    router.push(route);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openWaitlist = (interest: 'personal' | 'business' | 'pos-agent' | 'aggregator' = 'business') => {
    setWaitlistInterest(interest);
    router.push(`/apply?interest=${interest}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => setWhatsappModalOpen(true);
  const closeWhatsApp = () => setWhatsappModalOpen(false);

  const openDownloadApp = () => setDownloadModalOpen(true);
  const closeDownloadApp = () => setDownloadModalOpen(false);

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigate,
        openWaitlist,
        openWhatsApp,
        closeWhatsApp,
        isWhatsAppOpen: whatsappModalOpen,
        openDownloadApp,
        closeDownloadApp,
        isDownloadAppOpen: downloadModalOpen,
        waitlistInterest,
        setWaitlistInterest,
        homeMode,
        setHomeMode,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
