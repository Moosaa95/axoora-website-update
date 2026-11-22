'use client';

import { PersonalProductView } from '../../components/PersonalProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function SendClient() {
  const { navigate, openWaitlist, openWhatsApp, openDownloadApp, openCommandDrawer } = useNavigation();

  return (
    <PersonalProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      onOpenDownloadApp={openDownloadApp}
      onOpenCommandDrawer={openCommandDrawer}
    />
  );
}

