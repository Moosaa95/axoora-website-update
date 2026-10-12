'use client';

import { PersonalProductView } from "../../components/PersonalProductView";
import { useNavigation } from "../../context/NavigationContext";

export default function PersonalPage() {
  const { navigate, openWaitlist, openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <PersonalProductView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      onOpenDownloadApp={openDownloadApp}
    />
  );
}
