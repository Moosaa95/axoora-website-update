'use client';

import { BusinessProductView } from '../../components/BusinessProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function BusinessClient() {
  const { navigate, openWaitlist, openWhatsApp, businessHeroNav, setBusinessHeroNav } = useNavigation();

  return (
    <BusinessProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      businessHeroNav={businessHeroNav}
      onBusinessHeroNavChange={setBusinessHeroNav}
    />
  );
}
