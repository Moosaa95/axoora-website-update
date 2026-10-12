'use client';

import { ImpactView } from '../../components/ImpactView';
import { useNavigation } from '../../context/NavigationContext';

export default function ImpactClient() {
  const { navigate, openWaitlist } = useNavigation();

  return (
    <ImpactView
      onNavigate={navigate}
      onOpenWaitlist={() => openWaitlist('personal')}
    />
  );
}
