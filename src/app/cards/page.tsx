import type { Metadata } from 'next';
import CardsClient from './CardsClient';
import { SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: `Cards — ${SITE_NAME}`,
  description: 'Two Cards. Two Balances. Pay online in naira. Pay abroad in dollars, from a balance of its own.',
  alternates: {
    canonical: `${SITE_URL}/cards`,
  },
};

export default function CardsPage() {
  return <CardsClient />;
}
