'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ScreenType } from '../types';

export type PersonalNavHeroType = 'send' | 'cards' | 'savings' | 'ajo' | 'mall';
export type BusinessNavHeroType = 'business' | 'payouts' | 'pricing';

export const SCREEN_ROUTES: Record<ScreenType, string> = {
  home: '/',
  business: '/business',
  personal: '/personal',
  send: '/send',
  cards: '/cards',
  savings: '/savings',
  ajo: '/savings',
  fees: '/fees',
  pricing: '/pricing',
  payouts: '/payouts',
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
  openCommandDrawer: () => void;
  closeCommandDrawer: () => void;
  isCommandDrawerOpen: boolean;
  openDownloadApp: () => void;
  closeDownloadApp: () => void;
  isDownloadAppOpen: boolean;
  waitlistInterest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  setWaitlistInterest: (interest: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  homeMode: 'business' | 'personal';
  setHomeMode: (mode: 'business' | 'personal') => void;
  personalHeroNav: PersonalNavHeroType;
  setPersonalHeroNav: (hero: PersonalNavHeroType) => void;
  businessHeroNav: BusinessNavHeroType;
  setBusinessHeroNav: (hero: BusinessNavHeroType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [waitlistInterest, setWaitlistInterest] = useState<'personal' | 'business' | 'pos-agent' | 'aggregator'>('business');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [commandDrawerOpen, setCommandDrawerOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [homeMode, setHomeMode] = useState<'business' | 'personal'>('personal');
  const [personalHeroNav, setPersonalHeroNav] = useState<PersonalNavHeroType>('send');
  const [businessHeroNav, setBusinessHeroNav] = useState<BusinessNavHeroType>('business');

  const currentScreen: ScreenType = useMemo(() => {
    if (!pathname || pathname === '/') return 'home';
    const clean = pathname.replace(/^\//, '').split('/')[0];
    if (clean === 'pos-agents') return 'pos-agents';
    const validScreens: ScreenType[] = [
      'home', 'personal', 'send', 'cards', 'savings', 'ajo', 'security', 'fees', 'pricing', 'payouts', 'business', 'pos-agents',
      'governance', 'about', 'impact', 'stories', 'journal',
      'press', 'events', 'careers', 'help', 'legal', 'contact', 'admin', 'apply'
    ];
    if (validScreens.includes(clean as ScreenType)) {
      return clean as ScreenType;
    }
    return 'home';
  }, [pathname]);

  const navigate = (screen: ScreenType) => {
    const route = SCREEN_ROUTES[screen] || '/';
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

  const openCommandDrawer = () => setCommandDrawerOpen(true);
  const closeCommandDrawer = () => setCommandDrawerOpen(false);

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
        openCommandDrawer,
        closeCommandDrawer,
        isCommandDrawerOpen: commandDrawerOpen,
        openDownloadApp,
        closeDownloadApp,
        isDownloadAppOpen: downloadModalOpen,
        waitlistInterest,
        setWaitlistInterest,
        homeMode,
        setHomeMode,
        personalHeroNav,
        setPersonalHeroNav,
        businessHeroNav,
        setBusinessHeroNav,
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
