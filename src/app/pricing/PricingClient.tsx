'use client';

import { useEffect } from 'react';
import { FeesProductView } from '../../components/FeesProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function PricingClient() {
  const { setHomeMode } = useNavigation();

  useEffect(() => {
    setHomeMode('business');
  }, [setHomeMode]);

  return <FeesProductView />;
}
