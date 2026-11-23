'use client';

import { useEffect } from 'react';
import { PricingProductView } from '../../components/PricingProductView';
import { useNavigation } from '../../context/NavigationContext';

export default function PricingClient() {
  const { setHomeMode } = useNavigation();

  useEffect(() => {
    setHomeMode('business');
  }, [setHomeMode]);

  return <PricingProductView />;
}
