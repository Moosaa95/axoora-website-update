'use client';

import { AboutView } from '../../components/AboutView';
import { useNavigation } from '../../context/NavigationContext';

export default function AboutClient() {
  const { navigate, openWaitlist } = useNavigation();

  return (
    <AboutView
      onNavigate={navigate}
      onOpenWaitlist={() => openWaitlist('personal')}
    />
  );
}
