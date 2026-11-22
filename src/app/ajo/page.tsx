import type { Metadata } from 'next';
import SavingsClient from '../savings/SavingsClient';
import { SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: `Ajo and Pay Circles — ${SITE_NAME}`,
  description: 'Run an Ajo circle with people you trust. Everyone sees who has paid, who is next, and what the payout will be.',
  alternates: {
    canonical: `${SITE_URL}/savings`,
  },
};

export default function AjoPage() {
  return <SavingsClient />;
}
