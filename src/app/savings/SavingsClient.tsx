'use client';

import { SavingsProductView } from '../../components/SavingsProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function SavingsClient() {
  const { navigate, openWaitlist, openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <SavingsProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      onOpenDownloadApp={openDownloadApp}
    />
  );
}

