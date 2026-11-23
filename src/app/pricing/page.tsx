import type { Metadata } from 'next';
import PricingClient from './PricingClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Pricing & Transparent Fees — Axoora Business',
  description:
    'Clear, upfront fees for business and personal banking. See exactly what transfers, cards, and accounts cost before you confirm.',
  keywords: [
    'Axoora pricing',
    'banking fees Nigeria',
    'transfer charges Nigeria',
    'commercial banking fees',
    'business transfer rates',
  ],
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'Axoora Pricing & Fees',
    description:
      'Clear, upfront fees for business and personal banking. No hidden charges.',
    url: `${SITE_URL}/pricing`,
  },
  twitter: {
    title: 'Axoora Pricing & Fees',
    description: 'Clear, upfront fees for business and personal banking.',
  },
};

export default function PricingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing & Payouts', url: '/pricing' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingClient />
    </>
  );
}
