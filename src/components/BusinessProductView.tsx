'use client';

import React from 'react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { BusinessHome, BusinessHeroVariant } from './home/BusinessHome';

interface BusinessProductViewProps {
  onNavigate?: (screen: ScreenType) => void;
  onOpenWaitlist: (interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator') => void;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
  businessHeroNav?: BusinessHeroVariant;
  onBusinessHeroNavChange?: (hero: BusinessHeroVariant) => void;
}

export const BusinessProductView: React.FC<BusinessProductViewProps> = ({
  onOpenWaitlist,
  onOpenWhatsApp,
  onOpenDownloadApp,
  businessHeroNav,
  onBusinessHeroNavChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      <BusinessHome
        onOpenDownloadApp={onOpenDownloadApp ?? (() => onOpenWaitlist('business'))}
        onOpenWhatsApp={onOpenWhatsApp}
        heroMode={businessHeroNav}
        onHeroModeChange={onBusinessHeroNavChange}
      />
    </div>
  );
};
