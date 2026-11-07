'use client';

import { BusinessProductView } from '../components/BusinessProductView';
import { useNavigation } from '../context/NavigationContext';

export default function HomeClient() {
  const { navigate, openWaitlist, openWhatsApp } = useNavigation();

  return (
    <BusinessProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
    />
  );
}
