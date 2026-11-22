'use client';

import { HomeView } from '../components/HomeView';
import { useNavigation } from '../context/NavigationContext';

export default function HomeClient() {
  const {
    navigate,
    openWaitlist,
    openWhatsApp,
    openDownloadApp,
    homeMode,
    setHomeMode,
    personalHeroNav,
    setPersonalHeroNav,
  } = useNavigation();

  return (
    <HomeView
      onNavigate={navigate}
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
      onOpenDownloadApp={openDownloadApp}
      homeMode={homeMode}
      onHomeModeChange={setHomeMode}
      personalHeroNav={personalHeroNav}
      onPersonalHeroNavChange={setPersonalHeroNav}
    />
  );
}
