'use client';

import { useEffect } from 'react';
import { PayoutsProductView } from '../../components/PayoutsProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function PayoutsClient() {
  const { setHomeMode } = useNavigation();

  useEffect(() => {
    setHomeMode('business');
  }, [setHomeMode]);

  return <PayoutsProductView />;
}

