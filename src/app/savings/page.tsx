import type { Metadata } from 'next';
import SavingsClient from './SavingsClient';
import { SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: `Savings and Ajo — ${SITE_NAME}`,
  description: 'Save on your own, or save together. Non-interest plans that show their working, and Ajo circles that keep the record.',
  alternates: {
    canonical: `${SITE_URL}/savings`,
  },
};

export default function SavingsPage() {
  return <SavingsClient />;
}

