'use client';

import { useEffect } from 'react';
import { BusinessProductView } from '../../components/BusinessProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function PricingClient() {
  const { navigate, openWaitlist, openWhatsApp, setHomeMode, businessHeroNav, setBusinessHeroNav } = useNavigation();

  useEffect(() => {
    setHomeMode('business');
    setBusinessHeroNav('pricing');
  }, [setHomeMode, setBusinessHeroNav]);

  return (
    <BusinessProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      businessHeroNav="pricing"
      onBusinessHeroNavChange={setBusinessHeroNav}
    />
  );
}
