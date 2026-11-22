'use client';

import { CardsProductView } from '../../components/CardsProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function CardsClient() {
  const { navigate, openWaitlist, openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <CardsProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      onOpenDownloadApp={openDownloadApp}
    />
  );
}
